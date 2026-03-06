import { Heading2 } from "../../components/ui/Typography";

export default function HomePage() {
    return (
        <>
        <body className="bg-background-light dark:bg-background-dark font-display min-h-screen">
            <div className="flex min-h-screen w-full flex-col lg:flex-row">
                <div className="relative hidden lg:flex lg:w-[40%] flex-col justify-between bg-primary/10 dark:bg-primary/5 p-12 overflow-hidden border-r border-slate-200 dark:border-slate-800">
                <div className="absolute -top-24 -left-24 size-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
            <div className="flex items-center gap-3 text-primary mb-12">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-3xl">account_balance</span>
            </div>  
            <Heading2 title="Greenwood Academy"/>
            </div>
            <div className="mt-20">
            <h1 className="text-4xl font-black text-[#0d121b] dark:text-white leading-tight mb-4">
                                    Professional <br/>
            <span className="text-primary">Accounting Portal</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-sm">
                                    Efficient fee management and administrative tools for modern educational institutions.
                                </p>
            </div>
            </div>
            <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="text-sm">123 Education Lane, NY, 10001</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <span className="material-symbols-outlined text-primary">call</span>
            <span className="text-sm">+1 234 567 890</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <span className="material-symbols-outlined text-primary">mail</span>
            <span className="text-sm">admin@greenwood.edu</span>
            </div>
            </div>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center p-6 bg-background-light dark:bg-background-dark">

                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">account_balance</span>
                        </div>
                        <h2 className="text-xl font-bold text-[#0d121b] dark:text-white">Greenwood Academy</h2>
                    </div>

                    <div className="w-full max-w-[480px]">
                        <div className="bg-white dark:bg-[#1a2130] rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 @container">
                            <div className="mb-8 text-center sm:text-left">
                                <h2 className="text-[#0d121b] dark:text-white text-2xl font-bold leading-tight pb-1">Sign In to Accounting</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Welcome back! Please enter your administrative credentials.</p>
                            </div>

                            <form className="space-y-5">
                                <div className="flex flex-col gap-2">
                                <label className="text-[#0d121b] dark:text-white text-sm font-semibold leading-normal">Email Address</label>
                                <input className="form-input flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-slate-700 bg-white dark:bg-[#1a2130] h-12 placeholder:text-slate-400 p-[15px] text-base font-normal transition-all" placeholder="Enter your school email" type="email" value=""/>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[#0d121b] dark:text-white text-sm font-semibold leading-normal">Password</label>
                                    <div className="relative flex w-full items-stretch rounded-lg">
                                        <input className="form-input flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-slate-700 bg-white dark:bg-[#1a2130] h-12 placeholder:text-slate-400 p-[15px] pr-12 text-base font-normal transition-all" placeholder="Enter your password" type="password" value=""/>

                                        <button className="absolute right-0 top-0 bottom-0 px-3 text-slate-400 hover:text-primary transition-colors" type="button">
                                            <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <a className="text-sm font-medium text-primary hover:underline" href="#">Forgot password?</a>
                                </div>

                                <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-md shadow-primary/20" type="submit">
                                    <span className="truncate">Sign In</span>
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                        Don't have an account? 
                                                        <a className="text-primary font-bold hover:underline ml-1" href="#">Sign Up</a>
                            </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                            <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm hover:text-[#0d121b] dark:hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-lg">support_agent</span>
                            <span>Need technical support?</span>
                            </button>
                            </div>
                        </div>
                    </div>

                    <footer className="mt-12 text-center">
                    <p className="text-slate-400 dark:text-slate-500 text-xs tracking-wide">
                                        © 2024 SchoolFlow Accounting. All rights reserved. <br className="sm:hidden"/>
                    <span className="hidden sm:inline">|</span> Version 2.4.1
                                    </p>
                    </footer>
                </div>
            </div>

        </body>
        </>
    )
}