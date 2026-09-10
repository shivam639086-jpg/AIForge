import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { PageFrame, PageHeading } from "@/components/app-shell";
import { ToolCard } from "@/components/tool-card";
import { categories, tools } from "@/data/tools";

export default function Browse() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All tools");
  const [type, setType] = useState("All");
  const filtered = useMemo(() => tools.filter(tool => {
    const matchesCategory = category === "All tools" || tool.category === category;
    const matchesType = type === "All" || tool.type === type;
    const q = query.toLowerCase();
    return matchesCategory && matchesType && (!q || [tool.name, tool.maker, tool.blurb, ...tool.tags].join(" ").toLowerCase().includes(q));
  }), [query, category, type]);
  return <PageFrame>
    <PageHeading eyebrow="The index / 012 tools" title="Less browsing. More building." description="A curated map of the AI and development tools worth knowing. Search by the job, not the hype." action={<span className="font-mono text-xs text-muted-foreground">{filtered.length.toString().padStart(2, "0")} results</span>} />
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/[.08] bg-white/[.025] p-3 md:flex-row">
      <div className="relative flex-1"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search tools, jobs, or capabilities..." className="h-11 w-full rounded-xl border border-white/10 bg-[#091625] pl-11 pr-10 text-sm outline-none focus:border-secondary/60" aria-label="Search tools" data-testid="input-tool-search" />{query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Clear search" data-testid="button-clear-search"><X className="size-4" /></button>}</div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-lg px-3 py-2.5 text-xs transition ${category === item ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-white/[.06] hover:text-foreground"}`} data-testid={`button-category-${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</button>)}</div>
    </div>
    <div className="mb-7 flex flex-wrap items-center gap-2"><div className="mr-2 flex items-center gap-2 text-xs text-muted-foreground"><SlidersHorizontal className="size-3.5" />Filter by</div>{["All", "Free tier", "Open source", "Paid"].map(item => <button key={item} onClick={() => setType(item)} className={`rounded-full border px-3 py-1.5 text-xs transition ${type === item ? "border-primary/50 bg-primary/[.1] text-primary" : "border-white/10 text-muted-foreground hover:border-white/25"}`} data-testid={`button-type-${item.toLowerCase().replace(" ", "-")}`}>{item}</button>)}</div>
    {filtered.length > 0 ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((tool, index) => <ToolCard key={tool.id} tool={tool} index={index} />)}</div> : <div className="rounded-3xl border border-dashed border-white/15 py-24 text-center"><Filter className="mx-auto mb-4 size-8 text-muted-foreground" /><h2 className="text-lg font-medium">No tools in this slice</h2><p className="mt-2 text-sm text-muted-foreground">Try a broader search or clear one of the filters.</p><button onClick={() => { setQuery(""); setCategory("All tools"); setType("All"); }} className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" data-testid="button-reset-filters">Reset filters</button></div>}
  </PageFrame>;
}