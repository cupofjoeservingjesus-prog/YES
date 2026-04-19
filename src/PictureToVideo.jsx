import React, { useState } from "react";
import { Upload, Plus, X, Play, Trash2, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";
import GeneratingOverlay from "./GeneratingOverlay";

export default function PictureToVideo() {
  const { supabase, user } = useAuth();
  const [pictures, setPictures] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("5");
  const [music, setMusic] = useState(null);
  const [transition, setTransition] = useState("fade");
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [error, setError] = useState(null);

  const handlePictureUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload image files only");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setPictures((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            name: file.name,
            src: event.target.result,
            file,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePicture = (id) => {
    setPictures((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMovePicture = (id, direction) => {
    const index = pictures.findIndex((p) => p.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === pictures.length - 1)
    ) {
      return;
    }

    const newPictures = [...pictures];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newPictures[index], newPictures[newIndex]] = [
      newPictures[newIndex],
      newPictures[index],
    ];
    setPictures(newPictures);
  };

  const handleGenerate = async () => {
    setError(null);
    if (pictures.length === 0) return setError("Please upload at least one picture");
    if (!title.trim()) return setError("Please enter a title");
    if (!user || !supabase) return setError("Please sign in");

    setGenerating(true);
    setGenStep(0);

    const stepInterval = setInterval(() => {
      setGenStep((s) => Math.min(s + 1, 5));
    }, 2000);

    try {
      // Upload pictures to Supabase storage
      const uploadedUrls = [];
      for (const picture of pictures) {
        const fileName = `${user.id}-picture-${Date.now()}-${Math.random()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from("pictures")
          .upload(fileName, picture.file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("pictures").getPublicUrl(fileName);
        uploadedUrls.push(data.publicUrl);
      }

      // Create video record in database
      const { data: video, error: dbError } = await supabase
        .from("films")
        .insert([
          {
            title,
            story: description,
            email: user.email,
            user_id: user.id,
            status: "processing",
            type: "picture_slideshow",
            pictures: uploadedUrls,
            duration: parseInt(duration),
            transition,
            music,
          },
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      // TODO: Call backend API to process pictures into video
      // For now, just redirect to video detail
      window.location.href = `/video/${video.id}`;
    } catch (err) {
      setError(err.message);
    } finally {
      clearInterval(stepInterval);
      setGenerating(false);
    }
  };

  if (generating) {
    return <GeneratingOverlay progress={(genStep / 5) * 100} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeInUp">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading tracking-tight">
          Create Video from Pictures
        </h1>
        <p className="text-muted-foreground mt-1">
          Turn your photos into a stunning video with music and transitions
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          ⚠ {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Picture Upload */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors group glass">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePictureUpload}
              className="hidden"
              id="picture-upload"
            />
            <label htmlFor="picture-upload" className="cursor-pointer block space-y-3">
              <div className="flex justify-center">
                <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">Upload your pictures</p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, or other image formats
                </p>
              </div>
            </label>
          </div>

          {/* Picture Preview Grid */}
          {pictures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-foreground">Your Pictures ({pictures.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence>
                  {pictures.map((picture, index) => (
                    <motion.div
                      key={picture.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative group"
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden glass">
                        <img
                          src={picture.src}
                          alt={picture.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleRemovePicture(picture.id)}
                            className="p-2 rounded-lg bg-destructive/20 hover:bg-destructive/40 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} className="text-destructive" />
                          </button>
                        </div>
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-black/60 text-white text-xs font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 truncate">
                        {picture.name}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Settings */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Video Title</label>
            <input
              placeholder="My amazing slideshow..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              placeholder="Tell the story behind these pictures..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Duration per Picture */}
          <div>
            <label className="block text-sm font-medium mb-2">Duration per Picture (seconds)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="3">3 seconds</option>
              <option value="5">5 seconds</option>
              <option value="7">7 seconds</option>
              <option value="10">10 seconds</option>
            </select>
          </div>

          {/* Transition */}
          <div>
            <label className="block text-sm font-medium mb-2">Transition Effect</label>
            <select
              value={transition}
              onChange={(e) => setTransition(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="zoom">Zoom</option>
              <option value="blur">Blur</option>
              <option value="spin">Spin</option>
            </select>
          </div>

          {/* Music Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Background Music</label>
            <button
              onClick={() => {
                // TODO: Open music selector modal
                alert("Music selection coming soon!");
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <Music size={16} />
              {music ? "Change Music" : "Add Music"}
            </button>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={pictures.length === 0 || !title.trim()}
            className="w-full px-4 py-3 bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Play size={16} />
            Create Video
          </button>
        </div>
      </div>

      {/* Preview */}
      {pictures.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <h3 className="font-semibold text-foreground">Preview</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Total Duration:</strong> {pictures.length * parseInt(duration)} seconds
            </p>
            <p>
              <strong>Transition:</strong> {transition.charAt(0).toUpperCase() + transition.slice(1)}
            </p>
            <p>
              <strong>Pictures:</strong> {pictures.length}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
