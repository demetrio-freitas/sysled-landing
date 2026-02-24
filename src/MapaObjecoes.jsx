import { useState } from "react";
import SharedFooter from "./SharedFooter";

const C = {
  navy:    "#0A1628", navyMid: "#0F2040", navyLight: "#162840",
  orange:  "#E8712B", orangeL: "#FF8C42",
  blue:    "#2E75B6", blueL:   "#4A9FE5",
  green:   "#10B981", greenL:  "#34D399",
  purple:  "#7C3AED", purpleL: "#A78BFA",
  red:     "#EF4444", yellow:  "#F59E0B",
  white:   "#FFFFFF", muted:   "#64748B", dark: "#1E293B",
};

const CATEGORIAS = [
  { id: "todas",      label: "Todas",           cor: C.muted   },
  { id: "preco",      label: "💰 Preço",         cor: C.orange  },
  { id: "confianca",  label: "🛡 Confiança",     cor: C.purple  },
  { id: "timing",     label: "⏳ Timing",        cor: C.yellow  },
  { id: "mudanca",    label: "🔄 Mudança",       cor: C.red     },
  { id: "tecnico",    label: "⚙️ Técnico",       cor: C.blue    },
  { id: "competidor", label: "⚔️ Concorrente",   cor: C.green   },
];

const PERFIS = ["Dono / Diretor", "Gerente de Produção", "Gerente de TI"];

const OBJECOES = [
  // ── PREÇO ────────────────────────────────────────────────────────────────
  {
    id: 1, categoria: "preco",
    objecao: "\"É caro demais. O Bling cobra R$ 55/mês e vocês pedem R$ 599+.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Preço do Bling é R$ 55/mês pra varejo. Mas quando você precisa de PCP real, controle de qualidade, rastreabilidade de lote — o Bling some. E em abril de 2025 eles travaram os dados de quem cresceu: se passar de um certo volume, você é obrigado a pagar R$ 650/mês e não consegue fazer downgrade, seus dados ficam presos. A pergunta não é quanto custa o sistema. É quanto custa não ter o sistema certo.",
        gatilho: "Use a calculadora de desperdício. R$ 599/mês vs. R$ 15–25K de perdas mensais que a fábrica já tem.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "O que você usa hoje — planilha, Bling, papel — tem um custo invisível: horas suas, retrabalho, dado errado chegando no chefe. O SYSLED no plano Starter começa em R$ 199/mês. Pelo preço de um almoço de negócios por dia, você para de viver na planilha.",
        gatilho: "Mostre o ROI: se economizar 5h/semana do tempo dele, já pagou o sistema.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "O TCO de um ERP legado não é a mensalidade — é a mensalidade + horas de consultoria + custo de integração + custo de upgrade + custo de licença por usuário. Compare o total. O SYSLED tem preço plano por CNPJ, sem surpresas.",
        gatilho: "Ofereça comparativo de TCO em 12 meses vs. sistema atual.",
        nivel: "media",
      },
    },
    argMatador: "\"Qual o custo mensal da sua planilha? Inclui o tempo das pessoas, os erros, o retrabalho. Quando você soma tudo, R$ 599 é investimento, não custo.\"",
  },
  {
    id: 2, categoria: "preco",
    objecao: "\"Meu orçamento não está aprovado para software agora.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Entendemos. Mas considere que o Desafio SYSLED tem o primeiro mês garantido — se não implantar em 15 dias, você não paga. Então o risco financeiro real de testar é zero. E a condição da Smart Factory é válida só até [DATA]. Depois disso, voltamos ao preço cheio.",
        gatilho: "Crie urgência real com data de expiração da condição especial.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Posso te ajudar a montar o argumento para o seu diretor? Se você me contar quais são as dores que mais custam hoje — horas em planilha, erros que geram retrabalho — a gente calcula o número e você leva o ROI para aprovação.",
        gatilho: "Posicione-se como aliado interno, não como vendedor externo.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "Faz sentido. Posso preparar um one-pager de TCO comparativo que você apresenta internamente? Coloca o custo do sistema atual (licenças, manutenção, horas de TI) do lado e do SYSLED do outro. O número costuma falar por si.",
        gatilho: "Entregue o material pronto — não deixe o trabalho do lado do lead.",
        nivel: "media",
      },
    },
    argMatador: "\"A condição da Smart Factory inclui primeiro mês grátis se não cumprir 15 dias. Risco zero pra começar. Qual o risco de continuar como está hoje?\"",
  },
  {
    id: 3, categoria: "preco",
    objecao: "\"O setup de R$ 3–8 mil é caro. Esperava zero.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "O setup é opcional — você pode criar a conta agora e usar sem pagar nada extra. O setup assistido existe pra quem quer migração de dados, configuração personalizada e treinamento presencial. Se preferir o caminho self-service, começa hoje mesmo, grátis.",
        gatilho: "Dê a opção de começar sem setup. O objetivo é entrar, não fechar tudo de uma vez.",
        nivel: "baixa",
      },
      "Gerente de Produção": {
        resposta: "Você consegue começar hoje com zero custo de setup, explorando os módulos no ritmo da sua equipe. Se depois precisar de migração de dados históricos ou treinamento formal, a gente faz — mas não é obrigatório pra começar.",
        gatilho: "Reduza a barreira de entrada. Primeiro ele usa, depois ele paga.",
        nivel: "baixa",
      },
      "Gerente de TI": {
        resposta: "Setup zero é real — a arquitetura SaaS elimina instalação. O valor de setup assistido cobre migração de dados legados, configuração de integrações e treinamento técnico. Se sua equipe tem capacidade interna para isso, não precisa contratar.",
        gatilho: "Para TI, o argumento é autonomia técnica, não custo.",
        nivel: "baixa",
      },
    },
    argMatador: "\"Setup é opcional. Cria a conta agora, começa a usar, e a gente discute setup só se precisar migrar dados do sistema atual.\"",
  },

  // ── CONFIANÇA ────────────────────────────────────────────────────────────
  {
    id: 4, categoria: "confianca",
    objecao: "\"Nunca ouvi falar do SYSLED. É empresa nova, pode fechar.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Pergunta justa. Nascemos em 2026, mas foi construído por quem passou 10 anos como cliente frustrado de ERPs — não por uma empresa de software que nunca pisou no chão de fábrica. E tem uma proteção real: seus dados são seus. Contratos preveem exportação completa em CSV/JSON/XML a qualquer momento, sem custo. Se a gente sumir, você exporta tudo em 5 minutos e não perde nada.",
        gatilho: "A portabilidade de dados é o argumento de segurança mais poderoso. Use sempre.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "A FIEC — Federação das Indústrias do Ceará — apoiou o desenvolvimento. Não é uma startup de garagem. E como o sistema é na nuvem, mesmo que algo mude, seus dados continuam seus e exportáveis.",
        gatilho: "Credencial FIEC/SENAI aumenta confiança institucional.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "Do ponto de vista técnico, o risco é menor do que parece: stack moderno, dados em nuvem com backup diário, exportação aberta em padrões CSV/JSON/XML. O lock-in real está no Nomus (sem API) e no Bling (dados presos por plano). No SYSLED, a portabilidade é cláusula contratual explícita.",
        gatilho: "TI quer garantias técnicas, não promessas. Mostre os Termos de Serviço cláusula 7.",
        nivel: "alta",
      },
    },
    argMatador: "\"Seus dados são seus por contrato — cláusula 7 dos Termos. Exportação gratuita a qualquer momento. Se a gente sumir amanhã, você leva tudo. O risco real é ficar preso num sistema que não te deixa sair — como o Bling e o Nomus fazem hoje.\"",
  },
  {
    id: 5, categoria: "confianca",
    objecao: "\"Vocês são de Fortaleza. Precisamos de suporte presencial.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "100% dos nossos clientes operam remotamente — é assim que SaaS funciona. O suporte via IA resolve 70–80% das dúvidas na hora. Para questões complexas, suporte humano por chat e vídeo em horário comercial. Implantação em 15 dias é feita remotamente — e se não conseguir, o primeiro mês é grátis. A localidade não é mais uma barreira quando o sistema foi feito pra funcionar sem presença física.",
        gatilho: "Mostre cases de implantação remota bem-sucedida.",
        nivel: "media",
      },
      "Gerente de Produção": {
        resposta: "O sistema é feito pra ser autoexplicativo — operador de chão aprende em 30 minutos, não em semanas de treinamento presencial. Se precisar de vídeo com a gente, está incluído no plano.",
        gatilho: "Demonstre a UX ao vivo. A simplicidade da interface é o argumento.",
        nivel: "baixa",
      },
      "Gerente de TI": {
        resposta: "Implantação remota é padrão de mercado SaaS. Toda a documentação técnica, APIs e integrações são acessíveis online. Para configurações avançadas, sessões de vídeo com engenheiros. O Nomus e o TOTVS também não têm técnico na sua cidade — mas cobram mais por isso.",
        gatilho: "Compare com o suporte real dos concorrentes: Nomus leva 100 dias pra responder.",
        nivel: "media",
      },
    },
    argMatador: "\"Quanto tempo o suporte do seu sistema atual demora pra responder? O Nomus tem 100 dias de média no Reclame Aqui. Nós resolvemos em minutos via IA e em horas com humano.\"",
  },
  {
    id: 6, categoria: "confianca",
    objecao: "\"IA pra customização parece promessa. Já ouvi isso antes.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Justo. Temos um caso real: um cliente precisava de módulo de controle de qualidade específico. O mercado orçou R$ 30 mil e 3 meses. Entregamos em 15 dias por R$ 10 mil. Não é IA que 'cria magicamente' — é IA que acelera engenheiros reais. O resultado é funcionalidade funcionando, não protótipo.",
        gatilho: "Sempre ancora em caso real com número concreto. N=1 é suficiente para plantar a semente.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Me conta uma funcionalidade que você sempre quis e nunca conseguiu no seu sistema. Na demo, mostro como funciona o processo de customização — você vê o fluxo completo, não uma promessa.",
        gatilho: "Transforme a objeção em uma demo personalizada. É a virada mais poderosa.",
        nivel: "alta",
      },
      "Gerente de TI": {
        resposta: "A IA não substitui engenheiro — ela acelera o ciclo de desenvolvimento. O processo é: levantamento de requisitos → geração de código assistida por IA → revisão técnica → deploy. O que normalmente levaria 3 meses de especificação + desenvolvimento + homologação, comprimimos para dias. Para TI, o importante é que o output é código revisado, não código gerado às cegas.",
        gatilho: "TI quer entender o processo técnico, não o pitch comercial.",
        nivel: "media",
      },
    },
    argMatador: "\"Não é promessa — é processo com caso real documentado. R$ 30K e 3 meses virou R$ 10K e 15 dias. Qual customização você precisa que nenhum ERP entregou? Me conta, e fazemos a cotação na hora.\"",
  },

  // ── TIMING ───────────────────────────────────────────────────────────────
  {
    id: 7, categoria: "timing",
    objecao: "\"Não é o momento. Estamos em período de pico de produção.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Faz sentido não disrutar o pico. Mas pico de produção é exatamente quando mais se perde dinheiro por falta de dado em tempo real. A implantação em 15 dias é feita pra não parar a operação — o sistema roda em paralelo até você ter confiança. E a condição da Smart Factory vence em [DATA]. Podemos iniciar o processo agora e começar a implantação na semana que a produção normalizar.",
        gatilho: "Separe 'assinar' de 'implantar'. O compromisso pode ser feito hoje, a execução em outra data.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Você pode criar a conta hoje e deixar parada sem custo adicional. Quando o pico passar, a gente activa e começa. Não precisa decidir tudo agora.",
        gatilho: "Reduza o compromisso percebido. Criar conta ≠ implantar.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "Implantação paralela é o padrão — não há big bang. O sistema sobe junto com o atual, você valida aos poucos, e só desliga o legado quando tiver confiança. Sem risco de parar produção.",
        gatilho: "TI tem medo de downtime. Elimine esse medo explicitamente.",
        nivel: "media",
      },
    },
    argMatador: "\"Posso fazer o seguinte: você assina hoje com a condição da Smart Factory e a gente agenda a implantação pra quando o pico acabar. Não há custo antes do go-live.\"",
  },
  {
    id: 8, categoria: "timing",
    objecao: "\"Vou pensar. Me manda mais informações.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Claro. Mas antes: o que falta pra você tomar a decisão? Tenho 5 minutos agora pra resolver qualquer dúvida técnica ou comercial aqui no stand. Material por e-mail é fácil de esquecer. O que é a principal preocupação?",
        gatilho: "Nunca aceite 'pensar' sem entender o bloqueio real. A objeção real está atrás dessa frase.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Com certeza mando. Mas preciso entender o que mais importa pra você pra mandar o conteúdo certo — não quero encher sua caixa. É o preço, é a funcionalidade de produção, é a migração de dados?",
        gatilho: "Qualifique antes de mandar. Material genérico não converte.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "Posso mandar a documentação técnica, a estrutura da API e os Termos de Serviço completos. Você prefere isso ou uma sessão técnica de 30 min com nosso time de engenharia?",
        gatilho: "TI quer profundidade técnica. Ofereça o que ele valoriza, não o que é mais fácil de entregar.",
        nivel: "media",
      },
    },
    argMatador: "\"O material vai. Mas me diz uma coisa: qual a maior dúvida que, se eu resolver agora, você já sai daqui com uma decisão?\"",
  },
  {
    id: 9, categoria: "timing",
    objecao: "\"Preciso envolver outras pessoas na decisão. Não decido sozinho.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Quem mais precisa estar na conversa? Posso preparar uma apresentação de 20 minutos feita pra esse perfil específico — seja o diretor financeiro, o gerente de TI ou o sócio. Você me diz o que eles mais questionam e eu monto.",
        gatilho: "Transforme-se em aliado do processo de decisão interno, não em obstáculo.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Faz sentido. Você que conhece melhor o problema — seria possível você me conectar com seu diretor? Posso fazer uma demo de 15 minutos focada nos números de ROI, não na parte técnica.",
        gatilho: "Identifique quem é o decisor real e tente acesso direto.",
        nivel: "alta",
      },
      "Gerente de TI": {
        resposta: "Com certeza. Posso preparar um documento técnico de due diligence — arquitetura, segurança, compliance LGPD, SLA — pra você levar internamente. E se houver reunião com a diretoria, participo.",
        gatilho: "TI normalmente é o advogado interno da decisão. Equipe ele com argumentos.",
        nivel: "media",
      },
    },
    argMatador: "\"Quem são as pessoas? Me diz o cargo e a principal preocupação de cada uma — financeiro quer ROI, TI quer segurança, produção quer praticidade. Preparo o material certo pra cada um.\"",
  },

  // ── MUDANÇA ──────────────────────────────────────────────────────────────
  {
    id: 10, categoria: "mudanca",
    objecao: "\"Tenho medo de migrar dados e perder o histórico.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "O histórico nunca é deletado — o sistema atual continua funcionando durante a migração. A estratégia padrão é: SYSLED entra pra produção nova, o sistema antigo fica como arquivo de consulta. Quando tiver confiança, a gente importa o histórico em CSV. Nada some.",
        gatilho: "Explique a estratégia de migração gradual. O medo é de 'big bang' — desmonte isso.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Você não precisa migrar tudo de uma vez. Comece pelo módulo de produção novo, que é onde a dor é maior. O financeiro e o histórico ficam onde estão por agora. Depois, com calma, a gente importa o que fizer sentido.",
        gatilho: "Migração modular reduz o risco percebido pela metade.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "Importação de dados está no escopo do setup: CSV/Excel para cadastros, histórico de transações por mapeamento de campos. Para sistemas legados sem exportação estruturada — como o Nomus sem API — fazemos extração manual assistida. O plano de migração é documentado antes de qualquer execução.",
        gatilho: "TI quer processo documentado, não promessa verbal.",
        nivel: "media",
      },
    },
    argMatador: "\"A estratégia é paralela, não substituição. SYSLED entra pra produção nova; o sistema antigo vira arquivo. Você migra o histórico quando quiser, no ritmo que quiser.\"",
  },
  {
    id: 11, categoria: "mudanca",
    objecao: "\"Minha equipe não vai querer aprender um sistema novo.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "É a objeção mais comum — e a mais bem resolvida pelo SYSLED. O sistema foi desenhado para o operador primeiro, não para o gestor. Interface no celular, apontamento em 30 segundos. A adoção é bottom-up: o operador quer usar porque é mais fácil que o papel. Quando a equipe vê que é mais simples do que o WhatsApp, a resistência cai.",
        gatilho: "Mostre a interface mobile ao vivo. A UX é o argumento mais forte contra essa objeção.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Na demo, mostre pro operador — não pro gestor. Em 5 minutos de uso real, a resistência tende a virar surpresa positiva. Já vi isso acontecer aqui no stand hoje.",
        gatilho: "Se tiver operadores na feira, faça o teste ao vivo. Nada supera isso.",
        nivel: "alta",
      },
      "Gerente de TI": {
        resposta: "Curva de aprendizado é uma questão de UX. A nossa interface passa por testes de usabilidade com operadores reais — não com gestores de TI. O benchmark interno é: operador aprende o apontamento básico em 30 minutos, sem treinamento formal.",
        gatilho: "TI tende a subestimar UX. Coloque o ponto de vista do usuário final.",
        nivel: "media",
      },
    },
    argMatador: "\"Faz o teste: entrega o celular pra um operador aqui agora e vê quanto tempo leva pra ele fazer o primeiro apontamento de produção. A resposta é 5 minutos — não 5 dias.\"",
  },
  {
    id: 12, categoria: "mudanca",
    objecao: "\"Já estamos no meio de outro projeto interno. Não temos capacidade agora.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Faz sentido. A proposta não vai embora — mas a condição da Smart Factory sim. O que eu posso fazer: garantir as condições hoje com um compromisso formal, e agendar o kick-off para quando o outro projeto fechar. Você ganha tempo sem perder o benefício.",
        gatilho: "Separe o compromisso comercial da execução. São decisões independentes.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "O SYSLED não exige projeto — exige conta criada e primeiros cadastros. Pode começar com um piloto num único módulo, sem envolver TI nem mudança estrutural. Se quiser, começa com só o controle de produção.",
        gatilho: "Piloto de baixo impacto reduz a percepção de esforço.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "Entendo — bandwidth de TI é limitado. A implantação básica do SYSLED não exige TI: é self-service. Se o projeto precisar de integração, aí sim precisa de recurso técnico, e podemos calendarizar pra depois do projeto atual.",
        gatilho: "Tire TI da equação inicial. Deixe que o negócio começa sem eles.",
        nivel: "media",
      },
    },
    argMatador: "\"Feche as condições hoje, comece quando puder. A conta fica ativa esperando — sem custo até o go-live.\"",
  },

  // ── TÉCNICO ──────────────────────────────────────────────────────────────
  {
    id: 13, categoria: "tecnico",
    objecao: "\"Preciso de NF-e, SPED e Bloco K. SaaS novo consegue?\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Todos os planos incluem NF-e nativo. SPED e Bloco K estão no roadmap imediato — e a barreira fiscal brasileira é exatamente por que sistemas estrangeiros (Katana, ERPNext) não conseguem substituir o SYSLED: compliance BR é nosso core, não add-on.",
        gatilho: "Se Bloco K ainda não estiver 100% disponível, seja honesto sobre o prazo e ofereça garantia.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "NF-e está disponível desde o lançamento. Para as obrigações fiscais mais avançadas, estamos em rollout — nosso contador pode confirmar quais já estão prontas e qual o prazo das demais.",
        gatilho: "Redirecione para o responsável técnico/fiscal se necessário.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "NF-e integrado está disponível. SPED e Bloco K: confirme o status atual com nosso time técnico — para não dar informação desatualizada aqui. Posso conectar você com nosso engenheiro de compliance ainda hoje.",
        gatilho: "Não invente features. Para TI, mentira técnica é morte instantânea da venda.",
        nivel: "alta",
      },
    },
    argMatador: "\"Compliance fiscal BR é nossa barreira de entrada — por isso players globais não conseguem nos substituir. NF-e é nativo. Para obrigações acessórias avançadas, confirmo o status exato em tempo real antes de você sair daqui.\"",
  },
  {
    id: 14, categoria: "tecnico",
    objecao: "\"Precisamos integrar com nosso sistema de CRM / BI / maquinário.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "API aberta é um dos 5 pilares do SYSLED. Enquanto o Nomus não tem API pública (confirmado em 2026), qualquer sistema com API pode se integrar ao nosso. Qual é o sistema específico? Na maioria dos casos, a integração é feita via webhook ou REST em dias.",
        gatilho: "Contraste com Nomus sem API. É o argumento técnico mais devastador.",
        nivel: "media",
      },
      "Gerente de Produção": {
        resposta: "Me conta qual sistema vocês usam. Se for um CRM, BI ou sistema de automação comum, muito provavelmente já temos conector ou conseguimos em dias.",
        gatilho: "Resolva o medo específico, não o genérico.",
        nivel: "baixa",
      },
      "Gerente de TI": {
        resposta: "API REST documentada, webhooks para eventos críticos (ordem aprovada, estoque abaixo do mínimo, produção finalizada). Para maquinário industrial com protocolo OPC-UA ou MQTT, fazemos o conector via IA em prazo customizado. Qual o protocolo do equipamento?",
        gatilho: "TI quer especificidade técnica. Demonstre conhecimento do protocolo do equipamento deles.",
        nivel: "alta",
      },
    },
    argMatador: "\"API aberta é padrão no SYSLED. O Nomus não tem nenhuma. Me diz qual sistema precisa integrar — te mostro o conector ou o prazo pra fazer.\"",
  },
  {
    id: 15, categoria: "tecnico",
    objecao: "\"Não confio em dados na nuvem. Quero servidor interno.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Entendo a preocupação. Na prática, a nuvem é mais segura que servidor local: criptografia AES-256, backup diário automático, redundância geográfica. Servidor local fica sujeito a roubo físico, falha de hardware e sem backup se o técnico não fizer. Todos os bancos, a Receita Federal, a FIEC — todos estão na nuvem. O risco maior hoje é o servidor local sem manutenção.",
        gatilho: "Inverta o argumento de segurança. Local = mais vulnerável, não mais seguro.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Seu WhatsApp está na nuvem. Seu internet banking também. O SYSLED tem o mesmo nível de segurança — e seus dados estão protegidos por criptografia e backup diário, algo que planilha no computador não tem.",
        gatilho: "Use analogias do cotidiano para desmistificar a nuvem.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "Arquitetura: multi-tenant com isolamento de dados por CNPJ, criptografia TLS 1.3 em trânsito e AES-256 em repouso, RBAC granular, logs de auditoria completos, backups diários com retenção de 30 dias, certificações ISO 27001 do provedor de nuvem. Conformidade LGPD documentada nos Termos de Serviço, cláusula 16. O que especificamente é a preocupação — perda de dados, acesso não autorizado ou latência?",
        gatilho: "TI quer especificidade técnica. Responda a preocupação real, não a genérica.",
        nivel: "alta",
      },
    },
    argMatador: "\"Criptografia AES-256, backup diário, redundância geográfica. O risco real é o servidor local que ninguém mantém e não tem backup. Posso te mandar o whitepaper de segurança?\"",
  },

  // ── CONCORRENTE ──────────────────────────────────────────────────────────
  {
    id: 16, categoria: "competidor",
    objecao: "\"Já uso o Nomus. Funciona bem pra mim.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "Ótimo. Três perguntas rápidas: quantas pessoas usam o sistema ao mesmo tempo no chão de fábrica sem pagar a mais? Você tem API pra integrar com outro sistema? E quando precisou de suporte, quanto tempo demorou a resposta? Se as respostas forem 3, não e semanas — você tem oportunidade de melhoria.",
        gatilho: "As 3 feridas abertas do Nomus: usuários simultâneos, zero API, 100 dias de suporte.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Bom saber. Seu operador de chão faz apontamento pelo celular hoje? Sem planilha, sem papel — direto no sistema pelo celular? Se a resposta for não, existe uma lacuna que o Nomus não preenche.",
        gatilho: "Mobile no chão de fábrica é a dor mais tangível contra o Nomus.",
        nivel: "alta",
      },
      "Gerente de TI": {
        resposta: "O Nomus não tem API pública em 2026 — confirmado. Isso significa que qualquer integração futura (CRM, BI, IoT, marketplace) é impossível sem desenvolvimento proprietário sobre um sistema fechado. Quando o negócio crescer e precisar integrar, onde você vai estar?",
        gatilho: "Zero API é o argumento técnico definitivo para TI.",
        nivel: "alta",
      },
    },
    argMatador: "\"Quantos usuários simultâneos no chão de fábrica sem custo extra? Tem API aberta? Quanto tempo levou a última resposta de suporte? Essas três respostas definem se o Nomus está te servindo de verdade.\"",
  },
  {
    id: 17, categoria: "competidor",
    objecao: "\"A TOTVS é líder de mercado. Já tenho proposta deles.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "A TOTVS é excelente — pra quem tem R$ 2.000+/mês e 6 meses de paciência pra implantar. Se esse é o seu perfil, eles são a escolha certa. Mas se você quer entrar amanhã, sem consultoria obrigatória, sem licença por usuário e sem pagar R$ 200/hora de customização — é outro produto que você precisa. Qual é o valor de implantação na proposta deles?",
        gatilho: "Peça o número da proposta TOTVS. Quando ele falar, o contraste é imediato.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "A TOTVS funciona bem. O problema é quanto tempo vai levar pra você ver o primeiro resultado. Com o SYSLED, o módulo de produção está funcionando em 15 dias. Com a TOTVS, em 15 dias você ainda está no levantamento de requisitos.",
        gatilho: "Velocidade de valor é o diferencial vs. TOTVS.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "O Protheus usa AdvPL — linguagem proprietária da TOTVS. Todo o desenvolvimento customizado fica dependente de consultor certificado TOTVS, a R$ 150–250/hora. O SYSLED usa stack moderno com API aberta — sua equipe de TI pode integrar sem depender de fornecedor exclusivo.",
        gatilho: "AdvPL é lock-in técnico real. TI entende isso imediatamente.",
        nivel: "alta",
      },
    },
    argMatador: "\"TOTVS é ótima. Qual o valor da proposta de implantação? [resposta] Ok. Com o SYSLED você entra amanhã, por [X]% desse valor, com resultado em 15 dias. O que você prefere: segurança de nome ou velocidade de retorno?\"",
  },
  {
    id: 18, categoria: "competidor",
    objecao: "\"Existe o ERPNext que é open source e gratuito.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "ERPNext é excelente tecnicamente — e gratuito pra quem tem TI interno para instalar, configurar, manter e atualizar. Pra quem não tem, o custo real é hosting + consultor + tempo de TI + custo de upgrade. E compliance fiscal brasileiro — NF-e, SPED, Bloco K — é comunidade, não roadmap oficial. Quando a lei muda, você espera a comunidade atualizar.",
        gatilho: "O custo real do open source é o custo operacional, não a licença.",
        nivel: "media",
      },
      "Gerente de Produção": {
        resposta: "ERPNext é gratuito pra TI configurar. Você tem TI interno pra fazer isso? Se tiver, é uma opção válida. Se não tiver, o custo de consultoria pra implementar ERPNext no Brasil acaba sendo maior do que o SYSLED por um ano.",
        gatilho: "Qualifique se eles realmente têm capacidade de executar open source.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "ERPNext é uma stack sólida — Frappe/Python, open source maduro. O gap crítico para Brasil é compliance fiscal: NF-e via plugins de comunidade com manutenção irregular, sem garantia de atualização quando a SEFAZ muda o schema. Para uma PMI que precisa de compliance garantido, isso é risco real.",
        gatilho: "Compliance fiscal BR como diferencial definitivo vs. open source.",
        nivel: "alta",
      },
    },
    argMatador: "\"ERPNext é ótimo para quem tem TI interno e aceita risco de compliance fiscal. NF-e e SPED no Brasil mudam todo ano — no SYSLED isso é garantia contratual, no ERPNext é esperança de comunidade.\"",
  },
  {
    id: 19, categoria: "competidor",
    objecao: "\"O Sankhya tem mais módulos e é mais completo.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "A Sankhya tem cobertura funcional impressionante — e preço que não publica porque você vai assustar. O modelo deles é 100% consultivo: 'fale com um consultor'. Isso significa que você não sabe o preço antes de sentar com eles, e quando senta, o compromisso de implantação é longo. Se precisar de todos aqueles módulos, é uma escolha válida. Se precisar do essencial funcionando rápido, a conversa muda.",
        gatilho: "Sankhya não publica preço. Transforme isso em objeção contra eles.",
        nivel: "media",
      },
      "Gerente de Produção": {
        resposta: "Mais módulos não é necessariamente melhor — é mais treinamento, mais tela, mais para aprender. O SYSLED tem os módulos que resolvem 90% dos problemas de PMI. O resto você adiciona quando precisar, via marketplace ou customização.",
        gatilho: "Complexidade desnecessária é um problema, não uma vantagem.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "A Sankhya recebeu R$ 425M de investimento e está em modo agressivo de M&A — o que pode ser bom ou ruim dependendo de como você vê risco de integração de sistemas adquiridos. Estabilidade de roadmap em empresa em expansão acelerada pode variar.",
        gatilho: "Para TI, M&A acelerado = risco de instabilidade de produto.",
        nivel: "media",
      },
    },
    argMatador: "\"A Sankhya não publica preço. Quando você sentar com eles, o que vai ouvir é um número e um prazo que vai surpreender. Antes de fazer isso, compare com o que você já pode testar aqui de graça, agora.\"",
  },
  {
    id: 20, categoria: "competidor",
    objecao: "\"Existe o Katana e o MRPeasy que são mais baratos e modernos.\"",
    perfis: {
      "Dono / Diretor": {
        resposta: "São sistemas excelentes para manufatura leve — especialmente para quem vende no exterior ou em marketplace global. O problema é compliance fiscal brasileiro: NF-e, SPED, Bloco K, Simples Nacional. Nenhum deles tem isso de forma robusta. Se sua operação emite NF-e e precisa de compliance fiscal BR, eles não resolvem.",
        gatilho: "Compliance fiscal é a barreira de entrada definitiva contra players internacionais.",
        nivel: "alta",
      },
      "Gerente de Produção": {
        resposta: "Katana é bonito e funcional para produção. Mas quando chega na hora de emitir NF-e ou gerar relatório SPED para a contabilidade, você vai precisar de outro sistema. E aí você tem dois sistemas pra manter.",
        gatilho: "Fragmentação de sistemas é um problema real para produção.",
        nivel: "media",
      },
      "Gerente de TI": {
        resposta: "Do ponto de vista técnico, Katana e MRPeasy são stacks modernas com boas APIs. O gap crítico é fiscal: não têm suporte nativo a NF-e schema v4.0, SPED EFD-ICMS/IPI e Bloco K. Para qualquer fábrica brasileira que emite nota fiscal, essa lacuna é inviabilizante.",
        gatilho: "TI entende o custo de manter dois sistemas. Reforce isso.",
        nivel: "alta",
      },
    },
    argMatador: "\"Katana e MRPeasy são modernos e acessíveis. Mas emitem NF-e? Geram Bloco K? Funcionam com Simples Nacional? Se sua contabilidade precisar desses dados, você vai precisar de um segundo sistema — e aí o custo dobra.\"",
  },
];

const NIVEL_COR = { alta: C.red, media: C.yellow, baixa: C.green };
const NIVEL_LABEL = { alta: "Alta resistência", media: "Resistência média", baixa: "Baixa resistência" };

export default function MapaObjecoes() {
  const [catAtiva, setCatAtiva] = useState("todas");
  const [perfilAtivo, setPerfilAtivo] = useState("Dono / Diretor");
  const [aberta, setAberta] = useState(null);
  const [busca, setBusca] = useState("");

  const filtradas = OBJECOES.filter(o => {
    const matchCat = catAtiva === "todas" || o.categoria === catAtiva;
    const matchBusca = busca === "" || o.objecao.toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchBusca;
  });

  const catInfo = CATEGORIAS.find(c => c.id === catAtiva);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, fontFamily: "'Space Grotesk', sans-serif", color: C.white }}>

      {/* Header */}
      <div style={{ background: "#060E1A", padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <a href="/" style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, textDecoration: "none", cursor: "pointer" }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: C.white }}>SYSLED</span>
                <span style={{ fontSize: 11, color: C.blueL, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Industrial OS</span>
              </a>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: C.white, letterSpacing: "-0.02em" }}>Mapa de Objeções</h1>
              <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>20 objeções reais · 3 perfis de lead · Feira Smart Factory 2026</p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Perfil:</span>
              {PERFIS.map(p => (
                <button key={p} onClick={() => setPerfilAtivo(p)} style={{
                  padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700,
                  background: perfilAtivo === p ? C.orange : "rgba(255,255,255,0.06)",
                  color: perfilAtivo === p ? C.white : C.muted, transition: "all 0.2s",
                }}>{p}</button>
              ))}
            </div>
          </div>

          {/* Busca */}
          <div style={{ marginTop: 20 }}>
            <input
              value={busca} onChange={e => setBusca(e.target.value)}
              placeholder="🔍  Buscar objeção..."
              style={{
                width: "100%", padding: "10px 16px", borderRadius: 10,
                border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: C.white,
                outline: "none",
              }}
              onFocus={e => e.target.style.borderColor = C.orange}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 32px" }}>

        {/* Filtros de categoria */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {CATEGORIAS.map(cat => (
            <button key={cat.id} onClick={() => setCatAtiva(cat.id)} style={{
              padding: "8px 18px", borderRadius: 20, border: `1.5px solid ${catAtiva === cat.id ? cat.cor : "rgba(255,255,255,0.1)"}`,
              background: catAtiva === cat.id ? `${cat.cor}20` : "rgba(255,255,255,0.03)",
              cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700,
              color: catAtiva === cat.id ? cat.cor : C.muted, transition: "all 0.2s",
            }}>{cat.label} {catAtiva === cat.id && `(${filtradas.length})`}</button>
          ))}
        </div>

        {/* Legenda de perfil ativo */}
        <div style={{ padding: "14px 20px", borderRadius: 10, background: `${C.orange}10`, border: `1px solid ${C.orange}30`, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 18 }}>👤</span>
          <div>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.orangeL }}>Modo: {perfilAtivo}</span>
            <span style={{ fontSize: 13, color: C.muted, marginLeft: 12 }}>
              {perfilAtivo === "Dono / Diretor" && "Foco em ROI, risco e velocidade de decisão"}
              {perfilAtivo === "Gerente de Produção" && "Foco em praticidade, UX e mobile no chão de fábrica"}
              {perfilAtivo === "Gerente de TI" && "Foco em segurança, API, compliance técnico e portabilidade"}
            </span>
          </div>
        </div>

        {/* Lista de objeções */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtradas.map(obj => {
            const isAberta = aberta === obj.id;
            const respostaAtual = obj.perfis[perfilAtivo];
            const catObj = CATEGORIAS.find(c => c.id === obj.categoria);

            return (
              <div key={obj.id} style={{
                borderRadius: 14, overflow: "hidden",
                border: `1px solid ${isAberta ? catObj.cor + "55" : "rgba(255,255,255,0.07)"}`,
                background: isAberta ? `${catObj.cor}08` : C.navyLight,
                transition: "all 0.2s",
              }}>
                {/* Cabeçalho clicável */}
                <button onClick={() => setAberta(isAberta ? null : obj.id)} style={{
                  width: "100%", padding: "18px 22px", background: "transparent", border: "none",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 16, textAlign: "left",
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${catObj.cor}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: catObj.cor }}>#{obj.id}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: catObj.cor, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {CATEGORIAS.find(c => c.id === obj.categoria)?.label}
                      </span>
                      <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 10, background: `${NIVEL_COR[respostaAtual.nivel]}20`, color: NIVEL_COR[respostaAtual.nivel], fontWeight: 700 }}>
                        {NIVEL_LABEL[respostaAtual.nivel]}
                      </span>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.white, fontStyle: "italic" }}>{obj.objecao}</span>
                  </div>
                  <span style={{ fontSize: 18, color: C.muted, flexShrink: 0, transition: "transform 0.2s", transform: isAberta ? "rotate(180deg)" : "none" }}>▾</span>
                </button>

                {/* Conteúdo expandido */}
                {isAberta && (
                  <div style={{ padding: "0 22px 22px" }}>
                    <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />

                    {/* Resposta calibrada por perfil */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                        💬 Resposta para {perfilAtivo}
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "16px 18px", borderLeft: `3px solid ${C.orange}` }}>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.75 }}>{respostaAtual.resposta}</p>
                      </div>
                    </div>

                    {/* Gatilho tático */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.blueL, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                        ⚡ Gatilho tático
                      </div>
                      <div style={{ background: `${C.blueL}10`, borderRadius: 10, padding: "12px 16px", border: `1px solid ${C.blueL}25` }}>
                        <p style={{ fontSize: 13, color: C.blueL, lineHeight: 1.6 }}>{respostaAtual.gatilho}</p>
                      </div>
                    </div>

                    {/* Argumento matador */}
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                        🎯 Frase que fecha — use literalmente
                      </div>
                      <div style={{ background: `${C.green}0D`, borderRadius: 10, padding: "14px 18px", border: `1px solid ${C.green}30` }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: C.greenL, lineHeight: 1.6, fontStyle: "italic" }}>{obj.argMatador}</p>
                      </div>
                    </div>

                    {/* Outros perfis colapsados */}
                    <div style={{ marginTop: 20 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                        Como outros perfis abordam essa objeção:
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {PERFIS.filter(p => p !== perfilAtivo).map(p => (
                          <div key={p} style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>{p}</div>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{obj.perfis[p].resposta.substring(0, 120)}...</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Rodapé */}
        <div style={{ marginTop: 40, padding: "20px 24px", borderRadius: 14, background: C.navyLight, border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 12 }}>
            {[["20", "Objeções mapeadas"], ["3", "Perfis de lead"], ["6", "Categorias"], ["20", "Frases de fechamento"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 24, fontWeight: 900, color: C.orange }}>{n}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.muted }}>SYSLED Industrial OS · Uso interno — Time de Vendas · Smart Factory, Março 2026</p>
        </div>
      </div>
      <SharedFooter />
    </div>
  );
}
