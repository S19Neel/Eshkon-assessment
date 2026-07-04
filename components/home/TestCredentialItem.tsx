"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { TestCredentialItemProps } from "@/types/pages";

export const TestCredentialItem: React.FC<TestCredentialItemProps> = ({
  role,
  badgeClassName,
  email,
  description,
}) => {
  return (
    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 font-mono text-xs">
      <Badge variant="outline" className={badgeClassName}>
        {role}
      </Badge>
      <div className="text-slate-300 pt-1">Email: {email}</div>
      <div className="text-slate-500">Password: password123</div>
      <p className="text-[11px] text-slate-400 font-sans pt-1 leading-normal">
        {description}
      </p>
    </div>
  );
};
