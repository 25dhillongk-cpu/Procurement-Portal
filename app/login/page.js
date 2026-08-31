"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const storedFarmer = localStorage.getItem("kisanSetuFarmer");

    if (!storedFarmer) {
      setError("No registered farmer account found. Please register first.");
      return;
    }

    const farmer = JSON.parse(storedFarmer);

    if (
      farmer.mobile !== mobile ||
      farmer.password !== password
    ) {
      setError("Incorrect mobile number or password.");
      return;
    }

    setLoading(true);

    localStorage.setItem(
      "kisanSetuLoggedIn",
      "true"
    );

    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  }

  return (
    <main className="min-h-screen bg-[#f5f8f4]">

      {/* NAVBAR */}

      <nav className="border-b border-green-100 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link href="/" className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-700 text-2xl shadow-lg shadow-green-700/20">
              🌾
            </div>

            <div>
              <h1 className="text-lg font-extrabold text-green-800 sm:text-xl">
                KisanSetu
              </h1>

              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Smart Procurement
              </p>
            </div>

          </Link>

          <Link
            href="/"
            className="text-sm font-bold text-gray-600 transition hover:text-green-700"
          >
            ← Back to Home
          </Link>

        </div>

      </nav>


      {/* LOGIN AREA */}

      <div className="flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-10 sm:px-8">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-green-900/10 md:grid-cols-2">

          {/* LEFT */}

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-green-700 to-green-950 p-10 text-white md:flex md:flex-col md:justify-between">

            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-green-300/20 blur-3xl" />

            <div className="relative">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                🌾
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-green-200">
                Farmer Portal
              </p>

              <h2 className="mt-3 text-4xl font-black leading-tight">
                Welcome back.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-green-100">
                Continue your procurement journey and keep track of
                your bookings, queue and procurement status.
              </p>

            </div>


            <div className="relative rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">

              <p className="text-sm font-bold">
                Your digital journey
              </p>

              <div className="mt-4 space-y-3 text-sm text-green-100">

                <p>✓ Manage your farmer profile</p>
                <p>✓ Book procurement slots</p>
                <p>✓ Receive digital tokens</p>
                <p>✓ Track procurement status</p>

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="p-7 sm:p-12">

            <div className="mx-auto max-w-md">

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
                Farmer Login
              </p>

              <h1 className="mt-2 text-3xl font-black text-gray-900">
                Sign in to KisanSetu
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Enter your registered details to access your dashboard.
              </p>


              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}


              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* MOBILE */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      setError("");
                    }}
                    maxLength={10}
                    placeholder="Enter registered mobile number"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />

                </div>


                {/* PASSWORD */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-sm font-bold text-gray-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-bold text-green-700 hover:underline"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />

                </div>


                {/* LOGIN */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-green-700 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Login to Dashboard →"}
                </button>

              </form>


              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-gray-100" />

                <span className="text-xs text-gray-400">
                  NEW FARMER?
                </span>

                <div className="h-px flex-1 bg-gray-100" />

              </div>


              <Link
                href="/register"
                className="block w-full rounded-xl border border-green-200 bg-green-50 py-3.5 text-center text-sm font-bold text-green-700 transition hover:bg-green-100"
              >
                Create Farmer Account
              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}