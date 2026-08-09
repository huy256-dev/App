import React, { useState } from 'react';
import { PYTHON_DECISION_TREE_CODE } from '../data/architectureData';
import { MathCalculator } from './MathCalculator';
import { Cpu, Copy, Check, Terminal, BookOpen, Binary } from 'lucide-react';

export const PythonScriptViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_DECISION_TREE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-1">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phần 3: Decision Tree Algorithm Implementation</h3>
            <h2 className="text-xl font-light text-white">Logic Thuật toán Core AI (ID3 / C4.5)</h2>
          </div>
        </div>
      </div>

      {/* Mathematical Flow Breakdown Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Luồng Toán học &amp; Công thức Cốt lõi (Mathematical Foundations)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Formula 1: Entropy */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">1. Entropy H(S)</span>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300">
              H(S) = - ∑ p_i * log2(p_i)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Đo lường độ hỗn loạn của tập dữ liệu. Khi tất cả học viên có cùng 1 kết quả, Entropy = 0.
            </p>
          </div>

          {/* Formula 2: Information Gain */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">2. Information Gain</span>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300">
              Gain(S, A) = H(S) - ∑ (|S_v|/|S|) * H(S_v)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mức giảm Entropy thu được sau khi phân nhánh theo thuộc tính A (Độ chính xác / Thời gian).
            </p>
          </div>

          {/* Formula 3: Gini Impurity */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">3. Gini Impurity</span>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300">
              Gini(S) = 1 - ∑ (p_i)^2
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Đo xác suất phân loại sai phần tử được chọn ngẫu nhiên. Dùng thay cho Entropy trong CART.
            </p>
          </div>
        </div>
      </div>

      {/* Live Math Calculator Widget */}
      <MathCalculator />

      {/* Python Code Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Mã nguồn Python Triển khai Thuật toán DecisionTreeID3</span>
          </h3>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs px-3 py-1.5 rounded-xl font-bold transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép Python Code'}</span>
          </button>
        </div>

        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed">
          {PYTHON_DECISION_TREE_CODE}
        </pre>
      </div>
    </div>
  );
};
