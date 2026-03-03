export const metadata = {
    title: "Scrap | Leo - Senior Full-Stack & AI Engineer",
};

export default function Scrap() {
    return (
        <main className="flex-1 w-full px-6 md:px-12 py-12 max-w-4xl mx-auto">
            <div className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-8">
                <div className="flex items-start gap-4 mb-4">
                    <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-[32px]">bookmark</span>
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Scrap</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            A collection of useful resources, articles, and tools I have found around the web.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">construction</span>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Coming Soon</h2>
                <p className="text-slate-500 dark:text-slate-400">The scrap collection is currently being curated.</p>
            </div>
        </main>
    );
}
