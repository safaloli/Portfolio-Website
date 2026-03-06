const ErrorPage = ({code}: Readonly<{code: number}>) => {
    return (
        <>
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                {/* <!-- Top Navigation Bar --> */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#232f48] px-6 md:px-10 py-3 bg-background-light dark:bg-background-dark">
                <div className="flex items-center gap-4">
                <div className="size-8 text-primary">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                </svg>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">School Accounting</h2>
                </div>
                <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
                <div className="hidden md:flex items-center gap-6">
                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</a>
                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Reports</a>
                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Invoices</a>
                </div>
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" data-alt="User profile avatar placeholder" style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxmePytSy-HlSQ193Kj_O1tY5Mmy_We3zwLgcXxCZDvmWBwgjWkOJmjAMOzBC9m9-q3ZvzCR7es7hUlAAXQ3ALXQEc7XgIYlYHa4-mjrXisLm2qTLTZw360CFNHSRarbJTrdpw7tpPLca0nsYFxRXZnQ8buhMNkNpF_EA44iLxFYt6XwJKc0Q1eZ7Y7HL7O0ealxpIhjiNqTb_WcwvrkKTS51B5Dy0hIJRq1ZJFOHqI6obiR-2GdPV-JHHGYCOQ7z4k9Bsv4QJqw")`}}></div>
                </div>
                </header>
                {/* <!-- Main Content Area --> */}
                <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
                <div className="layout-content-container flex flex-col max-w-[960px] w-full items-center text-center">
                {/* <!-- Large 404 Headline Graphic --> */}
                <div className="relative">
                <h1 className="text-primary/10 dark:text-primary/20 text-[120px] md:text-[220px] font-black leading-none select-none tracking-tighter">
                                            404
                                        </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-6xl md:text-8xl opacity-80">error</span>
                </div>
                </div>
                {/* <!-- Error Text --> */}
                <div className="flex flex-col gap-3 mt-4 md:-mt-8 relative z-10">
                <p className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] font-display">
                                            Page Not Found
                                        </p>
                <p className="text-slate-500 dark:text-[#92a4c9] text-lg font-normal leading-normal max-w-lg mx-auto noto-sans">
                                            Sorry, the page you are looking for doesn't exist or has been moved. Please check the URL or return home.
                                        </p>
                </div>
                {/* <!-- Action Buttons --> */}
                <div className="flex justify-center w-full mt-10">
                <div className="flex flex-col sm:flex-row flex-1 gap-4 px-4 py-3 max-w-[540px] justify-center">
                <button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined mr-2">dashboard</span>
                <span className="truncate">Go back to Dashboard</span>
                </button>
                <button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-slate-200 dark:bg-[#232f48] text-slate-900 dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-slate-300 dark:hover:bg-[#2d3b5a] transition-all">
                <span className="material-symbols-outlined mr-2">support_agent</span>
                <span className="truncate">Contact Support</span>
                </button>
                </div>
                </div>
                {/* <!-- Technical Detail --> */}
                <div className="mt-12">
                <p className="text-slate-400 dark:text-slate-500 text-xs font-mono uppercase tracking-widest">
                                            Error Reference: 404_PAGE_NOT_FOUND
                                        </p>
                </div>
                </div>
                </main>
                {/* <!-- Footer --> */}
                <footer className="flex flex-col gap-6 px-5 py-10 text-center bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-[#232f48]">
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
                <a className="text-slate-500 dark:text-[#92a4c9] text-sm font-normal hover:text-primary transition-colors" href="#">Privacy Policy</a>
                <a className="text-slate-500 dark:text-[#92a4c9] text-sm font-normal hover:text-primary transition-colors" href="#">Terms of Service</a>
                <a className="text-slate-500 dark:text-[#92a4c9] text-sm font-normal hover:text-primary transition-colors" href="#">Help Center</a>
                </div>
                <div className="flex flex-col gap-2">
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-normal">© 2024 School Accounting System. All rights reserved.</p>
                <div className="flex justify-center gap-4 text-slate-400">
                <span className="material-symbols-outlined text-lg cursor-pointer hover:text-primary">language</span>
                <span className="material-symbols-outlined text-lg cursor-pointer hover:text-primary">shield_with_heart</span>
                <span className="material-symbols-outlined text-lg cursor-pointer hover:text-primary">verified_user</span>
                </div>
                </div>
                </footer>
                </div>
                </div>
        </>
    )
}

export default ErrorPage