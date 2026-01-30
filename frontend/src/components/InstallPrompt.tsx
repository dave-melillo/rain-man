"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running on iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator as any).standalone;
    
    setIsIOS(iOS && !isInStandaloneMode);

    // Check dismissal preference
    const dismissedUntil = localStorage.getItem("installPromptDismissedUntil");
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil)) {
      return; // Still within 7-day dismissal period
    }

    // Check visit count
    const visitCount = parseInt(localStorage.getItem("visitCount") || "0");
    localStorage.setItem("visitCount", (visitCount + 1).toString());

    // Show prompt logic:
    // 1. After 2+ visits
    // 2. OR after 30 seconds on current visit
    let timeoutId: NodeJS.Timeout;

    if (visitCount >= 1) {
      // 2nd visit or later - show after short delay
      timeoutId = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    } else {
      // First visit - show after 30 seconds
      timeoutId = setTimeout(() => {
        setShowPrompt(true);
      }, 30000);
    }

    // Listen for beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("PWA install accepted");
    }

    // Clear the prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    // Don't show again for 7 days
    const dismissedUntil = Date.now() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem("installPromptDismissedUntil", dismissedUntil.toString());
    setShowPrompt(false);
  };

  // Don't show if already installed or if can't install
  if (!showPrompt) return null;
  
  // Don't show on Android if no install event (already installed or not supported)
  if (!isIOS && !deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <div className="bg-gradient-to-br from-casino-felt to-emerald-900 border-2 border-casino-gold rounded-lg shadow-2xl p-4">
        {/* Casino chip icon */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-casino-gold rounded-full flex items-center justify-center text-2xl font-bold text-casino-dark">
            RM
          </div>
          
          <div className="flex-1">
            <h3 className="text-casino-gold font-bold text-lg mb-1">
              Install Rain Man
            </h3>
            <p className="text-white text-sm mb-3">
              {isIOS 
                ? "Add to your home screen for quick access and offline use. Tap the share button and select 'Add to Home Screen'."
                : "Install this app for quick access and offline strategy charts."
              }
            </p>
            
            <div className="flex gap-2">
              {!isIOS && (
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-casino-gold text-casino-dark font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors"
                >
                  Install
                </button>
              )}
              <button
                onClick={handleDismiss}
                className="flex-1 bg-white/10 text-white font-medium py-2 px-4 rounded hover:bg-white/20 transition-colors"
              >
                Not Now
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-white/60 hover:text-white text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
