import React from 'react';
import { TreeNode } from '../types';
import { GitBranch, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

interface DecisionTreeVisualizerProps {
  rootNode?: TreeNode;
}

export const DecisionTreeVisualizer: React.FC<DecisionTreeVisualizerProps> = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Decision Tree Topology</h3>
            <p className="text-sm font-light text-white">Sơ đồ Phân nhánh Cây Quyết định (ID3 / C4.5)</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded-full border border-indigo-500/20 uppercase tracking-widest font-mono">
          Entropy &amp; Info Gain
        </span>
      </div>

      {/* Visual Tree SVG Hierarchy */}
      <div className="relative overflow-x-auto py-4">
        <div className="min-w-[600px] flex flex-col items-center space-y-8">
          
          {/* Root Node */}
          <div className="flex flex-col items-center">
            <div className="bg-slate-950/80 border-2 border-indigo-500 rounded-xl p-4 shadow-xl max-w-xs text-center relative group hover:border-indigo-400 transition-all">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold block mb-1">Nút Gốc (Root Node)</span>
              <p className="font-light text-base text-white">Độ chính xác Tổng thể (%)</p>
              <div className="mt-2 flex items-center justify-center space-x-2 text-xs">
                <span className="bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded font-mono text-[11px]">Ngưỡng = 60%</span>
                <span className="text-slate-400 text-[11px]">Gain = 0.421</span>
              </div>
            </div>

            {/* Split Lines */}
            <div className="w-full max-w-md flex justify-between items-center relative h-10 my-1">
              <svg className="absolute inset-0 w-full h-full" overflow="visible">
                <line x1="50%" y1="0" x2="25%" y2="100%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
                <line x1="50%" y1="0" x2="75%" y2="100%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
              </svg>
              <span className="absolute left-[30%] top-2 -translate-x-1/2 bg-slate-950 border border-slate-800 text-amber-400 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                &lt;= 60%
              </span>
              <span className="absolute left-[70%] top-2 -translate-x-1/2 bg-slate-950 border border-slate-800 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                &gt; 60%
              </span>
            </div>
          </div>

          {/* Level 1 Subnodes */}
          <div className="w-full grid grid-cols-2 gap-8 max-w-2xl">
            
            {/* Left Branch (<= 60%) */}
            <div className="flex flex-col items-center">
              <div className="bg-slate-950/80 border border-amber-500/40 rounded-xl p-3.5 text-center shadow-md w-full max-w-[220px]">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block mb-1">Phân nhánh 1A</span>
                <p className="font-medium text-xs text-white">Thời gian TB / Câu</p>
                <span className="text-[10px] text-slate-400 font-mono block mt-1">Ngưỡng = 45 giây</span>
              </div>

              {/* Sub-split lines */}
              <div className="w-full flex justify-between relative h-8 my-1">
                <svg className="absolute inset-0 w-full h-full">
                  <line x1="50%" y1="0" x2="25%" y2="100%" stroke="#f59e0b" strokeWidth="1.5" />
                  <line x1="50%" y1="0" x2="75%" y2="100%" stroke="#f59e0b" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Leaves */}
              <div className="grid grid-cols-2 gap-2 w-full">
                <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-2.5 text-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block">Cần Học Lại</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Chậm &amp; Sai kiến thức</span>
                </div>
                <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-2.5 text-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">Cần Học Lại</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Nhanh nhưng ẩu</span>
                </div>
              </div>
            </div>

            {/* Right Branch (> 60%) */}
            <div className="flex flex-col items-center">
              <div className="bg-slate-950/80 border border-emerald-500/40 rounded-xl p-3.5 text-center shadow-md w-full max-w-[220px]">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">Phân nhánh 1B</span>
                <p className="font-medium text-xs text-white">Độ chính xác Câu Khó</p>
                <span className="text-[10px] text-slate-400 font-mono block mt-1">Ngưỡng = 70%</span>
              </div>

              {/* Sub-split lines */}
              <div className="w-full flex justify-between relative h-8 my-1">
                <svg className="absolute inset-0 w-full h-full">
                  <line x1="50%" y1="0" x2="25%" y2="100%" stroke="#10b981" strokeWidth="1.5" />
                  <line x1="50%" y1="0" x2="75%" y2="100%" stroke="#10b981" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Leaves */}
              <div className="grid grid-cols-2 gap-2 w-full">
                <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-2.5 text-center">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">Căn Bản</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Vững cơ bản</span>
                </div>
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2.5 text-center">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">Thành Thạo</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Xuất sắc</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
