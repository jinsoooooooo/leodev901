import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <div className="mx-auto max-w-[1200px] w-full px-6 lg:px-8 py-12 md:py-24 flex flex-col gap-24">
        <section className="flex flex-col gap-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 w-fit">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Available for new projects
          </div>
          <div className="space-y-4">
            <h1 className="text-[40px] md:text-[56px] font-extrabold tracking-tight leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x bg-[length:200%_auto]">
              Architecting the future of autonomous enterprise systems.
            </h1>
            <p className="text-[18px] md:text-[20px] text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl animate-fade-in-up">
              Senior Backend & AI Agent Freelance Engineer. I build robust, scalable architectures and integrate intelligent agentic workflows to automate complex business processes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200">
                Get Started
              </Link>
              <Link href="/projects" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
                Case Studies
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50/30 dark:bg-slate-900/30 py-24 border-y border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:border-blue-500/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">settings_suggest</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Operational Excellence</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">Streamlined CI/CD pipelines, high-availability clusters, and meticulous monitoring for mission-critical systems.</p>
            </div>
            <div className="group p-8 rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:border-blue-500/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Scalable Architecture</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">Distributed microservices and event-driven patterns designed to handle millions of requests without breaking a sweat.</p>
            </div>
            <div className="group p-8 rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:border-blue-500/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">AI Agent Integration</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">Leveraging LLMs to create self-correcting agents that navigate complex workflows and automate decision-making.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8 border-t border-slate-100 pt-16 dark:border-slate-800">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Featured Projects</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Selected works demonstrating technical depth and product impact.</p>
            </div>
            <Link href="/projects" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-blue-700 transition-colors">
              더 보기 <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise CRM Automation",
                desc: "Automated sales pipeline management system reducing manual entry by 80% using custom AI agents.",
                icon: "inventory_2",
                tags: ["Python", "FastAPI", "LangChain"]
              },
              {
                title: "Distributed Event Bus",
                desc: "High-throughput event streaming platform capable of handling 1M+ messages per second.",
                icon: "cloud_sync",
                tags: ["Go", "Kafka", "Kubernetes"]
              },
              {
                title: "Smart FinTech Dashboard",
                desc: "Real-time financial analytics dashboard with predictive modeling features for investment tracking.",
                icon: "smart_display",
                tags: ["React", "TypeScript", "AWS"]
              }
            ].map((project, idx) => (
              <div key={idx} className="group flex flex-col rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.25)] dark:border-slate-700 dark:bg-slate-800/50">
                <div className="aspect-video w-full rounded-t-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden transition-colors duration-300 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/20">
                  <div className="text-slate-400">
                    <span className="material-symbols-outlined text-6xl opacity-20">{project.icon}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="mt-auto pt-6 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-500/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center md:hidden">
            <Link href="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-blue-700 transition-colors">
              더 보기 <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row gap-16 border-t border-slate-100 pt-24 dark:border-slate-800">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Latest from Blog</h2>
              <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-blue-600">View all</Link>
            </div>
            <div className="space-y-8">
              <article className="group">
                <time className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Oct 24, 2024</time>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  <Link href="/blog#">The Rise of Agentic Workflows in Enterprise SaaS</Link>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">Moving beyond simple automation to self-healing systems powered by Large Language Models.</p>
              </article>
              <article className="group">
                <time className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Oct 12, 2024</time>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  <Link href="/blog#">Scaling Python Backends to 100k Concurrent Users</Link>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">Optimization techniques using Asyncio, UVLoop, and horizontal scaling strategies.</p>
              </article>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tech Scraps</h2>
              <Link href="/scrap" className="text-sm font-medium text-slate-500 hover:text-blue-600">Explore lab</Link>
            </div>
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-xl">terminal</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">One-liner for optimizing Docker builds for heavy Python ML dependencies.</p>
                    <span className="text-[11px] text-slate-400 mt-2 block">#devops #docker #python</span>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-xl">lightbulb</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Conceptual thought: Using Vector DBs as "Short-term Memory" for stateless agents.</p>
                    <span className="text-[11px] text-slate-400 mt-2 block">#ai #architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
