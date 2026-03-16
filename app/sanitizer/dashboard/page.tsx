"use client";

import Link from "next/link";
import {
  Shield,
  Search,
  Bell,
  Home,
  LayoutDashboard,
  FileText,
  BookOpen,
  Newspaper,
  PhoneCall,
  Activity,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Download,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Zap,
  Smartphone,
  Server,
  Database,
  ShieldAlert,
  Radio,
  Wifi
} from "lucide-react";

export default function SanitizationPortal() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-ibm text-slate-900">
      {/* HEADER SECTION */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        {/* Top Government Strip */}
        <div className="bg-slate-950 py-1.5 px-6 border-b border-slate-800">
          <p className="text-[10px] tracking-widest text-slate-300 uppercase font-medium text-center sm:text-left">
            भारत सरकार · Government of India &nbsp;|&nbsp; Ministry of Communications &amp; Information Technology
          </p>
        </div>
        
        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-indigo-400">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight leading-none text-white">
                Public SIM Sanitization &amp; Monitoring Portal
              </h1>
              <p className="text-indigo-200 text-xs tracking-wide uppercase mt-1">National Telecom Identity Gateway</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search MSISDNs, reports..." 
                className="bg-slate-800 border border-slate-700 text-sm text-white rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64 transition-all"
              />
            </div>
            <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-900"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-white">AD</span>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="bg-slate-800 border-t border-slate-700 hidden sm:block">
          <div className="max-w-7xl mx-auto px-6 flex items-center space-x-1">
            {[
              { label: "Home", icon: Home, active: false, href: "/" },
              { label: "Dashboard", icon: LayoutDashboard, active: true, href: "#" },
              { label: "Ledger Log", icon: Database, active: false, href: "#" },
              { label: "Guidelines", icon: BookOpen, active: false, href: "#" },
              { label: "News & Alerts", icon: Newspaper, active: false, href: "#" },
              { label: "Contact Us", icon: PhoneCall, active: false, href: "#" },
            ].map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${item.active ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Dashboard & Visuals */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Section Header */}
          <div>
            <h2 className="text-2xl font-serif-display font-bold text-slate-900">National SIM Verification Overview</h2>
            <p className="text-sm text-slate-500 mt-1">Real-time statistics and continuous monitoring metrics across all telecom circles.</p>
          </div>

          {/* KEY METRIC CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Total SIMs Sanitized", value: "1.4M", icon: Smartphone, trend: "+12% this week", color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
              { label: "Active API Nodes", value: "842", icon: Server, trend: "99.9% uptime", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
              { label: "Daily Reassignments", value: "34,104", icon: FileText, trend: "Updated 5m ago", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
              { label: "Telecom Circles", value: "24", icon: Radio, trend: "All active", color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
              { label: "Pending Escrows", value: "8,942", icon: Clock, trend: "-5% backlog", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
              { label: "Digital Trust Score", value: "A+", icon: ShieldCheck, trend: "Top 10% globally", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="flex items-center text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-1 text-emerald-500" />
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif-display text-slate-800">{stat.value}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DATA VISUALIZATION SECTION */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Chart 1: Bar Chart (Coverage by City) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center justify-between">
                Sanitization by Telecom Circle
                <span className="text-xs font-normal text-indigo-600 cursor-pointer hover:underline">Full Report</span>
              </h3>
              <div className="space-y-4">
                {[
                  { city: "Maharashtra", pct: 92, val: "420K SIMs" },
                  { city: "Delhi NCR", pct: 85, val: "380K SIMs" },
                  { city: "Karnataka", pct: 78, val: "310K SIMs" },
                  { city: "Tamil Nadu", pct: 70, val: "250K SIMs" },
                  { city: "West Bengal", pct: 64, val: "190K SIMs" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-24 text-xs font-medium text-slate-600 truncate">{row.city}</span>
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${row.pct}%` }}></div>
                    </div>
                    <span className="w-16 text-right text-[10px] font-mono text-slate-400">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Area / Line Graph Mockup (Daily Activity) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center justify-between">
                Daily SIM Reassignments Processed
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-500">Last 7 Days</span>
              </h3>
              <div className="flex-1 flex items-end gap-2 h-32 mt-4 border-b border-slate-100 pb-2 relative">
                <div className="absolute inset-0 flex flex-col justify-between hidden sm:flex pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full border-t border-slate-100 border-dashed h-0"></div>
                  ))}
                </div>
                
                {[40, 60, 45, 80, 75, 95, 85].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end items-center group z-10 h-full">
                    <span className="text-[9px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-mono">{h * 5}K</span>
                    <div className="w-full bg-emerald-400/80 hover:bg-emerald-500 rounded-t-sm transition-all origin-bottom" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 px-1 text-[9px] text-slate-400 uppercase tracking-widest">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            {/* Chart 3: Pie Chart / Distributor Breakdown */}
            <div className="md:col-span-2 bg-slate-800 text-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <ShieldAlert className="w-48 h-48" />
              </div>
              
              <div className="flex-1 relative z-10">
                <h3 className="font-semibold text-white mb-2 text-lg">SIM Flag Reasons Breakdown</h3>
                <p className="text-slate-400 text-sm mb-5">Distribution of security flags triggering identity sanitization protocols across networks.</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-400 shadow-sm"></span>
                    <span className="text-xs text-slate-300">Frequent Porting (45%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm"></span>
                    <span className="text-xs text-slate-300">Short-term Reassignment (30%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400 shadow-sm"></span>
                    <span className="text-xs text-slate-300">Fraud History (15%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></span>
                    <span className="text-xs text-slate-300">Anomalous Geolocation (10%)</span>
                  </div>
                </div>
              </div>
              
              <div className="shrink-0 w-32 h-32 rounded-full border-4 border-slate-700 relative flex items-center justify-center z-10" 
                   style={{ background: `conic-gradient(#818cf8 0% 45%, #34d399 45% 75%, #fb7185 75% 90%, #fbbf24 90% 100%)` }}>
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center flex-col shadow-inner">
                  <span className="text-xs font-bold text-white">100%</span>
                  <span className="text-[8px] text-slate-400 tracking-wider">FLAGS</span>
                </div>
              </div>
            </div>
          </div>

          {/* PUBLIC INFORMATION SECTION */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
            <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Telecom &amp; Regulatory Guidelines
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="#" className="flex gap-4 p-4 bg-white rounded-lg border border-indigo-100 hover:border-indigo-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 shrink-0 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">Standard Operating Protocols</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">Guidelines for handling SIM swap requests, escrow periods, and KYC remediations.</p>
                </div>
              </a>
              <a href="#" className="flex gap-4 p-4 bg-white rounded-lg border border-indigo-100 hover:border-indigo-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 shrink-0 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">Fraud Mitigation Directives</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">Advisories regarding OTP interception risks and mandated verification APIs.</p>
                </div>
              </a>
              <a href="#" className="flex gap-4 p-4 bg-white rounded-lg border border-indigo-100 hover:border-indigo-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 shrink-0 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">High-Risk SIM Handlers</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">Protocols securely provided for handling numbers previously linked to financial fraud.</p>
                </div>
              </a>
              <a href="#" className="flex gap-4 p-4 bg-white rounded-lg border border-indigo-100 hover:border-indigo-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 shrink-0 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">National Activity PDF</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">Download the auto-generated SIM reassignment risk report for the last 24 hours.</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Panels */}
        <div className="w-full lg:w-96 flex flex-col gap-6">

          {/* QUICK ACTION PANEL */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-indigo-600 px-5 py-4">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Emergency &amp; Quick Actions
              </h3>
            </div>
            <div className="p-2">
              <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg group transition-colors text-left border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors block">Report Suspicious SIM</span>
                    <span className="text-[10px] text-slate-500">Flag an MSISDN requiring urgent investigation</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg group transition-colors text-left border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors block">Request Manual Verification</span>
                    <span className="text-[10px] text-slate-500">Initiate deep KYC verification for a number</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg group transition-colors text-left border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors block">View TRAI Guidelines</span>
                    <span className="text-[10px] text-slate-500">Browse extensive regulatory directives</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg group transition-colors text-left border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors block">Download Ledger Report</span>
                    <span className="text-[10px] text-slate-500">Get complete daily immutable block analytics</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
              </button>
            </div>
          </div>

          {/* GOVERNMENT NEWS & ALERTS */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 max-h-[460px]">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-indigo-600" />
                News &amp; Alerts
              </h3>
              <a href="#" className="text-[10px] font-semibold text-indigo-600 hover:underline uppercase tracking-wide">View All</a>
            </div>
            <div className="p-5 flex-1 overflow-y-auto space-y-6">
              {[
                { type: 'CIRCULAR', title: 'Revised SOP for Numbers with 5+ Porting Requests', date: 'Oct 12, 2024', urgent: true, desc: 'Frequent porting requires level-4 e-KYC reverification to assure identity integrity.' },
                { type: 'NEWS', title: 'Pan-India Pramaan Ledger Implementation Yields Results', date: 'Oct 10, 2024', urgent: false, desc: 'National metrics report a 30% reduction in OTP interception across major banks.' },
                { type: 'ALERT', title: 'Cyber Dept issues warning for targeted SIM swaps', date: 'Oct 09, 2024', urgent: true, desc: 'Banks advised to hold high-value transactions for numbers reassigned within 48 hours.' },
                { type: 'UPDATE', title: 'API Gateway expanded for 500 new Rural Finance Centers', date: 'Oct 05, 2024', urgent: false, desc: 'A major technological jump expanding verification coverage across rural areas.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="flex flex-col items-center mt-1">
                    <div className={`w-2 h-2 rounded-full ${item.urgent ? 'bg-rose-500 animate-pulse' : 'bg-indigo-300'}`}></div>
                    <div className="w-px h-full bg-slate-100 mt-2"></div>
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded border ${
                        item.type === 'ALERT' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        item.type === 'CIRCULAR' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>{item.type}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors mb-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2 mb-2">{item.desc}</p>
                    <button className="text-[10px] uppercase font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-800 transition-colors">
                      Read More <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LIVE ACTIVITY FEED */}
          <div className="bg-slate-900 text-white rounded-xl shadow-sm p-5 pb-6">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-emerald-400" />
              Live Dashboard Feed
            </h3>
            <div className="space-y-4">
              {[
                { loc: "Mumbai Circle, MH", unit: "Pramaan Node", time: "2 min ago", type: "SIM Sanitized" },
                { loc: "Delhi NCR", unit: "Aria AI", time: "5 min ago", type: "Fraud Flagged" },
                { loc: "Bangalore Circle, KA", unit: "TRAI API", time: "11 min ago", type: "Reassignment Logged" },
              ].map((act, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-200 text-xs block">{act.loc}</span>
                      <span className="text-[10px] text-slate-500">{act.type}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 rounded inline-block">{act.unit}</p>
                    <p className="text-[9px] text-slate-500 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-indigo-500" />
              <span className="font-serif-display text-white text-lg font-bold">Sanitization Portal</span>
            </div>
            <p className="text-xs leading-relaxed mb-4">National framework for telecommunication identity, safety tracking, and fraud prevention.</p>
            <p className="text-xs">Helpdesk: <a href="mailto:support@gov.in" className="text-indigo-400 hover:text-indigo-300 transition-colors">support@sanitization.gov.in</a></p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#" className="hover:text-white transition-colors">National Data Portal</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Ministry of Communications Data</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">TRAI Directives</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">State Nodal Centers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Policies</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hyperlink Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Connect With Us</h4>
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer text-white text-xs font-bold">X</div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer text-white text-xs font-bold">IN</div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer text-white text-xs font-bold">FB</div>
            </div>
            <p className="text-[10px] text-slate-500">Emergency Contact: <span className="text-white">1930 (Cyber Fraud)</span></p>
          </div>
        </div>
        <div className="text-center text-[11px] text-slate-500">
          <p>© 2026 Government of India. Designed, Developed and Hosted by National Informatics Centre (NIC), Ministry of Electronics &amp; IT.</p>
          <p className="mt-1">Compatible with latest versions of modern browsers. V1.0.4-stable</p>
        </div>
      </footer>
    </div>
  );
}
