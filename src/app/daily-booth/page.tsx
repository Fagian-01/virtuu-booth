'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarDays, Sparkles, ArrowLeft, Camera, ArrowRight } from 'lucide-react';
import { TODAY_DAILY_BOOTH } from '@/lib/mockData';

export default function DailyBoothPage() {
  const previousDailyBooths = [
    { date: 'March 20', theme: 'Vintage Spring', shots: 3, accent: 'bg-[#FFD8C8]' },
    { date: 'March 19', theme: 'Creamy Monochrome', shots: 1, accent: 'bg-[#DDD5FF]' },
    { date: 'March 18', theme: 'Golden Hour Glow', shots: 4, accent: 'bg-[#FFE99A]' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF5] py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Top back & indicator */}
      <div className="flex items-center justify-between">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#24652A] hover:text-[#68B96B] transition-colors bg-[#EAF5EA] px-4 py-2 rounded-2xl border border-[#A8D3A8]/50 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to booth menu</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFE99A] text-[#24652A] text-xs font-black uppercase tracking-wider shadow-xs">
          <CalendarDays className="w-3.5 h-3.5 text-[#24652A]" />
          <span>daily booth challenge</span>
        </div>
      </div>

      {/* Today's Daily Booth Feature Hero */}
      <div className="bg-[#24652A] text-[#FFFDF5] p-8 sm:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute inset-0 bg-[radial-gradient(#68B96B_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#68B96B] text-white text-xs font-black uppercase tracking-wider shadow-xs">
            {TODAY_DAILY_BOOTH.date} • collectible drop
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
            {TODAY_DAILY_BOOTH.theme}
          </h1>
          <p className="text-[#A8D3A8] text-base sm:text-lg leading-relaxed font-medium">
            {TODAY_DAILY_BOOTH.description}
          </p>
        </div>

        <div className="pt-2 relative z-10">
          <Link
            href="/home/photobooth"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-3xl bg-[#68B96B] hover:bg-[#FFFDF5] hover:text-[#24652A] text-white font-black text-base transition-all shadow-xl hover:scale-105"
          >
            <Camera className="w-5 h-5" />
            <span>Start Today&apos;s Booth</span>
          </Link>
        </div>
      </div>

      {/* Previous Daily Templates Section */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="bg-[#FFD8C8] text-[#24652A] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
            archives
          </span>
          <h2 className="text-3xl font-black text-[#185522]">previous daily drops</h2>
          <p className="text-sm text-[#24652A]/80 font-medium">Explore and replay templates from recent days.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {previousDailyBooths.map((booth, idx) => (
            <div
              key={idx}
              className={`${booth.accent}/40 hover:${booth.accent} p-7 rounded-[2.5rem] border-3 border-white shadow-md space-y-4 flex flex-col justify-between transition-all hover:-translate-y-1`}
            >
              <div className="space-y-2">
                <span className="text-xs font-black px-3.5 py-1 rounded-full bg-[#FFFDF5] text-[#24652A] shadow-xs inline-block">
                  {booth.date}
                </span>
                <h3 className="text-2xl font-black text-[#185522]">{booth.theme}</h3>
                <p className="text-xs text-[#24652A]/80 font-bold">{booth.shots} photo sequence layout</p>
              </div>

              <Link
                href="/home/photobooth"
                className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#24652A] hover:translate-x-1 transition-transform"
              >
                <span>replay template</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
