import React, { useState } from 'react';
import { USE_CASES, PLANTUML_CLASS_DIAGRAM } from '../data/architectureData';
import { FileText, Copy, Check, Layers, Users, Workflow } from 'lucide-react';

export const UMLViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PLANTUML_CLASS_DIAGRAM);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-1">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phần 1: UML System Architecture</h3>
            <h2 className="text-xl font-light text-white">Thiết kế Hệ thống &amp; Class Specification</h2>
          </div>
        </div>
      </div>

      {/* Use Cases Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <span>Danh sách Use Case Specification</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-500 uppercase font-mono text-[10px] tracking-widest">
              <tr>
                <th className="p-3 rounded-l-lg">Mã UC</th>
                <th className="p-3">Tên Use Case</th>
                <th className="p-3">Tác nhân (Actor)</th>
                <th className="p-3 rounded-r-lg">Mô tả Chức năng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {USE_CASES.map((uc) => (
                <tr key={uc.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-indigo-400">{uc.id}</td>
                  <td className="p-3 font-semibold text-white">{uc.name}</td>
                  <td className="p-3">
                    <span className="bg-slate-950 text-slate-300 px-2.5 py-1 rounded-md border border-slate-800 font-mono text-[11px]">
                      {uc.actor}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 leading-relaxed">{uc.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PlantUML Class Diagram Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Class Diagram (PlantUML Specification)</span>
          </h3>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs px-3 py-1.5 rounded-xl font-bold transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép PlantUML'}</span>
          </button>
        </div>

        {/* Visual Summary Cards for Entities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 font-mono block">User</span>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Lưu thông tin học viên, vai trò (student/admin) &amp; lịch sử bài test.</p>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 font-mono block">Quiz &amp; Question</span>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Chứa ngân hàng câu hỏi, gắn nhãn chủ đề và mức độ khó (Easy/Medium/Hard).</p>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 font-mono block">TestResult</span>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Tính toán accuracy, time/question và lưu mảng câu trả lời chi tiết.</p>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-purple-400 font-mono block">RecommendationEngine</span>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Thực thi thuật toán Cây quyết định ID3 (Entropy/Info Gain) để phân loại.</p>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 font-mono block">LearningPath</span>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Chứa danh sách bài học, tài liệu củng cố &amp; các bước học tập cá nhân hóa.</p>
          </div>
        </div>

        {/* PlantUML Code Editor Block */}
        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed">
          {PLANTUML_CLASS_DIAGRAM}
        </pre>
      </div>
    </div>
  );
};
