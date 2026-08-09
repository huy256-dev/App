export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  topic: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-based index
  difficulty: Difficulty;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  durationMinutes: number;
  questions: Question[];
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number;
  timeSpentSeconds: number;
  isCorrect: boolean;
  topic: string;
  difficulty: Difficulty;
}

export interface TopicPerformance {
  topic: string;
  totalQuestions: number;
  correctQuestions: number;
  accuracy: number; // percentage
  avgTimeSeconds: number;
  weightedScore: number;
  status: 'Mastered' | 'Basic' | 'Needs Review';
}

export interface DecisionNodeTrace {
  feature: string;
  threshold?: number;
  value?: string | number;
  entropyBefore: number;
  gain: number;
  decision: string;
}

export interface TestResult {
  quizId: string;
  quizTitle: string;
  totalTimeSeconds: number;
  totalQuestions: number;
  correctCount: number;
  overallAccuracy: number; // 0-100
  topicPerformances: TopicPerformance[];
  decisionTreeOutcome: {
    classifiedStatus: 'Needs Review' | 'Basic' | 'Mastered';
    confidence: number;
    decisionPath: string[];
    traces: DecisionNodeTrace[];
  };
  recommendations: {
    priorityTopics: string[];
    suggestedMaterials: {
      topic: string;
      title: string;
      type: 'Video' | 'Article' | 'Practice' | 'Doc';
      estTime: string;
      link: string;
    }[];
    learningPathSteps: {
      stepNumber: number;
      title: string;
      description: string;
      targetTopic: string;
    }[];
  };
}

export interface TrainingSample {
  id: string;
  accuracy: number; // %
  avgTimePerQuestion: number; // seconds
  hardQuestionAccuracy: number; // %
  prevScore: number; // %
  label: 'Needs Review' | 'Basic' | 'Mastered';
}

export interface TreeNode {
  name: string;
  attribute?: string;
  threshold?: number;
  splitMetric?: string;
  metricValue?: number;
  children?: { label: string; node: TreeNode }[];
  classification?: 'Needs Review' | 'Basic' | 'Mastered';
  sampleCount?: number;
}
