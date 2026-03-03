"use client";

import Link from "next/link";
import { useState } from "react";

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState("All Posts");

    const posts = [
        {
            id: 1,
            title: "Scaling Large Language Models: Lessons from Production",
            desc: "Deploying LLMs is easy; scaling them is hard. In this post, I break down the challenges of inference optimization, memory management with vLLM, and cost-effective serving strategies we implemented for a high-traffic chatbot.",
            date: "Oct 24, 2023",
            category: "LLM Integration",
            icon: "neurology",
            iconColor: "text-blue-600 dark:text-blue-300",
            iconBg: "bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800",
            readTime: "5 min read",
        },
        {
            id: 2,
            title: "Asynchronous Patterns in Python with FastAPI",
            desc: "Moving beyond basic async/await. We explore advanced concurrency patterns in Python, how to handle blocking IO effectively without stalling the event loop, and structuring a FastAPI project for maximum throughput.",
            date: "Sep 12, 2023",
            category: "FastAPI",
            icon: "terminal",
            iconColor: "text-orange-600 dark:text-orange-300",
            iconBg: "bg-orange-50 dark:bg-orange-900/30 border-orange-100 dark:border-orange-800",
            readTime: "8 min read",
        },
        {
            id: 3,
            title: "The Evolution of Data Pipelines: From Batch to Real-time",
            desc: "A deep dive into modern data architecture patterns. Comparing Lambda vs Kappa architectures and choosing the right tool for the job when latency matters more than throughput.",
            date: "Aug 05, 2023",
            category: "System Design",
            icon: "architecture",
            iconColor: "text-purple-600 dark:text-purple-300",
            iconBg: "bg-purple-50 dark:bg-purple-900/30 border-purple-100 dark:border-purple-800",
            readTime: "12 min read",
        },
        {
            id: 4,
            title: "Mastering React Server Components",
            desc: "Server Components are changing how we think about React applications. Here's a practical guide on when to use them, how they impact bundle size, and the trade-offs involved in mixing client and server components.",
            date: "Jul 15, 2023",
            category: "React Ecosystem",
            icon: "code",
            iconColor: "text-cyan-600 dark:text-cyan-300",
            iconBg: "bg-cyan-50 dark:bg-cyan-900/30 border-cyan-100 dark:border-cyan-800",
            readTime: "6 min read",
        },
    ];

    const filteredPosts = activeCategory === "All Posts" ? posts : posts.filter(p => p.category === activeCategory);

    return (
        <div className="flex-1 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row">
            <aside className="w-full md:w-64 lg:w-72 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 md:min-h-[calc(100vh-3.5rem)] py-8 px-4 md:sticky md:top-14">
                <div className="mb-6 px-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Explorer</h3>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
                            <span className="material-symbols-outlined text-[18px]">search</span>
                        </span>
                        <input className="w-full py-1.5 pl-8 pr-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-600" placeholder="Search posts..." type="text" />
                    </div>
                </div>

                <nav className="space-y-0.5">
                    <button onClick={() => setActiveCategory("All Posts")} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md font-medium text-sm group transition-colors ${activeCategory === "All Posts" ? "bg-slate-200/50 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                        <span className={`material-symbols-outlined text-[18px] transition-colors ${activeCategory === "All Posts" ? "text-primary" : "text-slate-500 group-hover:text-primary"}`}>article</span>
                        All Posts
                    </button>

                    <div className="pt-2">
                        <details className="group" open>
                            <summary className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-300 text-sm select-none list-none">
                                <span className="material-symbols-outlined text-[18px] text-slate-400 group-open:rotate-90 transition-transform">arrow_right</span>
                                <span className="material-symbols-outlined text-[18px] text-slate-500">folder</span>
                                Backend Engineering
                            </summary>
                            <div className="pl-9 pt-0.5 space-y-0.5">
                                {['FastAPI', 'System Design'].map(cat => (
                                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors ${activeCategory === cat ? "bg-primary/10 text-primary font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                                        <span className="material-symbols-outlined text-[16px] text-slate-400">tag</span>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </details>
                    </div>

                    <div>
                        <details className="group" open>
                            <summary className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-300 text-sm select-none list-none">
                                <span className="material-symbols-outlined text-[18px] text-slate-400 group-open:rotate-90 transition-transform">arrow_right</span>
                                <span className="material-symbols-outlined text-[18px] text-slate-500">folder</span>
                                AI & Agents
                            </summary>
                            <div className="pl-9 pt-0.5 space-y-0.5">
                                {['LLM Integration', 'Prompt Engineering'].map(cat => (
                                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors ${activeCategory === cat ? "bg-primary/10 text-primary font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                                        <span className="material-symbols-outlined text-[16px] text-slate-400">tag</span>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </details>
                    </div>

                    <div>
                        <details className="group" open>
                            <summary className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-300 text-sm select-none list-none">
                                <span className="material-symbols-outlined text-[18px] text-slate-400 group-open:rotate-90 transition-transform">arrow_right</span>
                                <span className="material-symbols-outlined text-[18px] text-slate-500">folder</span>
                                Frontend
                            </summary>
                            <div className="pl-9 pt-0.5 space-y-0.5">
                                {['React Ecosystem', 'Performance'].map(cat => (
                                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors ${activeCategory === cat ? "bg-primary/10 text-primary font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                                        <span className="material-symbols-outlined text-[16px] text-slate-400">tag</span>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </details>
                    </div>
                </nav>
            </aside>

            <main className="flex-1 w-full px-6 md:px-12 py-12 max-w-4xl">
                <div className="mb-8 flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <span className="hover:text-primary cursor-pointer" onClick={() => setActiveCategory("All Posts")}>Blog</span>
                    <span className="mx-2">/</span>
                    <span className="text-slate-900 dark:text-white font-medium">{activeCategory}</span>
                </div>

                <div className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-8">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-[32px]">article</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">{activeCategory}</h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Explorations in software engineering, system architecture, and AI. A collection of technical deep dives and field notes.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    {filteredPosts.length === 0 ? (
                        <p className="text-slate-500 dark:text-slate-400">No posts found for this category.</p>
                    ) : (
                        filteredPosts.map((post, idx) => (
                            <article key={post.id} className={`group relative flex flex-col gap-3 ${idx > 0 ? "pt-8 border-t border-dashed border-slate-200 dark:border-slate-800" : ""}`}>
                                <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${post.iconBg} ${post.iconColor}`}>
                                        <span className="material-symbols-outlined text-[14px]">{post.icon}</span>
                                        {post.category}
                                    </span>
                                    <span>•</span>
                                    <time>{post.date}</time>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.id}`} className="focus:outline-none">
                                        <span className="absolute inset-0"></span>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                    {post.desc}
                                </p>
                                <div className="flex items-center text-sm font-medium text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                    Read article <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
