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
      <div className="bg-gradient-to-br from-casino-felt via-emerald-800 to-casino-felt-light border-2 border-casino-gold rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-felt-texture opacity-10 animate-pulse-subtle" />
        
        {/* Casino chip icon with shine */}
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-casino-gold via-yellow-400 to-casino-gold-dark rounded-full flex items-center justify-center text-2xl font-bold text-casino-dark shadow-xl border-4 border-white/20 relative">
            <span className="relative z-10">RM</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent rounded-full" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-casino-gold font-bold text-xl mb-2 flex items-center gap-2">
              Install Rain Man
              <span className="text-sm bg-casino-gold/20 px-2 py-0.5 rounded">FREE</span>
            </h3>
            
            {isIOS ? (
              <>
                <p className="text-white text-sm mb-3 leading-relaxed">
                  Add to your home screen for <strong>offline access</strong> and <strong>faster loading</strong>.
                </p>
                <div className="bg-black/30 rounded-lg p-3 mb-4">
                  <p className="text-gray-200 text-xs flex items-center gap-2">
                    <span className="text-lg">👇</span>
                    Tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
                  </p>
                </div>
              </>
            ) : (
              <p className="text-white text-sm mb-4 leading-relaxed">
                Get <strong>instant access</strong>, <strong>offline mode</strong>, and <strong>faster performance</strong>.
              </p>
            )}
            
            <div className="flex gap-2">
              {!isIOS && (
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-casino-gold text-casino-dark font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  ⚡ Install Now
                </button>
              )}
              <button
                onClick={handleDismiss}
                className="flex-1 bg-white/10 text-white font-medium py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                Maybe Later
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="absolute top-0 right-0 text-white/60 hover:text-white text-2xl leading-none p-2 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
