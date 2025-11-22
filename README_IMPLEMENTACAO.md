# Portal de Estágios - Projeto Final

## 📋 Visão Geral

Sistema completo de portal de estágios conectando estudantes, empresas e administradores.

### Funcionalidades Implementadas

#### ✅ Autenticação
- Login com JWT para estudantes, empresas e admin
- Senhas criptografadas com BCrypt
- Tokens com expiração de 24h

#### ✅ Gerenciamento de Usuários
- Cadastro de estudantes (nome, CPF, curso, email, telefone)
- Cadastro de empresas (nome, CNPJ, email, telefone, endereço)
- Cadastro de administradores
- CRUD completo para todos os tipos

#### ✅ Vagas de Estágio
- Criar, editar e visualizar vagas
- Listar vagas abertas
- Filtrar por áreas de interesse
- Encerrar vagas para impedir inscrições
- Validação de dados

#### ✅ Inscrições
- Estudantes se inscreverem em vagas
- Validação de duplicação (mesma inscrição não permite 2x)
- Gamificação: +5 pontos por inscrição, badges automáticas
- Listar inscrições por estudante ou vaga

#### ✅ **Funcionalidade Inovadora: Avaliações de Vagas**
- Estudantes avaliam vagas (1-5 estrelas)
- Deixar comentário detalhado sobre experiência
- Impedir múltiplas avaliações do mesmo estudante na mesma vaga
- Calcular média de notas por vaga
- Exibir avaliações para ajudar outros estudantes na decisão
- Estatísticas: média, total de avaliações

#### ✅ Dashboards Personalizados
- **Estudante**: Vagas por áreas de interesse, minhas inscrições
- **Empresa**: Minhas vagas, inscrições recebidas
- **Admin**: Estatísticas gerais, CRUD de áreas

#### ✅ Áreas de Interesse
- CRUD (apenas admin)
- Associação com empresas e estudantes
- Filtros por área

#### ✅ API REST
- Todos os endpoints documentados no código com comentários
- CORS habilitado
- Context path: `/api`

---

## 🚀 Como Executar

### Backend

1. **Instalar dependências Maven:**
   ```bash
   cd estagio
   mvn install
   ```

2. **Executar Spring Boot:**
   ```bash
   mvn spring-boot:run
   ```
   - Acessa em: `http://localhost:8080/api`
   - Banco de dados H2 em: `./data/usersdb`

### Frontend

1. **Instalar dependências:**
   ```bash
   cd frontend
   npm install
   ```

2. **Iniciar Dev Server:**
   ```bash
   npm run dev
   ```
   - Acessa em: `http://localhost:3000`

---

## 📂 Estrutura do Projeto

### Backend (Java + Spring Boot)

```
src/main/java/br/mack/estagio/
├── controllers/
│   ├── AuthController.java          (Login com JWT)
│   ├── EstudanteController.java     (CRUD + registro)
│   ├── EmpresaController.java       (CRUD + registro)
│   ├── VagaEstagioController.java   (CRUD + listar/filtrar)
│   ├── InscricaoController.java     (Inscrições + validações)
│   ├── AvaliacaoController.java     (★ Avaliações - Funcionalidade Inovadora)
│   ├── AreaInteresseController.java (CRUD por admin)
│   ├── AdministradorController.java (CRUD)
│   └── DashboardController.java     (Dashboards personalizados)
├── entities/
│   ├── Usuario.java
│   ├── Estudante.java
│   ├── Empresa.java
│   ├── VagaEstagio.java
│   ├── Inscricao.java
│   ├── AreaInteresse.java
│   ├── Administrador.java
│   └── Avaliacao.java               (★ Nova entidade)
├── repositories/
│   ├── EstudanteRepository.java
│   ├── EmpresaRepository.java
│   ├── VagaEstagioRepository.java
│   ├── InscricaoRepository.java
│   ├── AvaliacaoRepository.java     (★ Com queries de estatísticas)
│   ├── AreaInteresseRepository.java
│   └── AdministradorRepository.java
├── dto/
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   ├── EstudanteDTO.java
│   ├── EmpresaDTO.java
│   ├── VagaDTO.java
│   ├── InscricaoDTO.java
│   ├── AvaliacaoDTO.java            (★ Novo DTO)
│   ├── CadastroEstudanteRequest.java
│   └── CadastroEmpresaRequest.java
├── security/
│   └── JwtProvider.java             (Gerar/validar JWT)
├── config/
│   └── SecurityConfig.java          (BCrypt)
└── EstagioApplication.java
```

### Frontend (Next.js + React + TypeScript)

```
src/
├── app/
│   ├── page.tsx                  (Home)
│   ├── login/page.tsx            (Login)
│   ├── register/page.tsx         (Registro)
│   ├── dashboard/page.tsx        (Dashboard principal)
│   ├── vagas/page.tsx            (Listar vagas)
│   ├── vaga/[id]/page.tsx        (★ Detalhe + avaliar)
│   ├── layout.tsx
│   └── globals.css
├── services/
│   └── authService.ts            (Chamadas API + interceptor)
└── types/
    └── auth.ts                   (Interfaces TypeScript)
```

---

## 🔑 Endpoints Principais

### Autenticação
- `POST /auth/login` - Login (estudante/empresa/admin)

### Estudantes
- `GET /estudantes` - Listar todos
- `GET /estudantes/{id}` - Obter por ID
- `POST /estudantes/registro` - Registrar novo
- `PUT /estudantes/{id}` - Atualizar
- `DELETE /estudantes/{id}` - Deletar

### Vagas
- `GET /vagas-estagio` - Listar todas
- `GET /vagas-estagio/{id}` - Obter por ID
- `GET /vagas-estagio/abertas` - Apenas abertas
- `GET /vagas-estagio/por-areas?areaIds=1,2` - Por áreas
- `POST /vagas-estagio` - Criar (empresa)
- `PUT /vagas-estagio/{id}/encerrar` - Encerrar

### Inscrições
- `GET /inscricoes/estudante/{estudanteId}` - Minhas inscrições
- `GET /inscricoes/vaga/{vagaId}` - Candidatos
- `POST /inscricoes` - Inscrever em vaga

### ★ Avaliações (Funcionalidade Inovadora)
- `GET /avaliacoes/vaga/{vagaId}` - Avaliar vagas
- `GET /avaliacoes/vaga/{vagaId}/estatisticas` - Média + total
- `GET /avaliacoes/estudante/{estudanteId}` - Minhas avaliações
- `POST /avaliacoes` - Criar avaliação
- `PUT /avaliacoes/{id}` - Atualizar avaliação
- `DELETE /avaliacoes/{id}` - Deletar avaliação

### Dashboards
- `GET /dashboard/admin` - Estatísticas
- `GET /dashboard/estudante/{id}` - Vagas por áreas
- `GET /dashboard/empresa/{id}` - Vagas + inscrições

---

## 🎓 Usuários de Teste

### Estudante
- Email: `estudante@test.com`
- Senha: `123456`

### Empresa
- Email: `empresa@test.com`
- Senha: `123456`

### Admin
- Email: `admin@test.com`
- Senha: `123456`

*Criar através do endpoint `/registro` antes de usar*

---

## 💾 Banco de Dados

- **Desenvolvimento**: H2 (em memória/arquivo)
- **Arquivo**: `./data/usersdb`
- **DDL-Auto**: UPDATE (cria/atualiza schema automaticamente)

### Conexão H2 Console (opcional)
- URL: `http://localhost:8080/api/h2-console`
- Driver: `org.h2.Driver`
- URL JDBC: `jdbc:h2:file:./data/usersdb`

---

## 🔐 Segurança

- ✅ Senhas criptografadas com BCrypt (10 rounds)
- ✅ JWT com expiração de 24h
- ✅ Chave secreta configurável em `application.properties`
- ✅ CORS habilitado apenas para `http://localhost:3000`
- ✅ Validação de entrada em todos endpoints

---

## 📝 Documentação do Código

Todos os métodos, classes e funcionalidades incluem comentários explicativos em português:
- Descrição geral da classe/método
- Parâmetros e retorno
- Fluxo de execução
- Validações e regras de negócio

**Exemplo:**
```java
/**
 * Cria uma nova avaliação de vaga.
 * 
 * Validações:
 * - Estudante deve existir
 * - Vaga deve existir
 * - Nota deve estar entre 1 e 5
 * - Estudante não pode avaliar a mesma vaga duas vezes
 */
@PostMapping
public Avaliacao criarAvaliacao(@RequestBody Avaliacao avaliacao) { ... }
```

---

## ✨ Funcionalidade Inovadora: Sistema de Avaliações

### O que é?
Módulo que permite estudantes avaliar vagas de estágio onde se inscreveram ou experimentaram, ajudando outros estudantes na decisão de candidatura.

### Como funciona?
1. Estudante acessa detalhes de uma vaga
2. Vê avaliações de ex-estagiários com:
   - Nota (1-5 estrelas)
   - Comentário detalhado
   - Data da avaliação
   - Média e total de avaliações
3. Pode deixar sua própria avaliação
4. Sistema impede múltiplas avaliações do mesmo estudante
5. Admin/empresa vê estatísticas de reputação

### Endpoints
```java
// Listar avaliações de uma vaga
GET /api/avaliacoes/vaga/{vagaId}

// Estatísticas (média + contagem)
GET /api/avaliacoes/vaga/{vagaId}/estatisticas

// Criar avaliação
POST /api/avaliacoes
{
  "estudante": { "id": 1 },
  "vaga": { "id": 5 },
  "nota": 4,
  "comentario": "Excelente experiência de aprendizado!"
}

// Atualizar avaliação
PUT /api/avaliacoes/{id}

// Deletar avaliação
DELETE /api/avaliacoes/{id}
```

---

## 🛠️ Requisitos Técnicos Atendidos

### Requisitos Funcionais
- ✅ Login para 3 tipos de usuários
- ✅ Senhas criptografadas
- ✅ Cadastro de áreas (admin)
- ✅ Cadastro de empresas
- ✅ Cadastro de estudantes
- ✅ Ofertas de vagas
- ✅ Inscrição em vagas
- ✅ Validação de vagas abertas
- ✅ Encerramento de vagas
- ✅ Dashboard personalizado
- ✅ Painel para empresas ver inscrições
- ✅ **Sistema de avaliações inovador**

### Entregas Técnicas
- ✅ Backend em Spring Boot + JPA
- ✅ API REST documentada (código)
- ✅ PostgreSQL pronto (em `application-prod.properties`)
- ✅ Frontend SPA em Next.js
- ✅ Interface completa com CSS
- ✅ Autenticação com JWT
- ✅ Controle de acesso por role

---

## 📦 Dependências Principais

### Backend
- Spring Boot 3.5.7
- Spring Data JPA
- Spring Security (BCrypt)
- JWT (jjwt 0.12.3)
- H2 Database
- PostgreSQL Driver
- Lombok

### Frontend
- Next.js 16.0.3
- React 19.2.0
- Axios 1.13.2
- TypeScript 5
- Tailwind CSS 4.1.17

---

## 🎯 Próximas Melhorias (Opcional)

1. Página de "Minhas Inscrições" com detalhes
2. Envio de email para notificações
3. Upload de currículo em PDF
4. Chat em tempo real
5. Exportar dados para Excel
6. Agendamento de entrevistas com calendário
7. Deployment em Railway/Render

---

## 📞 Contato / Suporte

Projeto desenvolvido como trabalho universitário de Linguagem de Programação 2.

Data: Novembro 2024

---

**Desenvolvido com ❤️ usando Java Spring Boot e Next.js**
