# 🚀 GUIA DE TESTE RÁPIDO

## Inicializar Projeto

### Terminal 1: Backend
```bash
cd /workspaces/ProjetoJPA/estagio
mvn spring-boot:run
```
✅ Aguarde: "Started EstagioApplication in X seconds"
Backend em: `http://localhost:8080/api`

### Terminal 2: Frontend
```bash
cd /workspaces/ProjetoJPA/estagio/frontend
npm install
npm run dev
```
✅ Aguarde: "ready started server on [::]:3000"
Frontend em: `http://localhost:3000`

---

## Fluxo de Teste Completo

### 1️⃣ Home Page
```
URL: http://localhost:3000
- Clique em "Login"
```

### 2️⃣ Registro (Criar Conta)
```
URL: http://localhost:3000/register

Estudante:
- Nome: João Silva
- Email: joao@test.com
- Telefone: 11999999999
- CPF: 12345678901
- Curso: Engenharia de Software
- Senha: 123456
- Clique em "Cadastrar"

Empresa:
- Nome: Tech Solutions
- Email: empresa@test.com
- Telefone: 1133333333
- CNPJ: 12345678000100
- Endereço: Rua X, 123
- Senha: 123456
- Clique em "Cadastrar"
```

### 3️⃣ Login
```
URL: http://localhost:3000/login

Estudante:
- Tipo: Estudante
- Email: joao@test.com
- Senha: 123456
- Clique "Entrar"

Empresa:
- Tipo: Empresa
- Email: empresa@test.com
- Senha: 123456
- Clique "Entrar"
```

### 4️⃣ Dashboard
```
Você será redirecionado para: http://localhost:3000/dashboard

Opções disponíveis:
- Estudante: Explorar Vagas, Minhas Inscrições, Minhas Avaliações
- Empresa: Minhas Vagas, Criar Vaga, Inscrições Recebidas
```

### 5️⃣ Criar Vaga (como Empresa)
```
Você precisa criar uma vaga primeiro para testar avaliações.

Via API (Postman/curl):
POST http://localhost:8080/api/vagas-estagio
Headers: Content-Type: application/json

Body:
{
  "titulo": "Dev Junior Fullstack",
  "descricao": "Vaga para desenvolvedor junior com experiência em React e Spring Boot",
  "area": { "id": 1 },
  "localizacao": "São Paulo, SP",
  "modalidade": "PRESENCIAL",
  "cargaHoraria": 20,
  "requisitos": "Node.js, React, Java",
  "aberta": true,
  "empresa": { "id": 1 }
}
```

### 6️⃣ Explorar Vagas (como Estudante)
```
URL: http://localhost:3000/vagas

- Visualize as vagas criadas
- Clique em "Ver Detalhes e Avaliar"
```

### 7️⃣ ⭐ Avaliação de Vaga (Funcionalidade Inovadora)
```
URL: http://localhost:3000/vaga/[id]

Ações:
1. Visualize detalhes completos da vaga
2. Veja seção "Avaliações de Ex-Estagiários"
3. Selecione estrelas (1-5)
4. Digite um comentário (ex: "Excelente experiência!")
5. Clique "Enviar Avaliação"
6. Veja sua avaliação aparecer na lista
7. Média é calculada automaticamente

Teste:
- Criar 3+ avaliações com notas diferentes
- Verificar média atualizar automaticamente
- Tentar avaliar novamente (deve dar erro)
```

### 8️⃣ Inscrição em Vaga
```
Via API:
POST http://localhost:8080/api/inscricoes
Headers: Content-Type: application/json, Authorization: Bearer {token}

Body:
{
  "estudante": { "id": 1 },
  "vaga": { "id": 1 }
}

Resposta:
- 200 OK: Inscrição criada
- 409: Já se inscreveu nesta vaga
- 400: Vaga encerrada
```

---

## 🧪 Testes de Validação

### Validar Duplicação de Inscrição
```
1. Inscreva-se em uma vaga
2. Tente inscrever novamente
3. Resultado esperado: Erro "O estudante já se inscreveu nesta vaga"
```

### Validar Duplicação de Avaliação
```
1. Avalie uma vaga com nota 5
2. Tente avaliar novamente
3. Resultado esperado: Erro "Você já avaliou esta vaga"
```

### Validar Encerramento de Vaga
```
Via API:
PUT http://localhost:8080/api/vagas-estagio/{id}/encerrar

Resultado:
- Vaga aparece como "Encerrada"
- Novo botão de inscrição desaparece
- Inscrições no endpoint `/inscricoes` retornam erro 400
```

### Validar Gamificação
```
1. Inscreva-se em 3 vagas (5 pontos cada)
2. Consulte estudante: GET http://localhost:8080/api/estudantes/{id}
3. Campo "pontos" deve ter 15
4. Campo "badges" deve incluir "Primeira Inscrição"
```

### Validar Média de Avaliações
```
Via API:
GET http://localhost:8080/api/avaliacoes/vaga/{vagaId}/estatisticas

Resposta esperada:
{
  "mediaNotas": 3.5,
  "totalAvaliacoes": 2,
  "avaliacoes": [...]
}
```

---

## 📊 Dashboard Admin (Teste Manual)

### Estatísticas Gerais
```
Via API:
GET http://localhost:8080/api/dashboard/admin

Resposta:
{
  "totalEmpresas": 1,
  "totalEstudantes": 1,
  "vagasAbertas": 1,
  "vagasEncerradas": 0,
  "vagasPorArea": {...}
}
```

---

## 🐛 Troubleshooting

### Backend não conecta
```
1. Porta 8080 já está em uso?
   lsof -i :8080
   kill -9 {PID}

2. Reinicie Maven:
   mvn clean spring-boot:run
```

### Frontend não conecta ao Backend
```
1. Verificar CORS em AuthController
   @CrossOrigin(origins = "http://localhost:3000")

2. Limpar cache/cookies do navegador
   Ctrl+Shift+Del

3. Verificar console do navegador (F12)
   procure por erros de CORS
```

### Token expirado
```
1. Limpar localStorage:
   localStorage.clear()

2. Fazer login novamente
```

### Vaga não aparece
```
1. Verificar se foi criada:
   GET http://localhost:8080/api/vagas-estagio

2. Se não aparece, criar via API:
   POST http://localhost:8080/api/vagas-estagio
```

---

## 📝 Comandos Úteis

### Verificar logs do backend
```bash
# Terminal com Maven rodando
# Procure por mensagens de erro
```

### Testar endpoint via cURL
```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@test.com","senha":"123456","role":"estudante"}'

# Listar vagas
curl http://localhost:8080/api/vagas-estagio

# Criar avaliação
curl -X POST http://localhost:8080/api/avaliacoes \
  -H "Content-Type: application/json" \
  -d '{"estudante":{"id":1},"vaga":{"id":1},"nota":5,"comentario":"Ótimo!"}'
```

### Resetar banco de dados
```bash
# Deletar arquivo do H2
rm -rf /workspaces/ProjetoJPA/estagio/data/

# Reiniciar o backend
# O H2 recriará o banco automaticamente
```

---

## ✅ Checklist de Teste

- [ ] Conseguiu acessar http://localhost:3000
- [ ] Criou conta de estudante com sucesso
- [ ] Criou conta de empresa com sucesso
- [ ] Conseguiu fazer login como estudante
- [ ] Conseguiu fazer login como empresa
- [ ] Viu o dashboard com opções
- [ ] Criou uma vaga como empresa
- [ ] Visualizou vaga na listagem
- [ ] Conseguiu avaliar a vaga (1-5 estrelas + comentário)
- [ ] Viu sua avaliação na lista
- [ ] Tentou avaliar novamente (erro esperado)
- [ ] Viu a média de avaliações atualizar
- [ ] Inscreveu-se em uma vaga
- [ ] Tentou inscrever novamente (erro esperado)
- [ ] Encerrou uma vaga
- [ ] Viu que a vaga encerrada não permite inscrição

---

**Teste concluído com sucesso? ✅ Projeto está pronto!**

Dúvidas? Verificar comentários no código Java ou no `README_IMPLEMENTACAO.md`
