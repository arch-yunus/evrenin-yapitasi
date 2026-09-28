# 4. Matematiksel Modeller, Fiziksel Sabitler ve Formüller

## 1. Temel Evrensel Sabitler (SI Birimleri)

| Sabit | Sembol | Değer | Birim |
| :--- | :--- | :--- | :--- |
| **Işık Hızı (Vakumda)** | $c$ | $2.99792458 \times 10^8$ | $\text{m/s}$ |
| **Yerçekimi Sabiti** | $G$ | $6.67430 \times 10^{-11}$ | $\text{m}^3\text{kg}^{-1}\text{s}^{-2}$ |
| **Planck Sabiti** | $h$ | $6.62607015 \times 10^{-34}$ | $\text{J}\cdot\text{s}$ |
| **İndirgenmiş Planck Sabiti** | $\hbar = h / 2\pi$ | $1.054571817 \times 10^{-34}$ | $\text{J}\cdot\text{s}$ |
| **Boltzmann Sabiti** | $k_B$ | $1.380649 \times 10^{-23}$ | $\text{J/K}$ |
| **Planck Uzunluğu** | $\ell_P = \sqrt{\frac{\hbar G}{c^3}}$ | $1.616255 \times 10^{-35}$ | $\text{m}$ |
| **Planck Zamanı** | $t_P = \sqrt{\frac{\hbar G}{c^5}}$ | $5.391247 \times 10^{-44}$ | $\text{s}$ |
| **Planck Kütlesi** | $m_P = \sqrt{\frac{\hbar c}{G}}$ | $2.176434 \times 10^{-8}$ | $\text{kg}$ |

---

## 2. Kilit Denklemler ve Çıkarımları

### 2.1. Kütle-Enerji Eşdeğerliği
$$E = mc^2 \implies m = \frac{E}{c^2}$$
Maddenin enerjiye, enerjinin maddeye dönüşümünün matematiksel katsayısı ışık hızının karesidir ($c^2 \approx 8.987 \times 10^{16} \text{ m}^2/\text{s}^2$).

### 2.2. Bekenstein-Hawking Kara Delik Entropisi
$$S_{BH} = \frac{k_B c^3 A}{4 G \hbar} = \frac{k_B A}{4 \ell_P^2}$$
* $A = 4\pi r_s^2$: Olay ufkunun küresel yüzey alanı
* $r_s = \frac{2GM}{c^2}$: Schwarzschild yarıçapı
* Bilgi Kapasitesi (bit):
$$I = \frac{S_{BH}}{k_B \ln 2} = \frac{A}{4 \ell_P^2 \ln 2}$$
Bir kara deliğin olay ufkundaki her $4 \ell_P^2 \ln 2$ alanlık bölge (yaklaşık 1 Planck pikseli) tam olarak **1 bit** bilgi taşır.

### 2.3. Landauer Silme Sınırı
$$E_{\text{min}} = k_B T \ln 2$$
* $T = 300\text{ K}$ (oda sıcaklığı): $E_{\text{min}} \approx 2.87 \times 10^{-21} \text{ Joule}$
* $T = 2.73\text{ K}$ (Kozmik Mikrodalga Arka Plan Işıması): $E_{\text{min}} \approx 2.61 \times 10^{-23} \text{ Joule}$

### 2.4. Margolus-Levitin Kuantum Hız Sınırı
Bir kuantum sisteminin durumunu dik (ortogonal) bir duruma geçirmesi için gereken asgari süre:
$$\Delta t \ge \frac{\pi \hbar}{2 E}$$
Buna bağlı olarak $E$ ortalama enerjisine sahip bir sistemin saniyede yapabileceği maksimum mantıksal işlem sayısı:
$$R_{\text{max}} = \frac{2 E}{\pi \hbar}$$

### 2.5. Wolfram Hücresel Otomat Geçiş Fonksiyonu
1-Boyutlu 3-hücre komşuluklu hücresel otomat kural fonksiyonu:
$$s_i^{(t+1)} = f(s_{i-1}^{(t)}, s_i^{(t)}, s_{i+1}^{(t)})$$
8 olası komşuluk konfigürasyonunun her biri için bir sonraki durum belirlenerek $2^8 = 256$ farklı kural üretilir (örn. Kural 30, Kural 110).
