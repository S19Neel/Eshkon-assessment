"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class PreviewErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in Studio Preview:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <Alert
            variant="destructive"
            className="bg-red-950/60 border-red-500 text-red-200"
          >
            <AlertTitle className="font-bold text-base flex items-center gap-2">
              ⚠️ Preview Rendering Error
            </AlertTitle>
            <AlertDescription className="text-xs space-y-3 mt-2">
              <p>
                A section configuration caused a runtime error during live
                rendering:
              </p>
              <pre className="p-3 bg-slate-950 rounded-lg overflow-x-auto text-red-400 font-mono text-xs">
                {this.state.error?.message || "Unknown error"}
              </pre>
              <Button
                size="sm"
                variant="outline"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="bg-red-900 hover:bg-red-800 text-white border-red-700"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
