'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Copy,
  Check,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileImage,
  RefreshCw
} from 'lucide-react';

interface MediaFile {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
  extension: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<MediaFile | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch {
      showToast('Failed to load media assets', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/admin/media', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          successCount++;
        }
      } catch (e) {
        console.error('Upload error:', e);
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast(`Successfully uploaded ${successCount} media file(s)!`);
    fetchFiles();
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return;

    try {
      const res = await fetch(`/api/admin/media?name=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFiles(files.filter(f => f.name !== filename));
        showToast(`Deleted ${filename}`);
      } else {
        showToast('Failed to delete file', 'error');
      }
    } catch {
      showToast('Error deleting file', 'error');
    }
  };

  const handleCopyPath = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedPath(url);
    showToast(`Copied "${url}" to clipboard!`);
    setTimeout(() => setCopiedPath(null), 2500);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium border animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === 'success'
              ? 'bg-[#0d2a19] text-emerald-300 border-emerald-500/30'
              : 'bg-red-950 text-red-300 border-red-500/30'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
            <span>Media Library &amp; Asset Vault</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#4E9200]/20 text-[#4E9200] font-sans font-semibold border border-[#4E9200]/30">
              {files.length} Assets
            </span>
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Upload date imagery, copy image paths for products, and manage site media assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4E9200] to-[#3E7500] hover:from-[#5aa800] hover:to-[#468400] text-white text-xs font-semibold shadow-lg shadow-[#4E9200]/25 transition-all disabled:opacity-50"
          >
            {uploading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <UploadCloud size={16} />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload New Media'}</span>
          </button>
        </div>
      </div>

      {/* Drag and Drop Zone Banner */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-white/10 hover:border-[#4E9200]/50 rounded-3xl bg-[#09170f]/50 text-center cursor-pointer transition-all group"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#4E9200]/10 text-[#4E9200] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
          <UploadCloud size={24} />
        </div>
        <h3 className="text-sm font-semibold text-white">Click or Drop files to upload</h3>
        <p className="text-xs text-stone-400 mt-1">Supports PNG, JPG, WEBP, and SVG formats</p>
      </div>

      {/* Search & Refresh Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            placeholder="Search files by name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09170f] border border-white/10 text-white placeholder-stone-500 text-xs focus:outline-none focus:ring-2 focus:ring-[#4E9200]"
          />
        </div>

        <button
          onClick={fetchFiles}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-400 hover:text-white transition-all text-xs flex items-center gap-1.5"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Files Grid */}
      {loading ? (
        <div className="p-16 text-center text-stone-400 text-xs">
          <span className="animate-spin inline-block w-6 h-6 border-2 border-[#4E9200] border-t-transparent rounded-full mb-2" />
          <p>Scanning media vault...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="p-16 text-center text-stone-400 text-xs bg-[#09170f] rounded-2xl border border-white/10">
          <FileImage size={32} className="mx-auto mb-2 text-stone-600" />
          <p>No media files found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFiles.map(file => (
            <div
              key={file.name}
              className="bg-[#09170f] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#4E9200]/40 transition-all flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => setSelectedPreview(file)}
                className="relative aspect-square bg-black/40 cursor-pointer overflow-hidden flex items-center justify-center p-2"
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-xl bg-black/60 text-white text-xs flex items-center gap-1">
                    <Eye size={14} /> Preview
                  </span>
                </div>
              </div>

              {/* File Info */}
              <div className="p-3 space-y-2">
                <p className="text-xs font-semibold text-white truncate" title={file.name}>
                  {file.name}
                </p>

                <div className="flex items-center justify-between text-[10px] text-stone-400">
                  <span>{formatSize(file.size)}</span>
                  <span className="uppercase text-stone-500 font-mono">{file.extension.replace('.', '')}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
                  <button
                    onClick={() => handleCopyPath(file.url)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-[11px] font-medium transition-all flex items-center justify-center gap-1"
                    title="Copy path for products or content"
                  >
                    {copiedPath === file.url ? (
                      <>
                        <Check size={12} className="text-[#4E9200]" />
                        <span className="text-[#4E9200]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Path</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(file.name)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                    title="Delete image"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Image Preview Modal */}
      {selectedPreview && (
        <div
          onClick={() => setSelectedPreview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-[#0b1b12] border border-white/10 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-sm font-semibold text-white truncate max-w-md">{selectedPreview.name}</span>
              <button onClick={() => setSelectedPreview(null)} className="text-stone-400 hover:text-white text-xs">
                Close
              </button>
            </div>

            <div className="max-h-[60vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/50">
              <img src={selectedPreview.url} alt={selectedPreview.name} className="max-h-[55vh] object-contain" />
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <div className="space-y-0.5">
                <span className="text-stone-400 block font-mono">Path: <code className="text-[#C59B27]">{selectedPreview.url}</code></span>
                <span className="text-stone-500 text-[10px]">Size: {formatSize(selectedPreview.size)}</span>
              </div>

              <button
                onClick={() => handleCopyPath(selectedPreview.url)}
                className="px-4 py-2 rounded-xl bg-[#4E9200] text-white font-medium flex items-center gap-1.5"
              >
                <Copy size={14} />
                <span>Copy Path</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
