import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getAllPageSlugs } from "@/lib/contentful/adapter";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { PageSlugList } from "@/components/home/PageSlugList";
import { TestCredentialsSection } from "@/components/home/TestCredentialsSection";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const slugs = await getAllPageSlugs();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <HomeHeader session={session} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 space-y-12">
        <HomeHero session={session} />
        <PageSlugList slugs={slugs} />
        <TestCredentialsSection />
      </main>
    </div>
  );
}
