import { useState } from "react";

const companies = [
  {
    id: 1,
    name: "NVIDIA",
    ticker: "NVDA",
    country: "🇺🇸 米国",
    type: "ファブレス（設計専業）",
    typeCode: "fabless",
    founded: 1993,
    marketCap: 4600,
    employees: 36000,
    avgSalaryUSD: 280000,
    revenue2025: 130,
    revenueGrowth: "+114%",
    specialty: "AI GPU・データセンターアクセラレータ",
    keyProducts: "H100, B200 GPU, CUDA",
    relations: ["TSMC（製造委託）", "SK Hynix（HBM調達）", "AMD（競合）"],
    moat: "AIチップ市場独占・CUDAエコシステム",
    color: "#76b900",
  },
  {
    id: 2,
    name: "TSMC",
    ticker: "TSM",
    country: "🇹🇼 台湾",
    type: "ファウンドリ（受託製造）",
    typeCode: "foundry",
    founded: 1987,
    marketCap: 1920,
    employees: 90557,
    avgSalaryUSD: 72000,
    revenue2025: 90,
    revenueGrowth: "+34%",
    specialty: "世界最先端・最大の半導体受託製造",
    keyProducts: "2nm/3nm/5nmプロセス、CoWoS先進パッケージング",
    relations: ["NVIDIA・Apple・AMD（主要顧客）", "ASML（装置調達）", "Samsung（競合）"],
    moat: "2nmプロセス独占・地政学的リスクと表裏一体",
    color: "#e04040",
  },
  {
    id: 3,
    name: "Broadcom",
    ticker: "AVGO",
    country: "🇺🇸 米国",
    type: "ファブレス＋ソフトウェア",
    typeCode: "fabless",
    founded: 1991,
    marketCap: 1800,
    employees: 40000,
    avgSalaryUSD: 220000,
    revenue2025: 57,
    revenueGrowth: "+44%",
    specialty: "ネットワーク・データセンター向けASIC",
    keyProducts: "カスタムAIアクセラレータ、ネットワークチップ",
    relations: ["Google・Meta（カスタムチップ供給）", "TSMC（製造委託）", "VMware（買収）"],
    moat: "超大口顧客とのカスタムASIC長期契約",
    color: "#cc0000",
  },
  {
    id: 4,
    name: "ASML",
    ticker: "ASML",
    country: "🇳🇱 オランダ",
    type: "半導体製造装置",
    typeCode: "equipment",
    founded: 1984,
    marketCap: 578,
    employees: 42000,
    avgSalaryUSD: 140000,
    revenue2025: 28,
    revenueGrowth: "+15%",
    specialty: "EUV/High-NA EUV露光装置（世界唯一）",
    keyProducts: "EXE:5200 High-NA EUV、NXT:2050i",
    relations: ["TSMC・Samsung・Intel（顧客）", "中国輸出禁止（地政学制約）"],
    moat: "世界で唯一のEUV製造会社・代替不可能",
    color: "#0072ce",
  },
  {
    id: 5,
    name: "Samsung Semiconductor",
    ticker: "005930.KS",
    country: "🇰🇷 韓国",
    type: "IDM（垂直統合）",
    typeCode: "idm",
    founded: 1969,
    marketCap: 280,
    employees: 270000,
    avgSalaryUSD: 68000,
    revenue2025: 85,
    revenueGrowth: "+20%",
    specialty: "DRAM・NAND・ファウンドリ・ロジックの垂直統合",
    keyProducts: "HBM3E、DDR5 DRAM、NAND、Exynos",
    relations: ["TSMCと先端ファウンドリで競合", "SK Hynix（メモリ競合）", "NVIDIAへのHBM供給争い"],
    moat: "メモリ首位・ファウンドリ2位・一気通貫の強み",
    color: "#1428a0",
  },
  {
    id: 6,
    name: "AMD",
    ticker: "AMD",
    country: "🇺🇸 米国",
    type: "ファブレス（設計専業）",
    typeCode: "fabless",
    founded: 1969,
    marketCap: 350,
    employees: 31000,
    avgSalaryUSD: 200000,
    revenue2025: 29,
    revenueGrowth: "+24%",
    specialty: "CPU・GPU・AIアクセラレータ",
    keyProducts: "Ryzen CPU、Radeon GPU、MI300X AI GPU",
    relations: ["TSMC（製造委託）", "NVIDIA（競合）", "Intel（CPU競合）", "OpenAIと供給契約"],
    moat: "NVIDIAの唯一の本格的AIチップ対抗馬",
    color: "#ed1c24",
  },
  {
    id: 7,
    name: "Micron Technology",
    ticker: "MU",
    country: "🇺🇸 米国",
    type: "IDM（垂直統合）",
    typeCode: "idm",
    founded: 1978,
    marketCap: 481,
    employees: 48000,
    avgSalaryUSD: 130000,
    revenue2025: 38,
    revenueGrowth: "+62%",
    specialty: "DRAM・NAND・HBMメモリ",
    keyProducts: "HBM3E、DDR5、LPDDR5X、NAND",
    relations: ["Samsung・SK Hynix（競合）", "NVIDIA（HBM供給）", "Apple（LPDDR供給）"],
    moat: "米国唯一のDRAMメーカー・地政学的価値大",
    color: "#e10600",
  },
  {
    id: 8,
    name: "SK Hynix",
    ticker: "000660.KS",
    country: "🇰🇷 韓国",
    type: "IDM（垂直統合）",
    typeCode: "idm",
    founded: 1983,
    marketCap: 498,
    employees: 30000,
    avgSalaryUSD: 72000,
    revenue2025: 49,
    revenueGrowth: "+85%",
    specialty: "DRAM・HBM（NVIDIAへの主要供給元）",
    keyProducts: "HBM3E、DDR5、LPDDR5",
    relations: ["NVIDIAのHBM主要サプライヤー", "Samsung（競合）", "Micron（競合）"],
    moat: "HBM市場シェア50%超・NVIDIAとの深い連携",
    color: "#00a9e0",
  },
  {
    id: 9,
    name: "Qualcomm",
    ticker: "QCOM",
    country: "🇺🇸 米国",
    type: "ファブレス（設計専業）",
    typeCode: "fabless",
    founded: 1985,
    marketCap: 210,
    employees: 52000,
    avgSalaryUSD: 190000,
    revenue2025: 43,
    revenueGrowth: "+13%",
    specialty: "スマートフォン向けSoC・通信モデム",
    keyProducts: "Snapdragon SoC、5Gモデム",
    relations: ["TSMC（製造委託）", "Appleへの5Gモデム供給（終了予定）", "ARM（IP利用）"],
    moat: "5G特許ライセンス・Snapdragonブランド",
    color: "#3253dc",
  },
  {
    id: 10,
    name: "Intel",
    ticker: "INTC",
    country: "🇺🇸 米国",
    type: "IDM（垂直統合）",
    typeCode: "idm",
    founded: 1968,
    marketCap: 90,
    employees: 99000,
    avgSalaryUSD: 150000,
    revenue2025: 53,
    revenueGrowth: "-2%",
    specialty: "x86 CPUプロセッサ・ファウンドリ事業再建中",
    keyProducts: "Core Ultra CPU、Xeon、Intel Foundry 18A",
    relations: ["TSMCに製造委託急増", "AMD（競合）", "NVIDIA（データセンターで競合）"],
    moat: "x86アーキテクチャ資産・ファウンドリ再建（変曲点）",
    color: "#0071c5",
  },
  {
    id: 11,
    name: "Applied Materials",
    ticker: "AMAT",
    country: "🇺🇸 米国",
    type: "半導体製造装置",
    typeCode: "equipment",
    founded: 1967,
    marketCap: 140,
    employees: 34000,
    avgSalaryUSD: 170000,
    revenue2025: 28,
    revenueGrowth: "+7%",
    specialty: "CVD/PVD蒸着・エッチング・CMP装置",
    keyProducts: "Centura、Endura成膜装置",
    relations: ["TSMC・Samsung・Intel（顧客）", "ASML（補完関係）", "Lam Research（競合）"],
    moat: "蒸着工程で世界首位・代替困難な装置群",
    color: "#009cbd",
  },
  {
    id: 12,
    name: "Lam Research",
    ticker: "LRCX",
    country: "🇺🇸 米国",
    type: "半導体製造装置",
    typeCode: "equipment",
    founded: 1980,
    marketCap: 95,
    employees: 18000,
    avgSalaryUSD: 175000,
    revenue2025: 18,
    revenueGrowth: "+23%",
    specialty: "エッチング・CVD洗浄装置",
    keyProducts: "Kiyo エッチャー、ALTUS CVD",
    relations: ["TSMC・Samsung・Micron（顧客）", "Applied Materials（競合）", "中国輸出規制の影響大"],
    moat: "エッチング装置で世界首位・NAND製造に必須",
    color: "#d9271d",
  },
  {
    id: 13,
    name: "ARM Holdings",
    ticker: "ARM",
    country: "🇬🇧 英国",
    type: "IPライセンス",
    typeCode: "ip",
    founded: 1990,
    marketCap: 160,
    employees: 8330,
    avgSalaryUSD: 200000,
    revenue2025: 4.2,
    revenueGrowth: "+25%",
    specialty: "CPUアーキテクチャIP設計・ライセンス供与",
    keyProducts: "Cortex-A/M/R、Neoverse、Mali GPU IP",
    relations: ["Qualcomm・Apple・NVIDIA・Samsung（ライセンシー）", "SoftBank（親会社）"],
    moat: "スマホCPU市場99%シェア・AI時代にも急拡大",
    color: "#0091da",
  },
  {
    id: 14,
    name: "NXP Semiconductors",
    ticker: "NXPI",
    country: "🇳🇱 オランダ",
    type: "ファブレス＋軽ファウンドリ",
    typeCode: "fabless",
    founded: 2006,
    marketCap: 50,
    employees: 34500,
    avgSalaryUSD: 120000,
    revenue2025: 13,
    revenueGrowth: "-5%",
    specialty: "車載半導体・IoT・セキュリティチップ",
    keyProducts: "S32車載SoC、i.MX、セキュアエレメント",
    relations: ["自動車OEM各社（顧客）", "Renesas（競合）", "Infineon（競合）"],
    moat: "車載マイコン・通信チップで欧州首位",
    color: "#009f6b",
  },
  {
    id: 15,
    name: "Renesas Electronics",
    ticker: "6723.T",
    country: "🇯🇵 日本",
    type: "IDM（垂直統合）",
    typeCode: "idm",
    founded: 2002,
    marketCap: 25,
    employees: 21000,
    avgSalaryUSD: 80000,
    revenue2025: 10,
    revenueGrowth: "-8%",
    specialty: "車載マイコン・産業用半導体",
    keyProducts: "RH850車載MCU、RA産業MCU",
    relations: ["NXP・Infineon（競合）", "TSMC（製造委託）", "日系自動車OEM（顧客）"],
    moat: "車載マイコン世界首位（シェア約30%）",
    color: "#c8102e",
  },
];

const typeLabels = {
  fabless: { label: "ファブレス", color: "#7c3aed" },
  foundry: { label: "ファウンドリ", color: "#e04040" },
  idm: { label: "IDM", color: "#0284c7" },
  equipment: { label: "製造装置", color: "#059669" },
  ip: { label: "IPライセンス", color: "#d97706" },
};

const industryStructure = [
  { level: "IP・設計ツール", items: ["ARM（CPU IP）", "Synopsys（EDA）", "Cadence（EDA）"], color: "#7c3aed" },
  { level: "チップ設計（ファブレス）", items: ["NVIDIA", "AMD", "Qualcomm", "Broadcom"], color: "#db2777" },
  { level: "受託製造（ファウンドリ）", items: ["TSMC", "Samsung Foundry", "GlobalFoundries"], color: "#e04040" },
  { level: "垂直統合（IDM）", items: ["Intel", "Samsung", "SK Hynix", "Micron", "Renesas"], color: "#0284c7" },
  { level: "製造装置・材料", items: ["ASML（露光）", "Applied Materials（蒸着）", "Lam Research（エッチング）", "KLA（検査）"], color: "#059669" },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("marketCap");
  const [view, setView] = useState("cards");

  const filtered = companies
    .filter((c) => filter === "all" || c.typeCode === filter)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const selectedCompany = companies.find((c) => c.id === selected);

  const totalMarketCap = companies.reduce((s, c) => s + c.marketCap, 0);
  const totalRevenue = companies.reduce((s, c) => s + c.revenue2025, 0);

  return (
    

    

    
    <div style={{
      fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
      background: "#0a0a0f",
      minHeight: "100vh",
      color: "#e8e8f0",
    }}>
      {/* Nav */}
<div className="nav-pad" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid #1e1e3a", background: "#0a0a0f" }}>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect width="30" height="30" rx="6" fill="#0d0d1a"/>
      <rect x="5" y="13" width="4" height="4" rx="0.5" fill="#4a2a8a"/>
      <rect x="13" y="5" width="4" height="4" rx="0.5" fill="#4a2a8a"/>
      <rect x="13" y="13" width="4" height="4" rx="0.5" fill="#c4b5fd"/>
      <rect x="21" y="13" width="4" height="4" rx="0.5" fill="#4a2a8a"/>
      <rect x="13" y="21" width="4" height="4" rx="0.5" fill="#4a2a8a"/>
      <line x1="9" y1="15" x2="13" y2="15" stroke="#2a1a4a" strokeWidth="1"/>
      <line x1="17" y1="15" x2="21" y2="15" stroke="#2a1a4a" strokeWidth="1"/>
      <line x1="15" y1="9" x2="15" y2="13" stroke="#2a1a4a" strokeWidth="1"/>
      <line x1="15" y1="17" x2="15" y2="21" stroke="#2a1a4a" strokeWidth="1"/>
    </svg>
    <div>
      <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.06em", color: "#f0f0ff" }}>TraderCat</div>
      <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#6060aa", textTransform: "uppercase" }}>Market Intelligence</div>
    </div>
  </div>
  <a href="https://tradercat-top.vercel.app/" style={{textDecoration:'none'}}>
    <button style={{ fontSize: 12, border: "1px solid #2a2a4a", background: "transparent", color: "#a0a0cc", padding: "7px 16px", borderRadius: 5, cursor: "pointer", letterSpacing: "0.05em", fontFamily: "inherit" }}>
      ← TOP
    </button>
  </a>
</div>
      
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #141428 50%, #0a0a0f 100%)",
        borderBottom: "1px solid #1e1e3a",
        padding: "32px 24px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(124,58,237,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 50%)",
        }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#6b6b8a", marginBottom: 8, textTransform: "uppercase" }}>
            Global Semiconductor Intelligence
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
            世界の半導体企業 完全マップ<br></br>売上などの数字に間違いが見つかりました。只今修正中になります。2026.5.1
          </h1>
          <p style={{ color: "#6b6b8a", fontSize: 13, margin: "0 0 24px" }}>
            時価総額・社員数・業績・企業間関係 — 2025/2026年データ
          </p>
          {/* Stats bar */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { label: "掲載企業数", value: `${companies.length}社` },
              { label: "市場規模（2025年売上合計）", value: `$${Math.round(totalRevenue)}B` },
              { label: "Top15 時価総額合計", value: `$${(totalMarketCap / 1000).toFixed(1)}T` },
              { label: "半導体市場規模（2025）", value: "$793B" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 10, color: "#6b6b8a", letterSpacing: "0.1em", marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#c4b5fd" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>




      
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>

        {/* Industry Structure */}
        <div style={{
          background: "#0d0d1a",
          border: "1px solid #1e1e3a",
          borderRadius: 12,
          padding: "20px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#6b6b8a", marginBottom: 12, textTransform: "uppercase" }}>
            バリューチェーン構造
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {industryStructure.map((layer, i) => (
              <div key={i} style={{
                flex: 1,
                minWidth: 140,
                background: `${layer.color}10`,
                border: `1px solid ${layer.color}30`,
                borderRadius: 8,
                padding: "10px 12px",
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: layer.color, marginBottom: 6, letterSpacing: "0.05em" }}>
                  {layer.level}
                </div>
                {layer.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 11, color: "#a0a0c0", marginBottom: 2 }}>· {item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { code: "all", label: "全企業" },
              { code: "fabless", label: "ファブレス" },
              { code: "foundry", label: "ファウンドリ" },
              { code: "idm", label: "IDM" },
              { code: "equipment", label: "装置" },
              { code: "ip", label: "IP" },
            ].map((f) => (
              <button key={f.code} onClick={() => setFilter(f.code)} style={{
                background: filter === f.code ? "#7c3aed" : "#1a1a2e",
                border: `1px solid ${filter === f.code ? "#7c3aed" : "#2a2a4a"}`,
                borderRadius: 6,
                padding: "5px 12px",
                fontSize: 12,
                color: filter === f.code ? "#fff" : "#8888aa",
                cursor: "pointer",
                fontFamily: "inherit",
              }}>{f.label}</button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#6b6b8a" }}>並び替え:</span>
            {[
              { key: "marketCap", label: "時価総額" },
              { key: "revenue2025", label: "売上" },
              { key: "employees", label: "社員数" },
              { key: "founded", label: "創業年" },
            ].map((s) => (
              <button key={s.key} onClick={() => setSortBy(s.key)} style={{
                background: sortBy === s.key ? "#1e3a5f" : "#1a1a2e",
                border: `1px solid ${sortBy === s.key ? "#3b82f6" : "#2a2a4a"}`,
                borderRadius: 6,
                padding: "5px 10px",
                fontSize: 11,
                color: sortBy === s.key ? "#60a5fa" : "#8888aa",
                cursor: "pointer",
                fontFamily: "inherit",
              }}>{s.label}</button>
            ))}
          </div>
        </div>

        {/* Company Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 12,
          marginBottom: 32,
        }}>
          {filtered.map((company) => {
            const type = typeLabels[company.typeCode];
            const isSelected = selected === company.id;
            return (
              <div
                key={company.id}
                onClick={() => setSelected(isSelected ? null : company.id)}
                style={{
                  background: isSelected ? "#0f0f2a" : "#0d0d1a",
                  border: `1px solid ${isSelected ? company.color + "60" : "#1e1e3a"}`,
                  borderRadius: 10,
                  padding: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: company.color,
                  opacity: isSelected ? 1 : 0.4,
                }} />

                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 17, fontWeight: 800, color: "#f0f0ff" }}>{company.name}</span>
                      <span style={{ fontSize: 10, color: "#6b6b8a" }}>{company.ticker}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#8888aa" }}>{company.country}</span>
                      <span style={{
                        fontSize: 10,
                        background: type.color + "20",
                        color: type.color,
                        border: `1px solid ${type.color}40`,
                        borderRadius: 4,
                        padding: "1px 6px",
                      }}>{type.label}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#c4b5fd" }}>
                      ${company.marketCap >= 1000 ? (company.marketCap / 1000).toFixed(1) + "T" : company.marketCap + "B"}
                    </div>
                    <div style={{ fontSize: 10, color: "#6b6b8a" }}>時価総額</div>
                  </div>
                </div>

                {/* Metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
                  {[
                    { label: "創業年", value: company.founded + "年" },
                    { label: "売上 (2025)", value: `$${company.revenue2025}B` },
                    { label: "社員数", value: company.employees >= 10000 ? Math.round(company.employees / 1000) + "K人" : company.employees.toLocaleString() + "人" },
                  ].map((m) => (
                    <div key={m.label} style={{
                      background: "#111120",
                      borderRadius: 6,
                      padding: "6px 8px",
                    }}>
                      <div style={{ fontSize: 9, color: "#6b6b8a", marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#d0d0e8" }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 11, color: "#8888aa", marginBottom: 8, lineHeight: 1.5 }}>
                  {company.specialty}
                </div>

                {/* Revenue growth badge */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: company.revenueGrowth.startsWith("+") ? "#34d399" : "#f87171",
                    background: company.revenueGrowth.startsWith("+") ? "#34d39920" : "#f8717120",
                    borderRadius: 4,
                    padding: "2px 8px",
                  }}>売上成長 {company.revenueGrowth}</span>
                  <span style={{ fontSize: 11, color: "#6b6b8a" }}>平均年収 ${(company.avgSalaryUSD / 1000).toFixed(0)}K</span>
                </div>

                {/* Expanded detail */}
                {isSelected && (
                  <div style={{
                    marginTop: 14,
                    paddingTop: 14,
                    borderTop: "1px solid #1e1e3a",
                  }}>
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 10, color: "#6b6b8a", marginBottom: 4 }}>主力製品・技術</div>
                      <div style={{ fontSize: 12, color: "#c0c0d8" }}>{company.keyProducts}</div>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 10, color: "#6b6b8a", marginBottom: 4 }}>競合・取引関係</div>
                      {company.relations.map((r, i) => (
                        <div key={i} style={{
                          fontSize: 11,
                          color: "#a0a0c0",
                          background: "#111120",
                          borderRadius: 4,
                          padding: "3px 8px",
                          marginBottom: 3,
                        }}>· {r}</div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#6b6b8a", marginBottom: 4 }}>競争優位（モート）</div>
                      <div style={{
                        fontSize: 12,
                        color: "#fbbf24",
                        background: "#fbbf2410",
                        border: "1px solid #fbbf2430",
                        borderRadius: 6,
                        padding: "6px 10px",
                      }}>{company.moat}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Market cap chart */}
        <div style={{
          background: "#0d0d1a",
          border: "1px solid #1e1e3a",
          borderRadius: 12,
          padding: "20px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#6b6b8a", marginBottom: 16, textTransform: "uppercase" }}>
            時価総額比較（Billion USD）
          </div>
          {companies.sort((a, b) => b.marketCap - a.marketCap).map((c) => {
            const maxCap = 4600;
            const pct = (c.marketCap / maxCap) * 100;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 100, fontSize: 11, color: "#a0a0c0", textAlign: "right", flexShrink: 0 }}>{c.name}</div>
                <div style={{ flex: 1, background: "#111120", borderRadius: 3, height: 18, overflow: "hidden" }}>
                  <div style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${c.color}cc, ${c.color}66)`,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 6,
                  }}>
                    <span style={{ fontSize: 10, color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}>
                      ${c.marketCap >= 1000 ? (c.marketCap / 1000).toFixed(1) + "T" : c.marketCap + "B"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div style={{ fontSize: 11, color: "#444466", textAlign: "center", paddingBottom: 24 }}>
          ※ 時価総額は2025年末〜2026年初のデータ。売上・社員数は2025年度実績（一部推定含む）。平均年収は主に米国拠点のGlassdoor/Levels.fyi参考値。
        </div>
      </div>
    </div>
  );
}
