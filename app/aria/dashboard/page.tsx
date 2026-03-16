"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Lock,
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Radio,
  Cpu,
  Terminal,
  FileText,
  RefreshCw,
  Zap,
  Eye,
  TrendingUp,
  Server,
  Wifi,
  ChevronRight,
  XCircle,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type AttackType = "SIM_SWAP" | "OTP_INTERCEPT" | "IDENTITY_CLONE" | "PORT_SCAN";
type SeverityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

interface TrafficRow {
  id: number;
  time: string;
  srcIp: string;
  dstService: string;
  port: number;
  protocol: string;
  bytesSent: number;
  score: number;
  label: "ANOMALY" | "NORMAL";
  attackType?: AttackType;
}

interface AnomalyEvent {
  id: string;
  type: AttackType;
  label: string;
  score: number;
  confidence: number;
  events: number;
  detail: string;
  mitre: string;
  severity: SeverityLevel;
}

interface Playbook {
  severity: SeverityLevel;
  confidence: string;
  mitre: { tactic: string; technique: string };
  rca: { summary: string; iocs: string[]; timeline: string[]; threat_actor: string };
  playbook: { immediate: string[]; short_term: string[]; hardening: string[] };
  firewall: { platform: string; rules: string[] };
  siem: { platform: string; rule: string };
  impact: { systems: string[]; data_risk: string; regulatory: string[] };
}

// ── Static data ───────────────────────────────────────────────────────────────

const ATTACK_DEFINITIONS: Record<AttackType, AnomalyEvent> = {
  SIM_SWAP: {
    id: "SIM_SWAP",
    type: "SIM_SWAP",
    label: "SIM Swap Fraud",
    score: 0.923,
    confidence: 96.1,
    events: 14,
    severity: "CRITICAL",
    mitre: "T1539",
    detail:
      "14 OTP requests to new SIM within 3 min of reassignment · 6 banks · Token mismatch · Velocity: 4.7/min",
  },
  OTP_INTERCEPT: {
    id: "OTP_INTERCEPT",
    type: "OTP_INTERCEPT",
    label: "OTP Interception",
    score: 0.871,
    confidence: 92.4,
    events: 38,
    severity: "CRITICAL",
    mitre: "T1111",
    detail:
      "38 OTP events routed to unverified device · SS7 exploit pattern · 3 banks affected · Burst: 38ev/90s",
  },
  IDENTITY_CLONE: {
    id: "IDENTITY_CLONE",
    type: "IDENTITY_CLONE",
    label: "Identity Cloning",
    score: 0.812,
    confidence: 88.3,
    events: 7,
    severity: "HIGH",
    mitre: "T1078",
    detail:
      "Aadhaar token reuse across 3 sessions · DigiLocker auth mismatch · Geolocation anomaly: 2 states simultaneously",
  },
  PORT_SCAN: {
    id: "PORT_SCAN",
    type: "PORT_SCAN",
    label: "Gateway Port Scan",
    score: 0.754,
    confidence: 81.2,
    events: 150,
    severity: "HIGH",
    mitre: "T1046",
    detail:
      "150 probes/30s · Sequential ports 1–150 · External scanner 91.108.4.25 → NIC gateway 10.3.1.200",
  },
};

const MOCK_PLAYBOOKS: Record<AttackType, Playbook> = {
  SIM_SWAP: {
    severity: "CRITICAL",
    confidence: "96%",
    mitre: { tactic: "Credential Access", technique: "T1539 — Steal Web Session Cookie" },
    rca: {
      summary:
        "A SIM swap event triggered a burst of OTP requests to the newly assigned number before the 48-hour escrow window could intervene. The attacker exploited the reassignment gap to harvest one-time tokens across 6 banking services.",
      timeline: [
        "T+0s — SIM reassignment detected on TRAI registry",
        "T+12s — Attacker initiates OTP requests to 6 banking services",
        "T+38s — 14 OTPs delivered to new SIM owner's device",
        "T+180s — Pramaan Ledger anomaly engine triggers alert",
      ],
      iocs: [
        "New MSISDN: +91-98XXXXXXXX — unverified KYC",
        "IP origin: 185.220.101.x (Tor exit node)",
        "6 services queried within 180s (velocity: 4.7/min)",
        "Token reuse attempt detected on Union Bank portal",
      ],
      threat_actor: "Organised SIM swap fraud ring — likely telecom insider threat",
    },
    playbook: {
      immediate: [
        "Freeze OTP delivery to unverified SIM for 48-hour escrow period",
        "Notify all 6 affected banking services via broadcast engine",
        "Trigger Aadhaar biometric re-verification for account access",
        "Block IP 185.220.101.x at NIC gateway firewall",
      ],
      short_term: [
        "File complaint with TRAI and affected telecom operator within 2 hours",
        "Enable out-of-band authentication (TOTP) for all affected accounts",
        "Cross-check UIDAI logs for unauthorized Aadhaar usage",
      ],
      hardening: [
        "Implement mandatory 48-hour OTP lockout post SIM reassignment (enforce via Pramaan Ledger)",
        "Subscribe to TRAI real-time SIM swap notification API",
        "Deploy velocity-based OTP rate limiting across all linked services",
      ],
    },
    firewall: {
      platform: "iptables",
      rules: [
        "iptables -A INPUT -s 185.220.101.0/24 -j DROP",
        "iptables -A INPUT -p tcp --dport 443 -m connlimit --connlimit-above 20 -j REJECT",
        "iptables -A INPUT -m recent --name OTP_BURST --update --seconds 60 --hitcount 10 -j DROP",
      ],
    },
    siem: {
      platform: "Splunk SPL",
      rule:
        'index=otp_events | bucket _time span=60s | stats count by _time, msisdn | where count > 5 | join msisdn [search index=sim_registry | where reassignment_age_hours < 48] | alert action=email to="soc@nic.in"',
    },
    impact: {
      systems: ["Union Bank OTP Gateway", "EPFO Auth Service", "Ayushman Bharat Portal", "SBI NetBanking"],
      data_risk: "CRITICAL — Financial account access, PII, health records",
      regulatory: ["TRAI Regulation 2018 §14", "RBI Circular DPSS.CO.OD No. 1098", "DPDP Act 2023 §8"],
    },
  },
  OTP_INTERCEPT: {
    severity: "CRITICAL",
    confidence: "92%",
    mitre: { tactic: "Credential Access", technique: "T1111 — Multi-Factor Authentication Interception" },
    rca: {
      summary:
        "SS7 protocol vulnerability exploited to intercept OTP SMS messages in transit. 38 OTPs from 3 banking services were silently redirected to attacker-controlled handset without user awareness.",
      timeline: [
        "T+0s — SS7 MAP SRI-SM query intercepted on telecom backbone",
        "T+8s — OTP routing table poisoned at MSC level",
        "T+15s — 38 OTPs redirected to IMSI 40440XXXXXXXX",
        "T+90s — Pramaan Ledger burst detection triggers alert",
      ],
      iocs: [
        "SS7 MAP_SRI_SM from unauthorized HLR: 404401XXXXXXX",
        "38 OTP events in 90s — burst anomaly score 0.871",
        "Affected MSISDNs: 3 accounts across SBI, HDFC, EPFO",
        "Destination IMSI registered in different telecom circle",
      ],
      threat_actor: "Advanced telecom-level attacker — SS7 exploit kit (nation-state or organised crime)",
    },
    playbook: {
      immediate: [
        "Alert CERT-In and NIC CSIRT within 1 hour (mandatory TRAI notification)",
        "Suspend SMS-OTP for affected MSISDNs — force app-based TOTP",
        "Notify 3 affected banks to freeze transaction auth",
        "Request telecom operator to audit SS7 MAP logs",
      ],
      short_term: [
        "File FIR with Cyber Cell and share IOCs within 6 hours",
        "Deploy HTTPS-based OTP delivery as SMS fallback bypass",
        "Implement MSISDN-to-IMSI binding verification",
      ],
      hardening: [
        "Push NIC to mandate HTTPS OTP delivery for all GOI services (eliminate SMS dependency)",
        "Implement SS7 firewall at NIC telecom interconnect points",
        "Adopt FIDO2/WebAuthn for all critical government portals",
      ],
    },
    firewall: {
      platform: "iptables",
      rules: [
        "iptables -A INPUT -p tcp --dport 2775 -s ! 10.0.0.0/8 -j DROP",
        "iptables -A INPUT -m string --string 'MAP_SRI_SM' --algo bm -j LOG --log-prefix 'SS7_ALERT: '",
        "iptables -A INPUT -m string --string 'MAP_SRI_SM' --algo bm -j DROP",
      ],
    },
    siem: {
      platform: "Splunk SPL",
      rule:
        'index=telecom_ss7 event_type=MAP_SRI_SM | stats count by src_hlr, dest_msisdn, _time | where count > 3 | lookup known_hlr src_hlr OUTPUT is_authorized | where NOT is_authorized | alert',
    },
    impact: {
      systems: ["SBI NetBanking", "HDFC OTP Service", "EPFO Auth Gateway"],
      data_risk: "CRITICAL — Banking credentials, transaction auth, account takeover risk",
      regulatory: ["TRAI Interconnect Regulation 2018", "RBI IT Framework §7", "CERT-In Incident Reporting 2022"],
    },
  },
  IDENTITY_CLONE: {
    severity: "HIGH",
    confidence: "88%",
    mitre: { tactic: "Defense Evasion", technique: "T1078 — Valid Accounts" },
    rca: {
      summary:
        "Aadhaar token reuse detected across 3 concurrent sessions originating from geographically impossible locations. Attacker likely obtained credentials through phishing and is attempting to clone identity across DigiLocker and government portals.",
      timeline: [
        "T+0s — First login: 10.2.3.45 (Mumbai)",
        "T+4s — Second login same Aadhaar: 203.88.12.34 (Bengaluru)",
        "T+9s — Third login: 91.108.4.25 (external/VPN)",
        "T+45s — Isolation Forest flags token reuse anomaly",
      ],
      iocs: [
        "Aadhaar token reuse: 3 sessions within 9 seconds",
        "Geolocation: Mumbai + Bengaluru simultaneously (impossible)",
        "VPN IP 91.108.4.25 — known proxy exit node",
        "DigiLocker credential stuffing pattern",
      ],
      threat_actor: "Credential stuffing attack — automated toolkit with stolen Aadhaar credentials",
    },
    playbook: {
      immediate: [
        "Invalidate all 3 active sessions immediately",
        "Force biometric re-verification via UIDAI API",
        "Lock DigiLocker account for 24 hours pending owner re-verification",
        "Alert citizen via registered alternate contact",
      ],
      short_term: [
        "Audit DigiLocker access logs for past 30 days",
        "Check if forged documents were downloaded during session",
        "File complaint with UIDAI fraud cell",
      ],
      hardening: [
        "Implement device fingerprinting for all DigiLocker sessions",
        "Add impossible travel detection (geolocation velocity check)",
        "Mandatory TOTP for all Aadhaar-linked portal logins",
      ],
    },
    firewall: {
      platform: "iptables",
      rules: [
        "iptables -A INPUT -s 91.108.4.0/24 -j DROP",
        "iptables -A INPUT -s 203.88.12.0/24 -m recent --set --name SUSPECTED_CLONE",
        "iptables -A INPUT -m recent --name SUSPECTED_CLONE --rcheck --seconds 30 --hitcount 3 -j DROP",
      ],
    },
    siem: {
      platform: "Splunk SPL",
      rule:
        'index=digilocker_auth | stats values(src_ip) as ips, values(geo_city) as cities by aadhaar_token, _time span=30s | where mvcount(ips) > 1 AND mvcount(cities) > 1 | eval impossible_travel=if(mvcount(cities)>1,"YES","NO") | where impossible_travel="YES"',
    },
    impact: {
      systems: ["DigiLocker Identity Vault", "UIDAI Auth Service", "Income Tax Portal"],
      data_risk: "HIGH — Aadhaar linkage, government documents, tax records",
      regulatory: ["DPDP Act 2023 §10", "Aadhaar Act 2016 §29", "IT Act 2000 §66C"],
    },
  },
  PORT_SCAN: {
    severity: "HIGH",
    confidence: "81%",
    mitre: { tactic: "Discovery", technique: "T1046 — Network Service Discovery" },
    rca: {
      summary:
        "Automated port scan targeting NIC gateway infrastructure detected. Sequential probing of ports 1-150 at 5 probes/second indicates Nmap or masscan reconnaissance. The target is the Oracle 19c database server hosting citizen identity records.",
      timeline: [
        "T+0s — First probe: 91.108.4.25 → 10.3.1.200:1",
        "T+6s — Sequential sweep to port 50 detected",
        "T+20s — All ports 1-100 probed (near-zero payload per probe)",
        "T+30s — Isolation Forest flags sequential port anomaly at 0.754",
      ],
      iocs: [
        "Scanner IP: 91.108.4.25 (Eastern Europe geolocation)",
        "Target: 10.3.1.200 (Oracle 19c DB — citizen data)",
        "150 probes in 30s = 5/sec (Nmap default rate signature)",
        "bytes_per_probe ≈ 52 — SYN-only, no application data",
      ],
      threat_actor: "Opportunistic external scanner — likely precursor to targeted exploit",
    },
    playbook: {
      immediate: [
        "Block IP 91.108.4.25 at perimeter firewall immediately",
        "Enable port-scan detection rule on SIEM with alert",
        "Verify Oracle 19c patch level — check for known CVEs",
        "Isolate 10.3.1.200 segment pending security review",
      ],
      short_term: [
        "Report to CERT-In as pre-attack reconnaissance within 6 hours",
        "Conduct emergency vulnerability scan on target server",
        "Review firewall rules — restrict DB server to application tier only",
      ],
      hardening: [
        "Deploy network segmentation: DB server must not be reachable from internet",
        "Enable connection-rate limiting on all NIC DMZ servers",
        "Implement dark IP / honeypot in 10.3.x.x range to detect future scans",
      ],
    },
    firewall: {
      platform: "iptables",
      rules: [
        "iptables -A INPUT -s 91.108.4.0/24 -j DROP",
        "iptables -A INPUT -p tcp --syn -m recent --set --name PORTSCAN",
        "iptables -A INPUT -p tcp --syn -m recent --name PORTSCAN --rcheck --seconds 10 --hitcount 10 -j DROP",
        "iptables -A INPUT -d 10.3.1.200 -p tcp ! --dport 1521 -j DROP",
      ],
    },
    siem: {
      platform: "Splunk SPL",
      rule:
        'index=network_traffic dest_ip=10.3.1.200 | bucket _time span=10s | stats count, dc(dest_port) as port_variety by _time, src_ip | where port_variety > 20 | sort -port_variety | head 20',
    },
    impact: {
      systems: ["Oracle 19c DB — Citizen Identity Records", "NIC Gateway Infrastructure"],
      data_risk: "HIGH — Citizen PII, Aadhaar records, OTP routing tables",
      regulatory: ["CERT-In Guidelines §4.2", "IT Act 2000 §43", "MeitY Security Framework §8"],
    },
  },
};

// ── Helper functions ──────────────────────────────────────────────────────────

function randomIp(internal = false): string {
  if (internal) return `10.${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`;
  return `${Math.floor(Math.random() * 100) + 100}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}`;
}

const NORMAL_SERVICES = ["Union Bank:443", "EPFO:443", "DigiLocker:8443", "UMANG:443", "UIDAI:22", "NIC:1521"];
const ATTACK_SERVICES: Record<AttackType, string> = {
  SIM_SWAP: "OTP-GW:443",
  OTP_INTERCEPT: "SS7-MSC:2775",
  IDENTITY_CLONE: "DigiLocker:8443",
  PORT_SCAN: "NIC-DB:1521",
};

let rowId = 0;
function generateRow(activeAttack: AttackType): TrafficRow {
  const isAnomaly = Math.random() < 0.15;
  rowId++;
  const now = new Date();
  const time = now.toTimeString().substring(0, 8);

  if (isAnomaly) {
    const def = ATTACK_DEFINITIONS[activeAttack];
    return {
      id: rowId,
      time,
      srcIp: randomIp(false),
      dstService: ATTACK_SERVICES[activeAttack],
      port: activeAttack === "OTP_INTERCEPT" ? 2775 : 443,
      protocol: activeAttack === "PORT_SCAN" ? "TCP" : "HTTPS",
      bytesSent: activeAttack === "PORT_SCAN" ? Math.floor(40 + Math.random() * 30) : Math.floor(200 + Math.random() * 400),
      score: parseFloat((def.score - 0.05 + Math.random() * 0.1).toFixed(3)),
      label: "ANOMALY",
      attackType: activeAttack,
    };
  }

  const svc = NORMAL_SERVICES[Math.floor(Math.random() * NORMAL_SERVICES.length)];
  const [service, portStr] = svc.split(":");
  return {
    id: rowId,
    time,
    srcIp: randomIp(true),
    dstService: service,
    port: parseInt(portStr),
    protocol: "HTTPS",
    bytesSent: Math.floor(1000 + Math.random() * 20000),
    score: parseFloat((0.05 + Math.random() * 0.2).toFixed(3)),
    label: "NORMAL",
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ARIADashboard() {
  const [activeAttack, setActiveAttack] = useState<AttackType>("SIM_SWAP");
  const [activeTab, setActiveTab] = useState<"feed" | "anomalies" | "playbook">("feed");
  const [trafficRows, setTrafficRows] = useState<TrafficRow[]>([]);
  const [playbook, setPlaybook] = useState<Playbook | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);

  // Initialise rows
  useEffect(() => {
    const initial: TrafficRow[] = [];
    for (let i = 0; i < 12; i++) initial.push(generateRow(activeAttack));
    setTrafficRows(initial);
  }, [activeAttack]);

  // Live feed ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTrafficRows((prev) => {
        const next = [generateRow(activeAttack), ...prev];
        return next.slice(0, 18);
      });
    }, 700);
    return () => clearInterval(timer);
  }, [activeAttack]);

  const handleSelectAttack = (type: AttackType) => {
    setActiveAttack(type);
    setPlaybook(null);
    setAiDone(false);
  };

  const generatePlaybook = useCallback(() => {
    setAiLoading(true);
    setActiveTab("playbook");
    setTimeout(() => {
      setPlaybook(MOCK_PLAYBOOKS[activeAttack]);
      setAiLoading(false);
      setAiDone(true);
    }, 2200);
  }, [activeAttack]);

  const def = ATTACK_DEFINITIONS[activeAttack];
  const sevColor: Record<SeverityLevel, string> = {
    CRITICAL: "text-rose-700 bg-rose-50 border-rose-200",
    HIGH: "text-amber-700 bg-amber-50 border-amber-200",
    MEDIUM: "text-indigo-700 bg-indigo-50 border-indigo-200",
    LOW: "text-emerald-700 bg-emerald-50 border-emerald-200",
  };

  return (
    <div className="noise-overlay min-h-screen bg-slate-50 flex flex-col">
      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <header className="bg-indigo-950 border-b border-indigo-800/60 sticky top-0 z-50">
        <div className="bg-indigo-900/80 border-b border-indigo-700/40 py-1 px-6">
          <p className="text-[10px] tracking-widest text-indigo-300 uppercase font-medium text-center">
            भारत सरकार · Government of India &nbsp;|&nbsp; Ministry of Electronics &amp; Information Technology &nbsp;·&nbsp; CERT-In Integrated
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="trust-pulse w-9 h-9 rounded-full bg-indigo-700 border border-indigo-500 flex items-center justify-center">
              <Lock className="w-4 h-4 text-indigo-100" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-serif-display text-white text-lg font-semibold tracking-tight leading-none block">
                Pramaan Ledger
              </span>
              <span className="text-indigo-300 text-[11px] tracking-widest uppercase leading-none">
                ARIA — Threat Intelligence Console
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <Activity className="w-3.5 h-3.5" />
              ML Engine Active · 94.2% Accuracy
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-amber-400 text-xs font-medium border border-amber-500/30 bg-amber-400/10 px-3 py-1 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5" />
              RESTRICTED
            </span>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-indigo-300 hover:text-white text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Gateway
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* ── KPI STRIP ─────────────────────────────────────────────── */}
        <div className="animate-fade-up grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Events Scanned", value: "5,530", icon: Eye, color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200" },
            { label: "Anomalies Flagged", value: "209", icon: ShieldAlert, color: "text-rose-700", bg: "bg-rose-50 border-rose-200" },
            { label: "ML Accuracy", value: "94.2%", icon: Cpu, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
            { label: "LLM Credits Saved", value: "~90%", icon: TrendingUp, color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border bg-white p-5 govt-card-inset flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${s.bg}`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 font-serif-display leading-none">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ─────────────────────────────────────────────── */}
        <div className="animate-fade-up-delay-1 grid lg:grid-cols-[260px_1fr] gap-6">

          {/* LEFT SIDEBAR — Attack Selector */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 govt-card-inset">
              <p className="text-[10px] font-semibold tracking-widest text-indigo-600 uppercase mb-3">
                Threat Vectors
              </p>
              <div className="flex flex-col gap-2">
                {(Object.entries(ATTACK_DEFINITIONS) as [AttackType, AnomalyEvent][]).map(([type, ev]) => (
                  <button
                    key={type}
                    onClick={() => handleSelectAttack(type)}
                    className={`text-left rounded-xl border p-3 transition-all duration-200 ${
                      activeAttack === type
                        ? "border-indigo-400 bg-indigo-50"
                        : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-semibold text-slate-900 text-xs leading-snug">{ev.label}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold tracking-widest whitespace-nowrap ${sevColor[ev.severity]}`}>
                        {ev.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Radio className="w-2.5 h-2.5" />
                        Score: {ev.score}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" />
                        {ev.events} events
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tier architecture legend */}
            <div className="bg-indigo-950 rounded-2xl border border-indigo-800 p-5">
              <p className="text-[10px] font-semibold tracking-widest text-indigo-400 uppercase mb-3">
                ARIA Architecture
              </p>
              {[
                { tier: "T1", label: "Isolation Forest", sub: "The Shield · <1ms/record", color: "border-l-rose-500" },
                { tier: "T2", label: "Kimi AI LLM", sub: "The Brain · RCA + Playbook", color: "border-l-indigo-400" },
                { tier: "T3", label: "Red Team Bot", sub: "Mutation Engine", color: "border-l-emerald-500" },
              ].map((t) => (
                <div key={t.tier} className={`border-l-2 ${t.color} pl-3 py-1.5 mb-2`}>
                  <p className="text-white text-xs font-semibold">{t.label}</p>
                  <p className="text-indigo-400 text-[10px]">{t.sub}</p>
                </div>
              ))}
            </div>

            {/* Compliance */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 govt-card-inset">
              <p className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase mb-3">Compliance</p>
              <div className="flex flex-wrap gap-1.5">
                {["RBI CSF §6", "PCI-DSS v4", "CERT-In 2022", "DPDP Act 2023", "MeitY", "TRAI 2018"].map((c) => (
                  <span key={c} className="text-[9px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 govt-card-inset flex flex-col overflow-hidden">
            {/* Tab bar */}
            <div className="border-b border-slate-200 flex px-5 pt-1">
              {(["feed", "anomalies", "playbook"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[10px] font-semibold tracking-widest uppercase px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-indigo-600 text-indigo-700"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab === "feed" ? "Live Traffic" : tab === "anomalies" ? "Anomaly Hunter" : "AI Playbook"}
                </button>
              ))}
              <div className="ml-auto flex items-center pr-1">
                <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  LIVE
                </span>
              </div>
            </div>

            {/* LIVE TRAFFIC TAB */}
            {activeTab === "feed" && (
              <div className="flex-1 overflow-auto p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-700">
                    Network Traffic Feed — <span className="text-indigo-600">Pramaan Identity Gateway</span>
                  </p>
                  <button onClick={() => setTrafficRows([])} className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600">
                    <RefreshCw className="w-3 h-3" /> Clear
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {["Time", "Source IP", "Destination", "Protocol", "Bytes", "Score", "Status"].map((h) => (
                          <th key={h} className="text-left text-slate-400 font-semibold tracking-wider uppercase pb-2 pr-4 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {trafficRows.map((row) => (
                        <tr
                          key={row.id}
                          className={`border-b border-slate-50 ${row.label === "ANOMALY" ? "bg-rose-50/40" : ""}`}
                        >
                          <td className="py-1.5 pr-4 font-mono text-slate-500">{row.time}</td>
                          <td className="py-1.5 pr-4 font-mono text-slate-600">{row.srcIp}</td>
                          <td className="py-1.5 pr-4 font-mono text-slate-600">{row.dstService}</td>
                          <td className="py-1.5 pr-4 text-slate-500">{row.protocol}</td>
                          <td className="py-1.5 pr-4 font-mono text-slate-600">{row.bytesSent.toLocaleString()}</td>
                          <td className={`py-1.5 pr-4 font-mono font-bold ${row.label === "ANOMALY" ? "text-rose-600" : "text-emerald-600"}`}>
                            {row.score}
                          </td>
                          <td className="py-1.5">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border tracking-widest ${
                              row.label === "ANOMALY"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}>
                              {row.label}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ANOMALY HUNTER TAB */}
            {activeTab === "anomalies" && (
              <div className="flex-1 overflow-auto p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-slate-700">
                    Flagged by Isolation Forest — Score &gt; 0.50
                  </p>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">
                    {def.events} events flagged
                  </span>
                </div>

                {/* Active anomaly card */}
                <div className="rounded-2xl border border-rose-300 bg-rose-50/60 p-5 mb-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-rose-600 uppercase">
                        Active Threat · Tier 1 Detected
                      </span>
                      <h3 className="font-serif-display text-lg font-bold text-slate-900 mt-0.5">{def.label}</h3>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-2xl font-bold text-rose-600">{def.score}</p>
                      <p className="text-[10px] text-slate-500">Anomaly Score</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "Confidence", value: `${def.confidence}%` },
                      { label: "Events", value: String(def.events) },
                      { label: "MITRE", value: def.mitre },
                    ].map((m) => (
                      <div key={m.label} className="bg-white rounded-xl border border-rose-200 p-3 text-center">
                        <p className="font-mono text-sm font-bold text-rose-700">{m.value}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{def.detail}</p>

                  <button
                    onClick={generatePlaybook}
                    disabled={aiLoading || aiDone}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 px-6 rounded-xl transition-colors"
                  >
                    {aiLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        ARIA AI generating playbook...
                      </>
                    ) : aiDone ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Playbook Ready — View AI Playbook tab
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Escalate to ARIA AI — Generate Playbook
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </>
                    )}
                  </button>
                </div>

                {/* Other threats summary */}
                <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-2">
                  Other Active Vectors
                </p>
                {(Object.entries(ATTACK_DEFINITIONS) as [AttackType, AnomalyEvent][])
                  .filter(([t]) => t !== activeAttack)
                  .map(([, ev]) => (
                    <div
                      key={ev.id}
                      className="flex items-center gap-3 border border-slate-200 rounded-xl p-3 mb-2 hover:border-indigo-300 cursor-pointer transition-colors"
                      onClick={() => handleSelectAttack(ev.type)}
                    >
                      <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{ev.label}</p>
                        <p className="text-[10px] text-slate-500">{ev.events} events · Score {ev.score}</p>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold ${sevColor[ev.severity]}`}>
                        {ev.severity}
                      </span>
                    </div>
                  ))}
              </div>
            )}

            {/* AI PLAYBOOK TAB */}
            {activeTab === "playbook" && (
              <div className="flex-1 overflow-auto p-5">
                {aiLoading && (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <span className="w-10 h-10 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <p className="text-sm text-slate-500">ARIA AI analysing threat intelligence...</p>
                    <p className="text-[10px] text-slate-400 font-mono">Kimi AI · moonshot-v1-8k · ~720 tokens</p>
                  </div>
                )}

                {!aiLoading && !playbook && (
                  <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                      <Terminal className="w-7 h-7 text-indigo-600" />
                    </div>
                    <p className="text-slate-600 font-medium text-sm">No playbook generated yet</p>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Go to the Anomaly Hunter tab, select a threat, and click <strong>Escalate to ARIA AI</strong>.
                    </p>
                    <button
                      onClick={() => setActiveTab("anomalies")}
                      className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4" /> Go to Anomaly Hunter
                    </button>
                  </div>
                )}

                {!aiLoading && playbook && (
                  <div className="flex flex-col gap-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-semibold tracking-widest text-indigo-600 uppercase">
                          ARIA Incident Response Playbook
                        </span>
                        <h2 className="font-serif-display text-xl font-bold text-slate-900 mt-0.5">
                          {ATTACK_DEFINITIONS[activeAttack].label}
                        </h2>
                      </div>
                      <div className="flex gap-2">
                        <span className={`text-[10px] px-3 py-1 rounded-full border font-bold tracking-widest ${sevColor[playbook.severity]}`}>
                          {playbook.severity}
                        </span>
                        <span className="text-[10px] px-3 py-1 rounded-full border font-semibold bg-indigo-50 text-indigo-700 border-indigo-200">
                          {playbook.confidence} Confidence
                        </span>
                      </div>
                    </div>

                    {/* MITRE */}
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase mb-1">MITRE Tactic</p>
                        <p className="text-sm font-semibold text-slate-800">{playbook.mitre.tactic}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase mb-1">Technique</p>
                        <p className="text-sm font-mono font-bold text-indigo-700">{playbook.mitre.technique}</p>
                      </div>
                    </div>

                    {/* RCA */}
                    <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                      <p className="text-[9px] font-semibold tracking-widest text-amber-700 uppercase mb-2">Root Cause Analysis</p>
                      <p className="text-sm text-slate-700 leading-relaxed mb-3">{playbook.rca.summary}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <p className="text-[9px] font-semibold text-amber-600 uppercase tracking-widest mb-1.5">Attack Timeline</p>
                          {playbook.rca.timeline.map((t, i) => (
                            <p key={i} className="text-xs text-slate-600 flex gap-2 mb-1">
                              <span className="text-amber-500 font-mono shrink-0">{i === 0 ? "T+0" : "→"}</span>
                              {t}
                            </p>
                          ))}
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold text-amber-600 uppercase tracking-widest mb-1.5">Indicators of Compromise</p>
                          {playbook.rca.iocs.map((ioc, i) => (
                            <p key={i} className="text-xs text-slate-600 flex gap-2 mb-1">
                              <XCircle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                              {ioc}
                            </p>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-amber-700 font-medium mt-3">
                        Threat Actor: {playbook.rca.threat_actor}
                      </p>
                    </div>

                    {/* Playbook steps */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                      <p className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase mb-3">Remediation Playbook</p>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Immediate · <5 min", items: playbook.playbook.immediate, color: "text-rose-600 bg-rose-50 border-rose-200" },
                          { label: "Short-term · <24h", items: playbook.playbook.short_term, color: "text-amber-600 bg-amber-50 border-amber-200" },
                          { label: "Hardening", items: playbook.playbook.hardening, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                        ].map((col) => (
                          <div key={col.label}>
                            <p className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border inline-block mb-2 ${col.color}`}>
                              {col.label}
                            </p>
                            {col.items.map((item, i) => (
                              <p key={i} className="text-xs text-slate-600 flex gap-1.5 mb-1.5">
                                <span className="text-indigo-400 font-bold shrink-0">{i + 1}.</span>
                                {item}
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Firewall + SIEM */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-indigo-950 rounded-xl border border-indigo-800 p-4">
                        <p className="text-[9px] font-semibold tracking-widest text-indigo-400 uppercase mb-2">
                          Firewall Patch · {playbook.firewall.platform}
                        </p>
                        <div className="flex flex-col gap-1">
                          {playbook.firewall.rules.map((rule, i) => (
                            <code key={i} className="text-[9px] font-mono text-emerald-300 break-all">{rule}</code>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-900 rounded-xl border border-slate-700 p-4">
                        <p className="text-[9px] font-semibold tracking-widest text-slate-400 uppercase mb-2">
                          SIEM Rule · {playbook.siem.platform}
                        </p>
                        <code className="text-[9px] font-mono text-amber-300 break-all leading-relaxed">
                          {playbook.siem.rule}
                        </code>
                      </div>
                    </div>

                    {/* Regulatory */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                      <p className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase mb-2">Regulatory Flags</p>
                      <div className="flex flex-wrap gap-2">
                        {playbook.impact.regulatory.map((r) => (
                          <span key={r} className="text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-full">
                            {r}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        <span className="font-semibold text-slate-700">Data Risk:</span> {playbook.impact.data_risk}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Legal */}
        <p className="animate-fade-up-delay-4 text-center text-[11px] text-slate-400 leading-relaxed pb-2">
          ARIA · Automated Remediation &amp; Intelligence Analyst · MeitY / C-DAC · CERT-In Integrated ·
          PCI-DSS v4.0 · RBI Cyber Security Framework · DPDP Act 2023 · Cyber Surakshit Bharat
        </p>
      </main>
    </div>
  );
}
