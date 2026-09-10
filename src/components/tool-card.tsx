import { ExternalLink, GitCompareArrows, Heart, Plus } from "lucide-react";
import { Link } from "wouter";
import type { Tool } from "@/data/tools";
import { useStoredList } from "@/hooks/use-aiforge";

export function ToolMark({ tool, size = "md" }: { tool: Tool; size?: "sm" | "md" | "lg" }) {
  return <span className="grid shrink-0 place-items-center rounded-xl border font-semibold" style={{ color: tool.color, borderColor: `${tool.color}45`, background: `${tool.color}12`, width: size === "lg" ? 48 : size === "sm" ? 30 : 38, height: size === "lg" ? 48 : size === "sm" ? 30 : 38, fontSize: size === "lg" ? 16 : 12 }}>{tool.logo}</span>;
}

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const saved = useStoredList("saved-tools");
  const comparison = useStoredList("compare-tools");
  const isSaved = saved.items.includes(tool.id);
  const isCompared = comparison.items.includes(tool.id);
  return <article className={`af-glass af-reveal af-delay-${Math.min(index % 4 + 1, 3)} group relative rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-secondary/30`} data-testid={`card-tool-${tool.id}`}>
    <div className="mb-5 flex items-start justify-between gap-3">
      <Link href={`/tools/${tool.id}`} className="flex min-w-0 items-center gap-3" data-testid={`link-tool-${tool.id}`}><ToolMark tool={tool} /><span className="min-w-0"><span className="block truncate font-medium">{tool.name}</span><span className="block truncate text-xs text-muted-foreground">{tool.maker}</span></span></Link>
      <button onClick={() => saved.toggle(tool.id)} aria-label={isSaved ? `Remove ${tool.name} from saved` : `Save ${tool.name}`} className={`rounded-lg p-2 transition ${isSaved ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-white/10 hover:text-foreground"}`} data-testid={`button-save-${tool.id}`}><Heart className={`size-4 ${isSaved ? "fill-current" : ""}`} /></button>
    </div>
    <Link href={`/tools/${tool.id}`} className="block" data-testid={`link-detail-${tool.id}`}>
      <p className="mb-2 min-h-[43px] text-[14px] leading-relaxed text-foreground/85">{tool.blurb}</p>
      <div className="mb-5 flex flex-wrap gap-1.5">{tool.tags.map(tag => <span key={tag} className="rounded-md bg-white/[.055] px-2 py-1 text-[10px] text-muted-foreground">{tag}</span>)}</div>
    </Link>
    <div className="flex items-center justify-between border-t border-white/[.08] pt-4">
      <span className="font-mono text-[10px] uppercase tracking-[.12em] text-muted-foreground">{tool.type}</span>
      <button onClick={() => comparison.toggle(tool.id)} className={`flex items-center gap-1.5 text-xs transition ${isCompared ? "text-secondary" : "text-muted-foreground hover:text-secondary"}`} data-testid={`button-compare-${tool.id}`}><GitCompareArrows className="size-3.5" />{isCompared ? "In compare" : "Compare"}</button>
    </div>
  </article>;
}

export function MiniTool({ tool, removable = false, onRemove }: { tool: Tool; removable?: boolean; onRemove?: () => void }) {
  return <div className="flex items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.025] p-3" data-testid={`mini-tool-${tool.id}`}><ToolMark tool={tool} size="sm" /><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{tool.name}</div><div className="truncate text-xs text-muted-foreground">{tool.bestFor}</div></div>{removable ? <button onClick={onRemove} className="p-1 text-muted-foreground hover:text-destructive" aria-label={`Remove ${tool.name}`} data-testid={`button-remove-${tool.id}`}><Plus className="size-4 rotate-45" /></button> : <a href={tool.url} target="_blank" rel="noreferrer" className="p-1 text-muted-foreground hover:text-secondary" aria-label={`Open ${tool.name} website`} data-testid={`link-external-${tool.id}`}><ExternalLink className="size-4" /></a>}</div>;
}