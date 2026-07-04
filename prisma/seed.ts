import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "../lib/generated/prisma/client";
import { getDirectUrl } from "../lib/db/url";

const pool = new Pool({
  connectionString: getDirectUrl(process.env.DATABASE_URL),
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding test users...");

  const users = [
    {
      email: "viewer@example.com",
      name: "Viewer User",
      role: Role.VIEWER,
      password: "password123",
    },
    {
      email: "editor@example.com",
      name: "Editor User",
      role: Role.EDITOR,
      password: "password123",
    },
    {
      email: "publisher@example.com",
      name: "Publisher User",
      role: Role.PUBLISHER,
      password: "password123",
    },
  ];

  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        role: u.role,
        password: u.password,
        name: u.name,
      },
      create: {
        email: u.email,
        name: u.name,
        role: u.role,
        password: u.password,
      },
    });
    console.log(`Upserted user: ${user.email} (${user.role})`);
  }

  const initialSections = [
    {
      id: "section-hero-1",
      type: "hero",
      props: {
        title: "Welcome to Page Studio",
        subtitle: "Build, edit, and publish modern landing pages effortlessly.",
      },
    },
    {
      id: "section-grid-1",
      type: "featureGrid",
      props: {
        features: [
          {
            title: "Lightning Fast",
            description: "Built on Next.js App Router for optimal performance.",
          },
          {
            title: "Version Controlled",
            description: "Immutable semver releases with instant rollback.",
          },
          {
            title: "Accessible",
            description: "WCAG 2.2 AAA oriented keyboard and contrast support.",
          },
        ],
      },
    },
    {
      id: "section-cta-1",
      type: "cta",
      props: {
        label: "Get Started Now",
        url: "https://example.com/start",
      },
    },
  ];

  await prisma.draft.upsert({
    where: { slug: "home" },
    update: {},
    create: {
      slug: "home",
      title: "Home Landing Page",
      sections: initialSections,
    },
  });
  console.log("Upserted initial draft for slug: 'home'");

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
