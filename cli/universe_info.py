#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Evrenin Yapıtaşı: Maddeden Yazılıma (From Matter to Bit)
Kapsamlı Teorik Fizik & Dijital Ontoloji Hesaplama CLI Aracı
"""

import math
import sys
import json
from typing import Dict, Any, List

# Temel Fiziksel Sabitler (SI)
C = 299792458.0              # Işık hızı (m/s)
G = 6.67430e-11              # Çekim sabiti (m^3 kg^-1 s^-2)
HBAR = 1.054571817e-34       # İndirgenmiş Planck sabiti (J*s)
H = 6.62607015e-34           # Planck sabiti (J*s)
KB = 1.380649e-23            # Boltzmann sabiti (J/K)
LP = 1.616255e-35            # Planck uzunluğu (m)
TP = 5.391247e-44            # Planck zamanı (s)
MP = 2.176434e-8             # Planck kütlesi (kg)
SOLAR_MASS = 1.98847e30      # Güneş kütlesi (kg)
EV_JOULE = 1.602176634e-19   # 1 eV (Joule)

COSMIC_SCALES_DATA: List[Dict[str, Any]] = [
    {"name": "Planck Scale", "size_m": 1.616e-35, "mass_kg": 2.176e-8, "bits": 1},
    {"name": "Top Quark", "size_m": 1.0e-18, "mass_kg": 3.08e-25, "bits": 8},
    {"name": "Proton", "size_m": 8.41e-16, "mass_kg": 1.672e-27, "bits": 32},
    {"name": "Hydrogen Atom", "size_m": 1.06e-10, "mass_kg": 1.673e-27, "bits": 100},
    {"name": "Human DNA Helix", "size_m": 2.0e-9, "mass_kg": 1.0e-21, "bits": 6.4e9},
    {"name": "Human Brain Neuron", "size_m": 2.0e-5, "mass_kg": 1.0e-12, "bits": 1.0e12},
    {"name": "Human Body", "size_m": 1.75, "mass_kg": 70.0, "bits": 1.0e28},
    {"name": "Planet Earth", "size_m": 1.274e7, "mass_kg": 5.972e24, "bits": 1.0e51},
    {"name": "Sun (Star)", "size_m": 1.392e9, "mass_kg": 1.989e30, "bits": 1.0e57},
    {"name": "Milky Way Galaxy", "size_m": 9.46e20, "mass_kg": 1.5e42, "bits": 1.0e69},
    {"name": "Observable Universe", "size_m": 8.8e26, "mass_kg": 1.0e54, "bits": 1.0e92},
]


def black_hole_properties(mass_kg: float) -> Dict[str, float]:
    """Kara deliğin Schwarzschild yarıçapı, olay ufku alanı ve Bekenstein-Hawking entropisi."""
    rs = (2.0 * G * mass_kg) / (C ** 2)
    area = 4.0 * math.pi * (rs ** 2)
    entropy_jk = (KB * (C ** 3) * area) / (4.0 * G * HBAR)
    bits = entropy_jk / (KB * math.log(2.0))
    temp_k = (HBAR * (C ** 3)) / (8.0 * math.pi * G * mass_kg * KB)
    evap_time_sec = (5120.0 * math.pi * (G ** 2) * (mass_kg ** 3)) / (HBAR * (C ** 4))
    return {
        "schwarzschild_radius_m": rs,
        "area_m2": area,
        "entropy_jk": entropy_jk,
        "information_bits": bits,
        "hawking_temp_k": temp_k,
        "evaporation_time_sec": evap_time_sec,
    }


def landauer_limit(temp_kelvin: float, bits: float = 1.0) -> float:
    """1 bit bilginin silinmesi için harcanması gereken asgari enerji (Joule)."""
    return KB * temp_kelvin * math.log(2.0) * bits


def bostrom_simulation_prob(fp: float, ni: float, fi: float = 1.0) -> float:
    """Bostrom Simülasyon Argümanı Bayesyen olasılığı."""
    if fp <= 0 or ni <= 0:
        return 0.0
    num = fp * ni * fi
    return num / (num + 1.0)


def margolus_levitin_speed_limit(energy_joules: float) -> Dict[str, float]:
    """Margolus-Levitin kuantum hız sınırı ve saniyedeki maksimum mantıksal işlem sayısı."""
    if energy_joules <= 0:
        return {"min_delta_t_sec": float("inf"), "max_ops_per_sec": 0.0}
    min_dt = (math.pi * HBAR) / (2.0 * energy_joules)
    max_ops = (2.0 * energy_joules) / (math.pi * HBAR)
    return {"min_delta_t_sec": min_dt, "max_ops_per_sec": max_ops}


def bell_chsh_correlation(theta_a_rad: float, theta_b_rad: float) -> float:
    """Singlet durumu foton polarizasyonu kuantum korelasyonu E(θ_A, θ_B) = -cos(2*(θ_A - θ_B))."""
    return -math.cos(2.0 * (theta_a_rad - theta_b_rad))


def chsh_inequality(a: float, a_prime: float, b: float, b_prime: float) -> Dict[str, Any]:
    """CHSH Eşitsizliği testi: S = |E(a,b) - E(a,b') + E(a',b) + E(a',b')|"""
    e1 = bell_chsh_correlation(a, b)
    e2 = bell_chsh_correlation(a, b_prime)
    e3 = bell_chsh_correlation(a_prime, b)
    e4 = bell_chsh_correlation(a_prime, b_prime)
    s_val = abs(e1 - e2 + e3 + e4)
    return {
        "E1": e1, "E2": e2, "E3": e3, "E4": e4,
        "S": s_val,
        "violates_local_realism": s_val > 2.0,
        "tsirelson_bound": 2.0 * math.sqrt(2.0)
    }


def format_sci(val: float, digits: int = 3) -> str:
    if val == 0:
        return "0"
    if 0.001 <= abs(val) < 1e6:
        return f"{val:.{digits}f}"
    return f"{val:.{digits}e}"


def print_banner():
    print("=" * 70)
    print("🌌 EVRENİN YAPITAŞI: MADDEDEN YAZILIMA (From Matter to Bit)")
    print("   Teorik Fizik, Kuantum Dolanıklık & Dijital Ontoloji CLI Aracı")
    print("=" * 70)


def run_interactive():
    print_banner()
    while True:
        print("\n--- MENÜ ---")
        print("1. Kara Delik Bilgi Kapasitesi & Entropi (Bekenstein-Hawking)")
        print("2. Landauer Bilgi Silme Enerji Sınırı (E = k_B T ln 2)")
        print("3. Bostrom Simülasyon Olasılığı (Trilemma)")
        print("4. Margolus-Levitin Kuantum Hız Sınırı")
        print("5. Kuantum Dolanıklık & Bell CHSH Eşitsizlik Testi")
        print("6. Kozmik Ölçekler & Bilgi Hiyerarşisi (Seth Lloyd)")
        print("7. Seth Lloyd Evrensel Kuantum Bilgisayarı Özeti")
        print("8. Çıkış")
        
        choice = input("\nSeçiminiz (1-8): ").strip()
        if choice == "1":
            try:
                m_sun = float(input("Kara Delik Kütlesi (Güneş Kütlesi, örn 1, 4.3e6 [Sgr A*], 6.5e9 [M87*]): ") or "1")
                mass_kg = m_sun * SOLAR_MASS
                res = black_hole_properties(mass_kg)
                print("\n--- SONUÇLAR ---")
                print(f"Kütle: {format_sci(mass_kg)} kg ({m_sun} M☉)")
                print(f"Schwarzschild Yarıçapı: {format_sci(res['schwarzschild_radius_m'] / 1000)} km")
                print(f"Olay Ufku Alanı: {format_sci(res['area_m2'])} m²")
                print(f"Bekenstein-Hawking Entropisi: {format_sci(res['entropy_jk'])} J/K")
                print(f"Depolanan Bilgi: {format_sci(res['information_bits'])} bit (~{format_sci(res['information_bits'] / (8 * 1e12))} TB)")
                print(f"Hawking Sıcaklığı: {format_sci(res['hawking_temp_k'])} Kelvin")
                print(f"Buharlaşma Süresi: {format_sci(res['evaporation_time_sec'] / (365.25 * 86400))} Yıl")
            except ValueError:
                print("Geçersiz sayı girdiniz.")
        elif choice == "2":
            try:
                temp_k = float(input("Sıcaklık (Kelvin, örn 300 veya 2.73): ") or "300")
                bits = float(input("Silinecek Bit Sayısı (örn 1 veya 1e12): ") or "1")
                e = landauer_limit(temp_k, bits)
                print("\n--- SONUÇLAR ---")
                print(f"Sıcaklık: {temp_k} K")
                print(f"Bit: {format_sci(bits)}")
                print(f"Minimum Enerji (Landauer): {format_sci(e)} Joule")
                print(f"Elektronvolt Cinsinden: {format_sci(e / EV_JOULE)} eV")
            except ValueError:
                print("Geçersiz sayı girdiniz.")
        elif choice == "3":
            try:
                fp = float(input("f_p (Post-insan çağına ulaşma oranı, örn 0.5): ") or "0.5")
                ni = float(input("N_I (Çalıştırılan simülasyon sayısı, örn 1000): ") or "1000")
                prob = bostrom_simulation_prob(fp, ni)
                print("\n--- SONUÇLAR ---")
                print(f"f_p = {fp}, N_I = {ni}")
                print(f"Simülasyonda Yaşama Olasılığı P(Sim): %{prob * 100:.6f}")
            except ValueError:
                print("Geçersiz sayı girdiniz.")
        elif choice == "4":
            try:
                energy_j = float(input("Sistem Enerjisi (Joule, örn 1.0 veya 1e-19): ") or "1.0")
                lim = margolus_levitin_speed_limit(energy_j)
                print("\n--- SONUÇLAR ---")
                print(f"Durum Değişim Asgari Süresi: {format_sci(lim['min_delta_t_sec'])} saniye")
                print(f"Saniyedeki Maksimum Mantıksal İşlem: {format_sci(lim['max_ops_per_sec'])} ops/sec")
            except ValueError:
                print("Geçersiz sayı girdiniz.")
        elif choice == "5":
            try:
                deg_a = float(input("Alice Açısı (Derece, örn 0): ") or "0")
                deg_b = float(input("Bob Açısı (Derece, örn 45): ") or "45")
                rad_a = math.radians(deg_a)
                rad_b = math.radians(deg_b)
                corr = bell_chsh_correlation(rad_a, rad_b)
                chsh = chsh_inequality(rad_a, rad_a + math.pi / 4, rad_b, rad_b + math.pi / 4)
                print("\n--- SONUÇLAR ---")
                print(f"Kuantum Korelasyonu E(θ_A, θ_B): {corr:.4f}")
                print(f"CHSH S Değeri: {chsh['S']:.4f} (Klasik Sınır: S ≤ 2, Kuantum Tsirelson: S = 2√2 ≈ 2.828)")
                print(f"Yerel Gerçekçilik İhlali: {'EVET (Kuantum Dolanıklık Kanıtlandı)' if chsh['violates_local_realism'] else 'HAYIR'}")
            except ValueError:
                print("Geçersiz sayı girdiniz.")
        elif choice == "6":
            print("\n--- KOZMİK ÖLÇEKLER VE BİLGİ HİYERARŞİSİ ---")
            print(f"{'Ölçek':<25} {'Boyut (m)':<15} {'Kütle (kg)':<15} {'Bilgi (Bit)':<15}")
            print("-" * 70)
            for item in COSMIC_SCALES_DATA:
                print(f"{item['name']:<25} {format_sci(item['size_m']):<15} {format_sci(item['mass_kg']):<15} {format_sci(item['bits']):<15}")
        elif choice == "7":
            print("\n--- SETH LLOYD: EVRENSEL KUANTUM BİLGİSAYARI (2002/2006) ---")
            print("Evrenin Yaşı: ~13.8 Milyar Yıl")
            print("Toplam Kütle-Enerji: ~10^54 kg (~10^71 Joule)")
            print("Büyük Patlamadan Beri Yapılan Toplam Kuantum İşlemi (N_op): ~ 10^122 İşlem")
            print("Evrende Kayıtlı Maksimum Bilgi (I_univ): ~ 10^92 Bit")
            print("Sonuç: Doğa bir bilgisayar gibi davranmaz; bizzat kendini hesaplayan bir kuantum bilgisayarıdır.")
        elif choice == "8":
            print("Görüşmek üzere!")
            break
        else:
            print("Geçersiz seçim.")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "--test":
            print("Self-test modu çalıştırılıyor...")
            bh = black_hole_properties(SOLAR_MASS)
            assert bh["schwarzschild_radius_m"] > 2900
            assert landauer_limit(300) > 0
            assert bostrom_simulation_prob(0.5, 1000) > 0.99
            chsh = chsh_inequality(0, math.pi / 4, math.pi / 8, 3 * math.pi / 8)
            assert chsh["S"] > 2.0
            print("Tüm self-test testleri başarıyla geçti!")
        elif sys.argv[1] == "--json":
            data = {
                "constants": {"c": C, "G": G, "hbar": HBAR, "kB": KB, "lP": LP},
                "solar_black_hole": black_hole_properties(SOLAR_MASS),
                "scales": COSMIC_SCALES_DATA
            }
            print(json.dumps(data, indent=2))
        else:
            run_interactive()
    else:
        run_interactive()
