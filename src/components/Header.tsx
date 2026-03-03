"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Blog", href: "/blog" },
        { name: "Scrap", href: "/scrap" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-background-light/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80">
            <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:px-8">
                <Link className="flex items-center gap-2 group" href="/">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <span className="material-symbols-outlined text-xl">terminal</span>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">leodev901</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-primary relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform after:duration-300 ${isActive
                                    ? "text-slate-900 dark:text-slate-100 after:scale-x-100"
                                    : "text-slate-500 dark:text-slate-400 after:scale-x-0 hover:after:scale-x-100"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
                <button className="flex items-center justify-center p-2 text-slate-500 hover:text-slate-900 md:hidden dark:text-slate-400 dark:hover:text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>
        </header>
    );
}
