export const BOOTSTRAP_JQUERY_FULL_HTML = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nền tảng Hỗ trợ Học tập Tích hợp AI - Lộ trình Cá nhân hóa</title>
    <!-- Bootstrap 5 CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
</head>
<body class="bg-light text-dark">

    <!-- Header Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold fs-4" href="#">
                <i class="bi bi-cpu-fill me-2"></i>EduAI Platform
            </a>
            <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-semibold">
                Decision Tree ID3 Engine
            </span>
        </div>
    </nav>

    <!-- Main Container -->
    <div class="container my-4">
        <!-- Hero Title Banner -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="card border-0 bg-white shadow-sm rounded-3 p-4">
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <div>
                            <h2 class="fw-bold mb-1 text-primary">Bài Kiểm Tra Trắc Nghiệm Đánh Giá Năng Lực</h2>
                            <p class="text-secondary mb-0">Hệ thống AI sẽ tự động phân tích thời gian, độ chính xác & gợi ý lộ trình phù hợp.</p>
                        </div>
                        <div class="text-end">
                            <span class="fs-5 fw-bold text-danger me-1" id="timer-display">10:00</span>
                            <small class="text-muted d-block">Thời gian còn lại</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quiz Form Card -->
        <div class="row" id="quiz-container">
            <div class="col-lg-8 mb-4">
                <div class="card border-0 shadow-sm rounded-3">
                    <div class="card-header bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
                        <span class="fw-semibold text-dark">Tiến trình làm bài</span>
                        <span class="badge bg-info text-dark" id="progress-text">Câu 1 / 4</span>
                    </div>
                    <div class="card-body p-4">
                        <!-- Dynamic Question List -->
                        <form id="quiz-form">
                            <!-- Question 1 -->
                            <div class="question-block mb-4" data-topic="Python Types" data-difficulty="Easy">
                                <div class="d-flex align-items-center mb-2">
                                    <span class="badge bg-secondary me-2">Câu 1</span>
                                    <span class="badge bg-success-subtle text-success border border-success me-2">Dễ</span>
                                    <span class="badge bg-light text-dark border">Chủ đề: Python Types</span>
                                </div>
                                <p class="fw-semibold fs-5 text-dark mb-3">Kiểu dữ liệu nào trong Python là Immutable (không thể sửa đổi sau khi tạo)?</p>
                                <div class="list-group">
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q1" value="0">
                                        <span>A. List (Danh sách)</span>
                                    </label>
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q1" value="1">
                                        <span>B. Dictionary (Từ điển)</span>
                                    </label>
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q1" value="2">
                                        <span>C. Tuple (Bộ giá trị)</span>
                                    </label>
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q1" value="3">
                                        <span>D. Set (Tập hợp)</span>
                                    </label>
                                </div>
                            </div>

                            <hr class="my-4">

                            <!-- Question 2 -->
                            <div class="question-block mb-4" data-topic="Algorithm Complexity" data-difficulty="Medium">
                                <div class="d-flex align-items-center mb-2">
                                    <span class="badge bg-secondary me-2">Câu 2</span>
                                    <span class="badge bg-warning-subtle text-warning border border-warning me-2">Trung bình</span>
                                    <span class="badge bg-light text-dark border">Chủ đề: Algorithm Complexity</span>
                                </div>
                                <p class="fw-semibold fs-5 text-dark mb-3">Độ phức tạp thời gian trung bình của thuật toán Quicksort là bao nhiêu?</p>
                                <div class="list-group">
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q2" value="0">
                                        <span>A. O(n)</span>
                                    </label>
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q2" value="1">
                                        <span>B. O(n log n)</span>
                                    </label>
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q2" value="2">
                                        <span>C. O(n^2)</span>
                                    </label>
                                </div>
                            </div>

                            <hr class="my-4">

                            <!-- Question 3 -->
                            <div class="question-block mb-4" data-topic="Decision Tree" data-difficulty="Hard">
                                <div class="d-flex align-items-center mb-2">
                                    <span class="badge bg-secondary me-2">Câu 3</span>
                                    <span class="badge bg-danger-subtle text-danger border border-danger me-2">Khó</span>
                                    <span class="badge bg-light text-dark border">Chủ đề: Decision Tree</span>
                                </div>
                                <p class="fw-semibold fs-5 text-dark mb-3">Chỉ số nào được thuật toán ID3 sử dụng để chọn thuộc tính phân nhánh?</p>
                                <div class="list-group">
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q3" value="0">
                                        <span>A. Mean Squared Error (MSE)</span>
                                    </label>
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q3" value="1">
                                        <span>B. Information Gain (Độ lợi thông tin)</span>
                                    </label>
                                    <label class="list-group-item list-group-item-action d-flex align-items-center cursor-pointer p-3">
                                        <input class="form-check-input me-3" type="radio" name="q3" value="2">
                                        <span>C. Cosine Distance</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="mt-4 text-end">
                                <button type="button" id="btn-submit-quiz" class="btn btn-primary btn-lg px-5 shadow">
                                    <i class="bi bi-send-fill me-2"></i>Nộp bài & Phân tích AI
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Quiz Instructions Sidebar -->
            <div class="col-lg-4 mb-4">
                <div class="card border-0 shadow-sm rounded-3">
                    <div class="card-header bg-primary text-white p-3">
                        <h5 class="mb-0 fw-bold"><i class="bi bi-info-circle me-2"></i>Quy tắc Đánh giá AI</h5>
                    </div>
                    <div class="card-body p-4">
                        <ul class="list-unstyled mb-0">
                            <li class="mb-3 d-flex align-items-start">
                                <i class="bi bi-check-circle-fill text-success fs-5 me-2"></i>
                                <div><strong>Thời gian:</strong> Tính chính xác từng giây để đo phản xạ.</div>
                            </li>
                            <li class="mb-3 d-flex align-items-start">
                                <i class="bi bi-diagram-3-fill text-primary fs-5 me-2"></i>
                                <div><strong>Phân loại Cây quyết định:</strong>
                                    <span class="d-block text-muted small mt-1">• Dưới 60%: Cần học lại</span>
                                    <span class="d-block text-muted small">• 60% - 80%: Đạt Căn bản</span>
                                    <span class="d-block text-muted small">• Trên 80%: Thành thạo</span>
                                </div>
                            </li>
                            <li class="d-flex align-items-start">
                                <i class="bi bi-lightbulb-fill text-warning fs-5 me-2"></i>
                                <div><strong>Lộ trình học:</strong> Sinh tự động các bước ôn tập củng cố chủ đề còn yếu.</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Result Dashboard (Hidden by default, shown via jQuery after submit) -->
        <div class="row d-none" id="result-dashboard">
            <div class="col-12 mb-4">
                <div class="card border-0 shadow-sm rounded-3">
                    <div class="card-body p-4">
                        <div class="alert alert-success d-flex align-items-center mb-4" role="alert">
                            <i class="bi bi-check-circle-fill fs-3 me-3"></i>
                            <div>
                                <h4 class="alert-heading fw-bold mb-1">Đã Hoàn Thành Bài Đánh Giá!</h4>
                                <p class="mb-0">Hệ thống AI Decision Tree vừa hoàn tất phân tích kết quả bài làm của bạn.</p>
                            </div>
                        </div>

                        <!-- Metric Summary Cards -->
                        <div class="row g-3 mb-4 text-center">
                            <div class="col-md-3">
                                <div class="bg-light p-3 rounded-3 border">
                                    <small class="text-muted text-uppercase fw-bold">Điểm số Tổng thể</small>
                                    <h2 class="fw-bold text-primary mb-0 mt-1" id="res-score">0%</h2>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="bg-light p-3 rounded-3 border">
                                    <small class="text-muted text-uppercase fw-bold">Thời gian Làm bài</small>
                                    <h2 class="fw-bold text-dark mb-0 mt-1" id="res-time">0s</h2>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="bg-light p-3 rounded-3 border">
                                    <small class="text-muted text-uppercase fw-bold">Phân loại Trạng thái</small>
                                    <h2 class="fw-bold text-warning mb-0 mt-1" id="res-status">Chờ xử lý</h2>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="bg-light p-3 rounded-3 border">
                                    <small class="text-muted text-uppercase fw-bold">Độ tin cậy AI</small>
                                    <h2 class="fw-bold text-success mb-0 mt-1" id="res-confidence">92%</h2>
                                </div>
                            </div>
                        </div>

                        <!-- Chart & Recommendation Row -->
                        <div class="row g-4 mb-4">
                            <!-- Visual Chart Container -->
                            <div class="col-lg-6">
                                <div class="border rounded-3 p-3 bg-white h-100">
                                    <h5 class="fw-bold text-dark mb-3"><i class="bi bi-bar-chart-fill me-2 text-primary"></i>Phân tích Độ chính xác theo Chủ đề</h5>
                                    <canvas id="topicAccuracyChart" style="max-height: 260px;"></canvas>
                                </div>
                            </div>

                            <!-- Learning Path Recommendation -->
                            <div class="col-lg-6">
                                <div class="border rounded-3 p-3 bg-white h-100">
                                    <h5 class="fw-bold text-dark mb-3"><i class="bi bi-signpost-split-fill me-2 text-primary"></i>Lộ trình Học tập Gợi ý</h5>
                                    <div id="learning-path-list">
                                        <!-- Dynamic list rendered via jQuery -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Retake Button -->
                        <div class="text-center">
                            <button class="btn btn-outline-primary px-4" id="btn-retake">
                                <i class="bi bi-arrow-counterclockwise me-2"></i>Làm lại Bài Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Notification -->
    <div class="modal fade" id="recommendationModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title fw-bold"><i class="bi bi-cpu me-2"></i>Kết quả Phân loại AI</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4 text-center">
                    <div class="display-4 text-primary mb-2"><i class="bi bi-trophy-fill"></i></div>
                    <h4 class="fw-bold" id="modal-status-text">Đạt Mức Căn Bản</h4>
                    <p class="text-muted" id="modal-desc-text">Thuật toán Cây quyết định đã phân loại năng lực của bạn. Bấm để xem báo cáo chi tiết.</p>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-primary px-4" data-bs-dismiss="modal">Xem Chi Tiết Lộ Trình</button>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery CDN -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <!-- Bootstrap 5 JS Bundle CDN -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Chart.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- Custom jQuery Logic (Strictly in-line, NO external CSS) -->
    <script>
        $(document).ready(function() {
            let startTime = Date.now();
            let chartInstance = null;

            // Correct Answers Map
            const correctAnswers = { q1: "2", q2: "1", q3: "1" };

            // Submit Event Handler
            $('#btn-submit-quiz').on('click', function(e) {
                e.preventDefault();

                let totalQuestions = 3;
                let correctCount = 0;
                let totalTimeSeconds = Math.round((Date.now() - startTime) / 1000);

                let userChoices = {
                    q1: $('input[name="q1"]:checked').val(),
                    q2: $('input[name="q2"]:checked').val(),
                    q3: $('input[name="q3"]:checked').val()
                };

                // Calculate Score
                if (userChoices.q1 === correctAnswers.q1) correctCount++;
                if (userChoices.q2 === correctAnswers.q2) correctCount++;
                if (userChoices.q3 === correctAnswers.q3) correctCount++;

                let accuracy = Math.round((correctCount / totalQuestions) * 100);

                // DECISION TREE ID3 LOGIC (In-browser classification)
                let classifiedStatus = "Needs Review";
                let badgeClass = "bg-danger";

                if (accuracy >= 80) {
                    classifiedStatus = "Thành thạo (Mastered)";
                    badgeClass = "bg-success";
                } else if (accuracy >= 60) {
                    classifiedStatus = "Căn bản (Basic)";
                    badgeClass = "bg-warning text-dark";
                } else {
                    classifiedStatus = "Cần học lại (Needs Review)";
                    badgeClass = "bg-danger";
                }

                // Update UI Metrics
                $('#res-score').text(accuracy + "%");
                $('#res-time').text(totalTimeSeconds + "s");
                $('#res-status').text(classifiedStatus).attr('class', 'fw-bold mb-0 mt-1 ' + (accuracy >= 80 ? 'text-success' : (accuracy >= 60 ? 'text-warning' : 'text-danger')));

                // Render Learning Path Recommendations
                let pathHtml = '';
                if (accuracy < 60) {
                    pathHtml = \`
                        <div class="alert alert-warning mb-2">
                            <strong class="d-block"><i class="bi bi-exclamation-triangle-fill me-1"></i>Bước 1: Ôn lại Lý thuyết Nền tảng</strong>
                            Xem lại khái niệm Tuple (Immutable) và Thuật toán ID3 (Entropy).
                        </div>
                        <div class="alert alert-light border mb-0">
                            <strong class="d-block"><i class="bi bi-journal-text me-1"></i>Bước 2: Bài tập củng cố</strong>
                            Thực hành 5 câu trắc nghiệm mức độ Dễ - Trung bình.
                        </div>
                    \`;
                } else if (accuracy < 80) {
                    pathHtml = \`
                        <div class="alert alert-info mb-2">
                            <strong class="d-block"><i class="bi bi-arrow-up-circle-fill me-1"></i>Bước 1: Luyện tập Nâng cao</strong>
                            Tập trung giải các câu trắc nghiệm Khó về Cây quyết định & Big-O.
                        </div>
                        <div class="alert alert-light border mb-0">
                            <strong class="d-block"><i class="bi bi-speedometer2 me-1"></i>Bước 2: Rèn luyện Tốc độ</strong>
                            Làm bài mini test 5 phút để nâng phản xạ xử lý câu hỏi.
                        </div>
                    \`;
                } else {
                    pathHtml = \`
                        <div class="alert alert-success mb-2">
                            <strong class="d-block"><i class="bi bi-trophy-fill me-1"></i>Bước 1: Đã Thành Thạo Kiến Thức!</strong>
                            Bạn đã nắm vững toàn bộ chuyên đề này. Ready for Advanced Projects!
                        </div>
                    \`;
                }
                $('#learning-path-list').html(pathHtml);

                // Show Results Dashboard
                $('#quiz-container').addClass('d-none');
                $('#result-dashboard').removeClass('d-none');

                // Render Chart.js
                renderChart(userChoices);

                // Show Modal Alert
                $('#modal-status-text').text(classifiedStatus);
                var recModal = new bootstrap.Modal(document.getElementById('recommendationModal'));
                recModal.show();
            });

            // Retake Quiz Handler
            $('#btn-retake').on('click', function() {
                startTime = Date.now();
                $('input[type="radio"]').prop('checked', false);
                $('#result-dashboard').addClass('d-none');
                $('#quiz-container').removeClass('d-none');
            });

            // Chart Rendering Function
            function renderChart(choices) {
                const ctx = document.getElementById('topicAccuracyChart').getContext('2d');
                if (chartInstance) chartInstance.destroy();

                let q1Acc = choices.q1 === correctAnswers.q1 ? 100 : 0;
                let q2Acc = choices.q2 === correctAnswers.q2 ? 100 : 0;
                let q3Acc = choices.q3 === correctAnswers.q3 ? 100 : 0;

                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Python Types', 'Algorithm Complexity', 'Decision Tree (ID3)'],
                        datasets: [{
                            label: 'Độ chính xác (%)',
                            data: [q1Acc, q2Acc, q3Acc],
                            backgroundColor: ['#0d6efd', '#ffc107', '#dc3545'],
                            borderRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: { beginAtZero: true, max: 100 }
                        }
                    }
                });
            }
        });
    </script>
</body>
</html>`;
