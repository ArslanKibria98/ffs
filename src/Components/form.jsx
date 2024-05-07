"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form({ type }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                if (type === "login") {
                    console.log("Logging In")
                    signIn("credentials", {
                        redirect: false,
                        email: e.currentTarget.email.value,
                        password: e.currentTarget.password.value,
                        // @ts-ignore
                    }).then(({ error }) => {
                        if (error) {
                            setLoading(false);
                            toast.error(error);
                        } else {
                            router.refresh();
                            localStorage.setItem('isLoggedIn', true)
                            router.push("/home");

                        }
                    });
                } else {
                    console.log("Signing Up")
                    fetch("/api/auth/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: e.currentTarget.email.value,
                            password: e.currentTarget.password.value,
                            role: "super_admin",
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }),
                    }).then(async (res) => {
                        setLoading(false);
                        if (res.status === 200) {
                            toast.success("Account created! Redirecting to login...");
                            setTimeout(() => {
                                router.push("/");
                            }, 2000);
                        } else {
                            const { error } = res;
                            console.log(error);
                            toast.error(error);
                        }
                    });
                }
            }}
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
            {/* Email Address */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="panic@thedis.co"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            <br />
            <button
                disabled={loading}
                className={`${loading
                    ? "cursor-not-allowed border-primary bg-red-500 text-white"
                    : "border border-red-500 hover:border-white  text-red-500 hover:text-white hover:bg-red-600"
                    } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
                {loading ? (
                    "Loading..."
                ) : (
                    <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
                )}
            </button>
            {type === "login" ? (
                <p className="text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-semibold text-red-600">
                        Sign up
                    </Link>{" "}
                    for free.
                </p>
            ) : (
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/" className="font-semibold text-red-600">
                        Sign in
                    </Link>{" "}
                    instead.
                </p>
            )}
        </form>
    );
}