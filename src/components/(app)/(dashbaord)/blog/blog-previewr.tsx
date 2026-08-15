"use client";

import { TableOfContentsItem } from "@/schemas/blog-schema";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CodeBlockSwitcher from "./code-blog-switchr";

type Props = {
  content: any;
  tableOfContents?: TableOfContentsItem[];
};

const renderHTML = (html: string | undefined | null) => {
  if (!html || html.trim() === "") return undefined;
  return { __html: html };
};

/* =========================================================
   IMAGE BLOCK
   ========================================================= */
const ImageBlock: React.FC<{ file?: any; caption?: string }> = ({ file, caption }) => {
  if (!file?.url) return null;

  return (
    <figure className="my-10 flex flex-col items-center">
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-sm">
        <Image
          src={file.url}
          alt={caption || "Blog image"}
          width={1200}
          height={675}
          className="h-auto max-h-[650px] w-full object-contain"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

/* =========================================================
   CODE BLOCK
   ========================================================= */
const CodeBlock: React.FC<{
  code?: string;
  language?: string;
  title?: string;
}> = ({ code, language = "javascript", title = "Code" }) => {
  const [copied, setCopied] = useState(false);
  if (!code?.trim()) return null;

  const normalizedLanguage = language.toLowerCase();
  const languageLabels: Record<string, string> = {
    javascript: "JavaScript",
    js: "JavaScript",
    typescript: "TypeScript",
    ts: "TypeScript",
    jsx: "JSX",
    tsx: "TSX",
    python: "Python",
    py: "Python",
    html: "HTML",
    css: "CSS",
    json: "JSON",
    bash: "Bash",
    shell: "Shell",
    sh: "Shell",
    sql: "SQL",
    java: "Java",
    go: "Go",
    rust: "Rust",
    php: "PHP",
    c: "C",
    cpp: "C++",
    csharp: "C#",
    cs: "C#",
  };
  const languageLabel = languageLabels[normalizedLanguage] || language;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div
      data-code-switcher
      className="not-prose my-8 w-full overflow-hidden rounded-2xl border border-border bg-[#f8fafc] shadow-[0_12px_35px_rgba(15,23,42,0.08)] dark:bg-[#0b1120] dark:shadow-[0_16px_45px_rgba(0,0,0,0.35)]"
    >
      <div className="flex min-h-[58px] items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-sm sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="h-4 w-px bg-border sm:block" />
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-sm font-medium text-foreground">{title}</span>
            <span className="hidden rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px] font-medium text-muted-foreground sm:inline-flex">
              {languageLabel}
            </span>
          </div>
        </div>

        <button
          type="button"
          data-code-copy
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm transition-all hover:bg-muted hover:text-foreground active:scale-[0.98]"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 text-green-600 dark:text-green-400"
                aria-hidden="true"
              >
                <path
                  d="m5 12 4 4L19 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Copied</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <rect
                  x="9"
                  y="9"
                  width="11"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div data-code-language-content={normalizedLanguage} className="overflow-x-auto">
        <pre className="m-0 min-w-full bg-transparent px-5 py-6 text-[13px] leading-7 sm:px-6 sm:py-7 sm:text-sm">
          <code className="font-mono text-slate-800 dark:text-slate-200">{code}</code>
        </pre>
      </div>
    </div>
  );
};

/* =========================================================
   SLUGIFY
   ========================================================= */
function slugifyHeader(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* =========================================================
   TOC DATA
   ========================================================= */
function getTableOfContentsItemData(item: TableOfContentsItem) {
  const tocItem = item as TableOfContentsItem & {
    id?: string;
    text?: string;
    title?: string;
    label?: string;
    href?: string;
    slug?: string;
    level?: number;
  };

  const title = tocItem.title || tocItem.text || tocItem.label || "";
  // Prefer slug → id → href
  const rawId = tocItem.slug || tocItem.id || tocItem.href || "";
  const id = rawId.replace(/^#/, "").trim();

  return {
    id: id || slugifyHeader(title),
    title,
    level: tocItem.level || 2,
  };
}

/* =========================================================
   BLOG PREVIEWER
   ========================================================= */
export const BlogPreviewer: React.FC<Props> = ({ content, tableOfContents = [] }) => {
  const [openToggles, setOpenToggles] = useState<Record<string, boolean>>({});
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.style.scrollBehavior = "";
      }
    };
  }, []);

  if (!content || !content.blocks?.length) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Start writing to see the preview...
      </div>
    );
  }

  const handleToggleClick = (id: string) => {
    setOpenToggles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const alertClasses: Record<string, string> = {
    primary:
      "border-blue-400 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-200",
    secondary:
      "border-gray-400 bg-gray-100 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200",
    info: "border-sky-400 bg-sky-100 text-sky-800 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-200",
    success:
      "border-green-400 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-200",
    warning:
      "border-yellow-400 bg-yellow-100 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-200",
    danger:
      "border-red-400 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200",
    light:
      "border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-100 dark:text-gray-900",
    dark: "border-gray-900 bg-gray-800 text-white dark:bg-black",
  };

  const alignClasses: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const validTableOfContents = tableOfContents
    .map(getTableOfContentsItemData)
    .filter((item) => item.id && item.title);

  return (
    <div className="prose max-w-none dark:prose-invert">
      <CodeBlockSwitcher />

      {/* =====================================================
          TABLE OF CONTENTS — clean dropdown at the top
          ===================================================== */}
      {validTableOfContents.length > 0 && (
        <nav
          data-toc
          aria-label="Table of contents"
          className="not-prose mx-auto my-8 w-full max-w-4xl sm:my-10"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.22)]">
            {/* Header bar */}
            <button
              type="button"
              aria-expanded={isTableOfContentsOpen}
              aria-controls="blog-table-of-contents"
              onClick={() => setIsTableOfContentsOpen((prev) => !prev)}
              className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-muted/40 sm:px-6"
            >
              <span className="text-base font-medium text-foreground">Table of Contents</span>

              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-transform duration-300 ${
                  isTableOfContentsOpen ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                >
                  <path
                    d="m6 9 6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* Collapsible list */}
            <div
              id="blog-table-of-contents"
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isTableOfContentsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="border-t border-border bg-muted/10 px-3 py-3 sm:px-4 sm:py-4">
                  <div className="space-y-1">
                    {validTableOfContents.map((item, index) => (
                      <a
                        key={`${item.id}-${index}`}
                        href={`#${item.id}`}
                        data-toc-link={item.id}
                        style={{
                          paddingLeft: `${Math.max(item.level - 2, 0) * 16 + 12}px`,
                        }}
                        className="group flex min-h-10 items-center rounded-lg border border-transparent px-3 py-2 text-sm leading-6 text-muted-foreground transition-all duration-200 hover:bg-background hover:text-foreground hover:shadow-sm"
                      >
                        <span className="mr-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-emerald-500" />
                        <span className="min-w-0">{item.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* =====================================================
          BLOG CONTENT
          ===================================================== */}
      {content.blocks.map((block: any, index: number) => {
        const type = block.type?.toLowerCase();

        if (
          type === "toc" ||
          type === "tableofcontents" ||
          type === "table-of-contents" ||
          type === "table_of_contents"
        ) {
          return null;
        }

        switch (type) {
          case "toggle": {
            const isOpen = openToggles[block.id] ?? block.data.status === "open";
            if (!block.data.text && !block.data.itemsContent) return null;

            return (
              <div
                key={index}
                className="not-prose mb-5 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => handleToggleClick(block.id)}
                  className="flex w-full items-center justify-between gap-4 bg-muted/40 px-4 py-3 text-left font-semibold text-foreground transition-colors hover:bg-muted/60"
                >
                  <span>{block.data.text}</span>
                  <span
                    className={`shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-0" : "-rotate-90"
                    }`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {isOpen && block.data.itemsContent && (
                  <div
                    className="px-4 py-4 text-foreground"
                    dangerouslySetInnerHTML={renderHTML(block.data.itemsContent)}
                  />
                )}
              </div>
            );
          }

          case "alert": {
            if (!block.data) return null;
            const alertMessage = block.data.message?.trim();
            if (!alertMessage) return null;

            const alertTitle =
              block.data.title === "Be Attentivte" ? "Be Attentive" : block.data.title;
            const alertType = block.data.type || "warning";
            const alertAlign = block.data.align || "left";

            return (
              <div
                key={block.id || index}
                className={`not-prose mb-5 rounded-xl border p-4 ${
                  alertClasses[alertType] || alertClasses.warning
                } ${alignClasses[alertAlign]}`}
              >
                {alertTitle && <strong className="mb-1 block font-semibold">{alertTitle}</strong>}
                <span dangerouslySetInnerHTML={renderHTML(alertMessage)} />
              </div>
            );
          }

          case "warning": {
            if (!block.data) return null;
            const alertTitle = block.data.title?.trim() || "Warning";
            const alertMessage = block.data.message?.trim();
            if (!alertMessage) return null;

            return (
              <div
                key={index}
                className="not-prose mb-5 rounded-xl border border-yellow-400 bg-yellow-100 p-4 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-200"
              >
                <strong className="mb-1 block font-semibold">{alertTitle}</strong>
                <span>{alertMessage}</span>
              </div>
            );
          }

          case "paragraph":
          case "aitext": {
            const text = block.data.text?.trim();
            if (!text) return null;
            return (
              <p
                key={index}
                className="mb-6 text-lg leading-8 tracking-[-0.01em] text-foreground/90"
                dangerouslySetInnerHTML={renderHTML(text)}
              />
            );
          }

          case "linktool": {
            const link = block.data.link;
            const meta = block.data.meta;
            if (!link) return null;

            return (
              <div
                key={index}
                className="not-prose my-6 flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                {meta?.image?.url && (
                  <Image
                    src={meta.image.url}
                    alt={meta.title || "Link preview"}
                    width={100}
                    height={100}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    {meta?.title || link}
                  </a>
                  {meta?.description && (
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {meta.description}
                    </p>
                  )}
                  <p className="mt-1 truncate text-xs text-muted-foreground">{link}</p>
                </div>
              </div>
            );
          }

          case "attaches": {
            const file = block.data.file;
            const title = block.data.title || file?.name || "Download";
            if (!file?.url) return null;

            return (
              <div key={index} className="not-prose mb-5">
                <a
                  href={file.url}
                  download={title}
                  className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-muted"
                >
                  {title}
                </a>
              </div>
            );
          }

          case "image":
            return <ImageBlock key={index} file={block.data.file} caption={block.data.caption} />;

          case "code": {
            return (
              <CodeBlock
                key={index}
                code={block.data.code}
                language={block.data.language || block.data.lang || "javascript"}
                title={block.data.title || "Code"}
              />
            );
          }

          case "header": {
            if (!block.data.text) return null;
            const level = Math.min(Math.max(block.data.level || 2, 1), 6);
            const id = slugifyHeader(block.data.text);

            const classes =
              level === 1
                ? "scroll-mt-24 mb-5 mt-12 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
                : level === 2
                  ? "scroll-mt-24 mb-4 mt-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                  : level === 3
                    ? "scroll-mt-24 mb-3 mt-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                    : "scroll-mt-24 mb-3 mt-7 text-xl font-semibold tracking-tight text-foreground sm:text-2xl";

            const Tag = `h${level}` as any;
            return (
              <Tag key={index} id={id} className={classes}>
                {block.data.text}
              </Tag>
            );
          }

          case "list": {
            if (!block.data.items?.length) return null;
            const ListTag = block.data.style === "ordered" ? "ol" : "ul";
            const listClass =
              block.data.style === "ordered"
                ? "mb-6 list-inside list-decimal space-y-2 text-lg leading-8"
                : "mb-6 list-inside list-disc space-y-2 text-lg leading-8";

            return (
              <ListTag key={index} className={listClass}>
                {block.data.items.map((item: any, i: number) => (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={renderHTML(
                      typeof item === "string" ? item : item.content || "",
                    )}
                  />
                ))}
              </ListTag>
            );
          }

          case "checklist": {
            if (!block.data.items?.length) return null;
            return (
              <ul key={index} className="not-prose mb-6 space-y-3">
                {block.data.items.map((item: any, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-base leading-7">
                    <input
                      type="checkbox"
                      checked={!!item.checked}
                      readOnly
                      className="h-4 w-4 shrink-0 accent-primary"
                    />
                    <span dangerouslySetInnerHTML={renderHTML(item.text || "")} />
                  </li>
                ))}
              </ul>
            );
          }

          case "delimiter": {
            const style = block.data?.style || "star";
            const delimiterStyles: Record<string, string> = {
              star: "★ ★ ★ ★ ★",
              dash: "— — — — —",
              line: "────────────────",
            };
            return (
              <div
                key={index}
                className="not-prose my-10 text-center text-sm tracking-[0.35em] text-muted-foreground/60"
              >
                {delimiterStyles[style] || delimiterStyles.star}
              </div>
            );
          }

          case "raw":
            if (!block.data.html) return null;
            return (
              <div
                key={index}
                className="my-8"
                dangerouslySetInnerHTML={renderHTML(block.data.html)}
              />
            );

          case "quote":
            if (!block.data.text) return null;
            return (
              <blockquote
                key={index}
                className="my-8 border-l-4 border-primary bg-muted/30 py-4 pl-5 pr-4 text-lg italic leading-8 text-muted-foreground"
              >
                {block.data.text}
                {block.data.caption && (
                  <footer className="mt-3 text-sm not-italic text-foreground/70">
                    — {block.data.caption}
                  </footer>
                )}
              </blockquote>
            );

          case "table": {
            if (!block.data?.content) return null;
            return (
              <div
                key={index}
                className="not-prose my-8 overflow-x-auto rounded-xl border border-border shadow-sm"
              >
                <table className="w-full border-collapse text-left">
                  <tbody>
                    {block.data.content.map((row: string[], rowIdx: number) => (
                      <tr key={rowIdx} className="border-b border-border last:border-b-0">
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className="border-r border-border px-4 py-3 text-sm leading-6 text-foreground last:border-r-0"
                            dangerouslySetInnerHTML={renderHTML(cell)}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
};
