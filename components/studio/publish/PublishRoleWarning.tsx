"use client";

import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PublishRoleWarningProps } from "@/types/publish";

export const PublishRoleWarning: React.FC<PublishRoleWarningProps> = ({
  role,
  onSwitchRole,
}) => {
  return (
    <Alert
      variant="destructive"
      className="bg-red-950/60 border-red-800 text-red-200"
    >
      <AlertTitle className="font-bold flex items-center gap-2">
        🚫 Permission Denied
      </AlertTitle>
      <AlertDescription className="text-xs space-y-3 mt-1">
        <p>
          You are currently logged in with the{" "}
          <strong className="font-bold underline">{role}</strong> role. Only
          users with the{" "}
          <strong className="font-bold text-white bg-red-900 px-1.5 py-0.5 rounded">
            PUBLISHER
          </strong>{" "}
          role can execute live releases to Contentful.
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onSwitchRole}
          className="bg-red-900/80 hover:bg-red-800 text-white border-red-700 font-bold"
        >
          Switch to Publisher Role
        </Button>
      </AlertDescription>
    </Alert>
  );
};
