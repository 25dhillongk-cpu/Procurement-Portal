"use client";

import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f6f2] text-[#172019] transition-colors duration-300 dark:bg-[#0a100c] dark:text-[#edf3ee]">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">

        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-[#27342b] dark:bg-[#111a14]/90">

          {/* BRAND */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14532d] text-lg font-black text-white">
              KS
            </div>

            <div>

              <div className="text-[17px] font-black tracking-tight text-[#14532d] dark:text-[#63c174]">
                KisanSetu
              </div>

              <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                Smart Procurement
              </div>

            </div>

          </Link>


          {/* NAVIGATION */}

          <div className="hidden items-center gap-8 lg:flex">

            <a
              href="#about"
              className="text-sm font-semibold text-gray-600 transition hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400"
            >
              About
            </a>

            <a
              href="#process"
              className="text-sm font-semibold text-gray-600 transition hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400"
            >
              Process
            </a>

            <a
              href="#features"
              className="text-sm font-semibold text-gray-600 transition hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400"
            >
              Features
            </a>

          </div>


          {/* ACTIONS */}

          <div className="flex items-center gap-2">

            <ThemeToggle />

            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-green-50 hover:text-green-800 dark:text-gray-300 dark:hover:bg-green-950/40 dark:hover:text-green-300 sm:block"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-[#14532d] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0f4224]"
            >
              Register
            </Link>

          </div>

        </div>

      </nav>


      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        id="about"
        className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 sm:pt-40"
      >

        {/* BACKGROUND */}

        <div className="pointer-events-none absolute left-[-15rem] top-20 h-[35rem] w-[35rem] rounded-full bg-green-200/40 blur-3xl dark:bg-green-950/20" />

        <div className="pointer-events-none absolute right-[-15rem] top-40 h-[35rem] w-[35rem] rounded-full bg-lime-200/30 blur-3xl dark:bg-lime-950/10" />


        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

          {/* LEFT */}

          <div className="animate-fade-up">

            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 dark:border-green-900 dark:bg-green-950/30">

              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />

              <span className="text-[9px] font-black uppercase tracking-[0.22em] text-green-800 dark:text-green-300">
                Digital Procurement Platform
              </span>

            </div>


            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5.2rem]">

              A smarter way

              <br />

              <span className="text-green-700 dark:text-green-400">
                to procure.
              </span>

            </h1>


            <p className="mt-7 max-w-xl text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg">
              KisanSetu connects the farmer with the procurement
              process through a single digital platform built for
              clarity, transparency and efficiency.
            </p>


            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/register"
                className="group flex items-center justify-center gap-3 rounded-xl bg-[#14532d] px-7 py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition duration-300 hover:-translate-y-1 hover:bg-[#0f4224]"
              >

                Get Started

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </Link>


              <Link
                href="/login"
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-4 text-sm font-black text-gray-700 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:text-green-800 dark:border-[#2a372e] dark:bg-[#111a14] dark:text-gray-300 dark:hover:border-green-800 dark:hover:text-green-300"
              >
                Farmer Login
              </Link>

            </div>


            {/* TRUST STRIP */}

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-gray-200 pt-6 dark:border-[#27342b]">

              <TrustItem text="Digital-first" />

              <TrustItem text="Transparent" />

              <TrustItem text="Farmer-focused" />

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="relative">

            <div className="absolute -inset-8 rounded-[3rem] bg-green-200/30 blur-3xl dark:bg-green-950/20" />


            <div className="relative rounded-[2rem] border border-white bg-[#183b25] p-4 shadow-2xl shadow-green-950/20 dark:border-[#26382b] sm:p-5">

              {/* TOP BAR */}

              <div className="flex items-center justify-between px-2 py-3">

                <div>

                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-300">
                    KisanSetu
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Farmer Portal
                  </p>

                </div>


                <div className="flex gap-1.5">

                  <span className="h-2 w-2 rounded-full bg-white/20" />

                  <span className="h-2 w-2 rounded-full bg-white/20" />

                  <span className="h-2 w-2 rounded-full bg-green-300" />

                </div>

              </div>


              {/* INNER PANEL */}

              <div className="rounded-[1.5rem] bg-[#f6f8f4] p-6 dark:bg-[#151f18] sm:p-8">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                      Procurement journey
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                      Everything connected.
                    </h2>

                  </div>


                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300">
                    ↗
                  </div>

                </div>


                {/* STEPS */}

                <div className="mt-8 space-y-3">

                  <VisualStep
                    number="01"
                    title="Registration"
                    text="Create farmer profile"
                    active
                  />

                  <VisualStep
                    number="02"
                    title="Scheduling"
                    text="Manage procurement slots"
                  />

                  <VisualStep
                    number="03"
                    title="Token"
                    text="Digital queue management"
                  />

                  <VisualStep
                    number="04"
                    title="Procurement"
                    text="Complete the journey"
                  />

                </div>

              </div>


              {/* BOTTOM */}

              <div className="flex items-center gap-3 px-2 py-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs text-green-200">
                  ✓
                </div>

                <p className="text-xs font-medium text-green-100">
                  One platform. One connected journey.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
          ===================================================== */}

      <section
        id="features"
        className="border-y border-gray-200 bg-white px-5 py-24 dark:border-[#27342b] dark:bg-[#0d140f] sm:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
              Platform
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Built around the
              <br />
              procurement journey.
            </h2>

          </div>


          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-gray-200 bg-gray-200 dark:border-[#27342b] dark:bg-[#27342b] md:grid-cols-2 lg:grid-cols-3">

            <Feature
              number="01"
              title="Farmer Registration"
              text="Create a digital farmer profile using the information provided by the farmer."
            />

            <Feature
              number="02"
              title="Slot Management"
              text="Connect procurement scheduling with the farmer's digital journey."
            />

            <Feature
              number="03"
              title="Digital Tokens"
              text="Generate and display tokens based on the actual procurement process."
            />

            <Feature
              number="04"
              title="Quality Testing"
              text="Keep quality assessment connected with procurement records."
            />

            <Feature
              number="05"
              title="Procurement Tracking"
              text="Follow the progress of an actual procurement request."
            />

            <Feature
              number="06"
              title="Digital Records"
              text="Keep farmer and procurement information organised in one place."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          PROCESS
          ===================================================== */}

      <section
        id="process"
        className="bg-[#f4f6f2] px-5 py-24 dark:bg-[#0a100c] sm:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
                Process
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                From registration
                <br />
                to procurement.
              </h2>

            </div>


            <p className="max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
              The platform is designed to keep each stage connected,
              so information doesn't get lost between steps.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            <Process
              number="01"
              title="Register"
              text="Create your farmer profile."
            />

            <Process
              number="02"
              title="Schedule"
              text="Select a procurement slot."
            />

            <Process
              number="03"
              title="Receive"
              text="Get a digital token when generated."
            />

            <Process
              number="04"
              title="Procure"
              text="Complete the procurement journey."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
          ===================================================== */}

      <section className="px-5 py-20 dark:bg-[#0a100c] sm:px-8">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#14532d] px-7 py-14 text-center shadow-2xl shadow-green-950/20 sm:px-12">

          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-200">
            KisanSetu
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">
            Start your digital procurement journey.
          </h2>


          {/* FIXED CTA BUTTON */}

          <Link
            href="/register"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 text-sm font-black text-[#14532d] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 dark:bg-[#0f4224] dark:text-white dark:hover:bg-[#166534]"
          >
            Register as Farmer →
          </Link>

        </div>

      </section>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="border-t border-gray-200 bg-white px-5 py-8 dark:border-[#27342b] dark:bg-[#0d140f] sm:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14532d] text-[10px] font-black text-white">
              KS
            </div>

            <span className="text-sm font-black">
              KisanSetu
            </span>

          </div>


          <p className="text-xs text-gray-400">
            Smart Procurement Platform
          </p>

        </div>

      </footer>

    </main>
  );
}


/* =========================================================
   COMPONENTS
========================================================= */

function TrustItem({ text }) {
  return (
    <div className="flex items-center gap-2">

      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-[10px] font-black text-green-700 dark:bg-green-950/50 dark:text-green-400">
        ✓
      </span>

      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
        {text}
      </span>

    </div>
  );
}


function VisualStep({
  number,
  title,
  text,
  active = false,
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl border p-3 ${
        active
          ? "border-green-200 bg-white dark:border-green-900 dark:bg-[#111a14]"
          : "border-transparent"
      }`}
    >

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-black ${
          active
            ? "bg-green-700 text-white"
            : "bg-gray-200 text-gray-500 dark:bg-[#263129] dark:text-gray-400"
        }`}
      >
        {number}
      </div>


      <div className="min-w-0">

        <p className="text-sm font-black text-gray-800 dark:text-gray-200">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-gray-400">
          {text}
        </p>

      </div>

    </div>
  );
}


function Feature({
  number,
  title,
  text,
}) {
  return (
    <div className="group bg-white p-7 transition duration-300 hover:bg-[#f8faf7] dark:bg-[#111a14] dark:hover:bg-[#151f18]">

      <div className="flex items-center justify-between">

        <span className="text-[10px] font-black tracking-widest text-gray-300 dark:text-gray-600">
          {number}
        </span>

        <span className="text-lg text-green-700 transition-transform duration-300 group-hover:translate-x-1 dark:text-green-400">
          ↗
        </span>

      </div>


      <h3 className="mt-10 text-lg font-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
        {text}
      </p>

    </div>
  );
}


function Process({
  number,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-950/5 dark:border-[#27342b] dark:bg-[#111a14]">

      <span className="text-xs font-black tracking-widest text-green-700 dark:text-green-400">
        {number}
      </span>

      <h3 className="mt-8 text-xl font-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
        {text}
      </p>

    </div>
  );
}