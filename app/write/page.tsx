"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TurndownService from "turndown";

const TOKEN_KEY = "blog_gh_token";
const DRAFT_KEY = "blog_draft";
const REPO = "Yuhannakapali/yuhannakapali";
const BRANCH = "main";
const API_BASE = `https://api.github.com/repos/${REPO}/contents`;

type PublishState =
  | { status: "idle" }
  | { status: "working"; message: string }
  | { status: "error"; message: string }
  | { status: "done"; slug: string };

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function extForMime(mime: string): string {
  if (mime.includes("png")) return "png";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg";
  if (mime.includes("gif")) return "gif";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("svg")) return "svg";
  return "png";
}

function yamlString(value: string): string {
  // JSON string literals are valid YAML double-quoted scalars.
  return JSON.stringify(value);
}

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [publish, setPublish] = useState<PublishState>({ status: "idle" });
  const [draftSaved, setDraftSaved] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [plusPos, setPlusPos] = useState<{ top: number; left: number } | null>(
    null,
  );

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restored = useRef(false);
  // Resolves the pending token modal once the user saves or cancels.
  const tokenResolver = useRef<((token: string | null) => void) | null>(null);

  const insertImageFile = useCallback(
    (file: File, ed: ReturnType<typeof useEditor>) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string" && ed) {
          ed.chain().focus().setImage({ src: reader.result }).run();
        }
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({ placeholder: "Tell your story..." }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Image.configure({ inline: false, allowBase64: true }),
    ],
    content: "",
    editorProps: {
      attributes: {
        spellcheck: "true",
        class: "tiptap font-article text-[18px] md:text-[20px] outline-none",
      },
      handlePaste(view, event) {
        const items = event.clipboardData?.items;
        if (items) {
          for (const item of Array.from(items)) {
            if (item.type.startsWith("image/")) {
              const file = item.getAsFile();
              if (file) {
                insertImageFile(file, editorRef.current);
                return true;
              }
            }
          }
        }
        const text = event.clipboardData?.getData("text/plain")?.trim();
        if (
          text &&
          /^https?:\/\/\S+$/.test(text) &&
          !view.state.selection.empty
        ) {
          editorRef.current
            ?.chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: text })
            .run();
          return true;
        }
        return false;
      },
    },
  });

  // Stable ref so callbacks defined before the editor exists can reach it.
  const editorRef = useRef<typeof editor>(null);
  editorRef.current = editor;

  const scheduleDraftSave = useCallback(
    (nextTitle: string) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        const html = editorRef.current?.getHTML() ?? "";
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ title: nextTitle, html }),
        );
        setDraftSaved(true);
        if (savedTimer.current) clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setDraftSaved(false), 1500);
      }, 500);
    },
    [],
  );

  // Restore a saved draft once the editor is ready.
  useEffect(() => {
    if (!editor || restored.current) return;
    restored.current = true;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as { title?: string; html?: string };
        if (draft.title) setTitle(draft.title);
        if (draft.html) editor.commands.setContent(draft.html);
      }
    } catch {
      // Ignore malformed drafts.
    }
  }, [editor]);

  // Autosave body changes, keep the "+" button and menu state in sync.
  useEffect(() => {
    if (!editor) return;

    const onUpdate = () => scheduleDraftSave(titleRef.current?.value ?? "");

    const onSelection = () => {
      const { selection } = editor.state;
      const node = selection.$from.parent;
      const isEmptyLine =
        node.type.name === "paragraph" && node.content.size === 0;
      if (isEmptyLine && editor.isFocused) {
        const coords = editor.view.coordsAtPos(selection.from);
        setPlusPos({ top: coords.top - 4, left: coords.left - 44 });
      } else {
        setPlusPos(null);
      }
    };

    const onBlur = () => setPlusPos(null);

    editor.on("update", onUpdate);
    editor.on("selectionUpdate", onSelection);
    editor.on("focus", onSelection);
    editor.on("blur", onBlur);

    return () => {
      editor.off("update", onUpdate);
      editor.off("selectionUpdate", onSelection);
      editor.off("focus", onSelection);
      editor.off("blur", onBlur);
    };
  }, [editor, scheduleDraftSave]);

  // Cmd/Ctrl+K adds a link to the current selection.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        if (editorRef.current?.isFocused) {
          e.preventDefault();
          promptForLink();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const promptForLink = useCallback(() => {
    const ed = editorRef.current;
    if (!ed) return;
    const previous = ed.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter a URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      ed.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    ed.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, []);

  const hasContent = Boolean(
    title.trim() || (editor && !editor.isEmpty),
  );

  function requestToken(): Promise<string | null> {
    const existing = localStorage.getItem(TOKEN_KEY);
    if (existing) return Promise.resolve(existing);
    setTokenInput("");
    setShowTokenModal(true);
    return new Promise((resolve) => {
      tokenResolver.current = resolve;
    });
  }

  function saveToken() {
    const value = tokenInput.trim();
    if (!value) return;
    localStorage.setItem(TOKEN_KEY, value);
    setShowTokenModal(false);
    tokenResolver.current?.(value);
    tokenResolver.current = null;
  }

  function cancelToken() {
    setShowTokenModal(false);
    tokenResolver.current?.(null);
    tokenResolver.current = null;
  }

  function changeToken() {
    setMenuOpen(false);
    localStorage.removeItem(TOKEN_KEY);
    setTokenInput("");
    setShowTokenModal(true);
    // No pending publish: resolver stays null and saveToken just stores it.
  }

  function saveDraftNow() {
    setMenuOpen(false);
    const html = editor?.getHTML() ?? "";
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, html }));
    setDraftSaved(true);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setDraftSaved(false), 1500);
  }

  async function ghGetSha(
    path: string,
    token: string,
  ): Promise<string | null> {
    const res = await fetch(
      `${API_BASE}/${path}?ref=${BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    if (res.status === 404) return null;
    if (res.status === 401) throw new Error("UNAUTHORIZED");
    if (!res.ok) throw new Error(`Could not read ${path} (${res.status}).`);
    const data = await res.json();
    return data.sha as string;
  }

  async function ghPut(
    path: string,
    base64Content: string,
    message: string,
    token: string,
  ): Promise<void> {
    const sha = await ghGetSha(path, token);
    const res = await fetch(`${API_BASE}/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        message,
        content: base64Content,
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });
    if (res.status === 401) throw new Error("UNAUTHORIZED");
    if (!res.ok) {
      let detail = "";
      try {
        detail = (await res.json())?.message ?? "";
      } catch {
        // ignore
      }
      throw new Error(
        `Commit failed for ${path} (${res.status}). ${detail}`.trim(),
      );
    }
  }

  async function handlePublish() {
    if (!editor) return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setPublish({ status: "error", message: "Add a title before publishing." });
      return;
    }

    let token: string | null;
    try {
      token = await requestToken();
    } catch {
      token = null;
    }
    if (!token) {
      setPublish({
        status: "error",
        message: "A GitHub token is required to publish.",
      });
      return;
    }

    const slug = slugify(trimmedTitle) || `post-${Date.now()}`;

    try {
      setPublish({ status: "working", message: "Preparing post..." });

      const turndown = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
        bulletListMarker: "-",
      });
      let markdown = turndown.turndown(editor.getHTML());

      // Upload each embedded (data URL) image and swap in its public path.
      const imageRegex =
        /!\[([^\]]*)\]\((data:image\/[a-zA-Z0-9.+-]+;base64,[^)]+)\)/g;
      const matches = Array.from(markdown.matchAll(imageRegex));
      let firstImagePath = "";

      for (let i = 0; i < matches.length; i++) {
        const [, , dataUrl] = matches[i];
        const commaIdx = dataUrl.indexOf(",");
        const meta = dataUrl.slice(5, dataUrl.indexOf(";"));
        const base64 = dataUrl.slice(commaIdx + 1);
        const ext = extForMime(meta);
        const filename = `${slug}-${Date.now()}-${i + 1}.${ext}`;
        const publicPath = `/images/uploads/${filename}`;

        setPublish({
          status: "working",
          message: `Uploading image ${i + 1} of ${matches.length}...`,
        });
        await ghPut(
          `public/images/uploads/${filename}`,
          base64,
          `Add image ${filename}`,
          token,
        );

        markdown = markdown.split(dataUrl).join(publicPath);
        if (!firstImagePath) firstImagePath = publicPath;
      }

      const firstParagraph =
        editor
          .getText()
          .split("\n")
          .map((l) => l.trim())
          .find(Boolean) ?? "";
      const description = firstParagraph.slice(0, 200);
      const date = new Date().toISOString();

      const frontmatter = [
        "---",
        `title: ${yamlString(trimmedTitle)}`,
        `date: ${date}`,
        `description: ${yamlString(description)}`,
        ...(firstImagePath ? [`cover: ${yamlString(firstImagePath)}`] : []),
        "---",
        "",
      ].join("\n");

      const fileContent = `${frontmatter}\n${markdown.trim()}\n`;

      setPublish({ status: "working", message: "Committing post..." });
      await ghPut(
        `content/posts/${slug}.md`,
        utf8ToBase64(fileContent),
        `Add post: ${trimmedTitle}`,
        token,
      );

      localStorage.removeItem(DRAFT_KEY);
      setPublish({ status: "done", slug });
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        localStorage.removeItem(TOKEN_KEY);
        setPublish({
          status: "error",
          message:
            "That token was rejected. Use the menu to set a new GitHub token, then publish again.",
        });
        return;
      }
      setPublish({
        status: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong while publishing.",
      });
    }
  }

  if (publish.status === "done") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 text-[#242424]">
        <div className="max-w-[520px] text-center">
          <h1 className="text-[28px] font-bold tracking-tight">Published</h1>
          <p className="mt-4 text-[18px] leading-relaxed text-[#6b6b6b]">
            Your site is rebuilding and the post will be live in a few minutes.
          </p>
          <Link
            href={`/blog/${publish.slug}`}
            className="mt-6 inline-block text-[16px] text-[#1a8917] underline"
          >
            View /blog/{publish.slug}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-surface min-h-screen bg-white text-[#242424]">
      {/* Minimal top bar: draft indicator, menu, and Publish only. */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-end gap-3 px-5 py-4">
        <span
          className={`text-[13px] text-[#6b6b6b] transition-opacity duration-500 ${
            draftSaved ? "opacity-100" : "opacity-0"
          }`}
        >
          Draft saved
        </span>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="More options"
            className="rounded-full px-2 py-1 text-[18px] leading-none text-[#6b6b6b] hover:bg-black/5"
          >
            &#8943;
          </button>
          {menuOpen ? (
            <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-black/10 bg-white text-[14px] shadow-lg">
              <button
                type="button"
                onClick={saveDraftNow}
                className="block w-full px-4 py-2 text-left hover:bg-black/5"
              >
                Save draft
              </button>
              <button
                type="button"
                onClick={changeToken}
                className="block w-full px-4 py-2 text-left hover:bg-black/5"
              >
                Change token
              </button>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handlePublish}
          disabled={publish.status === "working"}
          className={`rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors ${
            hasContent
              ? "bg-[#1a8917] text-white hover:bg-[#157012]"
              : "bg-transparent text-[#6b6b6b]"
          } ${publish.status === "working" ? "opacity-60" : ""}`}
        >
          {publish.status === "working" ? "Publishing..." : "Publish"}
        </button>
      </div>

      <div className="mx-auto w-full max-w-[680px] px-5 pt-24 pb-[40vh]">
        {publish.status === "error" ? (
          <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-[14px] text-red-700">
            {publish.message}
          </div>
        ) : null}
        {publish.status === "working" ? (
          <div className="mb-6 text-[13px] text-[#6b6b6b]">
            {publish.message}
          </div>
        ) : null}

        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
            scheduleDraftSave(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // Defer so focus lands on the editor after the keydown settles.
              setTimeout(() => editorRef.current?.commands.focus("start"), 0);
            }
          }}
          rows={1}
          placeholder="Title"
          spellCheck
          className="w-full resize-none overflow-hidden bg-transparent text-[32px] font-bold leading-[1.15] tracking-tight text-[#242424] outline-none placeholder:text-[#b3b3b3] md:text-[42px]"
        />

        <div className="mt-4">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Bubble menu: dark rounded pill on text selection. */}
      {editor ? (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex items-center gap-1 rounded-full bg-[#242424] px-2 py-1 text-white shadow-lg"
        >
          <BubbleButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            label="Bold"
          >
            <span className="font-bold">B</span>
          </BubbleButton>
          <BubbleButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            label="Italic"
          >
            <span className="italic">i</span>
          </BubbleButton>
          <span className="mx-1 h-4 w-px bg-white/25" />
          <BubbleButton
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            label="Heading 2"
          >
            H2
          </BubbleButton>
          <BubbleButton
            active={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            label="Heading 3"
          >
            H3
          </BubbleButton>
          <BubbleButton
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            label="Blockquote"
          >
            &#8220;
          </BubbleButton>
          <span className="mx-1 h-4 w-px bg-white/25" />
          <BubbleButton
            active={editor.isActive("link")}
            onClick={promptForLink}
            label="Link"
          >
            &#128279;
          </BubbleButton>
        </BubbleMenu>
      ) : null}

      {/* "+" add-image button on empty lines. */}
      {plusPos ? (
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            fileInputRef.current?.click();
          }}
          style={{ top: plusPos.top, left: plusPos.left }}
          aria-label="Add image"
          className="fixed z-40 flex h-8 w-8 items-center justify-center rounded-full border border-black/20 text-[20px] leading-none text-[#6b6b6b] hover:border-black/50 hover:text-black"
        >
          +
        </button>
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) insertImageFile(file, editor);
          e.target.value = "";
        }}
      />

      {/* Token modal. */}
      {showTokenModal ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-[460px] rounded-xl bg-white p-6 text-[#242424] shadow-xl">
            <h2 className="text-[20px] font-bold">GitHub token</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6b6b6b]">
              Paste a GitHub fine-grained personal access token with
              read/write access to the repository contents. The token stays in
              this browser (localStorage) and is never committed or sent
              anywhere except GitHub.
            </p>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="github_pat_..."
              className="mt-4 w-full rounded-md border border-black/15 px-3 py-2 text-[14px] outline-none focus:border-black/40"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={cancelToken}
                className="rounded-full px-4 py-1.5 text-[14px] text-[#6b6b6b] hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveToken}
                disabled={!tokenInput.trim()}
                className="rounded-full bg-[#1a8917] px-4 py-1.5 text-[14px] font-medium text-white disabled:opacity-50"
              >
                Save token
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BubbleButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[15px] transition-colors ${
        active ? "text-[#4caf7d]" : "text-white hover:text-white/70"
      }`}
    >
      {children}
    </button>
  );
}
