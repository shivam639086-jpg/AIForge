import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Compass, Library, Menu, Rocket, Search, Sparkles, X, GitCompareArrows, Bookmark, BookOpen, Layers3 } from "lucide-react";
import { useStoredList } from "@/hooks/use-aiforge";

const nav = [
  { href: "/", label: "Launchpad", icon: Rocket },
  { href: "/browse", label: "Explore tools", icon: Compass },
  { href: "/advisor", label: "Build advisor", icon: Sparkles },
  { href: "/stack", label: "My stack", icon: Layers3 },
  { href: "/compare", label: "Compare", icon: GitCompareArrows },
];
const secondary = [
  { href: "/saved", label: "Saved tools", icon: Bookmark },
  { href: "/prompts", label: "Prompt library", icon: Library },
  { href: "/guides", label: "Field notes", icon: BookOpen },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useStoredList("saved-tools");
  const { items: compare } = useStoredList("compare-tools");
  return (
    <div className="af-shell min-h-[100dvh] text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/[.07] bg-[#07111f]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3" data-testid="link-brand">
            <span className="relative grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_28px_hsl(15_100%_66%/.24)]">
              <span className="absolute inset-[5px] rounded-lg border border-current opacity-40" />
              <span className="font-bold">A</span>
            </span>
            <span className="af-display text-[18px] font-semibold tracking-[-.04em]">AI<span className="text-primary">Forge</span></span>
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/browse" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-4 py-2 text-sm text-muted-foreground transition hover:border-secondary/40 hover:text-foreground" data-testid="link-header-explore">
              <Search className="size-4" /> Find a tool <kbd className="ml-2 hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline">⌘ K</kbd>
            </Link>
            <Link href="/advisor" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_8px_25px_hsl(15_100%_66%/.25)]" data-testid="link-header-advisor">Start building <span className="ml-1">↗</span></Link>
          </div>
          <button onClick={() => setMobileOpen(value => !value)} className="grid size-10 place-items-center rounded-lg border border-white/10 md:hidden" aria-label="Toggle navigation" data-testid="button-mobile-menu">
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>
      <aside className="fixed bottom-0 left-0 top-[72px] z-30 hidden w-[246px] border-r border-white/[.07] bg-[#081321]/80 px-4 py-7 lg:block">
        <div className="px-3 pb-3 font-mono text-[10px] font-medium uppercase tracking-[.18em] text-muted-foreground">Navigate</div>
        <nav className="space-y-1">
          {nav.map(item => <NavItem key={item.href} {...item} active={location === item.href} badge={item.href === "/compare" && compare.length > 0 ? compare.length : undefined} />)}
        </nav>
        <div className="mt-9 px-3 pb-3 font-mono text-[10px] font-medium uppercase tracking-[.18em] text-muted-foreground">Your space</div>
        <nav className="space-y-1">
          {secondary.map(item => <NavItem key={item.href} {...item} active={location === item.href} badge={item.href === "/saved" && items.length > 0 ? items.length : undefined} />)}
        </nav>
        <div className="absolute bottom-7 left-4 right-4 rounded-2xl border border-secondary/20 bg-secondary/[.06] p-4">
          <div className="mb-3 flex items-center gap-2 text-secondary"><span className="size-2 rounded-full bg-secondary shadow-[0_0_10px_hsl(187_100%_71%)]" /><span className="font-mono text-[10px] uppercase tracking-[.15em]">Signal check</span></div>
          <p className="text-xs leading-relaxed text-muted-foreground">You don't need more tabs. You need the next right decision.</p>
        </div>
      </aside>
      {mobileOpen && <div className="fixed inset-0 z-20 bg-[#07111f]/80 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed bottom-0 left-0 top-[72px] z-30 w-[278px] border-r border-white/[.07] bg-[#081321] px-5 py-7 transition-transform lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <nav className="space-y-1">
          {[...nav, ...secondary].map(item => <NavItem key={item.href} {...item} active={location === item.href} onClick={() => setMobileOpen(false)} />)}
        </nav>
      </aside>
      <main className="lg:pl-[246px]">{children}</main>
    </div>
  );
}

function NavItem({ href, label, icon: Icon, active, badge, onClick }: { href: string; label: string; icon: typeof Compass; active?: boolean; badge?: number; onClick?: () => void }) {
  return <Link href={href} onClick={onClick} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-primary/[.12] font-medium text-primary" : "text-muted-foreground hover:bg-white/[.045] hover:text-foreground"}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(" ", "-")}`}>
    <Icon className={`size-[17px] ${active ? "text-primary" : "text-muted-foreground transition group-hover:text-secondary"}`} />
    <span className="flex-1">{label}</span>
    {badge ? <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">{badge}</span> : null}
  </Link>;
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="af-reveal mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
    <div>
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-secondary"><span className="size-1.5 rounded-full bg-secondary" />{eyebrow}</div>
      <h1 className="af-display max-w-3xl text-4xl font-semibold leading-[.98] sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>}
    </div>
    {action}
  </div>;
}

export function PageFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative min-h-[calc(100dvh-72px)] overflow-hidden px-5 py-8 sm:px-8 lg:px-12 lg:py-12 ${className}`}><div className="af-grid pointer-events-none absolute inset-0 opacity-30" /><div className="relative mx-auto max-w-[1200px]">{children}</div></div>;
}