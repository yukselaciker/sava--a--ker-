/**
 * Matematik Tutum ve Öğrenme Profili Testi (MTÖP)
 * Ana Test Modülü
 * 
 * Özellikler:
 * - 20 soruluk interaktif test
 * - Çoktan seçmeli (tekli/çoklu)
 * - Gerçek zamanlı profil analizi
 * - İnfografik sonuç görüntüleme
 * - PDF/Link paylaşım
 */

import { questions, DOMAINS, DOMAIN_LABELS } from './test-questions.js';

// Profil tanımları
const PROFILES = {
    CONFIDENT_SOLVER: {
        id: 'confident_solver',
        name: 'Güvenli Çözücü',
        icon: '🎯',
        color: '#10B981',
        description: 'Matematiğe karşı olumlu tutum sergiliyor, problem çözme konusunda özgüvenli. Hata yapmaktan korkmadan denemeye devam ediyor.',
        strengths: ['Problem çözme becerisi', 'Özgüven', 'Hata toleransı'],
        suggestions: [
            'Daha zorlu problemlerle kendini zorlayabilirsin',
            'Arkadaşlarına yardım ederek öğrenmenizi pekiştirebilirsin',
            'Matematik yarışmalarına katılmayı düşünebilirsin'
        ]
    },
    ANXIOUS_ACHIEVER: {
        id: 'anxious_achiever',
        name: 'Kaygılı Başarıcı',
        icon: '⚡',
        color: '#F59E0B',
        description: 'Başarı motivasyonu yüksek ancak kaygı düzeyi de belirgin. Performans baskısı hissediyor olabilir.',
        strengths: ['Yüksek motivasyon', 'Çalışkanlık', 'Başarı odaklılık'],
        suggestions: [
            'Nefes egzersizleri ve rahatlama teknikleri deneyebilirsin',
            'Küçük hedefler koyarak başarı duygusunu sık yaşayabilirsin',
            'Hata yapmanın öğrenmenin parçası olduğunu hatırla'
        ],
        forTeacher: 'Bu öğrenci sınav kaygısı yaşıyor olabilir. Destekleyici geri bildirim ve küçük başarıları takdir etmek faydalı olacaktır.'
    },
    CONCEPTUAL_LEARNER: {
        id: 'conceptual_learner',
        name: 'Kavramsal Öğrenici',
        icon: '💡',
        color: '#6366F1',
        description: 'Matematikte "neden" sorusunu sormayı seviyor, ezberden ziyade anlamayı tercih ediyor.',
        strengths: ['Derin anlama', 'Analitik düşünme', 'Merak'],
        suggestions: [
            'Konuların tarihsel gelişimini araştırabilirsin',
            'Farklı çözüm yollarını karşılaştırmayı deneyebilirsin',
            'Matematiksel kanıtları inceleyebilirsin'
        ]
    },
    PROCEDURAL_LEARNER: {
        id: 'procedural_learner',
        name: 'İşlemsel Öğrenici',
        icon: '📋',
        color: '#8B5CF6',
        description: 'Adım adım prosedürleri takip etmeyi tercih ediyor, formül ve algoritmalara güveniyor.',
        strengths: ['Düzenli çalışma', 'Prosedür takibi', 'Uygulama becerisi'],
        suggestions: [
            'Her formülün arkasındaki mantığı anlamaya çalış',
            'Farklı problem türlerinde aynı formülün nasıl uygulandığını gör',
            'Görsel şemalarla kavramları destekle'
        ],
        forTeacher: 'Bu öğrenci prosedürel öğrenmeye yatkın. Kavramsal bağlantıları vurgulayan örnekler sunmak faydalı olabilir.'
    },
    HESITANT_LEARNER: {
        id: 'hesitant_learner',
        name: 'Çekingen Öğrenici',
        icon: '🌱',
        color: '#EC4899',
        description: 'Matematiğe karşı tedirginlik hissediyor, özgüven gelişimine ihtiyaç var. Doğru destekle büyük ilerleme kaydedebilir.',
        strengths: ['Gelişime açıklık', 'Farkındalık', 'Potansiyel'],
        suggestions: [
            'Başarabildiğin konulara odaklanarak özgüvenini artır',
            'Küçük adımlarla ilerle, her başarıyı kutla',
            'Matematikle ilgili olumlu deneyimler edin (oyunlar, bulmacalar)'
        ],
        forTeacher: 'Bu öğrenci matematik kaygısı ve düşük özgüven gösteriyor. Sabırlı, destekleyici bir yaklaşım ve küçük başarıların takdiri çok önemli.'
    }
};

// Test durumu
let testState = {
    currentQuestion: 0,
    answers: {},
    scores: {},
    startTime: null,
    studentInfo: {}
};

// Test başlatma
export function initMathTest() {
    createTestModal();
    attachEventListeners();
}

// Modal oluşturma
function createTestModal() {
    const modal = document.createElement('div');
    modal.id = 'mathTestModal';
    modal.className = 'math-test-modal';
    modal.innerHTML = `
        <div class="math-test-container">
            <!-- Giriş Ekranı -->
            <div id="testIntro" class="test-screen active">
                <div class="test-header">
                    <div class="test-logo">📐</div>
                    <h1>Matematik Öğrenme Profili Testi</h1>
                    <p class="test-subtitle">Matematiğe yaklaşımını keşfet, güçlü yönlerini öğren</p>
                </div>
                
                <div class="test-intro-content">
                    <div class="test-info-card">
                        <div class="info-icon">📝</div>
                        <div>
                            <strong>20 Soru</strong>
                            <span>Yaklaşık 10-15 dakika</span>
                        </div>
                    </div>
                    <div class="test-info-card">
                        <div class="info-icon">🎯</div>
                        <div>
                            <strong>Doğru/Yanlış Yok</strong>
                            <span>Senin için en uygun cevabı seç</span>
                        </div>
                    </div>
                    <div class="test-info-card">
                        <div class="info-icon">🔒</div>
                        <div>
                            <strong>Gizlilik</strong>
                            <span>Cevaplarınız sadece size özel</span>
                        </div>
                    </div>
                </div>
                
                <div class="student-form">
                    <div class="form-group">
                        <label for="studentName">Adın (isteğe bağlı)</label>
                        <input type="text" id="studentName" placeholder="Adını yaz...">
                    </div>
                    <div class="form-group">
                        <label for="studentGrade">Sınıf</label>
                        <select id="studentGrade">
                            <option value="">Seçiniz...</option>
                            <option value="6">6. Sınıf</option>
                            <option value="7">7. Sınıf</option>
                            <option value="8">8. Sınıf</option>
                            <option value="9">9. Sınıf</option>
                            <option value="10">10. Sınıf</option>
                            <option value="11">11. Sınıf</option>
                            <option value="12">12. Sınıf</option>
                            <option value="uni">Üniversite</option>
                        </select>
                    </div>
                </div>
                
                <button id="startTestBtn" class="test-btn-primary">
                    Teste Başla
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
            
            <!-- Soru Ekranı -->
            <div id="testQuestions" class="test-screen">
                <div class="test-progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="progress-text">
                    <span id="questionNumber">1</span> / ${questions.length}
                </div>
                
                <div class="question-container" id="questionContainer">
                    <!-- Dinamik soru içeriği -->
                </div>
                
                <div class="test-navigation">
                    <button id="prevBtn" class="test-btn-secondary" disabled>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Önceki
                    </button>
                    <button id="nextBtn" class="test-btn-primary" disabled>
                        Sonraki
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- Sonuç Ekranı -->
            <div id="testResults" class="test-screen">
                <div id="resultsContent">
                    <!-- Dinamik sonuç içeriği -->
                </div>
            </div>
            
            <!-- Kapatma Butonu -->
            <button id="closeTestModal" class="test-close-btn" aria-label="Kapat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

// Event listener'ları bağlama
function attachEventListeners() {
    // Test başlatma butonu (navbar'dan)
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-open-math-test]') || e.target.closest('[data-open-math-test]')) {
            e.preventDefault();
            openTest();
        }
    });

    // Modal içi butonlar
    document.getElementById('startTestBtn')?.addEventListener('click', startTest);
    document.getElementById('nextBtn')?.addEventListener('click', nextQuestion);
    document.getElementById('prevBtn')?.addEventListener('click', prevQuestion);
    document.getElementById('closeTestModal')?.addEventListener('click', closeTest);

    // ESC tuşu ile kapatma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('mathTestModal')?.classList.contains('active')) {
            closeTest();
        }
    });
}

// Test açma
function openTest() {
    const modal = document.getElementById('mathTestModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    resetTest();
}

// Test kapatma
function closeTest() {
    const modal = document.getElementById('mathTestModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Test sıfırlama
function resetTest() {
    testState = {
        currentQuestion: 0,
        answers: {},
        scores: {},
        startTime: null,
        studentInfo: {}
    };

    // Ekranları sıfırla
    document.querySelectorAll('.test-screen').forEach(s => s.classList.remove('active'));
    document.getElementById('testIntro').classList.add('active');

    // Form sıfırla
    document.getElementById('studentName').value = '';
    document.getElementById('studentGrade').value = '';
}

// Testi başlat
function startTest() {
    testState.studentInfo = {
        name: document.getElementById('studentName').value.trim() || 'Öğrenci',
        grade: document.getElementById('studentGrade').value
    };
    testState.startTime = Date.now();

    // Ekran geçişi
    document.getElementById('testIntro').classList.remove('active');
    document.getElementById('testQuestions').classList.add('active');

    // İlk soruyu göster
    showQuestion(0);
}

// Soru gösterme
function showQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('questionContainer');

    // İlerleme güncelle
    document.getElementById('questionNumber').textContent = index + 1;
    document.getElementById('progressFill').style.width = `${((index + 1) / questions.length) * 100}%`;

    // Seçili cevapları al
    const selectedAnswers = testState.answers[question.id] || [];

    container.innerHTML = `
        <div class="question-card">
            <div class="question-image">
                <img src="/test-images/${question.image}" alt="${question.imageAlt}" 
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%23f3f4f6%22 width=%22400%22 height=%22300%22/><text x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2216%22>Görsel Yükleniyor...</text></svg>'">
            </div>
            <div class="question-content">
                <div class="question-domain">${DOMAIN_LABELS[question.domain]}</div>
                <h2 class="question-text">${question.text}</h2>
                ${question.multipleChoice ? `<p class="multiple-hint">💡 ${question.multipleHint}</p>` : ''}
                <div class="options-list">
                    ${question.options.map(opt => `
                        <label class="option-item ${selectedAnswers.includes(opt.id) ? 'selected' : ''}" data-option-id="${opt.id}">
                            <input type="${question.multipleChoice ? 'checkbox' : 'radio'}" 
                                   name="question_${question.id}" 
                                   value="${opt.id}"
                                   ${selectedAnswers.includes(opt.id) ? 'checked' : ''}>
                            <span class="option-marker">${opt.id.toUpperCase()}</span>
                            <span class="option-text">${opt.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    // Seçenek eventleri
    container.querySelectorAll('.option-item').forEach(item => {
        // Handle click on the entire option item
        const handleSelection = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const input = item.querySelector('input');
            const optionId = item.dataset.optionId;

            if (question.multipleChoice) {
                // Toggle selection for multiple choice
                const isSelected = item.classList.contains('selected');
                item.classList.toggle('selected');
                input.checked = !isSelected;
            } else {
                // Single selection - deselect others first
                container.querySelectorAll('.option-item').forEach(i => {
                    i.classList.remove('selected');
                    const inp = i.querySelector('input');
                    if (inp) inp.checked = false;
                });
                item.classList.add('selected');
                input.checked = true;
            }

            saveAnswer(question.id, question.multipleChoice);
            updateNavButtons();
        };

        item.addEventListener('click', handleSelection);

        // Also handle touch events for mobile
        item.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleSelection(e);
        }, { passive: false });
    });

    // Navigasyon butonları
    updateNavButtons();
}

// Cevap kaydetme
function saveAnswer(questionId, isMultiple) {
    const inputs = document.querySelectorAll(`input[name="question_${questionId}"]:checked`);
    const selectedIds = Array.from(inputs).map(i => i.value);

    if (selectedIds.length > 0) {
        testState.answers[questionId] = selectedIds;
    } else {
        delete testState.answers[questionId];
    }
}

// Navigasyon butonlarını güncelle
function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentQ = questions[testState.currentQuestion];
    const hasAnswer = testState.answers[currentQ.id]?.length > 0;

    prevBtn.disabled = testState.currentQuestion === 0;
    nextBtn.disabled = !hasAnswer;

    // Son soru kontrolü
    if (testState.currentQuestion === questions.length - 1) {
        nextBtn.innerHTML = `
            Sonuçları Gör
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
            </svg>
        `;
    } else {
        nextBtn.innerHTML = `
            Sonraki
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        `;
    }
}

// Sonraki soru
function nextQuestion() {
    if (testState.currentQuestion < questions.length - 1) {
        testState.currentQuestion++;
        showQuestion(testState.currentQuestion);
    } else {
        // Test bitti, sonuçları göster
        calculateResults();
    }
}

// Önceki soru
function prevQuestion() {
    if (testState.currentQuestion > 0) {
        testState.currentQuestion--;
        showQuestion(testState.currentQuestion);
    }
}

// Sonuçları hesapla
function calculateResults() {
    // Her alan için puan hesapla
    const domainScores = {};
    const domainCounts = {};

    Object.values(DOMAINS).forEach(domain => {
        domainScores[domain] = 0;
        domainCounts[domain] = 0;
    });

    questions.forEach(q => {
        const answers = testState.answers[q.id] || [];
        let questionScore = 0;
        let maxScore = 0;

        if (q.multipleChoice) {
            // Çoklu seçimde toplam puan
            answers.forEach(aId => {
                const opt = q.options.find(o => o.id === aId);
                if (opt) questionScore += opt.score;
            });
            maxScore = q.options.reduce((sum, o) => sum + Math.max(0, o.score), 0);
        } else {
            // Tekli seçimde seçilen puan
            const opt = q.options.find(o => o.id === answers[0]);
            if (opt) questionScore = opt.score;
            maxScore = 100;
        }

        // 0-100 arasına normalize et
        const normalizedScore = maxScore > 0 ? (questionScore / maxScore) * 100 : 0;
        domainScores[q.domain] += normalizedScore;
        domainCounts[q.domain]++;
    });

    // Ortalama hesapla
    Object.keys(domainScores).forEach(domain => {
        if (domainCounts[domain] > 0) {
            domainScores[domain] = Math.round(domainScores[domain] / domainCounts[domain]);
        }
    });

    testState.scores = domainScores;

    // Profil belirle
    const profile = determineProfile(domainScores);

    // Sonuçları göster
    showResults(profile, domainScores);
}

// Profil belirleme
function determineProfile(scores) {
    const confidence = scores[DOMAINS.CONFIDENCE];
    const anxiety = scores[DOMAINS.ANXIETY];
    const motivation = scores[DOMAINS.MOTIVATION];
    const understanding = scores[DOMAINS.UNDERSTANDING];
    const attitude = scores[DOMAINS.ATTITUDE];

    // Kaygı puanı düşükse kaygı yüksek demektir (ters çevir)
    const anxietyLevel = 100 - anxiety;

    // Profil kuralları
    if (confidence >= 70 && anxietyLevel < 40 && attitude >= 60) {
        return PROFILES.CONFIDENT_SOLVER;
    }

    if (motivation >= 60 && anxietyLevel >= 50) {
        return PROFILES.ANXIOUS_ACHIEVER;
    }

    if (understanding >= 70) {
        return PROFILES.CONCEPTUAL_LEARNER;
    }

    if (understanding < 50 && confidence >= 50) {
        return PROFILES.PROCEDURAL_LEARNER;
    }

    return PROFILES.HESITANT_LEARNER;
}

// Sonuçları göster
function showResults(profile, scores) {
    document.getElementById('testQuestions').classList.remove('active');
    document.getElementById('testResults').classList.add('active');

    // Güçlü ve zayıf alanları belirle
    const sortedDomains = Object.entries(scores)
        .sort((a, b) => b[1] - a[1]);

    const strengths = sortedDomains.slice(0, 3);
    const improvements = sortedDomains.slice(-3).reverse();

    const resultsHtml = `
        <div class="results-infographic">
            <!-- Profil Başlığı -->
            <div class="profile-header" style="--profile-color: ${profile.color}">
                <div class="profile-icon">${profile.icon}</div>
                <h1 class="profile-name">${profile.name}</h1>
                <p class="profile-description">${profile.description}</p>
            </div>
            
            <!-- Alan Puanları -->
            <div class="results-section">
                <h2>📊 Alan Puanlarınız</h2>
                <div class="domain-scores">
                    ${Object.entries(scores).map(([domain, score]) => `
                        <div class="domain-score-item">
                            <div class="domain-label">${DOMAIN_LABELS[domain]}</div>
                            <div class="domain-bar">
                                <div class="domain-fill" style="width: ${score}%; background: ${getScoreColor(score)}"></div>
                            </div>
                            <div class="domain-value">${score}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Güçlü ve Gelişim Alanları -->
            <div class="results-grid">
                <div class="results-card strengths-card">
                    <h3>💪 Güçlü Alanlarınız</h3>
                    <ul>
                        ${strengths.map(([domain, score]) => `
                            <li><span class="score-badge good">${score}</span> ${DOMAIN_LABELS[domain]}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="results-card improvements-card">
                    <h3>🌱 Geliştirebileceğiniz Alanlar</h3>
                    <ul>
                        ${improvements.map(([domain, score]) => `
                            <li><span class="score-badge">${score}</span> ${DOMAIN_LABELS[domain]}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            
            <!-- Öneriler -->
            <div class="results-section suggestions-section">
                <h2>💡 Sana Özel Öneriler</h2>
                <div class="suggestions-list">
                    ${profile.suggestions.map(s => `<div class="suggestion-item">✓ ${s}</div>`).join('')}
                </div>
            </div>
            
            ${profile.forTeacher ? `
            <div class="results-section teacher-section">
                <h2>👩‍🏫 Öğretmen/Veli İçin Not</h2>
                <p>${profile.forTeacher}</p>
            </div>
            ` : ''}
            
            <!-- Paylaşım Butonları -->
            <div class="results-actions">
                <button class="test-btn-primary" onclick="window.mathTest.downloadPDF()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    PDF İndir
                </button>
                <button class="test-btn-secondary" onclick="window.mathTest.shareWithTeacher()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    Hocamla Paylaş
                </button>
                <button class="test-btn-ghost" onclick="window.mathTest.copyLink()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Link Kopyala
                </button>
            </div>
            
            <!-- Tekrar Test -->
            <button class="test-btn-outline" onclick="window.mathTest.restart()">
                Testi Tekrarla
            </button>
        </div>
    `;

    document.getElementById('resultsContent').innerHTML = resultsHtml;
}

// Puan rengi
function getScoreColor(score) {
    if (score >= 70) return '#10B981';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
}

// PDF İndirme (basit HTML to Print)
function downloadPDF() {
    const content = document.getElementById('resultsContent').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Matematik Öğrenme Profili - ${testState.studentInfo.name}</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                .profile-header { text-align: center; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; margin-bottom: 30px; }
                .profile-icon { font-size: 48px; }
                .profile-name { font-size: 28px; margin: 10px 0 5px; }
                .results-section { margin: 30px 0; }
                .results-section h2 { color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
                .domain-score-item { display: flex; align-items: center; gap: 10px; margin: 12px 0; }
                .domain-label { width: 140px; font-size: 14px; }
                .domain-bar { flex: 1; height: 12px; background: #e5e7eb; border-radius: 6px; overflow: hidden; }
                .domain-fill { height: 100%; border-radius: 6px; }
                .domain-value { width: 40px; text-align: right; font-weight: 600; }
                .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
                .results-card { padding: 20px; border-radius: 12px; background: #f9fafb; }
                .results-card h3 { margin-top: 0; }
                .results-card ul { list-style: none; padding: 0; }
                .results-card li { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
                .score-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; background: #e5e7eb; font-size: 12px; font-weight: 600; margin-right: 8px; }
                .score-badge.good { background: #d1fae5; color: #059669; }
                .suggestions-list { background: #eff6ff; padding: 20px; border-radius: 12px; }
                .suggestion-item { padding: 8px 0; color: #1e40af; }
                .teacher-section { background: #fef3c7; padding: 20px; border-radius: 12px; }
                .results-actions, .test-btn-outline { display: none !important; }
                @media print { body { padding: 20px; } }
            </style>
        </head>
        <body>
            <div style="text-align: center; margin-bottom: 20px; color: #6b7280; font-size: 14px;">
                ${testState.studentInfo.name} • ${testState.studentInfo.grade ? testState.studentInfo.grade + '. Sınıf' : ''} • ${new Date().toLocaleDateString('tr-TR')}
            </div>
            ${content}
            <div style="text-align: center; margin-top: 40px; color: #9ca3af; font-size: 12px;">
                Bu rapor Savaş Açıker Matematik Öğrenme Profili Testi ile oluşturulmuştur.<br>
                savasaciker.com
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Öğretmenle paylaş
function shareWithTeacher() {
    const profile = determineProfile(testState.scores);
    const message = `
📊 Matematik Öğrenme Profili Raporu

👤 Öğrenci: ${testState.studentInfo.name}
📚 Sınıf: ${testState.studentInfo.grade || 'Belirtilmedi'}
📅 Tarih: ${new Date().toLocaleDateString('tr-TR')}

🎯 Profil: ${profile.name}
${profile.description}

📈 Alan Puanları:
${Object.entries(testState.scores).map(([d, s]) => `• ${DOMAIN_LABELS[d]}: ${s}/100`).join('\n')}

${profile.forTeacher ? `\n👩‍🏫 Öğretmen Notu:\n${profile.forTeacher}` : ''}

---
Bu rapor savasaciker.com Matematik Öğrenme Profili Testi ile oluşturulmuştur.
    `.trim();

    // WhatsApp veya kopyalama
    if (navigator.share) {
        navigator.share({
            title: 'Matematik Öğrenme Profili',
            text: message
        });
    } else {
        navigator.clipboard.writeText(message).then(() => {
            alert('Rapor panoya kopyalandı! Öğretmeninize gönderebilirsiniz.');
        });
    }
}

// Link kopyala
function copyLink() {
    const url = window.location.origin + window.location.pathname + '#matematik-testi';
    navigator.clipboard.writeText(url).then(() => {
        alert('Test linki panoya kopyalandı!');
    });
}

// Testi yeniden başlat
function restart() {
    closeTest();
    setTimeout(() => {
        openTest();
    }, 300);
}

// Global erişim için export
window.mathTest = {
    open: openTest,
    close: closeTest,
    downloadPDF,
    shareWithTeacher,
    copyLink,
    restart
};

export default { initMathTest };
