"use client";

import { useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline"; // Needed for underline support
import Image from "@tiptap/extension-image";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaHeading,
  FaImage,
} from "react-icons/fa";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface TiptapProps {
  onEditorReady: (editor: Editor) => void;
  initialContent?: string | object; // Optional initial content (HTML or JSON)
  minHeightPx?: number;
}

export default function Tiptap({
  onEditorReady,
  initialContent = "",
  minHeightPx = 250,
}: TiptapProps) {
  // Initialize editor instance
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose-base lg:prose-lg focus:outline-none min-h-[${minHeightPx}px]`,
      },
    },
    immediatelyRender: false,
  });

  // Notify parent once editor is mounted
  useEffect(() => {
    if (editor) onEditorReady(editor);
  }, [editor, onEditorReady]);

  // Guard render until editor is ready
  if (!editor) {
    return (
      <div className="border rounded-lg p-4 animate-pulse text-sm text-base-content/60">
        Initializing editor...
      </div>
    );
  }

  // Toggle heading (if already active = revert to paragraph)
  function applyHeading(level: HeadingLevel) {
    if (!editor) return; // guard: editor can be null on first render
    if (editor.isActive("heading", { level })) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  }

  // Image upload handler (no useCallback)
  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!editor) return; // guard: editor can be null on first render
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const errors: string[] = [];

    files.forEach((file) => {
      const isValidType =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
      if (!isValidType) {
        errors.push(`${file.name}: only JPG / PNG / WEBP allowed`);
        return;
      }
      const tooLarge = file.size / 1024 / 1024 > 10;
      if (tooLarge) {
        errors.push(`${file.name}: exceeds 10MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        editor.chain().focus().setImage({ src, alt: file.name }).run();
      };
      reader.readAsDataURL(file);
    });

    if (errors.length) {
      alert("Image upload issues:\n" + errors.join("\n"));
    }
    // Reset so the same file can be selected again
    event.target.value = "";
  }

  // Helper for toolbar buttons
  const btnClass = (active?: boolean) =>
    [
      "p-2 rounded-md hover:bg-base-300 transition-colors",
      active && "bg-base-300",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div className="flex flex-col w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-3 border rounded-lg p-2 bg-base-200">
        {/* Heading selector */}
        <div className="relative">
          <button
            type="button"
            className={btnClass(
              [1, 2, 3, 4, 5, 6].some((l) =>
                editor.isActive("heading", { level: l })
              )
            )}
            title="Heading"
          >
            <FaHeading />
          </button>
          <select
            aria-label="Heading level"
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) =>
              applyHeading(Number(e.target.value) as HeadingLevel)
            }
            defaultValue=""
          >
            <option value="" disabled>
              Choose heading
            </option>
            {[1, 2, 3, 4, 5, 6].map((l) => (
              <option key={l} value={l}>
                H{l}
              </option>
            ))}
          </select>
        </div>

        {/* Inline style buttons */}
        <button
          type="button"
          className={btnClass(editor.isActive("bold"))}
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FaBold />
        </button>
        <button
          type="button"
          className={btnClass(editor.isActive("italic"))}
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          className={btnClass(editor.isActive("underline"))}
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FaUnderline />
        </button>

        {/* Lists */}
        <button
          type="button"
          className={btnClass(editor.isActive("bulletList"))}
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          className={btnClass(editor.isActive("orderedList"))}
          title="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </button>

        {/* Image upload */}
        <div className="relative">
          <label
            htmlFor="rte-image-upload"
            className={btnClass()}
            title="Insert Image"
          >
            <FaImage />
          </label>
          <input
            id="rte-image-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageUpload}
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
          />
        </div>
      </div>

      {/* Editor content area */}
      <div className="border rounded-lg p-3 bg-base-100">
        <EditorContent editor={editor} />
      </div>

      {/* Small helper note */}
      <p className="mt-2 text-xs text-base-content/60">
        Tip: Use heading levels consistently for a better Table of Contents.
      </p>
    </div>
  );
}
