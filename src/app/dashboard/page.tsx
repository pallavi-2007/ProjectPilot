"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const INTEREST_OPTIONS = [
  "AI/ML",
  "Web Dev",
  "Mobile Apps",
  "IoT",
  "Cybersecurity",
  "Data Science",
  "Blockchain",
  "Cloud Computing",
  "Game Dev",
];

const SKILL_OPTIONS = [
  "Python",
  "JavaScript",
  "Java",
  "React",
  "Node.js",
  "Flutter",
  "SQL",
  "TensorFlow",
  "C++",
];

interface Idea {
  id: string;
  title: string;
  pitch: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [extra, setExtra] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedIdeas = sessionStorage.getItem("projectPilot_ideas");
    const savedInterests = sessionStorage.getItem("projectPilot_interests");
    const savedSkills = sessionStorage.getItem("projectPilot_skills");
    
    if (savedIdeas) setIdeas(JSON.parse(savedIdeas));
    if (savedInterests) setInterests(JSON.parse(savedInterests));
    if (savedSkills) setSkills(JSON.parse(savedSkills));
  }, []);

  useEffect(() => {
    if (ideas.length > 0) sessionStorage.setItem("projectPilot_ideas", JSON.stringify(ideas));
    sessionStorage.setItem("projectPilot_interests", JSON.stringify(interests));
    sessionStorage.setItem("projectPilot_skills", JSON.stringify(skills));
  }, [interests, skills, ideas]);

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const toggleSelection = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleGenerate = async () => {
    if (interests.length === 0 || skills.length === 0) {
      setError("Please select at least one interest and one skill.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests, skills, extra }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const data = await res.json();
      setIdeas(data.ideas);
      sessionStorage.setItem("projectPilot_ideas", JSON.stringify(data.ideas));
    } catch (err: any) {
      console.error("Client Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 w-full">
      <h1 className="text-3xl font-bold mb-2">Project Idea Generator</h1>
      <p className="text-slate-400 mb-8">
        Select your interests and skills to get personalized final-year project ideas.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-md mb-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleSelection(interest, interests, setInterests)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    interests.includes(interest)
                      ? "bg-accent text-white glow border border-accent"
                      : "bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-500"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSelection(skill, skills, setSkills)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    skills.includes(skill)
                      ? "bg-accent text-white glow border border-accent"
                      : "bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-500"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Anything else? (Optional)</h3>
            <textarea
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              placeholder="E.g., I want to build something for healthcare..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none h-32"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all glow-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Plus />}
            {loading ? "Generating your ideas..." : "Generate Ideas"}
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Generated Ideas</h3>
          
          {!loading && ideas.length === 0 && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center flex flex-col items-center justify-center h-full">
              <Lightbulb className="w-12 h-12 text-slate-700 mb-4" />
              <p className="text-slate-500">Your ideas will appear here.</p>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 gap-4">
              <div className="text-accent text-center font-medium py-2 animate-pulse">
                Hold tight, our AI is brainstorming the perfect ideas for you...
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-slate-800 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-800 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          )}

          {!loading && ideas.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {ideas.map((idea) => (
                <Link href={`/dashboard/mentor/${encodeURIComponent(idea.title)}`} key={idea.id}>
                  <div className="bg-slate-900 border border-slate-800 hover:border-accent/50 rounded-xl p-6 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] group">
                    <h4 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {idea.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {idea.pitch}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Ensure Lightbulb is imported
import { Lightbulb } from "lucide-react";
