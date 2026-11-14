import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Erreur d'affichage :", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="theme-surface grid min-h-screen place-items-center bg-ink px-5 text-paper">
          <div className="w-full max-w-lg rounded-sm border border-ink/10 bg-paper p-8 text-center text-ink shadow-card">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark">
              MN Consulting Engineering
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
              Une erreur inattendue est survenue.
            </h1>
            <p className="mt-3 text-[14.5px] leading-relaxed text-steel">
              La page n'a pas pu s'afficher correctement. Rechargez-la ou
              revenez à l'accueil pour continuer votre navigation.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex h-11 items-center justify-center rounded-sm border border-white/40 bg-[linear-gradient(115deg,#f8e3ae_0%,#e9b75b_45%,#cf9432_100%)] px-5 text-[13px] font-semibold text-ink transition-opacity hover:opacity-90"
              >
                Recharger la page
              </button>
              <a
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-sm border border-ink/20 px-5 text-[13px] font-semibold text-ink transition-colors hover:border-gold hover:text-gold-dark"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
