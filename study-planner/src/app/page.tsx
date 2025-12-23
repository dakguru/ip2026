import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Check, Smartphone, Mail, MapPin, Phone } from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import ContactForm from "@/components/ContactForm";
import FeatureGrid from "@/components/FeatureGrid";
import WelcomeSection from "@/components/WelcomeSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getUserByEmail } from "@/lib/db";

// Social Icons - Simple components or import from lucide if available, 
// but footer used custom SVG paths or lucide. Let's assume Lucide has them or we use generic.

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  const userSession = cookieStore.get("user_session");

  let displayName = "Aspirant";
  let membershipLevel = "free";
  let role = "user";
  const isLoggedIn = !!authToken;

  if (isLoggedIn && userSession?.value) {
    try {
      const sessionData = JSON.parse(userSession.value);
      if (sessionData.email) {
        // Fetch fresh user data to get latest membership status
        const user = await getUserByEmail(sessionData.email);
        if (user) {
          displayName = user.name;
          membershipLevel = user.membershipLevel || "free";
          role = user.role || "user";
        } else {
          // Fallback to session data if DB fetch fails (rare)
          displayName = sessionData.name || "Aspirant";
          role = sessionData.role || "user";
        }
      }
    } catch (e) {
      console.error("Failed to parse user session", e);
    }
  }

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* 1. Navbar */}
      <HomeHeader isLoggedIn={isLoggedIn} membershipLevel={membershipLevel as any} />

      {/* 2. Hero Section */}
      <WelcomeSection displayName={displayName} />

      {/* 3. Feature Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FeatureGrid membershipLevel={membershipLevel} role={role} />
      </section>

      {/* 4. Join Section */}
      <section className="bg-sky-50 dark:bg-sky-900/10 py-20 mb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold text-sm tracking-wide uppercase shadow-sm">
              Be a Smart Aspirant, Not a Passive Viewer
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-6 leading-tight">
            Prepare for Inspector Posts Exam 2026 with Confidence
          </h2>

          <p className="text-zinc-700 dark:text-zinc-200 text-xl font-medium mb-4 max-w-3xl mx-auto leading-relaxed">
            Master the Inspector Posts Syllabus in half the time. No long videos. Just high-yield notes, instant quizzes, and rapid revision.
          </p>

          <p className="text-zinc-500 dark:text-zinc-400 text-base mb-10 max-w-3xl mx-auto">
            Practice-rich MCQs, structured Study Planner, comprehensive Web Guide, quick-revision Flash Cards, and printable PDF Notes — everything you need to level up your preparation.
          </p>

          <Link href="/pricing" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95">
            Join Now
          </Link>
          <div className="w-24 h-1 bg-zinc-200 dark:bg-zinc-800 mx-auto mt-12 rounded-full"></div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Contact Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0F1C] border border-white/5 shadow-2xl">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
            {/* Left Content */}
            <div className="p-10 md:p-16 flex flex-col justify-between h-full bg-white/0">
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 font-medium text-xs tracking-widest uppercase mb-6 border border-blue-500/20">
                  Contact Us
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Let's Discuss Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Preparation Strategy</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-12">
                  Have questions about the syllabus, notes, or the planner? We are here to help you clear every doubt before you start.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                      <Mail className="w-5 h-5 text-slate-300 group-hover:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Mail Us</p>
                      <p className="text-slate-200 font-medium group-hover:text-white transition-colors">support@dakguru.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all">
                      <Phone className="w-5 h-5 text-slate-300 group-hover:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Call Support</p>
                      <p className="text-slate-200 font-medium group-hover:text-white transition-colors">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-all">
                      <MapPin className="w-5 h-5 text-slate-300 group-hover:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Office</p>
                      <p className="text-slate-200 font-medium group-hover:text-white transition-colors">New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-slate-500 text-sm">
                  Operating Hours: <span className="text-slate-300">Mon - Sat, 10AM - 7PM</span>
                </p>
              </div>
            </div>

            {/* Right Content (Form) */}
            <div className="p-8 md:p-16 lg:border-l border-white/5 flex flex-col justify-center bg-white/5 backdrop-blur-sm lg:bg-transparent">
              <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg shadow-blue-600/20">
                  Send a Message
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer - Moved to Global Layout */}
    </div>
  );
}
