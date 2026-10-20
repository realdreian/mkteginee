// MENU TOGGLE
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
      menuButton.textContent = "☰";
    });
  });
}

// CURRENT YEAR
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// SCROLL REVEAL OBSERVER
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// INTERACTIVE BOTTLENECKS TABS (DIAGNÓSTICO DE GARGALOS)
const bneckButtons = document.querySelectorAll(".bneck-btn");
const bneckPanels = document.querySelectorAll(".bneck-panel");

bneckButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetBneck = btn.getAttribute("data-bneck");

    // Remove active from all buttons
    bneckButtons.forEach(b => b.classList.remove("active"));
    // Add active to clicked button
    btn.classList.add("active");

    // Hide all panels, show target panel
    bneckPanels.forEach(panel => {
      if (panel.id === `bneck-${targetBneck}`) {
        panel.classList.add("active");
      } else {
        panel.classList.remove("active");
      }
    });
  });
});

// SIMULADOR DE EFICIÊNCIA DE ENGENHARIA DE MARKETING
const inputSpend = document.getElementById("input-spend");
const inputClicks = document.getElementById("input-clicks");
const inputSales = document.getElementById("input-sales");
const inputRevenue = document.getElementById("input-revenue");

const resCac = document.getElementById("res-cac");
const resCvr = document.getElementById("res-cvr");
const resRoas = document.getElementById("res-roas");
const resGain = document.getElementById("res-gain");
const diagnosisText = document.getElementById("diagnosis-text");

function formatCurrency(val) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(val);
}

function calculateEfficiency() {
  if (!inputSpend || !inputClicks || !inputSales || !inputRevenue) return;

  const spend = parseFloat(inputSpend.value) || 0;
  const clicks = parseFloat(inputClicks.value) || 0;
  const sales = parseFloat(inputSales.value) || 0;
  const revenue = parseFloat(inputRevenue.value) || 0;

  // Cálculos de Engenharia
  // CAC = investimento ÷ clientes
  const cac = sales > 0 ? spend / sales : 0;
  // CVR = (clientes ÷ visitantes) * 100
  const cvr = clicks > 0 ? (sales / clicks) * 100 : 0;
  // ROAS = receita ÷ investimento
  const roas = spend > 0 ? revenue / spend : 0;
  // Ticket Médio
  const avgTicket = sales > 0 ? revenue / sales : 0;

  // Estimativa de Ganho Potencial com Redução de Gargalos (Benchmark técnico de +35% de eficiência)
  const potentialNewSales = Math.round(sales * 0.35);
  const potentialGain = potentialNewSales * avgTicket;

  // Atualização no DOM
  resCac.textContent = formatCurrency(cac);
  resCvr.textContent = cvr.toFixed(2).replace(".", ",") + "%";
  resRoas.textContent = roas.toFixed(2).replace(".", ",") + "x";
  resGain.textContent = "+ " + formatCurrency(potentialGain);

  // Parecer Técnico da Engenharia de Marketing
  if (cvr < 1.5) {
    diagnosisText.textContent =
      `"Diagnóstico Crítico: Sua taxa de conversão atual de ${cvr.toFixed(2)}% indica alta fricção técnica na jornada do cliente (páginas lentas, formulários dispersos ou falta de clareza na proposta de valor). Corrigindo esse gargalo com engenharia de UX e testes A/B, há um potencial de capturar ${formatCurrency(potentialGain)} em receita adicional com a mesma verba de mídia."`;
  } else if (cvr >= 1.5 && cvr < 3.5) {
    diagnosisText.textContent =
      `"Diagnóstico Moderado: Conversão saudável de ${cvr.toFixed(2)}% com ROAS de ${roas.toFixed(2)}x. O gargalo primário está no tempo de resposta e integração de dados. A implementação de automação de CRM com IA e Server-Side Tracking pode destravar cerca de ${formatCurrency(potentialGain)} em margem líquida adicional."`;
  } else {
    diagnosisText.textContent =
      `"Diagnóstico Avançado: Excelente taxa de conversão (${cvr.toFixed(2)}%) e retorno sobre verba (${roas.toFixed(2)}x). Sua operação está madura para escala de alta tração. O próximo passo de engenharia é estruturar pipelines de retenção/LTV e governança de dados para sustentar o crescimento sem encarecer o CAC."`;
  }
}

// Event listeners
[inputSpend, inputClicks, inputSales, inputRevenue].forEach(input => {
  if (input) {
    input.addEventListener("input", calculateEfficiency);
  }
});

// Run once on load
calculateEfficiency();