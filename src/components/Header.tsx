import React from 'react';
import { Cpu, FileText, Database, Code, Layout, GraduationCap } from 'lucide-react';

export type ActiveTab = 'quiz' | 'uml' | 'database' | 'ai-algorithm' | 'bootstrap-frontend';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'quiz', label: 'Làm bài Test AI', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'uml', label: 'Phần 1: UML System Design', icon: <FileText className="w-4 h-4" /> },
    { id: 'database', label: 'Phần 2: CSDL & Schema', icon: <Database className="w-4 h-4" /> },
    { id: 'ai-algorithm', label: 'Phần 3: Thuật toán Decision Tree', icon: <Cpu className="w-4 h-4" /> },
    { id: 'bootstrap-frontend', label: 'Phần 4: Frontend Bootstrap 5 + jQuery', icon: <Layout className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-slate-100 sticky top-0 z-50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              E
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white">
                EduAI Engine <span className="text-indigo-400 font-normal text-xs sm:text-sm">v2.4</span>
              </h1>
              <span className="hidden lg:inline-block text-xs text-slate-500 border-l border-slate-800 pl-2">
                Hệ thống Học tập Decision Tree AI
              </span>
            </div>
          </div>

          {/* Engine Status Badge */}
          <div className="flex items-center space-x-2 bg-slate-950/60 border border-slate-800 rounded-full px-3 py-1 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">C4.5 Engine: Active</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/80 pt-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
