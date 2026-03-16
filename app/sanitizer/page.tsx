"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  ArrowLeft,
  ShieldAlert,
  Fingerprint,
  ExternalLink,
  Clock,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";

export default function SanitizerAuthPage() {
  const [kycDone, setKycDone] = useState(false);
  const [kycLoading, setKycLoading] = useState(false);
  const [escrowState, setEscrowState] = useState<"idle" | "loading" | "done">("idle");

  function simulateKyc() {
    setKycLoading(true);
    setTimeout(() => {
      setKycLoading(false);
      setKycDone(true);
    }, 2200);
  }

  function simulateEscrow() {
    setEscrowState("loading");
    setTimeout(() => {
      setEscrowState("done");
    }, 2500);
  }

  return (
    <div className="noise-overlay min-h-screen bg-slate-50 flex flex-col">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="bg-indigo-950 border-b border-indigo-800/60 sticky top-0 z-50">
        <div className="bg-indigo-900/80 border-b border-indigo-700/40 py-1 px-6">
          <p className="text-[10px] tracking-widest text-indigo-300 uppercase font-medium text-center">
            भारत सरकार · Government of India &nbsp;|&nbsp; Ministry of Electronics &amp; Information Technology
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="trust-pulse w-9 h-9 rounded-full bg-indigo-700 border border-indigo-500 flex items-center justify-center">
              <Lock className="w-4 h-4 text-indigo-100" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-serif-display text-white text-lg font-semibold tracking-tight leading-none block">
                Pramaan Ledger
              </span>
              <span className="text-indigo-300 text-[11px] tracking-widest uppercase leading-none">
                Number Sanitizer
              </span>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-indigo-300 hover:text-white text-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Gateway
          </Link>
        </div>
      </header>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 flex flex-col gap-6">
        {/* Page heading */}
        <div className="animate-fade-up">
          <span className="text-[10px] font-semibold tracking-widest text-rose-600 uppercase">
            Path A · Incoming OTP Conflict
          </span>
          <h1 className="font-serif-display text-3xl font-bold text-slate-900 mt-1 mb-2">
            Number Sanitizer
          </h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-3xl">
            Your mobile number was recently reassigned. Legacy digital bindings
            from the previous owner are routing their OTPs to your device. This
            tool will safely sever those links.
          </p>
          <div className="mt-5 sm:mt-6">
            <Link href="/sanitizer/dashboard" className="inline-flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm text-sm">
              <LayoutDashboard className="w-4 h-4" />
              Go to Monitoring Dashboard
            </Link>
          </div>
        </div>

        {/* ── ALERT: Legacy Bindings ─────────────────────────── */}
        <div className="animate-fade-up-delay-1 rounded-2xl border border-amber-300 bg-amber-50 p-6 flex gap-5">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <p className="font-semibold text-amber-900 text-base mb-1.5">
              Legacy Bindings Detected
            </p>
            <p className="text-amber-800 text-sm leading-relaxed max-w-3xl">
              To protect the previous owner, we must initiate a{" "}
              <strong>48-hour escrow period</strong> before unlinking their
              accounts. This prevents fraudulent account takeovers and is
              mandated by RBI Circular DPSS.CO.OD No. 1098.
            </p>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-amber-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4" />
                Escrow Window: 48 hours post-KYC
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Info className="w-4 h-4" />
                Data Minimization Protocol Active
              </span>
            </div>
          </div>
        </div>

        {/* ── DATA MINIMIZATION NOTICE ─────────────────────── */}
        <div className="animate-fade-up-delay-2 bg-indigo-950 rounded-2xl p-6 flex gap-5">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-800 border border-indigo-600 flex items-center justify-center">
            <Fingerprint className="w-6 h-6 text-indigo-200" />
          </div>
          <div>
            <p className="font-semibold text-white text-base mb-1.5">
              Privacy Shield Active
            </p>
            <p className="text-indigo-300 text-sm leading-relaxed max-w-3xl">
              In accordance with the{" "}
              <span className="text-indigo-100 font-medium">
                DPDP Act, 2023
              </span>
              , the previous owner&apos;s personal data, account details, and
              service names are fully masked. You will not be shown any
              information that does not belong to you.
            </p>
          </div>
        </div>

        {/* ── KYC GATE ────────────────────────────────────────── */}
        <div className="animate-fade-up-delay-3 bg-white rounded-2xl border border-slate-200 p-8 govt-card-inset">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
                Step 1 of 2 · Mandatory
              </span>
              <h2 className="font-serif-display text-2xl font-semibold text-slate-900 mt-1">
                Verify Your Identity
              </h2>
            </div>
            {kycDone ? (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                Verified
              </span>
            ) : (
              <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
                Pending
              </span>
            )}
          </div>

          <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-3xl">
            Before we can initiate the escrow flush, we need to confirm your
            identity using DigiLocker to ensure you are the rightful new owner
            of this mobile number. Your Aadhaar-linked credentials are used
            exclusively for this one-time verification.
          </p>

          {/* KYC steps visual */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 mt-2">
            {[
              { n: "01", label: "Aadhaar OTP", done: kycDone },
              { n: "02", label: "Face Match", done: kycDone },
              { n: "03", label: "Token Issued", done: kycDone },
            ].map((step) => (
              <div
                key={step.n}
                className={`rounded-xl border p-4 text-center transition-colors ${
                  step.done
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <span
                  className={`text-sm font-bold tracking-widest ${
                    step.done ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {step.done ? "✓" : step.n}
                </span>
                <p
                  className={`text-sm font-semibold mt-1.5 ${
                    step.done ? "text-emerald-800" : "text-slate-600"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={simulateKyc}
            disabled={kycDone || kycLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-base py-4 px-6 rounded-xl transition-colors duration-150 shadow-sm"
          >
            {kycLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Connecting to DigiLocker...
              </>
            ) : kycDone ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Authentication Complete
              </>
            ) : (
              <>
                <ExternalLink className="w-5 h-5" />
                Step 1: Authenticate via DigiLocker
              </>
            )}
          </button>
        </div>

        {/* ── ESCROW ACTION ────────────────────────────────────── */}
        <div className="animate-fade-up-delay-4 bg-white rounded-2xl border border-slate-200 p-8 govt-card-inset">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold tracking-widest text-rose-600 uppercase">
                Step 2 of 2 · Irreversible Action
              </span>
              <h2 className="font-serif-display text-2xl font-semibold text-slate-900 mt-1">
                Initiate Escrow Flush
              </h2>
            </div>
            <span
              className={`text-sm font-semibold px-4 py-2 rounded-full border ${
                kycDone
                  ? "text-rose-700 bg-rose-50 border-rose-200"
                  : "text-slate-400 bg-slate-100 border-slate-200"
              }`}
            >
              {kycDone ? "Unlocked" : "Locked"}
            </span>
          </div>

          <p className="text-slate-600 text-base leading-relaxed mb-6 max-w-3xl">
            This will place all legacy service bindings associated with your
            number into a 48-hour escrow state. The previous owner will receive
            a final notice via their alternate contact before permanent
            unlinking. This action cannot be undone once confirmed.
          </p>

          {!kycDone && (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
              <Lock className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-sm text-slate-500 font-medium">
                This button is locked until KYC authentication in Step 1 is
                successfully completed.
              </p>
            </div>
          )}

          <button
            onClick={simulateEscrow}
            disabled={!kycDone || escrowState !== "idle"}
            className={`w-full flex items-center justify-center gap-2 font-semibold text-base py-4 px-6 rounded-xl transition-colors duration-150 shadow-sm ${
              kycDone && escrowState === "idle"
                ? "bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white cursor-pointer"
                : escrowState === "done" 
                ? "bg-emerald-600 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {escrowState === "loading" ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Initiating Flush...
              </>
            ) : escrowState === "done" ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white" />
                Escrow Flush Initiated
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5" />
                Initiate 48-Hour Escrow Flush
                {kycDone && <ChevronRight className="w-5 h-5 ml-auto" />}
              </>
            )}
          </button>
        </div>

        {/* Legal footer note */}
        <p className="text-center text-xs text-slate-400 leading-relaxed pb-6 pt-4">
          This process is governed by TRAI Regulation 2018, RBI Circular
          DPSS.CO.OD No. 1098, and the Digital Personal Data Protection Act
          2023. For grievances, contact your telecom operator or NIC Help Desk
          at 1800-111-555.
        </p>
      </main>
    </div>
  );
}
