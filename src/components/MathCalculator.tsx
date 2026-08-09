import React, { useState } from 'react';
import { Calculator, HelpCircle } from 'lucide-react';
import { calculateEntropy, calculateGini } from '../utils/decisionTreeEngine';

export const MathCalculator: React.FC = () => {
  const [c1, setC1] = useState<number>(6); // Count for Class 1 ("Cần học lại")
  const [c2, setC2] = useState<number>(4); // Count for Class 2 ("Căn bản/Thành thạo")

  const total = Math.max(c1 + c2, 1);
  const p1 = Number((c1 / total).toFixed(4));
  const p2 = Number((c2 / total).toFixed(4));

  // Dummy labels
  const labels = [
    ...Array(c1).fill('Needs Review'),
    ...Array(c2).fill('Mastered')
  ];

  const entropy = calculateEntropy(labels);
  const gini = calculateGini(labels);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-slate-800">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Interactive Formula Inspector</h3>
          <p className="text-sm font-light text-white">Công cụ Tính toán Toán học Thực tế (Entropy &amp; Gini)</p>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
          <label className="block text-xs font-semibold text-rose-300 mb-2">
            Số lượng mẫu Lớp A ("Cần Học Lại"): <span className="text-white text-sm font-mono ml-1">{c1}</span>
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={c1}
            onChange={(e) => setC1(parseInt(e.target.value) || 0)}
            className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">Xác suất p1 = {c1}/{total} = {p1}</span>
        </div>

        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
          <label className="block text-xs font-semibold text-emerald-300 mb-2">
            Số lượng mẫu Lớp B ("Thành Thạo"): <span className="text-white text-sm font-mono ml-1">{c2}</span>
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={c2}
            onChange={(e) => setC2(parseInt(e.target.value) || 0)}
            className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">Xác suất p2 = {c2}/{total} = {p2}</span>
        </div>
      </div>

      {/* Calculated Results & Math Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Entropy Box */}
        <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">1. Entropy H(S)</span>
            <span className="text-2xl font-light text-indigo-300 font-mono">{entropy}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <p className="text-indigo-400 font-semibold">H(S) = - ∑ (p_i * log2(p_i))</p>
            <p className="text-[11px] text-slate-400">
              = - [ ({p1} * log2({p1})) + ({p2} * log2({p2})) ]
            </p>
            <p className="text-[11px] text-emerald-400 font-semibold">
              = {entropy} {entropy === 0 ? '(Mẫu thuần khiết 100%)' : (entropy === 1 ? '(Độ hỗn loạn cực đại)' : '')}
            </p>
          </div>
        </div>

        {/* Gini Box */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">2. Gini Impurity</span>
            <span className="text-2xl font-light text-purple-300 font-mono">{gini}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <p className="text-purple-400 font-semibold">Gini(S) = 1 - ∑ (p_i)^2</p>
            <p className="text-[11px] text-slate-400">
              = 1 - [ ({p1})^2 + ({p2})^2 ]
            </p>
            <p className="text-[11px] text-emerald-400 font-semibold">
              = 1 - [ {(p1 * p1).toFixed(4)} + {(p2 * p2).toFixed(4)} ] = {gini}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start space-x-2 text-xs text-slate-400 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
        <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Ý nghĩa:</strong> Khi tập dữ liệu có độ hỗn loạn càng cao (Entropy gần 1.0 hoặc Gini gần 0.5), cây quyết định sẽ tìm các thuộc tính chia nhỏ tập dữ liệu sao cho Entropy/Gini giảm nhiều nhất (Độ lợi thông tin Information Gain cao nhất).
        </p>
      </div>
    </div>
  );
};
