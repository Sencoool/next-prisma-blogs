import Editor from "@components/RichTextEditor";

export default function NewPost() {
  // จริงๆ การเซฟข้อมูลควรจะทำบนหน้านี้ เพราะต้องเพิ่ม title แล้วทำ react-hook-form ด้วย
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <Editor />
    </div>
  );
}
