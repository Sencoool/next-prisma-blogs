import Editor from "@components/RichTextEditor";

export default function NewPost() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <Editor />
    </div>
  );
}
