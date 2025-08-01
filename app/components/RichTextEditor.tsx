"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
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
import { useState } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const Tiptap = () => {
  const [headingLevel, setHeadingLevel] = useState<HeadingLevel>(1);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: true, // อนุญาตให้รูปภาพอยู่ในบรรทัดเดียวกับข้อความได้
        allowBase64: true, // รองรับ base64
      }),
    ], // Tiptap Extension
    content: "<p>Hello World!</p>", // Placeholder
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[250px]",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const saveContent = async () => {
    if (editor) {
      console.log(editor.getJSON());
    }
    try {
      const response = await fetch(`/api/post`, {
        method: "POST",
        body: JSON.stringify({
          content: editor.getJSON(),
        }),
      });
    } catch (error) {}
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []); // แปลง FileList เป็น Array
    files.forEach((file) => {
      // ตรวจสอบประเภทไฟล์ (JPG หรือ PNG)
      if (file.type === "image/jpeg" || file.type === "image/png") {
        // ตรวจสอบขนาดไฟล์ (จำกัดที่ 10MB)
        if (file.size / 1024 / 1024 > 10) {
          alert("ไฟล์รูปภาพต้องมีขนาดไม่เกิน 10MB");
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string; // แปลงไฟล์เป็น base64
          editor.chain().focus().setImage({ src }).run(); // แทรกภาพใน editor
        };
        reader.readAsDataURL(file);
      } else {
        alert("กรุณาเลือกไฟล์ JPG หรือ PNG เท่านั้น");
      }
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col w-full p-2">
          <h2>Editor</h2>
          <div className="flex space-x-2 mb-2 border-2 rounded-lg">
            <div className="relative">
              <button className={`p-2`}>
                <FaHeading />
              </button>
              <select
                value={headingLevel}
                onChange={(e) => {
                  const level = Number(e.target.value) as HeadingLevel;
                  setHeadingLevel(level);
                  editor.chain().focus().toggleHeading({ level }).run();
                }}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <option key={level} value={level}>
                    H{level}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 ${
                editor.isActive("bold") ? "bg-gray-300" : ""
              } cursor-pointer`}
            >
              <FaBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 ${
                editor.isActive("italic") ? "bg-gray-300" : ""
              } cursor-pointer`}
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 ${
                editor.isActive("underline") ? "bg-gray-300" : ""
              } cursor-pointer`}
            >
              <FaUnderline />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 ${
                editor.isActive("bulletList") ? "bg-gray-300" : ""
              } cursor-pointer`}
            >
              <FaListUl />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 ${
                editor.isActive("orderedList") ? "bg-gray-300" : ""
              } cursor-pointer`}
            >
              <FaListOl />
            </button>
            {/* ปุ่มสำหรับเลือกหลายไฟล์รูปภาพ */}
            <div className="relative">
              <label htmlFor="image-upload" className="p-2 cursor-pointer">
                <FaImage />
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/png"
                multiple // อนุญาตให้เลือกหลายไฟล์
                onChange={handleImageUpload}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              />
            </div>
          </div>
          <EditorContent editor={editor} className="border rounded-lg p-2" />
        </div>
        <button onClick={saveContent} className="btn btn-outline btn-info">
          Save
        </button>
      </div>
    </>
  );
};

export default Tiptap;
