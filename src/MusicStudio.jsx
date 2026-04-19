import React, { useState } from "react";
import { Music, Upload, Play, Plus, X, Sparkles, Heart, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Pre-made music templates
const MUSIC_TEMPLATES = [
  {
    id: "cinematic-epic",
    name: "Cinematic Epic",
    category: "cinematic",
    duration: "3:45",
    mood: "Dramatic, powerful",
    preview: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
    icon: "🎬",
  },
  {
    id: "ambient-calm",
    name: "Ambient Calm",
    category: "ambient",
    duration: "4:20",
    mood: "Peaceful, relaxing",
    preview: "https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3",
    icon: "🌊",
  },
  {
    id: "upbeat-energy",
    name: "Upbeat Energy",
    category: "upbeat",
    duration: "2:50",
    mood: "Fun, energetic",
    preview: "https://assets.mixkit.co/active_storage/sfx/2871/2871-preview.mp3",
    icon: "⚡",
  },
  {
    id: "lo-fi-beats",
    name: "Lo-Fi Beats",
    category: "lofi",
    duration: "3:15",
    mood: "Chill, focused",
    preview: "https://assets.mixkit.co/active_storage/sfx/2872/2872-preview.mp3",
    icon: "🎧",
  },
  {
    id: "trap-modern",
    name: "Trap Modern",
    category: "trap",
    duration: "2:30",
    mood: "Urban, modern",
    preview: "https://assets.mixkit.co/active_storage/sfx/2873/2873-preview.mp3",
    icon: "🔥",
  },
  {
    id: "orchestral-grand",
    name: "Orchestral Grand",
    category: "orchestral",
    duration: "4:00",
    mood: "Majestic, grand",
    preview: "https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3",
    icon: "🎻",
  },
];

// Religious/Spiritual templates
const RELIGIOUS_TEMPLATES = [
  {
    id: "gospel-worship",
    name: "Gospel Worship",
    category: "gospel",
    duration: "3:30",
    mood: "Uplifting, spiritual",
    preview: "https://assets.mixkit.co/active_storage/sfx/2875/2875-preview.mp3",
    icon: "🙏",
  },
  {
    id: "hymn-traditional",
    name: "Hymn Traditional",
    category: "hymn",
    duration: "4:15",
    mood: "Classic, reverent",
    preview: "https://assets.mixkit.co/active_storage/sfx/2876/2876-preview.mp3",
    icon: "✨",
  },
  {
    id: "praise-modern",
    name: "Praise Modern",
    category: "praise",
    duration: "3:00",
    mood: "Contemporary, joyful",
    preview: "https://assets.mixkit.co/active_storage/sfx/2877/2877-preview.mp3",
    icon: "🎵",
  },
  {
    id: "meditation-peace",
    name: "Meditation Peace",
    category: "meditation",
    duration: "5:00",
    mood: "Calming, meditative",
    preview: "https://assets.mixkit.co/active_storage/sfx/2878/2878-preview.mp3",
    icon: "☮️",
  },
];

// CapCut-style templates
const CAPCUT_TEMPLATES = [
  {
    id: "transition-smooth",
    name: "Smooth Transition",
    category: "transition",
    type: "Transition Effect",
    icon: "✨",
  },
  {
    id: "zoom-dynamic",
    name: "Dynamic Zoom",
    category: "zoom",
    type: "Zoom Effect",
    icon: "🔍",
  },
  {
    id: "blur-focus",
    name: "Blur Focus",
    category: "blur",
    type: "Focus Effect",
    icon: "👁️",
  },
  {
    id: "color-grade-cinematic",
    name: "Cinematic Color",
    category: "color",
    type: "Color Grade",
    icon: "🎨",
  },
  {
    id: "text-bounce",
    name: "Bouncy Text",
    category: "text",
    type: "Text Animation",
    icon: "📝",
  },
  {
    id: "sticker-fun",
    name: "Fun Stickers",
    category: "sticker",
    type: "Sticker Pack",
    icon: "🎭",
  },
];

function MusicCard({ template, isSelected, onSelect, onPreview }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(template)}
      className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
        isSelected
          ? "ring-2 ring-primary bg-primary/10 border-primary/50"
          : "glass hover:border-primary/30"
      }`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full -top-16 -left-16" />
      </div>

      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between">
          <div className="text-3xl">{template.icon}</div>
          {isSelected && (
            <div className="p-1.5 rounded-full bg-primary">
              <Zap size={14} className="text-white" />
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-foreground text-sm">{template.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{template.mood || template.type}</p>
        </div>

        {template.duration && (
          <p className="text-xs text-muted-foreground">{template.duration}</p>
        )}

        {template.preview && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template);
            }}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <Play size={12} />
            Preview
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function MusicStudio({ onSelectMusic, selectedMusic }) {
  const [tab, setTab] = useState("templates");
  const [uploadedMusic, setUploadedMusic] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewingTrack, setPreviewingTrack] = useState(null);
  const [audioRef] = useState(React.createRef());

  const handleMusicUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newMusic = {
          id: `custom-${Date.now()}`,
          name: file.name,
          category: "custom",
          duration: "Unknown",
          mood: "Custom upload",
          preview: event.target.result,
          icon: "🎵",
          file,
        };
        setUploadedMusic((prev) => [...prev, newMusic]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSelectMusic = (music) => {
    setSelectedTemplate(music);
    onSelectMusic?.(music);
  };

  const handleRemoveMusic = (id) => {
    setUploadedMusic((prev) => prev.filter((m) => m.id !== id));
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-heading tracking-tight flex items-center gap-2">
          <Music size={24} className="text-primary" />
          Music & Effects Studio
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add music, templates, and effects to your videos
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl overflow-x-auto">
        {[
          { id: "templates", label: "Music Templates", icon: "🎵" },
          { id: "religious", label: "Religious", icon: "🙏" },
          { id: "effects", label: "CapCut Effects", icon: "✨" },
          { id: "uploaded", label: "My Music", icon: "📤" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              tab === t.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Music Templates */}
      {tab === "templates" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {MUSIC_TEMPLATES.map((template) => (
            <MusicCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate?.id === template.id}
              onSelect={handleSelectMusic}
              onPreview={(t) => setPreviewingTrack(t)}
            />
          ))}
        </motion.div>
      )}

      {/* Religious Templates */}
      {tab === "religious" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {RELIGIOUS_TEMPLATES.map((template) => (
            <MusicCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate?.id === template.id}
              onSelect={handleSelectMusic}
              onPreview={(t) => setPreviewingTrack(t)}
            />
          ))}
        </motion.div>
      )}

      {/* CapCut Effects */}
      {tab === "effects" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {CAPCUT_TEMPLATES.map((template) => (
            <MusicCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate?.id === template.id}
              onSelect={handleSelectMusic}
              onPreview={() => {}}
            />
          ))}
        </motion.div>
      )}

      {/* Uploaded Music */}
      {tab === "uploaded" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors group">
            <input
              type="file"
              accept="audio/*"
              multiple
              onChange={handleMusicUpload}
              className="hidden"
              id="music-upload"
            />
            <label
              htmlFor="music-upload"
              className="cursor-pointer block space-y-3"
            >
              <div className="flex justify-center">
                <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">Upload your music</p>
                <p className="text-xs text-muted-foreground mt-1">
                  MP3, WAV, or other audio formats
                </p>
              </div>
            </label>
          </div>

          {/* Uploaded Files */}
          {uploadedMusic.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedMusic.map((music) => (
                <div
                  key={music.id}
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
                    selectedTemplate?.id === music.id
                      ? "ring-2 ring-primary bg-primary/10 border-primary/50"
                      : "glass hover:border-primary/30"
                  }`}
                  onClick={() => handleSelectMusic(music)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="text-3xl">🎵</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveMusic(music.id);
                        }}
                        className="p-1 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors"
                      >
                        <X size={14} className="text-destructive" />
                      </button>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground text-sm truncate">
                        {music.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">Custom</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {uploadedMusic.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Music size={32} className="mx-auto mb-3 opacity-50" />
              <p>No music uploaded yet</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Selected Music Display */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl glass border-primary/30 border-2 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{selectedTemplate.icon}</div>
              <div>
                <p className="font-semibold text-foreground">
                  {selectedTemplate.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedTemplate.mood || selectedTemplate.type}
                </p>
              </div>
            </div>
            <Heart size={20} className="text-primary fill-primary" />
          </div>
        </motion.div>
      )}

      {/* Audio Preview Player */}
      {previewingTrack && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl glass space-y-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Preview: {previewingTrack.name}
            </p>
            <button
              onClick={() => setPreviewingTrack(null)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <audio
            ref={audioRef}
            src={previewingTrack.preview}
            controls
            className="w-full h-8 rounded-lg"
            autoPlay
          />
        </motion.div>
      )}
    </div>
  );
}
