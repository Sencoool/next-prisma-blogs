"use client";

import { useState, useCallback, useEffect, useRef, FormEvent } from "react";
import { Editor } from "@tiptap/react";
import Tiptap from "@components/RichTextEditor";
import axios from "axios";

export default function NewPost() {
  // Editor instance (needed to extract JSON content)
  const [editor, setEditor] = useState<Editor | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  // Preview URL for selected image
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // UX states
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Ref (optional) to reset title input quickly
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  // Cleanup preview URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Handle image selection + create object URL
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setCoverImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  // Basic client-side validation
  function validate(): string | null {
    if (!title.trim()) return "Title is required.";
    if (!editor || editor.isEmpty) return "Content cannot be empty.";
    if (!coverImage) return "Cover image is required.";
    return null;
  }

  // Submit handler
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    const contentJSON = editor?.getJSON();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("published", String(published));
      formData.append("description", description.trim());
      formData.append("content", JSON.stringify(contentJSON));
      formData.append("coverImage", coverImage as File);

      const res = await axios.post("/api/post", formData);

      if (res.status === 200 || res.status === 201) {
        setSuccessMsg("Post created successfully.");
        // Reset form
        titleRef.current && (titleRef.current.value = "");
        descriptionRef.current && (descriptionRef.current.value = "");
        setTitle("");
        setPublished(false);
        setDescription("");
        setCoverImage(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        editor?.commands.clearContent();
      } else {
        setErrorMsg(`Unexpected response status: ${res.status}`);
      }
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.error || "Failed to create post. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Manual reset
  const handleReset = () => {
    titleRef.current && (titleRef.current.value = "");
    setTitle("");
    setPublished(false);
    descriptionRef.current && (descriptionRef.current.value = "");
    setDescription("");
    setCoverImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    editor?.commands.clearContent();
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg mt-10 bg-base-100 shadow-sm">
      <h1 className="text-2xl font-bold mb-6">สร้างโพสต์ใหม่</h1>

      {/* Feedback messages */}
      {errorMsg && (
        <div className="alert alert-error py-2 mb-4 text-sm">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="alert alert-success py-2 mb-4 text-sm">
          {successMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
        noValidate
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            ชื่อเรื่อง
          </label>
          <input
            ref={titleRef}
            id="title"
            type="text"
            className="input input-bordered w-full"
            placeholder="เขียนชื่อเรื่องของคุณที่นี่"
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

        {/* Cover Image */}
        <div>
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium mb-2"
          >
            รูปหน้าปก (public)
          </label>
          <input
            id="coverImage"
            type="file"
            name="coverImage"
            className="file-input file-input-bordered w-full max-w-xs"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={submitting}
            required
            autoComplete="off"
          />
          {previewUrl && (
            <div className="mt-3 border rounded-lg overflow-hidden w-full max-h-64">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            คำอธิบาย
          </label>
          <input
            ref={descriptionRef}
            id="description"
            type="text"
            className="input input-bordered w-full"
            placeholder="เขียนคำอธิบายของคุณที่นี่"
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting}
            required
            autoComplete="off"
          />
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">เนื้อหา</label>
          <Tiptap onEditorReady={setEditor} />
        </div>

        {/* Published toggle */}
        <div>
          <span className="block text-sm font-medium mb-2">เผยแพร่</span>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              disabled={submitting}
            />
            <span className="text-sm">
              {published ? "เผยแพร่หลังจากบันทึก" : "โหมดร่าง"}
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" className="btn btn-info" disabled={submitting}>
            {submitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "สร้างโพสต์"
            )}
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleReset}
            disabled={submitting}
          >
            รีเซ็ตฟอร์ม
          </button>
        </div>

        <p className="text-xs text-base-content/60">
          Tip:
          ปรับขนาดรูปภาพขนาดใหญ่ก่อนอัปโหลดเพื่อความเร็วในการโหลดที่เร็วขึ้น
        </p>
      </form>
    </div>
  );
}
