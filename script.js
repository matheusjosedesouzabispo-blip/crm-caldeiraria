/* =========================================================
   CRM Caldeiraria — Scripts da página inicial (versão expandida)
   Interações: menu mobile, animações, contagem de números,
   FAQ, lightbox e sombra dinâmica no header.
   ========================================================= */

function initLucideIcons() {
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {

  initLucideIcons();

  /* ---- Ano dinâmico no rodapé ---- */
  const campoAno = document.getElementById('ano-atual');
  if (campoAno) campoAno.textContent = new Date().getFullYear();

  /* ---- Menu mobile: abre e fecha ---- */
  const botaoMenu = document.querySelector('.botao-menu-mobile');
  const menuDoSite = document.querySelector('.menu-do-site');

  if (botaoMenu && menuDoSite) {
    botaoMenu.addEventListener('click', () => {
      const aberto = menuDoSite.classList.toggle('menu-aberto');
      botaoMenu.setAttribute('aria-expanded', aberto);
    });

    menuDoSite.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuDoSite.classList.remove('menu-aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
        menuDoSite.querySelectorAll('.item-menu-com-submenu.submenu-aberto').forEach(item => {
          item.classList.remove('submenu-aberto');
          const gatilho = item.querySelector('.gatilho-submenu-servicos');
          if (gatilho) gatilho.setAttribute('aria-expanded', 'false');
        });
      });
    });
  }

  /* ---- Submenu Serviços (mobile: toque para expandir) ---- */
  const itensSubmenuServicos = document.querySelectorAll('.item-menu-com-submenu');
  const mediaMenuMobile = window.matchMedia('(max-width: 720px)');

  itensSubmenuServicos.forEach(item => {
    const gatilho = item.querySelector('.gatilho-submenu-servicos');
    if (!gatilho) return;

    gatilho.addEventListener('click', (event) => {
      if (!mediaMenuMobile.matches) return;
      event.preventDefault();
      event.stopPropagation();
      const aberto = item.classList.toggle('submenu-aberto');
      gatilho.setAttribute('aria-expanded', aberto);
    });
  });

  /* ---- Animação de entrada por scroll ---- */
  const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel-na-tela');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  function prepararAnimacaoEntrada(elemento, opcoes = {}) {
    const { suave = false, atrasoMs = 0 } = opcoes;

    if (movimentoReduzido) {
      elemento.classList.add('visivel-na-tela');
      return;
    }

    elemento.classList.add('animar-entrada');
    if (suave) elemento.classList.add('animar-entrada--suave');
    if (atrasoMs > 0) elemento.style.setProperty('--atraso-entrada', `${atrasoMs}ms`);
    observador.observe(elemento);
  }

  const elementosAnimaveis = document.querySelectorAll(
    '.cartao-de-servico, .cartao-de-processo, .cartao-de-segmento, .cartao-de-material, ' +
    '.etapa, .grade-da-galeria figure, .bloco-sobre-a-empresa, .cabecalho-da-secao, .indicador'
  );
  elementosAnimaveis.forEach(el => prepararAnimacaoEntrada(el));

  document.querySelectorAll('.grade-de-depoimentos').forEach(grade => {
    grade.querySelectorAll('.cartao-de-depoimento').forEach((cartao, indice) => {
      prepararAnimacaoEntrada(cartao, { suave: true, atrasoMs: indice * 110 });
    });
  });

  /* ---- Contagem animada dos indicadores numéricos ---- */
  const numerosParaAnimar = document.querySelectorAll('.indicador strong[data-numero]');

  const observadorDeNumeros = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        animarContagem(entrada.target);
        observadorDeNumeros.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.5 });

  numerosParaAnimar.forEach(num => observadorDeNumeros.observe(num));

  function animarContagem(elemento) {
    const alvo = parseInt(elemento.dataset.numero, 10);
    const duracao = 1800;
    const passo = Math.max(1, Math.floor(alvo / (duracao / 16)));
    let atual = 0;

    const intervalo = setInterval(() => {
      atual += passo;
      if (atual >= alvo) {
        elemento.textContent = alvo;
        clearInterval(intervalo);
      } else {
        elemento.textContent = atual;
      }
    }, 16);
  }

  /* ---- Sombra dinâmica no cabeçalho ao rolar ---- */
  const cabecalho = document.querySelector('.cabecalho-principal');
  if (cabecalho) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        cabecalho.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
      } else {
        cabecalho.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
      }
    });
  }

  /* ---- FAQ: accordion animado com max-height ---- */
  const perguntas = document.querySelectorAll('.pergunta');
  perguntas.forEach(pergunta => {
    const cabecalho = pergunta.querySelector('.pergunta-cabecalho');
    const conteudo  = pergunta.querySelector('.pergunta-conteudo');
    if (!cabecalho || !conteudo) return;

    cabecalho.addEventListener('click', () => {
      const estaAberta = pergunta.classList.contains('aberta');

      // Fecha todas
      perguntas.forEach(outra => {
        outra.classList.remove('aberta');
        const c = outra.querySelector('.pergunta-conteudo');
        const b = outra.querySelector('.pergunta-cabecalho');
        if (c) c.classList.remove('aberto');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Abre a clicada (se estava fechada)
      if (!estaAberta) {
        pergunta.classList.add('aberta');
        conteudo.classList.add('aberto');
        cabecalho.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- Lightbox da galeria de projetos ---- */
  const lightboxGaleria = document.getElementById('lightbox-galeria');
  const lightboxImagem = lightboxGaleria?.querySelector('.lightbox-imagem');
  const lightboxLegenda = lightboxGaleria?.querySelector('.lightbox-legenda');
  const botaoFecharLightbox = lightboxGaleria?.querySelector('.lightbox-fechar');
  const fundoLightbox = lightboxGaleria?.querySelector('[data-fechar-lightbox]');
  const itensGaleria = document.querySelectorAll('.grade-da-galeria figure');

  function abrirLightbox(img) {
    if (!lightboxGaleria || !lightboxImagem || !img) return;

    const figure = img.closest('figure');
    lightboxImagem.src = img.currentSrc || img.src;
    lightboxImagem.alt = img.alt;
    if (lightboxLegenda) {
      lightboxLegenda.textContent = figure?.querySelector('figcaption')?.textContent.trim() || '';
    }

    lightboxGaleria.hidden = false;
    lightboxGaleria.classList.add('aberto');
    document.body.classList.add('lightbox-aberto');
    botaoFecharLightbox?.focus();
  }

  function fecharLightbox() {
    if (!lightboxGaleria) return;

    lightboxGaleria.classList.remove('aberto');
    document.body.classList.remove('lightbox-aberto');
    lightboxGaleria.hidden = true;
    if (lightboxImagem) {
      lightboxImagem.removeAttribute('src');
      lightboxImagem.alt = '';
    }
    if (lightboxLegenda) lightboxLegenda.textContent = '';
  }

  if (lightboxGaleria && itensGaleria.length) {
    itensGaleria.forEach(figure => {
      const img = figure.querySelector('img');
      if (!img) return;

      figure.setAttribute('tabindex', '0');
      figure.setAttribute('role', 'button');
      figure.setAttribute('aria-label', `Ampliar imagem: ${img.alt}`);

      figure.addEventListener('click', () => abrirLightbox(img));
      figure.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          abrirLightbox(img);
        }
      });
    });

    botaoFecharLightbox?.addEventListener('click', fecharLightbox);
    fundoLightbox?.addEventListener('click', fecharLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxGaleria.classList.contains('aberto')) {
        fecharLightbox();
      }
    });
  }

  initLucideIcons();

});