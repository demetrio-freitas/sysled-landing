const COLORS = {
  white: "#FFFFFF",
  electricBlue: "#4A9FE5",
};

const linkStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  color: "rgba(255,255,255,0.5)",
  textDecoration: "none",
  transition: "color 0.2s",
};

const pages = [
  { href: "/", label: "Landing Page" },
  { href: "/roi", label: "ROI Investidores" },
  { href: "/propostacomercial", label: "Proposta Comercial" },
  { href: "/analisecompetitiva", label: "Análise Competitiva" },
  { href: "/mapaobjecoes", label: "Mapa de Objeções" },
  { href: "/instagram", label: "Instagram Simulação" },
  { href: "/linkedin", label: "LinkedIn Simulação" },
];

export default function SharedFooter() {
  return (
    <footer style={{
      background: "#060E1A", padding: "40px 24px", textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 20, color: COLORS.white }}>SYSLED</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.electricBlue, fontWeight: 500, letterSpacing: "0.08em" }}>Industrial OS</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16, flexWrap: "wrap" }}>
        {pages.map(p => (
          <a
            key={p.href}
            href={p.href}
            style={linkStyle}
            onMouseEnter={e => e.target.style.color = COLORS.electricBlue}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
          >
            {p.label}
          </a>
        ))}
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>
        SYSLED Tecnologia LTDA — Fortaleza, CE — © 2026
      </p>
    </footer>
  );
}
