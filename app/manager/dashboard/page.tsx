"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Send,
  Building2,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Landmark,
  Zap,
  Users,
  FileText,
  RefreshCw,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

type InstitutionStatus = "SUSPENDED" | "ACTIVE" | "PENDING" | "UPDATED";

interface Institution {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  status: InstitutionStatus;
  lastOtp?: string;
  otpCount?: number;
}

const institutions: Institution[] = [
  {
    id: "union-bank",
    name: "Union Bank of India",
    category: "Public Sector Bank",
    icon: Landmark,
    status: "SUSPENDED",
    lastOtp: "14 Jun, 09:41",
    otpCount: 34,
  },
  {
    id: "epfo",
    name: "EPFO",
    category: "Employees' Provident Fund",
    icon: Briefcase,
    status: "SUSPENDED",
    lastOtp: "13 Jun, 18:02",
    otpCount: 8,
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat",
    category: "National Health Mission",
    icon: Stethoscope,
    status: "SUSPENDED",
    lastOtp: "12 Jun, 11:15",
    otpCount: 3,
  },
  {
    id: "sbi",
    name: "State Bank of India",
    category: "Public Sector Bank",
    icon: Landmark,
    status: "SUSPENDED",
    lastOtp: "15 Jun, 07:50",
    otpCount: 22,
  },
  {
    id: "umang",
    name: "UMANG Portal",
    category: "Unified Mobile Application",
    icon: Smartphone,
    status: "ACTIVE",
    otpCount: 0,
  },
  {
    id: "cbse",
    name: "CBSE DigiLocker",
    category: "Academic Records",
    icon: GraduationCap,
    status: "SUSPENDED",
    lastOtp: "10 Jun, 14:30",
    otpCount: 1,
  },
  {
    id: "income-tax",
    name: "Income Tax Portal",
    category: "Direct Tax Services",
    icon: FileText,
    status: "PENDING",
    otpCount: 0,
  },
  {
    id: "electricity",
    name: "MSEDCL",
    category: "State Electricity Board",
    icon: Zap,
    status: "SUSPENDED",
    lastOtp: "11 Jun, 23:05",
    otpCount: 5,
  },
  {
    id: "ration",
    name: "PDS / Ration Portal",
    category: "Public Distribution System",
    icon: Users,
    status: "ACTIVE",
    otpCount: 0,
  },
];

const statusConfig: Record<
  InstitutionStatus,
  { label: string; classes: string; dotColor: string }
> = {
  SUSPENDED: {
    label: "SUSPENDED",
    classes:
      "bg-red-50 text-red-700 border-red-200 font-bold tracking-widest suspended-pulse",
    dotColor: "bg-red-500",
  },
  ACTIVE: {
    label: "ACTIVE",
    classes: "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold",
    dotColor: "bg-emerald-500",
  },
  PENDING: {
    label: "PENDING",
    classes: "bg-amber-50 text-amber-700 border-amber-200 font-semibold",
    dotColor: "bg-amber-400",
  },
  UPDATED: {
    label: "UPDATED",
    classes: "bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold",
    dotColor: "bg-indigo-500",
  },
};

export default function ManagerDashboard() {
  const [mobileInput, setMobileInput] = useState("");
  const [broadcastState, setBroadcastState] = useState<
    "idle" | "loading" | "done"
  >("idle");
  const [institutionStatuses, setInstitutionStatuses] = useState<
    Record<string, InstitutionStatus>
  >(Object.fromEntries(institutions.map((i) => [i.id, i.status])));

  const suspendedCount = Object.values(institutionStatuses).filter(
    (s) => s === "SUSPENDED"
  ).length;
  const activeCount = Object.values(institutionStatuses).filter(
    (s) => s === "ACTIVE" || s === "UPDATED"
  ).length;

  function handleBroadcast() {
    if (mobileInput.length !== 10 || !/^\d{10}$/.test(mobileInput)) return;
    setBroadcastState("loading");
    setTimeout(() => {
      setBroadcastState("done");
      const updated: Record<string, InstitutionStatus> = {};
      institutions.forEach((inst) => {
        updated[inst.id] =
          inst.status === "SUSPENDED" ? "UPDATED" : inst.status;
      });
      setInstitutionStatuses(updated);
    }, 2500);
  }

  return (
    <div className="noise-overlay min-h-screen bg-slate-50 flex flex-col">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="bg-indigo-950 border-b border-indigo-800/60 sticky top-0 z-50">
        <div className="bg-indigo-900/80 border-b border-indigo-700/40 py-1 px-6">
          <p className="text-[10px] tracking-widest text-indigo-300 uppercase font-medium text-center">
            भारत सरकार · Government of India &nbsp;|&nbsp; Ministry of
            Electronics &amp; Information Technology
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="trust-pulse w-9 h-9 rounded-full bg-indigo-700 border border-indigo-500 flex items-center justify-center">
              <Lock className="w-4 h-4 text-indigo-100" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-serif-display text-white text-lg font-semibold tracking-tight leading-none block">
                Pramaan Ledger
              </span>
              <span className="text-indigo-300 text-[11px] tracking-widest uppercase leading-none">
                Global Identity Manager
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-emerald-400 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Aadhaar KYC Verified
            </div>
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

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* ── SUMMARY BAR ────────────────────────────────────── */}
        <div className="animate-fade-up grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Total Services",
              value: institutions.length,
              icon: Building2,
              color: "text-indigo-700",
              bg: "bg-indigo-50 border-indigo-200",
            },
            {
              label: "OTP Suspended",
              value: suspendedCount,
              icon: AlertCircle,
              color: "text-red-700",
              bg: "bg-red-50 border-red-200",
            },
            {
              label: "Active / Updated",
              value: activeCount,
              icon: ShieldCheck,
              color: "text-emerald-700",
              bg: "bg-emerald-50 border-emerald-200",
            },
            {
              label: "KYC Trust Score",
              value: "9.4 / 10",
              icon: CheckCircle2,
              color: "text-indigo-700",
              bg: "bg-indigo-50 border-indigo-200",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border p-5 govt-card-inset bg-white flex items-center gap-4"
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${stat.bg}`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 font-serif-display leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── BROADCAST ACTION BAR ───────────────────────────── */}
        <div className="animate-fade-up-delay-1 bg-indigo-950 rounded-2xl p-6 border border-indigo-800">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
            <div>
              <span className="text-[10px] font-semibold tracking-widest text-indigo-400 uppercase">
                Broadcast Engine
              </span>
              <h2 className="font-serif-display text-xl font-semibold text-white mt-0.5">
                Update Identity Across All Services
              </h2>
            </div>
            <div className="sm:ml-auto flex items-center gap-2 text-emerald-400 text-xs font-medium bg-emerald-400/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              UIDAI Auth Active
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
              <input
                type="tel"
                maxLength={10}
                value={mobileInput}
                onChange={(e) =>
                  setMobileInput(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter new 10-digit mobile number"
                className="w-full bg-indigo-900 border border-indigo-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 rounded-xl text-white placeholder-indigo-500 text-sm pl-10 pr-4 py-3.5 outline-none transition-all"
              />
            </div>
            <button
              onClick={handleBroadcast}
              disabled={
                mobileInput.length !== 10 ||
                broadcastState === "loading" ||
                broadcastState === "done"
              }
              className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-800 disabled:text-indigo-600 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 px-7 rounded-xl transition-colors duration-150 shadow-sm whitespace-nowrap"
            >
              {broadcastState === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Broadcasting...
                </>
              ) : broadcastState === "done" ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  Broadcast Sent
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Broadcast Identity Update
                </>
              )}
            </button>
          </div>

          {broadcastState === "done" && (
            <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-emerald-300 text-xs">
                Update broadcast transmitted to {suspendedCount + activeCount}{" "}
                services. Token:{" "}
                <span className="font-mono font-bold text-emerald-200">
                  PL-2F9KXB47
                </span>
                . Allow up to 4 hours for all services to acknowledge.
              </p>
            </div>
          )}
        </div>

        {/* ── INSTITUTION GRID ───────────────────────────────── */}
        <div className="animate-fade-up-delay-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif-display text-xl font-semibold text-slate-900">
                Service Footprint
              </h2>
              <p className="text-slate-500 text-sm mt-0.5">
                OTP routing status across all linked government and financial
                services
              </p>
            </div>
            <button className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 border border-slate-200 bg-white rounded-lg px-3 py-2 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {institutions.map((inst) => {
              const status = institutionStatuses[inst.id] ?? inst.status;
              const cfg = statusConfig[status];
              const Icon = inst.icon;

              return (
                <div
                  key={inst.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 govt-card-inset hover:shadow-md transition-shadow flex flex-col gap-4"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <Icon
                        className="w-5 h-5 text-slate-500"
                        strokeWidth={1.8}
                      />
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full border tracking-widest ${cfg.classes}`}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  {/* Name & category */}
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                      {inst.name}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {inst.category}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                    {inst.status === "SUSPENDED" && inst.lastOtp ? (
                      <div className="flex items-center gap-1.5 text-xs text-red-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Last OTP: {inst.lastOtp}</span>
                        {inst.otpCount && inst.otpCount > 0 && (
                          <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold text-[10px]">
                            ×{inst.otpCount}
                          </span>
                        )}
                      </div>
                    ) : status === "UPDATED" ? (
                      <span className="flex items-center gap-1.5 text-xs text-indigo-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Update dispatched
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">
                        No conflicts detected
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ARIA THREAT INTELLIGENCE PANEL ─────────────────── */}
        <div className="animate-fade-up-delay-4 bg-indigo-950 rounded-2xl border border-indigo-800 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <span className="text-[10px] font-semibold tracking-widest text-indigo-400 uppercase">
                ARIA · Automated Remediation &amp; Intelligence Analyst
              </span>
              <h2 className="font-serif-display text-xl font-semibold text-white mt-0.5">
                Security Threat Intelligence
              </h2>
              <p className="text-indigo-400 text-sm mt-1">
                Hybrid ML + AI monitoring protecting your identity gateway in real time
              </p>
            </div>
            <Link href="/aria/dashboard">
              <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-colors whitespace-nowrap">
                <ShieldCheck className="w-4 h-4" />
                Open ARIA Console
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Active threats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {[
              { label: "SIM Swap Fraud", events: 14, score: "0.923", sev: "CRITICAL", mitre: "T1539" },
              { label: "OTP Interception", events: 38, score: "0.871", sev: "CRITICAL", mitre: "T1111" },
              { label: "Identity Cloning", events: 7, score: "0.812", sev: "HIGH", mitre: "T1078" },
              { label: "Port Scan", events: 150, score: "0.754", sev: "HIGH", mitre: "T1046" },
            ].map((t) => (
              <div key={t.label} className="bg-indigo-900/60 rounded-xl border border-indigo-700 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full border ${
                    t.sev === "CRITICAL"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  }`}>{t.sev}</span>
                  <span className="font-mono text-[9px] text-indigo-300">{t.mitre}</span>
                </div>
                <p className="text-white text-xs font-semibold mb-1">{t.label}</p>
                <p className="text-indigo-400 text-[10px]">{t.events} events · Score {t.score}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-indigo-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Isolation Forest ML · 94.2% accuracy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
              Kimi AI playbook generation active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              CERT-In · RBI CSF · DPDP Act 2023 compliant
            </span>
          </div>
        </div>

        {/* Legal footer */}
        <p className="text-center text-[11px] text-slate-400 leading-relaxed pb-4">
          Data sourced from DigiLocker, UIDAI, and registered service providers
          under Section 7 of the DPDP Act, 2023. For grievances, contact NIC
          Help Desk at 1800-111-555 or helpdesk@nic.in
        </p>
      </main>
    </div>
  );
}
