import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Check, Smartphone, Mail, MapPin, Phone, Lock, Unlock, CheckCircle2, BookOpen, Zap, FileText, Layout, Newspaper, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import ContactForm from "@/components/ContactForm";
import FeatureGrid from "@/components/FeatureGrid";
import { getUserByEmail } from "@/lib/db";

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
        const user = getUserByEmail(sessionData.email);
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

  // Helper to check access
  const hasAccess = (requiredBadge: string) => {
    if (requiredBadge === "Free") return true;
    if (requiredBadge === "Silver" && (membershipLevel === "silver" || membershipLevel === "gold")) return true;
    if (requiredBadge === "Gold" && membershipLevel === "gold") return true;
    return false;
  };

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* 1. Navbar */}
      <HomeHeader isLoggedIn={isLoggedIn} membershipLevel={membershipLevel as any} />

      {/* 2. Hero Section */}
      <section className="pt-16 pb-12 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 capitalize flex items-center justify-center gap-3 flex-wrap">
          <span>Welcome {displayName}</span>
        </h1>

        <p className="text-zinc-600 dark:text-zinc-300 text-xl max-w-3xl mx-auto">
          Prepare Smart. Progress Fast. Get Promoted.
        </p>
      </section>

      {/* 3. Feature Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FeatureGrid membershipLevel={membershipLevel} role={role} />
      </section>

      {/* 4. Join Section */}
      <section className="bg-sky-50 dark:bg-sky-900/10 py-20 mb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-4 leading-tight">
            Prepare for Inspector Posts Exam 2026 with Confidence
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-8 max-w-3xl mx-auto">
            Practice-rich MCQs, structured Study Planner, comprehensive Web Guide, quick-revision Flash Cards, and printable PDF Notes — everything you need to level up your preparation.
          </p>
          <Link href="/pricing" className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95">
            Join Now
          </Link>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-12 rounded-full"></div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-zinc-800 dark:text-zinc-100 uppercase tracking-tight">
            Why Choose Dak Guru
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {[
              "Reliable and Trusted Platform for Departmental Exam Preparation",
              "Expert-curated content designed by experienced Postal professionals",
              "Well-structured Study Planner to organize your daily learning",
              "Comprehensive Web Guide covering all important rules, acts, and procedures",
              "MCQs, Flash Cards, and Topic-wise Revision for smart practice",
              "Regular updates to study materials and PDF Notes",
              "Mock Tests for self-evaluation and progress tracking",
              "Study anytime, anywhere through the website or app"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1 shrink-0">
                  <Check className="w-6 h-6 text-zinc-800 dark:text-zinc-200 storke-[3]" />
                </div>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/30 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center">
            <div className="z-10">
              <h3 className="text-3xl font-extrabold text-purple-900 dark:text-purple-100 mb-2">Dak Guru App</h3>
              <p className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-8">Launching Soon</p>

              {/* QR Code Placeholder */}
              <div className="bg-white p-4 rounded-xl shadow-lg mb-6 mx-auto w-48 h-48 flex items-center justify-center border-2 border-zinc-900">
                <Smartphone className="w-24 h-24 text-zinc-800" />
              </div>

              <p className="text-sm font-bold text-zinc-500 mb-4">www.dakguru.com</p>

              <div className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mx-auto w-fit">
                <div className="w-6 h-6 relative">
                  {/* Play Store generic icon */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-medium">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </div>
            </div>
            {/* Decorative Hand/Phone */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* 6. Contact Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-4">Contact-Us</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-12">
              Send your queries and doubts to us. We will reply you soon.
            </p>

            {/* Illustration Placeholder */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[4/3] flex items-center justify-center p-6">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
                <Image
                  src="/dak-guru-logo.png"
                  alt="Dak Guru Logo"
                  fill
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">

            {/* Column 1: Brand & Description (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white/10 p-1">
                  <Image src="/dak-guru-new-logo.png" alt="Dak Guru" fill className="object-contain" />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  Dak Guru
                </span>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                Your reliable partner for Departmental Exam Preparation. We provide structured learning, mock tests, and expert guidance to help you succeed.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Owned By</span>
                  <span className="text-sm font-medium text-white">Dak Guru InfoTech</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  Govt. of India Registered MSME
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <Link key={i} href="#" className="p-2.5 bg-zinc-900 rounded-lg hover:bg-blue-600 hover:text-white text-zinc-400 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-bold mb-6 text-white text-left">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "Postal Updates", href: "/postal-updates" },
                  { label: "Current Affairs", href: "/current-affairs" },
                  { label: "Dak Guru Community", href: "/community" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-zinc-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-blue-500 transition-colors"></span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              <h3 className="text-lg font-bold mb-6 text-white text-left">Contact Us</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-zinc-900 group-hover:bg-blue-500/10 group-hover:text-blue-400 text-zinc-400 transition-colors mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Office Address</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Dak Guru InfoTech,<br />
                      Chennai, Tamil Nadu
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-zinc-900 group-hover:bg-blue-500/10 group-hover:text-blue-400 text-zinc-400 transition-colors mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Email Us</h4>
                    <a href="mailto:admin@dakguru.com" className="text-zinc-400 hover:text-blue-400 text-sm transition-colors">
                      admin@dakguru.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-zinc-900 group-hover:bg-blue-500/10 group-hover:text-blue-400 text-zinc-400 transition-colors mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Call Us</h4>
                    <p className="text-zinc-400 text-sm mb-1">Mon - Sat (10am - 6pm)</p>
                    <p className="text-white font-bold tracking-wide">+91 93630 30396</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Dak Guru InfoTech. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-zinc-500">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
