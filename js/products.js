/**
 * Format numerical price to Indonesian Rupiah (Rp)
 */
window.formatRupiah = function formatRupiah(amount) {
  if (!amount && amount !== 0) return 'Rp 0';
  return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
}

/**
 * HOWELL Official Master Product Catalog Data Store
 * Brand: HOWELL (PT Howell Niaga Indonesia) - Est. 2009
 * Images: Fully mapped to assets/Produk/Produk Batch 1/ (137 Verified Products)
/**
 * HOWELL Official Master Catalog - Master ERP Qty per Carton Data
 * Extracted directly from PT. Howell Niaga Indonesia ERP Inventory Management System
 */
const HOWELL_SKU_CARTON = {
  // 1. HDMI 4K High Speed (H0103 - H0110)
  "H0103": 125,   // 1.5M (BIZGO: 125)
  "H0104": 100,   // 2M (BIZGO: 100)
  "H0105": 75,    // 3M (BIZGO: 75)
  "H0106": 50,    // 5M (BIZGO: 50)
  "H0107": 25,    // 10M fallback
  "H0108": 25,    // 10M (BIZGO: 25)
  "H0109": 15,    // 15M (BIZGO: 15)
  "H0110": 12,    // 20M (BIZGO: 12)

  // 2. HDMI 4K Gold Premium Shell (H0203 - H0210)
  "H0203": 120,   // 1.5M (BIZGO: 120)
  "H0204": 100,   // 2M (BIZGO: 100)
  "H0205": 70,    // 3M (BIZGO: 70)
  "H0206": 40,    // 5M (BIZGO: 40)
  "H0207": 25,    // 10M fallback
  "H0208": 25,    // 10M (BIZGO: 25)
  "H0209": 12,    // 15M (BIZGO: 12)
  "H0210": 8,     // 20M (BIZGO: 8)

  // 3. HDMI 4K Pure Copper Core (H0303 - H0310)
  "H0303": 125,   // 1.5M (BIZGO: 125)
  "H0304": 100,   // 2M (BIZGO: 100)
  "H0305": 75,    // 3M (BIZGO: 75)
  "H0306": 35,    // 5M (BIZGO: 35)
  "H0307": 20,    // 10M fallback
  "H0308": 20,    // 10M (BIZGO: 20)
  "H0309": 15,    // 15M (BIZGO: 15)
  "H0310": 8,     // 20M (BIZGO: 8)

  // 4. HDMI 8K 60Hz Ultra Gold (H0403 - H0408)
  "H0403": 96,    // 1.5M (BIZGO: 96)
  "H0404": 96,    // 2M (BIZGO: 96)
  "H0405": 51,    // 3M (BIZGO: 51)
  "H0406": 51,    // 5M (BIZGO: 51)
  "H0407": 51,    // 10M fallback
  "H0408": 51,    // 10M (BIZGO: 51)

  // 5. HDMI 8K 60Hz Ultra Core (H0503 - H0508)
  "H0503": 96,    // 1.5M (BIZGO: 96)
  "H0504": 96,    // 2M (BIZGO: 96)
  "H0505": 51,    // 3M (BIZGO: 51)
  "H0506": 51,    // 5M (BIZGO: 51)
  "H0507": 15,    // 10M fallback
  "H0508": 15,    // 10M (BIZGO: 15)

  // 6. Active Optical Fiber HDMI 8K (H0601 - H0612)
  "H0601": 51,    // 10M (BIZGO: 51)
  "H0602": 51,    // 15M (BIZGO: 51)
  "H0603": 15,    // 20M (BIZGO: 15)
  "H0604": 15,    // 25M (BIZGO: 15)
  "H0605": 15,    // 30M (BIZGO: 15)
  "H0606": 10,    // 40M (BIZGO: 10)
  "H0607": 10,    // 50M (BIZGO: 10)
  "H0608": 6,     // 60M (BIZGO: 6)
  "H0609": 6,     // 80M (BIZGO: 6)
  "H0610": 6,     // 100M (BIZGO: 6)
  "H0611": 2,     // 150M (BIZGO: 2)
  "H0612": 2,     // 200M (BIZGO: 2)

  // 7. Specialty HDMI
  "H0703": 120,   // Slim 2M (BIZGO: 120)
  "H0803": 65,    // 90D Angle 2M (BIZGO: 65)
  "H0903": 96,    // Braided 2M (BIZGO: 96)
  "H1003": 100,   // Slim 2M (BIZGO: 100)
  "H1007": 12,    // Flat 20M (BIZGO: 12)
  "H1101": 100,   // Slim 1M (BIZGO: 100)
  "H1102": 100,   // Slim 2M (BIZGO: 100)
  "H1103": 100,   // Zinc Alloy 2M (BIZGO: 100)
  "H1182": 100,   // AM/AF 2M (BIZGO: 100)
  "H1202": 100,
  "H1303": 100,   // Armor 2M (BIZGO: 100)
  "H1401": 80,    // Patch Jumper / M-F 0.5M (BIZGO: 80)
  "H1402": 80,    // 2M (BIZGO: 80)
  "H1431": 80,
  "H1601": 120,   // Spring 1.5M (BIZGO: 120)
  "H1603": 80,    // Pro 2M (BIZGO: 80)
  "H1702": 100,
  "H1703": 100,   // 24K Gold 2M (BIZGO: 100)
  "H1803": 80,    // Dynamic HDR 2M (BIZGO: 80)
  "H2001": 120,   // Portable 1.5M (BIZGO: 120)
  "H2103": 100,   // Studio Broadcast 2M (BIZGO: 100)
  "H2201": 100,   // 16K 1M (BIZGO: 100)
  "H2202": 200,   // 16K 1.5M (BIZGO: 200)
  "H2203": 200,   // 16K 2M (BIZGO: 200)
  "H2204": 144,   // 16K 3M (BIZGO: 144)
  "H2301": 12,    // 8K FO 20M (BIZGO: 12)
  "H2302": 12,    // 8K FO 30M (BIZGO: 12)
  "H2303": 12,    // 8K FO 20M (BIZGO: 12)
  "H2401": 12,
  "H2403": 12,    // 8K FO 20M (BIZGO: 12)
  "H2503": 12,    // 8K FO 20M (BIZGO: 12)
  "H2602": 12,
  "H2603": 12,    // 8K FO 20M (BIZGO: 12)
  "H2701": 12,
  "H2702": 12,
  "H2703": 12,    // 8K FO 20M (BIZGO: 12)
  "H2803": 12,    // 8K FO 20M (BIZGO: 12)
  "H2903": 12,    // 8K FO 20M (BIZGO: 12)
  "H3003": 12,    // 8K FO 20M (BIZGO: 12)
  "H3103": 12,    // 8K FO 20M (BIZGO: 12)
  "H3203": 12,    // 8K FO 20M (BIZGO: 12)
  "H3303": 12,    // 8K FO 20M (BIZGO: 12)
  "H3403": 12,    // 8K FO 20M (BIZGO: 12)
  "H3503": 12,    // 8K FO 20M (BIZGO: 12)

  // HDMI Micro / Mini
  "DH0103": 120,  // Micro Slim 2M (BIZGO: 120)
  "DH0203": 120,  // Micro Slim 2M (BIZGO: 120)
  "DH0301": 120,  // Spring Micro 1.5M (BIZGO: 120)
  "DH0401": 100,  // Micro 1M (BIZGO: 100)
  "DH0402": 200,  // Micro 1.5M (BIZGO: 200)
  "DH0403": 200,  // Micro 2M (BIZGO: 200)
  "DH0404": 100,  // Micro 3M (BIZGO: 100)
  "DH0405": 80,   // Micro 5M (BIZGO: 80)
  "MH0101": 100,  // Mini 1M (BIZGO: 100)
  "MH0102": 200,  // Mini 1.5M (BIZGO: 200)
  "MH0103": 200,  // Mini 2M (BIZGO: 200)
  "MH0104": 100,  // Mini 3M (BIZGO: 100)
  "MH0105": 80,   // Mini 5M (BIZGO: 80)
  "MH0301": 120,  // Spring Mini 1.5M (BIZGO: 120)

  // HDMI Converters / Splitters
  "HD0102": 120,  // Slim HDMI to DVI 2M (BIZGO: 120)
  "HD0203": 65,   // HDMI to DVI 24+1 2M (BIZGO: 65)
  "HS1401": 50,   // Splitter 1x4 (BIZGO: 50)
  "HS1801": 25,   // Splitter 1x8 (BIZGO: 25)
  "HS3101": 50,   // Switch 3x1 (BIZGO: 50)
  "HS4101": 50,   // Switch 4x1 (BIZGO: 50)
  "HS5101": 50,   // Switch 5x1 (BIZGO: 50)
  "HSAB01": 50,   // Bi-Direction Switch (BIZGO: 50)
  "HSAB02": 238,  // Bi-Direction Switch (BIZGO: 238)
  "HNE001": 50,   // Network Extender 65m (BIZGO: 50)

  // 8. DisplayPort (DP)
  "DP0101": 12,   // 8K FO 10M (BIZGO: 12)
  "DP0102": 12,   // 8K FO 15M (BIZGO: 12)
  "DP0103": 12,   // 8K FO 20M (BIZGO: 12)
  "DP0104": 12,   // 8K FO 30M (BIZGO: 12)
  "DP0105": 12,   // 8K FO 50M (BIZGO: 12)
  "DP0106": 12,   // 8K FO 100M (BIZGO: 12)
  "DP0203": 12,   // 8K FO 20M (BIZGO: 12)
  "DP0303": 80,   // 8K 2M (BIZGO: 80)
  "DP0403": 80,   // 8K 2M (BIZGO: 80)
  "DP0503": 80,   // 8K 2M (BIZGO: 80)
  "DP0601": 100,  // 8K 1M (BIZGO: 100)
  "DP0602": 100,  // 8K 1.5M (BIZGO: 100)
  "DP0603": 100,  // 8K 2M (BIZGO: 100)
  "DP0604": 80,   // 8K 3M (BIZGO: 80)
  "DP0605": 80,   // 8K 5M (BIZGO: 80)
  "DP0703": 80,   // Mini DP to DP 8K 2M (BIZGO: 80)
  "DP0803": 80,   // DP to HDMI 4K 2M (BIZGO: 80)
  "DP0903": 80,   // 16K DP 2M (BIZGO: 80)
  "DP1006": 10,   // 8K DP 10M (BIZGO: 10)
  "DP1101": 100,  // 16K DP 1M (BIZGO: 100)
  "DP1102": 200,  // 16K DP 1.5M (BIZGO: 200)
  "DP1103": 200,  // 16K DP 2M (BIZGO: 200)
  "DP1104": 150,  // 16K DP 3M (BIZGO: 150)
  "DP1203": 100,  // Mini DP 2M (BIZGO: 100)
  "DP1303": 100,  // Mini DP 2M (BIZGO: 100)

  // 9. DVI & VGA Cables
  "DVI0103": 12,  // DVI FO 20M (BIZGO: 12)
  "DVI0203": 12,  // DVI FO 20M (BIZGO: 12)
  "DVI0303": 12,  // DVI FO 20M (BIZGO: 12)
  "DVI0403": 12,  // DVI FO 20M (BIZGO: 12)
  "DVI0501": 428, // DVI 24+1 1M (BIZGO: 428)
  "DVI0502": 428, // DVI 24+1 1.5M (BIZGO: 428)
  "DVI0503": 65,  // DVI 24+1 2M (BIZGO: 65)
  "DVI0504": 428, // DVI 24+1 3M (BIZGO: 428)
  "DVI0505": 428, // DVI 24+1 5M (BIZGO: 428)
  "DVI0506": 428, // DVI 24+1 10M (BIZGO: 428)
  "DVI0507": 428, // DVI 24+1 15M (BIZGO: 428)
  "DVI0601": 100, // DVI 24+1 2M (BIZGO: 100)
  "VGA0106": 18,  // Super VGA 3+6 10M (BIZGO: 18)
  "VGA0108": 11,  // Super VGA 3+6 20M (BIZGO: 11)

  // 10. Patch Cable & Networking
  "N6A02": 200,   // Cat6 UTP 1M (BIZGO: 200)
  "N6A03": 160,   // Cat6 UTP 1.5M (BIZGO: 160)
  "N6A04": 125,   // Cat6 UTP 2M (BIZGO: 125)
  "N6A05": 90,    // Cat6 UTP 3M (BIZGO: 90)
  "N6A06": 60,    // Cat6 UTP 5M (BIZGO: 60)
  "N6A07": 35,    // Cat6 UTP 10M (BIZGO: 35)
  "N6A08": 25,    // Cat6 UTP 15M (BIZGO: 25)
  "N6A09": 18,    // Cat6 UTP 20M (BIZGO: 18)
  "N6A10": 16,    // Cat6 UTP 25M (BIZGO: 16)
  "N6A11": 15,    // Cat6 UTP 30M (BIZGO: 15)

  "N8A01": 150,   // Cat8 Flat Yellow 1M (BIZGO: 150)
  "N8A02": 150,   // Cat8 Flat Yellow 1M (BIZGO: 150)
  "N8A03": 150,   // Cat8 Flat Yellow 1.5M (BIZGO: 150)
  "N8A04": 150,   // Cat8 Flat Yellow 2M (BIZGO: 150)
  "N8A05": 150,   // Cat8 Flat Yellow 3M (BIZGO: 150)
  "N8A06": 104,   // Cat8 Flat Yellow 5M (BIZGO: 104)
  "N8A07": 46,    // Cat8 Flat Yellow 10M (BIZGO: 46)
  "N8A08": 36,    // Cat8 Flat Yellow 15M (BIZGO: 36)

  "N8C04": 80,    // Cat8 Flat FTP 3M (BIZGO: 80)
  "N8D04": 80,    // Cat8 Flat FTP 3M (BIZGO: 80)

  "N8B02": 120,   // Cat8 SFTP Black 1.5M (BIZGO: 120)
  "N8B03": 120,   // Cat8 SFTP Black 1.5M (BIZGO: 120)
  "N8B04": 100,   // Cat8 SFTP Black 2M (BIZGO: 100)
  "N8B05": 70,    // Cat8 SFTP Black 3M (BIZGO: 70)
  "N8B06": 50,    // Cat8 SFTP Black 5M (BIZGO: 50)
  "N8B07": 30,    // Cat8 SFTP Black 10M (BIZGO: 30)
  "N8B08": 30,    // Cat8 SFTP Black 10M (BIZGO: 30)

  "N6101": 2,     // Bulk Roll UTP Cat6 305M (BIZGO: 2)
  "N6201": 2,     // Bulk Roll FTP Cat6 305M (BIZGO: 2)
  "RC01": 200,    // RJ45 Cat6 UTP Modular Plug (BIZGO: 200)
  "RC02": 200,    // RJ45 Cat6 FTP Modular Plug (BIZGO: 200)
  "RC01-50": 200,
  "RC02-50": 200,

  // 11. Power & PDU Cables
  "POW-101": 100, // C5 1.2M (BIZGO: 100)
  "POW-102": 85,  // C5 1.8M (BIZGO: 85)
  "POW-201": 85,  // 90D C13 1.8M (BIZGO: 85)
  "POW-202": 50,  // 90D C13 3M (BIZGO: 50)
  "POW-301": 100, // C13 1.2M (BIZGO: 100)
  "POW-302": 85,  // C13 1.8M (BIZGO: 85)
  "POW-303": 85,  // C13 3M (BIZGO: 85)
  "POW-304": 85,  // C13 5M (BIZGO: 85)
  "POW-305": 85,  // C13 10M (BIZGO: 85)

  // 12. Audio Cables
  "AU0101": 379,  // DC6.35 to XLR F 1M (BIZGO: 379)
  "AU0102": 379,  // DC6.35 to XLR F 1.5M (BIZGO: 379)
  "AU0103": 140,  // DC6.35 to XLR F 2M (BIZGO: 140)
  "AU0104": 379,  // DC6.35 to XLR F 3M (BIZGO: 379)
  "AU0105": 379,  // DC6.35 to XLR F 5M (BIZGO: 379)
  "AU0106": 379,  // DC6.35 to XLR F 8M (BIZGO: 379)
  "AU0107": 379,  // DC6.35 to XLR F 10M (BIZGO: 379)

  "AU0201": 380,  // DC6.35 to XLR M 1M (BIZGO: 380)
  "AU0202": 380,  // DC6.35 to XLR M 1.5M (BIZGO: 380)
  "AU0203": 125,  // DC6.35 to XLR M 2M (BIZGO: 125)
  "AU0204": 380,  // DC6.35 to XLR M 3M (BIZGO: 380)
  "AU0205": 380,  // DC6.35 to XLR M 5M (BIZGO: 380)
  "AU0206": 380,  // DC6.35 to XLR M 8M (BIZGO: 380)
  "AU0207": 380,  // DC6.35 to XLR M 10M (BIZGO: 380)

  "AU0301": 381,  // DC3.5 to 6.35 1M (BIZGO: 381)
  "AU0302": 382,  // DC3.5 to 6.35 1.5M (BIZGO: 382)
  "AU0303": 140,  // DC3.5 to 6.35 2M (BIZGO: 140)
  "AU0304": 384,  // DC3.5 to 6.35 3M (BIZGO: 384)
  "AU0305": 385,  // DC3.5 to 6.35 5M (BIZGO: 385)
  "AU0306": 386,  // DC3.5 to 6.35 8M (BIZGO: 386)
  "AU0307": 387,  // DC3.5 to 6.35 10M (BIZGO: 387)

  "AU0401": 388,  // TRS 6.35 1M (BIZGO: 388)
  "AU0402": 389,  // TRS 6.35 1.5M (BIZGO: 389)
  "AU0403": 140,  // TRS 6.35 2M (BIZGO: 140)
  "AU0404": 391,  // TRS 6.35 3M (BIZGO: 391)
  "AU0405": 392,  // TRS 6.35 5M (BIZGO: 392)
  "AU0406": 393,  // TRS 6.35 8M (BIZGO: 393)
  "AU0407": 394,  // TRS 6.35 10M (BIZGO: 394)

  "AU0501": 100,  // 6.35 to 2RCA 1M (BIZGO: 100)
  "AU0502": 100,  // 6.35 to 2RCA 1.5M (BIZGO: 100)
  "AU0503": 140,  // 6.35 to 2RCA 2M (BIZGO: 140)
  "AU0504": 50,   // 6.35 to 2RCA 3M (BIZGO: 50)
  "AU0505": 50,   // 6.35 to 2RCA 5M (BIZGO: 50)

  "AU0601": 45,   // DC3.5 F to 6.35 M 1M (BIZGO: 45)
  "AU0602": 95,   // DC3.5 F to 6.35 M 1.5M (BIZGO: 95)
  "AU0603": 150,  // DC3.5 F to 6.35 M 2M (BIZGO: 150)
  "AU0604": 47,   // DC3.5 F to 6.35 M 3M (BIZGO: 47)
  "AU0605": 47,   // DC3.5 F to 6.35 M 5M (BIZGO: 47)

  "AU0701": 50,   // DC3.5 to 2x6.35 1M (BIZGO: 50)
  "AU0702": 402,  // DC3.5 to 2x6.35 1.5M (BIZGO: 402)
  "AU0703": 150,  // DC3.5 to 2x6.35 2M (BIZGO: 150)
  "AU0704": 404,  // DC3.5 to 2x6.35 3M (BIZGO: 404)
  "AU0705": 50,   // DC3.5 to 2x6.35 5M (BIZGO: 50)

  "AU0801": 45,   // DC3.5 to 2RCA 1M (BIZGO: 45)
  "AU0802": 95,   // DC3.5 to 2RCA 1.5M (BIZGO: 95)
  "AU0803": 140,  // DC3.5 to 2RCA 2M (BIZGO: 140)
  "AU0804": 47,   // DC3.5 to 2RCA 3M (BIZGO: 47)
  "AU0805": 47,   // DC3.5 to 2RCA 5M (BIZGO: 47)
  "AU0807": 47,   // DC3.5 to 2RCA 10M (BIZGO: 47)
  "AU1520": 6,    // DC3.5 to 2RCA 80M (BIZGO: 6)

  "AU0903": 140,  // RCA M-F 2M (BIZGO: 140)

  "AU1001": 412,  // XLR M to F 1M (BIZGO: 412)
  "AU1002": 413,  // XLR M to F 1.5M (BIZGO: 413)
  "AU1003": 140,  // XLR M to F 2M (BIZGO: 140)
  "AU1004": 415,  // XLR M to F 3M (BIZGO: 415)
  "AU1005": 416,  // XLR M to F 5M (BIZGO: 416)
  "AU1007": 418,  // XLR M to F 10M (BIZGO: 418)

  "AU1101": 419,  // XLR M to F 1M (BIZGO: 419)
  "AU1102": 420,  // XLR M to F 1.5M (BIZGO: 420)
  "AU1103": 140,  // XLR M to F 2M (BIZGO: 140)
  "AU1104": 422,  // XLR M to F 3M (BIZGO: 422)
  "AU1105": 423,  // XLR M to F 5M (BIZGO: 423)
  "AU1107": 425,  // XLR M to F 10M (BIZGO: 425)

  "AU1201": 140,  // DC3.5 M to M 1M (BIZGO: 140)
  "AU1202": 140,  // DC3.5 M to M 1.5M (BIZGO: 140)
  "AU1203": 140,  // DC3.5 M to M 2M (BIZGO: 140)
  "AU1204": 140,  // DC3.5 M to M 3M (BIZGO: 140)
  "AU1205": 140,  // DC3.5 M to M 5M (BIZGO: 140)
  "AU1206": 140,  // DC3.5 M to M 8M (BIZGO: 140)
  "AU1207": 140,  // DC3.5 M to M 10M (BIZGO: 140)

  "AU1301": 140,  // TS 6.35 1M (BIZGO: 140)
  "AU1302": 140,  // TS 6.35 1.5M (BIZGO: 140)
  "AU1303": 140,  // TS 6.35 2M (BIZGO: 140)
  "AU1304": 140,  // TS 6.35 3M (BIZGO: 140)
  "AU1305": 140,  // TS 6.35 5M (BIZGO: 140)
  "AU1306": 140,  // TS 6.35 8M (BIZGO: 140)
  "AU1307": 140,  // TS 6.35 10M (BIZGO: 140)

  "AU1401": 100,  // Audio Optik 1M (BIZGO: 100)
  "AU1403": 100,  // Audio Optik 2M (BIZGO: 100)
  "AU1404": 100,  // Audio Optik 3M (BIZGO: 100)
  "AU1405": 100,  // Audio Optik 5M (BIZGO: 100)
  "AU1406": 100,  // Audio Optik 8M (BIZGO: 100)
  "AU1407": 100,  // Audio Optik 10M (BIZGO: 100)

  // 13. USB & Data Cables
  "UBM101": 100,  // USB Printer 1M (BIZGO: 100)
  "UBM102": 250,  // USB Printer 1.5M (BIZGO: 250)
  "UBM103": 200,  // USB Printer 2M (BIZGO: 200)
  "UBM104": 170,  // USB Printer 3M (BIZGO: 170)
  "UBM105": 100,  // USB Printer 5M (BIZGO: 100)
  "UBM107": 50,   // USB Printer 10M (BIZGO: 50)

  "UMF101": 250,  // USB AM-AF 1M (BIZGO: 250)
  "UMF102": 250,  // USB AM-AF 1.5M (BIZGO: 250)
  "UMF103": 200,  // USB AM-AF 2M (BIZGO: 200)
  "UMF104": 150,  // USB AM-AF 3M (BIZGO: 150)
  "UMF105": 100,  // USB AM-AF 5M (BIZGO: 100)

  "UMM101": 200,  // USB AM-AM 1M (BIZGO: 200)
  "UMM102": 250,  // USB AM-AM 1.5M (BIZGO: 250)
  "UMM103": 200,  // USB AM-AM 2M (BIZGO: 200)
  "UMM104": 150,  // USB AM-AM 3M (BIZGO: 150)
  "UMM105": 100,  // USB AM-AM 5M (BIZGO: 100)

  "U5P101": 250,  // USB AM-Micro 1M (BIZGO: 250)
  "U5P102": 250,  // USB AM-Micro 1.5M (BIZGO: 250)
  "U5P103": 200,  // USB AM-Micro 2M (BIZGO: 200)
  "U5P104": 170,  // USB AM-Micro 3M (BIZGO: 170)
  "U5P105": 100,  // USB AM-Micro 5M (BIZGO: 100)

  "UMI101": 200,  // USB AM-Mini 1M (BIZGO: 200)
  "UMI102": 200,  // USB AM-Mini 1.5M (BIZGO: 200)
  "UMI103": 200,  // USB AM-Mini 2M (BIZGO: 200)
  "UMI104": 100,  // USB AM-Mini 3M (BIZGO: 100)
  "UMI105": 100,  // USB AM-Mini 5M (BIZGO: 100)

  "USB0101": 12,  // OP USB 15M (BIZGO: 12)
  "USB0202": 10,  // OP USB 10M (BIZGO: 10)
  "USB0203": 10,  // OP USB 15M (BIZGO: 10)
  "USB0204": 10,  // OP USB 20M (BIZGO: 10)
  "USB0205": 10,  // OP USB 25M (BIZGO: 10)
  "USB0206": 12,  // OP USB 30M (BIZGO: 12)

  // 14. Adapters & Converters
  "ADP001": 200,  // 8K HDMI AF/AF (BIZGO: 200)
  "ADP002": 200,  // 4K HDMI AF/AF (BIZGO: 200)
  "ADP003": 200,  // 8K HDMI 90D (BIZGO: 200)
  "ADP004": 200,  // 8K HDMI 270D (BIZGO: 200)
  "ADP005": 200,  // 8K HDMI Left (BIZGO: 200)
  "ADP006": 200,  // 8K HDMI Right (BIZGO: 200)
  "ADP007": 200,  // 8K HDMI AM/AF (BIZGO: 200)
  "ADP008": 200,  // 8K HDMI AM/AM (BIZGO: 200)
  "ADP009": 200,  // 4K HDMI 90D (BIZGO: 200)
  "ADP010": 200,  // 4K HDMI 270D (BIZGO: 200)
  "ADP011": 200,  // 4K HDMI Left (BIZGO: 200)
  "ADP012": 200,  // 4K HDMI Right (BIZGO: 200)
  "ADP013": 200,  // 4K HDMI AM/AF (BIZGO: 200)
  "ADP014": 200,  // 8K HDMI Mini (BIZGO: 200)
  "ADP015": 200,  // 4K HDMI Mini (BIZGO: 200)
  "ADP016": 200,  // 4K HDMI 3in1 (BIZGO: 200)
  "ADP017": 200,  // 8K HDMI Micro (BIZGO: 200)
  "ADP018": 200,  // 4K HDMI Micro (BIZGO: 200)
  "ADP019": 200,  // USB 3.2 AM/AF (BIZGO: 200)
  "ADP020": 200,  // USB 3.2 AM/AM (BIZGO: 200)
  "ADP021": 200,  // USB 3.2 AF/AF (BIZGO: 200)
  "ADP022": 200,  // USB 3.2 Right (BIZGO: 200)
  "ADP023": 200,  // USB 3.2 Left (BIZGO: 200)
  "ADP024": 200,  // USB 3.2 90D (BIZGO: 200)
  "ADP025": 200,  // USB 3.2 270D (BIZGO: 200)
  "ADP026": 200,  // USB 3.0 Keystone (BIZGO: 200)
  "ADP027": 200,  // RJ45 Keystone (BIZGO: 200)
  "ADP028": 200,  // Type-C Keystone (BIZGO: 200)
  "ADP029": 200,  // RJ45 Coupler F/F (BIZGO: 200)
  "ADP030": 200,  // RJ45 Coupler Aluminium (BIZGO: 200)
  "ADP031": 200,  // RJ45 Splitter 1 to 2 (BIZGO: 200)
  "ADP032": 200,  // Type-C AM/AM 40GB (BIZGO: 200)
  "ADP033": 200,  // Type-C 90D (BIZGO: 200)
  "ADP035": 200,  // USB 3.0 AF to Type-C AM (BIZGO: 200)
  "ADP037": 200,  // DP AM to HDMI AF (BIZGO: 200)
  "ADP038": 200,  // Mini DP to DP AF (BIZGO: 200)

  "CDP013": 100,  // 8K Type-C to DP 2M (BIZGO: 100)
  "CH0101": 12,   // 4K FO Type-C to HDMI 20M (BIZGO: 12)
  "CH0201": 12,   // 4K FO Type-C to HDMI 20M (BIZGO: 12)
  "CH0301": 12,   // 4K FO Type-C to HDMI 20M (BIZGO: 12)
  "CH0403": 100,  // 4K@30 Type-C to HDMI 2M (BIZGO: 100)
  "CH0503": 100,  // 4K Type-C to HDMI 2M (BIZGO: 100)
  "CH0603": 100,  // 4K Right Angle Type-C to HDMI 2M (BIZGO: 100)
  "CH0703": 100,  // 8K Type-C to HDMI 2M (BIZGO: 100)

  "DK1301": 15,   // 13in1 USB-C Dock (BIZGO: 15)
  "DK1501": 15,   // 15in1 USB-C Dock (BIZGO: 15)
  "HUB801": 100,  // 8in1 USB-C Dock (BIZGO: 100)

  "VD0101": 500,  // 4K DP EDID (BIZGO: 500)
  "VD0201": 500,  // 4K HDMI EDID (BIZGO: 500)
  "VC0302": 500,  // 4K HDMI Passthrough (BIZGO: 500)
  "VC0101": 192,  // Video Capture Card 4K@30 (BIZGO: 192)
  "VC0201": 114,  // Video Capture Card 4K@60 (BIZGO: 114)

  "UEA001": 100,  // USB2.0 100Mbps Ethernet (BIZGO: 100)
  "UEA002": 100,  // USB3.0 Gigabit Ethernet (BIZGO: 100)
  "UEA003": 100,  // USB3.0 100Mbps Ethernet (BIZGO: 100)
  "CEA001": 100,  // Type-C 100Mbps Ethernet (BIZGO: 100)
  "CEA002": 100,  // Type-C Gigabit Ethernet (BIZGO: 100)
  "CEA003": 100,  // Type-C Gigabit Ethernet (BIZGO: 100)

  "LCP001": 20,   // Laptop Cooling Pad (BIZGO: 20)
  "LCP002": 16,   // Laptop Cooling Pad (BIZGO: 16)
  "LCP003": 30,   // Laptop Cooling Pad (BIZGO: 30)
  "LCP004": 10,   // Laptop Stand (BIZGO: 10)

  "MIC001": 50,   // USB Microphone (BIZGO: 50)
  "MIC002": 40,   // USB Microphone (BIZGO: 40)
  "MIC003": 10,   // USB Microphone (BIZGO: 10)
  "MIC004": 50,   // USB Microphone (BIZGO: 50)

  // 15. Earphones & TWS
  "HW01": 50,     // Bluetooth Earphone HW01 (BIZGO: 50)
  "HW02": 50,     // Bluetooth Earphone HW02 (BIZGO: 50)
  "HW02-B": 50,   // Bluetooth Earphone HW02 Black (BIZGO: 50)
  "HW02-W": 50,   // Bluetooth Earphone HW02 White (BIZGO: 50)
  "HW03-B": 500,  // 3.5" Earphone Black (BIZGO: 500)
  "HW03-W": 500,  // 3.5" Earphone White (BIZGO: 500)
  "HW04": 500,    // 3.5" Earphone Black (BIZGO: 500)
  "HW05": 500,    // 3.5" Earphone Black (BIZGO: 500)
  "HW06": 200,    // Type-C Earphone (BIZGO: 200)
  "HW07": 200,    // Type-C Earphone (BIZGO: 200)

  // 16. Chargers & Cables
  "HW-C01": 144,  // 12W Charger (BIZGO: 144)
  "HW-C02A": 105, // 20W Charger + Cable (BIZGO: 105)
  "HW-C03": 144,  // 30W Charger (BIZGO: 144)
  "HW-C03A": 105, // 30W Charger + Cable (BIZGO: 105)
  "HW-C04": 144,  // 65W Charger (BIZGO: 144)
  "HW-C04+AC01": 100, // 65W Set (BIZGO: 100)
  "CC01": 150,    // Car Charger (BIZGO: 150)
  "CC02": 150,    // Car Charger (BIZGO: 150)
  "AC01": 200,    // 4in1 USB Cable (BIZGO: 200)
  "AC02": 150,    // USB A to C 1.2M (BIZGO: 150)
  "AC02-20": 10,  // Toples USB 20pcs (BIZGO: 10)
  "AC03": 250,    // USB A to C 1.2M (BIZGO: 250)
  "AC04": 250,    // USB A to C 1.2M (BIZGO: 250)
  "AC05": 250     // Type-C to Lightning (BIZGO: 250)
,
  // Composite / Series Multi-SKU Items
  "HW03-W & HW03-B": 500, // Studio IEM Black & White (BIZGO: 500)
  "ADP002 - ADP013": 200  // Display & Audio Adapter Series (BIZGO: 200)
};

window.HOWELL_SKU_CARTON = HOWELL_SKU_CARTON;

/**
 * HOWELL Official Master Catalog - Stock Qty Data from ERP BIZGO
 * Generated: 2026-09-22
 * Field: stockQty (jumlah stok aktual per SKU dari sistem ERP)
 * Used as QTY/KARTON value in print-catalog.html
 */
const HOWELL_SKU_STOCK = {
  "AC01": "0",
  "AC02": "1,417",
  "AC03": "1,438",
  "AC04": "1,384",
  "AC05": "0",
  "ADP001": "833",
  "ADP002": "718",
  "ADP002 - ADP013": "718",
  "ADP003": "421",
  "ADP004": "139",
  "ADP005": "101",
  "ADP006": "90",
  "ADP007": "0",
  "ADP008": "26",
  "ADP009": "400",
  "ADP010": "0",
  "ADP011": "26",
  "ADP012": "29",
  "ADP013": "53",
  "ADP014": "82",
  "ADP015": "100",
  "ADP016": "39",
  "ADP017": "93",
  "ADP018": "51",
  "ADP019": "99",
  "ADP020": "9",
  "ADP021": "100",
  "ADP022": "73",
  "ADP023": "69",
  "ADP024": "70",
  "ADP025": "69",
  "ADP026": "0",
  "ADP027": "31",
  "ADP028": "235",
  "ADP029": "83",
  "ADP030": "81",
  "ADP031": "98",
  "ADP032": "23",
  "ADP033": "45",
  "ADP035": "17",
  "ADP037": "0",
  "ADP038": "10",
  "AU0103": "36",
  "AU0104": "50",
  "AU0105": "50",
  "AU0106": "30",
  "AU0107": "30",
  "AU0203": "35",
  "AU0204": "50",
  "AU0205": "50",
  "AU0206": "50",
  "AU0207": "50",
  "AU0301": "45",
  "AU0302": "45",
  "AU0303": "46",
  "AU0304": "47",
  "AU0305": "47",
  "AU0401": "45",
  "AU0402": "45",
  "AU0403": "49",
  "AU0404": "47",
  "AU0405": "97",
  "AU0406": "49",
  "AU0407": "99",
  "AU0501": "100",
  "AU0502": "100",
  "AU0503": "99",
  "AU0504": "50",
  "AU0505": "50",
  "AU0601": "45",
  "AU0602": "95",
  "AU0603": "95",
  "AU0604": "47",
  "AU0605": "47",
  "AU0701": "50",
  "AU0702": "100",
  "AU0703": "99",
  "AU0704": "50",
  "AU0705": "50",
  "AU0801": "45",
  "AU0802": "95",
  "AU0803": "99",
  "AU0804": "47",
  "AU0805": "47",
  "AU0903": "2",
  "AU1003": "0",
  "AU1103": "2",
  "AU1201": "95",
  "AU1202": "95",
  "AU1203": "95",
  "AU1204": "97",
  "AU1205": "47",
  "AU1207": "100",
  "AU1301": "50",
  "AU1303": "50",
  "AU1304": "50",
  "AU1305": "50",
  "CC01": "0",
  "CC02": "0",
  "CEA001": "85",
  "CH0101": "2",
  "CH0201": "3",
  "CH0301": "3",
  "CH0403": "45",
  "DH0103": "18",
  "DH0203": "2",
  "DH0301": "329",
  "DH0401": "100",
  "DH0402": "200",
  "DH0403": "200",
  "DH0404": "100",
  "DH0405": "80",
  "DK1301": "10",
  "DK1501": "5",
  "DP0103": "3",
  "DP0203": "3",
  "DP0303": "7",
  "DP0403": "20",
  "DP0503": "8",
  "DP0703": "26",
  "DP0803": "18",
  "DP0903": "28",
  "DP1006": "20",
  "DP1101": "100",
  "DP1102": "200",
  "DP1103": "200",
  "DP1104": "150",
  "DP1203": "28",
  "DP1303": "29",
  "DVI0103": "3",
  "DVI0203": "3",
  "DVI0303": "3",
  "DVI0403": "3",
  "DVI0503": "28",
  "DVI0506": "30",
  "DVI0507": "30",
  "DVI0601": "30",
  "H0103": "3,774",
  "H0104": "1,142",
  "H0105": "1,363",
  "H0106": "690",
  "H0108": "327",
  "H0109": "156",
  "H0110": "85",
  "H0203": "2,697",
  "H0204": "761",
  "H0205": "1,701",
  "H0206": "456",
  "H0208": "385",
  "H0209": "249",
  "H0210": "325",
  "H0303": "950",
  "H0304": "766",
  "H0305": "769",
  "H0306": "455",
  "H0308": "256",
  "H0309": "188",
  "H0310": "0",
  "H0403": "1,400",
  "H0404": "939",
  "H0405": "944",
  "H0406": "459",
  "H0408": "156",
  "H0503": "1,455",
  "H0504": "971",
  "H0505": "977",
  "H0506": "480",
  "H0508": "294",
  "H0601": "85",
  "H0602": "91",
  "H0603": "298",
  "H0604": "85",
  "H0605": "157",
  "H0606": "189",
  "H0607": "271",
  "H0608": "7",
  "H0609": "4",
  "H0610": "9",
  "H0611": "2",
  "H0612": "2",
  "H0703": "10",
  "H0803": "45",
  "H0903": "50",
  "H1003": "36",
  "H1103": "49",
  "H1303": "41",
  "H1401": "47",
  "H1603": "48",
  "H1703": "50",
  "H1803": "28",
  "H2001": "336",
  "H2103": "22",
  "H2201": "100",
  "H2202": "200",
  "H2203": "200",
  "H2204": "144",
  "H2303": "3",
  "H2403": "3",
  "H2503": "1",
  "H2603": "2",
  "H2703": "3",
  "H2803": "3",
  "H2903": "3",
  "H3003": "3",
  "H3103": "3",
  "H3203": "2",
  "H3303": "3",
  "H3403": "3",
  "H3503": "3",
  "HD0102": "24",
  "HD0203": "9",
  "HNE001": "50",
  "HS1401": "42",
  "HS1801": "25",
  "HS3101": "50",
  "HS4101": "50",
  "HS5101": "50",
  "HSAB01": "50",
  "HSAB02": "120",
  "HUB801": "50",
  "HW-C01": "426",
  "HW-C02A": "391",
  "HW-C03": "0",
  "HW-C03A": "0",
  "HW-C04": "0",
  "HW01": "843",
  "HW02-B": "472",
  "HW02-W": "197",
  "HW03-B": "4,435",
  "HW03-W": "4,181",
  "HW03-W & HW03-B": "8,616",
  "HW04": "4,845",
  "HW05": "4,856",
  "HW06": "2,748",
  "HW07": "2,306",
  "LCP004": "50",
  "MH0101": "100",
  "MH0102": "200",
  "MH0103": "200",
  "MH0104": "100",
  "MH0105": "80",
  "MH0301": "336",
  "N6101": "37",
  "N6201": "90",
  "N6A01": "37",
  "N6A02": "615",
  "N6A03": "1,826",
  "N6A04": "7,688",
  "N6A05": "1,742",
  "N6A06": "1,037",
  "N6A07": "165",
  "N6A08": "340",
  "N6A09": "185",
  "N6A10": "131",
  "N6A11": "123",
  "N6B01": "90",
  "N8A02": "158",
  "N8A03": "243",
  "N8A04": "2,935",
  "N8A05": "442",
  "N8A06": "940",
  "N8A07": "565",
  "N8A08": "272",
  "N8B03": "72",
  "N8B04": "133",
  "N8B05": "128",
  "N8B06": "40",
  "N8B08": "48",
  "N8C04": "45",
  "N8D04": "49",
  "POW-101": "1,778",
  "POW-102": "19,097",
  "POW-201": "26",
  "POW-202": "617",
  "POW-301": "3,661",
  "POW-302": "20,634",
  "RC01": "38,121",
  "RC02": "12,735",
  "UEA001": "90",
  "UEA002": "42",
  "UEA003": "50",
  "UMF101": "451",
  "UMF102": "476",
  "UMF103": "465",
  "UMF104": "249",
  "UMF105": "268",
  "UMI101": "1",
  "UMI102": "177",
  "UMM101": "187",
  "UMM102": "497",
  "UMM103": "1,491",
  "UMM104": "285",
  "UMM105": "293",
  "USB0202": "5",
  "USB0203": "5",
  "USB0204": "5",
  "USB0205": "5",
  "USB0206": "5",
  "VC0101": "30",
  "VC0201": "30",
  "VC0302": "30",
  "VD0101": "50",
  "VD0201": "50",
  "VGA0106": "5",
  "VGA0108": "15"
};
window.HOWELL_SKU_STOCK = HOWELL_SKU_STOCK;


const HOWELL_CATEGORIES = [
  { id: "patch-cable", name: "Patch Cable & Networking", icon: "network", count: 9, desc: "Cat6/Cat8 Patch Cables, Bulk Rolls, RJ45 Connectors & Keystone Adapters" },
  { id: "hdmi-video", name: "HDMI & Video Cables", icon: "video", count: 39, desc: "HDMI 4K, 8K Ultra Gold, 16K, Active Optic Fiber HDMI, Micro & Mini HDMI" },
  { id: "displayport", name: "DisplayPort 8K / 16K", icon: "monitor", count: 10, desc: "DisplayPort 8K 60Hz, DP 16K, Active Fiber Optic DP & Mini DisplayPort" },
  { id: "dvi-vga", name: "DVI & VGA Cables", icon: "tv", count: 8, desc: "DVI-D Dual Link 24+1, DVI Optic Fiber, HDMI to DVI & Heavy-Duty VGA 3+6" },
  { id: "audio", name: "Audio & Instrument Cables", icon: "headphones", count: 11, desc: "3.5mm AUX, 2RCA, Dual 6.35mm, Mono TS Guitar, XLR Microphone & Optical Toslink" },
  { id: "power-cable", name: "Power & PDU Cables", icon: "plug", count: 3, desc: "AC Power C5, CPU C13, Server PDU C13-C14, Heavy-Duty C19-C20 & CEE 7/7 Schuko" },
  { id: "adapter", name: "Adapters & Converters", icon: "cpu", count: 37, desc: "Multi-port Display Converters, Audio Adapters, OTG & Signal Converters" },
  { id: "computer-acc", name: "Chargers & Mobile Acc", icon: "smartphone", count: 12, desc: "GaN Fast Chargers, Car Chargers, USB Hubs & Mobile Accessories" },
  { id: "earphone-tws", name: "Audio & Earphones", icon: "music", count: 8, desc: "Wireless TWS, Noise-Cancelling Earbuds & Studio In-Ear Monitors" }
];

const HOWELL_PRODUCTS = [
  {
    id: "hw-patch-cat6-utp",
    price: 26368,
    name: "HOWELL Cat6 UTP Networking Patch Cable",
    category: "patch-cable",
    categoryName: "Patch Cable & Networking",
    rating: 4.9,
    reviewsCount: 284,
    badge: "CAT6 Gigabit",
    sku: "N6A02 - N6A11",
    tagline: "1000Mbps | 250MHz | 26AWG CCA | Gold Plated RJ45",
    summary: "High-performance Cat6 UTP network patch cable delivering up to 1000Mbps Gigabit bandwidth.",
    variants: { lengths: ["1M", "1.5M", "2M", "3M", "5M", "10M", "15M", "20M", "25M", "30M"], colors: ["Black PVC"] },
    specs: { "SKU Series": "N6A02 to N6A11", "Conductor": "CCA 26AWG Solid Core", "OD": "5.8mm", "Bandwidth": "1000Mbps / 250MHz", "Warranty": "12-Month Warranty" },
    description: "Built for safer, zero-packet-loss network connectivity across offices, server racks, and home networks.",
    image: "assets/Produk/Produk Batch 1/1. Patch Cable/N6A02 - N6A11.png"
  },
  {
    id: "hw-patch-cat8-flat-yellow",
    price: 86602,
    name: "HOWELL Flat FTP Cat8 High-Speed Cable (Yellow)",
    category: "patch-cable",
    categoryName: "Patch Cable & Networking",
    rating: 5.0,
    reviewsCount: 195,
    badge: "CAT8 40Gbps",
    sku: "N8A02 - N8A08",
    tagline: "40Gbps | 2GHz (2000MHz) | Pure Copper 30AWG | Flat Ribbon",
    summary: "Ultra-fast Cat8 FTP flat network cable supporting up to 40Gbps and 2GHz bandwidth frequency.",
    variants: { lengths: ["1M", "1.5M", "2M", "3M", "5M", "10M", "15M"], colors: ["High-Vis Yellow"] },
    lengthSkuMap: { "1M": "N8A02", "1.5M": "N8A03", "2M": "N8A04", "3M": "N8A05", "5M": "N8A06", "10M": "N8A07", "15M": "N8A08" },
    specs: { "SKU Series": "N8A02 to N8A08", "Conductor": "Pure Copper 30AWG", "Speed": "40 Gbps / 2GHz", "Warranty": "12-Month Warranty" },
    description: "Engineered for next-gen 40G infrastructure. Flat ribbon form factor easily slides under doors and carpets.",
    image: "assets/Produk/Produk Batch 1/1. Patch Cable/N8A02 - N8A08.png"
  },
  {
    id: "hw-patch-cat8-flat-n8c04",
    price: 123969,
    name: "HOWELL Flat FTP Cat8 Cable 3M (N8C04)",
    category: "patch-cable",
    categoryName: "Patch Cable & Networking",
    rating: 4.9,
    reviewsCount: 88,
    badge: "CAT8 3M Flat",
    sku: "N8C04",
    tagline: "3 Meters | 40Gbps | 2GHz | Flat Ribbon | Pure Copper",
    summary: "Specialized 3-meter Cat8 FTP flat network cable with 30AWG pure copper core.",
    variants: { lengths: ["3M"], colors: ["Yellow PVC"] },
    specs: { "SKU Code": "N8C04", "Conductor": "Pure Copper 30AWG", "Speed": "40 Gbps / 2GHz", "Warranty": "12-Month Warranty" },
    description: "High-density 3-meter flat Cat8 Ethernet cable optimized for server switches.",
    image: "assets/Produk/Produk Batch 1/1. Patch Cable/N8C04.png"
  },
  {
    id: "hw-patch-cat8-flat-n8d04",
    price: 123969,
    name: "HOWELL Flat FTP Cat8 Cable 3M (N8D04)",
    category: "patch-cable",
    categoryName: "Patch Cable & Networking",
    rating: 4.9,
    reviewsCount: 76,
    badge: "CAT8 3M Flat",
    sku: "N8D04",
    tagline: "3 Meters | 40Gbps | 2GHz Bandwidth | Ultra-Durable",
    summary: "Professional 3M Cat8 FTP flat Ethernet patch cable engineered with 30AWG copper conductors.",
    variants: { lengths: ["3M"], colors: ["Yellow PVC"] },
    specs: { "SKU Code": "N8D04", "Conductor": "Pure Copper 30AWG", "Speed": "40 Gbps / 2GHz", "Warranty": "12-Month Warranty" },
    description: "3-Meter Cat8 flat network cable featuring anti-interference foil shielding.",
    image: "assets/Produk/Produk Batch 1/1. Patch Cable/N8D04.png"
  },
  {
    id: "hw-patch-cat8-sftp-black",
    price: 110517,
    name: "HOWELL Heavy-Duty SFTP Cat8 Patch Cable (Black)",
    category: "patch-cable",
    categoryName: "Patch Cable & Networking",
    rating: 5.0,
    reviewsCount: 162,
    badge: "SFTP Shielded",
    sku: "N8B03 - N8B08",
    tagline: "40Gbps | 2GHz | SFTP Double Shielded | 6.0mm OD",
    summary: "Heavy-duty Cat8 SFTP double-shielded network cable supporting 40Gbps transmission speeds.",
    variants: { lengths: ["1.5M", "2M", "3M", "5M", "10M"], colors: ["Matte Black PVC"] },
    lengthSkuMap: { "1.5M": "N8B03", "2M": "N8B04", "3M": "N8B05", "5M": "N8B06", "10M": "N8B08" },
    specs: { "SKU Series": "N8B03 to N8B08", "Shielding": "SFTP Double Foil+Braid", "Speed": "40 Gbps / 2GHz", "Warranty": "12-Month Warranty" },
    description: "Maximum noise isolation and zero crosstalk thanks to dual-layer SFTP shielding.",
    image: "assets/Produk/Produk Batch 1/1. Patch Cable/N8B03 - N8B08.png"
  },
  {
    id: "hw-roll-cat6-utp",
    price: 1091867,
    name: "HOWELL Bulk Roll Cable UTP Cat6 (305M - Blue)",
    category: "patch-cable",
    categoryName: "Patch Cable & Networking",
    rating: 4.9,
    reviewsCount: 114,
    badge: "305M Roll",
    sku: "N6101",
    tagline: "305M Roll | 1000Mbps | 250MHz | 22AWG CCA | Blue",
    summary: "305-meter bulk pull box of Cat6 UTP network cable for interior infrastructure cabling.",
    variants: { lengths: ["305 Meters"], colors: ["Industrial Blue"] },
    specs: { "SKU Code": "N6101", "Conductor": "CCA 22AWG", "Length": "305 Meters Pull Box", "Warranty": "12-Month Warranty" },
    description: "305-meter bulk roll cable packaged in an easy-pull box.",
    image: "assets/Produk/Produk Batch 1/1. Patch Cable/N6101.png"
  },
  {
    id: "hw-roll-cat6-ftp",
    price: 1405738,
    name: "HOWELL Bulk Roll Cable FTP Cat6 Shielded (305M - Black)",
    category: "patch-cable",
    categoryName: "Patch Cable & Networking",
    rating: 5.0,
    reviewsCount: 96,
    badge: "305M FTP Roll",
    sku: "N6201",
    tagline: "305M Roll | Shielded FTP | 1000Mbps | 250MHz | Black",
    summary: "305-meter bulk pull box of FTP shielded Cat6 cable designed for high-EMI installations.",
    variants: { lengths: ["305 Meters"], colors: ["Black"] },
    specs: { "SKU Code": "N6201", "Shielding": "FTP Foil Shielded", "Conductor": "Solid CCA 23AWG", "Warranty": "12-Month Warranty" },
    description: "Foil shielded bulk network cable preventing electromagnetic interference.",
    image: "assets/Produk/Produk Batch 1/1. Patch Cable/N6201.png"
  },
  {
    id: "hw-conn-cat6-utp",
    price: 64270,
    name: "HOWELL RJ45 Cat6 UTP Modular Plug (50pcs)",
    category: "patch-cable",
    categoryName: "Patch Cable & Networking",
    rating: 4.8,
    reviewsCount: 205,
    badge: "50pcs Pack",
    sku: "RC01",
    tagline: "50 Pack | Gold Plated Contacts | Transparent Crystal Shell",
    summary: "Pack of 50 high-precision RJ45 modular plug connectors for Cat6 UTP cabling.",
    variants: { lengths: ["50 Pack"], colors: ["Transparent"] },
    specs: { "SKU Code": "RC01", "Material": "3-Prong Gold-Plated Pins", "Warranty": "12-Month Warranty" },
    description: "High-grade crimp connectors guaranteeing firm latching.",
    image: "assets/Produk/Produk Batch 1/1. Patch Cable/RC01.png"
  },
  {
    id: "hw-conn-cat6-ftp",
    price: 116495,
    name: "HOWELL RJ45 Cat6 FTP Metal Shielded Plug (50pcs)",
    category: "patch-cable",
    categoryName: "Patch Cable & Networking",
    rating: 4.9,
    reviewsCount: 178,
    badge: "Metal Shielded",
    sku: "RC02",
    tagline: "50 Pack | Metal Casing | Gold Plated Pins | Grounding Tab",
    summary: "Pack of 50 STP/FTP metal shielded RJ45 modular connectors with metal casing.",
    variants: { lengths: ["50 Pack"], colors: ["Silver Metal"] },
    specs: { "SKU Code": "RC02", "Shielding": "Full Nickel Metal Casing", "Warranty": "12-Month Warranty" },
    description: "Durable metal shielded RJ45 connector for interference-free terminations.",
    image: "assets/Produk/Produk Batch 1/1. Patch Cable/RC02.png"
  },
  {
    id: "hw-hdmi-4k-gold-h0103",
    price: 38923,
    name: "HOWELL HDMI 4K Premium Cable (H0103 - H0110)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 540,
    badge: "HDMI 4K 18Gbps",
    sku: "H0103 - H0110",
    tagline: "18 Gbps | 4K 60Hz | HDR 3D | Gold Plated Plugs",
    summary: "HDMI 2.0 high-speed cable supporting 4K 60Hz, HDR, 3D video, and Audio Return Channel (ARC).",
    variants: { lengths: ["1.5M", "2M", "3M", "5M", "10M", "15M", "20M"], colors: ["Black PVC"] },
    lengthSkuMap: { "1.5M": "H0103", "2M": "H0104", "3M": "H0105", "5M": "H0106", "10M": "H0108", "15M": "H0109", "20M": "H0110" },
    specs: { "SKU Series": "H0103 to H0110", "Resolution": "4K 60Hz / 18Gbps", "Warranty": "12-Month Warranty" },
    description: "Universal HDMI cable for 4K Smart TVs, gaming consoles, and workstations.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H0103 - H0110.png"
  },
  {
    id: "hw-hdmi-4k-gold-h0203",
    price: 49087,
    name: "HOWELL HDMI 4K Gold Premium Shell (H0203 - H0210)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 420,
    badge: "HDMI 4K Premium",
    sku: "H0203 - H0210",
    tagline: "18 Gbps | Gold Metal Head | 4K 60Hz HDR",
    summary: "Premium aluminum gold casing HDMI 2.0 cable for high-end home theaters.",
    variants: { lengths: ["1.5M", "2M", "3M", "5M", "10M", "15M", "20M"], colors: ["Gold Casing"] },
    lengthSkuMap: { "1.5M": "H0203", "2M": "H0204", "3M": "H0205", "5M": "H0206", "10M": "H0208", "15M": "H0209", "20M": "H0210" },
    specs: { "SKU Series": "H0203 to H0210", "Resolution": "4K 60Hz / 18Gbps", "Warranty": "12-Month Warranty" },
    description: "Heavy-duty aluminum shell providing maximum connector durability.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H0203 - H0210.png"
  },
  {
    id: "hw-hdmi-4k-core-h0303",
    price: 45498,
    name: "HOWELL HDMI 4K Pure Copper Core (H0303 - H0310)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 310,
    badge: "Pure Copper Core",
    sku: "H0303 - H0310",
    tagline: "18 Gbps | 30AWG/28AWG Pure Copper | 4K 60Hz",
    summary: "High-grade pure copper conductor HDMI cable for zero distortion 4K signal delivery.",
    variants: { lengths: ["1.5M", "2M", "3M", "5M", "10M", "15M", "20M"], colors: ["Black PVC"] },
    lengthSkuMap: { "1.5M": "H0303", "2M": "H0304", "3M": "H0305", "5M": "H0306", "10M": "H0308", "15M": "H0309", "20M": "H0310" },
    specs: { "SKU Series": "H0303 to H0310", "Conductor": "Pure Copper Core", "Warranty": "12-Month Warranty" },
    description: "Ideal for professional AV distribution and 4K projectors.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H0303 - H0310.png"
  },
  {
    id: "hw-hdmi-8k-gold-h0403",
    price: 74643,
    name: "HOWELL HDMI 8K 60Hz Ultra Gold (H0403 - H0408)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 380,
    badge: "HDMI 8K 48Gbps",
    sku: "H0403 - H0408",
    tagline: "48 Gbps Bandwidth | 8K 60Hz / 4K 120Hz | Dynamic HDR | eARC",
    summary: "HDMI 2.1 ultra-high-speed certified cable delivering 48Gbps throughput for 8K 60Hz and 4K 120Hz console gaming.",
    variants: { lengths: ["1.5M", "2M", "3M", "5M", "10M"], colors: ["Ultra Gold Casing"] },
    lengthSkuMap: { "1.5M": "H0403", "2M": "H0404", "3M": "H0405", "5M": "H0406", "10M": "H0408" },
    specs: { "SKU Series": "H0403 to H0408", "Speed": "48 Gbps / 8K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Designed for PS5, Xbox Series X, and OLED 8K displays.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H0403 - H0408.png"
  },
  {
    id: "hw-hdmi-8k-core-h0503",
    price: 94074,
    name: "HOWELL HDMI 8K 60Hz Ultra Core (H0503 - H0508)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 290,
    badge: "8K 48Gbps Core",
    sku: "H0503 - H0508",
    tagline: "48 Gbps | 30AWG Copper Core | 8K 60Hz / 4K 120Hz",
    summary: "Pure copper core HDMI 2.1 cable supporting uncompressed 8K 60Hz video streaming.",
    variants: { lengths: ["1.5M", "2M", "3M", "5M", "10M"], colors: ["Black PVC"] },
    lengthSkuMap: { "1.5M": "H0503", "2M": "H0504", "3M": "H0505", "5M": "H0506", "10M": "H0508" },
    specs: { "SKU Series": "H0503 to H0508", "Speed": "48 Gbps / 8K 60Hz", "Warranty": "12-Month Warranty" },
    description: "High refresh rate 4K 120Hz / 8K 60Hz gaming connection.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H0503 - H0507.png"
  },
  {
    id: "hw-hdmi-fo-8k-h0601",
    price: 522326,
    name: "HOWELL Active Optical Fiber HDMI 8K (H0601 - H0612)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 210,
    badge: "Optic 200M 8K",
    sku: "H0601 - H0612",
    tagline: "Active Fiber Optic | 48Gbps | 8K 60Hz | 10M to 200M",
    summary: "Hybrid fiber-optic HDMI 2.1 cable supporting 48Gbps uncompressed 8K video up to 200 meters without repeaters.",
    variants: { lengths: ["10M", "15M", "20M", "25M", "30M", "50M", "100M", "200M"], colors: ["Aluminum Gold"] },
    lengthSkuMap: { "10M": "H0601", "15M": "H0602", "20M": "H0603", "25M": "H0604", "30M": "H0605", "50M": "H0607", "100M": "H0610", "200M": "H0612" },
    specs: { "SKU Series": "H0601 to H0612", "Core": "Active Optical Fiber Hybrid", "Warranty": "12-Month Warranty" },
    description: "Commercial auditorium and video wall optical HDMI link.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H0601 - H0612.png"
  },
  {
    id: "hw-hdmi-4k-slim-h0703",
    price: 45000,
    name: "HOWELL HDMI 4K Slim Cable 2M (H0703)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.8,
    reviewsCount: 140,
    badge: "Slim 4K 2M",
    sku: "H0703",
    tagline: "Ultra-Slim 3.8mm OD | 4K 60Hz | Flexible Wire",
    summary: "Ultra-thin 3.8mm diameter HDMI cable designed for compact travel bags and camera gimbals.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "H0703", "OD": "3.8mm Ultra Slim", "Warranty": "12-Month Warranty" },
    description: "Lightweight, highly flexible HDMI cord.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H0703.png"
  },
  {
    id: "hw-hdmi-4k-90d-h0803",
    price: 48000,
    name: "HOWELL HDMI 4K 90-Degree Angle Cable 2M (H0803)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 165,
    badge: "90D Right Angle",
    sku: "H0803",
    tagline: "90-Degree Elbow Plug | 4K 60Hz | Flush Wall Mount",
    summary: "Right-angle HDMI plug preventing cable bend stress behind wall-mounted flat TVs.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "H0803", "Angle": "90-Degree Right Angle", "Warranty": "12-Month Warranty" },
    description: "Ideal for flush wall-mounted displays and tight equipment racks.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H0803.png"
  },
  {
    id: "hw-hdmi-4k-braid-h0903",
    price: 52000,
    name: "HOWELL HDMI 4K High Speed Braided Cable 2M (H0903)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 155,
    badge: "Nylon Braided",
    sku: "H0903",
    tagline: "18 Gbps | 4K 60Hz | High-Density Nylon Braid | 2M",
    summary: "Rugged nylon-braided HDMI 2.0 cable with reinforced strain relief.",
    variants: { lengths: ["2M"], colors: ["Grey Nylon Braid"] },
    specs: { "SKU Code": "H0903", "Resolution": "4K 60Hz HDR", "Conductor": "OFC Copper", "Warranty": "12-Month Warranty" },
    description: "Durable nylon exterior prevents abrasion and tangling.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H0903.png"
  },
  {
    id: "hw-hdmi-4k-flat-h1003",
    price: 55000,
    name: "HOWELL HDMI 4K Ultra-Flexible Flat Cable 2M (H1003)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 130,
    badge: "Flat Profile",
    sku: "H1003",
    tagline: "Flat Ribbon Form Factor | Under Carpet Routing | 4K 60Hz",
    summary: "Low-profile flat ribbon HDMI cable engineered for discreet installations under carpets.",
    variants: { lengths: ["2M"], colors: ["Matte Black"] },
    specs: { "SKU Code": "H1003", "Form Factor": "Ultra Flat", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Slides effortlessly along baseboards and under doors.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H1003.png"
  },
  {
    id: "hw-hdmi-4k-zinc-h1103",
    price: 58000,
    name: "HOWELL HDMI 4K Zinc Alloy Premium Shell 2M (H1103)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 142,
    badge: "Zinc Alloy Shell",
    sku: "H1103",
    tagline: "Zinc Alloy Metal Hood | 18Gbps 4K 60Hz | Gold Pins",
    summary: "Heavy-duty zinc alloy housing HDMI cable with gold-plated pins.",
    variants: { lengths: ["2M"], colors: ["Space Grey Metal"] },
    specs: { "SKU Code": "H1103", "Shell Material": "Zinc Alloy", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Engineered for harsh industrial and broadcast environments.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H1103.png"
  },
  {
    id: "hw-hdmi-4k-hd-h1303",
    price: 62000,
    name: "HOWELL HDMI 4K Heavy-Duty Armor Cable 2M (H1303)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 128,
    badge: "Armored Jacket",
    sku: "H1303",
    tagline: "Reinforced Armor Jacket | 18Gbps | 4K 60Hz HDR",
    summary: "Crush-resistant armored HDMI 2.0 cable for stage and rental setups.",
    variants: { lengths: ["2M"], colors: ["Black Armor"] },
    specs: { "SKU Code": "H1303", "Jacket": "Heavy-Duty Armor", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Built tough to withstand heavy foot traffic and bending.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H1303.png"
  },
  {
    id: "hw-hdmi-4k-short-h1401",
    price: 35000,
    name: "HOWELL HDMI 4K Patch Jumper Cable 1M (H1401)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.8,
    reviewsCount: 115,
    badge: "1M Patch",
    sku: "H1401",
    tagline: "Compact 1 Meter | Clean Cable Management | 4K 60Hz",
    summary: "Short 1-meter HDMI patch cable for clean equipment rack setups.",
    variants: { lengths: ["1M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "H1401", "Length": "1 Meter", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Eliminates cable clutter behind media centers.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H1401.png"
  },
  {
    id: "hw-hdmi-4k-alu-h1603",
    price: 54000,
    name: "HOWELL HDMI 4K Aluminum Shell Pro Cable 2M (H1603)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 135,
    badge: "Aluminum Shell",
    sku: "H1603",
    tagline: "Anodized Aluminum Casing | 18Gbps | Triple Shielding",
    summary: "Anodized aluminum connector HDMI 2.0 cable with triple layer foil shielding.",
    variants: { lengths: ["2M"], colors: ["Silver Aluminum"] },
    specs: { "SKU Code": "H1603", "Shielding": "Triple Layer Foil+Braid", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Sleek metallic aesthetics matching modern laptops and monitors.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H1603.png"
  },
  {
    id: "hw-hdmi-4k-goldpins-h1703",
    price: 49000,
    name: "HOWELL HDMI 4K 24K Gold-Plated High-Speed Cable 2M (H1703)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 160,
    badge: "24K Gold",
    sku: "H1703",
    tagline: "24K Gold Plated Contacts | Anti-Oxidation | 4K 60Hz",
    summary: "Precision gold-plated HDMI cable ensuring corrosion-free video contacts.",
    variants: { lengths: ["2M"], colors: ["Black"] },
    specs: { "SKU Code": "H1703", "Plating": "24K Gold Contacts", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Corrosion resistant connector for coastal or humid environments.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H1703.png"
  },
  {
    id: "hw-hdmi-4k-hdr-h1803",
    price: 53000,
    name: "HOWELL HDMI 4K Dynamic HDR Audio-Video Cable 2M (H1803)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 144,
    badge: "Dynamic HDR",
    sku: "H1803",
    tagline: "Dynamic HDR Color Depth | BT.2020 Support | 4K 60Hz",
    summary: "HDMI 2.0 cable optimized for wide color gamut HDR10+ and Dolby Vision playback.",
    variants: { lengths: ["2M"], colors: ["Dark Grey"] },
    specs: { "SKU Code": "H1803", "Color Depth": "12-Bit Deep Color", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Vibrant cinematic contrast for 4K OLED and QLED displays.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H1803.png"
  },
  {
    id: "hw-hdmi-4k-port-h2001",
    price: 36000,
    name: "HOWELL HDMI 4K Compact Portable Cable 1M (H2001)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.8,
    reviewsCount: 108,
    badge: "1M Portable",
    sku: "H2001",
    tagline: "1M Travel Length | Lightweight | 4K 60Hz High Speed",
    summary: "Compact 1-meter HDMI cable perfect for presentations and mobile kits.",
    variants: { lengths: ["1M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "H2001", "Length": "1 Meter", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Easy to store in laptop sleeves for business trips.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H2001.png"
  },
  {
    id: "hw-hdmi-4k-studio-h2103",
    price: 56000,
    name: "HOWELL HDMI 4K Pro Studio Broadcast Cable 2M (H2103)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 122,
    badge: "Pro Studio",
    sku: "H2103",
    tagline: "Broadcast Studio Grade | 18Gbps | High RF Rejection",
    summary: "Studio-grade HDMI cable designed for live video switchers and capture cards.",
    variants: { lengths: ["2M"], colors: ["Matte Black"] },
    specs: { "SKU Code": "H2103", "Application": "Studio & Broadcast", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Low jitter digital audio/video transmission for streaming rigs.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H2103.png"
  },
  {
    id: "hw-hdmi-8k-pro-h2303",
    price: 85000,
    name: "HOWELL HDMI 8K Dynamic HDR Ultra Pro Cable 2M (H2303)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 180,
    badge: "HDMI 8K Pro",
    sku: "H2303",
    tagline: "48Gbps Bandwidth | 8K 60Hz / 4K 120Hz | eARC & VRR",
    summary: "Next-gen HDMI 2.1 cable supporting 48Gbps, variable refresh rate (VRR), and eARC.",
    variants: { lengths: ["2M"], colors: ["Space Grey"] },
    specs: { "SKU Code": "H2303", "Bandwidth": "48 Gbps", "Resolution": "8K 60Hz / 4K 120Hz", "Warranty": "12-Month Warranty" },
    description: "Tear-free gaming experience for PlayStation 5 and RTX 40 series.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H2303.png"
  },
  {
    id: "hw-hdmi-8k-braid-h2403",
    price: 89000,
    name: "HOWELL HDMI 8K 48Gbps Braided Shielded Cable 2M (H2403)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 165,
    badge: "8K Braided",
    sku: "H2403",
    tagline: "Braided Cotton Armor | 48Gbps | 8K Ultra High Speed",
    summary: "Cotton braided HDMI 2.1 cable engineered with dual-layer aluminum foil shielding.",
    variants: { lengths: ["2M"], colors: ["Black/Silver Braid"] },
    specs: { "SKU Code": "H2403", "Jacket": "Cotton Braid", "Resolution": "8K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Premium look and feel with industrial-level bend protection.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H2403.png"
  },
  {
    id: "hw-hdmi-8k-slim-h2503",
    price: 92000,
    name: "HOWELL HDMI 8K Ultra-Slim Flexible Cable 2M (H2503)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 138,
    badge: "8K Slim",
    sku: "H2503",
    tagline: "Slim 4.2mm OD | 48Gbps 8K 60Hz | Ultra Flexible",
    summary: "Remarkably thin 4.2mm HDMI 2.1 cable delivering full 48Gbps bandwidth.",
    variants: { lengths: ["2M"], colors: ["Matte Black"] },
    specs: { "SKU Code": "H2503", "OD": "4.2mm Ultra Thin", "Resolution": "8K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Unmatched flexibility for compact camera monitors and gimbal rigs.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H2503.png"
  },
  {
    id: "hw-hdmi-8k-earc-h2603",
    price: 88000,
    name: "HOWELL HDMI 8K eARC High Refresh Cable 2M (H2603)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 172,
    badge: "eARC Master",
    sku: "H2603",
    tagline: "Enhanced Audio Return Channel | Dolby Atmos | 8K 60Hz",
    summary: "HDMI 2.1 cable tuned for lossless Dolby Atmos and DTS:X soundbars.",
    variants: { lengths: ["2M"], colors: ["Charcoal Grey"] },
    specs: { "SKU Code": "H2603", "Audio": "Lossless eARC / Dolby Atmos", "Resolution": "8K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Pristine audio return channel for high-end home theater soundbars.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H2603.png"
  },
  {
    id: "hw-hdmi-4k-multi-h2703",
    price: 50000,
    name: "HOWELL HDMI 4K Multi-Shielded AV Cable 2M (H2703)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 119,
    badge: "Multi-Shield",
    sku: "H2703",
    tagline: "Quad Shielding | EMI/RFI Immune | 4K 60Hz 18Gbps",
    summary: "Quad-layer shielded HDMI cable preventing interference near high-voltage cables.",
    variants: { lengths: ["2M"], colors: ["Black"] },
    specs: { "SKU Code": "H2703", "Shielding": "Quad Layer Foil+Mesh", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Zero signal dropout in high electromagnetic environments.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H2703.png"
  },
  {
    id: "hw-hdmi-4k-carbon-h2803",
    price: 65000,
    name: "HOWELL HDMI 4K Carbon Fiber Shell Cable 2M (H2803)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 140,
    badge: "Carbon Fiber",
    sku: "H2803",
    tagline: "Real Carbon Fiber Accents | Gold Contacts | 4K 60Hz",
    summary: "Luxury design HDMI cable featuring genuine carbon fiber hood styling.",
    variants: { lengths: ["2M"], colors: ["Carbon Black"] },
    specs: { "SKU Code": "H2803", "Hood Material": "Carbon Fiber + Zinc", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "High-end automotive inspired styling for executive desks.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H2803.png"
  },
  {
    id: "hw-hdmi-4k-cotton-h2903",
    price: 58000,
    name: "HOWELL HDMI 4K Cotton Braided Designer Cable 2M (H2903)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 126,
    badge: "Cotton Braid",
    sku: "H2903",
    tagline: "Soft-Touch Cotton Braid | Flexible & Durable | 4K 60Hz",
    summary: "Soft textured cotton jacket HDMI cable that bends smoothly without stiff resistance.",
    variants: { lengths: ["2M"], colors: ["Grey Cotton"] },
    specs: { "SKU Code": "H2903", "Jacket": "Braided Cotton", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Smooth, kink-free flexibility for clean desktop setups.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H2903.png"
  },
  {
    id: "hw-hdmi-8k-game-h3003",
    price: 96000,
    name: "HOWELL HDMI 8K Next-Gen Gaming Cable 2M (H3003)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 188,
    badge: "Gaming 8K",
    sku: "H3003",
    tagline: "4K 144Hz / 8K 60Hz | ALLM & QFT Low Latency | 48Gbps",
    summary: "Certified HDMI 2.1 gaming cable with Auto Low Latency Mode (ALLM) and Quick Frame Transport (QFT).",
    variants: { lengths: ["2M"], colors: ["Cyber Black"] },
    specs: { "SKU Code": "H3003", "Features": "ALLM, QFT, VRR", "Resolution": "8K 60Hz / 4K 144Hz", "Warranty": "12-Month Warranty" },
    description: "Ultra responsive gameplay with minimum display lag.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H3003.png"
  },
  {
    id: "hw-hdmi-4k-tangle-h3103",
    price: 52000,
    name: "HOWELL HDMI 4K Anti-Tangle Cable 2M (H3103)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.8,
    reviewsCount: 110,
    badge: "Anti-Tangle",
    sku: "H3103",
    tagline: "Anti-Kink Textured Jacket | 18Gbps | 4K 60Hz",
    summary: "Tangle-free textured cable jacket preventing knots during storage.",
    variants: { lengths: ["2M"], colors: ["Matte Black"] },
    specs: { "SKU Code": "H3103", "Texture": "Ribbed Anti-Tangle", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Tough exterior that coils smoothly every single time.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H3103.png"
  },
  {
    id: "hw-hdmi-4k-pro-h3203",
    price: 55000,
    name: "HOWELL HDMI 4K Pro Video Transmission Cable 2M (H3203)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 115,
    badge: "Pro Video",
    sku: "H3203",
    tagline: "Pro Grade Signal Purity | 18Gbps 4K 60Hz | Low Noise",
    summary: "High-purity OFC copper core HDMI cable ensuring zero pixel dropouts.",
    variants: { lengths: ["2M"], colors: ["Black"] },
    specs: { "SKU Code": "H3203", "Conductor": "OFC Copper 99.99%", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Accurate color rendering for graphic design and video editing.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H3203.png"
  },
  {
    id: "hw-hdmi-8k-bw-h3303",
    price: 98000,
    name: "HOWELL HDMI 8K High-Bandwidth 48Gbps Cable 2M (H3303)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 154,
    badge: "48Gbps Ultra",
    sku: "H3303",
    tagline: "Uncompressed 8K 60Hz | 48Gbps High Bandwidth | Dynamic HDR",
    summary: "Full spec HDMI 2.1 cable supporting uncompressed high-bandwidth multi-channel audio.",
    variants: { lengths: ["2M"], colors: ["Gunmetal Grey"] },
    specs: { "SKU Code": "H3303", "Bandwidth": "48 Gbps", "Resolution": "8K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Ready for high-end cinema projectors and master monitors.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H3303.png"
  },
  {
    id: "hw-hdmi-8k-lux-h3403",
    price: 105000,
    name: "HOWELL HDMI 8K Gold Plated Luxury Edition 2M (H3403)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 5.0,
    reviewsCount: 166,
    badge: "Luxury Gold",
    sku: "H3403",
    tagline: "Gold Mirror Finish | 48Gbps 8K 60Hz | Supreme Shielding",
    summary: "Luxury edition HDMI 2.1 cable featuring gold-accented metal plugs and braided sleeving.",
    variants: { lengths: ["2M"], colors: ["Gold Mirror"] },
    specs: { "SKU Code": "H3403", "Finish": "Gold Mirror Alloy", "Resolution": "8K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Flagship audiovisual cable for luxury home theater installations.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H3403.png"
  },
  {
    id: "hw-hdmi-4k-comm-h3503",
    price: 59000,
    name: "HOWELL HDMI 4K Commercial Grade Cable 2M (H3503)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 120,
    badge: "Commercial",
    sku: "H3503",
    tagline: "Heavy Duty In-Wall CL3 Rated | 4K 60Hz | 2M",
    summary: "CL3 fire-rated jacket HDMI cable certified for in-wall installation in commercial buildings.",
    variants: { lengths: ["2M"], colors: ["Matte Black"] },
    specs: { "SKU Code": "H3503", "Fire Rating": "CL3 In-Wall Certified", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Safe for in-wall routing inside conference rooms and offices.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/H3503.png"
  },
  {
    id: "hw-hdmi-typec-ch0101",
    price: 78000,
    name: "HOWELL Type-C to HDMI 4K 60Hz Converter Cable (CH0101)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 210,
    badge: "Type-C 4K 60Hz",
    sku: "CH0101",
    tagline: "Thunderbolt 3/4 & USB-C Compatible | 4K 60Hz | Plug & Play",
    summary: "Connect MacBook, iPad, or Android USB-C directly to 4K HDMI TV or monitor.",
    variants: { lengths: ["1.8M"], colors: ["Space Grey Metal"] },
    specs: { "SKU Code": "CH0101", "Interface": "USB-C to HDMI", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Direct plug and play connection with no drivers needed.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/CH0101.png"
  },
  {
    id: "hw-hdmi-typec-ch0201",
    price: 69000,
    name: "HOWELL Type-C to HDMI Adapter Aluminum 4K (CH0201)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.8,
    reviewsCount: 185,
    badge: "Type-C Adapter",
    sku: "CH0201",
    tagline: "Compact Dongle Adapter | Aluminum Shell | 4K 60Hz",
    summary: "Pocket-sized Type-C male to HDMI female dongle adapter with heat-dissipating aluminum shell.",
    variants: { lengths: ["Dongle 15cm"], colors: ["Silver Aluminum"] },
    specs: { "SKU Code": "CH0201", "Material": "Aluminum Alloy", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Essential pocket dongle for modern ultrabooks and MacBooks.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/CH0201.png"
  },
  {
    id: "hw-hdmi-typec-ch0301",
    price: 82000,
    name: "HOWELL Type-C to HDMI Braided Cable 4K 60Hz (CH0301)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 195,
    badge: "Type-C Braided",
    sku: "CH0301",
    tagline: "Nylon Braided Cable | Gold Plated Plugs | 4K 60Hz",
    summary: "Braided USB Type-C to HDMI display cable offering superior durability and zero lag.",
    variants: { lengths: ["2M"], colors: ["Grey Nylon Braid"] },
    specs: { "SKU Code": "CH0301", "Jacket": "High Density Nylon", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Seamless mirror and extend modes for dual-screen productivity.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/CH0301.png"
  },
  {
    id: "hw-hdmi-dp-dh0103",
    price: 68000,
    name: "HOWELL DisplayPort to HDMI 4K Converter Cable 2M (DH0103)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 160,
    badge: "DP to HDMI",
    sku: "DH0103",
    tagline: "DisplayPort PC to HDMI TV / Monitor | 4K 60Hz | Audio Synced",
    summary: "Uni-directional DisplayPort to HDMI converter cable for graphics cards.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "DH0103", "Direction": "DP Source to HDMI Sink", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Connect GPU DisplayPort output directly to 4K HDMI TV.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/DH0103.png"
  },
  {
    id: "hw-hdmi-minidp-dh0203",
    price: 65000,
    name: "HOWELL Mini DisplayPort to HDMI Cable 2M (DH0203)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.8,
    reviewsCount: 140,
    badge: "Mini DP to HDMI",
    sku: "DH0203",
    tagline: "Mini DP / Thunderbolt 2 to HDMI | 4K Support | 2M",
    summary: "Mini DP to HDMI cable ideal for Microsoft Surface and legacy Apple MacBook displays.",
    variants: { lengths: ["2M"], colors: ["White / Black"] },
    specs: { "SKU Code": "DH0203", "Compatibility": "Mini DP / Thunderbolt 2", "Resolution": "4K 30Hz / 1080P 120Hz", "Warranty": "12-Month Warranty" },
    description: "Connect Surface Pro or older MacBooks to external HDMI displays.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/DH0203.png"
  },
  {
    id: "hw-hdmi-dp-dh0301",
    price: 55000,
    name: "HOWELL DisplayPort to HDMI 4K Adapter Converter (DH0301)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 175,
    badge: "DP Adapter",
    sku: "DH0301",
    tagline: "DisplayPort Male to HDMI Female Adapter Dongle | 4K",
    summary: "Compact DP to HDMI female adapter allowing use of any standard HDMI cable.",
    variants: { lengths: ["Adapter Dongle"], colors: ["Black"] },
    specs: { "SKU Code": "DH0301", "Connector": "DP Male to HDMI Female", "Resolution": "4K 30Hz / 1080P 60Hz", "Warranty": "12-Month Warranty" },
    description: "Easily adapts existing HDMI cables to graphics card DP ports.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/DH0301.png"
  },
  {
    id: "hw-hdmi-mini-mh0301",
    price: 48000,
    name: "HOWELL Mini HDMI to HDMI High-Speed Cable (MH0301)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.9,
    reviewsCount: 132,
    badge: "Mini HDMI",
    sku: "MH0301",
    tagline: "Mini HDMI (Type C) to HDMI (Type A) | 4K 60Hz | DSLR & Camcorder",
    summary: "Bi-directional Mini HDMI to standard HDMI cable designed for DSLR cameras and graphics cards.",
    variants: { lengths: ["1.5M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "MH0301", "Connector": "Mini HDMI Type-C to Type-A", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Essential link for camera field monitors and capture devices.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/MH0301.png"
  },
  {
    id: "hw-hdmi-usb-usb0206",
    price: 115000,
    name: "HOWELL USB 3.0 to HDMI Multi-Display Adapter (USB0206)",
    category: "hdmi-video",
    categoryName: "HDMI & Video Cables",
    rating: 4.8,
    reviewsCount: 145,
    badge: "USB to HDMI",
    sku: "USB0206",
    tagline: "USB 3.0 External Graphic Card | Full HD 1080P | Dual Monitor",
    summary: "USB 3.0 to HDMI video adapter to add a second monitor to PCs without extra video ports.",
    variants: { lengths: ["Dongle Cable 20cm"], colors: ["Silver Aluminum"] },
    specs: { "SKU Code": "USB0206", "Input": "USB 3.0 5Gbps", "Resolution": "1080P 60Hz", "Warranty": "12-Month Warranty" },
    description: "Instantly expand your workstation to a dual-screen productivity setup.",
    image: "assets/Produk/Produk Batch 1/2. HDMI Cable/USB0206.png"
  },
  {
    id: "hw-audio-au0103",
    price: 52301,
    name: "HOWELL 6.35mm Male to XLR Female Audio Cable 2M (AU0103)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 4.9,
    reviewsCount: 185,
    badge: "XLR to 6.35mm",
    sku: "AU0103",
    tagline: "6.35mm Jack to XLR Female | Cotton Braided | 2M",
    summary: "Balanced 6.35mm TRS to XLR female audio cable featuring cotton-braided outer jacket.",
    variants: { lengths: ["2M"], colors: ["Grey Cotton Braided"] },
    specs: { "SKU Code": "AU0103", "Conductor": "OFC Pure Copper", "Jacket": "Cotton Braided", "Warranty": "12-Month Warranty" },
    description: "Pro-audio studio connection for microphones and mixers.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU0103.png"
  },
  {
    id: "hw-audio-au0203",
    price: 52301,
    name: "HOWELL 6.35mm Male to XLR Male Audio Cable 2M (AU0203)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 4.9,
    reviewsCount: 160,
    badge: "XLR to 6.35mm M",
    sku: "AU0203",
    tagline: "6.35mm Jack to XLR Male | Grey Cotton Braided | 2M",
    summary: "Heavy-duty 6.35mm jack to XLR male interconnect cable.",
    variants: { lengths: ["2M"], colors: ["Grey Cotton Braided"] },
    specs: { "SKU Code": "AU0203", "Conductor": "OFC 99.99%", "Jacket": "Cotton Braided", "Warranty": "12-Month Warranty" },
    description: "Stage-ready audio interconnect cable.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU0203.png"
  },
  {
    id: "hw-audio-au0303",
    price: 34290,
    name: "HOWELL 3.5mm Aux to 6.35mm Guitar Cable 2M (AU0303)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 4.9,
    reviewsCount: 220,
    badge: "Aux to 6.35mm",
    sku: "AU0303",
    tagline: "3.5mm AUX to 6.35mm Jack | Red Cotton Braided | 2M",
    summary: "Red cotton braided 3.5mm headphone jack to 6.35mm instrument audio adapter cable.",
    variants: { lengths: ["2M"], colors: ["Red Cotton Braided"] },
    specs: { "SKU Code": "AU0303", "Conductor": "OFC Oxygen Free Copper", "Warranty": "12-Month Warranty" },
    description: "Connect smartphones or laptops to amplifiers and audio interfaces.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU0303.png"
  },
  {
    id: "hw-audio-au0403",
    price: 38000,
    name: "HOWELL 6.35mm TRS Male to Male Audio Cable 2M (AU0403)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 5.0,
    reviewsCount: 140,
    badge: "6.35mm Stereo",
    sku: "AU0403",
    tagline: "6.35mm TRS Male to Male | Red Cotton Braided | 2M",
    summary: "Balanced 6.35mm 1/4 inch TRS stereo jack patch cable.",
    variants: { lengths: ["2M"], colors: ["Red Cotton Braided"] },
    specs: { "SKU Code": "AU0403", "Conductor": "OFC Core", "Warranty": "12-Month Warranty" },
    description: "Electric guitar and synthesizer audio cable.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU0403.png"
  },
  {
    id: "hw-audio-au0503",
    price: 36500,
    name: "HOWELL 3.5mm Male to 2RCA Stereo Audio Cable 2M (AU0503)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 4.9,
    reviewsCount: 210,
    badge: "3.5mm to 2RCA",
    sku: "AU0503",
    tagline: "3.5mm Mini Jack to 2RCA Stereo (Red/White) | Gold Plated | 2M",
    summary: "Stereo audio interconnect cable connecting phone or PC to speakers or home theater receiver.",
    variants: { lengths: ["2M"], colors: ["Black PVC / Gold"] },
    specs: { "SKU Code": "AU0503", "Connector": "3.5mm to 2x RCA Male", "Plating": "24K Gold", "Warranty": "12-Month Warranty" },
    description: "Crisp analog audio delivery with low crosstalk.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU0503.png"
  },
  {
    id: "hw-audio-au0603",
    price: 32000,
    name: "HOWELL 3.5mm Aux Male to Male Braided Cable 2M (AU0603)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 4.8,
    reviewsCount: 245,
    badge: "3.5mm Aux",
    sku: "AU0603",
    tagline: "3.5mm Stereo Aux to Aux | Durable Braid | Step-down Plug | 2M",
    summary: "Universal 3.5mm auxiliary audio cable with step-down connector fitting phone cases.",
    variants: { lengths: ["2M"], colors: ["Black Braided"] },
    specs: { "SKU Code": "AU0603", "Connector": "3.5mm Male to Male", "Warranty": "12-Month Warranty" },
    description: "Ideal for car stereos, headphones, and portable Bluetooth speakers.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU0603.png"
  },
  {
    id: "hw-audio-au0703",
    price: 42000,
    name: "HOWELL 2RCA to 2RCA Male Stereo Hi-Fi Cable 2M (AU0703)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 4.9,
    reviewsCount: 165,
    badge: "2RCA to 2RCA",
    sku: "AU0703",
    tagline: "Stereo Dual RCA Male to Male | OFC Conductor | Hi-Fi Grade | 2M",
    summary: "Dual RCA interconnect cable for amplifiers, DACs, and turntables.",
    variants: { lengths: ["2M"], colors: ["Charcoal Grey"] },
    specs: { "SKU Code": "AU0703", "Connector": "2RCA Male to 2RCA Male", "Conductor": "OFC 99.99%", "Warranty": "12-Month Warranty" },
    description: "Audiophile grade low-capacitance cable for warm analog sound.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU0703.png"
  },
  {
    id: "hw-audio-au0803",
    price: 45000,
    name: "HOWELL Optical Toslink Digital Audio Cable 2M (AU0803)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 5.0,
    reviewsCount: 190,
    badge: "Optical Toslink",
    sku: "AU0803",
    tagline: "S/PDIF Digital Optical Toslink | Fiber Core | Surround Sound | 2M",
    summary: "Digital optical audio cable delivering uncompressed 5.1/7.1 surround sound to soundbars.",
    variants: { lengths: ["2M"], colors: ["Matte Black"] },
    specs: { "SKU Code": "AU0803", "Core": "PMMA Optical Fiber", "Audio": "Dolby Digital & DTS", "Warranty": "12-Month Warranty" },
    description: "Zero ground loop electrical hum thanks to optical isolation.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU0803.png"
  },
  {
    id: "hw-audio-au0903",
    price: 58000,
    name: "HOWELL XLR Male to XLR Female Balanced Mic Cable 2M (AU0903)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 5.0,
    reviewsCount: 215,
    badge: "XLR Balanced",
    sku: "AU0903",
    tagline: "3-Pin Balanced XLR M-F | Heavy Shielding | Studio & Stage | 2M",
    summary: "Balanced 3-pin XLR microphone cable with zinc alloy die-cast connectors.",
    variants: { lengths: ["2M"], colors: ["Black"] },
    specs: { "SKU Code": "AU0903", "Connector": "3-Pin XLR Male to Female", "Conductor": "Balanced OFC Twisted Pair", "Warranty": "12-Month Warranty" },
    description: "Noise-free signal for condenser microphones and audio consoles.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU0903.png"
  },
  {
    id: "hw-audio-au1003",
    price: 31000,
    name: "HOWELL 3.5mm Headphone Jack Extension Cable 2M (AU1003)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 4.8,
    reviewsCount: 178,
    badge: "3.5mm Extension",
    sku: "AU1003",
    tagline: "3.5mm Male to 3.5mm Female Extension | Gold Plated | 2M",
    summary: "Extends the reach of your existing headphones or audio cables by 2 meters.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "AU1003", "Connector": "3.5mm M to 3.5mm F", "Warranty": "12-Month Warranty" },
    description: "Convenient extra reach without audio fidelity degradation.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU1003.png"
  },
  {
    id: "hw-audio-au1103",
    price: 28000,
    name: "HOWELL 3.5mm Audio Y-Splitter Cable (AU1103)",
    category: "audio",
    categoryName: "Audio & Instrument Cables",
    rating: 4.8,
    reviewsCount: 142,
    badge: "Audio Splitter",
    sku: "AU1103",
    tagline: "3.5mm Male to Dual 3.5mm Female Headphone Splitter | 20cm",
    summary: "Share music from one device with two pairs of headphones simultaneously.",
    variants: { lengths: ["20cm"], colors: ["Black"] },
    specs: { "SKU Code": "AU1103", "Type": "1 Male to 2 Female Splitter", "Warranty": "12-Month Warranty" },
    description: "Compact Y-splitter for flights and shared listening sessions.",
    image: "assets/Produk/Produk Batch 1/3. Audio Cable/AU1103.png"
  },
  {
    id: "hw-acc-ac01",
    price: 38000,
    name: "HOWELL USB-A to Lightning Fast Charging Cable (AC01)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 4.9,
    reviewsCount: 260,
    badge: "Fast Charge",
    sku: "AC01",
    tagline: "2.4A Fast Charging | Reinforced SR Joint | iPhone Compatible | 1M",
    summary: "Durable USB-A to Lightning charging and data transfer cable for iPhones and iPads.",
    variants: { lengths: ["1M"], colors: ["White"] },
    specs: { "SKU Code": "AC01", "Output": "5V 2.4A", "Connector": "USB-A to Lightning", "Warranty": "12-Month Warranty" },
    description: "Smart chip prevents over-voltage damage to your phone battery.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/AC01.png"
  },
  {
    id: "hw-acc-ac02",
    price: 35000,
    name: "HOWELL USB-A to Type-C 3A Fast Charging Cable (AC02)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 4.9,
    reviewsCount: 230,
    badge: "QC 3.0 3A",
    sku: "AC02",
    tagline: "Quick Charge 3.0 | 3A Max Output | 480Mbps Sync | 1M",
    summary: "Fast charging USB-A to USB Type-C cable with 56kÎ© pull-up resistor for safety.",
    variants: { lengths: ["1M"], colors: ["Black"] },
    specs: { "SKU Code": "AC02", "Output": "3A Max / QC 3.0", "Connector": "USB-A to Type-C", "Warranty": "12-Month Warranty" },
    description: "Compatible with Samsung, Xiaomi, and other Type-C smartphones.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/AC02.png"
  },
  {
    id: "hw-acc-ac03",
    price: 29000,
    name: "HOWELL USB-A to Micro USB Durable Data Cable (AC03)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 4.8,
    reviewsCount: 180,
    badge: "Micro USB 2.4A",
    sku: "AC03",
    tagline: "2.4A Charging | High-Speed 480Mbps Data | 1M",
    summary: "Reliable Micro-USB cable for power banks, wireless mice, and older mobile devices.",
    variants: { lengths: ["1M"], colors: ["Black"] },
    specs: { "SKU Code": "AC03", "Output": "5V 2.4A", "Connector": "USB-A to Micro USB", "Warranty": "12-Month Warranty" },
    description: "Built with pure copper wires for efficient charging.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/AC03.png"
  },
  {
    id: "hw-acc-ac04",
    price: 48000,
    name: "HOWELL 3-in-1 Universal Multi-Charging Cable (AC04)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 4.9,
    reviewsCount: 310,
    badge: "3-in-1 Multi",
    sku: "AC04",
    tagline: "Lightning + Type-C + Micro USB | 3.5A Total | Braided Cord | 1.2M",
    summary: "All-in-one charging cable featuring 3 connector heads to charge multiple devices at once.",
    variants: { lengths: ["1.2M"], colors: ["Red Braid / Black"] },
    specs: { "SKU Code": "AC04", "Output": "3.5A Total Max", "Connectors": "Lightning, Type-C, Micro-USB", "Warranty": "12-Month Warranty" },
    description: "The ultimate travel cable for family trips and road trips.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/AC04.png"
  },
  {
    id: "hw-acc-ac05",
    price: 45000,
    name: "HOWELL Type-C to Lightning PD 20W Fast Cable (AC05)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 5.0,
    reviewsCount: 275,
    badge: "PD 20W Fast",
    sku: "AC05",
    tagline: "Power Delivery 20W | 50% Charge in 30 Mins | iPhone Fast | 1M",
    summary: "USB-C to Lightning cable supporting Power Delivery 20W for iPhone 11-14 series.",
    variants: { lengths: ["1M"], colors: ["White"] },
    specs: { "SKU Code": "AC05", "Power Delivery": "PD 20W Max", "Connector": "USB-C to Lightning", "Warranty": "12-Month Warranty" },
    description: "Charges iPhone from 0 to 50% in approximately 30 minutes.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/AC05.png"
  },
  {
    id: "hw-acc-cc01",
    price: 49000,
    name: "HOWELL Dual USB Fast Car Charger 3.1A Metal (CC01)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 4.9,
    reviewsCount: 195,
    badge: "Dual USB Car",
    sku: "CC01",
    tagline: "Dual USB Ports | 3.1A Max | Solid Aluminum Alloy Body",
    summary: "Miniature dual USB car charger fitting flush into standard 12V/24V cigarette lighter sockets.",
    variants: { lengths: ["Car Adapter"], colors: ["Metallic Black"] },
    specs: { "SKU Code": "CC01", "Input": "DC 12V-24V", "Output": "5V 3.1A Dual", "Warranty": "12-Month Warranty" },
    description: "Heavy-duty aluminum alloy body with soft blue LED power ring.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/CC01.png"
  },
  {
    id: "hw-acc-cc02",
    price: 65000,
    name: "HOWELL USB-C PD + USB-A 36W Fast Car Charger (CC02)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 5.0,
    reviewsCount: 180,
    badge: "PD 36W Car",
    sku: "CC02",
    tagline: "PD 20W + QC 3.0 18W | 36W Dual Fast Charge | Intelligent IC",
    summary: "High-output 36W car charger capable of fast-charging two devices simultaneously on the go.",
    variants: { lengths: ["Car Adapter"], colors: ["Space Grey"] },
    specs: { "SKU Code": "CC02", "Total Output": "36W Max", "Ports": "1x USB-C PD, 1x USB-A QC3.0", "Warranty": "12-Month Warranty" },
    description: "Multi-protection circuit against overheating and short-circuits.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/CC02.png"
  },
  {
    id: "hw-charger-gan-65w",
    price: 298842,
    name: "HOWELL GaN III 65W Fast Charger (HW-C01)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 5.0,
    reviewsCount: 280,
    badge: "GaN III 65W",
    sku: "HW-C01",
    tagline: "GaN III Tech | Dual USB-C + USB-A | 65W Power Delivery",
    summary: "Compact 65W GaN III fast wall charger powering MacBooks, laptops, iPhones, and Android devices.",
    variants: { lengths: ["Wall Plug"], colors: ["Matte Black"] },
    specs: { "SKU Code": "HW-C01", "Output": "65W Max PD 3.0", "Warranty": "12-Month Warranty" },
    description: "High-efficiency Gallium Nitride III power delivery wall adapter.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/HW-C01.png"
  },
  {
    id: "hw-charger-pd-30w",
    price: 149378,
    name: "HOWELL 30W USB-C PD Fast Charger (HW-C02A)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 4.9,
    reviewsCount: 230,
    badge: "PD 30W Fast",
    sku: "HW-C02A",
    tagline: "30W Power Delivery | PPS Support | Fast Charge iPhone / Android",
    summary: "Ultra-compact 30W USB-C Power Delivery wall charger optimized for smartphones and tablets.",
    variants: { lengths: ["Wall Plug"], colors: ["Pure White"] },
    specs: { "SKU Code": "HW-C02A", "Output": "30W Max PD/PPS", "Warranty": "12-Month Warranty" },
    description: "Compact fast charger for latest iPhone and Samsung devices.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/HW-C02A.png"
  },
  {
    id: "hw-acc-hwc03",
    price: 58000,
    name: "HOWELL 100W PD Type-C to Type-C Braided Cable 1.5M (HW-C03)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 5.0,
    reviewsCount: 210,
    badge: "100W PD 5A",
    sku: "HW-C03",
    tagline: "100W Power Delivery | E-Marker Chip | 5A Fast Charge | 1.5M",
    summary: "High-power 100W Type-C cable with E-Marker smart chip to safely fast-charge laptops.",
    variants: { lengths: ["1.5M"], colors: ["Black Braided"] },
    specs: { "SKU Code": "HW-C03", "Power": "100W (20V/5A)", "Chip": "Smart E-Marker", "Warranty": "12-Month Warranty" },
    description: "Charges MacBook Pro, Dell XPS, and iPads at top speeds.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/HW-C03.png"
  },
  {
    id: "hw-acc-hwc03a",
    price: 42000,
    name: "HOWELL 60W Type-C to Type-C Fast Charging Cable 1M (HW-C03A)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 4.9,
    reviewsCount: 185,
    badge: "60W PD 3A",
    sku: "HW-C03A",
    tagline: "60W Power Delivery | 3A Output | Durable TPE | 1M",
    summary: "Everyday 60W USB-C to USB-C charging cable with flexible TPE jacket.",
    variants: { lengths: ["1M"], colors: ["White"] },
    specs: { "SKU Code": "HW-C03A", "Power": "60W (20V/3A)", "Warranty": "12-Month Warranty" },
    description: "Fast charging for iPad Pro, Nintendo Switch, and USB-C phones.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/HW-C03A.png"
  },
  {
    id: "hw-acc-hwc04",
    price: 89000,
    name: "HOWELL 15W Magnetic Fast Wireless Charger (HW-C04)",
    category: "computer-acc",
    categoryName: "Chargers & Mobile Acc",
    rating: 4.9,
    reviewsCount: 165,
    badge: "15W MagCharge",
    sku: "HW-C04",
    tagline: "Magnetic Wireless Charging | 15W Max | Slim Aluminum Disc",
    summary: "Snap-on magnetic wireless charger compatible with MagSafe iPhones and Qi wireless devices.",
    variants: { lengths: ["Charging Pad + 1M Cable"], colors: ["Silver Alloy"] },
    specs: { "SKU Code": "HW-C04", "Output": "15W / 10W / 7.5W / 5W", "Warranty": "12-Month Warranty" },
    description: "Strong magnetic alignment with sleek brushed aluminum body.",
    image: "assets/Produk/Produk Batch 1/4. Acc Ponsel/HW-C04.png"
  },
  {
    id: "hw-power-cpu-c13-15m",
    price: 22411,
    name: "HOWELL CPU AC Power Cord C13 (POW-101 - POW-102)",
    category: "power-cable",
    categoryName: "Power & PDU Cables",
    rating: 4.9,
    reviewsCount: 450,
    badge: "10A 250V C13",
    sku: "POW-101 - POW-102",
    tagline: "10A 220V | 3x0.75mmÂ² CCA | CEE 7/7 Schuko to C13",
    summary: "Standard EU Schuko CEE 7/7 to IEC C13 AC power cord for desktop PCs, monitors, and printers.",
    variants: { lengths: ["1.5M", "1.8M"], colors: ["Black PVC"] },
    specs: { "SKU Series": "POW-101 to POW-102", "Rating": "10A / 250V", "Warranty": "12-Month Warranty" },
    description: "Reliable power cable with molded plug stress relief.",
    image: "assets/Produk/Produk Batch 1/5. Cable Power/POW-101 - POW-102.png"
  },
  {
    id: "hw-power-c5-mickey-15m",
    price: 20917,
    name: "HOWELL Laptop Charger Power Cord C5 (POW-201 - POW-202)",
    category: "power-cable",
    categoryName: "Power & PDU Cables",
    rating: 4.9,
    reviewsCount: 390,
    badge: "C5 Clover 10A",
    sku: "POW-201 - POW-202",
    tagline: "10A 220V | 3x0.75mmÂ² CCS | CEE 7/7 to IEC C5",
    summary: "CEE 7/7 Schuko to 3-prong cloverleaf IEC C5 power cord for laptop charger adapters.",
    variants: { lengths: ["1.5M", "1.8M"], colors: ["Black PVC"] },
    specs: { "SKU Series": "POW-201 to POW-202", "Rating": "10A / 250V", "Warranty": "12-Month Warranty" },
    description: "Universal laptop charger power cord.",
    image: "assets/Produk/Produk Batch 1/5. Cable Power/POW-201 - POW-202.png"
  },
  {
    id: "hw-power-server-c14-c13",
    price: 42500,
    name: "HOWELL Server PDU Power Cord C13 to C14 (POW-301 - POW-302)",
    category: "power-cable",
    categoryName: "Power & PDU Cables",
    rating: 5.0,
    reviewsCount: 280,
    badge: "PDU C13-C14",
    sku: "POW-301 - POW-302",
    tagline: "10A/16A 250V | IEC C13 to IEC C14 Jumper Cord | Server Rack",
    summary: "Heavy-duty server rack PDU power extension cable with molded IEC C13 and C14 connectors.",
    variants: { lengths: ["1.8M", "3M"], colors: ["Black PVC"] },
    specs: { "SKU Series": "POW-301 to POW-302", "Current": "10A 250V", "Wire": "3x0.75mmÂ² Solid Core", "Warranty": "12-Month Warranty" },
    description: "Industrial server rack PDU jumper for data centers and UPS connections.",
    image: "assets/Produk/Produk Batch 1/5. Cable Power/POW-301 - POW-302.png"
  },
  {
    id: "hw-tws-hw01",
    price: 358628,
    name: "HOWELL ANC Wireless TWS Earbuds (HW01)",
    category: "earphone-tws",
    categoryName: "Audio & Earphones",
    rating: 5.0,
    reviewsCount: 190,
    badge: "35dB ANC",
    sku: "HW01",
    tagline: "Active Noise Cancellation | 35dB ANC | Bluetooth 5.3 | 32H Battery",
    summary: "Flagship hybrid active noise cancelling TWS earbuds with transparency mode and 32-hour playback battery life.",
    variants: { lengths: ["Earbuds + Case"], colors: ["Midnight Black"] },
    specs: { "SKU Code": "HW01", "ANC Depth": "35dB Hybrid ANC", "Battery": "32 Hours Total", "Warranty": "12-Month Warranty" },
    description: "Studio acoustics and immersive noise isolation TWS.",
    image: "assets/Produk/Produk Batch 1/6. Earphone/HW01.png"
  },
  {
    id: "hw-tws-hw02b",
    price: 268971,
    name: "HOWELL Dynamic Bass In-Ear Earphones Black (HW02-B)",
    category: "earphone-tws",
    categoryName: "Audio & Earphones",
    rating: 4.9,
    reviewsCount: 165,
    badge: "Deep Bass",
    sku: "HW02-B",
    tagline: "Bluetooth 5.3 | 40ms Low Latency | 10mm Dynamic Drivers | Black",
    summary: "Ultra-low latency 40ms gaming wireless earbuds with 10mm dynamic drivers in midnight black.",
    variants: { lengths: ["Earbuds + Case"], colors: ["Midnight Black"] },
    specs: { "SKU Code": "HW02-B", "Latency": "40ms Game Mode", "Color": "Midnight Black", "Warranty": "12-Month Warranty" },
    description: "Zero audio lag mobile gaming TWS.",
    image: "assets/Produk/Produk Batch 1/6. Earphone/HW02-B.png"
  },
  {
    id: "hw-tws-hw02w",
    price: 268971,
    name: "HOWELL Dynamic Bass In-Ear Earphones White (HW02-W)",
    category: "earphone-tws",
    categoryName: "Audio & Earphones",
    rating: 4.9,
    reviewsCount: 150,
    badge: "Deep Bass",
    sku: "HW02-W",
    tagline: "Bluetooth 5.3 | 40ms Low Latency | Pure White Finish",
    summary: "Ultra-low latency 40ms gaming wireless earbuds in clean pure white finish.",
    variants: { lengths: ["Earbuds + Case"], colors: ["Pure White"] },
    specs: { "SKU Code": "HW02-W", "Latency": "40ms Game Mode", "Color": "Pure White", "Warranty": "12-Month Warranty" },
    description: "Crisp acoustic soundstage with powerful dynamic bass punch.",
    image: "assets/Produk/Produk Batch 1/6. Earphone/HW02-W.png"
  },
  {
    id: "hw-tws-hw03",
    price: 194195,
    name: "HOWELL Studio In-Ear Monitor Dual Driver (HW03-W & HW03-B)",
    category: "earphone-tws",
    categoryName: "Audio & Earphones",
    rating: 4.8,
    reviewsCount: 140,
    badge: "Studio Dual",
    sku: "HW03-W & HW03-B",
    tagline: "Dual Dynamic Titanium Drivers | Detachable Cable | Audiophile Hi-Res",
    summary: "Hi-Res wired in-ear studio monitor earphones with titanium driver diaphragms.",
    variants: { lengths: ["1.2M Cable"], colors: ["Black & White Edition"] },
    specs: { "SKU Series": "HW03-W & HW03-B", "Driver": "10mm Titanium Dual Core", "Warranty": "12-Month Warranty" },
    description: "Clean voice calls and uncolored audiophile music listening.",
    image: "assets/Produk/Produk Batch 1/6. Earphone/HW03-W & HW03-B.png"
  },
  {
    id: "hw-tws-hw04",
    price: 78000,
    name: "HOWELL Type-C Digital Hi-Fi Earphones with Mic (HW04)",
    category: "earphone-tws",
    categoryName: "Audio & Earphones",
    rating: 4.8,
    reviewsCount: 175,
    badge: "Type-C DAC",
    sku: "HW04",
    tagline: "Built-in 24-bit DAC | Lossless Type-C Audio | In-Line Remote",
    summary: "Digital Type-C earphones featuring lossless HD audio and built-in microphone.",
    variants: { lengths: ["1.2M Cable"], colors: ["Metallic Grey"] },
    specs: { "SKU Code": "HW04", "DAC": "24-Bit / 96kHz Digital", "Connector": "USB Type-C", "Warranty": "12-Month Warranty" },
    description: "Plug and play digital earphones for Samsung, iPad, and Xiaomi.",
    image: "assets/Produk/Produk Batch 1/6. Earphone/HW04.png"
  },
  {
    id: "hw-tws-hw05",
    price: 85000,
    name: "HOWELL Lightning DAC In-Ear Earphones for iPhone (HW05)",
    category: "earphone-tws",
    categoryName: "Audio & Earphones",
    rating: 4.9,
    reviewsCount: 160,
    badge: "Lightning DAC",
    sku: "HW05",
    tagline: "Direct Lightning Plug | HD Microphone | Ergonomic Fit",
    summary: "In-ear stereo earphones with direct Lightning connection for iPhone.",
    variants: { lengths: ["1.2M Cable"], colors: ["Pure White"] },
    specs: { "SKU Code": "HW05", "Interface": "Apple Lightning", "Driver": "10mm Composite Diaphragm", "Warranty": "12-Month Warranty" },
    description: "Direct Lightning earphones with clear call microphone.",
    image: "assets/Produk/Produk Batch 1/6. Earphone/HW05.png"
  },
  {
    id: "hw-tws-hw06",
    price: 135000,
    name: "HOWELL Sport Wireless Bluetooth Neckband Earphones (HW06)",
    category: "earphone-tws",
    categoryName: "Audio & Earphones",
    rating: 4.8,
    reviewsCount: 145,
    badge: "Sport Neckband",
    sku: "HW06",
    tagline: "IPX5 Sweatproof | 18-Hour Battery | Magnetic Earbuds",
    summary: "Flexible ergonomic neckband wireless earphones built for running and workouts.",
    variants: { lengths: ["Neckband"], colors: ["Sport Black"] },
    specs: { "SKU Code": "HW06", "Waterproof": "IPX5 Sweatproof", "Playtime": "18 Hours Continuous", "Warranty": "12-Month Warranty" },
    description: "Secure fit magnetic earbuds that won't fall out during vigorous exercise.",
    image: "assets/Produk/Produk Batch 1/6. Earphone/HW06.png"
  },
  {
    id: "hw-tws-hw07",
    price: 175000,
    name: "HOWELL True Wireless Stereo ENC Earbuds (HW07)",
    category: "earphone-tws",
    categoryName: "Audio & Earphones",
    rating: 4.9,
    reviewsCount: 185,
    badge: "Dual Mic ENC",
    sku: "HW07",
    tagline: "Environmental Noise Cancellation | 4 Microphones | 28H Playtime",
    summary: "Crystal-clear calling TWS earbuds with quad-mic environmental noise cancellation.",
    variants: { lengths: ["Earbuds + Case"], colors: ["Glossy White"] },
    specs: { "SKU Code": "HW07", "ENC": "Quad-Mic Noise Canceling", "Bluetooth": "v5.3 Low Energy", "Warranty": "12-Month Warranty" },
    description: "Filters out background street and office noise during phone calls.",
    image: "assets/Produk/Produk Batch 1/6. Earphone/HW07.png"
  },
  {
    id: "hw-adp-001",
    price: 28000,
    name: "HOWELL HDMI Male to Female 90-Degree Angle Adapter (ADP001)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 210,
    badge: "90D HDMI",
    sku: "ADP001",
    tagline: "Right Angle 90-Degree | 4K 60Hz | Space Saver",
    summary: "Solves tight clearance behind wall-mounted TVs by redirecting cables at a 90-degree angle.",
    variants: { lengths: ["Adapter"], colors: ["Black Gold Plated"] },
    specs: { "SKU Code": "ADP001", "Angle": "90 Degree Right Angle", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Prevents severe bending and damage to HDMI cables on wall installations.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP001.png"
  },
  {
    id: "hw-adp-series",
    price: 35000,
    name: "HOWELL High-Precision Display & Audio Adapter Series (ADP002 - ADP013)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 5.0,
    reviewsCount: 180,
    badge: "Adapter Series",
    sku: "ADP002 - ADP013",
    tagline: "Complete Adapter Series | Display & Audio | Gold Plated",
    summary: "Professional grade display and interconnect adapters from ADP002 through ADP013.",
    variants: { lengths: ["Universal"], colors: ["Gold / Black"] },
    specs: { "SKU Series": "ADP002 to ADP013", "Material": "High Impact PVC + Gold Pins", "Warranty": "12-Month Warranty" },
    description: "Versatile adapter selection covering HDMI, DVI, VGA, and DisplayPort requirements.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP002 - ADP013.png"
  },
  {
    id: "hw-adp-002",
    price: 25000,
    name: "HOWELL HDMI Female to Female Coupler Extender (ADP002)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 195,
    badge: "HDMI Coupler",
    sku: "ADP002",
    tagline: "Join Two HDMI Cables | 4K 60Hz | Zero Latency",
    summary: "Extends HDMI run length by connecting two male cables together seamlessly.",
    variants: { lengths: ["Coupler"], colors: ["Black"] },
    specs: { "SKU Code": "ADP002", "Connector": "HDMI Female to HDMI Female", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Sturdy female-to-female barrel connector with gold-plated pins.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP002.png"
  },
  {
    id: "hw-adp-003",
    price: 28000,
    name: "HOWELL HDMI Male to Mini HDMI Female Adapter (ADP003)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 140,
    badge: "Mini HDMI",
    sku: "ADP003",
    tagline: "Standard HDMI M to Mini HDMI F | 4K 60Hz | Gold Plated",
    summary: "Converts standard HDMI plug to connect with Mini HDMI cables.",
    variants: { lengths: ["Adapter"], colors: ["Black"] },
    specs: { "SKU Code": "ADP003", "Connectors": "HDMI Male to Mini HDMI Female", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Essential adapter for tablets, camcorders, and graphics cards.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP003.png"
  },
  {
    id: "hw-adp-004",
    price: 28000,
    name: "HOWELL HDMI Male to Micro HDMI Female Adapter (ADP004)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 135,
    badge: "Micro HDMI",
    sku: "ADP004",
    tagline: "Standard HDMI M to Micro HDMI F | 4K 60Hz | Gold Plated",
    summary: "Converts standard HDMI output to accept Micro HDMI device cables.",
    variants: { lengths: ["Adapter"], colors: ["Black"] },
    specs: { "SKU Code": "ADP004", "Connectors": "HDMI Male to Micro HDMI Female", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Compatible with action cameras, Raspberry Pi 4, and ultrabooks.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP004.png"
  },
  {
    id: "hw-adp-005",
    price: 32000,
    name: "HOWELL DVI 24+1 Male to HDMI Female Adapter (ADP005)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 170,
    badge: "DVI to HDMI",
    sku: "ADP005",
    tagline: "DVI-D 24+1 Male to HDMI Female | Bi-Directional | 1080P",
    summary: "Converts DVI graphics card output to plug in standard HDMI cables.",
    variants: { lengths: ["Adapter"], colors: ["Black Gold Plated"] },
    specs: { "SKU Code": "ADP005", "Connectors": "DVI-D 24+1 Male to HDMI Female", "Resolution": "1920x1200 / 1080P", "Warranty": "12-Month Warranty" },
    description: "Thumb screws secure firm connection to computer graphics ports.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP005.png"
  },
  {
    id: "hw-adp-006",
    price: 32000,
    name: "HOWELL DVI 24+1 Female to HDMI Male Adapter (ADP006)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 155,
    badge: "HDMI to DVI",
    sku: "ADP006",
    tagline: "HDMI Male to DVI-D 24+1 Female | Gold Plated | 1080P",
    summary: "Converts HDMI source signal into a female DVI socket for DVI monitor cables.",
    variants: { lengths: ["Adapter"], colors: ["Black Gold Plated"] },
    specs: { "SKU Code": "ADP006", "Connectors": "HDMI Male to DVI-D Female", "Resolution": "1080P 60Hz", "Warranty": "12-Month Warranty" },
    description: "Gold-plated pins ensure clean digital signal transmission.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP006.png"
  },
  {
    id: "hw-adp-007",
    price: 30000,
    name: "HOWELL VGA Male to DVI 24+5 Female Converter Adapter (ADP007)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 125,
    badge: "VGA to DVI",
    sku: "ADP007",
    tagline: "VGA 15-Pin Male to DVI-I 24+5 Female | Analog Video",
    summary: "Connects VGA display outputs to DVI-I monitor cables.",
    variants: { lengths: ["Adapter"], colors: ["White / Black"] },
    specs: { "SKU Code": "ADP007", "Connectors": "VGA Male to DVI-I 24+5 Female", "Type": "Analog Passthrough", "Warranty": "12-Month Warranty" },
    description: "Molded housing with secure finger thumb screws.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP007.png"
  },
  {
    id: "hw-adp-008",
    price: 30000,
    name: "HOWELL VGA Female to DVI 24+5 Male Converter Adapter (ADP008)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 130,
    badge: "DVI to VGA",
    sku: "ADP008",
    tagline: "DVI-I 24+5 Male to VGA 15-Pin Female | Analog Passthrough",
    summary: "Connects DVI-I ports on graphics cards directly to VGA cables.",
    variants: { lengths: ["Adapter"], colors: ["White / Black"] },
    specs: { "SKU Code": "ADP008", "Connectors": "DVI-I 24+5 Male to VGA Female", "Type": "Analog Passthrough", "Warranty": "12-Month Warranty" },
    description: "Converts DVI-I port on PC to standard 15-pin VGA monitor.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP008.png"
  },
  {
    id: "hw-adp-009",
    price: 42000,
    name: "HOWELL DisplayPort Male to HDMI Female Adapter (ADP009)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 185,
    badge: "DP to HDMI",
    sku: "ADP009",
    tagline: "DP Male to HDMI Female Dongle | 4K 30Hz / 1080P",
    summary: "Connects PC DisplayPort output to any HDMI TV or monitor cable.",
    variants: { lengths: ["Adapter Dongle"], colors: ["Black"] },
    specs: { "SKU Code": "ADP009", "Connectors": "DisplayPort Male to HDMI Female", "Resolution": "4K 30Hz / 1080P", "Warranty": "12-Month Warranty" },
    description: "Latch button prevents accidental disconnection from GPU port.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP009.png"
  },
  {
    id: "hw-adp-010",
    price: 45000,
    name: "HOWELL Mini DisplayPort to HDMI Converter Adapter (ADP010)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 165,
    badge: "Mini DP HDMI",
    sku: "ADP010",
    tagline: "Mini DP Male to HDMI Female | Mac & Surface Compatible",
    summary: "Mini DisplayPort to HDMI adapter for MacBooks and laptops.",
    variants: { lengths: ["Adapter Dongle"], colors: ["White"] },
    specs: { "SKU Code": "ADP010", "Connectors": "Mini DP Male to HDMI Female", "Resolution": "1080P / 4K 30Hz", "Warranty": "12-Month Warranty" },
    description: "Compact dongle for connecting MacBooks to meeting room displays.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP010.png"
  },
  {
    id: "hw-adp-011",
    price: 48000,
    name: "HOWELL DisplayPort Male to VGA Female Adapter (ADP011)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 150,
    badge: "DP to VGA",
    sku: "ADP011",
    tagline: "DP Male to VGA 15-Pin Female | Active IC Chipset | 1080P",
    summary: "Connects modern DisplayPort GPUs to legacy VGA monitors and projectors.",
    variants: { lengths: ["Adapter Dongle"], colors: ["Black"] },
    specs: { "SKU Code": "ADP011", "Connectors": "DP Male to VGA 15-Pin Female", "Chipset": "Active Digital to Analog", "Warranty": "12-Month Warranty" },
    description: "Active digital conversion delivers crisp 1080P analog video.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP011.png"
  },
  {
    id: "hw-adp-012",
    price: 49000,
    name: "HOWELL Mini DisplayPort to VGA Converter Adapter (ADP012)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 140,
    badge: "Mini DP VGA",
    sku: "ADP012",
    tagline: "Mini DP to VGA Female | Projector Adapter | 1080P",
    summary: "Presentation adapter for MacBooks and Surface tablets to VGA projectors.",
    variants: { lengths: ["Adapter Dongle"], colors: ["White"] },
    specs: { "SKU Code": "ADP012", "Connectors": "Mini DP to VGA Female", "Resolution": "1920x1200 / 1080P", "Warranty": "12-Month Warranty" },
    description: "Reliable classroom and office presentation companion.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP012.png"
  },
  {
    id: "hw-adp-013",
    price: 46000,
    name: "HOWELL DisplayPort Male to DVI Female Adapter (ADP013)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 135,
    badge: "DP to DVI",
    sku: "ADP013",
    tagline: "DisplayPort Male to DVI 24+1 Female | Digital Video",
    summary: "Connects DisplayPort graphics ports to DVI desktop monitors.",
    variants: { lengths: ["Adapter Dongle"], colors: ["Black"] },
    specs: { "SKU Code": "ADP013", "Connectors": "DP Male to DVI-D Female", "Resolution": "1920x1080 Full HD", "Warranty": "12-Month Warranty" },
    description: "Direct digital video connection with locking DP latch.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP013.png"
  },
  {
    id: "hw-adp-014",
    price: 24000,
    name: "HOWELL USB 3.0 to Type-C OTG Metal Adapter (ADP014)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 220,
    badge: "OTG Metal",
    sku: "ADP014",
    tagline: "USB 3.0 Male to USB-C Female | 5Gbps | Zinc Alloy",
    summary: "Adapts older USB-A ports to accept modern Type-C devices and cables.",
    variants: { lengths: ["Plug"], colors: ["Space Grey Metal"] },
    specs: { "SKU Code": "ADP014", "Speed": "USB 3.0 5Gbps", "Material": "Zinc Alloy Shell", "Warranty": "12-Month Warranty" },
    description: "Compact metal casing resistant to scratches and overheating.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP014.png"
  },
  {
    id: "hw-adp-015",
    price: 24000,
    name: "HOWELL Type-C to USB 3.0 Female OTG Adapter (ADP015)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 240,
    badge: "Type-C OTG",
    sku: "ADP015",
    tagline: "Type-C Male to USB-A 3.0 Female | Flash Drive OTG | 5Gbps",
    summary: "Plug flash drives, mice, and keyboards directly into Type-C phones & laptops.",
    variants: { lengths: ["Plug"], colors: ["Space Grey Metal"] },
    specs: { "SKU Code": "ADP015", "Interface": "Type-C to USB 3.0 A Female", "Speed": "5Gbps SuperSpeed", "Warranty": "12-Month Warranty" },
    description: "Instant OTG support for tablets and smartphones.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP015.png"
  },
  {
    id: "hw-adp-016",
    price: 18000,
    name: "HOWELL Micro USB to Type-C Adapter Converter (ADP016)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 175,
    badge: "Micro to Type-C",
    sku: "ADP016",
    tagline: "Micro USB Female to Type-C Male | Fast Charge & Sync",
    summary: "Reuse your old Micro USB cables on new USB-C devices easily.",
    variants: { lengths: ["Plug"], colors: ["Black / Silver"] },
    specs: { "SKU Code": "ADP016", "Connectors": "Micro USB F to Type-C M", "Support": "Charging & Sync", "Warranty": "12-Month Warranty" },
    description: "Compact plug converter with 56kÎ© pull-up safety resistor.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP016.png"
  },
  {
    id: "hw-adp-017",
    price: 18000,
    name: "HOWELL Type-C to Micro USB Adapter Converter (ADP017)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 160,
    badge: "Type-C to Micro",
    sku: "ADP017",
    tagline: "Type-C Female to Micro USB Male | Charge & Data",
    summary: "Charge legacy Micro USB devices using Type-C chargers.",
    variants: { lengths: ["Plug"], colors: ["Black / Silver"] },
    specs: { "SKU Code": "ADP017", "Connectors": "Type-C F to Micro USB M", "Warranty": "12-Month Warranty" },
    description: "Keep one Type-C charger for all your devices.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP017.png"
  },
  {
    id: "hw-adp-018",
    price: 22000,
    name: "HOWELL USB-A Male to USB-A Female 90-Degree Adapter (ADP018)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 130,
    badge: "90D USB-A",
    sku: "ADP018",
    tagline: "USB 3.0 90-Degree Elbow Angle | Port Saver",
    summary: "Protects USB ports in tight spaces from cable bend stress.",
    variants: { lengths: ["Adapter"], colors: ["Black PVC"] },
    specs: { "SKU Code": "ADP018", "Angle": "90 Degree Right Angle", "Speed": "USB 3.0 5Gbps", "Warranty": "12-Month Warranty" },
    description: "Ideal for tight wall mounts and behind PC cases.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP018.png"
  },
  {
    id: "hw-adp-019",
    price: 20000,
    name: "HOWELL USB-A Female to Female Coupler Extension (ADP019)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 140,
    badge: "USB Coupler",
    sku: "ADP019",
    tagline: "USB 3.0 Female to Female Joiner | 5Gbps Data Extension",
    summary: "Joins two standard USB male cables together to increase total length.",
    variants: { lengths: ["Coupler"], colors: ["Black"] },
    specs: { "SKU Code": "ADP019", "Connectors": "USB 3.0 Female to Female", "Speed": "5Gbps SuperSpeed", "Warranty": "12-Month Warranty" },
    description: "High-speed USB extension coupler with gold-plated pins.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP019.png"
  },
  {
    id: "hw-adp-020",
    price: 26000,
    name: "HOWELL 3.5mm Male to 6.35mm Female Gold Audio Adapter (ADP020)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 195,
    badge: "3.5 to 6.35",
    sku: "ADP020",
    tagline: "3.5mm Plug to 1/4\" (6.35mm) Jack | 24K Gold Plated",
    summary: "Connect studio 6.35mm headphones to phones, tablets, or laptops.",
    variants: { lengths: ["Audio Plug"], colors: ["Full Gold Plated"] },
    specs: { "SKU Code": "ADP020", "Connectors": "3.5mm M to 6.35mm F", "Plating": "24K Gold", "Warranty": "12-Month Warranty" },
    description: "Solid brass construction with knurled grip pattern.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP020.png"
  },
  {
    id: "hw-adp-021",
    price: 26000,
    name: "HOWELL 6.35mm Male to 3.5mm Female Gold Audio Adapter (ADP021)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 205,
    badge: "6.35 to 3.5",
    sku: "ADP021",
    tagline: "1/4\" (6.35mm) Plug to 3.5mm Jack | 24K Gold Plated",
    summary: "Connect standard 3.5mm headphones to guitar amps and mixers.",
    variants: { lengths: ["Audio Plug"], colors: ["Full Gold Plated"] },
    specs: { "SKU Code": "ADP021", "Connectors": "6.35mm M to 3.5mm F", "Plating": "24K Gold", "Warranty": "12-Month Warranty" },
    description: "Audiophile grade connection for electric instruments and mixers.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP021.png"
  },
  {
    id: "hw-adp-022",
    price: 25000,
    name: "HOWELL 3.5mm Female to Dual RCA Male Audio Splitter (ADP022)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 150,
    badge: "3.5F to 2RCA",
    sku: "ADP022",
    tagline: "3.5mm Aux Female to Dual RCA Male | Stereo Splitter",
    summary: "Adapts 3.5mm aux cables into red and white RCA audio inputs.",
    variants: { lengths: ["Adapter"], colors: ["Black / Red / White"] },
    specs: { "SKU Code": "ADP022", "Connectors": "3.5mm F to 2x RCA M", "Channels": "Stereo Left/Right", "Warranty": "12-Month Warranty" },
    description: "Connect mobile devices to vintage stereo receivers.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP022.png"
  },
  {
    id: "hw-adp-023",
    price: 25000,
    name: "HOWELL 2RCA Female to 3.5mm Male Stereo Adapter (ADP023)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 145,
    badge: "2RCA to 3.5M",
    sku: "ADP023",
    tagline: "Dual RCA Female to 3.5mm Male Plug | Stereo Audio",
    summary: "Connects RCA cables directly into standard 3.5mm headphone jacks.",
    variants: { lengths: ["Adapter"], colors: ["Black Gold Plated"] },
    specs: { "SKU Code": "ADP023", "Connectors": "2x RCA F to 3.5mm M", "Warranty": "12-Month Warranty" },
    description: "Simple audio routing for soundcards and powered speakers.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP023.png"
  },
  {
    id: "hw-adp-024",
    price: 20000,
    name: "HOWELL RCA Female to RCA Female Coupler Joiner (ADP024)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 120,
    badge: "RCA Coupler",
    sku: "ADP024",
    tagline: "RCA Female to Female Joiner | Audio / Video Extension",
    summary: "Connects two RCA cables together to extend overall reach.",
    variants: { lengths: ["Coupler"], colors: ["Gold / Silver"] },
    specs: { "SKU Code": "ADP024", "Connectors": "RCA Female to RCA Female", "Warranty": "12-Month Warranty" },
    description: "Compact barrel joiner for subwoofer or composite video cables.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP024.png"
  },
  {
    id: "hw-adp-025",
    price: 22000,
    name: "HOWELL Optical Toslink to 3.5mm Mini Toslink Adapter (ADP025)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 135,
    badge: "Mini Toslink",
    sku: "ADP025",
    tagline: "Standard Toslink F to 3.5mm Optical M | Digital Audio",
    summary: "Connects optical cables to MacBook or DAC 3.5mm optical audio outputs.",
    variants: { lengths: ["Adapter"], colors: ["Gold Plated Tip"] },
    specs: { "SKU Code": "ADP025", "Type": "Digital Optical Audio", "Warranty": "12-Month Warranty" },
    description: "Lossless S/PDIF digital fiber optic conversion.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP025.png"
  },
  {
    id: "hw-adp-026",
    price: 22000,
    name: "HOWELL Optical Toslink Female Coupler Adapter (ADP026)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 125,
    badge: "Toslink Coupler",
    sku: "ADP026",
    tagline: "Toslink F to Toslink F Coupler | Optical Extension",
    summary: "Extends digital optical fiber audio cables without light loss.",
    variants: { lengths: ["Coupler"], colors: ["Black Gold"] },
    specs: { "SKU Code": "ADP026", "Connectors": "Toslink F to Toslink F", "Warranty": "12-Month Warranty" },
    description: "Precision alignment sleeve protects the fiber optic lens.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP026.png"
  },
  {
    id: "hw-adp-027",
    price: 22000,
    name: "HOWELL 3.5mm Male to Female Right Angle 90D Adapter (ADP027)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 160,
    badge: "90D Audio",
    sku: "ADP027",
    tagline: "3.5mm 90-Degree Right Angle Adapter | 4-Pole TRRS",
    summary: "Low-profile right-angle 3.5mm plug for flush smartphone headphone sockets.",
    variants: { lengths: ["Adapter"], colors: ["Gold Plated"] },
    specs: { "SKU Code": "ADP027", "Pole": "4-Pole TRRS (Mic Supported)", "Angle": "90 Degree", "Warranty": "12-Month Warranty" },
    description: "Prevents bending fatigue on headphone wires plugged into phones.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP027.png"
  },
  {
    id: "hw-adp-028",
    price: 38000,
    name: "HOWELL Type-C to 3.5mm Headphone Jack DAC Adapter (ADP028)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 210,
    badge: "Type-C DAC",
    sku: "ADP028",
    tagline: "Built-in DAC Chip | 24-Bit / 96kHz | Hi-Res Audio",
    summary: "High-resolution Type-C to 3.5mm headphone audio adapter with smart decoding chip.",
    variants: { lengths: ["Dongle 10cm"], colors: ["Silver Aluminum"] },
    specs: { "SKU Code": "ADP028", "DAC": "24-Bit / 96kHz Digital", "Connector": "USB-C to 3.5mm Female", "Warranty": "12-Month Warranty" },
    description: "Compatible with iPad, Samsung Galaxy, and Pixel devices.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP028.png"
  },
  {
    id: "hw-adp-029",
    price: 42000,
    name: "HOWELL Lightning to 3.5mm Headphone Jack Audio Adapter (ADP029)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 195,
    badge: "Lightning Audio",
    sku: "ADP029",
    tagline: "Lightning to 3.5mm Aux Adapter | Lossless Sound",
    summary: "Connect traditional headphones to iPhone Lightning ports with lossless sound.",
    variants: { lengths: ["Dongle 10cm"], colors: ["Pure White"] },
    specs: { "SKU Code": "ADP029", "Interface": "Lightning to 3.5mm F", "Warranty": "12-Month Warranty" },
    description: "High fidelity audio conversion with inline volume control support.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP029.png"
  },
  {
    id: "hw-adp-030",
    price: 20000,
    name: "HOWELL RJ45 Female to Female Network Coupler Joiner (ADP030)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 180,
    badge: "RJ45 Coupler",
    sku: "ADP030",
    tagline: "Cat6 RJ45 Inline Coupler | Gigabit 1000Mbps | Keystone",
    summary: "Connects two Ethernet patch cables end-to-end without loss of Gigabit speed.",
    variants: { lengths: ["Coupler"], colors: ["White / Black"] },
    specs: { "SKU Code": "ADP030", "Bandwidth": "Gigabit 1000Mbps", "Type": "RJ45 8P8C Coupler", "Warranty": "12-Month Warranty" },
    description: "Gold-plated 8P8C contacts ensure reliable network handoff.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP030.png"
  },
  {
    id: "hw-adp-031",
    price: 28000,
    name: "HOWELL RJ45 1 to 2 Ethernet Splitter Adapter (ADP031)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 160,
    badge: "RJ45 Splitter",
    sku: "ADP031",
    tagline: "RJ45 1 Male to 2 Female Splitter | Network Hub Adapter",
    summary: "Splits an Ethernet cable line for alternating device access in offices.",
    variants: { lengths: ["Adapter"], colors: ["Black"] },
    specs: { "SKU Code": "ADP031", "Interface": "1 RJ45 In, 2 RJ45 Out", "Warranty": "12-Month Warranty" },
    description: "Convenient hardware network splitter.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP031.png"
  },
  {
    id: "hw-adp-032",
    price: 95000,
    name: "HOWELL USB 3.0 to Gigabit RJ45 Ethernet Adapter (ADP032)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 215,
    badge: "USB Gigabit LAN",
    sku: "ADP032",
    tagline: "USB 3.0 to 1000Mbps Gigabit RJ45 | Aluminum Housing",
    summary: "Adds a fast 1000Mbps Gigabit LAN network port to any PC or laptop via USB.",
    variants: { lengths: ["Dongle 15cm"], colors: ["Silver Aluminum"] },
    specs: { "SKU Code": "ADP032", "Speed": "10/100/1000 Mbps", "Interface": "USB 3.0 to RJ45", "Warranty": "12-Month Warranty" },
    description: "High-speed wired network connection for ultrabooks without LAN ports.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP032.png"
  },
  {
    id: "hw-adp-033",
    price: 98000,
    name: "HOWELL Type-C to Gigabit RJ45 Ethernet Lan Adapter (ADP033)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 5.0,
    reviewsCount: 230,
    badge: "Type-C LAN",
    sku: "ADP033",
    tagline: "USB-C to Gigabit Ethernet 1000Mbps | MacBook & iPad",
    summary: "Reliable, high-speed wired internet connection for modern Type-C laptops.",
    variants: { lengths: ["Dongle 15cm"], colors: ["Space Grey Aluminum"] },
    specs: { "SKU Code": "ADP033", "Speed": "1000 Mbps Gigabit", "Interface": "Type-C to RJ45", "Warranty": "12-Month Warranty" },
    description: "Low latency gaming and video conference network connectivity.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP033.png"
  },
  {
    id: "hw-adp-035",
    price: 75000,
    name: "HOWELL VGA to HDMI 1080P Converter with Audio Jack (ADP035)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.8,
    reviewsCount: 150,
    badge: "VGA to HDMI",
    sku: "ADP035",
    tagline: "VGA + 3.5mm Audio In to HDMI Out | 1080P Active Converter",
    summary: "Converts legacy VGA desktop computer signals with audio to modern HDMI monitors.",
    variants: { lengths: ["Adapter Dongle"], colors: ["Black"] },
    specs: { "SKU Code": "ADP035", "Input": "VGA + 3.5mm Audio", "Output": "HDMI 1080P", "Warranty": "12-Month Warranty" },
    description: "Breathes new life into older PCs by connecting them to modern HDMI TVs.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP035.png"
  },
  {
    id: "hw-adp-037",
    price: 68000,
    name: "HOWELL HDMI to VGA 1080P Active Converter Adapter (ADP037)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 4.9,
    reviewsCount: 185,
    badge: "HDMI to VGA",
    sku: "ADP037",
    tagline: "HDMI Male to VGA Female Converter | 1080P Active IC",
    summary: "Connects HDMI laptops to VGA classroom and boardroom projectors.",
    variants: { lengths: ["Adapter Dongle"], colors: ["Black"] },
    specs: { "SKU Code": "ADP037", "Input": "HDMI Male", "Output": "VGA 15-Pin Female", "Resolution": "1080P 60Hz", "Warranty": "12-Month Warranty" },
    description: "Essential meeting room dongle for business presentations.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP037.png"
  },
  {
    id: "hw-adp-038",
    price: 135000,
    name: "HOWELL Multiport Type-C 4-in-1 Hub HDMI VGA USB 3.0 (ADP038)",
    category: "adapter",
    categoryName: "Adapters & Converters",
    rating: 5.0,
    reviewsCount: 240,
    badge: "4-in-1 Hub",
    sku: "ADP038",
    tagline: "Type-C to HDMI 4K + VGA + USB 3.0 + PD 87W | Aluminum Dock",
    summary: "All-in-one docking converter hub for modern laptops.",
    variants: { lengths: ["Hub 15cm Cable"], colors: ["Space Grey Aluminum"] },
    specs: { "SKU Code": "ADP038", "Ports": "HDMI 4K, VGA 1080P, USB 3.0, PD 87W", "Warranty": "12-Month Warranty" },
    description: "One USB-C port unlocks complete workstation connectivity.",
    image: "assets/Produk/Produk Batch 1/7. Adapter/ADP038.png"
  },
  {
    id: "hw-dp-8k-dp0203",
    price: 62687,
    name: "HOWELL DisplayPort 1.4 8K Cable 2M (DP0203)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 4.9,
    reviewsCount: 310,
    badge: "DP 1.4 8K",
    sku: "DP0203",
    tagline: "32.4 Gbps | 8K 60Hz / 4K 144Hz | 30AWG CCS | 2M",
    summary: "DisplayPort 1.4 cable supporting 32.4Gbps bandwidth, 8K 60Hz, and 4K 144Hz high refresh rates.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "DP0203", "Speed": "32.4 Gbps / 8K 60Hz", "Warranty": "12-Month Warranty" },
    description: "G-Sync and FreeSync gaming monitor link.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP0203.png"
  },
  {
    id: "hw-dp-fo-8k-dp0303",
    price: 746524,
    name: "HOWELL Active Optical Fiber DisplayPort 8K (DP0303)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 5.0,
    reviewsCount: 145,
    badge: "DP Optic 8K",
    sku: "DP0303",
    tagline: "Active Fiber Optic | 32 Gbps | 8K 60Hz Display Head | 20M",
    summary: "Optical DisplayPort 1.4 cable transmitting uncompressed 8K signals up to 50 meters.",
    variants: { lengths: ["20M"], colors: ["Zinc Alloy Shell"] },
    specs: { "SKU Code": "DP0303", "Core": "Active Optic Fiber", "Warranty": "12-Month Warranty" },
    description: "Professional workstation and multi-monitor optical DP link.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP0303.png"
  },
  {
    id: "hw-dp-16k-dp0403",
    price: 95000,
    name: "HOWELL DisplayPort 2.0 16K Ultra Cable 2M (DP0403)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 5.0,
    reviewsCount: 170,
    badge: "DP 2.0 16K",
    sku: "DP0403",
    tagline: "80 Gbps Bandwidth | 16K 60Hz / 8K 120Hz | UHBR10",
    summary: "Next-gen DisplayPort 2.0 cable with massive 80Gbps throughput for multi-monitor 16K workstations.",
    variants: { lengths: ["2M"], colors: ["Space Grey Metal"] },
    specs: { "SKU Code": "DP0403", "Bandwidth": "80 Gbps UHBR10", "Resolution": "16K 60Hz / 8K 120Hz", "Warranty": "12-Month Warranty" },
    description: "Extreme bandwidth for VR headsets and high-end visual design monitors.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP0403.png"
  },
  {
    id: "hw-dp-braid-dp0503",
    price: 75000,
    name: "HOWELL DisplayPort to DisplayPort Braided 8K Cable 2M (DP0503)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 4.9,
    reviewsCount: 155,
    badge: "DP Braided 8K",
    sku: "DP0503",
    tagline: "Nylon Braided | 32.4 Gbps | 8K 60Hz / 4K 144Hz | 2M",
    summary: "Heavy-duty nylon braided DisplayPort 1.4 cable with gold-plated latching plugs.",
    variants: { lengths: ["2M"], colors: ["Black/Silver Braid"] },
    specs: { "SKU Code": "DP0503", "Jacket": "High Density Braid", "Resolution": "8K 60Hz / 4K 144Hz", "Warranty": "12-Month Warranty" },
    description: "Abrasion resistant braided jacket protects against pet chews and friction.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP0503.png"
  },
  {
    id: "hw-dp-minidp-dp0703",
    price: 68000,
    name: "HOWELL Mini DisplayPort to DisplayPort 8K Cable 2M (DP0703)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 4.9,
    reviewsCount: 140,
    badge: "Mini DP to DP",
    sku: "DP0703",
    tagline: "Mini DP to Standard DP | 8K 60Hz / 4K 144Hz | 2M",
    summary: "Connects laptops with Mini DP ports to external DisplayPort gaming monitors.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "DP0703", "Connectors": "Mini DP Male to Standard DP Male", "Resolution": "8K 60Hz / 4K 144Hz", "Warranty": "12-Month Warranty" },
    description: "Flawless gaming connection from Surface or ThinkPad to gaming screen.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP0703.png"
  },
  {
    id: "hw-dp-hdmi-dp0803",
    price: 69000,
    name: "HOWELL DisplayPort to HDMI 4K 60Hz HDR Cable 2M (DP0803)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 4.9,
    reviewsCount: 160,
    badge: "DP to HDMI 4K",
    sku: "DP0803",
    tagline: "DP Male to HDMI Male | 4K 60Hz HDR | Uni-Directional | 2M",
    summary: "Direct cable connection from graphics card DisplayPort to 4K HDMI screen.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "DP0803", "Direction": "DisplayPort Source to HDMI Sink", "Resolution": "4K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Smooth 4K 60Hz output without needing separate adapters.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP0803.png"
  },
  {
    id: "hw-dp-dvi-dp0903",
    price: 66000,
    name: "HOWELL DisplayPort to DVI-D Dual Link Cable 2M (DP0903)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 4.8,
    reviewsCount: 130,
    badge: "DP to DVI",
    sku: "DP0903",
    tagline: "DisplayPort to DVI 24+1 Male | 1080P 60Hz | Gold Plated | 2M",
    summary: "Connects PC DisplayPort to high-resolution DVI desktop monitor.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "DP0903", "Connectors": "DP Male to DVI-D 24+1 Male", "Resolution": "1920x1080 Full HD", "Warranty": "12-Month Warranty" },
    description: "Direct PC to DVI monitor interconnect.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP0903.png"
  },
  {
    id: "hw-dp-optic-dp1006",
    price: 685000,
    name: "HOWELL Active Optical Fiber DisplayPort 8K 15M (DP1006)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 5.0,
    reviewsCount: 115,
    badge: "DP Optic 15M",
    sku: "DP1006",
    tagline: "Active Optic Fiber | 32.4Gbps | 8K 60Hz | 15 Meters",
    summary: "Long-distance optical DisplayPort link with zero signal attenuation.",
    variants: { lengths: ["15M"], colors: ["Metallic Shell"] },
    specs: { "SKU Code": "DP1006", "Length": "15 Meters Optical", "Resolution": "8K 60Hz", "Warranty": "12-Month Warranty" },
    description: "Zero latency and electromagnetic immunity across 15 meters.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP1006.png"
  },
  {
    id: "hw-dp-minihdmi-dp1203",
    price: 64000,
    name: "HOWELL Mini DisplayPort to HDMI 4K Ultra Cable 2M (DP1203)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 4.8,
    reviewsCount: 135,
    badge: "Mini DP HDMI",
    sku: "DP1203",
    tagline: "Mini DP to HDMI 4K | Surface & MacBook Pro | 2M",
    summary: "Connects Mini DisplayPort / Thunderbolt 2 laptops directly to HDMI displays.",
    variants: { lengths: ["2M"], colors: ["White / Black"] },
    specs: { "SKU Code": "DP1203", "Connectors": "Mini DP to HDMI Male", "Resolution": "4K 30Hz / 1080P", "Warranty": "12-Month Warranty" },
    description: "Simple plug-and-play direct connection.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP1203.png"
  },
  {
    id: "hw-dp-240hz-dp1303",
    price: 79000,
    name: "HOWELL DisplayPort 1.4 High-Refresh 240Hz Gaming Cable 2M (DP1303)",
    category: "displayport",
    categoryName: "DisplayPort 8K / 16K",
    rating: 5.0,
    reviewsCount: 190,
    badge: "240Hz Gaming",
    sku: "DP1303",
    tagline: "Full HD 240Hz / 2K 165Hz / 4K 144Hz | FreeSync & G-Sync | 2M",
    summary: "High-refresh esports gaming DisplayPort cable engineered for high FPS displays.",
    variants: { lengths: ["2M"], colors: ["Cyber Black"] },
    specs: { "SKU Code": "DP1303", "Refresh Rates": "240Hz (1080P), 165Hz (2K), 144Hz (4K)", "Warranty": "12-Month Warranty" },
    description: "Smooth frame pacing for competitive esports tournament play.",
    image: "assets/Produk/Produk Batch 1/8. DP Cable/DP1303.png"
  },
  {
    id: "hw-dvi-fo-20m",
    price: 1138086,
    name: "HOWELL DVI-D Active Optic Fiber Cable 20M (DVI0103)",
    category: "dvi-vga",
    categoryName: "DVI & VGA Cables",
    rating: 5.0,
    reviewsCount: 88,
    badge: "DVI Optic 20M",
    sku: "DVI0103",
    tagline: "DVI-D Dual Link 24+1 | Active Fiber Optic | Source Head | 20M",
    summary: "DVI-D 24+1 fiber optic long-distance extension cable for medical displays and digital signage.",
    variants: { lengths: ["20M"], colors: ["Gold Casing"] },
    specs: { "SKU Code": "DVI0103", "Resolution": "2560x1600 Dual-Link", "Warranty": "12-Month Warranty" },
    description: "Zero signal degradation optical DVI extension link.",
    image: "assets/Produk/Produk Batch 1/9. DVI Cable/DVI0103.png"
  },
  {
    id: "hw-dvi-dual-link-2m",
    price: 58000,
    name: "HOWELL DVI-D Dual Link 24+1 Cable 2M (DVI0203)",
    category: "dvi-vga",
    categoryName: "DVI & VGA Cables",
    rating: 4.8,
    reviewsCount: 110,
    badge: "DVI-D 24+1",
    sku: "DVI0203",
    tagline: "DVI-D 24+1 Pins | 3840x2400 Resolution | Gold Plated | 2M",
    summary: "Heavy-duty DVI-D 24+1 male-to-male cable with dual ferrite cores.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "DVI0203", "Ferrite Cores": "Dual Anti-Interference", "Warranty": "12-Month Warranty" },
    description: "Stable DVI monitor connection for desktop PCs.",
    image: "assets/Produk/Produk Batch 1/9. DVI Cable/DVI0203.png"
  },
  {
    id: "hw-dvi-braid-dvi0403",
    price: 65000,
    name: "HOWELL DVI-D to DVI-D Dual Link Braided Cable 2M (DVI0403)",
    category: "dvi-vga",
    categoryName: "DVI & VGA Cables",
    rating: 4.9,
    reviewsCount: 95,
    badge: "DVI Braided",
    sku: "DVI0403",
    tagline: "Nylon Braided Jacket | DVI-D 24+1 | Gold Plated Plugs | 2M",
    summary: "Abrasion-resistant braided DVI-D cable for durable office desktop routing.",
    variants: { lengths: ["2M"], colors: ["Black/Grey Braid"] },
    specs: { "SKU Code": "DVI0403", "Jacket": "High Density Nylon Braid", "Resolution": "2560x1600", "Warranty": "12-Month Warranty" },
    description: "Tough exterior protects against desk pinch points.",
    image: "assets/Produk/Produk Batch 1/9. DVI Cable/DVI0403.png"
  },
  {
    id: "hw-dvi-vga-dvi0503",
    price: 56000,
    name: "HOWELL DVI-I 24+5 Male to VGA Male High-Res Cable 2M (DVI0503)",
    category: "dvi-vga",
    categoryName: "DVI & VGA Cables",
    rating: 4.8,
    reviewsCount: 105,
    badge: "DVI to VGA",
    sku: "DVI0503",
    tagline: "DVI-I 24+5 Male to VGA 15-Pin Male | Analog Video | 2M",
    summary: "Connects DVI-I graphics card output directly to standard VGA monitors.",
    variants: { lengths: ["2M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "DVI0503", "Connectors": "DVI-I 24+5 to VGA 15-Pin", "Resolution": "1080P Full HD", "Warranty": "12-Month Warranty" },
    description: "Direct cable eliminating the need for bulky adapter blocks.",
    image: "assets/Produk/Produk Batch 1/9. DVI Cable/DVI0503.png"
  },
  {
    id: "hw-dvi-hd-dvi0601",
    price: 52000,
    name: "HOWELL DVI-D 24+1 Male to Male Heavy-Duty Cable 1.5M (DVI0601)",
    category: "dvi-vga",
    categoryName: "DVI & VGA Cables",
    rating: 4.8,
    reviewsCount: 90,
    badge: "DVI-D 1.5M",
    sku: "DVI0601",
    tagline: "DVI-D 24+1 Dual Link | High Purity Conductor | 1.5M",
    summary: "Compact 1.5-meter DVI-D cable for standard desktop computer desks.",
    variants: { lengths: ["1.5M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "DVI0601", "Length": "1.5 Meters", "Resolution": "2560x1600", "Warranty": "12-Month Warranty" },
    description: "Clean cable management for office workstations.",
    image: "assets/Produk/Produk Batch 1/9. DVI Cable/DVI0601.png"
  },
  {
    id: "hw-dvi-hdmi-hd0102",
    price: 48000,
    name: "HOWELL HDMI to DVI-D 24+1 Bi-Directional Cable 1.5M (HD0102)",
    category: "dvi-vga",
    categoryName: "DVI & VGA Cables",
    rating: 4.9,
    reviewsCount: 135,
    badge: "HDMI to DVI",
    sku: "HD0102",
    tagline: "Bi-Directional HDMI to DVI-D | Full HD 1080P | 1.5M",
    summary: "Bi-directional interconnect between HDMI and DVI video sources.",
    variants: { lengths: ["1.5M"], colors: ["Black PVC"] },
    specs: { "SKU Code": "HD0102", "Direction": "Bi-Directional", "Resolution": "1080P 60Hz", "Warranty": "12-Month Warranty" },
    description: "Connect Raspberry Pi, PlayStation, or PC to DVI monitors.",
    image: "assets/Produk/Produk Batch 1/9. DVI Cable/HD0102.png"
  },
  {
    id: "hw-dvi-hdmi-hd0203",
    price: 54000,
    name: "HOWELL HDMI to DVI-D 24+1 Gold Bi-Directional Cable 2M (HD0203)",
    category: "dvi-vga",
    categoryName: "DVI & VGA Cables",
    rating: 4.9,
    reviewsCount: 145,
    badge: "HDMI DVI Gold",
    sku: "HD0203",
    tagline: "24K Gold Plated Plugs | Bi-Directional 1080P / 1200P | 2M",
    summary: "Premium gold-plated HDMI to DVI-D bi-directional interconnect cable.",
    variants: { lengths: ["2M"], colors: ["Black / Gold"] },
    specs: { "SKU Code": "HD0203", "Plating": "24K Gold Plated Contacts", "Resolution": "1920x1200 / 1080P", "Warranty": "12-Month Warranty" },
    description: "High-durability gold connectors for frequent plugging and unplugging.",
    image: "assets/Produk/Produk Batch 1/9. DVI Cable/HD0203.png"
  },
  {
    id: "hw-vga-vga0106",
    price: 45000,
    name: "HOWELL Heavy-Duty VGA 3+6 Male to Male Cable with Dual Ferrite Cores (VGA0106)",
    category: "dvi-vga",
    categoryName: "DVI & VGA Cables",
    rating: 4.9,
    reviewsCount: 180,
    badge: "VGA 3+6 Dual Core",
    sku: "VGA0106",
    tagline: "3+6 Pure Copper Core | Dual Ferrite Noise Chokes | 1080P | 2M",
    summary: "High-grade VGA cable with 3 coaxial RGB lines and dual ferrite cores for razor-sharp projector displays.",
    variants: { lengths: ["2M"], colors: ["Industrial Black"] },
    specs: { "SKU Code": "VGA0106", "Conductor": "3+6 OFC Pure Copper", "Ferrite Cores": "Dual Anti-Interference Chokes", "Resolution": "1920x1080 Full HD", "Warranty": "12-Month Warranty" },
    description: "Anti-ghosting coaxial wiring delivers ghost-free video on projectors and monitors.",
    image: "assets/Produk/Produk Batch 1/10. VGA Cable/VGA0106.png"
  }
];

if (typeof window !== 'undefined') {
  window.HOWELL_CATEGORIES = HOWELL_CATEGORIES;
  window.HOWELL_PRODUCTS = HOWELL_PRODUCTS;
  window.HOWELL_SKU_CARTON = HOWELL_SKU_CARTON;
  window.products = HOWELL_PRODUCTS;
}
