'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/blackjack', icon: '🃏', label: 'Blackjack' },
  { href: '/craps', icon: '🎲', label: 'Craps' },
  { href: '/poker', icon: '♠️', label: 'Poker' },
  { href: '/bankroll', icon: '💰', label: 'Bankroll' },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-light border-t border-white/10 md:hidden">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg
                transition-all duration-200 ease-out
                min-w-[64px] min-h-[44px]
                ${active 
                  ? 'text-casino-gold scale-110' 
                  : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                }
              `}
            >
              {/* Icon with bounce animation on active */}
              <span className={`text-2xl transition-all duration-200 ${
                active ? 'scale-110 animate-bounce-once' : ''
              }`}>
                {item.icon}
              </span>
              
              <span className={`text-xs font-medium transition-all ${
                active ? 'font-bold' : ''
              }`}>
                {item.label}
              </span>
              
              {/* Active indicator - more prominent */}
              {active && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-casino-gold to-transparent rounded-t-full animate-slide-up" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
