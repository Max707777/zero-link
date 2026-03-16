"use client";

import Link from "next/link";
import {
  ShieldCheck,
  SmartphoneNfc,
  RefreshCcw,
  Lock,
  ChevronRight,
  AlertTriangle,
  Building2,
  ShieldAlert,
  Activity,
  Cpu,
  Zap,
} from "lucide-react";

export default function GatewayPage() {
  return (
    <div className="noise-overlay min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-indigo-950 border-b border-indigo-800/60 sticky top-0 z-50">
        <div className="bg-indigo-900/80 border-b border-indigo-700/40 py-1 px-6">
          <p className="text-[10px] tracking-widest text-indigo-300 uppercase font-medium text-center">
            भारत सरकार · Government of India &nbsp;|&nbsp; Ministry of Electronics &amp; Information Technology
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="trust-pulse w-9 h-9 rounded-full bg-indigo-700 border border-indigo-500 flex items-center justify-center">
              <Lock className="w-4 h-4 text-indigo-100" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-serif-display text-white text-lg font-semibold tracking-tight leading-none block">Pramaan Ledger</span>
              <span className="text-indigo-300 text-[11px] tracking-widest uppercase leading-none">Citizen Identity Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-indigo-300 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Zero-Trust Mobile Identity Gateway</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-16">
        <div className="animate-fade-up flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-8">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <p className="text-amber-700 text-xs font-medium tracking-wide">SIM Reassignment Event Detected — Identity Remediation Portal Active</p>
        </div>

        <h1 className="animate-fade-up-delay-1 font-serif-display text-4xl sm:text-5xl font-bold text-slate-900 text-center max-w-2xl leading-tight mb-4">
          Reclaim Your Digital Identity
        </h1>
        <p className="animate-fade-up-delay-2 text-slate-500 text-center max-w-xl text-base mb-3 leading-relaxed">
          This portal resolves identity conflicts arising from SIM reassignment events across all government and regulated financial services.
        </p>

        <div className="animate-fade-up-delay-2 rule-ornament w-24 my-8" />

        <div className="animate-fade-up-delay-3 grid sm:grid-cols-2 gap-6 w-full max-w-3xl">
          <div className="group bg-white rounded-2xl border border-slate-200 p-8 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 govt-card-inset flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-6 group-hover:bg-rose-100 transition-colors">
              <SmartphoneNfc className="w-6 h-6 text-rose-600" strokeWidth={1.8} />
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-rose-600 uppercase mb-2">Path A · Incoming OTP Conflict</span>
            <h2 className="font-serif-display text-xl font-semibold text-slate-900 mb-3 leading-snug">I am receiving someone else&apos;s OTPs.</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
              You have recently acquired a mobile number previously assigned to another citizen. Legacy service bindings are sending their OTPs to your device.
            </p>
            <Link href="/sanitizer">
              <button className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-colors shadow-sm">
                Sanitize Number <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="group bg-white rounded-2xl border border-slate-200 p-8 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 govt-card-inset flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
              <RefreshCcw className="w-6 h-6 text-indigo-600" strokeWidth={1.8} />
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-indigo-600 uppercase mb-2">Path B · Identity Update</span>
            <h2 className="font-serif-display text-xl font-semibold text-slate-900 mb-3 leading-snug">I lost my number / Need to update identity.</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
              Your mobile number has changed. OTP routing across banks, EPFO, Ayushman Bharat and other services must be updated.
            </p>
            <Link href="/manager/dashboard">
              <button className="w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-colors shadow-sm">
                Manage Identity <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* ARIA Security Strip */}
        <div className="animate-fade-up-delay-4 mt-10 w-full max-w-3xl">
          <div className="bg-indigo-950 rounded-2xl border border-indigo-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-800 border border-indigo-600 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-indigo-400 uppercase">Security Intelligence</span>
                  <h3 className="font-serif-display text-lg font-semibold text-white mt-0.5">ARIA Threat Console</h3>
                </div>
              </div>
              <div className="sm:ml-auto flex items-center gap-2 text-emerald-400 text-xs font-medium bg-emerald-400/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
                <Activity className="w-3.5 h-3.5" /> ML Engine Active
              </div>
            </div>
            <p className="text-indigo-300 text-sm leading-relaxed mb-5">
              ARIA monitors this portal in real time using a hybrid{" "}
              <span className="text-white font-medium">Isolation Forest ML</span> model and{" "}
              <span className="text-white font-medium">Kimi AI</span> to detect SIM swap fraud, OTP interception,
              and identity cloning — generating automated incident response playbooks with MITRE ATT&amp;CK mapping and CERT-In compliance.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { icon: Activity, label: "Events / Day", value: "5,530", color: "text-indigo-300" },
                { icon: Cpu, label: "ML Accuracy", value: "94.2%", color: "text-emerald-300" },
                { icon: Zap, label: "Threats Active", value: "4", color: "text-amber-300" },
              ].map((s) => (
                <div key={s.label} className="bg-indigo-900/60 rounded-xl border border-indigo-700 p-3 text-center">
                  <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
                  <p className={`font-mono text-sm font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-indigo-400 text-[10px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <Link href="/aria/dashboard">
              <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-colors shadow-sm">
                <ShieldAlert className="w-4 h-4" />
                Open ARIA Threat Intelligence Console
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
            </Link>
          </div>
        </div>

        <div className="animate-fade-up-delay-4 mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-slate-400 text-xs">
          {[
            { icon: ShieldCheck, label: "DigiLocker Integrated" },
            { icon: Lock, label: "End-to-End Encrypted" },
            { icon: Building2, label: "48-Hour Escrow Protocol" },
            { icon: ShieldAlert, label: "ARIA Threat Detection" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 text-indigo-400" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 px-6">
        <p className="text-center text-[11px] text-slate-400 tracking-wide">
          © 2025 National Informatics Centre &nbsp;·&nbsp; MeitY / C-DAC Category 3 &nbsp;·&nbsp; Pramaan Ledger v1.0.0 &nbsp;·&nbsp; ARIA v2.0
        </p>
      </footer>
    </div>
  );
}
