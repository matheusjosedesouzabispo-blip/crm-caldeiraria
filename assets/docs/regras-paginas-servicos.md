# Regras — Criação de Páginas de Serviços (CRM Caldeiraria)

## Objetivo

Este documento define o padrão técnico e editorial para criar as páginas de serviços do site CRM Caldeiraria, mantendo identidade visual, SEO, responsividade e foco em conversão (CTA para WhatsApp).

As páginas de serviço devem:

- manter o mesmo cabeçalho e rodapé institucionais;
- usar CTA principal para WhatsApp;
- usar a imagem destacada correta de cada serviço;
- trazer conteúdo técnico robusto e completo;
- usar ícones Lucide em blocos de informação;
- seguir estritamente HTML + CSS + JS puro (sem dependências extras).

---

## Páginas e imagens destacadas obrigatórias

Cada página deve usar sua imagem destacada correspondente:

- `fabricacao-de-tanques/index.html` -> `/assets/img/fabricacao-de-tanques-destaque.webp`
- `revestimento-duro-em-moinhos/index.html` -> `/assets/img/revestimento-duro-em-moinhos-destaque.webp`
- `roscas-transportadoras/index.html` -> `/assets/img/roscas-transportadoras-destaque.webp`
- `estruturas-sob-desenho/index.html` -> `/assets/img/estruturas-sob-desenho-destaque.webp`
- `componentes-para-transporte/index.html` -> `/assets/img/componentes-para-transporte-destaque.webp`
- `soldas-especiais/index.html` -> `/assets/img/soldas-especiais-destaque.webp`

Regra de caminho: sempre absoluto (`/assets/...`), nunca relativo.

---

## Estrutura base obrigatória de cada página

1. **`<head>` completo com SEO local**
   - `title` específico do serviço + marca;
   - `meta description` com aplicação industrial;
   - Open Graph básico (`og:title`, `og:description`, `og:image`);
   - canonical da URL final;
   - favicon e manifest já usados no projeto.

2. **Cabeçalho institucional completo**
   - mesmo padrão de navegação do site;
   - menu com item "Serviços" e dropdown;
   - botão "Orçamento" com link WhatsApp.

3. **Hero técnico do serviço**
   - H1 específico;
   - subtítulo técnico;
   - imagem destacada da página;
   - CTA primário e CTA secundário.

4. **Seções técnicas detalhadas (obrigatórias)**
   - visão geral do serviço;
   - aplicações industriais;
   - materiais e espessuras/faixas típicas;
   - processos e controle de qualidade;
   - diferenciais técnicos e operacionais;
   - FAQ técnico com dúvidas reais.

5. **Bloco de CTA forte (fundo de destaque)**
   - reforçar urgência e benefício;
   - botão direto para WhatsApp com texto pré-preenchido.

6. **Rodapé institucional completo**
   - mesmo rodapé da home;
   - seção "Serviços" com os 6 links.

7. **Scripts padrões**
   - `/assets/lucide.min.js`
   - `/script.js`

---

## Regra de conteúdo (densidade técnica)

Cada página precisa ser "rica" em conteúdo técnico. Mínimo recomendado:

- **1 H1** único;
- **5 a 8 seções** com H2;
- **2 ou mais listas técnicas** (ex.: materiais, inspeções, benefícios);
- **1 seção de processo passo a passo**;
- **1 FAQ com 4 a 6 perguntas**.

Evitar texto genérico. Sempre citar:

- contexto industrial (papel/celulose, MDF, químico, alimentício);
- condições de operação (abrasão, temperatura, esforço mecânico, corrosão);
- ganho prático (durabilidade, redução de parada, previsibilidade de manutenção).

---

## Uso de ícones Lucide (obrigatório)

Usar ícones Lucide em blocos informativos para melhorar leitura visual.

Exemplo de ícones recomendados por contexto:

- Processo: `settings`, `cog`, `wrench`
- Qualidade: `shield-check`, `check-circle2`, `badge-check`
- Prazo/atendimento: `clock-3`, `calendar-check`, `message-circle`
- Segurança/estrutura: `hard-hat`, `factory`, `weight`
- Materiais: `anvil`, `ruler`, `flask-conical`

Exemplo de marcação:

```html
<li><i data-lucide="shield-check" class="icone-lucide"></i> Inspeção dimensional e visual em pontos críticos</li>
```

Após inserir os ícones, garantir inicialização com `lucide.createIcons()` (já coberta no `script.js` global).

---

## CTAs obrigatórios por página

Cada página de serviço deve ter:

1. **CTA primário no hero**
   - texto: "Solicitar Orçamento no WhatsApp"
   - link com mensagem específica do serviço.

2. **CTA secundário**
   - texto: "Falar com especialista"
   - mesmo destino WhatsApp, texto diferente.

3. **CTA final da página**
   - bloco visual de fechamento com reforço de autoridade e resposta rápida.

Modelo de link:

```txt
https://wa.me/5511934001952?text=Olá! Gostaria de solicitar orçamento para [NOME DO SERVIÇO].
```

---

## Padrão de seções recomendado (template)

Use esta ordem como referência principal:

1. Hero técnico + imagem destacada + CTAs
2. O que este serviço resolve
3. Aplicações e segmentos atendidos
4. Materiais e capacidades técnicas
5. Processo de fabricação/execução
6. Controle de qualidade e inspeções
7. Diferenciais CRM (prazo, suporte, rastreabilidade)
8. FAQ técnico
9. CTA final

---

## SEO por página (obrigatório)

Para cada serviço:

- `title` único, com até ~60 caracteres;
- `meta description` entre ~140 e 160 caracteres;
- URL amigável usando slug da pasta;
- 1 H1 por página;
- alt descritivo na imagem destacada com termos técnicos;
- links internos para outros serviços quando fizer sentido.

---

## Responsividade e consistência visual

Seguir exatamente os padrões existentes:

- um único `style.css`;
- mesma tipografia (`Lato`);
- mesmas variáveis CSS de cor;
- containers e espaçamentos compatíveis com home/subpáginas;
- componentes de botão mantendo identidade visual;
- mobile-first sem quebra de layout.

Não criar novo sistema de estilos paralelo.

---

## Checklist de validação antes de publicar

- [ ] Página está em pasta própria com `index.html`
- [ ] `title` e `meta description` específicos do serviço
- [ ] Imagem destacada correta (arquivo `.webp` correspondente)
- [ ] Cabeçalho e rodapé institucionais presentes
- [ ] Dropdown de serviços funcionando
- [ ] CTAs de WhatsApp no hero e no fechamento
- [ ] Conteúdo técnico robusto (não genérico)
- [ ] Ícones Lucide aplicados e renderizando
- [ ] Links absolutos de assets (`/assets/...`)
- [ ] Página testada em desktop e mobile

---

## Regras finais de implementação

- Não adicionar bibliotecas externas para layout.
- Não criar build pipeline.
- Não quebrar a estrutura global do site.
- Priorizar clareza técnica + conversão.
- Sempre alinhar o texto ao contexto industrial real do serviço.
