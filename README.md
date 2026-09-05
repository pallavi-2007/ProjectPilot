# 🚀 ProjectPilot

**AI-powered final-year project idea generator for students.**

ProjectPilot helps students break through the "I don't know what to build" wall. Instead of scrolling through generic project-idea lists, users select their interests (AI/ML, Web Dev, Mobile Apps, etc.) and technical skills (Python, JavaScript, Java, etc.), and ProjectPilot uses Google's Gemini API to generate personalized, relevant final-year project ideas in seconds. Each idea comes with detailed mentorship guidance — key features, recommended tech stack, and a step-by-step development roadmap — so students don't just get inspired, they know exactly how to execute.


🔗 **Live Demo:** [projectpilot-dusky.vercel.app](https://projectpilot-dusky.vercel.app/)

---

## ✨ Features

- **Personalized idea generation** — select interests and skills to get AI-generated project ideas tailored to you
- **Step-by-step mentorship** — every idea includes suggested features, tech stack, and a development roadmap
- **Persistent session state** — navigate to a mentor page and back without losing your generated ideas or selections
- **GitHub authentication** — secure sign-in via NextAuth.js
- **Smooth, modern UI** — animated hero section, scroll-triggered card reveals, and hover effects throughout

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (React) |
| Styling | Tailwind CSS |
| Backend / API | Next.js API Routes |
| AI | Gemini API (`gemini-2.5-flash`) via Google AI Studio |
| Auth | NextAuth.js with GitHub Provider |
| Hosting | Vercel |
| Version Control | Git + GitHub |

## ⚙️ Getting Started (Local Setup)

1. **Clone the repository**
   ```bash
   git clone https://github.com/pallavi-2007/ProjectPilot.git
   cd ProjectPilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with the following:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   GITHUB_CLIENT_ID=your_github_oauth_client_id
   GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
   NEXTAUTH_SECRET=your_random_secret_string
   NEXTAUTH_URL=http://localhost:3000
   ```

   - Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
   - Create a GitHub OAuth App at [github.com/settings/developers](https://github.com/settings/developers) and set the callback URL to `http://localhost:3000/api/auth/callback/github`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How It Works

1. **Select Interests & Skills** — tell ProjectPilot what you're passionate about and your tech stack
2. **Get AI Ideas** — receive personalized, unique final-year project ideas
3. **Pick Your Favorite** — choose the project that excites you the most
4. **Get Full Guidance** — unlock features, tech stack, and a step-by-step development guide

## 📌 Notes

- The Gemini API free tier has request quotas (per-minute and per-day). If idea generation fails intermittently, it's usually a temporary rate limit — retrying after a short wait resolves it.

## 🙌 Built For

**PromptWars 2026 Hackathon**
