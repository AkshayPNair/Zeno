import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocument, updateDocument } from "../services/documentService";
import { toast } from "sonner";

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetch() {
      const doc = await getDocument(id!);
      setTitle(doc.title);
      setContent(doc.content);
    }
    fetch();
  }, [id]);

  const handleSave = async () => {
    await updateDocument(id!, content);
    toast.success("Document saved");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-3xl font-bold w-full bg-transparent mb-6 focus:outline-none"
      />

      {/* This is where Tiptap component will go later */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[600px] bg-secondary p-4 rounded-lg"
      />

      <button
        onClick={handleSave}
        className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg"
      >
        Save
      </button>
    </div>
  );
}
