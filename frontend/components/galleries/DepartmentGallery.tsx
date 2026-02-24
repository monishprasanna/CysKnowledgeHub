import React, { useState } from 'react';
import { X } from 'lucide-react';

const PHOTOS = [
  // Unsplash images — real photos suitable for a department gallery
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505672678657-cc7037095e0f?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop',
];

const DepartmentGallery: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl p-6 bg-gradient-to-br from-cyan-900/10 to-blue-900/10 border border-cyan-500/10">
        <h1 className="text-3xl font-bold">Department Gallery</h1>
        <p className="text-gray-400 mt-1">A modern gallery showcasing department life, labs, and events.</p>
      </header>

      <section>
        <div className="prose text-gray-300 mb-4">
          <p>
            This gallery uses a modern masonry-like flow to present images in an organic layout. Click any image to open the lightbox.
          </p>
        </div>

        {/* Masonry-like responsive layout using CSS columns for a modern feel */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {PHOTOS.map((src, i) => (
            <div key={src} className="break-inside-avoid rounded-2xl overflow-hidden shadow-xl cursor-pointer" onClick={() => setOpenIdx(i)}>
              <img src={`${src}`} alt={`Department ${i + 1}`} className="w-full h-auto object-cover transition-transform transform hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {openIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
          <button className="absolute top-6 right-6 text-white p-2 rounded-full bg-gray-800/60" onClick={() => setOpenIdx(null)}>
            <X className="w-6 h-6" />
          </button>
          <img src={PHOTOS[openIdx]} alt="open" className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl object-contain" />
        </div>
      )}
    </div>
  );
};

export default DepartmentGallery;
