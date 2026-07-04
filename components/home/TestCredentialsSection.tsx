"use client";

import React from "react";
import { TestCredentialItem } from "./TestCredentialItem";
import { TEST_CREDENTIALS } from "@/lib/constants/credentials";

export const TestCredentialsSection: React.FC = () => {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        🛡️ Pre-Seeded Test Credentials
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEST_CREDENTIALS.map((cred) => (
          <TestCredentialItem
            key={cred.role}
            role={cred.role}
            badgeClassName={cred.badgeClassName}
            email={cred.email}
            description={cred.description}
          />
        ))}
      </div>
    </section>
  );
};
