export interface UseCaseItem {
  id: string;
  name: string;
  actor: 'Học viên (Student)' | 'Giảng viên/Admin' | 'Hệ thống AI (RecommendationEngine)';
  description: string;
}

export const USE_CASES: UseCaseItem[] = [
  { id: 'UC01', name: 'Đăng ký & Đăng nhập Hệ thống', actor: 'Học viên (Student)', description: 'Tạo tài khoản và xác thực vào nền tảng học tập.' },
  { id: 'UC02', name: 'Làm bài Kiểm tra Trắc nghiệm (Quiz)', actor: 'Học viên (Student)', description: 'Thực hiện bài test đánh giá với đồng hồ đếm ngược và chọn đáp án.' },
  { id: 'UC03', name: 'Xem Báo cáo Kết quả & Phân tích Điểm yếu', actor: 'Học viên (Student)', description: 'Xem điểm số, thời gian làm bài, độ chính xác theo từng chủ đề và đồ thị radar.' },
  { id: 'UC04', name: 'Nhận Gợi ý Lộ trình Học cá nhân hóa', actor: 'Học viên (Student)', description: 'Nhận đề xuất danh sách bài học, tài liệu củng cố từ Cây quyết định AI.' },
  { id: 'UC05', name: 'Quản lý Ngân hàng Câu hỏi & Đề thi', actor: 'Giảng viên/Admin', description: 'Thêm, sửa, xóa câu hỏi trắc nghiệm, gắn thẻ độ khó và chủ đề.' },
  { id: 'UC06', name: 'Cấu hình & Huấn luyện Cây quyết định', actor: 'Giảng viên/Admin', description: 'Cập nhật tập dữ liệu mẫu và điều chỉnh ngưỡng phân nhánh Decision Tree.' },
  { id: 'UC07', name: 'Trích xuất Thuộc tính & Phân loại Năng lực', actor: 'Hệ thống AI (RecommendationEngine)', description: 'Tính toán Accuracy, Time/Question, HardAccuracy và duyệt Cây quyết định ID3.' },
  { id: 'UC08', name: 'Sinh Lộ trình Học tự động (Path Generation)', actor: 'Hệ thống AI (RecommendationEngine)', description: 'Tạo danh sách các bước học tập 1-2-3 dựa trên nhãn kết quả ("Cần học lại", "Căn bản", "Thành thạo").' }
];

export const PLANTUML_CLASS_DIAGRAM = `@startuml
title Class Diagram - Nền tảng Hỗ trợ Học tập Tích hợp AI

class User {
  + String id
  + String username
  + String email
  + String role
  + Date createdAt
  + register()
  + login()
  + getTestHistory()
}

class Quiz {
  + String id
  + String title
  + String subject
  + int durationMinutes
  + List<Question> questions
  + getQuestionsByTopic()
}

class Question {
  + String id
  + String topic
  + String questionText
  + List<String> options
  + int correctAnswerIndex
  + String difficulty // Easy, Medium, Hard
  + String explanation
  + validateAnswer(int choice) : boolean
}

class TestResult {
  + String id
  + String userId
  + String quizId
  + int totalTimeSeconds
  + float overallAccuracy
  + float hardAccuracy
  + float avgTimePerQuestion
  + Date completedAt
  + List<UserAnswer> answers
  + calculateMetrics()
}

class RecommendationEngine {
  + TreeNode treeRoot
  + trainModel(List<TrainingData> dataset)
  + classifyStatus(TestResult result) : String
  + generateLearningPath(TestResult result) : LearningPath
  + calculateEntropy(List<String> labels) : float
  + calculateInformationGain() : float
}

class LearningPath {
  + String id
  + String userId
  + String targetStatus // Needs Review, Basic, Mastered
  + List<String> priorityTopics
  + List<LearningStep> steps
  + Date generatedAt
  + exportPathSummary()
}

User "1" -- "0..*" TestResult : completes >
Quiz "1" *-- "1..*" Question : contains >
TestResult "1" -- "1" Quiz : evaluates >
TestResult "1" -- "1" LearningPath : triggers >
RecommendationEngine ..> TestResult : analyzes >
RecommendationEngine ..> LearningPath : generates >

@enduml`;

export const DATABASE_SCHEMA_SQL = `-- DATABASE SCHEMA FOR AI INTEGRATED LEARNING PLATFORM
-- Postgres / MySQL Compatible Schema

-- 1. Table Users
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table Quizzes
CREATE TABLE quizzes (
    quiz_id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    subject VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 15,
    created_by VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
);

-- 3. Table Questions
CREATE TABLE questions (
    question_id VARCHAR(36) PRIMARY KEY,
    quiz_id VARCHAR(36) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    options_json JSON NOT NULL, -- Array of 4 options e.g. ["A", "B", "C", "D"]
    correct_answer INT NOT NULL, -- Index 0-3
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
);

-- 4. Table Test Results (Stores aggregate metrics for Decision Tree)
CREATE TABLE test_results (
    result_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    quiz_id VARCHAR(36) NOT NULL,
    total_time_seconds INT NOT NULL,
    total_questions INT NOT NULL,
    correct_count INT NOT NULL,
    overall_accuracy DECIMAL(5,2) NOT NULL, -- % e.g. 75.50
    hard_accuracy DECIMAL(5,2) NOT NULL,    -- % accuracy on Hard questions
    avg_time_per_question DECIMAL(5,2) NOT NULL, -- Seconds
    classified_status VARCHAR(30) NOT NULL CHECK (classified_status IN ('Needs Review', 'Basic', 'Mastered')),
    confidence_score DECIMAL(5,2) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
);

-- 5. Table Test Answers (Detailed question-level logs for analytics)
CREATE TABLE test_answers (
    answer_id VARCHAR(36) PRIMARY KEY,
    result_id VARCHAR(36) NOT NULL,
    question_id VARCHAR(36) NOT NULL,
    selected_option INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    time_spent_seconds INT NOT NULL,
    FOREIGN KEY (result_id) REFERENCES test_results(result_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

-- 6. Table Training Data (Stores historical dataset for Decision Tree ID3/C4.5 training)
CREATE TABLE decision_tree_train_data (
    sample_id VARCHAR(36) PRIMARY KEY,
    accuracy DECIMAL(5,2) NOT NULL,
    avg_time_per_question DECIMAL(5,2) NOT NULL,
    hard_question_accuracy DECIMAL(5,2) NOT NULL,
    prev_score DECIMAL(5,2) NOT NULL,
    label VARCHAR(30) NOT NULL CHECK (label IN ('Needs Review', 'Basic', 'Mastered')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Table Learning Paths (Stores AI recommendations)
CREATE TABLE learning_paths (
    path_id VARCHAR(36) PRIMARY KEY,
    result_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    priority_topics_json JSON NOT NULL, -- e.g. ["Tree Traversal", "Entropy"]
    recommendation_summary TEXT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (result_id) REFERENCES test_results(result_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- INDEXES FOR PERFORMANCE OPTIMIZATION
CREATE INDEX idx_test_results_user ON test_results(user_id);
CREATE INDEX idx_questions_quiz_topic ON questions(quiz_id, topic);
CREATE INDEX idx_test_answers_result ON test_answers(result_id);
`;

export const PYTHON_DECISION_TREE_CODE = `import math
import numpy as np

class DecisionTreeID3:
    """
    Core AI Recommendation Engine using ID3 / C4.5 Decision Tree
    Calculates Entropy and Information Gain to classify student learning status.
    """
    def __init__(self, max_depth=3):
        self.max_depth = max_depth
        self.tree = None

    def calculate_entropy(self, labels):
        """Tính chỉ số Entropy H(S) = - sum(p_i * log2(p_i))"""
        if len(labels) == 0:
            return 0.0
        
        counts = {}
        for l in labels:
            counts[l] = counts.get(l, 0) + 1
            
        entropy = 0.0
        total = len(labels)
        for count in counts.values():
            p = count / total
            if p > 0:
                entropy -= p * math.log2(p)
        return round(entropy, 4)

    def calculate_gini(self, labels):
        """Tính chỉ số Gini Impurity Gini(S) = 1 - sum(p_i^2)"""
        if len(labels) == 0:
            return 0.0
        
        counts = {}
        for l in labels:
            counts[l] = counts.get(l, 0) + 1
            
        sum_sq = 0.0
        total = len(labels)
        for count in counts.values():
            p = count / total
            sum_sq += p ** 2
        return round(1.0 - sum_sq, 4)

    def calculate_information_gain(self, X, y, feature_index, threshold):
        """Tính Độ lợi Thông tin (Information Gain) khi phân nhánh theo thuộc tính & ngưỡng"""
        parent_entropy = self.calculate_entropy(y)
        
        # Split data based on threshold
        left_mask = X[:, feature_index] <= threshold
        right_mask = ~left_mask
        
        y_left = y[left_mask]
        y_right = y[right_mask]
        
        if len(y_left) == 0 or len(y_right) == 0:
            return 0.0
        
        n = len(y)
        n_l, n_r = len(y_left), len(y_right)
        
        child_entropy = (n_l / n) * self.calculate_entropy(y_left) + (n_r / n) * self.calculate_entropy(y_right)
        info_gain = parent_entropy - child_entropy
        return round(info_gain, 4)

    def fit(self, X, y, feature_names, depth=0):
        """Huấn luyện Cây quyết định đệ quy"""
        unique_classes, counts = np.unique(y, return_counts=True)
        
        # Base cases: Pure node or max depth reached
        if len(unique_classes) == 1:
            return {'type': 'leaf', 'class': unique_classes[0]}
        
        if depth >= self.max_depth or len(y) <= 2:
            majority_class = unique_classes[np.argmax(counts)]
            return {'type': 'leaf', 'class': majority_class}
        
        best_gain = -1.0
        best_feat_idx = -1
        best_thresh = None
        
        n_features = X.shape[1]
        for feat_idx in range(n_features):
            vals = np.sort(X[:, feat_idx])
            # Test midpoints as threshold candidates
            for i in range(len(vals) - 1):
                thresh = (vals[i] + vals[i+1]) / 2.0
                gain = self.calculate_information_gain(X, y, feat_idx, thresh)
                if gain > best_gain:
                    best_gain = gain
                    best_feat_idx = feat_idx
                    best_thresh = thresh
        
        if best_gain <= 0:
            majority_class = unique_classes[np.argmax(counts)]
            return {'type': 'leaf', 'class': majority_class}
        
        # Create branch splits
        left_mask = X[:, best_feat_idx] <= best_thresh
        right_mask = ~left_mask
        
        left_subtree = self.fit(X[left_mask], y[left_mask], feature_names, depth + 1)
        right_subtree = self.fit(X[right_mask], y[right_mask], feature_names, depth + 1)
        
        return {
            'type': 'node',
            'feature_name': feature_names[best_feat_idx],
            'feature_idx': best_feat_idx,
            'threshold': round(best_thresh, 2),
            'info_gain': best_gain,
            'left': left_subtree,  # <= threshold
            'right': right_subtree # > threshold
        }

    def predict_one(self, tree, x_sample):
        """Phân loại 1 mẫu kết quả làm bài của học viên"""
        if tree['type'] == 'leaf':
            return tree['class']
        
        val = x_sample[tree['feature_idx']]
        if val <= tree['threshold']:
            return self.predict_one(tree['left'], x_sample)
        else:
            return self.predict_one(tree['right'], x_sample)

# --- EXAMPLE RUNTIME USAGE ---
if __name__ == "__main__":
    # Features: [Overall Accuracy (%), Avg Time/Question (s), Hard Question Accuracy (%)]
    X_train = np.array([
        [30, 15, 0],   # S1: Needs Review
        [45, 50, 20],  # S2: Needs Review
        [55, 25, 30],  # S3: Needs Review
        [65, 40, 40],  # S4: Basic
        [70, 30, 50],  # S5: Basic
        [75, 20, 60],  # S6: Basic
        [85, 18, 80],  # S7: Mastered
        [90, 15, 90],  # S8: Mastered
        [95, 12, 100], # S9: Mastered
    ])
    
    y_train = np.array([
        'Needs Review', 'Needs Review', 'Needs Review',
        'Basic', 'Basic', 'Basic',
        'Mastered', 'Mastered', 'Mastered'
    ])
    
    feature_names = ['Accuracy (%)', 'Avg Time (s)', 'Hard Accuracy (%)']
    
    model = DecisionTreeID3(max_depth=3)
    tree_root = model.fit(X_train, y_train, feature_names)
    
    print("=== DECISION TREE STRUCTURE ===")
    print(tree_root)
    
    # Test new student result: Accuracy 58%, Time 35s, Hard 25%
    student_x = np.array([58, 35, 25])
    predicted = model.predict_one(tree_root, student_x)
    print(f"Prediction for Student [58%, 35s, 25%]: {predicted}")
`;
