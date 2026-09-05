"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogOut, User as UserIcon, Rocket } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-accent" />
            <span className="text-xl font-bold text-white tracking-tight leading-none">
              Project<span className="text-accent">Pilot</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["Problem", "Solution", "How It Works", "Why Us"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-medium text-slate-300 hover:text-accent transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:bg-slate-800 p-1 rounded-full transition-colors"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-slate-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <UserIcon size={16} className="text-slate-400" />
                    </div>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-md shadow-lg py-1">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-sm font-medium text-white truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                  className="text-sm font-medium bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-md transition-colors glow-hover"
                >
                  Sign in with GitHub
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
