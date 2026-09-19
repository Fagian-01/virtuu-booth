'use client';

import { useState, useRef } from 'react';

export function useCameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [initializingCamera, setInitializingCamera] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const initializeCamera = async () => {
    setInitializingCamera(true);
    setPermissionError(false);
    setCameraReady(false);
    stopCamera();

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
          console.warn('Auto-play error:', e);
        }
        const checkVideoReady = () => {
          const video = videoRef.current;
          if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.videoWidth > 0 && video.videoHeight > 0) {
            setCameraReady(true);
            setInitializingCamera(false);
          } else {
            setTimeout(checkVideoReady, 100);
          }
        };
        checkVideoReady();
      } else {
        setInitializingCamera(false);
      }
    } catch (err) {
      console.error('Camera init error:', err);
      setPermissionError(true);
      setInitializingCamera(false);
    }
  };

  const takeShotCapture = (
    onCapture: (dataUrl: string) => void,
    onError: (msg: string) => void
  ) => {
    const video = videoRef.current;
    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.videoWidth || !video.videoHeight) {
      onError('something went wrong while capturing.');
      return;
    }

    const vWidth = video.videoWidth;
    const vHeight = video.videoHeight;
    const canvas = document.createElement('canvas');
    canvas.width = vWidth;
    canvas.height = vHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      onError('something went wrong while capturing.');
      return;
    }
    ctx.drawImage(video, 0, 0, vWidth, vHeight);
    const shotDataUrl = canvas.toDataURL('image/png');
    if (!shotDataUrl || shotDataUrl.length < 100) {
      onError('something went wrong while capturing.');
      return;
    }
    onCapture(shotDataUrl);
  };

  const startCountdownAndCapture = (
    shotIdx: number,
    existingShots: string[],
    onCapture: (dataUrl: string) => void,
    onComplete: (shots: string[]) => void,
    onError: (msg: string) => void,
    onCountdownChange: (count: number | null) => void,
    totalShots: number = 4
  ) => {
    if (shotIdx >= totalShots) {
      onComplete(existingShots);
      return;
    }

    onCountdownChange(3);
    let currentCount = 3;
    const timer = setInterval(() => {
      currentCount -= 1;
      if (currentCount > 0) {
        onCountdownChange(currentCount);
      } else {
        clearInterval(timer);
        onCountdownChange(null);
        takeShotCapture(
          (dataUrl) => {
            const updated = [...existingShots, dataUrl];
            onCapture(dataUrl);
            setTimeout(() => {
              startCountdownAndCapture(shotIdx + 1, updated, onCapture, onComplete, onError, onCountdownChange, totalShots);
            }, 800);
          },
          onError
        );
      }
    }, 1000);
  };

  const generatePhotostrip = async (
    shots: string[],
    templateName: string,
    onResult: (blob: Blob, url: string) => void,
    onError: (msg: string) => void
  ) => {
    const canvas = document.createElement('canvas');
    const width = 600;
    const padding = 40;
    const headerHeight = 120;
    const footerHeight = 70;
    const photoWidth = width - padding * 2;
    const photoHeight = 390;
    const gap = 25;
    const totalHeight = headerHeight + (photoHeight * shots.length) + (gap * (shots.length - 1)) + footerHeight;
    canvas.width = width;
    canvas.height = totalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      onError('Failed to create canvas context.');
      return;
    }

    ctx.fillStyle = '#FFFDF5';
    ctx.fillRect(0, 0, width, totalHeight);

    ctx.fillStyle = '#24652A';
    ctx.font = '900 24px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VIRTUU BOOTH', width / 2, 50);

    ctx.font = '700 13px system-ui, sans-serif';
    ctx.fillStyle = '#68B96B';
    ctx.fillText(`• ${new Date().toLocaleDateString()} • ${templateName} •`, width / 2, 78);

    let startY = headerHeight;

    for (const shot of shots) {
      await new Promise<void>((resolve) => {
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

          // Use the exact proven center-crop cover approach from existing Photobooth
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
        img.onerror = () => resolve();
        img.src = shot;
      });
    }

    ctx.fillStyle = '#24652A';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('#makeMomentsNotJustPhotos ✨', width / 2, totalHeight - 30);

    canvas.toBlob((blob) => {
      if (blob) {
        onResult(blob, URL.createObjectURL(blob));
      } else {
        onError('Failed to export canvas blob.');
      }
    }, 'image/png');
  };

  return {
    videoRef,
    cameraReady,
    initializingCamera,
    permissionError,
    initializeCamera,
    startCountdownAndCapture,
    generatePhotostrip,
    stopCamera,
  };
}
