import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Community", href: "#community" },
  { label: "Login", href: "#login" },
];

export const Navigation = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-panel border-t-0 border-x-0 rounded-none">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-glow-blood flex items-center justify-center pulse-glow">
                <span className="font-display font-bold text-lg text-primary-foreground">E</span>
              </div>
              <span className="font-display text-xl font-semibold tracking-wide text-foreground group-hover:text-gradient-crimson transition-colors">
                EpsteinGPT
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isExternal = item.href.startsWith("#");
                const isHashLink = item.href.startsWith("/#");
                const Component = isExternal || isHashLink ? "a" : Link;
                const linkProps = isExternal || isHashLink ? { href: item.href } : { to: item.href };
                
                return (
                  <Component
                    key={item.label}
                    {...linkProps as any}
                    className="relative px-4 py-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {item.label}
                    {isHovered === index && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                    )}
                  </Component>
                );
              })}
            </div>

            {/* CTA */}
            <button className="btn-ghost text-sm hidden md:block">
              Access the Vault
            </button>

            {/* Mobile Menu */}
            <button className="md:hidden p-2 glass-panel rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
