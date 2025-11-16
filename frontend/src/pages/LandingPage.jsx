import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "../components/Typewriter";

// Reusable UI
import ThemeToggle from "../assets/components/ThemeToggle";
import FeatureCard from "../assets/components/FeatureCard";
import BrandBadge from "../assets/components/BrandBadge";

// Icons
import IconBriefcase from "../assets/icons/Briefcase";
import IconSearch from "../assets/icons/Search";
import IconFolder from "../assets/icons/Folder";

export default function LandingPage() {
  // Theme state: false = dark, true = light
  const [lightMode, setLightMode] = useState(false);

  // Text helpers (white -> black, gray -> darker gray in light mode)
  const textPrimary = lightMode ? "text-black" : "text-white";
  const textStrong = lightMode ? "text-gray-900" : "text-gray-100";
  const textMuted = lightMode ? "text-gray-700" : "text-gray-300";

  return (
    <section
      className={`relative isolate overflow-hidden min-h-screen ${
        lightMode ? "bg-white" : "bg-black"
      }`}
    >
      {/* Top-right theme toggle */}
      <ThemeToggle
        lightMode={lightMode}
        onToggle={() => setLightMode((v) => !v)}
      />

      {/* Decorative on-brand glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(42,123,155,.35), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(237,221,83,.25), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Brand name with requested gradient */}
        <div className="flex justify-center">
          <h1 className="text-4xl sm:text-8xl font-extrabold">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
              }}
            >
              ResuME
            </span>
          </h1>
        </div>

        {/* Headline + description */}
        <div className="mt-4 text-center">
          <h2
            className={`text-3xl sm:text-5xl font-bold leading-tight ${textStrong}`}
          >
            <Typewriter
              text="One stop dashboard to apply for jobs"
              className={textPrimary}
            />
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg max-w-3xl mx-auto ${textMuted}`}
          >
            Uses AI and your GitHub to build ATS friendly resumes that match the
            job description best.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            lightMode={lightMode}
            title="Build Resume"
            description="Instantly generate a professional resume using your GitHub profile and AI. No manual entry—just connect and go."
            icon={
              <BrandBadge>
                <IconBriefcase />
              </BrandBadge>
            }
            action={
              <Link
                to="/form"
                className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 transition ${
                  lightMode
                    ? "bg-black/10 text-black hover:bg-black/15"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
                aria-label="Start building your resume"
              >
                Start Building
              </Link>
            }
          />

          <FeatureCard
            lightMode={lightMode}
            title="ATS Analyzer"
            description="Check how well your resume matches a job description using AI-powered ATS analysis and get actionable improvements."
            icon={
              <BrandBadge>
                <IconSearch />
              </BrandBadge>
            }
            action={
              <Link
                to="/ats"
                className={`inline-flex cursor-not-allowed items-center justify-center rounded-lg px-5 py-2.5 font-semibold ${
                  lightMode
                    ? "bg-black/10 text-black hover:bg-black/15"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
                aria-label="Analyze resume"
              >
                Analyze Resume
              </Link>
            }
          />

          <FeatureCard
            lightMode={lightMode}
            title="Jobs Applied"
            description="Track roles you applied to, the resume used, and the JD. Requires signup."
            icon={
              <BrandBadge>
                <IconFolder />
              </BrandBadge>
            }
            action={
              <button
                type="button"
                disabled
                className={`inline-flex cursor-not-allowed items-center justify-center rounded-lg px-5 py-2.5 font-semibold ${
                  lightMode
                    ? "bg-black/10 text-black hover:bg-black/15"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
                title="Sign up feature coming soon"
                aria-disabled="true"
              >
                Coming Soon
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
