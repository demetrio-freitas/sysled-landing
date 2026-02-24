import { useState } from "react";
import SharedFooter from "./SharedFooter";

// ─── Paleta ───────────────────────────────────────────────────────────────────
const C = {
  // SYSLED brand
  navy:        "#0A1628",
  navyMid:     "#0F2040",
  orange:      "#E8712B",
  blueLight:   "#4A9FE5",
  green:       "#22C55E",
  red:         "#EF4444",
  muted:       "#8899AA",
  // LinkedIn
  liBg:        "#F4F2EE",
  liBlue:      "#0A66C2",
  liText:      "#191919",
  liSecondary: "#666666",
  liBorder:    "#E0E0E0",
  liCard:      "#FFFFFF",
  liGreen:     "#01754F",
};

const font = "'DM Sans', sans-serif";
const fontTitle = "'Anybody', sans-serif";

// ─── Perfil ───────────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Demétrio Freitas",
  headline: "Fundador & CEO @ SYSLED | Industrial OS · O ERP morreu. Eu construí o que vem depois.",
  location: "Fortaleza, Ceará, Brasil",
  connections: "847",
  followers: "1.234",
  about: "10 anos na indústria brasileira. 5 ERPs. Nenhum funcionou.\n\nEntão eu construí algo diferente: um Sistema Operacional Industrial.\n\nNão é ERP. É o que vem depois do ERP.\n\n🏭 SYSLED conecta chão de fábrica, estoque, vendas e financeiro — tudo no celular, sem implantação, com IA que customiza em dias.\n\n🔥 Se você é dono de indústria e está cansado de sistema que não funciona, vamos conversar.",
};

// ─── Posts ─────────────────────────────────────────────────────────────────────
const POSTS = [
  {
    id: 1,
    phase: "antes",
    date: "24 fev · 2026",
    text: "O ERP morreu.\n\nSim, eu sei que é provocação. Mas me dá 2 minutos.\n\nNos últimos 10 anos, trabalhei com 5 ERPs diferentes em indústrias brasileiras. Todos prometeram a mesma coisa: integração, eficiência, controle.\n\nNenhum entregou.\n\nO que eu vi foi:\n→ Produção na planilha porque o sistema não dá conta\n→ Customização? R$ 50 mil e 3 meses\n→ Interface dos anos 2000\n→ Dados presos no fornecedor\n→ Medo de trocar porque \"vai parar tudo\"\n\nEntão eu construí algo diferente. Não um ERP. Um Sistema Operacional Industrial.\n\n👉 Se marcou 2+ desses, o ERP morreu pra você também.\n\n#ERPMorreu #SYSLED #IndustrialOS #Indústria40 #TransformaçãoDigital",
    hasImage: true,
    imageBg: C.navy,
    imageType: "banner",
    imageTitle: "5 sinais de que seu ERP já morreu",
    imageSubtitle: "SYSLED · Industrial OS",
    reactions: { like: 89, insightful: 67, love: 23 },
    totalReactions: 179,
    comments: 34,
    reposts: 18,
    commentsList: [
      { name: "José Mendes", headline: "Diretor de Operações · Metalúrgica NE", text: "Marquei todos os 5. Isso é real demais.", time: "2h" },
      { name: "Ana Castro", headline: "Gerente de TI · Indústria Têxtil", text: "O ponto 3 me pegou. Interface dos anos 2000 é EXATAMENTE o que a gente vive.", time: "3h" },
      { name: "Demétrio Freitas", headline: "Fundador & CEO @ SYSLED", text: "@Ana Castro qual sistema vocês usam hoje? Quero entender o cenário.", time: "3h", isAuthor: true },
    ],
  },
  {
    id: 2,
    phase: "antes",
    date: "26 fev · 2026",
    text: "10 anos. 5 sistemas. 0 resolveram.\n\nMinha história na indústria brasileira:\n\n📊 10 anos trabalhando com gestão industrial\n💸 5 ERPs diferentes — SAP, TOTVS, Bling, Tiny, e mais um que nem lembro o nome\n❌ 0 resolveram de verdade\n\nO problema não era a equipe. Não era o processo. Era o sistema.\n\nTodo ERP foi construído na mesma lógica dos anos 90: módulos pesados, implantação demorada, customização cara, mobile como \"extra\".\n\nA indústria mudou. O sistema não.\n\nEntão eu decidi construir o meu. Não um ERP. Algo completamente diferente.\n\nUm Sistema Operacional Industrial — mobile-first, sem implantação, com IA que entrega customização em dias.\n\nEsse é o SYSLED.\n\n#ERPMorreu #SYSLED #Empreendedorismo #Startup #IndústriaBrasileira",
    hasImage: true,
    imageBg: C.navy,
    imageType: "stats",
    reactions: { like: 134, insightful: 89, celebrate: 45 },
    totalReactions: 268,
    comments: 28,
    reposts: 23,
    commentsList: [
      { name: "Marcelo Ribeiro", headline: "CEO · Indústrias Ribeiro", text: "Cara, isso é EXATAMENTE o que eu vivo. 12 anos de indústria e já testei 4 ERPs.", time: "1h" },
      { name: "Pedro Almeida", headline: "Diretor Industrial · Grupo Nordeste", text: "Quando tem demo? Quero ver esse negócio ao vivo.", time: "2h" },
      { name: "Demétrio Freitas", headline: "Fundador & CEO @ SYSLED", text: "@Pedro Almeida Smart Factory, dias 9 e 10 de março em Fortaleza! Vem no stand que faço demo ao vivo. 👊", time: "2h", isAuthor: true },
    ],
  },
  {
    id: 3,
    phase: "antes",
    date: "1 mar · 2026",
    text: "ERP vs. Industrial OS — qual a diferença real?\n\nNão é só interface. É um conceito completamente diferente.\n\n📋 Implantação\n  ❌ ERP: 3–12 meses\n  ✅ SYSLED: Zero setup — cria conta em 2 minutos\n\n🔧 Customização\n  ❌ ERP: R$ 50K + 3 meses de projeto\n  ✅ SYSLED: IA entrega em dias\n\n📱 Mobile\n  ❌ ERP: \"App\" que é o desktop espremido\n  ✅ SYSLED: Nasceu mobile-first\n\n🔐 Seus Dados\n  ❌ ERP: Presos no fornecedor\n  ✅ SYSLED: 100% seus, sempre\n\nQuer ver ao vivo? Smart Factory, 9–10 de março, Fortaleza.\n\n#ERPMorreu #SYSLED #IndustrialOS #GestãoIndustrial #Indústria40",
    hasImage: true,
    imageBg: "#0D1E35",
    imageType: "comparativo",
    reactions: { like: 67, insightful: 112, love: 15 },
    totalReactions: 194,
    comments: 22,
    reposts: 31,
    commentsList: [
      { name: "Rodrigo Farias", headline: "Gerente de Produção · FabNordeste", text: "Esse comparativo deveria ser obrigatório em toda feira industrial 🔥", time: "45min" },
      { name: "Carla Mendonça", headline: "COO · Operações Industriais CE", text: "Esse 'zero setup' é real mesmo? Como funciona na prática?", time: "1h" },
      { name: "Demétrio Freitas", headline: "Fundador & CEO @ SYSLED", text: "@Carla Mendonça Real! Cria conta em 2 min, sem instalação. Passa na Smart Factory que você vê ao vivo 👊", time: "1h", isAuthor: true },
    ],
  },
  {
    id: 4,
    phase: "antes",
    date: "4 mar · 2026",
    text: "Sua fábrica perde dinheiro todo mês.\nVocê só não sabe quanto.\n\nNúmeros reais de indústrias que conversei nos últimos 6 meses:\n\n⏱️ 15h por semana gastas em planilhas — quase 2 dias úteis\n📉 8–12 erros de estoque por mês — pedidos errados, material parado\n💸 R$ 25K em perdas invisíveis — retrabalho, atrasos, oportunidades\n\nE o pior: a maioria nem sabe que está perdendo.\n\nCriamos uma calculadora gratuita. 2 minutos. Sem cadastro.\nDescubra o número real.\n\nLink no primeiro comentário.\n\n#ERPMorreu #Produtividade #SYSLED #Indústria40 #GestãoIndustrial",
    hasImage: true,
    imageBg: "#0D1E35",
    imageType: "perdas",
    reactions: { like: 98, insightful: 145, love: 12 },
    totalReactions: 255,
    comments: 41,
    reposts: 27,
    commentsList: [
      { name: "Luiz Gerente", headline: "Gerente de Fábrica · Metalfab", text: "15h semanais em planilhas... é exatamente o que acontece aqui. Triste mas real.", time: "30min" },
      { name: "Marcos Oliveira", headline: "CEO · Indústria Oliveira", text: "Fiz a calculadora. O número que saiu me assustou. 😅", time: "1h" },
      { name: "Demétrio Freitas", headline: "Fundador & CEO @ SYSLED", text: "@Marcos Oliveira e aí, quer resolver? Me chama no DM que a gente conversa! 😄", time: "1h", isAuthor: true },
    ],
  },
  {
    id: 5,
    phase: "antes",
    date: "7 mar · 2026",
    text: "📢 O ERP morreu — e a gente vai provar ao vivo.\n\nSmart Factory 2026\n📅 9 e 10 de março\n📍 Fortaleza, CE\n\nO que você vai ver no nosso stand:\n\n🎮 Demo ao vivo do SYSLED — cria conta na hora, no seu celular\n🗣️ Conversa direta com quem construiu\n📊 Calculadora de desperdício industrial\n🤝 Networking com fabricantes de todo o Nordeste\n\nNão é palestra. Não é folder.\nÉ experiência real. Em 2 minutos você entende por que o ERP morreu.\n\nMarca nos comentários quem precisa ver isso.\n\nTe vejo lá. 🎯\n\n#SmartFactory #ERPMorreu #SYSLED #Fortaleza #Indústria40",
    hasImage: true,
    imageBg: C.navy,
    imageType: "evento",
    reactions: { like: 156, celebrate: 89, love: 34 },
    totalReactions: 279,
    comments: 52,
    reposts: 41,
    commentsList: [
      { name: "Alana Tech", headline: "Head de Inovação · TechNE", text: "Já marquei na agenda! Vou com o time inteiro. 🔥", time: "20min" },
      { name: "Carlos Fabricante", headline: "Sócio-Diretor · FábricaCE", text: "@João Diretor passa lá com a gente!", time: "1h" },
      { name: "Smart Factory CE", headline: "Feira de Tecnologia Industrial", text: "Esperamos vocês! 🏭 Promete ser uma edição incrível.", time: "2h" },
    ],
  },
  {
    id: 6,
    phase: "durante",
    date: "9 mar · 2026",
    text: "Chegou o dia. 🏭\n\nPrimeiro dia de Smart Factory. Stand montado. Time pronto.\n\nO ERP morreu — e a gente está aqui pra mostrar o que vem depois.\n\nSe você é de Fortaleza e trabalha com indústria — vem agora.\nSe não é — acompanha aqui que vou postando em tempo real.\n\nVou estar no stand o dia inteiro.\nDemo ao vivo. Conta grátis na hora.\n\nBora. 🔥\n\n#SmartFactory #ERPMorreu #SYSLED #Fortaleza #AoVivo",
    hasImage: true,
    imageBg: "#101820",
    imageType: "ao-vivo",
    reactions: { like: 178, celebrate: 112, love: 56 },
    totalReactions: 346,
    comments: 38,
    reposts: 19,
    commentsList: [
      { name: "Paulo Industriário", headline: "Diretor de Operações · IndNE", text: "Tô chegando!!! 🔥🔥🔥", time: "15min" },
      { name: "Bruna Santos", headline: "Founder · StartupNE", text: "Não estou em Fortaleza mas tô na torcida!! 💪", time: "30min" },
      { name: "Demétrio Freitas", headline: "Fundador & CEO @ SYSLED", text: "@Paulo Industriário te espero lá! Chega cedo que as demos são ao vivo 👊", time: "30min", isAuthor: true },
    ],
  },
  {
    id: 7,
    phase: "durante",
    date: "9 mar · 2026",
    text: "\"Em 10 anos, ninguém me mostrou isso.\" 🤯\n\nFrase de um fabricante hoje na Smart Factory.\n\nEle chegou cético. Ouvindo de longe. Braços cruzados.\n\n2 minutos depois? Conta criada. No celular dele. Já vendo o próprio estoque.\n\nNão foi pitch. Não foi PowerPoint.\nFoi experiência real, na mão dele.\n\nÉ por isso que eu construí isso. Por gente como ele.\n\nAmanhã tem mais. Se você é de Fortaleza — vem.\n\n#SmartFactory #ERPMorreu #SYSLED #IndustrialOS #Depoimento",
    hasImage: true,
    imageBg: "#0D1E35",
    imageType: "depoimento",
    reactions: { like: 234, insightful: 156, love: 89 },
    totalReactions: 479,
    comments: 67,
    reposts: 45,
    commentsList: [
      { name: "Vanessa Moura", headline: "CFO · Grupo Industrial Norte", text: "Isso é muito poderoso. A experiência real vende mais que qualquer pitch. Parabéns 👏", time: "1h" },
      { name: "Roberto Oliveira", headline: "CEO · Indústrias Nacional", text: "Quando abre pra todo o Brasil?? Quero testar.", time: "2h" },
      { name: "Demétrio Freitas", headline: "Fundador & CEO @ SYSLED", text: "@Roberto Oliveira JÁ está aberto! Cria conta agora mesmo — link no meu perfil 😄", time: "2h", isAuthor: true },
    ],
  },
  {
    id: 8,
    phase: "depois",
    date: "11 mar · 2026",
    text: "2 dias de Smart Factory. Aqui está o que aconteceu. 🏁\n\n📊 [X] fabricantes passaram pelo stand\n✅ [Y] contas criadas ao vivo — no celular, sem instalar nada\n🎯 [Z] demos personalizadas\n⚡ 0 implantações necessárias\n\nA reação mais comum?\n\"Por que isso não existe há 10 anos?\"\n\n\"O ERP morreu\" era provocação. Era.\nMas também era verdade.\n\nE agora eu tenho provas.\n\nA feira acabou. Mas o Sistema Operacional da sua fábrica está começando.\n\nLink no primeiro comentário.\n\n#SmartFactory #ERPMorreu #SYSLED #Recap #IndústriaBrasileira",
    hasImage: true,
    imageBg: C.navy,
    imageType: "resultados",
    reactions: { like: 312, insightful: 189, celebrate: 134 },
    totalReactions: 635,
    comments: 78,
    reposts: 56,
    commentsList: [
      { name: "Ana Startup", headline: "Investidora Anjo · Seed Capital NE", text: "Que números incríveis! Parabéns pela execução. 🎉", time: "30min" },
      { name: "Fábio Diretor", headline: "Diretor Industrial · Metalfab MG", text: "Não pude ir... quando tem próximo evento? Quero levar meu time.", time: "1h" },
      { name: "Investidor Seed", headline: "Partner · Venture Capital NE", text: "Impressionante. DM enviado. 📩", time: "2h" },
    ],
  },
  {
    id: 9,
    phase: "depois",
    date: "17 mar · 2026",
    text: "3 coisas que aprendi mostrando o SYSLED pra dezenas de fabricantes em 2 dias. 🧠\n\n01 — O fabricante não tem medo de tecnologia.\nTem medo de implantação.\n\nTodo mundo que parou no stand disse algo como: \"já sofri demais com sistema\". O problema não é a tecnologia — é o processo de adoção. Quando mostrávamos que não tem implantação, a postura mudava na hora.\n\n02 — Mobile não é diferencial. É obrigação.\n\nCada fabricante que viu o SYSLED no celular perguntou: \"por que meu ERP não faz isso?\". A resposta é simples: porque foi construído nos anos 90.\n\n03 — Customização rápida é o que fecha negócio.\n\nDe \"interessante\" pra \"quando começa?\" em segundos. Quando mostramos que a IA customiza em dias (não meses), a conversa muda de tom completamente.\n\n---\n\n\"O ERP morreu\" não é só uma frase de efeito.\n\nÉ o que eu vi nos olhos de dezenas de fabricantes frustrados.\n\nA jornada está só começando.\n\n#ERPMorreu #SYSLED #LearningsPost #Empreendedorismo #IndústriaBrasileira",
    hasImage: false,
    reactions: { like: 198, insightful: 234, love: 67 },
    totalReactions: 499,
    comments: 45,
    reposts: 38,
    commentsList: [
      { name: "Giovana Marketing", headline: "Head de Marketing · TechBR", text: "Ponto 01 é TUDO. Nunca tinha pensado por esse ângulo — o medo não é da tecnologia.", time: "1h" },
      { name: "Henrique CTO", headline: "CTO · Indústria 4.0 Labs", text: "Mobile como obrigação, não diferencial. Concordo 100%.", time: "2h" },
      { name: "Demétrio Freitas", headline: "Fundador & CEO @ SYSLED", text: "@Henrique CTO Exato! E o SYSLED já nasceu assim. 100% mobile-first 📱", time: "2h", isAuthor: true },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatReactions(total) {
  return total >= 1000 ? `${(total / 1000).toFixed(1).replace(".0", "")} mil` : total.toLocaleString("pt-BR");
}

function ReactionIcons({ reactions }) {
  const icons = [];
  if (reactions.like) icons.push({ emoji: "👍", color: "#0A66C2" });
  if (reactions.insightful) icons.push({ emoji: "💡", color: "#B7A300" });
  if (reactions.love) icons.push({ emoji: "❤️", color: "#DF704D" });
  if (reactions.celebrate) icons.push({ emoji: "👏", color: "#6DAE4F" });
  return (
    <div style={{ display: "flex", marginRight: 4 }}>
      {icons.slice(0, 3).map((ic, i) => (
        <span key={i} style={{
          width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, border: "2px solid #fff", marginLeft: i > 0 ? -4 : 0, position: "relative", zIndex: 3 - i,
          background: "#f0f0f0",
        }}>{ic.emoji}</span>
      ))}
    </div>
  );
}

// ─── Post Image Cards ─────────────────────────────────────────────────────────
function PostImage({ post }) {
  if (!post.hasImage) return null;

  const type = post.imageType;

  if (type === "banner") {
    return (
      <div style={{ background: C.navy, padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 14, minHeight: 280 }}>
        <span style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 12, color: C.orange, letterSpacing: "0.15em", textTransform: "uppercase" }}>SYSLED · Industrial OS</span>
        <h2 style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 32, color: "#fff", lineHeight: 1.05, textAlign: "center", letterSpacing: "-0.02em", margin: 0 }}>
          5 sinais de que seu ERP já <span style={{ color: C.orange, textDecoration: "line-through", textDecorationColor: C.red }}>morreu</span>
        </h2>
        <span style={{ fontFamily: font, fontSize: 14, color: C.muted }}>Leia o post completo ↓</span>
      </div>
    );
  }

  if (type === "stats") {
    return (
      <div style={{ background: C.navy, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 18, minHeight: 260 }}>
        <div style={{ fontFamily: font, fontSize: 12, color: C.orange, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Minha história</div>
        {[
          { num: "10", label: "anos na indústria", color: "#fff" },
          { num: "5", label: "ERPs testados", color: "#fff" },
          { num: "0", label: "resolveram", color: C.red },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 48, color: item.color, lineHeight: 1 }}>{item.num}</span>
            <span style={{ fontFamily: font, fontSize: 18, color: C.muted }}>{item.label}</span>
          </div>
        ))}
        <p style={{ fontFamily: font, fontSize: 15, color: "#fff", fontWeight: 600, lineHeight: 1.5, margin: 0 }}>Então eu construí o meu. <span style={{ color: C.orange }}>Não um ERP. Algo diferente.</span></p>
      </div>
    );
  }

  if (type === "comparativo") {
    return (
      <div style={{ background: "#0D1E35", padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14, minHeight: 260 }}>
        <span style={{ fontFamily: font, fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>ERP vs. Industrial OS</span>
        <h2 style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 24, color: "#fff", lineHeight: 1.1, margin: 0 }}>Qual a diferença real?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Implantação", erp: "3–12 meses", sys: "Zero setup" },
            { label: "Customização", erp: "R$ 50K + meses", sys: "IA em dias" },
            { label: "Mobile", erp: "Desktop espremido", sys: "Mobile-first" },
            { label: "Dados", erp: "Do fornecedor", sys: "100% seus" },
          ].map((row) => (
            <div key={row.label} style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: font, fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{row.label}</div>
              <div style={{ fontFamily: font, fontSize: 12, color: C.red, marginBottom: 3 }}>❌ {row.erp}</div>
              <div style={{ fontFamily: font, fontSize: 12, color: C.green }}>✅ {row.sys}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "perdas") {
    return (
      <div style={{ background: "#0D1E35", padding: "32px", display: "flex", flexDirection: "column", gap: 16, minHeight: 240 }}>
        <div style={{ fontFamily: font, fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Sua fábrica perde dinheiro.</div>
        {[
          { num: "15h", label: "/semana em planilhas", color: "#fff" },
          { num: "8–12", label: "erros de estoque/mês", color: C.red },
          { num: "R$ 25K", label: "em perdas invisíveis", color: C.red },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 32, color: item.color, lineHeight: 1 }}>{item.num}</span>
            <span style={{ fontFamily: font, fontSize: 14, color: C.muted }}>{item.label}</span>
          </div>
        ))}
        <p style={{ fontFamily: font, fontSize: 14, color: "#fff", fontWeight: 600, margin: 0 }}>Descubra o número real: <span style={{ color: C.orange }}>calculadora gratuita →</span></p>
      </div>
    );
  }

  if (type === "evento") {
    return (
      <div style={{ background: C.navy, padding: "32px", display: "flex", flexDirection: "column", gap: 16, minHeight: 280 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(232,113,43,0.15)", border: "1px solid rgba(232,113,43,0.3)" }}>
            <span style={{ fontFamily: font, fontSize: 11, color: C.orange, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Evento Presencial</span>
          </div>
        </div>
        <h2 style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 28, color: "#fff", lineHeight: 1.05, margin: 0 }}>O ERP morreu — e a gente vai provar ao vivo.</h2>
        {[
          { icon: "📅", text: "9 e 10 de março de 2026" },
          { icon: "📍", text: "Smart Factory · Fortaleza, CE" },
          { icon: "🎮", text: "Demo ao vivo + conta grátis" },
          { icon: "🗣️", text: "Conversa direta com o fundador" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span style={{ fontFamily: font, fontSize: 14, color: "#fff", fontWeight: 500 }}>{item.text}</span>
          </div>
        ))}
        <div style={{ padding: "12px 20px", borderRadius: 10, background: C.orange, textAlign: "center", marginTop: 4 }}>
          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 800, color: "#fff" }}>Marca quem precisa ver isso ↓</span>
        </div>
      </div>
    );
  }

  if (type === "ao-vivo") {
    return (
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a2a45 50%, #0e1e35 100%)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 260, position: "relative" }}>
        <div style={{ position: "absolute", top: 16, left: 16, padding: "6px 12px", borderRadius: 20, background: C.red, display: "inline-flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
          <span style={{ fontFamily: font, fontSize: 11, fontWeight: 700, color: "#fff" }}>AO VIVO</span>
        </div>
        <div style={{ position: "absolute", top: 56, left: 20, right: 20, padding: "14px 18px", borderRadius: 14, background: "rgba(232,113,43,0.12)", border: "2px solid rgba(232,113,43,0.4)", textAlign: "center" }}>
          <div style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 24, color: "#fff" }}>O ERP <span style={{ color: C.orange, textDecoration: "line-through", textDecorationColor: C.red }}>morreu.</span></div>
          <div style={{ fontFamily: font, fontSize: 12, color: C.muted, marginTop: 4 }}>SYSLED | Industrial OS</div>
        </div>
        <div style={{ marginTop: 120, padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
          <p style={{ fontFamily: font, fontSize: 14, color: "#fff", fontWeight: 600, margin: 0 }}>Bom dia! Começou. 🏭</p>
          <p style={{ fontFamily: font, fontSize: 13, color: C.muted, margin: "4px 0 0" }}>Primeiro dia de Smart Factory — vem agora.</p>
        </div>
      </div>
    );
  }

  if (type === "depoimento") {
    return (
      <div style={{ background: "#0D1E35", padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20, minHeight: 240, textAlign: "center" }}>
        <div style={{ fontSize: 36 }}>🤯</div>
        <div style={{ padding: "20px 24px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,113,43,0.3)", borderLeft: `4px solid ${C.orange}` }}>
          <p style={{ fontFamily: font, fontSize: 20, color: "#fff", fontWeight: 600, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>"Em 10 anos, ninguém me mostrou isso."</p>
        </div>
        <p style={{ fontFamily: font, fontSize: 13, color: C.muted, margin: 0 }}>— Fabricante na Smart Factory 2026</p>
      </div>
    );
  }

  if (type === "resultados") {
    return (
      <div style={{ background: C.navy, padding: "32px", display: "flex", flexDirection: "column", gap: 16, minHeight: 260 }}>
        <div style={{ fontFamily: font, fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>2 dias de Smart Factory</div>
        <h2 style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 24, color: "#fff", lineHeight: 1.1, margin: 0 }}>O ERP morreu era provocação. <span style={{ color: C.orange }}>Mas também era verdade.</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { num: "[X]", label: "fabricantes no stand", color: C.blueLight },
            { num: "[Y]", label: "contas criadas ao vivo", color: C.green },
            { num: "[Z]", label: "demos personalizadas", color: C.orange },
            { num: "0", label: "implantações necessárias", color: C.green },
          ].map((item, i) => (
            <div key={i} style={{ padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}22`, textAlign: "center" }}>
              <div style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 22, color: item.color }}>{item.num}</div>
              <div style={{ fontFamily: font, fontSize: 11, color: C.muted, marginTop: 4, lineHeight: 1.3 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// ─── LinkedIn Post Card ───────────────────────────────────────────────────────
function LinkedInPostCard({ post }) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const textLimit = 200;
  const needsTruncation = post.text.length > textLimit;

  const phaseBadge = {
    antes: { label: "Antes da Feira", color: C.blueLight, bg: "rgba(74,159,229,0.1)" },
    durante: { label: "🔴 Ao Vivo", color: C.red, bg: "rgba(239,68,68,0.1)" },
    depois: { label: "Pós-Feira", color: C.green, bg: "rgba(34,197,94,0.1)" },
  }[post.phase];

  return (
    <div style={{
      background: C.liCard, borderRadius: 8, border: `1px solid ${C.liBorder}`,
      marginBottom: 8, overflow: "hidden",
    }}>
      {/* Author Header */}
      <div style={{ padding: "12px 16px", display: "flex", gap: 10 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 18, color: C.orange }}>D</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: C.liText }}>Demétrio Freitas</span>
            <span style={{ fontFamily: font, fontSize: 12, color: C.liBlue, fontWeight: 600 }}>• 1º</span>
            <span style={{ padding: "2px 8px", borderRadius: 12, background: phaseBadge.bg, fontFamily: font, fontSize: 10, fontWeight: 700, color: phaseBadge.color }}>
              {phaseBadge.label}
            </span>
          </div>
          <div style={{ fontFamily: font, fontSize: 12, color: C.liSecondary, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Fundador & CEO @ SYSLED | Industrial OS
          </div>
          <div style={{ fontFamily: font, fontSize: 12, color: C.liSecondary, display: "flex", alignItems: "center", gap: 4 }}>
            {post.date} • <span style={{ fontSize: 10 }}>🌐</span>
          </div>
        </div>
        <button style={{ background: "none", border: "none", fontSize: 20, color: C.liSecondary, cursor: "pointer", alignSelf: "flex-start", padding: "4px 8px" }}>···</button>
      </div>

      {/* Post Text */}
      <div style={{ padding: "0 16px 12px" }}>
        <div style={{ fontFamily: font, fontSize: 14, color: C.liText, lineHeight: 1.55, whiteSpace: "pre-line" }}>
          {expanded || !needsTruncation ? (
            post.text
          ) : (
            <>
              {post.text.slice(0, textLimit)}...{" "}
              <button onClick={() => setExpanded(true)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: font, fontSize: 14, color: C.liSecondary, fontWeight: 600, padding: 0 }}>
                ver mais
              </button>
            </>
          )}
        </div>
      </div>

      {/* Image */}
      <PostImage post={post} />

      {/* Reactions & Counts */}
      <div style={{ padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <ReactionIcons reactions={post.reactions} />
          <span style={{ fontFamily: font, fontSize: 12, color: C.liSecondary }}>{formatReactions(post.totalReactions)}</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setShowComments(c => !c)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: font, fontSize: 12, color: C.liSecondary }}>
            {post.comments} comentários
          </button>
          <span style={{ fontFamily: font, fontSize: 12, color: C.liSecondary }}>{post.reposts} republicações</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: C.liBorder, margin: "0 16px" }} />

      {/* Action Buttons */}
      <div style={{ display: "flex", padding: "4px 8px" }}>
        {[
          { icon: liked ? "👍" : "👍🏻", label: liked ? "Gostei" : "Gostei", active: liked, action: () => setLiked(l => !l) },
          { icon: "💬", label: "Comentar", action: () => setShowComments(c => !c) },
          { icon: "🔄", label: "Republicar" },
          { icon: "📨", label: "Enviar" },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "10px 4px", background: "none", border: "none", cursor: "pointer",
              fontFamily: font, fontSize: 13, fontWeight: btn.active ? 700 : 600,
              color: btn.active ? C.liBlue : C.liSecondary,
              borderRadius: 4, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#E8E8E8"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontSize: 16 }}>{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Comments */}
      {showComments && (
        <div style={{ padding: "8px 16px 12px", borderTop: `1px solid ${C.liBorder}` }}>
          {post.commentsList.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                background: c.isAuthor ? C.navy : "#E8E8E8",
              }}>
                <span style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 12, color: c.isAuthor ? C.orange : C.liSecondary }}>
                  {c.name.charAt(0)}
                </span>
              </div>
              <div style={{ flex: 1, background: "#F2F2F2", borderRadius: "0 8px 8px 8px", padding: "8px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                  <div>
                    <span style={{ fontFamily: font, fontWeight: 700, fontSize: 12, color: C.liText }}>{c.name}</span>
                    {c.isAuthor && <span style={{ fontFamily: font, fontSize: 10, color: C.liBlue, marginLeft: 6, fontWeight: 700 }}>Autor</span>}
                    <div style={{ fontFamily: font, fontSize: 11, color: C.liSecondary, lineHeight: 1.3 }}>{c.headline}</div>
                  </div>
                  <span style={{ fontFamily: font, fontSize: 11, color: C.liSecondary, flexShrink: 0 }}>{c.time}</span>
                </div>
                <p style={{ fontFamily: font, fontSize: 13, color: C.liText, lineHeight: 1.45, margin: "4px 0 0" }}>{c.text}</p>
              </div>
            </div>
          ))}
          {/* Comment input */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 10, color: C.orange }}>D</span>
            </div>
            <div style={{ flex: 1, padding: "8px 12px", borderRadius: 20, border: `1px solid ${C.liBorder}`, background: "#F2F2F2" }}>
              <span style={{ fontFamily: font, fontSize: 13, color: "#999" }}>Adicionar comentário...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Strategy Panel (Modal) ──────────────────────────────────────────────────
function StrategyPanel({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }} onClick={onClose}>
      <div style={{
        width: "100%", maxWidth: 640, maxHeight: "90vh", background: C.navy, borderRadius: 24, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "20px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <h2 style={{ fontFamily: fontTitle, fontWeight: 800, fontSize: 22, color: "#fff", margin: 0 }}>Estratégia LinkedIn</h2>
            <p style={{ fontFamily: font, fontSize: 13, color: C.muted, margin: "4px 0 0" }}>Calendário editorial e táticas por fase</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <div style={{ overflowY: "auto", maxHeight: "calc(90vh - 80px)", padding: "20px 24px 40px" }}>
          {[
            {
              phase: "Antes · 24 fev – 8 mar", color: C.blueLight,
              items: [
                "Post âncora: 'O ERP morreu' — responda TODOS os comentários nas primeiras 2h",
                "LinkedIn favorece texto puro com quebras de linha — evite links no corpo do post",
                "Storytelling pessoal gera 3–5x mais engajamento que posts institucionais",
                "Use dados concretos (números, percentuais) — LinkedIn valoriza autoridade",
                "Link da calculadora como 1º comentário (não no corpo — penalização do algoritmo)",
                "Poste entre 7h–9h ou 17h–19h para máximo alcance",
              ],
            },
            {
              phase: "Durante · 9–10 mar", color: C.red,
              items: [
                "Poste em tempo real — a energia do momento é insubstituível",
                "Fotos do stand e da interação funcionam melhor que gráficos perfeitos",
                "Capture depoimentos espontâneos — aspas reais viralizam no LinkedIn",
                "Use enquetes: 'Você usa ERP? Funciona de verdade?'",
                "Marque pessoas que visitaram o stand (com permissão) para alcance via rede deles",
              ],
            },
            {
              phase: "Depois · 11–17 mar", color: C.green,
              items: [
                "Post D+1 com números reais — transparência gera confiança",
                "Depoimentos com nome e cargo performam muito bem no LinkedIn",
                "Post de 'lições aprendidas' fecha o arco narrativo e abre a próxima fase",
                "Agradeça publicamente quem visitou o stand — cria goodwill e engajamento",
                "Converta engajamento em DMs: quem comentou é lead quente",
              ],
            },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 20, padding: "16px", borderRadius: 14, background: `${s.color}0A`, border: `1px solid ${s.color}33` }}>
              <div style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: s.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>{s.phase}</div>
              {s.items.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                  <span style={{ color: s.color, flexShrink: 0, marginTop: 1 }}>•</span>
                  <span style={{ fontFamily: font, fontSize: 13, color: "#fff", lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}

          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(232,113,43,0.08)", border: `1px solid ${C.orange}33` }}>
            <div style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: C.orange, marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>Métricas-Alvo LinkedIn</div>
            {[
              ["Impressões/post", ">2.000"],
              ["Engajamento", ">5%"],
              ["Cliques no perfil", ">80 por post"],
              ["DMs recebidas", ">5/semana"],
              ["Conexões novas", ">100 na série"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontFamily: font, fontSize: 13, color: C.muted }}>{k}</span>
                <span style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: "#fff" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function SYSLEDLinkedInSim() {
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [showStrategy, setShowStrategy] = useState(false);

  const phases = [
    { id: "all", label: "Todos", color: C.liBlue },
    { id: "antes", label: "Antes da Feira", color: C.blueLight },
    { id: "durante", label: "Durante", color: C.red },
    { id: "depois", label: "Pós-Feira", color: C.green },
  ];

  const filteredPosts = phaseFilter === "all" ? POSTS : POSTS.filter(p => p.phase === phaseFilter);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, fontFamily: font, display: "flex", flexDirection: "column" }}>

      {/* Page Header */}
      <div style={{ padding: "48px 24px 8px", textAlign: "center" }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "baseline", gap: 8, textDecoration: "none" }}>
          <span style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 24, color: "#fff" }}>SYSLED</span>
          <span style={{ fontFamily: font, fontSize: 12, color: C.blueLight, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Industrial OS</span>
        </a>
        <h1 style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 32, color: "#fff", margin: "16px 0 8px", letterSpacing: "-0.02em" }}>
          Simulação <span style={{ color: "#0A66C2" }}>LinkedIn</span>
        </h1>
        <p style={{ fontFamily: font, fontSize: 15, color: C.muted, maxWidth: 500, margin: "0 auto", lineHeight: 1.5 }}>
          Série "O ERP Morreu" — Calendário editorial para Smart Factory 2026
        </p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 24, padding: "32px 24px 48px", maxWidth: 1100, margin: "0 auto", width: "100%", alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* Left Sidebar */}
        <div style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* LinkedIn Profile Card */}
          <div style={{ background: C.liCard, borderRadius: 8, border: `1px solid ${C.liBorder}`, overflow: "hidden" }}>
            {/* Cover */}
            <div style={{ height: 60, background: `linear-gradient(135deg, ${C.navy} 0%, #1a2a45 100%)`, position: "relative" }}>
              <div style={{ position: "absolute", bottom: -24, left: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.navy, border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 22, color: C.orange }}>D</span>
                </div>
              </div>
            </div>
            <div style={{ padding: "32px 16px 16px" }}>
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: 16, color: C.liText }}>Demétrio Freitas</div>
              <div style={{ fontFamily: font, fontSize: 12, color: C.liSecondary, lineHeight: 1.4, marginTop: 4 }}>{PROFILE.headline}</div>
              <div style={{ fontFamily: font, fontSize: 12, color: C.liSecondary, marginTop: 6 }}>{PROFILE.location}</div>
              <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                <span style={{ fontFamily: font, fontSize: 12, color: C.liBlue, fontWeight: 600 }}>{PROFILE.connections} conexões</span>
                <span style={{ fontFamily: font, fontSize: 12, color: C.liSecondary }}>·</span>
                <span style={{ fontFamily: font, fontSize: 12, color: C.liSecondary }}>{PROFILE.followers} seguidores</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <div style={{ flex: 1, padding: "6px 12px", borderRadius: 20, background: C.liBlue, textAlign: "center" }}>
                  <span style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: "#fff" }}>Conectar</span>
                </div>
                <div style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${C.liBlue}`, textAlign: "center" }}>
                  <span style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: C.liBlue }}>Seguir</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 14 }}>Calendário Editorial</div>
            {[
              { phase: "Antes", dates: "24 fev – 8 mar", color: C.blueLight, posts: 5 },
              { phase: "Durante", dates: "9–10 mar", color: C.red, posts: 2 },
              { phase: "Depois", dates: "11–17 mar", color: C.green, posts: 2 },
            ].map((p) => (
              <div key={p.phase} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 4, height: 36, borderRadius: 2, background: p.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: "#fff" }}>{p.phase}</div>
                  <div style={{ fontFamily: font, fontSize: 11, color: C.muted }}>{p.dates} · {p.posts} posts</div>
                </div>
                <div style={{ padding: "3px 8px", borderRadius: 20, background: `${p.color}18`, fontFamily: font, fontSize: 12, fontWeight: 700, color: p.color }}>
                  {p.posts}
                </div>
              </div>
            ))}
          </div>

          {/* Strategy Button */}
          <button onClick={() => setShowStrategy(true)} style={{
            padding: "14px 16px", borderRadius: 12, background: "rgba(232,113,43,0.08)", border: "1px solid rgba(232,113,43,0.3)",
            color: "#fff", fontFamily: font, fontWeight: 700, fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s", width: "100%",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.orange; e.currentTarget.style.background = "rgba(232,113,43,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(232,113,43,0.3)"; e.currentTarget.style.background = "rgba(232,113,43,0.08)"; }}
          >
            <span style={{ fontSize: 20 }}>📋</span>
            Ver Estratégia Completa
          </button>

          {/* Hashtags */}
          <div style={{ padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: font, fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 10 }}>Hashtags da Série</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["#ERPMorreu", "#SYSLED", "#IndustrialOS", "#Indústria40", "#SmartFactory", "#TransformaçãoDigital", "#GestãoIndustrial", "#Empreendedorismo"].map(h => (
                <span key={h} style={{ padding: "4px 10px", borderRadius: 20, background: "rgba(10,102,194,0.1)", fontFamily: font, fontSize: 12, color: "#5BA3D9", fontWeight: 600, cursor: "pointer" }}>{h}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Center Feed */}
        <div style={{ flex: 1, maxWidth: 560, minWidth: 320 }}>

          {/* Phase Filter Tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {phases.map((p) => (
              <button key={p.id} onClick={() => setPhaseFilter(p.id)} style={{
                padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer",
                background: phaseFilter === p.id ? p.color : "rgba(255,255,255,0.06)",
                color: phaseFilter === p.id ? "#fff" : C.muted,
                fontFamily: font, fontWeight: 700, fontSize: 13, transition: "all 0.2s",
              }}>{p.label}</button>
            ))}
          </div>

          {/* LinkedIn Nav Bar Simulation */}
          <div style={{
            background: C.liCard, borderRadius: "8px 8px 0 0", border: `1px solid ${C.liBorder}`, borderBottom: "none",
            padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: fontTitle, fontWeight: 900, fontSize: 22, color: C.liBlue }}>in</span>
              <div style={{ padding: "6px 14px", borderRadius: 4, background: "#EEF3F8", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12 }}>🔍</span>
                <span style={{ fontFamily: font, fontSize: 12, color: C.liSecondary }}>Pesquisar</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {["🏠", "👥", "💼", "💬", "🔔"].map((icon, i) => (
                <span key={i} style={{ fontSize: 16, opacity: i === 0 ? 1 : 0.5, cursor: "pointer" }}>{icon}</span>
              ))}
            </div>
          </div>

          {/* Feed content area */}
          <div style={{ background: C.liBg, borderRadius: "0 0 8px 8px", border: `1px solid ${C.liBorder}`, borderTop: "none", padding: "8px" }}>
            {filteredPosts.map((post) => (
              <LinkedInPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Engagement Stats */}
          <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 14 }}>📊 Engajamento Projetado</div>
            {[
              { label: "Post mais forte", value: "Post D+1 (Recap)", detail: "635 reações projetadas" },
              { label: "Melhor formato", value: "Texto + Imagem", detail: "Texto longo performa no LinkedIn" },
              { label: "Pico de engajamento", value: "Depoimento ao vivo", detail: "479 reações projetadas" },
              { label: "Meta conexões", value: "+100 na série", detail: "Via engajamento orgânico" },
            ].map((s) => (
              <div key={s.label} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontFamily: font, fontSize: 11, color: C.muted, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                <div style={{ fontFamily: font, fontSize: 11, color: C.muted }}>{s.detail}</div>
              </div>
            ))}
          </div>

          {/* LinkedIn Tips */}
          <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 12 }}>💡 Dicas LinkedIn</div>
            {[
              { tip: "Texto puro performa melhor que links — link no 1º comentário", icon: "📝" },
              { tip: "Responda todo comentário nas primeiras 2h — alimenta o algoritmo", icon: "⚡" },
              { tip: "Use quebras de linha curtas — facilita leitura no mobile", icon: "📱" },
              { tip: "Marque pessoas relevantes (com permissão) para alcance orgânico", icon: "🏷️" },
              { tip: "Poste entre 7h–9h ou 17h–19h (horário decisor)", icon: "⏰" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{t.icon}</span>
                <span style={{ fontFamily: font, fontSize: 12, color: C.muted, lineHeight: 1.45 }}>{t.tip}</span>
              </div>
            ))}
          </div>

          {/* Posting Times */}
          <div style={{ padding: "16px 20px", borderRadius: 16, background: "rgba(10,102,194,0.06)", border: "1px solid rgba(10,102,194,0.15)" }}>
            <div style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: C.liBlue, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Horários Ideais LinkedIn</div>
            <div style={{ fontFamily: font, fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
              <strong style={{ color: "#fff" }}>Terça a Quinta:</strong><br />
              7h–9h (pré-trabalho)<br />
              12h–13h (almoço)<br />
              17h–19h (fim do expediente)<br />
              <br />
              <strong style={{ color: "#fff" }}>Evitar:</strong><br />
              Fins de semana e segundas<br />
            </div>
          </div>
        </div>
      </div>

      <SharedFooter />

      {showStrategy && <StrategyPanel onClose={() => setShowStrategy(false)} />}
    </div>
  );
}
