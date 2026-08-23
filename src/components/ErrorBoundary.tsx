import { Component, type ErrorInfo, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-navy flex items-center justify-center section-padding">
          <div className="max-w-xl w-full text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20"
            >
              <AlertCircle className="w-10 h-10 text-red-500" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-ink mb-4">Something went wrong</h1>
            <p className="text-ink/60 mb-4">
              We encountered an unexpected technical issue.
            </p>

            {this.state.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-left text-xs font-mono mb-6 overflow-auto max-h-60">
                <p className="font-bold mb-1">{this.state.error.message}</p>
                <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
              </div>
            )}
            
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-ink/10 hover:bg-ink/20 px-6 py-3 rounded-xl text-ink transition-all border border-ink/10"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Experience
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
