import { useState, useRef, useEffect } from "react";
import SharedFooter from "./SharedFooter";

// ─── Paleta ───────────────────────────────────────────────────────────────────
const C = {
  navy:        "#0A1628",
  navyMid:     "#0F2040",
  orange:      "#E8712B",
  orangeLight: "#FF8C42",
  blue:        "#2E75B6",
  blueLight:   "#4A9FE5",
  green:       "#22C55E",
  red:         "#EF4444",
  white:       "#FFFFFF",
  muted:       "#8899AA",
  igBg:        "#FAFAFA",
  igBorder:    "#DBDBDB",
  igText:      "#262626",
  igMuted:     "#737373",
  igBlue:      "#0095F6",
  igStory1:    "#F58529",
  igStory2:    "#DD2A7B",
  igStory3:    "#8134AF",
  igStory4:    "#515BD4",
};

// ─── Dados de posts ───────────────────────────────────────────────────────────
const PROFILE = {
  handle: "demetrio.sysled",
  name: "Demétrio Freitas | SYSLED",
  bio: "Fundador @sysledindustrialos\n🏭 Industrial OS para a indústria brasileira\n🔥 O ERP morreu.\n👇 Crie sua conta grátis",
  followers: "1.847",
  following: "312",
  posts: "24",
  verified: false,
};

const POSTS = [
  {
    id: 1,
    phase: "antes",
    phaseLabel: "Antes da Feira",
    date: "24 fev",
    type: "carrossel",
    slides: [
      {
        bg: C.navy,
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: 28, textAlign: "center", gap: 12 }}>
            <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 13, color: C.orange, letterSpacing: "0.15em", textTransform: "uppercase" }}>SYSLED · Industrial OS</span>
            <h2 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 34, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em" }}>5 sinais de que seu ERP já <span style={{ color: C.orange, textDecoration: "line-through", textDecorationColor: C.red }}>morreu</span></h2>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>deslize para ver →</span>
          </div>
        ),
      },
      {
        bg: "#0D1E35",
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(232,113,43,0.15)", border: "1px solid rgba(232,113,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📊</div>
            <h3 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.2 }}>01</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#fff", fontWeight: 600, lineHeight: 1.4 }}>Você usa o sistema pro financeiro, mas a <span style={{ color: C.orange }}>produção está na planilha.</span></p>
          </div>
        ),
      },
      {
        bg: "#0D1E35",
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(232,113,43,0.15)", border: "1px solid rgba(232,113,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💸</div>
            <h3 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.2 }}>02</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#fff", fontWeight: 600, lineHeight: 1.4 }}>Pedi uma customização simples. Orçaram <span style={{ color: C.orange }}>3 meses e R$ 50 mil.</span></p>
          </div>
        ),
      },
      {
        bg: "#0D1E35",
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(232,113,43,0.15)", border: "1px solid rgba(232,113,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🖥️</div>
            <h3 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.2 }}>03</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#fff", fontWeight: 600, lineHeight: 1.4 }}>A interface parece que foi feita <span style={{ color: C.orange }}>antes do iPhone existir.</span></p>
          </div>
        ),
      },
      {
        bg: "#0D1E35",
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(232,113,43,0.15)", border: "1px solid rgba(232,113,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔒</div>
            <h3 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.2 }}>04</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#fff", fontWeight: 600, lineHeight: 1.4 }}>Seu dado é <span style={{ color: C.orange }}>do fornecedor, não seu.</span></p>
          </div>
        ),
      },
      {
        bg: "#0D1E35",
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(232,113,43,0.15)", border: "1px solid rgba(232,113,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>😰</div>
            <h3 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.2 }}>05</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#fff", fontWeight: 600, lineHeight: 1.4 }}>Você tem <span style={{ color: C.orange }}>medo de trocar</span> de sistema porque pode ficar parado.</p>
          </div>
        ),
      },
      {
        bg: C.navy,
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: 28, textAlign: "center", gap: 16 }}>
            <div style={{ fontSize: 40 }}>🎯</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#fff", fontWeight: 700, lineHeight: 1.4 }}>Se marcou <span style={{ color: C.orange, fontFamily: "'Anybody', sans-serif", fontSize: 24 }}>2+</span>, o ERP morreu pra você também.</p>
            <div style={{ padding: "12px 24px", borderRadius: 10, background: C.orange, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 14, color: "#fff", letterSpacing: "0.04em" }}>
              Link na bio 👆
            </div>
          </div>
        ),
      },
    ],
    caption: "5 sinais de que seu ERP já morreu 👆\n\nMarca aqui embaixo quantos você marcou.\n\n#ERPMorreu #SYSLED #IndustrialOS #Indústria40 #Gestão #Empreendedorismo #Tech",
    likes: "312",
    comments: [
      { user: "jose.manufatura", text: "Marquei todos os 5 😭" },
      { user: "ana.gestao", text: "O 3 me pegou demais!! Interface dos anos 2000 mesmo" },
      { user: "demetrio.sysled", text: "@ana.gestao qual sistema você usa?" },
      { user: "fabrica_nordeste", text: "Que vergonha né... é a realidade de 90% das indústrias" },
    ],
  },
  {
    id: 2,
    phase: "antes",
    phaseLabel: "Antes da Feira",
    date: "26 fev",
    type: "estatico",
    bgColor: C.navy,
    content: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 32, gap: 20 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.orange, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Minha história</div>
        {[
          { num: "10", label: "anos" },
          { num: "5", label: "sistemas" },
          { num: "0", label: "resolveram" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 56, color: i === 2 ? C.red : "#fff", lineHeight: 1 }}>{item.num}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, color: C.muted, fontWeight: 400 }}>{item.label}</span>
          </div>
        ))}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#fff", fontWeight: 600, lineHeight: 1.5 }}>Então eu construí o meu. <span style={{ color: C.orange }}>Não um ERP. Algo diferente.</span></p>
      </div>
    ),
    caption: "10 anos. 5 ERPs. Nenhum funcionou.\n\nEntão eu construí algo diferente.\n\nNão um ERP. Um Sistema Operacional Industrial.\n\nLink na bio.\n\n#ERPMorreu #SYSLED #Empreendedorismo #Tech #Startup",
    likes: "487",
    comments: [
      { user: "marcelo_ind", text: "Cara, isso é EXATAMENTE o que eu vivo!" },
      { user: "startup_ce", text: "Que história inspiradora! Boa sorte com o lançamento 🚀" },
      { user: "pedro.diretor", text: "Quando tem demo? Quero ver" },
      { user: "demetrio.sysled", text: "@pedro.diretor Smart Factory dias 9 e 10! Vem me ver no stand 👊" },
    ],
  },
  {
    id: 3,
    phase: "antes",
    phaseLabel: "Antes da Feira",
    date: "1 mar",
    type: "carrossel",
    slides: [
      {
        bg: "#0D1E35",
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 10 }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
              {["#EF4444","#EF4444","#fff","#22C55E","#22C55E"].map((c,i)=>(
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: c, opacity: 0.6 }} />
              ))}
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>ERP vs. Industrial OS</span>
            <h2 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 26, color: "#fff", lineHeight: 1.1 }}>Qual a diferença real?</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted }}>deslize para comparar →</p>
          </div>
        ),
      },
      {
        bg: "#0D1E35",
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 24, gap: 12 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Implantação</p>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, padding: "14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.red, fontWeight: 700, marginBottom: 6 }}>❌ ERP</div>
                <div style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>3–12</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>meses</div>
              </div>
              <div style={{ flex: 1, padding: "14px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.green, fontWeight: 700, marginBottom: 6 }}>✅ SYSLED</div>
                <div style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>Zero</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>setup</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        bg: "#0D1E35",
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 24, gap: 12 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Customização</p>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, padding: "14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.red, fontWeight: 700, marginBottom: 6 }}>❌ ERP</div>
                <div style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", lineHeight: 1.2 }}>R$ 50K<br/>+ 3 meses</div>
              </div>
              <div style={{ flex: 1, padding: "14px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.green, fontWeight: 700, marginBottom: 6 }}>✅ SYSLED</div>
                <div style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", lineHeight: 1.2 }}>IA entrega<br/>em dias</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        bg: "#0D1E35",
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 24, gap: 12 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Seus Dados</p>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, padding: "14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.red, fontWeight: 700, marginBottom: 6 }}>❌ ERP</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 600, lineHeight: 1.3 }}>Presos no fornecedor</div>
              </div>
              <div style={{ flex: 1, padding: "14px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.green, fontWeight: 700, marginBottom: 6 }}>✅ SYSLED</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 600, lineHeight: 1.3 }}>100% seus, sempre</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        bg: C.navy,
        content: (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: 28, textAlign: "center", gap: 14 }}>
            <p style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 22, color: "#fff", lineHeight: 1.2 }}>Quer ver ao vivo?</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.muted, lineHeight: 1.4 }}>Smart Factory<br/><span style={{ color: C.orange, fontWeight: 700 }}>9–10 de março</span><br/>Fortaleza, CE</p>
            <div style={{ padding: "12px 24px", borderRadius: 10, background: C.orange, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 14, color: "#fff" }}>
              Link na bio 👆
            </div>
          </div>
        ),
      },
    ],
    caption: "ERP vs. Industrial OS — a diferença real 👆\n\nNão é só interface. É um conceito completamente diferente.\n\nSmart Factory, 9–10 de março. Demo ao vivo.\n\n#ERPMorreu #SYSLED #IndustrialOS #Indústria40 #Gestão",
    likes: "219",
    comments: [
      { user: "rodrigo_fab", text: "Esse carrossel deveria ser obrigatório em toda feira industrial 🔥" },
      { user: "carla.operacoes", text: "Esse 'zero setup' é real mesmo? Como funciona?" },
      { user: "demetrio.sysled", text: "@carla.operacoes Real! Cria conta em 2 min, sem instalação. Passa lá na Smart Factory que você vê ao vivo 👊" },
    ],
  },
  {
    id: 4,
    phase: "antes",
    phaseLabel: "Antes da Feira",
    date: "4 mar",
    type: "estatico",
    bgColor: "#0D1E35",
    content: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 18 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Sua fábrica perde dinheiro todo mês.<br/>Você só não sabe quanto.</div>
        {[
          { num: "15h", label: "/semana em planilhas", color: "#fff" },
          { num: "8–12", label: "erros de estoque/mês", color: C.red },
          { num: "R$ 25K", label: "em perdas invisíveis", color: C.red },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 36, color: item.color, lineHeight: 1 }}>{item.num}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted }}>{item.label}</span>
          </div>
        ))}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 600 }}>Descubra o número real: <span style={{ color: C.orange }}>link na bio →</span></p>
      </div>
    ),
    caption: "Quanto sua fábrica perde por mês sem o sistema certo? 👆\n\nDescubra o número real com nossa calculadora gratuita.\nLink na bio.\n\nE se quiser ver a solução ao vivo: Smart Factory, 9 e 10 de março.\n\n#ERPMorreu #Produtividade #SYSLED #Indústria40 #Gestão",
    likes: "398",
    comments: [
      { user: "luiz.gerente", text: "15h semanais... é exatamente o que acontece aqui" },
      { user: "marcos_ceo", text: "Calculadora é boa demais. Saiu um número assustador aqui 😅" },
      { user: "demetrio.sysled", text: "@marcos_ceo E daí? Quer resolver? Me chama no DM 😄" },
      { user: "industria.mg", text: "Isso é real demais... triste" },
    ],
  },
  {
    id: 5,
    phase: "antes",
    phaseLabel: "Antes da Feira",
    date: "7 mar",
    type: "evento",
    bgColor: C.navy,
    content: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(232,113,43,0.15)", border: "1px solid rgba(232,113,43,0.3)" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.orange, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Evento ao Vivo</span>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22 }}>🎯</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <h2 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 32, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em" }}>O ERP morreu — e a gente vai provar ao vivo.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "📅", text: "9 e 10 de março de 2026" },
              { icon: "📍", text: "Smart Factory · Fortaleza, CE" },
              { icon: "🎮", text: "Demo ao vivo + conta grátis na hora" },
              { icon: "🗣️", text: "Conversa direta com o fundador" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "12px 20px", borderRadius: 10, background: C.orange, textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "0.04em" }}>Marca quem precisa ver isso ↓</span>
        </div>
      </div>
    ),
    caption: "9 e 10 de março. Smart Factory. Te vejo lá. 🎯\n\nO ERP morreu. E eu vou provar ao vivo.\n\nDemo ao vivo. Conta gratuita na hora. Conversa direta com quem construiu.\n\nMarca quem precisa ver isso 👇\n\n#SmartFactory #ERPMorreu #SYSLED #FeiraSmart #Fortaleza",
    likes: "541",
    comments: [
      { user: "alana.tech", text: "Vou!! Já marquei na agenda 🔥" },
      { user: "carlos_fabric", text: "@joao.diretor passa lá com a gente" },
      { user: "joao.diretor", text: "@carlos_fabric na moral?? Vou sim!" },
      { user: "demetrio.sysled", text: "Stand [número] galera. Chega cedo que as demos são ao vivo 👊" },
      { user: "smart_factory_ce", text: "Esperamos vocês! 🏭" },
    ],
  },
  {
    id: 6,
    phase: "durante",
    phaseLabel: "Durante a Feira",
    date: "9 mar · 8h",
    type: "ao-vivo",
    bgColor: "#101820",
    content: (
      <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", padding: 20 }}>
        {/* Foto simulada do stand */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #0A1628 0%, #1a2a45 50%, #0e1e35 100%)",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px)" }} />
          <div style={{ position: "absolute", top: 24, left: 24, right: 24, padding: "18px 22px", borderRadius: 14, background: "rgba(232,113,43,0.12)", border: "2px solid rgba(232,113,43,0.4)", textAlign: "center" }}>
            <div style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 28, color: "#fff" }}>O ERP</div>
            <div style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 28, color: C.orange, textDecoration: "line-through", textDecorationColor: C.red }}>morreu.</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 6 }}>SYSLED | Industrial OS</div>
          </div>
        </div>
        {/* Overlay inferior */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ padding: "6px 12px", borderRadius: 20, background: C.red, display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", animation: "pulse 1s infinite" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#fff" }}>AO VIVO</span>
          </div>
          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", fontWeight: 600, margin: 0 }}>Bom dia! Começou. 🏭</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, margin: "4px 0 0" }}>Se você é de Fortaleza e trabalha com indústria — vem agora.</p>
          </div>
        </div>
      </div>
    ),
    caption: "Chegou o dia. O ERP morreu — e a gente está aqui pra mostrar o que vem depois. 🔥\n\nPrimeiro dia de Smart Factory.\n\nStand [número]. Vou estar aqui o dia inteiro.\n\n#SmartFactory #ERPMorreu #SYSLED #Fortaleza",
    likes: "623",
    comments: [
      { user: "paulo.ind", text: "Tô chegando!!! 🔥🔥" },
      { user: "bruna_startup", text: "Não estou em Fortaleza mas tô na torcida!! 💪" },
      { user: "fiec_ce", text: "Que a feira seja incrível! 🏭" },
      { user: "demetrio.sysled", text: "@paulo.ind te espero lá 👊 venha cedo!" },
    ],
  },
  {
    id: 7,
    phase: "durante",
    phaseLabel: "Durante a Feira",
    date: "9 mar · 16h",
    type: "depoimento",
    bgColor: "#0D1E35",
    content: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 20 }}>
        <div style={{ fontSize: 36, textAlign: "center" }}>🤯</div>
        <div style={{ padding: "20px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: `1px solid rgba(232,113,43,0.3)`, borderLeft: `4px solid ${C.orange}` }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#fff", fontWeight: 600, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
            "Em 10 anos, ninguém me mostrou isso."
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, margin: "0 0 4px" }}>— fabricante de [segmento]</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>2 minutos. Conta criada ao vivo. No celular dele.</p>
        </div>
        <div style={{ padding: "12px 20px", borderRadius: 10, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.green, fontWeight: 700, margin: 0, textAlign: "center" }}>Amanhã tem mais. Stand [número]. ↓</p>
        </div>
      </div>
    ),
    caption: "\"Em 10 anos, ninguém me mostrou isso.\" 🤯\n\nEle chegou cético. 2 minutos depois, estava dentro do SYSLED. No próprio celular.\n\nÉ por isso que eu construí isso.\n\n#SmartFactory #ERPMorreu #SYSLED #IndustrialOS",
    likes: "891",
    comments: [
      { user: "vanessa.cfo", text: "Isso é muito poderoso. Parabéns 👏" },
      { user: "rede_industrial", text: "Repostando isso no stories!!" },
      { user: "roberto_ceo", text: "Quando abre pra todo o Brasil?" },
      { user: "demetrio.sysled", text: "@roberto_ceo JÁ está aberto! Link na bio, cria conta agora mesmo 😄" },
      { user: "startup_hub_ce", text: "Orgulho do Ceará 🦁" },
    ],
  },
  {
    id: 8,
    phase: "depois",
    phaseLabel: "Depois da Feira",
    date: "11 mar",
    type: "resultado",
    bgColor: C.navy,
    content: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 16 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>2 dias de Smart Factory</div>
        <h2 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 28, color: "#fff", lineHeight: 1.1 }}>O ERP morreu era provocação. Era. <span style={{ color: C.orange }}>Mas também era verdade.</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { num: "[X]", label: "fabricantes no stand", color: C.blueLight },
            { num: "[Y]", label: "contas criadas ao vivo", color: C.green },
            { num: "[Z]", label: "demos personalizadas", color: C.orange },
            { num: "0", label: "implantações necessárias", color: C.green },
          ].map((item, i) => (
            <div key={i} style={{ padding: "14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}22`, textAlign: "center" }}>
              <div style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 26, color: item.color }}>{item.num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, marginTop: 4, lineHeight: 1.3 }}>{item.label}</div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, fontStyle: "italic", lineHeight: 1.5 }}>"Por que isso não existe há 10 anos?"</p>
      </div>
    ),
    caption: "2 dias de Smart Factory. Aqui está o que aconteceu. 🏁\n\nA reação mais comum? \"Por que isso não existe há 10 anos?\"\n\nA feira acabou. Mas o Sistema Operacional da sua fábrica está começando.\nLink na bio.\n\n#SmartFactory #ERPMorreu #SYSLED #Recap",
    likes: "1.247",
    comments: [
      { user: "ana_startup", text: "Que números incríveis!! Parabéns 🎉" },
      { user: "fabio.diretor", text: "Não pude ir... quando tem próximo evento?" },
      { user: "demetrio.sysled", text: "@fabio.diretor Já pode criar conta online! Link na bio. Mas próxima feira em breve 🙌" },
      { user: "investidor_seed", text: "Impressionante. DM enviado 📩" },
      { user: "comunidade_ind", text: "A indústria brasileira precisa disso demais!!" },
    ],
  },
  {
    id: 9,
    phase: "depois",
    phaseLabel: "Depois da Feira",
    date: "17 mar",
    type: "reflexao",
    bgColor: "#0D1E35",
    content: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: 28, gap: 14 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.orange, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>3 lições aprendidas</div>
        {[
          { num: "01", text: "O fabricante não tem medo de tecnologia. Tem medo de implantação." },
          { num: "02", text: "Mobile não é diferencial — é obrigação. Cada um que viu no celular perguntou: 'por que meu ERP não faz isso?'" },
          { num: "03", text: "Customização rápida é o que fecha negócio. De 'interessante' pra 'quando começa?' em segundos." },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, background: "rgba(232,113,43,0.15)", border: "1px solid rgba(232,113,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Anybody', sans-serif", fontSize: 11, fontWeight: 900, color: C.orange }}>{item.num}</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>{item.text}</p>
          </div>
        ))}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.orange, fontWeight: 700 }}>O ERP morreu não é só frase. É o que eu vi nos olhos de dezenas de fabricantes. 👇 link na bio</p>
      </div>
    ),
    caption: "3 coisas que aprendi mostrando o SYSLED pra [X] fabricantes em 2 dias. 🧠\n\nO ERP morreu não é só uma frase de efeito. É o que eu vi nos olhos de dezenas de fabricantes frustrados.\n\nA jornada está só começando. Link na bio.\n\n#ERPMorreu #SYSLED #LearningsPost #Empreendedorismo #IndústriaBrasileira",
    likes: "734",
    comments: [
      { user: "giovana.mkt", text: "Ponto 01 é TUDO. Nunca tinha pensado assim" },
      { user: "henrique_cto", text: "Mobile como obrigação, não diferencial. Esse é o futuro." },
      { user: "demetrio.sysled", text: "@henrique_cto Exato! E o SYSLED já nasceu assim. 100% mobile-first 📱" },
    ],
  },
];

// ─── Stories bar ──────────────────────────────────────────────────────────────
const STORIES = [
  { label: "Sua história", isUser: true },
  { label: "bastidores", color1: C.igStory1, color2: C.igStory2 },
  { label: "demo ao vivo", color1: C.igStory2, color2: C.igStory3 },
  { label: "smart factory", color1: C.igStory3, color2: C.igStory4 },
  { label: "depoimentos", color1: C.igStory1, color2: C.igStory3 },
  { label: "resultados", color1: C.igStory2, color2: C.igStory4 },
];

function StoryAvatar({ story, size = 56 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0 }}>
      <div style={{
        width: size + 4, height: size + 4, borderRadius: "50%", padding: 2,
        background: story.isUser ? "transparent" : `linear-gradient(45deg, ${story.color1}, ${story.color2})`,
        border: story.isUser ? "2px dashed #DBDBDB" : "none",
      }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: "50%",
          background: story.isUser ? "#FAFAFA" : C.navy,
          border: story.isUser ? "none" : "2px solid #FAFAFA",
          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
        }}>
          {story.isUser ? (
            <span style={{ fontSize: 22, color: "#8E8E8E" }}>+</span>
          ) : (
            <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${C.navy}, #162840)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 14, color: C.orange }}>S</span>
            </div>
          )}
        </div>
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.igText, textAlign: "center", maxWidth: 60, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {story.isUser ? "Sua história" : story.label}
      </span>
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────
function PostCard({ post, isActive }) {
  const [slide, setSlide] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(parseInt(post.likes.replace(".", "")) || 0);
  const isCarrossel = post.type === "carrossel";
  const slides = isCarrossel ? post.slides : null;
  const totalSlides = isCarrossel ? slides.length : 1;

  const handleLike = () => {
    setLiked(l => !l);
    setLikesCount(n => liked ? n - 1 : n + 1);
  };

  const phaseBadge = {
    antes: { label: "Antes da Feira", color: C.blueLight, bg: "rgba(74,159,229,0.12)" },
    durante: { label: "🔴 Ao Vivo", color: C.red, bg: "rgba(239,68,68,0.12)" },
    depois: { label: "Pós-Feira", color: C.green, bg: "rgba(34,197,94,0.12)" },
  }[post.phase];

  return (
    <div style={{
      background: "#fff",
      borderTop: "1px solid #DBDBDB",
      borderBottom: "1px solid #DBDBDB",
      marginBottom: 8,
    }}>
      {/* Header do post */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", padding: 2, background: `linear-gradient(45deg, ${C.igStory1}, ${C.igStory2})` }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: C.navy, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 12, color: C.orange }}>D</span>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: C.igText }}>demetrio.sysled</span>
              <span style={{ padding: "2px 8px", borderRadius: 20, background: phaseBadge.bg, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, color: phaseBadge.color }}>
                {phaseBadge.label}
              </span>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.igMuted }}>{post.date}</span>
          </div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: C.igText, padding: "4px 8px" }}>···</button>
      </div>

      {/* Imagem/Conteúdo */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", background: post.bgColor || C.navy, overflow: "hidden" }}>
        {isCarrossel ? (
          <div style={{ width: "100%", height: "100%" }}>
            <div style={{ background: slides[slide].bg, width: "100%", height: "100%" }}>
              {slides[slide].content}
            </div>
          </div>
        ) : (
          <div style={{ background: post.bgColor, width: "100%", height: "100%" }}>
            {post.content}
          </div>
        )}

        {/* Dots para carrossel */}
        {isCarrossel && (
          <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4 }}>
            {slides.map((_, i) => (
              <div key={i} style={{ width: i === slide ? 14 : 6, height: 6, borderRadius: 3, background: i === slide ? C.igBlue : "rgba(255,255,255,0.5)", transition: "all 0.2s" }} />
            ))}
          </div>
        )}

        {/* Navegação carrossel */}
        {isCarrossel && totalSlides > 1 && (
          <>
            {slide > 0 && (
              <button onClick={() => setSlide(s => s - 1)} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>‹</button>
            )}
            {slide < totalSlides - 1 && (
              <button onClick={() => setSlide(s => s + 1)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>›</button>
            )}
            <div style={{ position: "absolute", top: 10, right: 10, padding: "3px 8px", borderRadius: 20, background: "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#fff", fontWeight: 600 }}>
              {slide + 1}/{totalSlides}
            </div>
          </>
        )}
      </div>

      {/* Ações */}
      <div style={{ padding: "8px 12px 4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <button onClick={handleLike} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, fontSize: 24, lineHeight: 1, color: liked ? C.red : C.igText, transition: "transform 0.1s" }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(1.2)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {liked ? "❤️" : "🤍"}
            </button>
            <button onClick={() => setShowComments(c => !c)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, fontSize: 22, lineHeight: 1 }}>💬</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2, fontSize: 22, lineHeight: 1 }}>↗️</button>
          </div>
          <button onClick={() => setSaved(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, fontSize: 22, lineHeight: 1 }}>
            {saved ? "🔖" : "🏷️"}
          </button>
        </div>

        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: C.igText, marginBottom: 4 }}>
          {liked ? (parseInt(post.likes.replace(".", "")) + 1).toLocaleString("pt-BR") : post.likes} curtidas
        </div>

        {/* Caption */}
        <CaptionExpander caption={post.caption} handle="demetrio.sysled" />

        {/* Comentários */}
        {post.comments.length > 0 && (
          <button onClick={() => setShowComments(c => !c)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.igMuted }}>
            {showComments ? "Ocultar comentários" : `Ver todos os ${post.comments.length} comentários`}
          </button>
        )}

        {showComments && (
          <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 5 }}>
            {post.comments.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 6 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: C.igText, flexShrink: 0 }}>{c.user}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.igText }}>{c.text}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.igMuted, marginTop: 6, marginBottom: 4 }}>{post.date} · 2026</div>
      </div>

      {/* Input de comentário */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderTop: "1px solid #EFEFEF" }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#EEE", flexShrink: 0 }} />
        <input placeholder="Adicione um comentário..." style={{ flex: 1, border: "none", outline: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.igText, background: "transparent" }} />
        <button style={{ background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: C.igBlue, cursor: "pointer" }}>Publicar</button>
      </div>
    </div>
  );
}

function CaptionExpander({ caption, handle }) {
  const [expanded, setExpanded] = useState(false);
  const short = caption.slice(0, 80);
  const hasMore = caption.length > 80;
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.igText, marginBottom: 4, lineHeight: 1.45 }}>
      <span style={{ fontWeight: 700, marginRight: 5 }}>{handle}</span>
      {expanded || !hasMore ? (
        <span style={{ whiteSpace: "pre-line" }}>{caption}</span>
      ) : (
        <>
          {short}...{" "}
          <button onClick={() => setExpanded(true)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.igMuted, padding: 0 }}>mais</button>
        </>
      )}
    </div>
  );
}

// ─── Nav bar do Instagram ─────────────────────────────────────────────────────
function IgNavBar({ tab, setTab }) {
  const items = [
    { id: "feed", icon: "🏠" },
    { id: "explore", icon: "🔍" },
    { id: "reels", icon: "🎬" },
    { id: "shop", icon: "🛍️" },
    { id: "profile", icon: "👤" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "8px 0", background: "#fff", borderTop: "1px solid #DBDBDB" }}>
      {items.map((item) => (
        <button key={item.id} onClick={() => setTab(item.id)} style={{
          background: "none", border: "none", cursor: "pointer", fontSize: tab === item.id ? 26 : 22,
          padding: "6px 10px",
          opacity: tab === item.id ? 1 : 0.5,
          transition: "all 0.15s",
        }}>{item.icon}</button>
      ))}
    </div>
  );
}

// ─── Tela de Perfil ───────────────────────────────────────────────────────────
function ProfileScreen() {
  const [tab, setTab] = useState("grid");
  const gridPosts = POSTS;

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      {/* Header do perfil */}
      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: C.igText }}>demetrio.sysled</span>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>➕</button>
            <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>☰</button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", padding: 3, background: `linear-gradient(45deg, ${C.igStory1}, ${C.igStory2})` }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: C.navy, border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 28, color: C.orange }}>D</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { num: PROFILE.posts, label: "publicações" },
              { num: PROFILE.followers, label: "seguidores" },
              { num: PROFILE.following, label: "seguindo" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: C.igText }}>{s.num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.igText }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.igText }}>{PROFILE.name}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.igText, whiteSpace: "pre-line", lineHeight: 1.5 }}>{PROFILE.bio}</div>
        </div>
        <button style={{ width: "100%", padding: "7px 16px", borderRadius: 8, background: "#EFEFEF", border: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: C.igText, cursor: "pointer", marginBottom: 12 }}>
          Editar perfil
        </button>
        {/* Destaques */}
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
          {["Antes", "Feira", "Demos", "Resultados", "ERPMorreu"].map((h) => (
            <div key={h} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flexShrink: 0, cursor: "pointer" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#EEE", border: "1px solid #DBDBDB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: `linear-gradient(135deg, ${C.navy}, #162840)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 18, color: C.orange }}>S</span>
                </div>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.igText }}>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderTop: "1px solid #DBDBDB", borderBottom: "1px solid #DBDBDB" }}>
        {[{ id: "grid", icon: "⊞" }, { id: "reels", icon: "▷" }, { id: "tagged", icon: "☑" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "10px", background: "none", border: "none", cursor: "pointer",
            borderBottom: tab === t.id ? "2px solid #262626" : "2px solid transparent",
            fontSize: 18, opacity: tab === t.id ? 1 : 0.4,
          }}>{t.icon}</button>
        ))}
      </div>

      {/* Grid de posts */}
      {tab === "grid" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {gridPosts.map((post) => (
            <div key={post.id} style={{ aspectRatio: "1/1", background: post.bgColor || C.navy, position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <div style={{ width: "100%", height: "100%", transform: "scale(0.75)", transformOrigin: "top left" }}>
                {post.type === "carrossel" ? post.slides[0].content : post.content}
              </div>
              {post.type === "carrossel" && (
                <div style={{ position: "absolute", top: 6, right: 6, fontSize: 12 }}>⧉</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tela de Explore (Tabs de Fase) ───────────────────────────────────────────
function ExploreScreen() {
  const phases = [
    { id: "antes", label: "Antes da Feira", color: C.blueLight, posts: POSTS.filter(p => p.phase === "antes") },
    { id: "durante", label: "Durante", color: C.red, posts: POSTS.filter(p => p.phase === "durante") },
    { id: "depois", label: "Pós-Feira", color: C.green, posts: POSTS.filter(p => p.phase === "depois") },
  ];
  const [phase, setPhase] = useState("antes");
  const current = phases.find(p => p.id === phase);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#FAFAFA" }}>
      <div style={{ padding: "16px 16px 8px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20, color: C.igText }}>
        Série "O ERP Morreu"
      </div>
      <div style={{ display: "flex", gap: 8, padding: "0 16px 16px", overflowX: "auto" }}>
        {phases.map((p) => (
          <button key={p.id} onClick={() => setPhase(p.id)} style={{
            flexShrink: 0, padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer",
            background: phase === p.id ? p.color : "#EFEFEF",
            color: phase === p.id ? "#fff" : C.igMuted,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13,
            transition: "all 0.2s",
          }}>{p.label}</button>
        ))}
      </div>
      <div style={{ padding: "0 0 80px" }}>
        {current.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

// ─── Feed principal ───────────────────────────────────────────────────────────
function FeedScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#FAFAFA" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px 8px", background: "#fff", borderBottom: "1px solid #DBDBDB", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 22, color: C.igText, letterSpacing: "-0.02em" }}>Instagram</span>
          <span style={{ fontSize: 10, color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>· simulação</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>❤️</button>
          <button style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>📩</button>
        </div>
      </div>

      {/* Stories */}
      <div style={{ display: "flex", gap: 16, padding: "12px 16px", background: "#fff", borderBottom: "1px solid #DBDBDB", overflowX: "auto" }}>
        {STORIES.map((s, i) => <StoryAvatar key={i} story={s} />)}
      </div>

      {/* Posts */}
      <div style={{ paddingBottom: 80 }}>
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

// ─── Painel de Estratégia (Sidebar) ──────────────────────────────────────────
function StrategyPanel({ onClose }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "flex-end",
    }} onClick={onClose}>
      <div style={{ width: "100%", maxHeight: "85%", background: C.navy, borderRadius: "20px 20px 0 0", overflow: "hidden" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: "12px 0", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
        </div>
        <div style={{ overflowY: "auto", maxHeight: "calc(85vh - 40px)", padding: "0 20px 40px" }}>
          <h2 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 6 }}>Estratégia da Série</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 20 }}>Calendário editorial e táticas por fase</p>

          {[
            {
              phase: "Antes · 24 fev – 8 mar", color: C.blueLight,
              items: ["Post âncora: 'O ERP morreu' — responda TODOS os comentários nas primeiras 2h", "Storytelling pessoal gera 3–5x mais engajamento que posts institucionais", "Carrosseis educativos para educar o mercado", "Provocação com dados: calculadora de desperdício como isca", "Link da calculadora como 1º comentário (não no corpo — penalização do algoritmo)"],
            },
            {
              phase: "Durante · 9–10 mar", color: C.red,
              items: ["Publique em tempo real — a energia do momento é insubstituível", "Stories a cada 60–90 minutos durante a feira", "Capture depoimentos espontâneos (pedir permissão — 99% dizem sim)", "Stickers de enquete: 'Você usa ERP? Sim/Não'", "Filme TUDO, mesmo que não use — melhor ter de sobra"],
            },
            {
              phase: "Depois · 11–17 mar", color: C.green,
              items: ["Post D+1 com números reais (se modestos, reposicione para qualidade das conversas)", "Depoimento com permissão explícita — marque a empresa para alcance orgânico via rede deles", "Lições aprendidas performam bem: humildade + insight + história", "Posts 'learnings' fecham o arco narrativo e abrem a próxima fase"],
            },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 20, padding: "16px", borderRadius: 14, background: `${s.color}0A`, border: `1px solid ${s.color}33` }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: s.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>{s.phase}</div>
              {s.items.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                  <span style={{ color: s.color, flexShrink: 0, marginTop: 1 }}>•</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#fff", lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}

          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(232,113,43,0.08)", border: `1px solid ${C.orange}33` }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: C.orange, marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>Métricas-Alvo</div>
            {[
              ["Impressões/post", ">1.000"],
              ["Engajamento", ">3%"],
              ["Cliques no link/bio", ">50 por post"],
              ["Contas criadas (via UTM)", ">10/semana"],
              ["Seguidores novos", ">50 na série"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>{k}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function SYSLEDInstagramSim() {
  const [tab, setTab] = useState("feed");
  const [showStrategy, setShowStrategy] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#E8ECF1", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "32px 16px", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Container principal */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", maxWidth: 1100, width: "100%" }}>

        {/* Painel de info à esquerda */}
        <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Logo SYSLED */}
          <div style={{ padding: "20px", background: C.navy, borderRadius: 16 }}>
            <a href="/" style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6, textDecoration: "none", cursor: "pointer" }}>
              <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 20, color: "#fff" }}>SYSLED</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.blueLight, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Industrial OS</span>
            </a>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
              Simulação de feed Instagram — Série "O ERP Morreu"
            </p>
            <div style={{ marginTop: 12, padding: "8px 12px", borderRadius: 8, background: "rgba(232,113,43,0.1)", border: `1px solid ${C.orange}33` }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: C.orange, marginBottom: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>Smart Factory · Mar 2026</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>9 posts · 3 fases · LinkedIn + Instagram</div>
            </div>
          </div>

          {/* Calendário visual */}
          <div style={{ padding: "16px", background: "#fff", borderRadius: 16, border: "1px solid #DBDBDB" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.igText, marginBottom: 12 }}>Calendário Editorial</div>
            {[
              { phase: "Antes", dates: "24 fev – 8 mar", color: C.blueLight, posts: 5 },
              { phase: "Durante", dates: "9–10 mar", color: C.red, posts: 3 },
              { phase: "Depois", dates: "11–17 mar", color: C.green, posts: 3 },
            ].map((p) => (
              <div key={p.phase} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 4, height: 36, borderRadius: 2, background: p.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: C.igText }}>{p.phase}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.igMuted }}>{p.dates} · {p.posts} posts</div>
                </div>
                <div style={{ padding: "3px 8px", borderRadius: 20, background: `${p.color}18`, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: p.color }}>
                  {p.posts}
                </div>
              </div>
            ))}
          </div>

          {/* Botão estratégia */}
          <button onClick={() => setShowStrategy(true)} style={{
            padding: "14px 16px", borderRadius: 12, background: C.navy, border: `1px solid rgba(232,113,43,0.3)`,
            color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.orange}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(232,113,43,0.3)"}
          >
            <span style={{ fontSize: 20 }}>📋</span>
            Ver Estratégia Completa
          </button>

          {/* Hashtags */}
          <div style={{ padding: "14px", background: "#fff", borderRadius: 16, border: "1px solid #DBDBDB" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: C.igText, marginBottom: 10 }}>Hashtags da Série</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["#ERPMorreu", "#SYSLED", "#IndustrialOS", "#Indústria40", "#SmartFactory", "#Fortaleza", "#GestãoIndustrial", "#Empreendedorismo"].map(h => (
                <span key={h} style={{ padding: "4px 10px", borderRadius: 20, background: "#EEF2FF", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.igBlue, fontWeight: 600, cursor: "pointer" }}>{h}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Simulador do smartphone */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.igMuted, fontWeight: 600 }}>
            📱 Simulação de App Mobile
          </div>

          {/* Moldura do iPhone */}
          <div style={{
            width: 390, flexShrink: 0,
            background: "#1A1A1A",
            borderRadius: 48,
            padding: "14px 6px 8px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 0 0 2px #2A2A2A",
          }}>
            {/* Notch */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <div style={{ width: 120, height: 30, borderRadius: 15, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2A2A2A" }} />
                <div style={{ width: 70, height: 18, borderRadius: 9, background: "#2A2A2A" }} />
              </div>
            </div>

            {/* Tela */}
            <div style={{ borderRadius: 36, overflow: "hidden", background: C.igBg, height: 750, display: "flex", flexDirection: "column", position: "relative" }}>
              {/* Status bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 18px 2px", background: "#fff" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: C.igText }}>9:41</span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 12 }}>●●●</span>
                  <span style={{ fontSize: 12 }}>WiFi</span>
                  <span style={{ fontSize: 12 }}>🔋</span>
                </div>
              </div>

              {/* Conteúdo da tela */}
              {tab === "feed" && <FeedScreen />}
              {tab === "explore" && <ExploreScreen />}
              {tab === "profile" && <ProfileScreen />}
              {(tab === "reels" || tab === "shop") && (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, background: C.igBg }}>
                  <span style={{ fontSize: 48 }}>{tab === "reels" ? "🎬" : "🛍️"}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.igMuted }}>Seção não simulada</span>
                  <button onClick={() => setTab("feed")} style={{ padding: "8px 20px", borderRadius: 8, background: C.igBlue, border: "none", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>← Voltar ao Feed</button>
                </div>
              )}

              {/* Nav bar */}
              <IgNavBar tab={tab} setTab={setTab} />

              {/* Painel de estratégia */}
              {showStrategy && <StrategyPanel onClose={() => setShowStrategy(false)} />}
            </div>

            {/* Home indicator */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <div style={{ width: 130, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
            </div>
          </div>

          {/* Legenda */}
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { icon: "🏠", label: "Feed" },
              { icon: "🔍", label: "Por Fase" },
              { icon: "👤", label: "Perfil" },
            ].map(n => (
              <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>{n.icon}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.igMuted }}>{n.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Painel de estatísticas à direita */}
        <div style={{ width: 250, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: "16px", background: "#fff", borderRadius: 16, border: "1px solid #DBDBDB" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.igText, marginBottom: 14 }}>📊 Engajamento Projetado</div>
            {[
              { label: "Post mais forte", value: "Post D+1 (Recap)", detail: "Números reais + emoção" },
              { label: "Melhor formato", value: "Carrossel", detail: "3–5x mais alcance" },
              { label: "Pico de curtidas", value: "Pós-feira", detail: "1.247 curtidas simuladas" },
              { label: "Meta seguidores", value: "+50 na série", detail: "Via engajamento orgânico" },
            ].map((s) => (
              <div key={s.label} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #EFEFEF" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.igMuted, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: C.igText }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.igMuted }}>{s.detail}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: "16px", background: "#fff", borderRadius: 16, border: "1px solid #DBDBDB" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.igText, marginBottom: 12 }}>💡 Dicas Táticas</div>
            {[
              { tip: "Responda TODOS os comentários nas primeiras 2h", icon: "⚡" },
              { tip: "Link da calculadora no 1º comentário (não no corpo)", icon: "🔗" },
              { tip: "Stories diários durante a feira — energia em tempo real", icon: "🔴" },
              { tip: "Peça permissão antes de repostar depoimentos", icon: "✋" },
              { tip: "Provoque debate — quem discordar, pergunte qual sistema usa", icon: "🎯" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{t.icon}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.igMuted, lineHeight: 1.45 }}>{t.tip}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: "14px 16px", borderRadius: 16, background: C.navy }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: C.orange, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Horários Ideais</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
              <strong style={{ color: "#fff" }}>Instagram:</strong><br />
              12h–14h ou 18h–21h<br />
              <br />
              <strong style={{ color: "#fff" }}>LinkedIn:</strong><br />
              7h–9h ou 17h–19h<br />
            </div>
          </div>
        </div>
      </div>
      <SharedFooter />
    </div>
  );
}
