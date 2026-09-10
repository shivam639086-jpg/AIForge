import { ArrowRight, GitCompareArrows, Plus, X } from "lucide-react";
import { Link } from "wouter";
import { PageFrame, PageHeading } from "@/components/app-shell";
import { ToolMark } from "@/components/tool-card";
import { tools, type Tool } from "@/data/tools";
import { useStoredList } from "@/hooks/use-aiforge";

type Row = { label: string; value: (tool: Tool) => string };
const rows: Row[] = [
  { label: "Best for", value: tool => tool.bestFor },
  { label: "Category", value: tool => tool.category },
  { label: "Model", value: tool => tool.type },
  { label: "Community fit", value: tool => `${tool.stars} / 5` },
  { label: "Tags", value: tool => tool.tags.join(" · ") },
];

export default function Compare() {
  const compare = useStoredList("compare-tools");
  const chosen = compare.items.map(id => tools.find(tool => tool.id === id)).filter(Boolean) as Tool[];
  const options = tools.filter(tool => !compare.items.includes(tool.id));
  return <PageFrame>
    <PageHeading eyebrow="Decision room / compare" title="Put the trade-offs on the table." description="Compare up to three tools side by side, then make one confident choice." action={<span className="font-mono text-xs text-muted-foreground">{chosen.length} / 03 selected</span>} />
    {chosen.length === 0 ? <div className="rounded-3xl border border-dashed border-white/15 py-24 text-center"><GitCompareArrows className="mx-auto mb-4 size-9 text-secondary" /><h2 className="af-display text-2xl font-semibold">Your decision room is empty.</h2><p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">Tap Compare on any tool in Explore to bring it here.</p><Link href="/browse" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground" data-testid="link-compare-browse">Explore tools <ArrowRight className="size-4" /></Link></div> :
      <><div className="overflow-x-auto rounded-2xl border border-white/[.08]"><div className="min-w-[680px]">
        <div className="grid border-b border-white/[.08]" style={{ gridTemplateColumns: `170px repeat(${chosen.length}, minmax(170px,1fr))` }}><div className="p-5 text-xs text-muted-foreground">Signal</div>{chosen.map(tool => <div key={tool.id} className="relative border-l border-white/[.08] p-5"><button onClick={() => compare.toggle(tool.id)} className="absolute right-3 top-3 text-muted-foreground hover:text-destructive" aria-label={`Remove ${tool.name}`} data-testid={`button-compare-remove-${tool.id}`}><X className="size-4" /></button><ToolMark tool={tool} /><h3 className="mt-3 font-medium">{tool.name}</h3><p className="text-xs text-muted-foreground">{tool.maker}</p></div>)}</div>
        {rows.map(row => <div key={row.label} className="grid border-b border-white/[.08]" style={{ gridTemplateColumns: `170px repeat(${chosen.length}, minmax(170px,1fr))` }}><div className="p-5 text-xs text-muted-foreground">{row.label}</div>{chosen.map(tool => <div key={tool.id} className="border-l border-white/[.08] p-5 text-sm">{row.value(tool)}</div>)}</div>)}
        <div className="grid" style={{ gridTemplateColumns: `170px repeat(${chosen.length}, minmax(170px,1fr))` }}><div className="p-5 text-xs text-muted-foreground">Official site</div>{chosen.map(tool => <div key={tool.id} className="border-l border-white/[.08] p-5 text-sm"><a href={tool.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-secondary hover:text-foreground" data-testid={`link-compare-site-${tool.id}`}>Visit <ArrowRight className="size-3" /></a></div>)}</div>
      </div></div><div className="mt-10"><div className="mb-4 font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">Keep exploring</div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{options.slice(0, 3 - chosen.length).map(tool => <button key={tool.id} onClick={() => compare.items.length < 3 && compare.toggle(tool.id)} className="flex items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.025] p-3 text-left hover:border-secondary/30" data-testid={`button-quick-add-${tool.id}`}><ToolMark tool={tool} size="sm" /><span className="flex-1 text-sm">{tool.name}</span><Plus className="size-4 text-secondary" /></button>)}</div></div></>}
  </PageFrame>;
}