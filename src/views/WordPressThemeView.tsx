import React, { useState } from 'react';
import JSZip from 'jszip';
import { WP_THEME_FILES, ThemeFile } from '../data/wpThemeFiles';

export const WordPressThemeView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ThemeFile>(WP_THEME_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('ntamba-luxury-theme');

      if (folder) {
        WP_THEME_FILES.forEach((file) => {
          folder.file(file.path, file.content);
        });

        // Bundle authentic HD fruit photography and SVG brand marks directly into assets/
        const binaryAssets = [
          // Flagship Single-Farm Coffee
          { path: 'assets/images/products/1Kg Ground coffee final.jpg', url: '/images/products/1Kg Ground coffee final.jpg' },
          { path: 'assets/images/products/1kg-ground-coffee.jpg', url: '/images/products/1kg-ground-coffee.jpg' },
          { path: 'assets/images/products/1kg roasted coffee beans.png', url: '/images/products/1kg roasted coffee beans.png' },
          { path: 'assets/images/products/Ntamba Coffee Ground 500g.jpg', url: '/images/products/Ntamba Coffee Ground 500g.jpg' },
          { path: 'assets/images/products/Ntamba Coffee Ground 250g.jpg', url: '/images/products/Ntamba Coffee Ground 250g.jpg' },
          { path: 'assets/images/products/Ntamba Coffee Ground 100g.jpg', url: '/images/products/Ntamba Coffee Ground 100g.jpg' },
          { path: 'assets/images/products/Ntamba Coffee Roasted Beans 500g.jpg', url: '/images/products/Ntamba Coffee Roasted Beans 500g.jpg' },
          { path: 'assets/images/products/Ntamba Coffee Roasted Beans 250g.jpg', url: '/images/products/Ntamba Coffee Roasted Beans 250g.jpg' },
          { path: 'assets/images/products/Ntamba Coffee Roasted Beans 100g.jpg', url: '/images/products/Ntamba Coffee Roasted Beans 100g.jpg' },
          // Pure Natural Honey Photography
          { path: 'assets/images/products/Ntamba Pure Natural Honey 150g.jpg', url: '/images/products/Ntamba Pure Natural Honey 150g.jpg' },
          { path: 'assets/images/products/Ntamba Pure Natural Honey 490g.jpg', url: '/images/products/Ntamba Pure Natural Honey 490g.jpg' },
          { path: 'assets/images/products/Ntamba Honey Premium Jar 650g.jpg', url: '/images/products/Ntamba Honey Premium Jar 650g.jpg' },
          // 2048x2048 Master Studio Photography
          { path: 'assets/images/fruits/Dried pineapple slices final.jpg', url: '/images/fruits/Dried pineapple slices final.jpg' },
          { path: 'assets/images/fruits/Dried mango slices final.jpg', url: '/images/fruits/Dried mango slices final.jpg' },
          { path: 'assets/images/fruits/Dried jackfruit slices final.jpg', url: '/images/fruits/Dried jackfruit slices final.jpg' },
          { path: 'assets/images/fruits/Dried banana slices final.jpg', url: '/images/fruits/Dried banana slices final.jpg' },
          { path: 'assets/images/fruits/Dried tropical mix final.jpg', url: '/images/fruits/Dried tropical mix final.jpg' },
          { path: 'assets/images/fruits/dried-pineapple-slices.jpg', url: '/images/fruits/dried-pineapple-slices.jpg' },
          { path: 'assets/images/fruits/dried-mango-slices.jpg', url: '/images/fruits/dried-mango-slices.jpg' },
          { path: 'assets/images/fruits/dried-jackfruit-slices.jpg', url: '/images/fruits/dried-jackfruit-slices.jpg' },
          { path: 'assets/images/fruits/dried-banana-slices.jpg', url: '/images/fruits/dried-banana-slices.jpg' },
          { path: 'assets/images/fruits/tropical-dried-fruits.jpg', url: '/images/fruits/tropical-dried-fruits.jpg' },
          // Transparent PNG Fallbacks
          { path: 'assets/images/fruits/dried-pineapple-slices.png', url: '/images/fruits/dried-pineapple-slices.png' },
          { path: 'assets/images/fruits/dried-mango-slices.png', url: '/images/fruits/dried-mango-slices.png' },
          { path: 'assets/images/fruits/dried-jackfruit-slices.png', url: '/images/fruits/dried-jackfruit-slices.png' },
          { path: 'assets/images/fruits/dried-banana-slices.png', url: '/images/fruits/dried-banana-slices.png' },
          { path: 'assets/images/fruits/tropical-dried-fruits.png', url: '/images/fruits/tropical-dried-fruits.png' },
          // Vector Brand Marks
          { path: 'assets/images/ntamba-logo-horizontal.svg', url: '/images/ntamba-logo-horizontal.svg' },
          { path: 'assets/images/ntamba-logo-white.svg', url: '/images/ntamba-logo-white.svg' },
          { path: 'assets/images/ntamba-logo-stacked.svg', url: '/images/ntamba-logo-stacked.svg' },
          { path: 'assets/images/ntamba-emblem.svg', url: '/images/ntamba-emblem.svg' },
          { path: 'assets/images/background-final.png', url: '/images/background-final.png' }
        ];

        for (const asset of binaryAssets) {
          try {
            const resp = await fetch(asset.url);
            if (resp.ok) {
              const blob = await resp.blob();
              folder.file(asset.path, blob);
            }
          } catch (e) {
            console.warn('Asset bundle skipped:', asset.path, e);
          }
        }

        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ntamba-luxury-theme.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Failed to create theme zip', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 space-y-8">
      
      {/* Header & Download Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2D5A27]">
            Standalone WordPress 6.x / WooCommerce Theme Package
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#2A1E17] mt-1 mb-2">
            Ntamba Luxury Theme Generator
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Ready to download, install, and activate directly on any WordPress host. 100% self-contained with custom post types, volume pricing toggles, glassmorphism B2B RFQ, and theme customizer controls without requiring external page builder plugins.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#2A1E17] bg-[#D4A017] hover:bg-[#b88910] hover:text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isZipping ? (
              <>
                <span className="animate-spin text-base">⚙️</span>
                <span>Generating Theme .ZIP...</span>
              </>
            ) : (
              <>
                <span>📦</span>
                <span>Download Theme (.zip)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Browser & Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: File Tree */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 shadow-sm p-4 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 px-3 py-2 block">
            Theme Architecture Files ({WP_THEME_FILES.length})
          </span>

          <div className="space-y-1 font-mono text-xs">
            {WP_THEME_FILES.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                  selectedFile.path === file.path
                    ? 'bg-[#2A1E17] text-amber-300 font-bold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-stone-400 text-[11px]">
                    {file.language === 'php' ? '🐘' : file.language === 'css' ? '🎨' : '📄'}
                  </span>
                  <span className="truncate">{file.path}</span>
                </div>
                <span className="text-[10px] uppercase opacity-60 ml-2">{file.language}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 p-3 bg-stone-50 rounded-xl text-[11px] text-stone-600 space-y-1 font-sans">
            <span className="font-bold text-[#2A1E17] block">Zero-Plugin Guarantee:</span>
            <p>• Native Customizer for EUDR and WhatsApp hotlines</p>
            <p>• Custom Post Types: `harvest_batch` and `cupping_review`</p>
            <p>• REST API endpoints: `/wp-json/ntamba/v1/catalog`</p>
          </div>
        </div>

        {/* Right: Code Viewer */}
        <div className="lg:col-span-8 bg-[#181411] text-stone-200 rounded-2xl border border-stone-800 shadow-xl overflow-hidden flex flex-col">
          
          {/* File Tab Header */}
          <div className="bg-[#241D18] px-6 py-3.5 border-b border-stone-800 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-amber-400">
                {selectedFile.path}
              </span>
              <p className="text-[11px] text-stone-400 font-sans mt-0.5">
                {selectedFile.description}
              </p>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-300 transition-colors flex items-center gap-1.5"
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? 'Copied!' : 'Copy File'}</span>
            </button>
          </div>

          {/* Syntax Highlighted Code Box */}
          <div className="p-6 font-mono text-xs leading-relaxed overflow-x-auto max-h-[640px] overflow-y-auto">
            <pre className="text-amber-100/90 whitespace-pre">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>

      </div>

      {/* Installation Instructions */}
      <div className="bg-white p-8 rounded-3xl border border-stone-200 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-[#2A1E17]">
          WordPress Installation & Activation Walkthrough
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 leading-relaxed">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <span className="font-mono font-bold text-base text-[#D4A017] block">Step 01</span>
            <h3 className="font-bold text-stone-900 text-sm">Download Theme Archive</h3>
            <p>Click the gold <strong>"Download Theme (.zip)"</strong> button above to download the compiled `ntamba-luxury-theme.zip` package.</p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <span className="font-mono font-bold text-base text-[#D4A017] block">Step 02</span>
            <h3 className="font-bold text-stone-900 text-sm">Upload to WordPress</h3>
            <p>In your WP Admin dashboard, navigate to <strong>Appearance &gt; Themes &gt; Add New &gt; Upload Theme</strong>. Select the downloaded `.zip` file.</p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <span className="font-mono font-bold text-base text-[#D4A017] block">Step 03</span>
            <h3 className="font-bold text-stone-900 text-sm">Activate & Connect</h3>
            <p>Click <strong>Activate</strong>. The theme automatically registers Custom Post Types, activates volume carton pricing, and exposes custom REST API endpoints.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
