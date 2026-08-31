"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8f4]">

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-green-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-700 text-2xl shadow-lg shadow-green-700/20">
              🌾
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-green-800 sm:text-xl">
                KisanSetu
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:text-xs">
                Smart Procurement
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-semibold text-gray-600 transition hover:text-green-700"
            >
              Home
            </a>

            <a
              href="#process"
              className="text-sm font-semibold text-gray-600 transition hover:text-green-700"
            >
              How It Works
            </a>

            <a
              href="#features"
              className="text-sm font-semibold text-gray-600 transition hover:text-green-700"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm font-semibold text-gray-600 transition hover:text-green-700"
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-xl px-3 py-2 text-sm font-bold text-green-700 transition hover:bg-green-50 sm:px-5"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-green-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800 sm:px-5"
            >
              Register
            </Link>
          </div>

        </div>
      </nav>


      {/* ================= HERO ================= */}

      <section id="home" className="relative">

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-lime-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">

          {/* LEFT */}

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-xs font-bold text-green-700 shadow-sm sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Smart Agricultural Procurement
            </div>

            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">

              Less Waiting.

              <span className="block text-green-700">
                More Transparency.
              </span>

            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              KisanSetu simplifies the agricultural procurement journey
              by bringing registration, slot booking, digital tokens,
              queue tracking and procurement status into one platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/register"
                className="rounded-2xl bg-green-700 px-7 py-4 text-center font-bold text-white shadow-xl shadow-green-700/20 transition hover:-translate-y-1 hover:bg-green-800"
              >
                Start as a Farmer →
              </Link>

              <a
                href="#process"
                className="rounded-2xl border border-gray-200 bg-white px-7 py-4 text-center font-bold text-gray-700 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:text-green-700"
              >
                Explore Process
              </a>

            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">

              <span className="flex items-center gap-2">
                <span className="font-bold text-green-600">✓</span>
                Digital Booking
              </span>

              <span className="flex items-center gap-2">
                <span className="font-bold text-green-600">✓</span>
                Live Queue
              </span>

              <span className="flex items-center gap-2">
                <span className="font-bold text-green-600">✓</span>
                Transparent Status
              </span>

            </div>

          </div>


          {/* RIGHT - PRODUCT PREVIEW */}

          <div className="relative">

            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-green-200/40 to-lime-100/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white bg-white p-5 shadow-2xl shadow-green-900/10 sm:p-7">

              {/* top bar */}

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Farmer Portal
                  </p>

                  <h2 className="mt-1 text-xl font-extrabold text-gray-900">
                    Your Procurement Journey
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-xl">
                  🌱
                </div>

              </div>


              {/* journey */}

              <div className="mt-7 space-y-3">

                <JourneyStep
                  number="01"
                  icon="👨‍🌾"
                  title="Farmer Registration"
                  text="Create your digital profile"
                  active
                />

                <JourneyStep
                  number="02"
                  icon="🌾"
                  title="Crop & Quantity"
                  text="Enter your produce details"
                />

                <JourneyStep
                  number="03"
                  icon="📅"
                  title="Centre & Slot"
                  text="Choose a convenient slot"
                />

                <JourneyStep
                  number="04"
                  icon="🎫"
                  title="Digital Token"
                  text="Receive your queue token"
                />

                <JourneyStep
                  number="05"
                  icon="📊"
                  title="Track Procurement"
                  text="Follow every stage"
                />

              </div>


              <div className="mt-6 rounded-2xl bg-green-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-bold text-green-800">
                      Everything in one place
                    </p>

                    <p className="text-xs text-green-700">
                      Simple • Transparent • Efficient
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= PROCESS ================= */}

      <section
        id="process"
        className="border-y border-green-100 bg-white py-20"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
              Procurement, simplified.
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              A clear digital journey from registration to successful
              procurement.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-4">

            <ProcessCard
              number="01"
              icon="👨‍🌾"
              title="Register"
              description="Create your farmer profile with your basic details."
            />

            <ProcessCard
              number="02"
              icon="🌾"
              title="Add Produce"
              description="Enter your crop, quantity and procurement requirements."
            />

            <ProcessCard
              number="03"
              icon="📅"
              title="Book Slot"
              description="Select a procurement centre and available time slot."
            />

            <ProcessCard
              number="04"
              icon="🎫"
              title="Get Token"
              description="Receive your token and track the procurement journey."
            />

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="bg-[#12351d] py-20 text-white"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="max-w-2xl">

            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-300">
              Why KisanSetu
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Built around the farmer.
            </h2>

            <p className="mt-4 leading-7 text-green-100">
              Technology should reduce complexity, not add to it.
              KisanSetu keeps the farmer's journey simple and visible.
            </p>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <DarkFeature
              icon="🎫"
              title="Digital Tokens"
              text="Generate a unique token after booking your procurement slot."
            />

            <DarkFeature
              icon="📍"
              title="Live Queue"
              text="Track your position in the queue instead of waiting without information."
            />

            <DarkFeature
              icon="⏱️"
              title="ETA"
              text="Get an estimated waiting time based on the queue."
            />

            <DarkFeature
              icon="🧪"
              title="Quality Testing"
              text="Keep the testing and procurement decision transparent."
            />

            <DarkFeature
              icon="💰"
              title="Payment Tracking"
              text="Track procurement payment status digitally."
            />

            <DarkFeature
              icon="🔔"
              title="Notifications"
              text="Stay informed about booking and procurement updates."
            />

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section id="about" className="py-20">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 md:grid-cols-2">

          <div>

            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
              Our Vision
            </p>

            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
              A smarter bridge between farmers and procurement centres.
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              KisanSetu is designed to digitize the procurement
              experience while reducing unnecessary waiting and
              improving visibility for both farmers and procurement
              centre administrators.
            </p>

            <Link
              href="/register"
              className="mt-7 inline-flex rounded-xl bg-green-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800"
            >
              Create Your Account →
            </Link>

          </div>


          <div className="rounded-[2rem] bg-gradient-to-br from-green-700 to-green-900 p-7 text-white shadow-xl sm:p-9">

            <p className="text-sm font-bold text-green-200">
              THE JOURNEY
            </p>

            <div className="mt-7 space-y-6">

              <VisionRow
                icon="📝"
                title="Book"
                text="Select your centre and slot."
              />

              <VisionRow
                icon="🎫"
                title="Track"
                text="Receive and follow your token."
              />

              <VisionRow
                icon="🧪"
                title="Verify"
                text="Quality testing at the centre."
              />

              <VisionRow
                icon="✓"
                title="Complete"
                text="Procurement and payment tracking."
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="px-5 pb-20 sm:px-8">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-green-700 px-7 py-14 text-center text-white shadow-2xl shadow-green-900/20 sm:px-12">

          <p className="text-sm font-bold text-green-200">
            START YOUR DIGITAL JOURNEY
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Ready to make procurement simpler?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-green-100">
            Create your farmer account and manage your procurement
            journey from one simple platform.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex rounded-xl bg-white px-7 py-3.5 font-bold text-green-800 transition hover:bg-green-50"
          >
            Register Now →
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-center sm:px-8 md:flex-row md:items-center md:justify-between md:text-left">

          <div className="flex items-center justify-center gap-2 md:justify-start">
            <span className="text-xl">🌾</span>
            <span className="font-extrabold text-green-800">
              KisanSetu
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Smart Agricultural Procurement Platform
          </p>

        </div>

      </footer>

    </main>
  );
}


/* ================= COMPONENTS ================= */

function JourneyStep({ number, icon, title, text, active }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
        active
          ? "border-green-200 bg-green-50"
          : "border-gray-100 bg-gray-50"
      }`}
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
        {icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-green-600">
            {number}
          </span>

          <h3 className="text-sm font-bold text-gray-800">
            {title}
          </h3>
        </div>

        <p className="mt-0.5 text-xs text-gray-500">
          {text}
        </p>
      </div>

      <span className="text-gray-300">→</span>

    </div>
  );
}


function ProcessCard({ number, icon, title, description }) {
  return (
    <div className="group rounded-3xl border border-gray-100 bg-[#f8faf8] p-6 transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:bg-white hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl">
          {icon}
        </div>

        <span className="text-xs font-black text-green-200">
          {number}
        </span>

      </div>

      <h3 className="mt-6 text-lg font-extrabold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

    </div>
  );
}


function DarkFeature({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-green-800 bg-green-800/40 p-6 transition hover:-translate-y-1 hover:bg-green-800">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-green-100">
        {text}
      </p>

    </div>
  );
}


function VisionRow({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
        {icon}
      </div>

      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-0.5 text-sm text-green-100">{text}</p>
      </div>

    </div>
  );
}