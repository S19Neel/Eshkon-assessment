import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getAllPageSlugs } from "@/lib/contentful/adapter";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const slugs = await getAllPageSlugs();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <header className="border-b border-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-white shadow-lg text-lg">
            S
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-lg block">
              Page Studio
            </span>
            <span className="text-xs text-slate-400 block">
              Advanced Agentic Content Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
              <div className="text-right">
                <span className="text-white font-bold block">
                  {session.user?.name || session.user?.email}
                </span>
                <span className="text-blue-400 font-mono font-extrabold uppercase">
                  {session.user?.role}
                </span>
              </div>
              <Link
                href="/api/auth/signout"
                className="px-2.5 py-1 bg-red-950 hover:bg-red-900 text-red-200 rounded-lg transition-colors font-semibold"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition-all"
            >
              Sign In with Test Role
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 space-y-12">
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-blue-950/80 border border-blue-500/30 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider">
            Eshkon Assessment Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Schema-Driven Landing Page Studio
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            A full-stack WYSIWYG studio powered by Next.js App Router, Redux
            Toolkit, Contentful, PostgreSQL, and Zod. Experience role-based
            access control, live section drag-and-drop, and automated SemVer
            JSON snapshots.
          </p>
          {!session && (
            <div className="pt-2">
              <Link
                href="/api/auth/signin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl transition-all"
              >
                <span>🔑 Log In to Experience Studio</span>
              </Link>
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white">
              Available Page Slugs ({slugs.length})
            </h2>
            <span className="text-xs text-slate-400">
              Select an environment below to inspect or edit
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slugs.map((slug) => (
              <div
                key={slug}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl space-y-6 flex flex-col justify-between transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2 py-0.5 bg-blue-950 text-blue-300 rounded uppercase font-bold">
                      page slug
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white capitalize">
                    {slug} Page
                  </h3>
                  <p className="text-xs text-slate-400">
                    Manage structured Zod sections, test responsive previews, or
                    publish semver releases.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80">
                  <Link
                    href={`/studio/${slug}`}
                    className="p-2.5 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-xl text-center text-xs font-bold transition-all"
                  >
                    🎨 Studio
                  </Link>
                  <Link
                    href={`/preview/${slug}`}
                    className="p-2.5 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white rounded-xl text-center text-xs font-bold transition-all"
                  >
                    👁️ Preview
                  </Link>
                  <Link
                    href={`/site/${slug}`}
                    className="p-2.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-center text-xs font-bold transition-all"
                  >
                    🌐 Site
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            🛡️ Pre-Seeded Test Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono text-xs">
              <span className="text-red-400 font-bold block uppercase">
                Viewer Role
              </span>
              <div className="text-slate-300">Email: viewer@example.com</div>
              <div className="text-slate-500">Password: password123</div>
              <p className="text-[11px] text-slate-400 font-sans pt-1">
                Can preview drafts and view live releases, but cannot save edits
                or publish.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono text-xs">
              <span className="text-amber-400 font-bold block uppercase">
                Editor Role
              </span>
              <div className="text-slate-300">Email: editor@example.com</div>
              <div className="text-slate-500">Password: password123</div>
              <p className="text-[11px] text-slate-400 font-sans pt-1">
                Can modify section props, reorder layouts, and save drafts to
                PostgreSQL.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono text-xs">
              <span className="text-emerald-400 font-bold block uppercase">
                Publisher Role
              </span>
              <div className="text-slate-300">Email: publisher@example.com</div>
              <div className="text-slate-500">Password: password123</div>
              <p className="text-[11px] text-slate-400 font-sans pt-1">
                Has full editor access plus the authority to execute SemVer
                releases to production.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
