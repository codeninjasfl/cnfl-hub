import { login } from './actions'
import Link from 'next/link'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const error = typeof params?.error === 'string' ? params.error : null;
    const message = typeof params?.message === 'string' ? params.message : null;
    const email = typeof params?.email === 'string' ? params.email : '';

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in" style={{ background: 'linear-gradient(180deg, var(--bg1), var(--bg2))' }}>
            <div className="w-full max-w-md space-y-6 p-6 sm:p-8 animate-in slide-in-up delay-100">
                <div className="text-center flex flex-col items-center animate-in slide-in-up delay-150">
                    <Link href="/">
                        <img
                            src="https://www.codeninjas.com/hubfs/Group%201.svg"
                            alt="Code Ninjas"
                            className="h-10 sm:h-12 w-auto mb-4 hover:scale-105 transition-transform"
                        />
                    </Link>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        Dojo Hub
                    </h2>
                    <p className="mt-2 text-sm text-white/80">
                        Welcome back! Sign in to continue.
                    </p>
                </div>

                <form className="mt-6 space-y-5 animate-in slide-in-up delay-200">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-semibold leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    defaultValue={email}
                                    autoComplete="email"
                                    className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-lg ring-1 ring-inset ring-white/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white text-sm bg-white/95 backdrop-blur-sm"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-white">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-lg ring-1 ring-inset ring-white/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white text-sm bg-white/95 backdrop-blur-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <Link href="/auth/forgot-password" className="text-sm font-medium text-white hover:underline">
                            Forgot your password?
                        </Link>
                    </div>

                    {error && (
                        <div className="rounded-xl bg-red-500/20 backdrop-blur-sm p-4 animate-in fade-in border border-red-400/30">
                            <div className="text-sm text-white font-medium">{error}</div>
                        </div>
                    )}

                    {message && (
                        <div className="rounded-xl bg-green-500/20 backdrop-blur-sm p-4 animate-in fade-in border border-green-400/30">
                            <div className="text-sm text-white font-medium">{message}</div>
                        </div>
                    )}

                    <div className="animate-in slide-in-up delay-300">
                        <button
                            formAction={login}
                            className="group relative flex w-full justify-center px-5 py-3.5 rounded-xl bg-white text-[var(--brand)] font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                        >
                            Sign in
                        </button>

                        <p className="mt-4 text-center text-sm text-white/80">
                            New parent?{' '}
                            <Link href="/signup" className="font-semibold leading-6 text-white hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
