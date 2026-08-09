import React, { useState } from 'react';
import { BOOTSTRAP_JQUERY_FULL_HTML } from '../data/bootstrapTemplateData';
import { Layout, Copy, Check, Eye, Code, ExternalLink } from 'lucide-react';

export const BootstrapFrontendViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BOOTSTRAP_JQUERY_FULL_HTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phần 4: Bootstrap 5 + jQuery Client Implementation</h3>
              <h2 className="text-xl font-light text-white">Giao diện Frontend Độc lập &amp; Event Handling</h2>
            </div>
          </div>

          {/* Toggle View Mode */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'preview' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem Live Demo</span>
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'code' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Xem Code HTML/JS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'preview' ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-slate-400 font-mono ml-2">https://localhost:3000/quiz-bootstrap-jquery.html</span>
            </div>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
              Bootstrap 5 + jQuery CDN
            </span>
          </div>

          <div className="w-full h-[650px] bg-white">
            <iframe
              srcDoc={BOOTSTRAP_JQUERY_FULL_HTML}
              title="Bootstrap 5 + jQuery Live Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-modals allow-same-origin"
            />
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
              <Code className="w-4 h-4 text-indigo-400" />
              <span>Mã nguồn Độc lập HTML5 + Bootstrap 5 + jQuery + Chart.js</span>
            </h3>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs px-3 py-1.5 rounded-xl font-bold transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép Toàn bộ HTML/JS'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-amber-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[600px]">
            {BOOTSTRAP_JQUERY_FULL_HTML}
          </pre>
        </div>
      )}
    </div>
  );
};
