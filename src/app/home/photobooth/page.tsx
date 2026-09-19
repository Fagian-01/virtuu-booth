'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Film, ArrowLeft, Camera, Check, RefreshCw, Download, AlertCircle } from 'lucide-react';
import { MOCK_TEMPLATES } from '@/lib/mockData';
import { Template } from '@/lib/types';
import { savePhoto, StoredPhoto } from '@/lib/photoStorage';
import { useCameraCapture } from '@/lib/cameraHelper';

export default function PhotoboothPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(MOCK_TEMPLATES[0]);
  const [step, setStep] = useState<'choose-template' | 'shooting' | 'preview' | 'error'>('choose-template');
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
    initializeCamera,
    startCountdownAndCapture,
    generatePhotostrip,
    stopCamera,
  } = useCameraCapture();

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleStartShooting = (template: Template) => {
    setSelectedTemplate(template);
    setStep('shooting');
    setCurrentShotIndex(0);
    setSavedSuccess(false);
    setFinalPhotostripUrl(null);
    setFinalPhotostripBlob(null);

    initializeCamera().then(() => {
      // Trigger sequence once camera is ready via hook
    });
  };

  // Trigger sequence when camera becomes ready in shooting step
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
            selectedTemplate.name,
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
        id: 'photobooth_' + Date.now(),
        type: 'photobooth',
        image: finalPhotostripBlob,
        caption: `${selectedTemplate.name} strip`,
        createdAt: new Date().toISOString(),
      };
      await savePhoto(newMemory);
      setSaving(false);
      setSavedSuccess(true);
    } catch (err) {
      console.error('Failed to save photobooth strip:', err);
      setSaving(false);
      alert('Failed to save photobooth strip.');
    }
  };

  const handleRetryCamera = () => {
    stopCamera();
    setStep('shooting');
    initializeCamera();
  };

  const templateAccents = ['bg-[#EAF5EA] border-[#A8D3A8]', 'bg-[#FFD8C8]/50 border-[#FFD8C8]', 'bg-[#DDD5FF]/50 border-[#DDD5FF]', 'bg-[#FFE99A]/50 border-[#FFE99A]'];

  return (
    <div className="min-h-screen bg-[#FFFDF5] py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Top back & indicator */}
      <div className="flex items-center justify-between">
        <Link
          href="/home"
          onClick={stopCamera}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#24652A] hover:text-[#68B96B] transition-colors bg-[#EAF5EA] px-4 py-2 rounded-2xl border border-[#A8D3A8]/50 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to booth menu</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFD8C8] text-[#24652A] text-xs font-black uppercase tracking-wider shadow-xs">
          <Film className="w-3.5 h-3.5 text-[#24652A]" />
          <span>virtual photobooth strip</span>
        </div>
      </div>

      {step === 'choose-template' && (
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <span className="bg-[#FFE99A] text-[#24652A] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
              strip templates
            </span>
            <h1 className="text-4xl font-black text-[#185522]">choose your booth template</h1>
            <p className="text-[#24652A]/80 text-base font-medium">
              Select a strip layout to start taking your sequenced 4-shot photobooth photos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MOCK_TEMPLATES.map((tmpl, idx) => {
              const accent = templateAccents[idx % templateAccents.length];
              return (
                <div
                  key={tmpl.id}
                  className={`${accent} p-7 rounded-[2.5rem] border-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all space-y-5 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-[#185522]">{tmpl.name}</h3>
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-[#FFFDF5] text-[#24652A] shadow-xs">
                        4 shots
                      </span>
                    </div>
                    <p className="text-sm text-[#24652A]/80 font-medium">{tmpl.description}</p>
                  </div>

                  <button
                    onClick={() => handleStartShooting(tmpl)}
                    className="w-full py-3.5 rounded-2xl bg-[#68B96B] hover:bg-[#24652A] text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Camera className="w-4 h-4" />
                    <span>use this template</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {step === 'shooting' && (
        <div className="max-w-2xl mx-auto bg-[#EAF5EA]/70 p-8 rounded-[2.5rem] border-2 border-[#A8D3A8]/60 shadow-xl space-y-8 text-center">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#24652A] bg-[#FFE99A] px-4 py-1 rounded-full shadow-xs">
              {!cameraReady ? 'Initializing Camera...' : `Shot ${Math.min(currentShotIndex + 1, 4)} / 4`}
            </span>
            <h2 className="text-3xl font-black text-[#185522]">
              {!cameraReady ? 'getting ready... 🎥' : 'strike a pose! 📸'}
            </h2>
            <p className="text-sm text-[#24652A]/80 font-medium">
              Template: <span className="font-extrabold text-[#185522]">{selectedTemplate.name}</span>
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

          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                  idx < currentShotIndex || (idx === currentShotIndex && countdown === null && cameraReady)
                    ? 'bg-[#68B96B] text-white'
                    : idx === currentShotIndex && cameraReady
                    ? 'bg-[#FFE99A] text-[#24652A] animate-bounce'
                    : 'bg-[#FFFDF5] text-[#24652A]/40 border border-[#A8D3A8]'
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'error' && (
        <div className="max-w-md mx-auto bg-[#FFFDF5] p-8 rounded-[2.5rem] shadow-2xl border-4 border-rose-300 space-y-6 text-center">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#185522]">camera issue</h2>
            <p className="text-sm text-rose-700 font-medium leading-relaxed">
              {errorMessage || 'We couldn’t access your camera. Please check camera permissions and try again.'}
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={handleRetryCamera}
              className="w-full py-4 rounded-2xl bg-[#68B96B] hover:bg-[#24652A] text-white font-extrabold text-base shadow-lg transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                stopCamera();
                setStep('choose-template');
              }}
              className="w-full py-3 rounded-2xl bg-[#EAF5EA] text-[#24652A] font-bold text-sm hover:bg-[#A8D3A8]/40 transition-all"
            >
              Choose Another Template
            </button>
          </div>
        </div>
      )}

      {step === 'preview' && finalPhotostripUrl && (
        <div className="max-w-lg mx-auto bg-[#FFFDF5] p-7 rounded-[2.5rem] shadow-2xl border-4 border-[#A8D3A8] space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-[#68B96B] px-3.5 py-1 rounded-full mb-1 shadow-xs">
              <Check className="w-3.5 h-3.5" /> photostrip generated ✨
            </div>
            <h2 className="text-2xl font-black text-[#185522]">virtuu booth strip</h2>
            <p className="text-xs text-[#24652A]/70 font-medium">Created with {selectedTemplate.name}</p>
          </div>

          <div className="bg-[#FFFDF5] p-3 rounded-2xl border-3 border-[#24652A]/25 shadow-inner flex items-center justify-center">
            <img
              src={finalPhotostripUrl}
              alt="Generated photostrip"
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
                setStep('choose-template');
              }}
              className="w-full py-3.5 rounded-2xl bg-[#EAF5EA] hover:bg-[#A8D3A8]/40 text-[#24652A] font-extrabold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#A8D3A8]/50"
            >
              <RefreshCw className="w-4 h-4" />
              <span>retake / choose template</span>
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
