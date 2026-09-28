#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Evrenin Yapıtaşı: Maddeden Yazılıma (From Matter to Bit)
Python CLI & Hesaplama Aracı
"""

import math
import sys

# Temel Fiziksel Sabitler (SI)
C = 299792458.0              # Işık hızı (m/s)
G = 6.67430e-11              # Çekim sabiti (m^3 kg^-1 s^-2)
HBAR = 1.054571817e-34       # İndirgenmiş Planck sabiti (J*s)
KB = 1.380649e-23            # Boltzmann sabiti (J/K)
LP = 1.616255e-35            # Planck uzunluğu (m)
SOLAR_MASS = 1.98847e30      # Güneş kütlesi (kg)


def black_hole_properties(mass_kg: float):
    """Kara deliğin Schwarzschild yarıçapı, olay ufku alanı ve Bekenstein-Hawking entropisi."""
    rs = (2.0 * G * mass_kg) / (C ** 2)
    area = 4.0 * math.pi * (rs ** 2)
    entropy_jk = (KB * (C ** 3) * area) / (4.0 * G * HBAR)
    bits = entropy_jk / (KB * math.log(2.0))
    temp_k = (HBAR * (C ** 3)) / (8.0 * math.pi * G * mass_kg * KB)
    return {
        "schwarzschild_radius_m": rs,
        "area_m2": area,
        "entropy_jk": entropy_jk,
        "information_bits": bits,
        "hawking_temp_k": temp_k,
    }


def landauer_limit(temp_kelvin: float, bits: float = 1.0) -> float:
    """1 bit bilginin silinmesi için harcanması gereken asgari enerji (Joule)."""
    return KB * temp_kelvin * math.log(2.0) * bits


def bostrom_simulation_prob(fp: float, ni: float) -> float:
    """Bostrom Simülasyon Argümanı Bayesyen olasılığı."""
    if fp <= 0 or ni <= 0:
        return 0.0
    num = fp * ni
    return num / (num + 1.0)


def format_sci(val: float, digits: int = 3) -> str:
    if val == 0:
        return "0"
    if 0.001 <= abs(val) < 1e6:
        return f"{val:.{digits}f}"
    return f"{val:.{digits}e}"


def print_banner():
    print("=" * 65)
    print("🌌 EVRENİN YAPITAŞI: MADDEDEN YAZILIMA (From Matter to Bit)")
    print("   Teorik Fizik & Dijital Ontoloji Hesaplama Aracı")
    print("=" * 65)


def run_interactive():
    print_banner()
    while True:
        print("\nMenü:")
        print("1. Kara Delik Bilgi Kapasitesi & Entropi Hesapla (Bekenstein-Hawking)")
        print("2. Landauer Bilgi Silme Enerji Sınırı Hesapla (E = k_B T ln 2)")
        print("3. Bostrom Simülasyon Olasılığı Hesapla (Trilemma)")
        print("4. Seth Lloyd Evrensel Kuantum Hesaplama Özeti")
        print("5. Çıkış")
        
        choice = input("\nSeçiminiz (1-5): ").strip()
        if choice == "1":
            try:
                m_sun = float(input("Kara Delik Kütlesi (Güneş Kütlesi cinsinden, örn 1 veya 10): ") or "1")
                mass_kg = m_sun * SOLAR_MASS
                res = black_hole_properties(mass_kg)
                print("\n--- SONUÇLAR ---")
                print(f"Kütle: {format_sci(mass_kg)} kg ({m_sun} Güneş Kütlesi)")
                print(f"Schwarzschild Yarıçapı: {format_sci(res['schwarzschild_radius_m'])} m")
                print(f"Olay Ufku Alanı: {format_sci(res['area_m2'])} m²")
                print(f"Bekenstein-Hawking Entropisi: {format_sci(res['entropy_jk'])} J/K")
                print(f"Depolanan Bilgi: {format_sci(res['information_bits'])} bit ({format_sci(res['information_bits'] / (8 * 1e9))} GB)")
                print(f"Hawking Sıcaklığı: {format_sci(res['hawking_temp_k'])} Kelvin")
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
                print(f"Minimum Enerji Tüketimi (Landauer): {format_sci(e)} Joule")
                print(f"Elektronvolt Cinsinden: {format_sci(e / 1.602176634e-19)} eV")
            except ValueError:
                print("Geçersiz sayı girdiniz.")
        elif choice == "3":
            try:
                fp = float(input("f_p (Uygarlıkların simülasyon çağına ulaşma oranı, 0..1 arası, örn 0.5): ") or "0.5")
                ni = float(input("N_I (Çalıştırılan ortalama simülasyon sayısı, örn 1000): ") or "1000")
                prob = bostrom_simulation_prob(fp, ni)
                print("\n--- SONUÇLAR ---")
                print(f"f_p = {fp}, N_I = {ni}")
                print(f"Bir Simülasyonda Yaşama Olasılığı P(Sim): %{prob * 100:.6f}")
            except ValueError:
                print("Geçersiz sayı girdiniz.")
        elif choice == "4":
            print("\n--- SETH LLOYD: EVRENSEL KUANTUM BİLGİSAYARI (2002/2006) ---")
            print("Evrenin Yaşı: ~13.8 Milyar Yıl")
            print("Toplam Enerji (Kozmolojik Ufuk): ~10^54 kg (E = M c^2 ~ 10^71 Joule)")
            print("Büyük Patlamadan Beri Yapılan Toplam Kuantum İşlemi (N_op): ~ 10^122 İşlem")
            print("Evrende Kayıtlı Maksimum Bilgi (I_univ): ~ 10^92 Bit")
            print("Tüm fiziksel etkileşimler kuantum mantık kapılarının çalışmasıdır.")
        elif choice == "5":
            print("Görüşmek üzere!")
            break
        else:
            print("Geçersiz seçim.")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        print("Self-test modu...")
        assert black_hole_properties(SOLAR_MASS)["schwarzschild_radius_m"] > 2900
        assert landauer_limit(300) > 0
        assert bostrom_simulation_prob(0.5, 1000) > 0.99
        print("Tüm testler başarılı!")
    else:
        run_interactive()
