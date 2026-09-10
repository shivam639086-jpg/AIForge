import { Bookmark, Compass } from "lucide-react";
import { Link } from "wouter";
import { PageFrame, PageHeading } from "@/components/app-shell";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/data/tools";
import { useStoredList } from "@/hooks/use-aiforge";

export default function Saved() {
  const saved = useStoredList("saved-tools");
  const list = saved.items.map(id => tools.find(tool => tool.id === id)).filter(Boolean) as typeof tools;
  return <PageFrame><PageHeading eyebrow="Your space / saved tools" title="Keep the signal close." description="Tools you want to remember, revisit or bring into a future stack." action={list.length > 0 ? <button onClick={saved.clear} className="text-sm text-muted-foreground hover:text-destructive" data-testid="button-clear-saved">Clear all</button> : undefined} />{list.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{list.map((tool, index) => <ToolCard key={tool.id} tool={tool} index={index} />)}</div> : <div className="rounded-3xl border border-dashed border-white/15 py-24 text-center"><div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl border border-primary/20 bg-primary/[.07] text-primary"><Bookmark className="size-5" /></div><h2 className="af-display text-2xl font-semibold">Nothing saved yet.</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">When a tool feels like a fit, save it here. Your future self will thank you.</p><Link href="/browse" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground" data-testid="link-saved-browse"><Compass className="size-4" /> Explore the index</Link></div>}</PageFrame>;
}