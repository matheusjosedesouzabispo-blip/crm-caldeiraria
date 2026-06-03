# Deploy — DirectAdmin + GitHub (Webhook)

## Visão Geral

O site é publicado automaticamente a cada `git push` na branch `main`. Não há etapa de build — todos os arquivos do repositório são servidos diretamente pelo Apache.

```
git push origin main
       ↓
GitHub dispara webhook
       ↓
DirectAdmin executa git pull
       ↓
Arquivos atualizados em public_html
       ↓
Site no ar em segundos
```

---

## Dados da Infraestrutura

| Item | Valor |
|---|---|
| **Hospedagem** | DirectAdmin (servidor `br62-da.valueserver.net.br`) |
| **Servidor web** | Apache |
| **Domínio** | `crmcaldeirariabrasil.com.br` |
| **Usuário no servidor** | `crmcaldeiraria` |
| **Pasta de produção** | `/home/crmcaldeiraria/domains/crmcaldeirariabrasil.com.br/public_html` |
| **Repositório GitHub** | `https://github.com/matheusjosedesouzabispo-blip/crm-caldeiraria` |
| **Branch de produção** | `main` |

---

## Autenticação SSH (Deploy Key)

A conexão entre o servidor e o GitHub usa um par de chaves SSH dedicado — sem senha, para permitir automação.

| Item | Valor |
|---|---|
| **ID da chave** | `crm_deploy_rsa` |
| **Tipo / Tamanho** | `ssh-rsa` / `4096 bits` |
| **Comentário** | `deploy-crm-caldeiraria` |
| **Chave privada no servidor** | `~/.ssh/crm_deploy_rsa` (relativo ao home do usuário) |
| **Chave pública no GitHub** | `Settings → Deploy keys → DirectAdmin Deploy` (read-only) |

A chave privada **nunca sai do servidor**. A chave pública foi adicionada ao repositório como Deploy Key sem permissão de escrita.

---

## Git Manager (DirectAdmin)

Configurado em: **Painel DirectAdmin → Git (versionamento) → crm-caldeiraria**

| Campo | Valor |
|---|---|
| **Nome** | `crm-caldeiraria` |
| **Remoto** | `git@github.com:matheusjosedesouzabispo-blip/crm-caldeiraria.git` |
| **Implantar ramificação** | `main` |
| **Implantar diretório** | `domains/crmcaldeirariabrasil.com.br/public_html` |
| **Arquivo de chave** | `.ssh/crm_deploy_rsa` |

---

## Webhook

O webhook conecta o GitHub ao Git Manager do DirectAdmin. A cada push na branch `main`, o GitHub envia uma requisição POST para a URL abaixo, que aciona o `git pull` automático no servidor.

| Item | Valor |
|---|---|
| **URL** | `https://br62-da.valueserver.net.br:2222/api/git/user/crmcaldeiraria/uuid/b43eb5e606bcb39406841ee04b0bca17/webhook` |
| **Content type** | `application/json` |
| **Evento** | `push` |
| **Secret** | nenhum (autenticação via UUID na URL) |

Para verificar entregas: GitHub → `Settings → Webhooks → Recent Deliveries` — todas devem retornar código `200`.

---

## Fluxo de Trabalho Diário

```powershell
# Na pasta do projeto (PowerShell):
git add .
git commit -m "descrição da alteração"
git push origin main
```

O site é atualizado automaticamente após o push. Não é necessário nenhuma ação adicional.

---

## Regras Importantes

- **Nunca editar arquivos diretamente no servidor** via File Manager do DirectAdmin. Qualquer alteração manual é sobrescrita no próximo `git push`.
- Em caso de emergência que exija edição direta no servidor, a mesma alteração deve ser replicada no repositório local e commitada imediatamente, com uma mensagem de commit documentando o ocorrido.
- O arquivo `server.js` presente no `public_html` é **inofensivo em produção** — o Apache não o executa. Ele é usado apenas para desenvolvimento local (`npm start` / `node server.js`).

---

## Desenvolvimento Local

Para rodar o site localmente:

```powershell
node server.js
# Acesse: http://127.0.0.1:8799
```

O `server.js` é um servidor HTTP simples que serve os arquivos estáticos na porta `8799`. Não é usado em produção.
