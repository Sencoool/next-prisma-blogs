"use client";
import Tiptap from "@components/RichTextEditor";
import { Editor } from "@tiptap/react";
import { useRef, useState } from "react";
import axios from "axios";

export default function NewPost() {
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null); // State to contain the editor instance
  const [title, setTitle] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null); // Ref to access the title input field
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [displayImage, setDisplayImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const image = URL.createObjectURL(files[0]);
      setCoverImage(files[0]);
      setDisplayImage(image);
    }
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    const content = editorInstance?.getJSON(); // Get the content from RTE in JSON format

    // const payload = {
    //   title,
    //   content,
    //   published,
    //   coverImage,
    // };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("coverImage", coverImage as File);
    formData.append("content", JSON.stringify(content)); // Convert content(JSON) to string
    formData.append("published", published.toString());

    // check if formData is valid
    if (!title || !content) {
      console.log("Title and content are empty");
      return;
    }

    try {
      const response = await axios.post("/api/post", formData);
      console.log("Post created successfully", response.data);
      if (response.status === 201) {
        console.log("Post created successfully", response.data);
        titleRef.current!.value = ""; // Clear the title input
        setTitle("");
        setPublished(false); // Reset published state
        setDisplayImage(null); // Reset cover image
        setCoverImage(null); // Reset file image
        editorInstance?.commands.clearContent(); // Clear the editor content
      }

      // Future: toast notification for success or error
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

      <form
        onSubmit={handleSave}
        className="flex flex-col space-y-4"
        encType="multipart/form-data"
      >
        <div className="mb-4 p-2">
          <label className="block text-sm font-medium mb-2">
            <h2>Title</h2>
          </label>
          <input
            type="text"
            name="title"
            ref={titleRef}
            className="w-full p-2 border rounded"
            placeholder="Enter post title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 p-2">
          <label className="block text-sm font-medium mb-2">
            <h2>Cover Image</h2>
          </label>
          <input
            type="file"
            name="coverImage"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleImageUpload}
            accept="image/*" // Accept only image files
            required
          />

          {coverImage && (
            <div className="w-1/2 h-1/2 p-2 border rounded mt-2">
              <img
                src={displayImage as string}
                alt="Preview"
                className="w-full object-fit h-48 rounded"
              />
            </div>
          )}
        </div>
        <Tiptap onEditorReady={setEditorInstance} />
        <div className="mb-4 p-2">
          <label className="block text-sm font-medium mb-2">
            <h2>Published</h2>
          </label>
          <input
            type="checkbox"
            name="published"
            className="checkbox border-red-500 bg-red-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800"
            onChange={(e) => setPublished(e.target.checked)}
          />
          <span className="ml-2">Publish status</span>
        </div>
        <button type="submit" className="btn btn-info">
          Create Post
        </button>
      </form>
    </div>
  );
}
