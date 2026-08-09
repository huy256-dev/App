import React from 'react';
import { TestResult } from '../types';
import { DecisionTreeVisualizer } from './DecisionTreeVisualizer';
import { MathCalculator } from './MathCalculator';
import { Award, Clock, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, GitBranch, Lightbulb, Compass, RotateCcw } from 'lucide-react';

interface ResultAnalyticsProps {
  result: TestResult;
  onRetake: () => void;
}

export const ResultAnalytics: React.FC<ResultAnalyticsProps> = ({ result, onRetake }) => {
  const { decisionTreeOutcome, recommendations, topicPerformances } = result;
  const status = decisionTreeOutcome.classifiedStatus;

  const statusColorMap = {
    'Needs Review': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    'Basic': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'Mastered': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  const statusBadgeText = {
    'Needs Review': 'Cần Học Lại (Needs Review)',
    'Basic': 'Căn Bản (Basic)',
    'Mastered': 'Thành Thạo (Mastered)'
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner Alert */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded-full border border-indigo-500/20 uppercase tracking-widest">
                AI Diagnostic Result
              </span>
              <span className="text-slate-500 text-[10px] font-mono uppercase tracking-wider">Quiz ID: {result.quizId}</span>
            </div>
            <h2 className="text-2xl font-light text-white">Kết quả Phân tích &amp; Lộ trình Học tập</h2>
            <p className="text-xs text-slate-400 mt-1">
              Thuật toán Cây quyết định đã tính toán chỉ số Entropy, Độ chính xác &amp; Thời gian phản xạ của bạn.
            </p>
          </div>

          <button
            onClick={onRetake}
            className="flex items-center justify-center space-x-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs px-4 py-2.5 rounded-xl font-bold transition-all shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại bài test</span>
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Độ chính xác</span>
            <div className="text-2xl font-light text-white font-mono">{result.overallAccuracy}%</div>
            <span className="text-[10px] text-slate-500">{result.correctCount}/{result.totalQuestions} câu đúng</span>
          </div>

          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Thời gian</span>
            <div className="text-2xl font-light text-indigo-300 font-mono">{result.totalTimeSeconds}s</div>
            <span className="text-[10px] text-slate-500">Trung bình {Math.round(result.totalTimeSeconds / result.totalQuestions)}s/câu</span>
          </div>

          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Phân loại AI</span>
            <div className={`text-xs font-bold mt-1 px-2.5 py-1 rounded-lg border text-center uppercase tracking-wider ${statusColorMap[status]}`}>
              {statusBadgeText[status]}
            </div>
          </div>

          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Độ tin cậy</span>
            <div className="text-2xl font-light text-emerald-400 font-mono">{decisionTreeOutcome.confidence}%</div>
            <span className="text-[10px] text-slate-500">Thuật toán C4.5 / ID3</span>
          </div>
        </div>
      </div>

      {/* Decision Path Explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Engine Traces</h3>
            <p className="text-sm font-light text-white">Luồng Suy luận Cây Quyết Định (Decision Path)</p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
          {decisionTreeOutcome.decisionPath.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="text-indigo-400 font-bold">[{idx + 1}]</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Accuracy Breakdown Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Phân tích Độ chính xác Theo Chủ đề</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-500 uppercase font-mono text-[10px] tracking-widest">
              <tr>
                <th className="p-3 rounded-l-lg">Chủ đề</th>
                <th className="p-3">Số câu</th>
                <th className="p-3">Đúng / Sai</th>
                <th className="p-3">Độ chính xác (%)</th>
                <th className="p-3">Thời gian TB</th>
                <th className="p-3 rounded-r-lg">Đánh giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {topicPerformances.map((tp, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-white">{tp.topic}</td>
                  <td className="p-3 font-mono">{tp.totalQuestions}</td>
                  <td className="p-3 font-mono">{tp.correctQuestions} / {tp.totalQuestions - tp.correctQuestions}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            tp.accuracy >= 80 ? 'bg-emerald-500' : tp.accuracy >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${tp.accuracy}%` }}
                        ></div>
                      </div>
                      <span className="font-mono font-bold">{tp.accuracy}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono">{tp.avgTimeSeconds}s</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                      tp.status === 'Mastered'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : tp.status === 'Basic'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {tp.status === 'Mastered' ? 'Thành thạo' : tp.status === 'Basic' ? 'Căn bản' : 'Cần học lại'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Learning Path (3 Steps) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Learning Path</h3>
            <p className="text-sm font-light text-white">Lộ trình Học tập Cá nhân hóa Tự động Gợi ý</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.learningPathSteps.map((step) => (
            <div key={step.stepNumber} className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 space-y-3 relative group hover:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                  {step.stepNumber}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  {step.targetTopic}
                </span>
              </div>
              <h4 className="font-semibold text-sm text-white">{step.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Tree Diagram Inspector */}
      <DecisionTreeVisualizer />

      {/* Math Calculator Tool */}
      <MathCalculator />
    </div>
  );
};
