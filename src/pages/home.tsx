import { useState } from "react";
import { ArrowRight, ChevronRight, Compass, Lightbulb, Search, Sparkles, Wand2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PageFrame } from "@/components/app-shell";
import { ToolCard } from "@/components/tool-card";
import { templates, tools } from "@/data/tools";
import { usePreference } from "@/hooks/use-aiforge";

const chips = ["A landing page", "A SaaS product", "A mobile app", "A visual identity", "A research project"];

export default function Home() {
  const [, setLocation] = useLocation();
  const [idea, setIdea] = useState("");
  const [mode, setMode] = usePreference("mode", "builder");
  const featured = tools.filter(tool => tool.featured);
  const submit = () => { if (idea.trim()) setLocation(`/advisor?idea=${encodeURIComponent(idea.trim())}`); else setLocation("/advisor"); };
  return <PageFrame className="pb-24">
    <section className="relative min-h-[650px] pt-8 lg:pt-16">
      <div className="pointer-events-none absolute -right-24 top-0 hidden h-[470px] w-[470px] rounded-full border border-secondary/10 md:block">
        <div className="absolute inset-12 rounded-full border border-secondary/10" /><div className="absolute inset-28 rounded-full border border-primary/15" />
        <div className="absolute left-1/2 top-1/2 size-2 rounded-full bg-secondary shadow-[0_0_22px_8px_hsl(187_100%_71%/.3)]" />
      </div>
      <div className="relative max-w-[820px]">
        <div className="af-reveal mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.24em] text-secondary"><span className="flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/[.06] px-3 py-1.5"><span className="size-1.5 animate-pulse rounded-full bg-secondary" />The builder's compass</span><span className="hidden text-muted-foreground sm:inline">v1.4 / curated signal</span></div>
        <h1 className="af-display af-reveal af-delay-1 max-w-4xl text-[clamp(3.35rem,8vw,7.8rem)] font-semibold leading-[.87] tracking-[-.075em]">Build <span className="text-primary">anything.</span><br />Find the right<br /><span className="relative inline-block text-secondary">AI tools.<span className="absolute -bottom-2 left-1 h-[3px] w-[76%] rotate-[-2deg] bg-secondary/70" /></span></h1>
        <p className="af-reveal af-delay-2 mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">A sharp technical recommendation for the thing in your head — not another noisy directory.</p>
      </div>
      <div className="af-glass af-reveal af-delay-3 relative mt-12 max-w-3xl rounded-2xl p-2 sm:p-3">
        <div className="rounded-xl border border-white/[.07] bg-[#0b1828] p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-foreground"><Sparkles className="size-4 text-primary" /> What are you building?</div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input value={idea} onChange={event => setIdea(event.target.value)} onKeyDown={event => event.key === "Enter" && submit()} placeholder="A portfolio that gets me hired..." className="h-12 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[.045] px-4 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-secondary/60 focus:ring-2 focus:ring-secondary/10" aria-label="Describe what you are building" data-testid="input-hero-idea" />
            <button onClick={submit} className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_hsl(15_100%_66%/.25)]" data-testid="button-hero-advisor">Find my stack <ArrowRight className="size-4" /></button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">{chips.map(chip => <button key={chip} onClick={() => setIdea(chip)} className="rounded-full border border-white/[.08] px-3 py-1.5 text-xs text-muted-foreground transition hover:border-secondary/40 hover:text-secondary" data-testid={`button-chip-${chip.toLowerCase().replaceAll(" ", "-")}`}>{chip}</button>)}</div>
        </div>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><span>Not sure where to start?</span><Link href="/advisor" className="flex items-center gap-1 font-medium text-foreground underline decoration-primary/60 underline-offset-4 hover:text-primary" data-testid="link-guided-advisor">Take the 60-second guided route <ChevronRight className="size-3" /></Link></div>
    </section>
    <section className="border-t border-white/[.08] py-16 lg:py-20">
      <div className="mb-8 flex items-end justify-between gap-5"><div><div className="mb-2 font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">A better starting point</div><h2 className="af-display text-3xl font-semibold tracking-[-.05em] sm:text-4xl">Discover. Compare. Build.</h2></div><Link href="/browse" className="hidden items-center gap-1 text-sm text-secondary hover:text-foreground sm:flex" data-testid="link-see-all-tools">Browse all tools <ArrowRight className="size-4" /></Link></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[
        { n: "01", title: "Start with the outcome", copy: "Tell us the job to be done. Skip the category maze.", icon: Lightbulb, color: "text-primary" },
        { n: "02", title: "Get a point of view", copy: "Recommendations with a why, a trade-off and a next step.", icon: Compass, color: "text-secondary" },
        { n: "03", title: "Compare the real fit", copy: "Side-by-side signal on setup, flexibility and momentum.", icon: Search, color: "text-accent" },
        { n: "04", title: "Leave with a stack", copy: "A focused toolkit that can actually get you moving.", icon: Wand2, color: "text-primary" },
      ].map(item => <div key={item.n} className="group rounded-2xl border border-white/[.08] bg-white/[.02] p-5 transition hover:border-white/20 hover:bg-white/[.04]"><div className="mb-10 flex items-center justify-between"><item.icon className={`size-5 ${item.color}`} /><span className="font-mono text-[10px] text-muted-foreground">{item.n}</span></div><h3 className="mb-2 font-medium">{item.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{item.copy}</p></div>)}</div>
    </section>
    <section className="pb-12">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-2 font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Curated signal</div><h2 className="af-display text-3xl font-semibold tracking-[-.05em]">Where builders are starting</h2></div><Link href="/browse" className="flex items-center gap-1 text-sm text-secondary hover:text-foreground" data-testid="link-featured-browse">See the full index <ArrowRight className="size-4" /></Link></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{featured.map((tool, index) => <ToolCard key={tool.id} tool={tool} index={index} />)}</div>
    </section>
    <section className="rounded-3xl border border-primary/20 bg-primary/[.05] p-6 sm:p-10 lg:flex lg:items-center lg:justify-between">
      <div><div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-primary"><span className="size-1.5 rounded-full bg-primary" />Your mode, your pace</div><h2 className="af-display max-w-xl text-3xl font-semibold tracking-[-.05em] sm:text-4xl">New to this? We will keep the sharp edges out of the way.</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">Switch on beginner mode for plain-language recommendations, smaller stacks and the fastest path to a first win.</p></div>
      <div className="mt-7 flex shrink-0 rounded-xl border border-white/10 bg-[#081321] p-1 lg:mt-0"><button onClick={() => setMode("builder")} className={`rounded-lg px-4 py-2.5 text-sm ${mode === "builder" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`} data-testid="button-mode-builder">Builder mode</button><button onClick={() => setMode("beginner")} className={`rounded-lg px-4 py-2.5 text-sm ${mode === "beginner" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"}`} data-testid="button-mode-beginner">Beginner mode</button></div>
    </section>
    <section className="py-16 lg:py-20"><div className="mb-8 flex items-end justify-between"><div><div className="mb-2 font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Shortcut the blank page</div><h2 className="af-display text-3xl font-semibold tracking-[-.05em]">Start from a real shape</h2></div><Link href="/stack" className="hidden items-center gap-1 text-sm text-secondary sm:flex" data-testid="link-template-workspace">Open workspace <ArrowRight className="size-4" /></Link></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{templates.map((template, index) => <Link href={`/stack?template=${template.id}`} key={template.id} className={`af-glass af-reveal af-delay-${Math.min(index + 1, 3)} group rounded-2xl p-5`} data-testid={`link-template-${template.id}`}><div className="mb-12 flex items-start justify-between"><span className="grid size-10 place-items-center rounded-xl border border-secondary/20 bg-secondary/[.08] text-xl text-secondary">{template.icon}</span><ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-secondary" /></div><div className="font-mono text-[10px] tracking-[.15em] text-muted-foreground">{template.eyebrow}</div><h3 className="mt-2 text-lg font-medium">{template.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{template.description}</p></Link>)}</div></section>
    <section className="relative overflow-hidden rounded-3xl bg-secondary p-7 text-secondary-foreground sm:p-11"><div className="absolute -right-16 -top-28 size-80 rounded-full border-[40px] border-secondary-foreground/10" /><div className="relative max-w-2xl"><div className="mb-4 font-mono text-[10px] uppercase tracking-[.2em] opacity-70">A note from the forge</div><h2 className="af-display text-4xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl">The best tool is the one that gets you to Tuesday.</h2><p className="mt-6 max-w-lg text-sm leading-relaxed opacity-75">A smaller, opinionated stack beats a sprawling one. Start with the constraint. Let the tools follow.</p></div></section>
  </PageFrame>;
}