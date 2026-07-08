"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckSquare,
  Code2,
  Copy,
  Heading2,
  ImageIcon,
  List,
  ListOrdered,
  Pilcrow,
  Plus,
  Quote,
  Trash2,
} from "lucide-react";

type BlockType = "heading" | "paragraph" | "bullet-list" | "numbered-list" | "checklist" | "quote" | "image" | "raw";

type ChecklistItem = {
  text: string;
  checked: boolean;
};

type MarkdownBlock = {
  id: string;
  type: BlockType;
  level?: 1 | 2 | 3;
  text?: string;
  items?: string[];
  checklistItems?: ChecklistItem[];
  alt?: string;
  src?: string;
};

type MarkdownBlockEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const blockButtonClass =
  "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted";
const iconButtonClass =
  "inline-flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40";
const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const textareaClass =
  "min-h-24 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm leading-6 text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createBlock(type: BlockType): MarkdownBlock {
  if (type === "heading") return { id: createId(), type, level: 2, text: "" };
  if (type === "bullet-list" || type === "numbered-list") return { id: createId(), type, items: [""] };
  if (type === "checklist") return { id: createId(), type, checklistItems: [{ text: "", checked: false }] };
  if (type === "image") return { id: createId(), type, alt: "", src: "" };
  return { id: createId(), type, text: "" };
}

function isHeading(line: string): boolean {
  return /^#{1,3}\s+/.test(line.trim());
}

function isImage(line: string): boolean {
  return /^!\[[^\]]*\]\([^)]+\)$/.test(line.trim());
}

function isChecklist(line: string): boolean {
  return /^[-*]\s+\[[ xX]\]\s+/.test(line.trim());
}

function isBullet(line: string): boolean {
  return /^[-*]\s+/.test(line.trim()) && !isChecklist(line);
}

function isNumbered(line: string): boolean {
  return /^\d+\.\s+/.test(line.trim());
}

function isQuote(line: string): boolean {
  return /^>\s?/.test(line.trim());
}

function isFence(line: string): boolean {
  return /^(```|~~~)/.test(line.trim());
}

function isTableStart(lines: string[], index: number): boolean {
  const current = lines[index]?.trim() ?? "";
  const next = lines[index + 1]?.trim() ?? "";
  return current.includes("|") && /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(next);
}

function isMdxOrHtmlStart(line: string): boolean {
  const trimmed = line.trim();
  return /^<[A-Z][\w.:-]*(\s|>|\/)/.test(trimmed) || /^<\/?[a-z][\w:-]*(\s|>|\/)/.test(trimmed) || trimmed.startsWith("{");
}

function startsKnownBlock(line: string): boolean {
  return isHeading(line) || isImage(line) || isChecklist(line) || isBullet(line) || isNumbered(line) || isQuote(line) || isFence(line) || isMdxOrHtmlStart(line);
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (isFence(line)) {
      const fence = trimmed.slice(0, 3);
      const rawLines = [line];
      index += 1;
      while (index < lines.length) {
        rawLines.push(lines[index] ?? "");
        if ((lines[index] ?? "").trim().startsWith(fence)) {
          index += 1;
          break;
        }
        index += 1;
      }
      blocks.push({ id: createId(), type: "raw", text: rawLines.join("\n") });
      continue;
    }

    if (isTableStart(lines, index)) {
      const rawLines: string[] = [];
      while (index < lines.length && (lines[index] ?? "").includes("|")) {
        rawLines.push(lines[index] ?? "");
        index += 1;
      }
      blocks.push({ id: createId(), type: "raw", text: rawLines.join("\n") });
      continue;
    }

    if (isMdxOrHtmlStart(line)) {
      const rawLines: string[] = [];
      while (index < lines.length && (lines[index] ?? "").trim()) {
        rawLines.push(lines[index] ?? "");
        index += 1;
      }
      blocks.push({ id: createId(), type: "raw", text: rawLines.join("\n") });
      continue;
    }

    if (isHeading(line)) {
      const match = trimmed.match(/^(#{1,3})\s+(.+)$/);
      blocks.push({
        id: createId(),
        type: "heading",
        level: Math.min(match?.[1].length ?? 2, 3) as 1 | 2 | 3,
        text: match?.[2] ?? "",
      });
      index += 1;
      continue;
    }

    if (isImage(line)) {
      const match = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      blocks.push({ id: createId(), type: "image", alt: match?.[1] ?? "", src: match?.[2] ?? "" });
      index += 1;
      continue;
    }

    if (isChecklist(line)) {
      const checklistItems: ChecklistItem[] = [];
      while (index < lines.length && isChecklist(lines[index] ?? "")) {
        const item = (lines[index] ?? "").trim().match(/^[-*]\s+\[([ xX])\]\s+(.+)$/);
        checklistItems.push({ checked: item?.[1].toLowerCase() === "x", text: item?.[2] ?? "" });
        index += 1;
      }
      blocks.push({ id: createId(), type: "checklist", checklistItems: checklistItems.length ? checklistItems : [{ text: "", checked: false }] });
      continue;
    }

    if (isBullet(line)) {
      const items: string[] = [];
      while (index < lines.length && isBullet(lines[index] ?? "")) {
        items.push((lines[index] ?? "").trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push({ id: createId(), type: "bullet-list", items: items.length ? items : [""] });
      continue;
    }

    if (isNumbered(line)) {
      const items: string[] = [];
      while (index < lines.length && isNumbered(lines[index] ?? "")) {
        items.push((lines[index] ?? "").trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push({ id: createId(), type: "numbered-list", items: items.length ? items : [""] });
      continue;
    }

    if (isQuote(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && isQuote(lines[index] ?? "")) {
        quoteLines.push((lines[index] ?? "").trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ id: createId(), type: "quote", text: quoteLines.join("\n") });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const current = lines[index] ?? "";
      if (!current.trim()) break;
      if (paragraphLines.length > 0 && startsKnownBlock(current)) break;
      paragraphLines.push(current.trim());
      index += 1;
    }
    blocks.push({ id: createId(), type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks.length ? blocks : [createBlock("paragraph")];
}

function serializeBlock(block: MarkdownBlock): string {
  if (block.type === "heading") {
    const level = block.level ?? 2;
    return `${"#".repeat(level)} ${(block.text ?? "").trim()}`.trim();
  }

  if (block.type === "bullet-list") {
    return (block.items ?? [""])
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => `- ${item}`)
      .join("\n");
  }

  if (block.type === "numbered-list") {
    return (block.items ?? [""])
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item, index) => `${index + 1}. ${item}`)
      .join("\n");
  }

  if (block.type === "checklist") {
    return (block.checklistItems ?? [])
      .map((item) => ({ ...item, text: item.text.trim() }))
      .filter((item) => item.text)
      .map((item) => `- [${item.checked ? "x" : " "}] ${item.text}`)
      .join("\n");
  }

  if (block.type === "quote") {
    return (block.text ?? "")
      .split("\n")
      .map((line) => `> ${line.trim()}`)
      .join("\n")
      .trim();
  }

  if (block.type === "image") {
    const src = (block.src ?? "").trim();
    if (!src) return "";
    return `![${(block.alt ?? "").trim()}](${src})`;
  }

  return (block.text ?? "").trim();
}

function serializeBlocks(blocks: MarkdownBlock[]): string {
  return blocks.map(serializeBlock).filter(Boolean).join("\n\n").trim();
}

function blockName(type: BlockType): string {
  if (type === "bullet-list") return "Bullet list";
  if (type === "numbered-list") return "Numbered list";
  if (type === "raw") return "Markdown";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function MarkdownBlockEditor({ label, value, onChange }: MarkdownBlockEditorProps) {
  const [blocks, setBlocks] = useState<MarkdownBlock[]>(() => parseMarkdown(value));
  const lastSerializedRef = useRef(value);

  useEffect(() => {
    if (value !== lastSerializedRef.current) {
      setBlocks(parseMarkdown(value));
      lastSerializedRef.current = value;
    }
  }, [value]);

  function commit(nextBlocks: MarkdownBlock[]) {
    setBlocks(nextBlocks);
    const markdown = serializeBlocks(nextBlocks);
    lastSerializedRef.current = markdown;
    onChange(markdown);
  }

  function updateBlock(id: string, patch: Partial<MarkdownBlock>) {
    commit(blocks.map((block) => (block.id === id ? { ...block, ...patch } : block)));
  }

  function changeBlockType(id: string, type: BlockType) {
    commit(
      blocks.map((block) => {
        if (block.id !== id) return block;
        const next = createBlock(type);
        return { ...next, id: block.id, text: block.text ?? "" };
      }),
    );
  }

  function addBlock(type: BlockType, afterId?: string) {
    const nextBlock = createBlock(type);
    if (!afterId) {
      commit([...blocks, nextBlock]);
      return;
    }

    const index = blocks.findIndex((block) => block.id === afterId);
    const nextBlocks = [...blocks];
    nextBlocks.splice(index + 1, 0, nextBlock);
    commit(nextBlocks);
  }

  function removeBlock(id: string) {
    const nextBlocks = blocks.filter((block) => block.id !== id);
    commit(nextBlocks.length ? nextBlocks : [createBlock("paragraph")]);
  }

  function moveBlock(id: string, direction: -1 | 1) {
    const index = blocks.findIndex((block) => block.id === id);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= blocks.length) return;
    const nextBlocks = [...blocks];
    const [block] = nextBlocks.splice(index, 1);
    nextBlocks.splice(nextIndex, 0, block);
    commit(nextBlocks);
  }

  function duplicateBlock(id: string) {
    const index = blocks.findIndex((block) => block.id === id);
    if (index < 0) return;
    const copy = { ...blocks[index], id: createId() };
    const nextBlocks = [...blocks];
    nextBlocks.splice(index + 1, 0, copy);
    commit(nextBlocks);
  }

  function updateListItem(blockId: string, itemIndex: number, text: string) {
    const block = blocks.find((current) => current.id === blockId);
    if (!block) return;
    const items = [...(block.items ?? [])];
    items[itemIndex] = text;
    updateBlock(blockId, { items });
  }

  function addListItem(blockId: string) {
    const block = blocks.find((current) => current.id === blockId);
    updateBlock(blockId, { items: [...(block?.items ?? []), ""] });
  }

  function removeListItem(blockId: string, itemIndex: number) {
    const block = blocks.find((current) => current.id === blockId);
    const items = (block?.items ?? []).filter((_, index) => index !== itemIndex);
    updateBlock(blockId, { items: items.length ? items : [""] });
  }

  function updateChecklistItem(blockId: string, itemIndex: number, patch: Partial<ChecklistItem>) {
    const block = blocks.find((current) => current.id === blockId);
    if (!block) return;
    const checklistItems = [...(block.checklistItems ?? [])];
    checklistItems[itemIndex] = { ...checklistItems[itemIndex], ...patch };
    updateBlock(blockId, { checklistItems });
  }

  function addChecklistItem(blockId: string) {
    const block = blocks.find((current) => current.id === blockId);
    updateBlock(blockId, { checklistItems: [...(block?.checklistItems ?? []), { text: "", checked: false }] });
  }

  function removeChecklistItem(blockId: string, itemIndex: number) {
    const block = blocks.find((current) => current.id === blockId);
    const checklistItems = (block?.checklistItems ?? []).filter((_, index) => index !== itemIndex);
    updateBlock(blockId, { checklistItems: checklistItems.length ? checklistItems : [{ text: "", checked: false }] });
  }

  function replaceFromMarkdown(markdown: string) {
    const nextBlocks = parseMarkdown(markdown);
    setBlocks(nextBlocks);
    lastSerializedRef.current = markdown;
    onChange(markdown);
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 rounded-md border border-border bg-background p-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Write visually. The page still saves as Markdown for publishing.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => addBlock("heading")} className={blockButtonClass}><Heading2 aria-hidden="true" className="size-4" />Heading</button>
            <button type="button" onClick={() => addBlock("paragraph")} className={blockButtonClass}><Pilcrow aria-hidden="true" className="size-4" />Text</button>
            <button type="button" onClick={() => addBlock("bullet-list")} className={blockButtonClass}><List aria-hidden="true" className="size-4" />Bullets</button>
            <button type="button" onClick={() => addBlock("numbered-list")} className={blockButtonClass}><ListOrdered aria-hidden="true" className="size-4" />Steps</button>
            <button type="button" onClick={() => addBlock("checklist")} className={blockButtonClass}><CheckSquare aria-hidden="true" className="size-4" />Checklist</button>
            <button type="button" onClick={() => addBlock("quote")} className={blockButtonClass}><Quote aria-hidden="true" className="size-4" />Quote</button>
            <button type="button" onClick={() => addBlock("image")} className={blockButtonClass}><ImageIcon aria-hidden="true" className="size-4" />Image</button>
            <button type="button" onClick={() => addBlock("raw")} className={blockButtonClass}><Code2 aria-hidden="true" className="size-4" />Markdown</button>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {blocks.map((block, index) => (
          <article key={block.id} className="rounded-md border border-border bg-background p-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <select
                  value={block.type}
                  onChange={(event) => changeBlockType(block.id, event.target.value as BlockType)}
                  className="h-8 rounded-md border border-border bg-surface px-2 text-xs font-semibold text-foreground outline-none ring-ring focus:ring-2"
                  aria-label="Block type"
                >
                  <option value="heading">Heading</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="bullet-list">Bullet list</option>
                  <option value="numbered-list">Numbered list</option>
                  <option value="checklist">Checklist</option>
                  <option value="quote">Quote</option>
                  <option value="image">Image</option>
                  <option value="raw">Markdown</option>
                </select>
                <span className="text-xs text-muted-foreground">Block {index + 1}: {blockName(block.type)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => moveBlock(block.id, -1)} disabled={index === 0} className={iconButtonClass} aria-label="Move block up"><ArrowUp aria-hidden="true" className="size-4" /></button>
                <button type="button" onClick={() => moveBlock(block.id, 1)} disabled={index === blocks.length - 1} className={iconButtonClass} aria-label="Move block down"><ArrowDown aria-hidden="true" className="size-4" /></button>
                <button type="button" onClick={() => duplicateBlock(block.id)} className={iconButtonClass} aria-label="Duplicate block"><Copy aria-hidden="true" className="size-4" /></button>
                <button type="button" onClick={() => addBlock("paragraph", block.id)} className={iconButtonClass} aria-label="Add text block below"><Plus aria-hidden="true" className="size-4" /></button>
                <button type="button" onClick={() => removeBlock(block.id)} className={iconButtonClass} aria-label="Delete block"><Trash2 aria-hidden="true" className="size-4" /></button>
              </div>
            </div>

            <div className="mt-3 grid gap-3">
              {block.type === "heading" ? (
                <div className="grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)]">
                  <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
                    Level
                    <select
                      value={block.level ?? 2}
                      onChange={(event) => updateBlock(block.id, { level: Number(event.target.value) as 1 | 2 | 3 })}
                      className={inputClass}
                    >
                      <option value={1}>H1</option>
                      <option value={2}>H2</option>
                      <option value={3}>H3</option>
                    </select>
                  </label>
                  <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
                    Heading text
                    <input value={block.text ?? ""} onChange={(event) => updateBlock(block.id, { text: event.target.value })} className={inputClass} placeholder="Section heading" />
                  </label>
                </div>
              ) : null}

              {block.type === "paragraph" ? (
                <textarea value={block.text ?? ""} onChange={(event) => updateBlock(block.id, { text: event.target.value })} className={textareaClass} placeholder="Write a paragraph..." />
              ) : null}

              {block.type === "quote" ? (
                <textarea value={block.text ?? ""} onChange={(event) => updateBlock(block.id, { text: event.target.value })} className={textareaClass} placeholder="Add a quote, note, or callout..." />
              ) : null}

              {block.type === "raw" ? (
                <textarea value={block.text ?? ""} onChange={(event) => updateBlock(block.id, { text: event.target.value })} className={`${textareaClass} font-mono text-xs`} placeholder="Paste custom Markdown, a table, code block, or MDX here..." spellCheck={false} />
              ) : null}

              {block.type === "image" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
                    Image path or URL
                    <input value={block.src ?? ""} onChange={(event) => updateBlock(block.id, { src: event.target.value })} className={inputClass} placeholder="/images/blog/example.jpg" />
                  </label>
                  <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
                    Alt text
                    <input value={block.alt ?? ""} onChange={(event) => updateBlock(block.id, { alt: event.target.value })} className={inputClass} placeholder="Describe the image" />
                  </label>
                </div>
              ) : null}

              {block.type === "bullet-list" || block.type === "numbered-list" ? (
                <div className="grid gap-2">
                  {(block.items ?? [""]).map((item, itemIndex) => (
                    <div key={`${block.id}-${itemIndex}`} className="grid grid-cols-[1fr_auto] gap-2">
                      <input value={item} onChange={(event) => updateListItem(block.id, itemIndex, event.target.value)} className={inputClass} placeholder={`List item ${itemIndex + 1}`} />
                      <button type="button" onClick={() => removeListItem(block.id, itemIndex)} className={iconButtonClass} aria-label="Remove list item"><Trash2 aria-hidden="true" className="size-4" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addListItem(block.id)} className="w-fit text-xs font-semibold text-primary hover:underline">Add list item</button>
                </div>
              ) : null}

              {block.type === "checklist" ? (
                <div className="grid gap-2">
                  {(block.checklistItems ?? [{ text: "", checked: false }]).map((item, itemIndex) => (
                    <div key={`${block.id}-${itemIndex}`} className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                      <input type="checkbox" checked={item.checked} onChange={(event) => updateChecklistItem(block.id, itemIndex, { checked: event.target.checked })} className="size-4 accent-primary" aria-label={`Checklist item ${itemIndex + 1} checked`} />
                      <input value={item.text} onChange={(event) => updateChecklistItem(block.id, itemIndex, { text: event.target.value })} className={inputClass} placeholder={`Checklist item ${itemIndex + 1}`} />
                      <button type="button" onClick={() => removeChecklistItem(block.id, itemIndex)} className={iconButtonClass} aria-label="Remove checklist item"><Trash2 aria-hidden="true" className="size-4" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addChecklistItem(block.id)} className="w-fit text-xs font-semibold text-primary hover:underline">Add checklist item</button>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <details className="rounded-md border border-border bg-background p-3">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-foreground">
          <Code2 aria-hidden="true" className="size-4" /> Markdown source
        </summary>
        <textarea
          value={value}
          onChange={(event) => replaceFromMarkdown(event.target.value)}
          className={`${textareaClass} mt-3 min-h-64 font-mono text-xs`}
          spellCheck={false}
        />
      </details>
    </div>
  );
}
