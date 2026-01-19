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
            <div className="w-full max-w-md animate-in slide-in-up delay-100">
                {/* Logo outside card */}
                <div className="text-center mb-6">
                    <Link href="/">
                        <img
                            src="https://www.codeninjas.com/hubfs/Group%201.svg"
                            alt="Code Ninjas"
                            className="h-10 sm:h-14 w-auto mx-auto hover:scale-105 transition-transform"
                        />
                    </Link>
                </div>

                {/* White Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
                    <div className="text-center animate-in slide-in-up delay-150">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to your Dojo Hub account
                        </p>
                    </div>

                    <form className="space-y-5 animate-in slide-in-up delay-200">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-semibold leading-6 text-gray-700">
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
                                        className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--brand)] text-sm"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--brand)] text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Link href="/auth/forgot-password" className="text-sm font-medium text-[var(--brand)] hover:text-blue-700">
                                Forgot your password?
                            </Link>
                        </div>

                        {error && (
                            <div className="rounded-xl bg-red-50 p-4 animate-in fade-in border border-red-200">
                                <div className="text-sm text-red-700 font-medium">{error}</div>
                            </div>
                        )}

                        {message && (
                            <div className="rounded-xl bg-green-50 p-4 animate-in fade-in border border-green-200">
                                <div className="text-sm text-green-700 font-medium">{message}</div>
                            </div>
                        )}

                        <div className="animate-in slide-in-up delay-300">
                            <button
                                formAction={login}
                                className="group relative flex w-full justify-center px-5 py-3.5 rounded-xl bg-[var(--brand)] text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                            >
                                Sign in
                            </button>

                            <p className="mt-4 text-center text-sm text-gray-500">
                                New parent?{' '}
                                <Link href="/signup" className="font-semibold leading-6 text-[var(--brand)] hover:text-blue-700">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
