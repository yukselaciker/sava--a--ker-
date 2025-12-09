# Savaş Açıker - Matematik Koçluğu Website

Premium, responsive tek sayfa web sitesi.

## 🚀 Kullanım

`index.html` dosyasını tarayıcınızda açın. Sunucu gerektirmez.

## 🎨 Özelleştirme

### Metin Değişiklikleri

Tüm içerik Türkçedir ve `index.html` içinde doğrudan düzenlenebilir:

| Bölüm | Satır Aralığı | Açıklama |
|-------|---------------|----------|
| Hero | ~45-60 | Ana başlık ve alt metin |
| İstatistikler | ~68-74 | Yıl, öğrenci sayısı, başarı oranı |
| Hakkımda | ~79-90 | Biyografi ve özellikler |
| Programlar | ~97-130 | Kurs kartları |
| Yorumlar | ~137-165 | Öğrenci referansları |
| SSS | ~173-195 | Soru-cevaplar |
| İletişim | ~200-230 | Form ve telefon |

### Renk Değişiklikleri

`tailwind.config` içinde (satır 18-25):

```javascript
colors: {
    'primary': '#0f172a',      // Arka plan
    'accent': '#6366f1',       // Ana vurgu rengi
    'accent-light': '#818cf8', // Hover rengi
}
```

### Telefon Numarası

Aşağıdaki satırlarda değiştirin:
- Navbar: `tel:+905399270956`
- Contact: `tel:+905399270956` ve `wa.me/905399270956`

### Font Değişiklikleri

Google Fonts linkini (satır 10) ve `fontFamily` config'ini güncelleyin.

## 📱 Responsive

- **Mobil**: < 768px (hamburger menü aktif)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Teknolojiler

- HTML5
- TailwindCSS (CDN)
- Vanilla JavaScript (menü ve FAQ)

---

© 2025 Savaş Açıker
