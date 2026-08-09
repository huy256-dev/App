import React, { useState } from 'react';
import { DATABASE_SCHEMA_SQL } from '../data/architectureData';
import { Database, Copy, Check, Table, Key, HardDrive } from 'lucide-react';

export const DatabaseSchemaViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DATABASE_SCHEMA_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tables = [
    { name: 'users', desc: 'Lưu trữ tài khoản học viên & giảng viên/admin', pk: 'user_id', count: '10,000+' },
    { name: 'quizzes', desc: 'Danh sách các bộ đề test trắc nghiệm theo môn học', pk: 'quiz_id', count: '500+' },
    { name: 'questions', desc: 'Ngân hàng câu hỏi trắc nghiệm, gắn thẻ topic & độ khó', pk: 'question_id', count: '5,000+' },
    { name: 'test_results', desc: 'Kết quả bài test aggregate (Accuracy, Avg Time, AI Status)', pk: 'result_id', count: '50,000+' },
    { name: 'test_answers', desc: 'Lịch sử chi tiết lựa chọn đáp án & thời gian từng câu', pk: 'answer_id', count: '250,000+' },
    { name: 'decision_tree_train_data', desc: 'Tập dữ liệu huấn luyện cho Cây quyết định ID3/C4.5', pk: 'sample_id', count: '1,200+' },
    { name: 'learning_paths', desc: 'Lộ trình gợi ý cá nhân hóa do AI sinh tự động', pk: 'path_id', count: '50,000+' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-1">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phần 2: Database Schema Specification</h3>
            <h2 className="text-xl font-light text-white">Cấu trúc Dữ liệu &amp; Thiết kế CSDL Quan hệ</h2>
          </div>
        </div>
      </div>

      {/* Tables Overview Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
          <Table className="w-4 h-4 text-indigo-400" />
          <span>Danh sách Bảng CSDL (Database Schema Summary)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tables.map((t) => (
            <div key={t.name} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-xs text-indigo-400">{t.name}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono uppercase">
                    PK: {t.pk}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SQL Script View & Copy */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-indigo-400" />
            <span>Mã nguồn SQL DDL Script (PostgreSQL / MySQL Compatible)</span>
          </h3>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs px-3 py-1.5 rounded-xl font-bold transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép SQL' : 'Sao chép SQL Schema'}</span>
          </button>
        </div>

        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
          {DATABASE_SCHEMA_SQL}
        </pre>
      </div>
    </div>
  );
};
