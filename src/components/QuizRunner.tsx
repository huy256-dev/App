import React, { useState, useEffect } from 'react';
import { Quiz, UserAnswer, TestResult } from '../types';
import { SAMPLE_QUIZZES } from '../data/quizData';
import { generateTestResult } from '../utils/decisionTreeEngine';
import { Timer, CheckCircle2, Clock, AlertCircle, ArrowRight, RefreshCw, Award, BookOpen } from 'lucide-react';

interface QuizRunnerProps {
  onQuizCompleted: (result: TestResult) => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ onQuizCompleted }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(SAMPLE_QUIZZES[0]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, { choice: number; time: number }>>({});
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - quizStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [quizStartTime, isFinished]);

  const currentQ = selectedQuiz.questions[currentQuestionIdx];

  const handleSelectOption = (optionIdx: number) => {
    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: { choice: optionIdx, time: timeSpent }
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handleSubmitQuiz = () => {
    setIsFinished(true);
    const totalTime = Math.max(5, elapsedSeconds);

    const answersList: UserAnswer[] = selectedQuiz.questions.map(q => {
      const userAns = userAnswers[q.id] || { choice: -1, time: 10 };
      return {
        questionId: q.id,
        selectedOption: userAns.choice,
        timeSpentSeconds: userAns.time,
        isCorrect: userAns.choice === q.correctAnswer,
        topic: q.topic,
        difficulty: q.difficulty
      };
    });

    const result = generateTestResult(selectedQuiz, answersList, totalTime);
    onQuizCompleted(result);
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setQuizStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setElapsedSeconds(0);
    setIsFinished(false);
  };

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round((answeredCount / selectedQuiz.questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Selector Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
            Chủ đề Đánh giá Năng lực
          </span>
          <h2 className="text-xl font-light text-white">{selectedQuiz.title}</h2>
          <p className="text-xs text-slate-400 mt-1">{selectedQuiz.description}</p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <select
            value={selectedQuiz.id}
            onChange={(e) => {
              const q = SAMPLE_QUIZZES.find(sq => sq.id === e.target.value);
              if (q) {
                setSelectedQuiz(q);
                handleResetQuiz();
              }
            }}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {SAMPLE_QUIZZES.map(sq => (
              <option key={sq.id} value={sq.id}>{sq.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Timer & Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Thời gian làm bài</span>
            <div className="font-mono font-light text-xl text-white">{formattedTime}</div>
          </div>
        </div>

        <div className="w-1/2 max-w-xs">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Tiến độ: {answeredCount}/{selectedQuiz.questions.length} câu</span>
            <span className="font-mono text-indigo-300 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-600 text-white font-bold text-xs px-3 py-1 rounded-lg shadow-sm">
              Câu {currentQuestionIdx + 1} / {selectedQuiz.questions.length}
            </span>
            <span className="bg-slate-950/80 text-slate-400 text-xs px-3 py-1 rounded-lg border border-slate-800 font-mono">
              {currentQ.topic}
            </span>
          </div>

          {/* Difficulty Badge */}
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
            currentQ.difficulty === 'Easy'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : currentQ.difficulty === 'Medium'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}>
            {currentQ.difficulty === 'Easy' ? 'Dễ' : currentQ.difficulty === 'Medium' ? 'Trung bình' : 'Khó'}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-xl font-light text-white leading-relaxed">
          {currentQ.questionText}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = userAnswers[currentQ.id]?.choice === idx;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs font-mono transition-colors ${
                    isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm font-medium">{opt}</span>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIdx === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Câu trước
          </button>

          <div className="flex items-center space-x-3">
            {currentQuestionIdx < selectedQuiz.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all flex items-center space-x-1.5 shadow-lg shadow-indigo-600/20"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all flex items-center space-x-2 shadow-xl shadow-indigo-600/30"
              >
                <Award className="w-4 h-4" />
                <span>Nộp bài &amp; Phân tích Cây Quyết Định AI</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
