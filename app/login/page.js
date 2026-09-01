"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message ||
            "Incorrect mobile number or password."
        );
        return;
      }

      if (result.farmer) {
        localStorage.setItem(
          "kisanSetuFarmer",
          JSON.stringify(result.farmer)
        );
      }

      localStorage.setItem(
        "kisanSetuLoggedIn",
        "true"
      );

      router.push("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7f3] text-[#172019] transition-colors duration-300 dark:bg-[#080d0a] dark:text-[#edf5ef]">

      {/* NAVBAR */}

      <nav className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">

        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-[#29372e] dark:bg-[#111813]/95 sm:px-6">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14532d] text-xs font-black text-white">
              KS
            </div>

            <div>
              <p className="text-[17px] font-black tracking-tight text-green-800 dark:text-green-400">
                KisanSetu
              </p>

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                Smart Procurement
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">

            <ThemeToggle />

            <Link
              href="/"
              className="hidden rounded-xl px-3 py-2 text-sm font-bold text-gray-600 transition hover:bg-green-50 hover:text-green-800 dark:text-gray-400 dark:hover:bg-green-950/40 dark:hover:text-green-300 sm:block"
            >
              ← Home
            </Link>

          </div>

        </div>
      </nav>


      {/* LOGIN AREA */}

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-10 pt-28 sm:px-8">

        <div className="pointer-events-none absolute left-[-12rem] top-20 h-[30rem] w-[30rem] rounded-full bg-green-200/40 blur-3xl dark:bg-green-950/20" />

        <div className="pointer-events-none absolute bottom-[-12rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-lime-200/30 blur-3xl dark:bg-lime-950/10" />

        <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-2xl shadow-green-950/10 dark:border-[#29372e] dark:bg-[#111813] lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT */}

          <div className="relative hidden overflow-hidden bg-[#173d25] p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div className="absolute right-[-7rem] top-[-7rem] h-72 w-72 rounded-full border-[40px] border-white/[0.04]" />

            <div className="relative">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xs font-black">
                KS
              </div>

              <p className="mt-12 text-[9px] font-black uppercase tracking-[0.25em] text-green-300">
                Farmer Portal
              </p>

              <h1 className="mt-4 text-5xl font-black leading-[1.02] tracking-tight">
                Your
                <br />
                journey,
                <br />
                connected.
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-7 text-green-100">
                Access the information associated with your
                registered farmer account.
              </p>

            </div>

            <div className="relative border-t border-white/10 pt-6">

              <p className="text-xs font-black text-white">
                KisanSetu
              </p>

              <p className="mt-2 text-xs leading-5 text-green-200">
                Smart procurement infrastructure for a
                connected farmer journey.
              </p>

            </div>

          </div>


          {/* RIGHT */}

          <div className="flex items-center bg-white p-7 dark:bg-[#111813] sm:p-12 lg:p-14">

            <div className="w-full max-w-md">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
                Farmer Login
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Use the mobile number and password associated
                with your account.
              </p>


              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
                  {error}
                </div>
              )}


              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(
                        e.target.value.replace(/\D/g, "")
                      );
                      setError("");
                    }}
                    maxLength={10}
                    placeholder="Enter mobile number"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:opacity-60 dark:border-[#2a372e] dark:bg-[#151f18] dark:text-white dark:focus:border-green-500 dark:focus:ring-green-950/40"
                  />
                </div>


                <div>

                  <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter password"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 pr-14 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:opacity-60 dark:border-[#2a372e] dark:bg-[#151f18] dark:text-white dark:focus:border-green-500 dark:focus:ring-green-950/40"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-green-700 dark:hover:text-green-400"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14532d] py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0f4224] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Continue
                      <span>→</span>
                    </>
                  )}

                </button>

              </form>


              <div className="mt-8 border-t border-gray-100 pt-7 text-center dark:border-[#29372e]">

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Don't have a farmer account?
                </p>

                <Link
                  href="/register"
                  className="mt-3 inline-block text-sm font-black text-green-700 hover:underline dark:text-green-400"
                >
                  Create an account →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}