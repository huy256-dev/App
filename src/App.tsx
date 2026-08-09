import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { QuizRunner } from './components/QuizRunner';
import { ResultAnalytics } from './components/ResultAnalytics';
import { UMLViewer } from './components/UMLViewer';
import { DatabaseSchemaViewer } from './components/DatabaseSchemaViewer';
import { PythonScriptViewer } from './components/PythonScriptViewer';
import { BootstrapFrontendViewer } from './components/BootstrapFrontendViewer';
import { TestResult } from './types';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quiz');
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleQuizCompleted = (result: TestResult) => {
    setTestResult(result);
  };

  const handleRetakeQuiz = () => {
    setTestResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Bar Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'quiz' && (
          testResult ? (
            <ResultAnalytics result={testResult} onRetake={handleRetakeQuiz} />
          ) : (
            <QuizRunner onQuizCompleted={handleQuizCompleted} />
          )
        )}

        {activeTab === 'uml' && <UMLViewer />}
        {activeTab === 'database' && <DatabaseSchemaViewer />}
        {activeTab === 'ai-algorithm' && <PythonScriptViewer />}
        {activeTab === 'bootstrap-frontend' && <BootstrapFrontendViewer />}
      </main>

      {/* Footer */}
      <footer className="h-10 bg-slate-900 border-t border-slate-800 flex items-center px-4 sm:px-6 justify-between text-[10px] text-slate-500 uppercase tracking-[0.2em] shrink-0 mt-auto">
        <span className="font-mono">Engine Status: Nominal</span>
        <span className="hidden sm:inline-block font-mono">Decision Tree C4.5 / ID3</span>
        <span className="font-mono">EduAI Engine v2.4</span>
      </footer>
    </div>
  );
}
