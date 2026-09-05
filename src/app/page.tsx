"use client";

import { useEffect } from "react";

import { signIn } from "next-auth/react";
import { Lightbulb, Code, Target, Rocket, Sparkles, Clock, Map, Smile } from "lucide-react";

export default function LandingPage() {
  const steps = [
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "1. Select Interests & Skills",
      description: "Tell us what you're passionate about and your tech stack.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-accent" />,
      title: "2. Get AI Ideas",
      description: "Receive personalized, unique final-year project ideas.",
    },
    {
      icon: <Code className="w-8 h-8 text-accent" />,
      title: "3. Pick Your Favorite",
      description: "Choose the project that excites you the most.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-accent" />,
      title: "4. Get Full Guidance",
      description: "Unlock features, tech stack, and step-by-step development guide.",
    },
  ];

  const benefits = [
    {
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: "AI-Personalized",
      description: "Get concepts perfectly matched to your unique interests and skills.",
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: "Saves Time",
      description: "Stop brainstorming for weeks. Get winning ideas in seconds.",
    },
    {
      icon: <Map className="w-8 h-8 text-accent" />,
      title: "Full Mentorship",
      description: "Clear roadmaps, features, and tech stacks for every project.",
    },
    {
      icon: <Smile className="w-8 h-8 text-accent" />,
      title: "Beginner Friendly",
      description: "Tailored complexity ensuring you can actually build it.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 relative overflow-hidden">
      
      {/* Animated Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] opacity-40 pointer-events-none z-0">
        <div className="absolute top-10 left-20 w-72 h-72 bg-accent rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <section className="max-w-4xl mx-auto text-center py-20 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 opacity-0 animate-fade-in-up">
          Find Your Perfect <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
            Final-Year Project
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-200" style={{ animationFillMode: 'forwards' }}>
          Stuck on what to build? Let our AI generate personalized project ideas based on your unique interests and skills. Complete with step-by-step mentorship.
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="text-lg font-bold bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full transition-all glow-hover hover:scale-105 active:scale-95 opacity-0 animate-fade-in-up animation-delay-400"
          style={{ animationFillMode: 'forwards' }}
        >
          Get Started
        </button>
      </section>

      <section id="how-it-works" className="w-full max-w-6xl mx-auto py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center text-center transition-all hover:border-accent/50 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] group opacity-0 reveal-on-scroll"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="why-us" className="w-full max-w-6xl mx-auto py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ProjectPilot?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center text-center transition-all hover:border-accent/50 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] group opacity-0 reveal-on-scroll"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-slate-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto py-20 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 border-l-4 border-l-accent rounded-xl p-8 text-center opacity-0 reveal-on-scroll" style={{ animationDelay: "0ms" }}>
            <h3 className="text-4xl font-bold text-white mb-2">AI-Powered</h3>
            <p className="text-slate-400 font-medium">State-of-the-art models</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 border-l-4 border-l-accent rounded-xl p-8 text-center opacity-0 reveal-on-scroll" style={{ animationDelay: "150ms" }}>
            <h3 className="text-4xl font-bold text-white mb-2">4 Simple Steps</h3>
            <p className="text-slate-400 font-medium">From idea to roadmap</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 border-l-4 border-l-accent rounded-xl p-8 text-center opacity-0 reveal-on-scroll" style={{ animationDelay: "300ms" }}>
            <h3 className="text-4xl font-bold text-white mb-2">100% Free</h3>
            <p className="text-slate-400 font-medium">No credit card required</p>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-accent" />
            <span className="text-lg font-bold text-white tracking-tight leading-none">
              Project<span className="text-accent">Pilot</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            {["Problem", "Solution", "How It Works", "Why Us"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-medium text-slate-400 hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 ProjectPilot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
