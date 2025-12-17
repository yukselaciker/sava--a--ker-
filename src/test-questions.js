/**
 * Matematik Tutum ve Öğrenme Profili Testi - Soru Verileri
 * 20 soru, 10 alan (her alandan 2 soru)
 * 
 * Teorik Çerçeve (dolaylı entegrasyon):
 * - Yapılandırmacılık (Piaget, Bruner)
 * - Yakınsal Gelişim Alanı (Vygotsky)
 * - Matematik Kaygısı (Ashcraft)
 * - Öz-Yeterlik (Bandura)
 * - Atıf Teorisi (Weiner)
 * - Gelişim Zihniyeti (Dweck)
 */

export const DOMAINS = {
    ATTITUDE: 'attitude',           // Matematiğe Tutum
    ANXIETY: 'anxiety',             // Matematik Kaygısı
    CONFIDENCE: 'confidence',       // Problem Çözmede Özgüven
    PERSISTENCE: 'persistence',     // Sebat ve Çaba
    ERROR_TOLERANCE: 'errorTolerance', // Hata Toleransı
    TEACHER_INTERACTION: 'teacherInteraction', // Öğretmen-Öğrenci Etkileşimi
    LEARNING_STYLE: 'learningStyle', // Öğrenme Stili
    UNDERSTANDING: 'understanding', // Anlama vs Ezberleme
    MOTIVATION: 'motivation',       // Motivasyon Kaynağı
    SELF_REGULATION: 'selfRegulation' // Öz-Düzenleme
};

export const DOMAIN_LABELS = {
    [DOMAINS.ATTITUDE]: 'Matematiğe Tutum',
    [DOMAINS.ANXIETY]: 'Matematik Kaygısı',
    [DOMAINS.CONFIDENCE]: 'Problem Çözmede Özgüven',
    [DOMAINS.PERSISTENCE]: 'Sebat ve Çaba',
    [DOMAINS.ERROR_TOLERANCE]: 'Hata Toleransı',
    [DOMAINS.TEACHER_INTERACTION]: 'Öğretmen İletişimi',
    [DOMAINS.LEARNING_STYLE]: 'Öğrenme Stili',
    [DOMAINS.UNDERSTANDING]: 'Kavramsal Öğrenme',
    [DOMAINS.MOTIVATION]: 'Motivasyon',
    [DOMAINS.SELF_REGULATION]: 'Öz-Düzenleme'
};

export const questions = [
    // ============ 1. MATEMATİĞE TUTUM ============
    {
        id: 1,
        domain: DOMAINS.ATTITUDE,
        text: "Matematik dersi hakkında ne düşünüyorsun?",
        image: "attitude_1.webp",
        imageAlt: "Öğrenci düşünürken matematik sembolleri etrafında",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Matematiği seviyorum, uğraşmaktan keyif alıyorum", score: 100 },
            { id: 'b', text: "Fena değil, bazı konuları seviyorum", score: 70 },
            { id: 'c', text: "Çok düşünmüyorum, sadece yapıyorum", score: 40 },
            { id: 'd', text: "Pek sevmiyorum ama mecburum", score: 20 },
            { id: 'e', text: "Keşke hiç olmasaydı", score: 0 }
        ]
    },
    {
        id: 2,
        domain: DOMAINS.ATTITUDE,
        text: "Günlük hayatta matematikle karşılaştığında (örneğin market, oyun, para hesabı) ne hissedersin?",
        image: "attitude_2.webp",
        imageAlt: "Günlük hayatta matematik kullanımı",
        multipleChoice: false,
        options: [
            { id: 'a', text: "İlginç buluyorum, düşünmekten hoşlanıyorum", score: 100 },
            { id: 'b', text: "Normal, herkes yapıyor zaten", score: 60 },
            { id: 'c', text: "Fark etmiyorum bile", score: 40 },
            { id: 'd', text: "Biraz zorlanıyorum ama hallederim", score: 30 },
            { id: 'e', text: "Kaçınmaya çalışıyorum", score: 0 }
        ]
    },

    // ============ 2. MATEMATİK KAYGISI ============
    {
        id: 3,
        domain: DOMAINS.ANXIETY,
        text: "Matematik sınavından bir gün önce kendini nasıl hissedersin?",
        image: "anxiety_1.webp",
        imageAlt: "Düşünce bulutları ve labirent",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Rahat hissediyorum, hazırlığımı yaptım", score: 100 },
            { id: 'b', text: "Biraz heyecanlıyım ama kontrol altında", score: 75 },
            { id: 'c', text: "Gerginim, aklıma sürekli sınav geliyor", score: 40 },
            { id: 'd', text: "Çok endişeleniyorum, uyuyamıyorum", score: 15 },
            { id: 'e', text: "Panik yapıyorum, hiçbir şey hatırlamayacakmışım gibi", score: 0 }
        ]
    },
    {
        id: 4,
        domain: DOMAINS.ANXIETY,
        text: "Tahtaya kalkıp matematik sorusu çözmeni istediklerinde ne olur?",
        image: "anxiety_2.webp",
        imageAlt: "Sınıf ortamında öğrenci ve tahta",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Sorun yok, göstermeyi severim", score: 100 },
            { id: 'b', text: "Biraz tedirgin olurum ama yaparım", score: 70 },
            { id: 'c', text: "Kalbim hızlanır, ellerim terler", score: 35 },
            { id: 'd', text: "Bilsem de hata yapacakmışım gibi hissederim", score: 20 },
            { id: 'e', text: "Kalkmamak için elimden geleni yaparım", score: 0 }
        ]
    },

    // ============ 3. PROBLEM ÇÖZMEDE ÖZGÜVEN ============
    {
        id: 5,
        domain: DOMAINS.CONFIDENCE,
        text: "Daha önce hiç görmediğin bir matematik sorusuyla karşılaştığında ne düşünürsün?",
        image: "confidence_1.webp",
        imageAlt: "Merdiven basamakları ve zirve",
        multipleChoice: false,
        options: [
            { id: 'a', text: "İlginç, çözmeye çalışayım", score: 100 },
            { id: 'b', text: "Belki çözerim, bir deneyeyim", score: 75 },
            { id: 'c', text: "Zor görünüyor, bilmiyorum", score: 45 },
            { id: 'd', text: "Muhtemelen yapamam", score: 20 },
            { id: 'e', text: "Benim için imkansız, bakmayayım", score: 0 }
        ]
    },
    {
        id: 6,
        domain: DOMAINS.CONFIDENCE,
        text: "Arkadaşların senden matematik konusunda yardım istediğinde ne hissedersin?",
        image: "confidence_2.webp",
        imageAlt: "İki öğrenci birlikte çalışırken",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Yardım edebileceğimi hissediyorum", score: 100 },
            { id: 'b', text: "Deneyebilirim, bildiklerimi anlatırım", score: 75 },
            { id: 'c', text: "Emin değilim, belki yanlış anlatırım", score: 45 },
            { id: 'd', text: "Pek güvenmiyorum kendime", score: 20 },
            { id: 'e', text: "Ben mi? Asla, başkasına sorsunlar", score: 0 }
        ]
    },

    // ============ 4. SEBAT VE ÇABA ============
    {
        id: 7,
        domain: DOMAINS.PERSISTENCE,
        text: "Bir matematik sorusunu çözemediğinde ne yaparsın?",
        image: "persistence_1.webp",
        imageAlt: "Engeller aşan yol",
        multipleChoice: true,
        multipleHint: "Birden fazla seçenek doğru olabilir",
        options: [
            { id: 'a', text: "Farklı yollar denerim", score: 30 },
            { id: 'b', text: "Bir ara verip tekrar bakarım", score: 25 },
            { id: 'c', text: "Birine sorarım", score: 20 },
            { id: 'd', text: "İnternetten araştırırım", score: 20 },
            { id: 'e', text: "Bırakırım, zaman kaybı", score: -10 }
        ]
    },
    {
        id: 8,
        domain: DOMAINS.PERSISTENCE,
        text: "Uzun ve karmaşık bir problem karşısında ne düşünürsün?",
        image: "persistence_2.webp",
        imageAlt: "Uzun bir patika ve hedef",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Parçalara böler, adım adım çözerim", score: 100 },
            { id: 'b', text: "Zor ama denemeye değer", score: 75 },
            { id: 'c', text: "Öğretmen yardım ederse yaparım", score: 50 },
            { id: 'd', text: "Çok uzun, sıkılırım", score: 25 },
            { id: 'e', text: "Bakmam bile", score: 0 }
        ]
    },

    // ============ 5. HATA TOLERANSI ============
    {
        id: 9,
        domain: DOMAINS.ERROR_TOLERANCE,
        text: "Matematik yaparken hata yaptığını fark ettiğinde ne hissedersin?",
        image: "error_1.webp",
        imageAlt: "Silgi ve yeniden başlama",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Normal, düzeltir devam ederim", score: 100 },
            { id: 'b', text: "Biraz canım sıkılır ama sorun değil", score: 75 },
            { id: 'c', text: "Kendime kızarım", score: 40 },
            { id: 'd', text: "Moralim bozulur, devam etmek istemem", score: 20 },
            { id: 'e', text: "Yetersiz hissederim", score: 0 }
        ]
    },
    {
        id: 10,
        domain: DOMAINS.ERROR_TOLERANCE,
        text: "Sınıfta yanlış cevap verdiğinde ne düşünürsün?",
        image: "error_2.webp",
        imageAlt: "Soru işareti ve aydınlanma",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Öğrenmenin bir parçası, sorun değil", score: 100 },
            { id: 'b', text: "Doğrusunu öğrendim ya, iyi oldu", score: 80 },
            { id: 'c', text: "Utanırım ama geçer", score: 50 },
            { id: 'd', text: "Herkes bana baktı, kötü hissettim", score: 25 },
            { id: 'e', text: "Bir daha söz almam", score: 0 }
        ]
    },

    // ============ 6. ÖĞRETMEN-ÖĞRENCİ ETKİLEŞİMİ ============
    {
        id: 11,
        domain: DOMAINS.TEACHER_INTERACTION,
        text: "Matematik dersinde anlamadığın bir şey olduğunda ne yaparsın?",
        image: "teacher_1.webp",
        imageAlt: "Öğretmen ve öğrenci diyaloğu",
        multipleChoice: true,
        multipleHint: "Birden fazla seçenek doğru olabilir",
        options: [
            { id: 'a', text: "Hemen sorarım", score: 30 },
            { id: 'b', text: "Dersten sonra öğretmene giderim", score: 25 },
            { id: 'c', text: "Arkadaşıma sorarım", score: 20 },
            { id: 'd', text: "Kendi başıma anlamaya çalışırım", score: 15 },
            { id: 'e', text: "Sormam, belki alay ederler", score: -10 }
        ]
    },
    {
        id: 12,
        domain: DOMAINS.TEACHER_INTERACTION,
        text: "Matematik öğretmenin sana yardım etmek istediğinde nasıl hissedersin?",
        image: "teacher_2.webp",
        imageAlt: "Destekleyici el uzatma",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Mutlu olurum, faydalı olur", score: 100 },
            { id: 'b', text: "İyi niyetle yaklaşırım", score: 80 },
            { id: 'c', text: "Biraz çekinirim ama kabul ederim", score: 55 },
            { id: 'd', text: "Rahatsız olurum", score: 25 },
            { id: 'e', text: "Zayıf olduğumu düşündüğü için yardım ediyor", score: 0 }
        ]
    },

    // ============ 7. ÖĞRENME STİLİ TERCİHİ ============
    {
        id: 13,
        domain: DOMAINS.LEARNING_STYLE,
        text: "Yeni bir matematik konusunu en iyi nasıl öğrenirsin?",
        image: "style_1.webp",
        imageAlt: "Göz, kulak ve el sembolleri",
        multipleChoice: true,
        multipleHint: "Birden fazla seçenek doğru olabilir",
        options: [
            { id: 'a', text: "Şekil ve grafiklerle görerek", score: 25, style: 'visual' },
            { id: 'b', text: "Öğretmenin anlatımını dinleyerek", score: 25, style: 'auditory' },
            { id: 'c', text: "Kendim yazarak ve çözerek", score: 25, style: 'kinesthetic' },
            { id: 'd', text: "Video izleyerek", score: 20, style: 'visual' },
            { id: 'e', text: "Arkadaşlarımla tartışarak", score: 20, style: 'social' }
        ]
    },
    {
        id: 14,
        domain: DOMAINS.LEARNING_STYLE,
        text: "Ders çalışırken hangi yöntemi tercih edersin?",
        image: "style_2.webp",
        imageAlt: "Farklı çalışma ortamları",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Renkli notlar ve şemalar hazırlarım", score: 80, style: 'visual' },
            { id: 'b', text: "Sesli tekrar yaparım veya dinlerim", score: 80, style: 'auditory' },
            { id: 'c', text: "Bolca soru çözerim", score: 80, style: 'kinesthetic' },
            { id: 'd', text: "Özet çıkarır, formülleri yazarım", score: 70, style: 'reading' },
            { id: 'e', text: "Farklı yöntemler denerim duruma göre", score: 100, style: 'mixed' }
        ]
    },

    // ============ 8. ANLAMA VS EZBERLEME ============
    {
        id: 15,
        domain: DOMAINS.UNDERSTANDING,
        text: "Bir formülü öğrenirken ne yaparsın?",
        image: "understanding_1.webp",
        imageAlt: "Puzzle parçaları ve bütünleşme",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Nereden geldiğini ve neden çalıştığını anlamaya çalışırım", score: 100 },
            { id: 'b', text: "Önce ezberler, sonra anlamaya çalışırım", score: 60 },
            { id: 'c', text: "Örneklerde nasıl kullanıldığına bakarım", score: 75 },
            { id: 'd', text: "Sadece ezberlerim, işe yarıyor", score: 30 },
            { id: 'e', text: "Formül kartı yapar sınava götürürüm (izin verilirse)", score: 10 }
        ]
    },
    {
        id: 16,
        domain: DOMAINS.UNDERSTANDING,
        text: "Matematikte \"neden\" sorusu sormak senin için önemli mi?",
        image: "understanding_2.webp",
        imageAlt: "Soru işaretleri ve ışık",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Evet, mantığını anlamadan rahat edemem", score: 100 },
            { id: 'b', text: "Bazen sorarım, merak edersem", score: 70 },
            { id: 'c', text: "Çok değil, sonuç doğru olsun yeter", score: 40 },
            { id: 'd', text: "Hayır, \"nasıl\" yapılacağını bilmek yeterli", score: 20 },
            { id: 'e', text: "Hep soruyorum ama cevap alamıyorum", score: 60 }
        ]
    },

    // ============ 9. MOTİVASYON KAYNAĞI ============
    {
        id: 17,
        domain: DOMAINS.MOTIVATION,
        text: "Matematik çalışmak için seni en çok ne motive eder?",
        image: "motivation_1.webp",
        imageAlt: "İç ışık ve dış ödüller",
        multipleChoice: true,
        multipleHint: "Birden fazla seçenek doğru olabilir",
        options: [
            { id: 'a', text: "Problemi çözmenin verdiği mutluluk", score: 30, type: 'intrinsic' },
            { id: 'b', text: "Yüksek not almak", score: 20, type: 'extrinsic' },
            { id: 'c', text: "Ailemi mutlu etmek", score: 15, type: 'extrinsic' },
            { id: 'd', text: "Gelecekte iyi bir meslek sahibi olmak", score: 20, type: 'extrinsic' },
            { id: 'e', text: "Matematiğin kendisi ilginç geliyor", score: 30, type: 'intrinsic' }
        ]
    },
    {
        id: 18,
        domain: DOMAINS.MOTIVATION,
        text: "Zor bir soruyu çözdüğünde ne hissedersin?",
        image: "motivation_2.webp",
        imageAlt: "Başarı anı ve kutlama",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Büyük bir mutluluk ve gurur", score: 100 },
            { id: 'b', text: "Rahatlamış hissederim", score: 70 },
            { id: 'c', text: "İyi oldu, bir sonrakine geçeyim", score: 50 },
            { id: 'd', text: "Şanslıydım galiba", score: 25 },
            { id: 'e', text: "Bir şey hissetmiyorum özellikle", score: 10 }
        ]
    },

    // ============ 10. ÖZ-DÜZENLEME ============
    {
        id: 19,
        domain: DOMAINS.SELF_REGULATION,
        text: "Matematik çalışmaya nasıl başlarsın?",
        image: "regulation_1.webp",
        imageAlt: "Takvim, saat ve plan",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Önceden plan yapar, neyi ne zaman çalışacağımı bilirim", score: 100 },
            { id: 'b', text: "Kabaca bir fikrim olur, ona göre başlarım", score: 75 },
            { id: 'c', text: "O anki ruh halime göre karar veririm", score: 45 },
            { id: 'd', text: "Son dakikaya kadar beklerim genelde", score: 20 },
            { id: 'e', text: "Biri hatırlatmazsa başlamam", score: 5 }
        ]
    },
    {
        id: 20,
        domain: DOMAINS.SELF_REGULATION,
        text: "Ders çalışırken dikkatini toplamakta zorlanır mısın?",
        image: "regulation_2.webp",
        imageAlt: "Odaklanma ve dikkat dağıtıcılar",
        multipleChoice: false,
        options: [
            { id: 'a', text: "Hayır, odaklanmak benim için kolay", score: 100 },
            { id: 'b', text: "Bazen zorlanırım ama toparlarım", score: 75 },
            { id: 'c', text: "Telefon/bilgisayar varsa zorlanırım", score: 50 },
            { id: 'd', text: "Evet, sık sık dikkatim dağılır", score: 25 },
            { id: 'e', text: "Çok zorlanıyorum, çabuk sıkılıyorum", score: 10 }
        ]
    }
];

export default questions;
