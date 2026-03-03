export const metadata = {
    title: "About | Leo - Senior Full-Stack & AI Engineer",
};

export default function About() {
    return (
        <main className="flex-grow flex flex-col items-center justify-start py-12 px-4 md:px-10 w-full">
            <div className="w-full max-w-[860px] mx-auto flex flex-col gap-12 animate-fade-in">
                <section className="flex flex-col md:flex-row gap-10 items-start md:items-center py-4">
                    <div className="relative flex-shrink-0">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl">
                            {/* NOTE: We're keeping the standard Next.js Image approach instead of the raw img tag for optimization if you prefer, but here using the img as provided in design */}
                            <img alt="Professional Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKvDTYSoK8hfzKWY-6pyM6Pk0OKHA9cVTDtuMycCKmM69IPpyp4SJjS4WpM9JDNyqxT7uLZqGU1-RD4v8hLZjrRvZQJUEicr4aOHz_bwyEJ9np2wBlCT1T5w_BAYlkxozfmhm46BqtH8YYZo0m0igcG_zYzAI3KlsRjQIrkXDczvPq7zZf--p_cx4_1gUHZr6WAYRYkZBvsrZLHJFbOxFep7l_eNGOIEMDA7FaGV_Tm_AaPviS8ep1VuI3_f3C72VoHPYVD5xeM5qw" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#f5f7f8] dark:border-[#0f1823]"></div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">#SeniorBackend</span>
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">#AIAgent</span>
                        </div>
                        <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                            Engineering Intelligence.
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-normal leading-relaxed">
                            I'm a Senior Software Engineer specializing in distributed systems and AI integration. With over 8 years of experience, I bridge the gap between robust backend architecture and the cutting edge of Large Language Models.
                        </p>
                    </div>
                </section>

                <hr className="border-slate-200 dark:border-slate-800" />

                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary font-bold">work</span>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Professional Journey</h3>
                    </div>
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12 pb-4">
                        <div className="relative pl-10">
                            <span className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-primary border-4 border-white dark:border-slate-900 z-10"></span>
                            <div className="flex flex-col mb-2">
                                <span className="text-sm font-bold text-primary">2021 — Present</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Senior Backend Engineer @ TechGiant Corp</h3>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-400">
                                <li>Architected and deployed a multi-region Go-based microservices architecture, <span className="text-slate-900 dark:text-white font-medium">reducing latency by 40%</span> for 5M+ daily users.</li>
                                <li>Integrated OpenAI models into the core product, leading to a <span className="text-slate-900 dark:text-white font-medium">25% increase in user retention</span> through AI-powered personalization.</li>
                                <li>Mentored a team of 6 engineers and established modern CI/CD practices using Terraform and Kubernetes.</li>
                            </ul>
                        </div>
                        <div className="relative pl-10">
                            <span className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-slate-900 z-10"></span>
                            <div className="flex flex-col mb-2">
                                <span className="text-sm font-bold text-slate-500">2018 — 2021</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Software Engineer @ DataFlow Systems</h3>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-400">
                                <li>Optimized SQL queries and database indexing, resulting in a <span className="text-slate-900 dark:text-white font-medium">60% improvement in reporting speed</span>.</li>
                                <li>Led the migration from monolithic architecture to Java Spring Boot microservices.</li>
                                <li>Developed internal tooling that <span className="text-slate-900 dark:text-white font-medium">cut developer onboarding time by 50%</span>.</li>
                            </ul>
                        </div>
                        <div className="relative pl-10">
                            <span className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-slate-900 z-10"></span>
                            <div className="flex flex-col mb-2">
                                <span className="text-sm font-bold text-slate-500">2016 — 2018</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Junior Developer @ StartupNexus</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Focused on building responsive frontend components and assisting in Python/Django backend development for a rapidly scaling e-commerce platform.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary font-bold">bolt</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Expertise</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">database</span> Backend
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Java (Spring)', 'Go', 'FastAPI', 'PostgreSQL', 'Redis'].map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">psychology</span> AI & LLM
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['LangChain', 'OpenAI', 'Vector DBs', 'PyTorch', 'Prompt Eng.'].map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">cloud</span> Infrastructure
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Kubernetes', 'Terraform', 'AWS', 'Docker'].map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">construction</span> Tooling
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['CI/CD', 'Prometheus', 'Grafana', 'Git'].map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-200 dark:border-slate-800" />

                <section className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <a href="#" className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-primary transition-all shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">terminal</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">GitHub</h4>
                                    <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Open Source</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                        <a href="#" className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-primary transition-all shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">work</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">LinkedIn</h4>
                                    <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Professional</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                        <a href="#" className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-primary transition-all shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Remember</h4>
                                    <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Career Hub</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                    </div>
                </section>

                <div className="flex flex-col items-center justify-center py-10 gap-6 border-t border-slate-200 dark:border-slate-800 mt-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Ready to work together?</h3>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button className="flex items-center justify-center gap-2 h-12 px-8 bg-primary text-white hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/25 cursor-pointer">
                            <span className="material-symbols-outlined">download</span>
                            Download Resume PDF
                        </button>
                        <a className="flex items-center justify-center gap-2 h-12 px-8 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-bold transition-all cursor-pointer" href="/contact">
                            <span className="material-symbols-outlined">mail</span>
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
