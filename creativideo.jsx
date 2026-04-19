import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import GeneratingOverlay from "./GeneratingOverlay";
import { Sparkles, Upload, Wand2 } from "lucide-react";

const SURPRISE_PROMPTS = [
  "A cinematic aerial journey over snow mountains at sunrise",
  "A luxury product reveal with dramatic lighting and macro shots",
  "A startup story from garage to global success",
  "A neon-lit cyberpunk city at night",
  "A peaceful ocean meditation scene with soft waves",
];

export default function CreateVideo() {
  const navigate = useNavigate();
  const { supabase, user } = useAuth();

  const [tab, setTab] = useState("ai");
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [error, setError] = useState(null);

  const handleSurprise = () => {
    const random = SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)];
    setPrompt(random);
  };

  const handleGenerate = async () => {
    setError(null);
    if (!prompt.trim()) return setError("Please enter a prompt");
    if (!user || !supabase) return setError("Please sign in to generate videos");

    setGenerating(true);
    setGenStep(0);

    const stepInterval = setInterval(() => {
      setGenStep((s) => Math.min(s + 1, 5));
    }, 2000);

    try {
      const session = await supabase.auth.getSession();
      const token = session?.data?.session?.access_token;

      const res = await fetch("/api/submit-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({
          email: user.email,
          story: prompt,
          voice: "james",
          style: "cinematic",
          duration: "30s",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Generation failed");
      navigate(`/video/${data.filmId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      clearInterval(stepInterval);
      setGenerating(false);
    }
  };

  const handleUpload = async () => {
    setError(null);
    if (!uploadFile) return setError("Please select a file");
    if (!uploadTitle.trim()) return setError("Please add a title");
    if (!user || !supabase) return setError("Please sign in to upload");

    try {
      const ext = uploadFile.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("videos-regular")
        .upload(fileName, uploadFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("videos-regular").getPublicUrl(fileName);

      const { data: film, error: dbError } = await supabase
        .from("films")
        .insert([{
          title: uploadTitle,
          story: uploadTitle,
          email: user.email,
          user_id: user.id,
          status: "completed",
          type: "uploaded",
          video_url: data.publicUrl,
        }])
        .select()
        .single();

      if (dbError) throw dbError;
      navigate(`/video/${film.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (generating) {
    return <GeneratingOverlay progress={(genStep / 5) * 100} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Create Video</h1>
        <p className="text-muted-foreground mt-1">AI generation or upload your own footage</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          ⚠ {error}
        </div>
      )}

      <div className="flex gap-2 p-1 bg-secondary rounded-xl">
        <button
          onClick={() => setTab("ai")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "ai" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Wand2 size={15} />
          AI Generate
        </button>
        <button
          onClick={() => setTab("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload size={15} />
          Upload
        </button>
      </div>

      {tab === "ai" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title (optional)</label>
            <input
              placeholder="My awesome video..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Prompt</label>
            <textarea
              placeholder="Describe your video in detail..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSurprise}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-secondary text-sm font-medium hover:bg-muted transition-colors"
            >
              <Sparkles size={14} />
              Surprise me
            </button>
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 size={15} />
              Generate Video
            </button>
          </div>
        </div>
      )}

      {tab === "upload" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title</label>
            <input
              placeholder="My uploaded video..."
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Video File</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
              <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-3">
                {uploadFile ? uploadFile.name : "Click to select or drag and drop"}
              </p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="px-4 py-2 bg-secondary text-sm font-medium rounded-lg cursor-pointer hover:bg-muted transition-colors">
                Browse Files
              </label>
            </div>
          </div>
          <button
            onClick={handleUpload}
            disabled={!uploadFile || !uploadTitle.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={15} />
            Upload Video
          </button>
        </div>
      )}
    </div>
  );
}
