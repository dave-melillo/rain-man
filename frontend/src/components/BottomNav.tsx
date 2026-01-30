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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-casino-dark/95 backdrop-blur-sm border-t border-casino-card md:hidden">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg
                transition-all duration-150 ease-in-out
                min-w-[64px] min-h-[44px]
                ${active 
                  ? 'text-casino-gold' 
                  : 'text-gray-400 hover:text-gray-300'
                }
              `}
            >
              <span className={`text-2xl transition-transform ${active ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              <span className={`text-xs font-medium ${active ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-casino-gold rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
