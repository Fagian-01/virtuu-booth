'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarDays, Sparkles, ArrowLeft, Camera, Check, RefreshCw, Download, ArrowRight, AlertCircle, Heart, Star } from 'lucide-react';
import { MOCK_TEMPLATES } from '@/lib/mockData';
import { Template } from '@/lib/types';
import { savePhoto, StoredPhoto } from '@/lib/photoStorage';
import { useCameraCapture } from '@/lib/cameraHelper';

export default function DailyBoothPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(MOCK_TEMPLATES[1]);
  const [step, setStep] = useState<'overview' | 'shooting' | 'preview' | 'error'>('overview');
  const [currentShotIndex, setCurrentShotIndex] = useState(0); // 0 to 3
  const [countdown, setCountdown] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [finalPhotostripUrl, setFinalPhotostripUrl] = useState<string | null>(null);
  const [finalPhotostripBlob, setFinalPhotostripBlob] = useState<Blob | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const {
    videoRef,
    cameraReady,
    initializingCamera,
    permissionError,
    initializeCamera,
    startCountdownAndCapture,
    generatePhotostrip,
    stopCamera,
  } = useCameraCapture();

  const getTodayDailyConfig = () => {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    const dateFormatted = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
    }
    const themes = [
      { theme: 'Soft Green Mint Day', description: 'Embrace calm vibes with a gentle mint frame and natural morning lighting.', template: MOCK_TEMPLATES[1] },
      { theme: 'Classic Cream Moments', description: 'Traditional clean photobooth strip with warm cream styling.', template: MOCK_TEMPLATES[0] },
      { theme: 'Retro Polaroid Glow', description: 'Playful retro scrapbook style with nostalgic warmth.', template: MOCK_TEMPLATES[2] },
      { theme: 'Cozy Sage Duo', description: 'Earthy pastel tones and cozy organic borders for today.', template: MOCK_TEMPLATES[3] },
    ];
    const selectedTheme = themes[Math.abs(hash) % themes.length];

    const archives = [
      { date: 'Yesterday', theme: 'Golden Hour Glow', template: MOCK_TEMPLATES[2], rotate: '-rotate-2' },
      { date: '3 days ago', theme: 'Creamy Monochrome', template: MOCK_TEMPLATES[0], rotate: 'rotate-1' },
      { date: 'Earlier this week', theme: 'Vintage Spring', template: MOCK_TEMPLATES[3], rotate: '-rotate-1' },
    ];

    return { dateString, dateFormatted, ...selectedTheme, archives };
  };

  const todayConfig = getTodayDailyConfig();

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleStartDailyBooth = (tmpl: Template = todayConfig.template) => {
    setSelectedTemplate(tmpl);
    setStep('shooting');
    setCurrentShotIndex(0);
    setSavedSuccess(false);
    setFinalPhotostripUrl(null);
    setFinalPhotostripBlob(null);

    initializeCamera();
  };

  useEffect(() => {
    if (step === 'shooting' && cameraReady) {
      startCountdownAndCapture(
        0,
        [],
        () => {
          setCurrentShotIndex((prev) => prev + 1);
        },
        (shots) => {
          stopCamera();
          generatePhotostrip(
            shots,
            `Daily: ${todayConfig.theme}`,
            (blob, url) => {
              setFinalPhotostripBlob(blob);
              setFinalPhotostripUrl(url);
              setStep('preview');
            },
            (msg) => {
              setErrorMessage(msg);
              setStep('error');
            }
          );
        },
        (msg) => {
          stopCamera();
          setErrorMessage(msg);
          setStep('error');
        },
        (count) => {
          setCountdown(count);
        },
        4
      );
    }
  }, [step, cameraReady]);

  const handleSaveToMemories = async () => {
    if (!finalPhotostripBlob) return;
    setSaving(true);
    try {
      const newMemory: StoredPhoto = {
        id: 'daily_' + Date.now(),
        type: 'daily',
        image: finalPhotostripBlob,
        caption: `Daily Booth: ${todayConfig.theme}`,
        createdAt: new Date().toISOString(),
      };
      await savePhoto(newMemory);
      setSaving(false);
      setSavedSuccess(true);
    } catch (err) {
      console.error('Failed to save daily booth:', err);
      setSaving(false);
      alert('Failed to save daily booth.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 relative overflow-hidden">
      {/* Decorative background doodles */}
      <div className="absolute top-12 left-6 text-[#A8D3A8]/40 pointer-events-none -rotate-12 animate-pulse select-none hidden sm:block">
        ✨ 📸 🌿
      </div>
      <div className="absolute top-32 right-8 text-[#A8D3A8]/40 pointer-events-none rotate-12 select-none hidden sm:block">
        🌟 💬 🎞️
      </div>

      {/* Top back & indicator */}
      <div className="flex items-center justify-between">
        <Link
          href="/home"
          onClick={stopCamera}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#24652A] hover:text-[#68B96B] transition-all bg-[#EAF5EA] px-4 py-2 rounded-2xl border border-[#A8D3A8]/50 shadow-xs hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to booth menu</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFE99A] text-[#24652A] text-xs font-black uppercase tracking-wider shadow-xs transform rotate-1">
          <CalendarDays className="w-3.5 h-3.5 text-[#24652A]" />
          <span>daily drop challenge ✨</span>
        </div>
      </div>

      {step === 'overview' && (
        <>
          {/* Today's Daily Booth Scrapbook Card */}
          <div className="bg-[#24652A] text-[#FFFDF5] p-8 sm:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden space-y-8 transform hover:rotate-0 transition-transform duration-500 border-4 border-[#68B96B]/40">
            {/* Scrapbook Tape Header */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-[#FFE99A]/80 backdrop-blur-xs rounded-sm shadow-sm rotate-1 opacity-90 border border-yellow-200/40" />

            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#68B96B_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

            <div className="space-y-4 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#68B96B] text-white text-xs font-black uppercase tracking-wider shadow-xs">
                {todayConfig.dateFormatted} • featured daily drop 🌿
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight drop-shadow-sm">
                {todayConfig.theme}
              </h1>
              <p className="text-[#A8D3A8] text-base sm:text-lg leading-relaxed font-medium">
                {todayConfig.description}
              </p>
            </div>

            <div className="pt-2 relative z-10 flex items-center gap-4 flex-wrap">
              <button
                onClick={() => handleStartDailyBooth(todayConfig.template)}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-3xl bg-[#68B96B] hover:bg-[#FFFDF5] hover:text-[#24652A] text-white font-black text-base transition-all shadow-xl hover:scale-105 hover:-translate-y-1"
              >
                <Camera className="w-5 h-5 animate-pulse" />
                <span>Use Today&apos;s Booth</span>
              </button>
              <span className="text-xs font-bold text-[#A8D3A8] bg-black/20 px-4 py-2 rounded-2xl backdrop-blur-xs">
                ✨ 4-shot polaroid layout
              </span>
            </div>
          </div>

          {/* Previous Daily Templates Section */}
          <div className="space-y-6 pt-4">
            <div className="space-y-1">
              <span className="bg-[#FFD8C8] text-[#24652A] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                archives
              </span>
              <h2 className="text-3xl font-black text-[#185522]">previous daily drops</h2>
              <p className="text-sm text-[#24652A]/80 font-medium">Replay and collect templates from recent days.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {todayConfig.archives.map((booth, idx) => {
                const accents = ['bg-[#EAF5EA] border-[#A8D3A8]', 'bg-[#FFD8C8]/60 border-[#FFD8C8]', 'bg-[#DDD5FF]/60 border-[#DDD5FF]'];
                const accent = accents[idx % accents.length];
                return (
                  <div
                    key={idx}
                    className={`${accent} p-7 rounded-[2.5rem] border-3 shadow-lg space-y-5 flex flex-col justify-between transition-all duration-300 transform ${booth.rotate} hover:rotate-0 hover:-translate-y-2 hover:shadow-2xl relative`}
                  >
                    {/* Small scrapbook sticker tape */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-white/60 backdrop-blur-xs rounded-sm shadow-2xs rotate-2" />

                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-black px-3.5 py-1 rounded-full bg-[#FFFDF5] text-[#24652A] shadow-xs inline-block">
                        {booth.date}
                      </span>
                      <h3 className="text-2xl font-black text-[#185522]">{booth.theme}</h3>
                      <p className="text-xs text-[#24652A]/80 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#68B96B] fill-[#68B96B]" /> 4-shot polaroid layout
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartDailyBooth(booth.template)}
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#24652A] hover:text-[#68B96B] hover:translate-x-1 transition-all text-left pt-2"
                    >
                      <span>replay template</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {step === 'shooting' && (
        <div className="max-w-2xl mx-auto bg-[#EAF5EA]/85 backdrop-blur-sm p-8 sm:p-10 rounded-[3rem] border-3 border-[#A8D3A8] shadow-2xl space-y-8 text-center relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-[#FFE99A] rounded-sm shadow-sm rotate-1" />

          <div className="space-y-2 pt-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#24652A] bg-[#FFE99A] px-4 py-1.5 rounded-full shadow-xs inline-block">
              {!cameraReady ? 'Initializing Camera...' : `Shot ${Math.min(currentShotIndex + 1, 4)} / 4`}
            </span>
            <h2 className="text-3xl font-black text-[#185522]">
              {!cameraReady ? 'getting ready... 🎥' : 'strike a pose! 📸'}
            </h2>
            <p className="text-sm text-[#24652A]/80 font-medium">
              Daily Drop: <span className="font-extrabold text-[#185522]">{todayConfig.theme}</span>
            </p>
          </div>

          <div className="max-w-md mx-auto aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#24652A] relative shadow-2xl flex items-center justify-center border-4 border-[#A8D3A8]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {initializingCamera && (
              <div className="absolute inset-0 bg-[#185522]/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white space-y-3">
                <div className="w-8 h-8 border-4 border-[#68B96B] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-bold">connecting to your camera...</p>
              </div>
            )}

            {cameraReady && countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                <span className="text-8xl font-black text-[#FFFDF5] animate-pulse drop-shadow-lg">
                  {countdown}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${
                  idx < currentShotIndex || (idx === currentShotIndex && countdown === null && cameraReady)
                    ? 'bg-[#68B96B] text-white shadow-md'
                    : idx === currentShotIndex && cameraReady
                    ? 'bg-[#FFE99A] text-[#24652A] animate-bounce shadow-md'
                    : 'bg-[#FFFDF5] text-[#24652A]/40 border border-[#A8D3A8]'
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {permissionError && (
        <div className="max-w-md mx-auto bg-[#FFFDF5] p-8 rounded-[3rem] shadow-2xl border-4 border-rose-300 space-y-6 text-center relative">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#185522]">camera issue</h2>
            <p className="text-sm text-rose-700 font-medium leading-relaxed">
              camera access is needed to capture your booth.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => handleStartDailyBooth(todayConfig.template)}
              className="w-full py-4 rounded-2xl bg-[#68B96B] hover:bg-[#24652A] text-white font-extrabold text-base shadow-lg transition-all hover:scale-[1.02]"
            >
              try again
            </button>
            <button
              onClick={() => {
                stopCamera();
                setStep('overview');
              }}
              className="w-full py-3 rounded-2xl bg-[#EAF5EA] text-[#24652A] font-bold text-sm hover:bg-[#A8D3A8]/40 transition-all"
            >
              back to booth
            </button>
          </div>
        </div>
      )}

      {step === 'preview' && finalPhotostripUrl && (
        <div className="max-w-lg mx-auto bg-[#FFFDF5] p-8 rounded-[3rem] shadow-2xl border-4 border-[#A8D3A8] space-y-6 relative transform rotate-1">
          {/* Scrapbook tape */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-[#FFD8C8] rounded-sm shadow-sm -rotate-1" />

          <div className="text-center space-y-1 pt-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-[#68B96B] px-3.5 py-1 rounded-full mb-1 shadow-xs">
              <Check className="w-3.5 h-3.5" /> daily drop generated ✨
            </div>
            <h2 className="text-2xl font-black text-[#185522]">{todayConfig.theme}</h2>
            <p className="text-xs text-[#24652A]/70 font-medium">{todayConfig.dateFormatted}</p>
          </div>

          <div className="bg-[#FFFDF5] p-3 rounded-2xl border-3 border-[#24652A]/25 shadow-inner flex items-center justify-center">
            <img
              src={finalPhotostripUrl}
              alt="Daily Booth Strip"
              className="w-full h-auto object-contain rounded-xl shadow-md"
            />
          </div>

          {savedSuccess && (
            <div className="bg-[#68B96B]/20 border border-[#68B96B] text-[#185522] py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
              <Check className="w-4 h-4 text-[#68B96B]" />
              <span>saved to memories ✨</span>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                stopCamera();
                setStep('overview');
              }}
              className="w-full py-3.5 rounded-2xl bg-[#EAF5EA] hover:bg-[#A8D3A8]/40 text-[#24652A] font-extrabold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#A8D3A8]/50 hover:-translate-y-0.5"
            >
              <RefreshCw className="w-4 h-4" />
              <span>retake daily shot</span>
            </button>
            <button
              onClick={handleSaveToMemories}
              disabled={saving || savedSuccess}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] ${
                savedSuccess
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[#68B96B] hover:bg-[#24652A] text-white shadow-[#68B96B]/20'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{saving ? 'Saving...' : savedSuccess ? 'Saved to Memories!' : 'Save to Memories'}</span>
            </button>

            {savedSuccess && (
              <div className="text-center pt-1">
                <Link
                  href="/memories"
                  onClick={stopCamera}
                  className="text-sm font-extrabold text-[#68B96B] hover:text-[#24652A] underline"
                >
                  View in Memories →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
