import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <div>
                  <CardTitle className="text-2xl">Something went wrong</CardTitle>
                  <CardDescription className="mt-1.5">
                    We're sorry, but something unexpected happened.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {this.state.error && (
                <details className="mt-4 rounded-md border bg-muted/50 p-4">
                  <summary className="cursor-pointer font-medium text-sm hover:text-primary">
                    Error details
                  </summary>
                  <pre className="mt-3 text-xs overflow-auto max-h-40 text-muted-foreground">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button onClick={this.handleReset} className="flex-1">
                Try again
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/products"} 
                className="flex-1"
              >
                Go to Products
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
