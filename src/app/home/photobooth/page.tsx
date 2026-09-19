'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Film, ArrowLeft, Camera, Check, RefreshCw, Download, AlertCircle, Sparkles } from 'lucide-react';
import { MOCK_TEMPLATES } from '@/lib/mockData';
import { Template } from '@/lib/types';
import { savePhoto, StoredPhoto } from '@/lib/photoStorage';

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

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const [initializingCamera, setInitializingCamera] = useState(false);

  // Stop camera tracks cleanly
  const stopCameraTracks = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Initialize Camera strictly when entering the shooting step
  const initializeCamera = async () => {
    setInitializingCamera(true);
    setPermissionError(false);
    setCameraReady(false);

    stopCameraTracks();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (e) {
          console.warn('Auto-play blocked or failed:', e);
        }

        // Wait until video metadata and dimensions are fully ready
        const checkVideoReady = () => {
          const video = videoRef.current;
          if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.videoWidth > 0 && video.videoHeight > 0) {
            setCameraReady(true);
            setInitializingCamera(false);
            // Once camera is ready and preview is showing, start the 4-shot countdown sequence
            startCountdownAndCapture(0, []);
          } else {
            setTimeout(checkVideoReady, 100);
          }
        };

        checkVideoReady();
      } else {
        setInitializingCamera(false);
      }
    } catch (err) {
      console.error('getUserMedia error:', err);
      setPermissionError(true);
      setInitializingCamera(false);
      setErrorMessage('We couldn’t access your camera. Please check camera permissions and try again.');
      setStep('error');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCameraTracks();
    };
  }, []);

  const handleStartShooting = (template: Template) => {
    setSelectedTemplate(template);
    setStep('shooting');
    setCurrentShotIndex(0);
    setSavedSuccess(false);
    setFinalPhotostripUrl(null);
    setFinalPhotostripBlob(null);
    setCameraReady(false);

    // Initialize camera now that we are in the shooting step
    initializeCamera();
  };

  const startCountdownAndCapture = (shotIdx: number, existingShots: string[]) => {
    if (shotIdx >= 4) {
      stopCameraTracks();
      if (existingShots.length === 4) {
        generatePhotostrip(existingShots);
      } else {
        setErrorMessage('We could not capture all 4 shots from your camera. Please try again.');
        setStep('error');
      }
      return;
    }

    setCurrentShotIndex(shotIdx);
    setCountdown(3);

    let currentCount = 3;
    const timer = setInterval(() => {
      currentCount -= 1;
      if (currentCount > 0) {
        setCountdown(currentCount);
      } else {
        clearInterval(timer);
        setCountdown(null);
        takeShotCapture(shotIdx, existingShots);
      }
    }, 1000);
  };

  const takeShotCapture = (shotIdx: number, existingShots: string[]) => {
    const video = videoRef.current;

    if (
      !video ||
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      !video.videoWidth ||
      !video.videoHeight
    ) {
      console.error('Camera video element not ready at capture time:', {
        hasVideo: !!video,
        readyState: video?.readyState,
        width: video?.videoWidth,
        height: video?.videoHeight,
      });
      stopCameraTracks();
      setErrorMessage('We couldn’t capture this shot. Your camera feed was interrupted. Please try again.');
      setStep('error');
      return;
    }

    const vWidth = video.videoWidth;
    const vHeight = video.videoHeight;

    const canvas = document.createElement('canvas');
    canvas.width = vWidth;
    canvas.height = vHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      stopCameraTracks();
      setErrorMessage('Failed to initialize canvas context for photo capture.');
      setStep('error');
      return;
    }

    ctx.drawImage(video, 0, 0, vWidth, vHeight);
    const shotDataUrl = canvas.toDataURL('image/png');

    if (!shotDataUrl || shotDataUrl.length < 100) {
      stopCameraTracks();
      setErrorMessage('Captured shot data was empty or invalid.');
      setStep('error');
      return;
    }

    const updatedShots = [...existingShots, shotDataUrl];

    setTimeout(() => {
      startCountdownAndCapture(shotIdx + 1, updatedShots);
    }, 800);
  };

  const generatePhotostrip = async (shots: string[]) => {
    if (shots.length !== 4) {
      setErrorMessage('Invalid number of captured shots for photostrip generation.');
      setStep('error');
      return;
    }

    const canvas = document.createElement('canvas');
    const width = 600;
    const padding = 40;
    const headerHeight = 110;
    const footerHeight = 70;
    const photoWidth = width - padding * 2; // 520px wide
    const photoHeight = 390; // 4:3 aspect ratio (520 * 3/4 = 390)
    const gap = 25;

    const totalHeight = headerHeight + (photoHeight * 4) + (gap * 3) + footerHeight;
    canvas.width = width;
    canvas.height = totalHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setErrorMessage('Failed to initialize photostrip canvas context.');
      setStep('error');
      return;
    }

    // Background styling based on template
    let bgColor = '#FFFDF5';
    if (selectedTemplate.id === 't2') bgColor = '#EAF5EA';
    if (selectedTemplate.id === 't3') bgColor = '#FFFDF5';
    if (selectedTemplate.id === 't4') bgColor = '#A8D3A8';

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, totalHeight);

    // Decorative Header Branding
    ctx.fillStyle = '#24652A';
    ctx.font = '900 24px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VIRTUU BOOTH', width / 2, 55);

    ctx.font = '700 13px system-ui, sans-serif';
    ctx.fillStyle = '#68B96B';
    const dateStr = new Date().toLocaleDateString();
    ctx.fillText(`• ${dateStr} • ${selectedTemplate.name} •`, width / 2, 85);

    let startY = headerHeight;

    for (let i = 0; i < shots.length; i++) {
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.save();
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
          ctx.shadowBlur = 12;
          ctx.shadowOffsetY = 4;
          ctx.beginPath();
          ctx.roundRect(padding - 8, startY - 8, photoWidth + 16, photoHeight + 16, 16);
          ctx.fill();
          ctx.restore();

          const sWidth = img.naturalWidth || img.width;
          const sHeight = img.naturalHeight || img.height;
          const sAspect = sWidth / sHeight;
          const targetAspect = photoWidth / photoHeight;

          let sx = 0, sy = 0, sw = sWidth, sh = sHeight;

          if (sAspect > targetAspect) {
            sw = sHeight * targetAspect;
            sx = (sWidth - sw) / 2;
          } else {
            sh = sWidth / targetAspect;
            sy = (sHeight - sh) / 2;
          }

          ctx.drawImage(img, sx, sy, sw, sh, padding, startY, photoWidth, photoHeight);

          startY += photoHeight + gap;
          resolve();
        };
        img.onerror = (err) => {
          console.error('Failed to load captured shot image for canvas:', err);
          reject(err);
        };
        img.src = shots[i];
      }).catch(() => {});
    }

    // Footer Branding
    ctx.fillStyle = '#24652A';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('#makeMomentsNotJustPhotos ✨', width / 2, totalHeight - 30);

    canvas.toBlob((blob) => {
      if (blob) {
        setFinalPhotostripBlob(blob);
        setFinalPhotostripUrl(URL.createObjectURL(blob));
        setStep('preview');
      } else {
        setErrorMessage('Failed to generate final photostrip image blob.');
        setStep('error');
      }
    }, 'image/png');
  };

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
    stopCameraTracks();
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
          onClick={stopCameraTracks}
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
              {!cameraReady ? 'Initializing Camera...' : `Shot ${currentShotIndex + 1} / 4`}
            </span>
            <h2 className="text-3xl font-black text-[#185522]">
              {!cameraReady ? 'getting ready... 🎥' : 'strike a pose! 📸'}
            </h2>
            <p className="text-sm text-[#24652A]/80 font-medium">
              Template: <span className="font-extrabold text-[#185522]">{selectedTemplate.name}</span>
            </p>
          </div>

          {/* Camera Viewfinder with Countdown overlay */}
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

            {/* Countdown Overlay */}
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
                stopCameraTracks();
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

          {/* Final Photostrip Image Preview: natural height, full display without internal scrollbar */}
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
                stopCameraTracks();
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
                  onClick={stopCameraTracks}
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
