import { Quiz } from '../types';

export const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: 'quiz-python-ds',
    title: 'Kiểm tra Năng lực: Python & Cấu trúc Dữ liệu',
    description: 'Đánh giá mức độ hiểu biết về Python Core, Danh sách liên kết, Cây nhị phân và Độ phức tạp thuật toán Thuật toán ID3.',
    subject: 'Khoa học Máy tính',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        topic: 'Python Basics & Types',
        questionText: 'Trong Python, kiểu dữ liệu nào sau đây là IMMUTABLE (không thể thay đổi giá trị sau khi khởi tạo)?',
        options: ['List (Danh sách)', 'Dictionary (Từ điển)', 'Tuple (Bộ giá trị)', 'Set (Tập hợp)'],
        correctAnswer: 2,
        difficulty: 'Easy',
        explanation: 'Tuple trong Python là kiểu dữ liệu Immutable, không cho phép sửa đổi phần tử sau khi tạo.'
      },
      {
        id: 'q2',
        topic: 'Algorithm Complexity (Big-O)',
        questionText: 'Độ phức tạp thời gian trung bình (Average Time Complexity) của thuật toán Quicksort là bao nhiêu?',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'],
        correctAnswer: 1,
        difficulty: 'Medium',
        explanation: 'Quicksort có độ phức tạp thời gian trung bình là O(n log n) nhờ cơ chế Phân chia và Trị (Divide and Conquer).'
      },
      {
        id: 'q3',
        topic: 'Decision Tree Algorithms',
        questionText: 'Trong thuật toán Cây quyết định ID3, chỉ số nào được sử dụng để chọn thuộc tính phân nhánh tối ưu?',
        options: ['Mean Squared Error (MSE)', 'Information Gain (Độ lợi thông tin)', 'Cosine Similarity', 'Euclidean Distance'],
        correctAnswer: 1,
        difficulty: 'Medium',
        explanation: 'Thuật toán ID3 tính toán Entropy và lấy thuộc tính có Information Gain (Độ lợi thông tin) cao nhất để phân nhánh.'
      },
      {
        id: 'q4',
        topic: 'Data Structures (Tree & Graph)',
        questionText: 'Duyệt cây nhị phân tìm kiếm (BST) theo thứ tự Trung vị (In-order Traversal) sẽ thu được dãy giá trị như thế nào?',
        options: ['Dãy ngẫu nhiên', 'Dãy giảm dần', 'Dãy tăng dần có thứ tự', 'Dãy theo thứ tự các tầng'],
        correctAnswer: 2,
        difficulty: 'Hard',
        explanation: 'Duyệt In-order (Left - Root - Right) trên Cây nhị phân tìm kiếm luôn trả về các node theo thứ tự tăng dần.'
      },
      {
        id: 'q5',
        topic: 'Decision Tree Algorithms',
        questionText: 'Nếu một tập dữ liệu có 10 mẫu thuộc lớp A và 0 mẫu thuộc lớp B, giá trị Entropy H(S) của tập dữ liệu này bằng bao nhiêu?',
        options: ['1.0', '0.5', '0.0', 'Infinity'],
        correctAnswer: 2,
        difficulty: 'Hard',
        explanation: 'Khi tập dữ liệu thuần khiết 100% (chỉ chứa 1 lớp), p = 1.0 -> -1 * log2(1) = 0. Do đó Entropy H(S) = 0.'
      }
    ]
  },
  {
    id: 'quiz-ml-ai',
    title: 'Đánh giá Kiến thức: Khai phá Dữ liệu & Học máy',
    description: 'Kiểm tra về Decision Tree (ID3, C4.5, CART), Gini Index, Overfitting và Đánh giá Mô hình.',
    subject: 'Trí tuệ Nhân tạo',
    durationMinutes: 12,
    questions: [
      {
        id: 'ml_q1',
        topic: 'Decision Trees & Metrics',
        questionText: 'Công thức tính chỉ số Gini Impurity Gini(S) cho tập phân loại là gì?',
        options: ['1 - sum(p_i^2)', '- sum(p_i * log2(p_i))', 'sum(|x_i - y_i|)', 'sqrt(sum(p_i^2))'],
        correctAnswer: 0,
        difficulty: 'Easy',
        explanation: 'Gini Impurity được tính bằng công thức Gini(S) = 1 - sum(p_i^2).'
      },
      {
        id: 'ml_q2',
        topic: 'Model Overfitting & Pruning',
        questionText: 'Hiện tượng Cây quyết định phát triển quá sâu và học thuộc lòng cả nhiễu (noise) của dữ liệu huấn luyện được gọi là gì?',
        options: ['Underfitting', 'Overfitting', 'Cross-Validation', 'Gradient Explosion'],
        correctAnswer: 1,
        difficulty: 'Medium',
        explanation: 'Overfitting xảy ra khi cây quá phức tạp. Để khắc phục, người ta dùng kỹ thuật Cắt tỉa cây (Pruning).'
      },
      {
        id: 'ml_q3',
        topic: 'Supervised Learning',
        questionText: 'Thuật toán C4.5 là bản cải tiến của ID3. C4.5 giải quyết hạn chế nào của ID3?',
        options: [
          'Chỉ xử lý được dữ liệu hình ảnh',
          'Khắc phục việc ID3 thiên vị các thuộc tính có nhiều giá trị phân biệt bằng chỉ số Gain Ratio',
          'Loại bỏ hoàn toàn phép tính logarith',
          'Chuyển đổi bài toán Phân loại thành Hồi quy'
        ],
        correctAnswer: 1,
        difficulty: 'Hard',
        explanation: 'ID3 thiên vị thuộc tính có nhiều giá trị. C4.5 sử dụng Gain Ratio (bằng Information Gain chia cho Split Information) để cân bằng.'
      },
      {
        id: 'ml_q4',
        topic: 'Feature Selection',
        questionText: 'Độ lợi thông tin (Information Gain) của thuộc tính A được tính bằng công thức nào?',
        options: [
          'Gain(S, A) = Entropy(S) - Entropy_after_split(S, A)',
          'Gain(S, A) = Entropy(S) + Gini(S)',
          'Gain(S, A) = Entropy(S) * log2(A)',
          'Gain(S, A) = Gini(S) - Entropy(S)'
        ],
        correctAnswer: 0,
        difficulty: 'Medium',
        explanation: 'Gain(S, A) = H(S) - sum(|S_v|/|S| * H(S_v)). Đó là mức giảm Entropy sau khi phân nhánh theo A.'
      }
    ]
  }
];
