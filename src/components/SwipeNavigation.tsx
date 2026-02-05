"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";

interface SwipeNavigationProps {
  children: React.ReactNode;
}

// Define routes outside component to avoid dependency issues
const ROUTES = [
  "/blackjack",
  "/craps",
  "/poker",
  "/bankroll",
];

export default function SwipeNavigation({ children }: SwipeNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Find current route index (match base path)
  const getCurrentIndex = useCallback(() => {
    for (let i = 0; i < ROUTES.length; i++) {
      if (pathname.startsWith(ROUTES[i])) {
        return i;
      }
    }
    return -1;
  }, [pathname]);

  useEffect(() => {
    // Only enable on mobile (check viewport width)
    const isMobile = () => window.innerWidth < 768;

    const handleTouchStart = (e: TouchEvent) => {
      if (!isMobile()) return;
      
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isMobile()) return;
      if (touchStartX.current === null || touchStartY.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;

      // Require horizontal swipe (more horizontal than vertical)
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }

      // Require minimum swipe distance (80px)
      const minSwipeDistance = 80;
      if (Math.abs(deltaX) < minSwipeDistance) {
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }

      const currentIndex = getCurrentIndex();
      if (currentIndex === -1) {
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }

      // Swipe left = go to next (right in array)
      // Swipe right = go to previous (left in array)
      if (deltaX < 0 && currentIndex < ROUTES.length - 1) {
        // Swipe left
        router.push(ROUTES[currentIndex + 1]);
      } else if (deltaX > 0 && currentIndex > 0) {
        // Swipe right
        router.push(ROUTES[currentIndex - 1]);
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default scrolling during horizontal swipe
      if (!isMobile()) return;
      if (touchStartX.current === null || touchStartY.current === null) return;

      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;

      const deltaX = touchCurrentX - touchStartX.current;
      const deltaY = touchCurrentY - touchStartY.current;

      // If more horizontal than vertical, prevent default scroll
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [pathname, router, getCurrentIndex]);

  return <>{children}</>;
}
