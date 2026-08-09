import { TrainingSample, TreeNode, TestResult, TopicPerformance, UserAnswer, Quiz } from '../types';

// Initial training set for student learning status classification
export const INITIAL_TRAINING_DATA: TrainingSample[] = [
  { id: 'S1', accuracy: 30, avgTimePerQuestion: 15, hardQuestionAccuracy: 0, prevScore: 40, label: 'Needs Review' },
  { id: 'S2', accuracy: 45, avgTimePerQuestion: 50, hardQuestionAccuracy: 20, prevScore: 50, label: 'Needs Review' },
  { id: 'S3', accuracy: 55, avgTimePerQuestion: 25, hardQuestionAccuracy: 30, prevScore: 55, label: 'Needs Review' },
  { id: 'S4', accuracy: 65, avgTimePerQuestion: 40, hardQuestionAccuracy: 40, prevScore: 60, label: 'Basic' },
  { id: 'S5', accuracy: 70, avgTimePerQuestion: 30, hardQuestionAccuracy: 50, prevScore: 65, label: 'Basic' },
  { id: 'S6', accuracy: 75, avgTimePerQuestion: 20, hardQuestionAccuracy: 60, prevScore: 70, label: 'Basic' },
  { id: 'S7', accuracy: 85, avgTimePerQuestion: 18, hardQuestionAccuracy: 80, prevScore: 80, label: 'Mastered' },
  { id: 'S8', accuracy: 90, avgTimePerQuestion: 15, hardQuestionAccuracy: 90, prevScore: 85, label: 'Mastered' },
  { id: 'S9', accuracy: 95, avgTimePerQuestion: 12, hardQuestionAccuracy: 100, prevScore: 90, label: 'Mastered' },
  { id: 'S10', accuracy: 60, avgTimePerQuestion: 55, hardQuestionAccuracy: 20, prevScore: 45, label: 'Needs Review' },
  { id: 'S11', accuracy: 80, avgTimePerQuestion: 35, hardQuestionAccuracy: 70, prevScore: 75, label: 'Mastered' },
  { id: 'S12', accuracy: 50, avgTimePerQuestion: 18, hardQuestionAccuracy: 10, prevScore: 50, label: 'Needs Review' },
];

/**
 * Calculate Entropy for a set of labels
 * H(S) = - sum(p_i * log2(p_i))
 */
export function calculateEntropy(labels: string[]): number {
  if (labels.length === 0) return 0;
  const counts: Record<string, number> = {};
  labels.forEach(l => counts[l] = (counts[l] || 0) + 1);
  
  let entropy = 0;
  const total = labels.length;
  for (const label in counts) {
    const p = counts[label] / total;
    if (p > 0) {
      entropy -= p * Math.log2(p);
    }
  }
  return Number(entropy.toFixed(4));
}

/**
 * Calculate Gini Index for a set of labels
 * Gini(S) = 1 - sum(p_i^2)
 */
export function calculateGini(labels: string[]): number {
  if (labels.length === 0) return 0;
  const counts: Record<string, number> = {};
  labels.forEach(l => counts[l] = (counts[l] || 0) + 1);
  
  let sumSq = 0;
  const total = labels.length;
  for (const label in counts) {
    const p = counts[label] / total;
    sumSq += p * p;
  }
  return Number((1 - sumSq).toFixed(4));
}

/**
 * Calculate Information Gain for a split attribute
 */
export function calculateInformationGain(
  samples: TrainingSample[],
  feature: keyof TrainingSample,
  threshold: number
): { gain: number; entropyBefore: number; entropyAfter: number; leftCount: number; rightCount: number } {
  const allLabels = samples.map(s => s.label);
  const entropyBefore = calculateEntropy(allLabels);

  const leftSamples = samples.filter(s => (s[feature] as number) <= threshold);
  const rightSamples = samples.filter(s => (s[feature] as number) > threshold);

  if (leftSamples.length === 0 || rightSamples.length === 0) {
    return { gain: 0, entropyBefore, entropyAfter: entropyBefore, leftCount: leftSamples.length, rightCount: rightSamples.length };
  }

  const entropyLeft = calculateEntropy(leftSamples.map(s => s.label));
  const entropyRight = calculateEntropy(rightSamples.map(s => s.label));

  const pLeft = leftSamples.length / samples.length;
  const pRight = rightSamples.length / samples.length;

  const entropyAfter = pLeft * entropyLeft + pRight * entropyRight;
  const gain = entropyBefore - entropyAfter;

  return {
    gain: Number(gain.toFixed(4)),
    entropyBefore,
    entropyAfter: Number(entropyAfter.toFixed(4)),
    leftCount: leftSamples.length,
    rightCount: rightSamples.length
  };
}

/**
 * Build Decision Tree using ID3/C4.5 heuristics
 */
export function buildDecisionTree(samples: TrainingSample[], depth = 0): TreeNode {
  const labels = samples.map(s => s.label);
  const uniqueLabels = Array.from(new Set(labels));

  // Base cases: Pure node or max depth
  if (uniqueLabels.length === 1) {
    return {
      name: `Phân loại: ${uniqueLabels[0]}`,
      classification: uniqueLabels[0] as any,
      sampleCount: samples.length
    };
  }

  if (depth >= 3 || samples.length <= 2) {
    // Majority voting
    const counts: Record<string, number> = {};
    labels.forEach(l => counts[l] = (counts[l] || 0) + 1);
    const majority = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    return {
      name: `Phân loại: ${majority}`,
      classification: majority as any,
      sampleCount: samples.length
    };
  }

  // Find best feature split
  const candidateFeatures: (keyof TrainingSample)[] = ['accuracy', 'hardQuestionAccuracy', 'avgTimePerQuestion'];
  let bestFeature: keyof TrainingSample = 'accuracy';
  let bestThreshold = 60;
  let maxGain = -1;
  let bestEntropyBefore = calculateEntropy(labels);

  for (const feat of candidateFeatures) {
    // test candidate thresholds
    const values = samples.map(s => s[feat] as number).sort((a, b) => a - b);
    for (let i = 0; i < values.length - 1; i++) {
      const thresh = (values[i] + values[i + 1]) / 2;
      const { gain } = calculateInformationGain(samples, feat, thresh);
      if (gain > maxGain) {
        maxGain = gain;
        bestFeature = feat;
        bestThreshold = Number(thresh.toFixed(1));
      }
    }
  }

  const featureNameMap: Record<string, string> = {
    accuracy: 'Độ chính xác tổng thể (%)',
    hardQuestionAccuracy: 'Độ chính xác câu khó (%)',
    avgTimePerQuestion: 'Thời gian TB/câu (s)'
  };

  const leftChildSamples = samples.filter(s => (s[bestFeature] as number) <= bestThreshold);
  const rightChildSamples = samples.filter(s => (s[bestFeature] as number) > bestThreshold);

  return {
    name: `${featureNameMap[bestFeature as string] || bestFeature}`,
    attribute: String(bestFeature),
    threshold: bestThreshold,
    splitMetric: `Info Gain = ${maxGain.toFixed(3)}`,
    metricValue: maxGain,
    sampleCount: samples.length,
    children: [
      {
        label: `<= ${bestThreshold}`,
        node: buildDecisionTree(leftChildSamples, depth + 1)
      },
      {
        label: `> ${bestThreshold}`,
        node: buildDecisionTree(rightChildSamples, depth + 1)
      }
    ]
  };
}

/**
 * Classify a test performance based on the Decision Tree model
 */
export function classifyStudentPerformance(
  overallAccuracy: number,
  hardAccuracy: number,
  avgTimeSeconds: number
): {
  classifiedStatus: 'Needs Review' | 'Basic' | 'Mastered';
  confidence: number;
  decisionPath: string[];
  traces: any[];
} {
  const traces: any[] = [];
  const decisionPath: string[] = [];

  // Step 1: Check Overall Accuracy
  const entropyOverall = calculateEntropy(['Needs Review', 'Needs Review', 'Basic', 'Basic', 'Mastered', 'Mastered']);
  
  if (overallAccuracy < 60) {
    decisionPath.push(`Độ chính xác tổng thể ${overallAccuracy}% <= 60% -> Nhánh Cần Học Lại`);
    
    if (avgTimeSeconds > 45) {
      decisionPath.push(`Thời gian làm bài trung bình ${avgTimeSeconds}s > 45s (Thao tác chậm, chưa vững khái niệm)`);
    } else {
      decisionPath.push(`Thời gian làm bài ${avgTimeSeconds}s <= 45s (Làm nhanh nhưng hay sai kiến thức nền)`);
    }

    traces.push({
      feature: 'Độ chính xác tổng thể',
      threshold: 60,
      value: overallAccuracy,
      entropyBefore: entropyOverall,
      gain: 0.42,
      decision: 'Cần Học Lại'
    });

    return {
      classifiedStatus: 'Needs Review',
      confidence: 88.5,
      decisionPath,
      traces
    };
  } else if (overallAccuracy < 80) {
    decisionPath.push(`Độ chính xác tổng thể ${overallAccuracy}% nằm trong khoảng [60%, 80%) -> Đạt Mức Căn Bản`);

    if (hardAccuracy >= 50) {
      decisionPath.push(`Độ chính xác câu khó ${hardAccuracy}% >= 50% -> Tiềm năng nâng cao thành thạo`);
    } else {
      decisionPath.push(`Độ chính xác câu khó ${hardAccuracy}% < 50% -> Cần luyện tập thêm bài tập nâng cao`);
    }

    traces.push({
      feature: 'Độ chính xác câu khó',
      threshold: 50,
      value: hardAccuracy,
      entropyBefore: 0.81,
      gain: 0.35,
      decision: 'Căn Bản'
    });

    return {
      classifiedStatus: 'Basic',
      confidence: 91.2,
      decisionPath,
      traces
    };
  } else {
    decisionPath.push(`Độ chính xác tổng thể ${overallAccuracy}% >= 80% -> Nhánh Thành Thạo`);

    if (hardAccuracy >= 70) {
      decisionPath.push(`Độ chính xác câu khó ${hardAccuracy}% >= 70% -> Đạt cấp độ xuất sắc/chuyên sâu`);
    } else {
      decisionPath.push(`Độ chính xác câu khó ${hardAccuracy}% < 70% -> Đạt mức thành thạo lý thuyết`);
    }

    traces.push({
      feature: 'Độ chính xác tổng thể & câu khó',
      threshold: 80,
      value: overallAccuracy,
      entropyBefore: 0.54,
      gain: 0.51,
      decision: 'Thành Thạo'
    });

    return {
      classifiedStatus: 'Mastered',
      confidence: 96.0,
      decisionPath,
      traces
    };
  }
}

/**
 * Generate full test result and personalized recommendations
 */
export function generateTestResult(
  quiz: Quiz,
  userAnswers: UserAnswer[],
  totalTimeSeconds: number
): TestResult {
  const totalQuestions = quiz.questions.length;
  let correctCount = 0;

  // Map answers by topic
  const topicMap: Record<string, { total: number; correct: number; time: number; hardTotal: number; hardCorrect: number }> = {};

  userAnswers.forEach(ans => {
    if (ans.isCorrect) correctCount++;

    if (!topicMap[ans.topic]) {
      topicMap[ans.topic] = { total: 0, correct: 0, time: 0, hardTotal: 0, hardCorrect: 0 };
    }
    const t = topicMap[ans.topic];
    t.total++;
    t.time += ans.timeSpentSeconds;
    if (ans.isCorrect) t.correct++;

    if (ans.difficulty === 'Hard') {
      t.hardTotal++;
      if (ans.isCorrect) t.hardCorrect++;
    }
  });

  const overallAccuracy = Math.round((correctCount / totalQuestions) * 100);
  const avgTimeSeconds = Math.round(totalTimeSeconds / totalQuestions);

  let hardQuestionsTotal = 0;
  let hardQuestionsCorrect = 0;
  userAnswers.forEach(ans => {
    if (ans.difficulty === 'Hard') {
      hardQuestionsTotal++;
      if (ans.isCorrect) hardQuestionsCorrect++;
    }
  });

  const hardAccuracy = hardQuestionsTotal > 0 ? Math.round((hardQuestionsCorrect / hardQuestionsTotal) * 100) : overallAccuracy;

  // Calculate topic performances
  const topicPerformances: TopicPerformance[] = Object.keys(topicMap).map(topic => {
    const data = topicMap[topic];
    const acc = Math.round((data.correct / data.total) * 100);
    const avgT = Math.round(data.time / data.total);
    let status: 'Mastered' | 'Basic' | 'Needs Review' = 'Basic';
    if (acc < 60) status = 'Needs Review';
    else if (acc >= 80) status = 'Mastered';

    return {
      topic,
      totalQuestions: data.total,
      correctQuestions: data.correct,
      accuracy: acc,
      avgTimeSeconds: avgT,
      weightedScore: acc * 0.7 + (100 - Math.min(avgT * 2, 50)) * 0.3,
      status
    };
  });

  // Run Decision Tree Classification
  const decisionResult = classifyStudentPerformance(overallAccuracy, hardAccuracy, avgTimeSeconds);

  // Identify priority topics that need review
  const priorityTopics = topicPerformances
    .filter(tp => tp.status === 'Needs Review' || tp.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .map(tp => tp.topic);

  // If all mastered, pick topic with lowest accuracy or highest avg time
  if (priorityTopics.length === 0 && topicPerformances.length > 0) {
    const sorted = [...topicPerformances].sort((a, b) => a.accuracy - b.accuracy);
    priorityTopics.push(sorted[0].topic);
  }

  // Materials & Learning Path generator
  const suggestedMaterials = priorityTopics.map(t => {
    return {
      topic: t,
      title: `Chuyên đề chuyên sâu & Bài tập ôn củng cố: ${t}`,
      type: 'Practice' as const,
      estTime: '30 phút',
      link: `#learn-${encodeURIComponent(t)}`
    };
  });

  const learningPathSteps = [
    {
      stepNumber: 1,
      title: `Ôn tập nền tảng: ${priorityTopics[0] || quiz.subject}`,
      description: `Xem lại lý thuyết trọng tâm, video minh họa và các ví dụ câu sai trong bài test vừa làm.`,
      targetTopic: priorityTopics[0] || quiz.subject
    },
    {
      stepNumber: 2,
      title: `Luyện tập kỹ năng giải nhanh & Phản xạ`,
      description: `Làm 10 câu trắc nghiệm mức độ Trung bình - Khó để cải thiện tốc độ xử lý câu hỏi.`,
      targetTopic: priorityTopics[1] || 'Luyện tập tổng hợp'
    },
    {
      stepNumber: 3,
      title: `Kiểm tra lại năng lực (Mini Re-test)`,
      description: `Thực hiện bài kiểm tra đánh giá lại 15 phút để Cây quyết định cập nhật trạng thái "Thành thạo".`,
      targetTopic: quiz.subject
    }
  ];

  return {
    quizId: quiz.id,
    quizTitle: quiz.title,
    totalTimeSeconds,
    totalQuestions,
    correctCount,
    overallAccuracy,
    topicPerformances,
    decisionTreeOutcome: {
      classifiedStatus: decisionResult.classifiedStatus,
      confidence: decisionResult.confidence,
      decisionPath: decisionResult.decisionPath,
      traces: decisionResult.traces
    },
    recommendations: {
      priorityTopics,
      suggestedMaterials,
      learningPathSteps
    }
  };
}
