import {
  Archive,
  ArrowUpRight,
  Check,
  FileText,
  FolderKanban,
  Inbox,
  LogOut,
  Mail,
  RefreshCw,
  Star,
  Trash2,
  Wrench,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import {
  ApiError,
  deleteMessage,
  deleteProject,
  deleteQuote,
  getAdminProjects,
  getDashboardStats,
  getMessages,
  getQuotes,
  updateMessageStatus,
  updateProject,
  updateQuoteStatus,
} from "../../lib/api";
import { useSeo } from "../../lib/seo";
import {
  MESSAGE_STATUS_LABELS,
  QUOTE_STATUS_LABELS,
  categoryLabel,
  type DashboardStats,
  type Message,
  type MessageStatus,
  type Project,
  type QuoteRequest,
  type QuoteStatus,
} from "../../lib/types";
import { cn, formatDate } from "../../lib/utils";

type Tab = "messages" | "quotes" | "projects";

const actionClass =
  "inline-flex h-8 items-center gap-1.5 rounded-sm border border-ink/15 px-2.5 text-[11px] font-semibold text-ink/70 transition-colors hover:border-gold hover:text-gold-dark disabled:pointer-events-none disabled:opacity-50";

const deleteClass = "hover:border-red-400 hover:text-red-600";

const messageStyles: Record<MessageStatus, string> = {
  NEW: "bg-gold/20 text-gold-dark",
  READ: "bg-sky-100 text-sky-800",
  ARCHIVED: "bg-ink/10 text-steel",
};

const quoteStyles: Record<QuoteStatus, string> = {
  NEW: "bg-gold/20 text-gold-dark",
  IN_REVIEW: "bg-sky-100 text-sky-800",
  PROPOSAL_SENT: "bg-violet-100 text-violet-800",
  WON: "bg-emerald-100 text-emerald-800",
  LOST: "bg-red-100 text-red-700",
};

function StatusPill({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]",
        className,
      )}
    >
      {label}
    </span>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-sm border border-dashed border-ink/20 bg-white/40 py-14 text-center">
      <Inbox className="mx-auto size-7 text-steel/40" />
      <p className="mt-3 text-[13.5px] font-medium text-steel">{label}</p>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="h-36 animate-pulse rounded-sm border border-ink/5 bg-ink/[0.05]"
        />
      ))}
    </div>
  );
}

interface MessagesPanelProps {
  messages: Message[];
  busyId: string | null;
  onStatus: (id: string, status: MessageStatus) => void;
  onDelete: (id: string) => void;
}

function MessagesPanel({ messages, busyId, onStatus, onDelete }: MessagesPanelProps) {
  if (!messages.length) {
    return <EmptyState label="Aucun message reçu pour le moment." />;
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const busy = busyId === message.id;
        return (
          <article
            key={message.id}
            className="rounded-sm border border-ink/10 bg-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-[16px] font-semibold tracking-tight">
                    {message.subject}
                  </h2>
                  <StatusPill
                    label={MESSAGE_STATUS_LABELS[message.status]}
                    className={messageStyles[message.status]}
                  />
                </div>
                <p className="mt-1 text-[12px] text-steel">
                  {message.name} ·{" "}
                  <a
                    href={`mailto:${message.email}`}
                    className="transition-colors hover:text-gold-dark"
                  >
                    {message.email}
                  </a>
                  {message.phone ? ` · ${message.phone}` : ""}
                </p>
              </div>
              <time className="font-mono text-[10px] uppercase tracking-[0.12em] text-steel/70">
                {formatDate(message.createdAt)}
              </time>
            </div>

            <p className="mt-4 whitespace-pre-line text-[13.5px] leading-relaxed text-ink/80">
              {message.message}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
              <a
                href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
                className={actionClass}
              >
                Répondre
                <ArrowUpRight className="size-3" />
              </a>
              {message.status !== "READ" ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onStatus(message.id, "READ")}
                  className={actionClass}
                >
                  <Check className="size-3.5" />
                  Marquer lu
                </button>
              ) : null}
              {message.status !== "ARCHIVED" ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onStatus(message.id, "ARCHIVED")}
                  className={actionClass}
                >
                  <Archive className="size-3.5" />
                  Archiver
                </button>
              ) : null}
              <button
                type="button"
                disabled={busy}
                onClick={() => onDelete(message.id)}
                className={cn(actionClass, deleteClass)}
              >
                <Trash2 className="size-3.5" />
                Supprimer
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

interface QuotesPanelProps {
  quotes: QuoteRequest[];
  busyId: string | null;
  onStatus: (id: string, status: QuoteStatus) => void;
  onDelete: (id: string) => void;
}

function QuotesPanel({ quotes, busyId, onStatus, onDelete }: QuotesPanelProps) {
  if (!quotes.length) {
    return <EmptyState label="Aucune demande de devis pour le moment." />;
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote) => {
        const busy = busyId === quote.id;
        return (
          <article
            key={quote.id}
            className="rounded-sm border border-ink/10 bg-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-[16px] font-semibold tracking-tight">
                    {quote.projectType}
                  </h2>
                  <StatusPill
                    label={QUOTE_STATUS_LABELS[quote.status]}
                    className={quoteStyles[quote.status]}
                  />
                </div>
                <p className="mt-1 text-[12px] text-steel">
                  {quote.name}
                  {quote.company ? ` · ${quote.company}` : ""} ·{" "}
                  <a
                    href={`mailto:${quote.email}`}
                    className="transition-colors hover:text-gold-dark"
                  >
                    {quote.email}
                  </a>
                  {quote.phone ? ` · ${quote.phone}` : ""}
                </p>
              </div>
              <time className="font-mono text-[10px] uppercase tracking-[0.12em] text-steel/70">
                {formatDate(quote.createdAt)}
              </time>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-sm bg-sand/40 px-3 py-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-steel/70">
                  Budget
                </p>
                <p className="mt-1 text-[12.5px] font-medium text-ink">
                  {quote.budget || "À définir"}
                </p>
              </div>
              <div className="rounded-sm bg-sand/40 px-3 py-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-steel/70">
                  Échéance
                </p>
                <p className="mt-1 text-[12.5px] font-medium text-ink">
                  {quote.timeline || "À définir"}
                </p>
              </div>
            </div>

            <p className="mt-4 whitespace-pre-line text-[13.5px] leading-relaxed text-ink/80">
              {quote.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
              <a
                href={`mailto:${quote.email}?subject=${encodeURIComponent(`Votre demande : ${quote.projectType}`)}`}
                className={actionClass}
              >
                Répondre
                <ArrowUpRight className="size-3" />
              </a>
              <label className="inline-flex items-center gap-2 text-[11px] font-medium text-steel">
                Statut
                <select
                  aria-label={`Statut de la demande de ${quote.name}`}
                  value={quote.status}
                  disabled={busy}
                  onChange={(event) =>
                    onStatus(quote.id, event.target.value as QuoteStatus)
                  }
                  className="h-8 rounded-sm border border-ink/15 bg-white px-2 text-[11px] font-semibold text-ink focus:border-gold focus:outline-none"
                >
                  {Object.entries(QUOTE_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                disabled={busy}
                onClick={() => onDelete(quote.id)}
                className={cn(actionClass, deleteClass)}
              >
                <Trash2 className="size-3.5" />
                Supprimer
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

interface ProjectsPanelProps {
  projects: Project[];
  busyId: string | null;
  onToggleFeatured: (project: Project) => void;
  onDelete: (id: string) => void;
}

function ProjectsPanel({
  projects,
  busyId,
  onToggleFeatured,
  onDelete,
}: ProjectsPanelProps) {
  if (!projects.length) {
    return <EmptyState label="Aucune réalisation enregistrée." />;
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => {
        const busy = busyId === project.id;
        return (
          <article
            key={project.id}
            className="flex flex-col gap-4 rounded-sm border border-ink/10 bg-white p-4 sm:flex-row sm:items-center"
          >
            <img
              src={project.coverImage}
              alt=""
              loading="lazy"
              className="h-24 w-full rounded-sm object-cover sm:h-20 sm:w-28"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-[15px] font-semibold tracking-tight">
                  {project.title}
                </h2>
                {project.featured ? (
                  <StatusPill
                    label="En avant"
                    className="bg-gold/20 text-gold-dark"
                  />
                ) : null}
                {project.status === "DRAFT" ? (
                  <StatusPill label="Brouillon" className="bg-ink/10 text-steel" />
                ) : null}
              </div>
              <p className="mt-1 text-[12px] text-steel">
                {categoryLabel(project.category)} · {project.location} ·{" "}
                {project.year}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => onToggleFeatured(project)}
                aria-pressed={project.featured}
                aria-label={
                  project.featured
                    ? `Retirer ${project.title} de la une`
                    : `Mettre ${project.title} en avant`
                }
                title={project.featured ? "Retirer de la une" : "Mettre en avant"}
                className={cn(
                  "grid size-8 place-items-center rounded-sm border transition-colors disabled:opacity-50",
                  project.featured
                    ? "border-gold bg-gold/10 text-gold-dark"
                    : "border-ink/15 text-steel hover:border-gold hover:text-gold-dark",
                )}
              >
                <Star
                  className={cn("size-4", project.featured && "fill-gold text-gold")}
                />
              </button>
              <Link
                to={`/realisations/${project.slug}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Voir ${project.title}`}
                className="grid size-8 place-items-center rounded-sm border border-ink/15 text-steel transition-colors hover:border-gold hover:text-gold-dark"
              >
                <ArrowUpRight className="size-4" />
              </Link>
              <button
                type="button"
                disabled={busy}
                onClick={() => onDelete(project.id)}
                aria-label={`Supprimer ${project.title}`}
                className="grid size-8 place-items-center rounded-sm border border-ink/15 text-steel transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function AdminDashboard() {
  useSeo({ title: "Tableau de bord", noindex: true });

  const { user, token, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("messages");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadData = useCallback(
    async (silent = false) => {
      if (!token) return;
      if (!silent) setLoading(true);
      setError("");

      try {
        const [statsData, messageList, quoteList, projectList] = await Promise.all([
          getDashboardStats(token),
          getMessages(token),
          getQuotes(token),
          getAdminProjects(token),
        ]);
        setStats(statsData);
        setMessages(messageList);
        setQuotes(quoteList);
        setProjects(projectList);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          logout();
          return;
        }
        setError(
          err instanceof ApiError
            ? err.message
            : "Impossible de charger les données du tableau de bord.",
        );
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [token, logout],
  );

  useEffect(() => {
    void loadData();
  }, [loadData]);

  async function runAction(id: string, action: () => Promise<unknown>) {
    setBusyId(id);
    setError("");
    try {
      await action();
      await loadData(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        logout();
        return;
      }
      setError(
        err instanceof ApiError
          ? err.message
          : "L'opération n'a pas pu être terminée.",
      );
    } finally {
      setBusyId(null);
    }
  }

  function handleMessageStatus(id: string, status: MessageStatus) {
    if (!token) return;
    void runAction(id, () => updateMessageStatus(token, id, status));
  }

  function handleDeleteMessage(id: string) {
    if (!token || !window.confirm("Supprimer définitivement ce message ?")) return;
    void runAction(id, () => deleteMessage(token, id));
  }

  function handleQuoteStatus(id: string, status: QuoteStatus) {
    if (!token) return;
    void runAction(id, () => updateQuoteStatus(token, id, status));
  }

  function handleDeleteQuote(id: string) {
    if (
      !token ||
      !window.confirm("Supprimer définitivement cette demande de devis ?")
    ) {
      return;
    }
    void runAction(id, () => deleteQuote(token, id));
  }

  function handleToggleFeatured(project: Project) {
    if (!token) return;
    void runAction(project.id, () =>
      updateProject(token, project.id, { featured: !project.featured }),
    );
  }

  function handleDeleteProject(id: string) {
    if (
      !token ||
      !window.confirm("Supprimer définitivement cette réalisation ?")
    ) {
      return;
    }
    void runAction(id, () => deleteProject(token, id));
  }

  const statCards = [
    {
      label: "Messages reçus",
      value: stats?.messages ?? 0,
      detail: `${stats?.newMessages ?? 0} non lu(s)`,
      Icon: Mail,
    },
    {
      label: "Demandes de devis",
      value: stats?.quotes ?? 0,
      detail: `${stats?.newQuotes ?? 0} à traiter`,
      Icon: FileText,
    },
    {
      label: "Réalisations",
      value: stats?.projects ?? 0,
      detail: "Publiées et brouillons",
      Icon: FolderKanban,
    },
    {
      label: "Expertises",
      value: stats?.services ?? 0,
      detail: "Prestations actives",
      Icon: Wrench,
    },
  ];

  const tabs = [
    { id: "messages" as const, label: "Messages", count: messages.length, Icon: Inbox },
    { id: "quotes" as const, label: "Devis", count: quotes.length, Icon: FileText },
    {
      id: "projects" as const,
      label: "Réalisations",
      count: projects.length,
      Icon: FolderKanban,
    },
  ];

  return (
    <div className="min-h-screen bg-sand/40">
      <header className="theme-surface sticky top-0 z-40 border-b border-white/10 bg-ink text-paper">
        <div className="container-wide flex h-16 items-center justify-between gap-4">
          <Logo variant="light" />
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60 transition-colors hover:text-gold sm:inline-flex"
            >
              Voir le site
              <ArrowUpRight className="size-3.5" />
            </Link>
            <div className="hidden text-right md:block">
              <p className="text-[12.5px] font-semibold">{user?.name}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/45">
                {user?.role === "ADMIN" ? "Administrateur" : "Éditeur"}
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-9 items-center gap-2 rounded-sm border border-white/15 px-3 text-[12px] font-semibold text-paper/70 transition-colors hover:border-gold hover:text-gold"
            >
              <LogOut className="size-3.5" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="container-wide py-8 sm:py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Administration</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Tableau de bord
            </h1>
            <p className="mt-2 text-[13.5px] text-steel">
              Bonjour{user ? `, ${user.name}` : ""}. Suivez l'activité et gérez
              vos contenus.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void loadData()}
            icon={
              <RefreshCw className={cn("size-4", loading && "animate-spin")} />
            }
          >
            Actualiser
          </Button>
        </div>

        {error ? (
          <div
            role="alert"
            className="mt-6 rounded-sm border border-red-500/30 bg-red-50 p-4 text-[13px] text-red-800"
          >
            {error}
          </div>
        ) : null}

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map(({ label, value, detail, Icon }) => (
            <div
              key={label}
              className="rounded-sm border border-ink/10 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-9 place-items-center rounded-sm bg-gold/15 text-gold-dark">
                  <Icon className="size-4" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-steel/60">
                  {detail}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-bold tracking-tight">
                {value}
              </p>
              <p className="mt-1 text-[12px] font-medium text-steel">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-1 overflow-x-auto border-b border-ink/10">
          {tabs.map(({ id, label, count, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-[13px] font-semibold transition-colors",
                tab === id
                  ? "border-gold text-ink"
                  : "border-transparent text-steel hover:text-ink",
              )}
            >
              <Icon className="size-4" />
              {label}
              <span className="rounded-full bg-ink/5 px-2 py-0.5 font-mono text-[10px] text-steel">
                {count}
              </span>
            </button>
          ))}
        </div>

        <div className="py-6">
          {loading ? (
            <ListSkeleton />
          ) : tab === "messages" ? (
            <MessagesPanel
              messages={messages}
              busyId={busyId}
              onStatus={handleMessageStatus}
              onDelete={handleDeleteMessage}
            />
          ) : tab === "quotes" ? (
            <QuotesPanel
              quotes={quotes}
              busyId={busyId}
              onStatus={handleQuoteStatus}
              onDelete={handleDeleteQuote}
            />
          ) : (
            <ProjectsPanel
              projects={projects}
              busyId={busyId}
              onToggleFeatured={handleToggleFeatured}
              onDelete={handleDeleteProject}
            />
          )}
        </div>
      </main>
    </div>
  );
}
