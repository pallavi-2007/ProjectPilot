"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, CheckCircle2, Layers, Wrench, Zap, Loader2 } from "lucide-react";

interface MentorDetails {
  features: string[];
  tech_stack: string[];
  development_steps: string[];
  improvements: string[];
}

export default function MentorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const title = params.title ? decodeURIComponent(params.title as string) : "";

  const [details, setDetails] = useState<MentorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    if (title && status === "authenticated") {
      fetchMentorDetails();
    }
  }, [title, status, router]);

  const fetchMentorDetails = async () => {
    try {
      const res = await fetch("/api/mentor-detail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error("Failed to fetch mentor details");

      const data = await res.json();
      setDetails(data);
    } catch (err) {
      setError("Failed to generate guidance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Analyzing your project...</h2>
        <p className="text-slate-400">Your AI Mentor is mapping out the best architecture and steps. This may take a few seconds.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-md mb-8 inline-block">
          {error}
        </div>
        <div>
          <button
            onClick={() => router.back()}
            className="text-accent hover:text-accent-hover font-medium flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} /> Back to ideas
          </button>
        </div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <button
        onClick={() => router.back()}
        className="text-slate-400 hover:text-white font-medium flex items-center gap-2 mb-8 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to ideas
      </button>

      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-accent font-medium">Your AI Mentor Guidance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center text-accent">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-2xl font-bold">Key Features</h2>
          </div>
          <ul className="space-y-3">
            {details.features.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300">
                <span className="text-accent mt-1">•</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center text-accent">
              <Layers size={24} />
            </div>
            <h2 className="text-2xl font-bold">Tech Stack</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {details.tech_stack.map((item, i) => (
              <span key={i} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-8">
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center text-accent">
              <Wrench size={24} />
            </div>
            <h2 className="text-2xl font-bold">Development Steps</h2>
          </div>
          <ol className="space-y-4 relative border-l border-slate-800 ml-4">
            {details.development_steps.map((item, i) => (
              <li key={i} className="pl-6 relative">
                <div className="absolute w-3 h-3 bg-accent rounded-full -left-[6.5px] top-1.5 ring-4 ring-slate-900"></div>
                <p className="text-slate-300">{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center text-accent">
              <Zap size={24} />
            </div>
            <h2 className="text-2xl font-bold">Suggested Improvements</h2>
          </div>
          <ul className="space-y-3 text-slate-400">
            {details.improvements.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-slate-600 mt-1">↳</span> {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
