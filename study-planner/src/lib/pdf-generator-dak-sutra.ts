
import { format } from "date-fns";

interface DakSutraPDFParams {
    title: string;
    rule_number?: string;
    act_name: string;
    category: string;
    effective_date?: string;
    official_text: string;
    guru_explanation: string;
    practical_example?: string;
    exam_insight?: string;
}

const CATEGORY_COLORS: Record<string, { primary: string; light: string; dark: string; border: string }> = {
    Rule:        { primary: "#2563eb", light: "#eff6ff", dark: "#1d4ed8", border: "#bfdbfe" },
    Section:     { primary: "#7c3aed", light: "#f5f3ff", dark: "#6d28d9", border: "#ddd6fe" },
    Regulation:  { primary: "#059669", light: "#ecfdf5", dark: "#047857", border: "#a7f3d0" },
    Circular:    { primary: "#d97706", light: "#fffbeb", dark: "#b45309", border: "#fde68a" },
    Explanation: { primary: "#4338ca", light: "#eef2ff", dark: "#3730a3", border: "#c7d2fe" },
};

export const generateDakSutraPDF = async ({
    title,
    rule_number,
    act_name,
    category,
    effective_date,
    official_text,
    guru_explanation,
    practical_example,
    exam_insight,
}: DakSutraPDFParams) => {

    const c = CATEGORY_COLORS[category] || CATEGORY_COLORS.Rule;
    const dateStr = effective_date
        ? format(new Date(effective_date), "dd MMMM yyyy")
        : null;

    const html = /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dak Sutra – ${title}</title>
  <style>
    /* ── Reset ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── Base ── */
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 11pt;
      line-height: 1.7;
      color: #1e293b;
      background: #fff;
    }

    /* ── Page setup ── */
    @page {
      size: A4;
      margin: 18mm 16mm 28mm 16mm;

      @bottom-left {
        content: "Dak Sutra · dakguru.com · For educational use only";
        font-family: Arial, sans-serif;
        font-size: 6.5pt;
        color: #94a3b8;
        border-top: 1px solid #e2e8f0;
        padding-top: 4pt;
        width: 100%;
      }
      @bottom-center {
        content: "Visit Dak Sutra @ www.dakguru.com for more knowledge content";
        font-family: Arial, sans-serif;
        font-size: 6.5pt;
        color: ${c.primary};
        font-weight: 600;
        border-top: 1px solid #e2e8f0;
        padding-top: 4pt;
        white-space: nowrap;
      }
      @bottom-right {
        content: "Page " counter(page) " of " counter(pages);
        font-family: Arial, sans-serif;
        font-size: 6.5pt;
        color: #94a3b8;
        border-top: 1px solid #e2e8f0;
        padding-top: 4pt;
      }
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
      section { page-break-inside: avoid; }
    }

    /* ── HEADER BANNER ── */
    .header-banner {
      background: linear-gradient(135deg, ${c.primary} 0%, ${c.dark} 100%);
      color: white;
      padding: 22px 24px 18px;
      border-radius: 12px;
      margin-bottom: 20px;
      position: relative;
      overflow: hidden;
    }
    .header-banner::before {
      content: '';
      position: absolute;
      top: -30px; right: -30px;
      width: 120px; height: 120px;
      background: rgba(255,255,255,0.07);
      border-radius: 50%;
    }
    .header-banner::after {
      content: '';
      position: absolute;
      bottom: -20px; left: 40px;
      width: 80px; height: 80px;
      background: rgba(255,255,255,0.05);
      border-radius: 50%;
    }
    .header-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .category-pill {
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      font-family: Arial, sans-serif;
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 20px;
    }
    .act-name {
      font-family: Arial, sans-serif;
      font-size: 8.5pt;
      color: rgba(255,255,255,0.75);
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .rule-num {
      font-family: Arial, sans-serif;
      font-size: 8.5pt;
      color: rgba(255,255,255,0.60);
    }
    .header-title {
      font-size: 18pt;
      font-weight: 700;
      line-height: 1.25;
      color: white;
      margin-bottom: 12px;
    }
    .header-footer {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .header-tag {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      color: rgba(255,255,255,0.9);
      font-family: Arial, sans-serif;
      font-size: 7.5pt;
      font-weight: 600;
      padding: 2px 9px;
      border-radius: 4px;
    }

    /* ── BRANDING BAR ── */
    .brand-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid ${c.border};
    }
    .brand-logo-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-logo {
      width: 48px;
      height: 48px;
      object-fit: contain;
      border-radius: 8px;
    }
    .brand-text-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .brand-name {
      font-family: Arial, sans-serif;
      font-size: 13pt;
      font-weight: 900;
      color: ${c.primary};
      letter-spacing: 0.06em;
      text-transform: uppercase;
      line-height: 1.2;
    }
    .brand-tagline {
      font-family: Arial, sans-serif;
      font-size: 6.5pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 2px;
    }
    .brand-date {
      font-family: Arial, sans-serif;
      font-size: 7.5pt;
      color: #94a3b8;
      text-align: right;
      line-height: 1.5;
    }

    /* ── SECTION CARD ── */
    .section-card {
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 18px;
      border: 1.5px solid #e2e8f0;
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      border-bottom: 1.5px solid #e2e8f0;
    }
    .section-icon {
      width: 28px; height: 28px;
      border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      font-size: 12pt;
      flex-shrink: 0;
    }
    .section-label {
      font-family: Arial, sans-serif;
      font-size: 7pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.18em;
    }
    .section-sublabel {
      font-family: Arial, sans-serif;
      font-size: 7pt;
      color: #94a3b8;
      font-weight: 500;
    }
    .section-badge {
      margin-left: auto;
      font-family: Arial, sans-serif;
      font-size: 6.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .section-body {
      padding: 16px 18px;
    }

    /* Official Provision */
    .card-official .section-header { background: #f8fafc; }
    .card-official .section-icon { background: #f1f5f9; }
    .card-official .section-label { color: #475569; }
    .card-official .section-badge { background: #f1f5f9; color: #64748b; }

    /* Guru Explanation */
    .card-guru { border-color: ${c.border}; }
    .card-guru .section-header { background: ${c.light}; border-color: ${c.border}; }
    .card-guru .section-icon { background: ${c.light}; border: 1px solid ${c.border}; }
    .card-guru .section-label { color: ${c.primary}; }
    .card-guru .section-badge { background: ${c.light}; color: ${c.primary}; border: 1px solid ${c.border}; }

    /* Practical Example */
    .card-example { border-color: #bfdbfe; }
    .card-example .section-header { background: #eff6ff; border-color: #bfdbfe; }
    .card-example .section-icon { background: #dbeafe; }
    .card-example .section-label { color: #1d4ed8; }
    .card-example .section-body { background: #f0f7ff; }
    .card-example .section-badge { background: #dbeafe; color: #1d4ed8; }

    /* Exam Insight */
    .card-exam { border-color: #fde68a; }
    .card-exam .section-header { background: #fffbeb; border-color: #fde68a; }
    .card-exam .section-icon { background: #fef3c7; }
    .card-exam .section-label { color: #b45309; }
    .card-exam .section-body { background: #fffdf0; }
    .card-exam .section-badge { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }

    /* ── CONTENT TYPOGRAPHY ── */
    .section-body p {
      margin-bottom: 8px;
      color: #334155;
      font-size: 10.5pt;
      line-height: 1.75;
    }
    .section-body h4 {
      font-family: Arial, sans-serif;
      font-size: 10pt;
      font-weight: 700;
      color: #1e293b;
      margin: 12px 0 6px;
      padding-bottom: 3px;
      border-bottom: 1px solid #e2e8f0;
    }
    .section-body ul, .section-body ol {
      padding-left: 18px;
      margin-bottom: 8px;
    }
    .section-body li {
      margin-bottom: 5px;
      color: #334155;
      font-size: 10.5pt;
      line-height: 1.65;
    }
    .section-body strong {
      font-weight: 700;
      color: #0f172a;
    }
    .section-body em {
      font-style: italic;
      color: #475569;
    }
    .section-body blockquote {
      border-left: 3px solid #cbd5e1;
      padding: 6px 12px;
      margin: 8px 0;
      background: #f8fafc;
      border-radius: 0 6px 6px 0;
      font-style: italic;
      color: #475569;
    }

    /* ── TABLE ── */
    .section-body table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-family: Arial, sans-serif;
      font-size: 9pt;
    }
    .section-body th {
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-align: left;
      padding: 7px 10px;
      border: 1px solid #cbd5e1;
    }
    .section-body td {
      padding: 6px 10px;
      border: 1px solid #e2e8f0;
      color: #475569;
      vertical-align: top;
    }
    .section-body tr:nth-child(even) td { background: #f8fafc; }

    /* ── FOOTER (end-of-document) ── */
    .pdf-footer {
      margin-top: 28px;
      padding: 12px 16px;
      background: linear-gradient(135deg, ${c.light} 0%, #f8fafc 100%);
      border: 1.5px solid ${c.border};
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .pdf-footer-logo {
      width: 36px;
      height: 36px;
      object-fit: contain;
      border-radius: 6px;
      flex-shrink: 0;
    }
    .pdf-footer-text {
      flex: 1;
    }
    .pdf-footer-title {
      font-family: Arial, sans-serif;
      font-size: 8.5pt;
      font-weight: 900;
      color: ${c.primary};
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .pdf-footer-sub {
      font-family: Arial, sans-serif;
      font-size: 7pt;
      color: #64748b;
      margin-top: 2px;
    }
    .pdf-footer-url {
      font-family: Arial, sans-serif;
      font-size: 8pt;
      font-weight: 700;
      color: ${c.primary};
      text-align: right;
      white-space: nowrap;
    }

    /* ── PRINT BUTTON (screen only) ── */
    .print-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: ${c.primary};
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 22px;
      font-family: Arial, sans-serif;
      font-size: 10pt;
      font-weight: 700;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .print-btn:hover { opacity: 0.9; }
  </style>
</head>
<body>

  <!-- Print button (hidden in PDF) -->
  <div class="no-print" style="padding:16px 0 0 0; text-align:center;">
    <button class="print-btn" onclick="window.print()">
      ⬇ Save as PDF / Print
    </button>
    <p style="font-family:Arial,sans-serif;font-size:8pt;color:#94a3b8;margin-top:6px;">
      In the print dialog — select <strong>Save as PDF</strong> as destination for best results.
    </p>
  </div>

  <!-- Branding bar -->
  <div class="brand-bar">
    <div class="brand-logo-wrap">
      <img class="brand-logo" src="${typeof window !== 'undefined' ? window.location.origin : ''}/official-logo.png" alt="Dak Guru Logo" />
      <div class="brand-text-wrap">
        <div class="brand-name">Dak Guru</div>
        <div class="brand-tagline">Self-Learning Portal for Postal Aspirants</div>
      </div>
    </div>
    <div class="brand-date">
      Generated: ${format(new Date(), "dd MMM yyyy")}<br/>
      <span style="color:${c.primary};font-weight:600;">dakguru.com</span>
    </div>
  </div>

  <!-- Hero / Header -->
  <div class="header-banner">
    <div class="header-meta">
      <span class="category-pill">${category}</span>
      <span class="act-name">${act_name}</span>
      ${rule_number ? `<span class="rule-num">· ${rule_number}</span>` : ""}
    </div>
    <div class="header-title">${title}</div>
    <div class="header-footer">
      ${dateStr ? `<span class="header-tag">📅 Effective: ${dateStr}</span>` : ""}
      <span class="header-tag">📚 Dak Sutra Series</span>
      <span class="header-tag">🎯 LDCE / PS Group B</span>
    </div>
  </div>

  <!-- 1. Official Provision -->
  <div class="section-card card-official">
    <div class="section-header">
      <div class="section-icon">📄</div>
      <div>
        <div class="section-label">Official Provision</div>
        <div class="section-sublabel">Verbatim legal text</div>
      </div>
      <span class="section-badge">Primary Source</span>
    </div>
    <div class="section-body">
      ${official_text}
    </div>
  </div>

  <!-- 2. Dak Guru Explanation -->
  <div class="section-card card-guru">
    <div class="section-header">
      <div class="section-icon">📖</div>
      <div>
        <div class="section-label">Dak Guru Explains</div>
        <div class="section-sublabel">Plain-language breakdown</div>
      </div>
      <span class="section-badge">✦ Simplified</span>
    </div>
    <div class="section-body">
      ${guru_explanation}
    </div>
  </div>

  <!-- 3. Practical Example -->
  ${practical_example ? `
  <div class="section-card card-example">
    <div class="section-header">
      <div class="section-icon">🎯</div>
      <div>
        <div class="section-label">Practical Example</div>
        <div class="section-sublabel">Real-world scenario</div>
      </div>
      <span class="section-badge">Case Study</span>
    </div>
    <div class="section-body">
      ${practical_example}
    </div>
  </div>
  ` : ""}

  <!-- 4. Exam Insight -->
  ${exam_insight ? `
  <div class="section-card card-exam">
    <div class="section-header">
      <div class="section-icon">⚡</div>
      <div>
        <div class="section-label">Exam Insight</div>
        <div class="section-sublabel">What the examiner expects</div>
      </div>
      <span class="section-badge">🎓 Must Read</span>
    </div>
    <div class="section-body">
      ${exam_insight}
    </div>
  </div>
  ` : ""}

  <!-- End-of-document footer card -->
  <div class="pdf-footer">
    <img class="pdf-footer-logo" src="${typeof window !== 'undefined' ? window.location.origin : ''}/official-logo.png" alt="Dak Guru" />
    <div class="pdf-footer-text">
      <div class="pdf-footer-title">Dak Guru — Dak Sutra Series</div>
      <div class="pdf-footer-sub">
        ${act_name}${rule_number ? " · " + rule_number : ""} &nbsp;·&nbsp; For educational use only
      </div>
    </div>
    <div class="pdf-footer-url">
      Visit Dak Sutra @<br/>www.dakguru.com
    </div>
  </div>

  <script>
    // Auto-print after fonts and images load
    window.onload = function () {
      setTimeout(function () { window.print(); }, 600);
    };
  </script>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
        win.addEventListener("afterprint", () => {
            URL.revokeObjectURL(url);
        });
    }
};
