# Portal de Estágios - Projeto Final

Sistema completo de portal de estágios desenvolvido com Spring Boot (backend) e Next.js (frontend).

## 📋 Funcionalidades Implementadas

### ✅ Obrigatórias
1. **Autenticação e Cadastro**
   - Login para estudantes, empresas e administradores
   - Senhas criptografadas com BCrypt
   - Validações de unicidade (CPF, CNPJ, email)

2. **Áreas de Interesse**
   - CRUD completo (admin)
   - Relacionamento com estudantes e empresas

3. **Cadastro de Empresas**
   - Dados completos: nome, CNPJ, email, telefone, endereço
   - Áreas de atuação

4. **Cadastro de Estudantes**
   - Dados completos: nome, CPF, curso, email, telefone
   - Áreas de interesse

5. **Vagas de Estágio**
   - CRUD completo
   - Filtros por área e empresa
   - Status aberta/encerrada
   - Modalidade: remoto/presencial/híbrido

6. **Inscrições**
   - Estudantes podem se inscrever em vagas abertas
   - Validação de inscrição única por vaga
   - Sistema de pontuação

7. **Dashboards Personalizados**
   - **Estudante**: Vagas recomendadas por área de interesse
   - **Empresa**: Inscrições recebidas nas vagas
   - **Admin**: Estatísticas gerais do portal

### 🎮 Funcionalidade Inovadora: Gamificação

- **Sistema de Pontos**: Estudantes ganham pontos por inscrições
- **Badges/Conquistas**: Conquistas automáticas baseadas em pontos
  - Iniciante (10 pontos)
  - Avançado (50 pontos)
  - Expert (100 pontos)
- **Ranking**: Top 10 estudantes por pontuação
- **Interface dedicada**: Página de ranking com medalhas

## 🚀 Configuração e Execução

### Backend (Spring Boot)

1. **Pré-requisitos**
   - Java 21
   - Maven
   - PostgreSQL (opcional, usa H2 por padrão)

2. **Configuração do Banco**
   ```properties
   # application.properties (H2 - desenvolvimento)
   spring.datasource.url=jdbc:h2:file:./data/usersdb
   spring.datasource.username=sa
   spring.datasource.password=
   
   # application-prod.properties (PostgreSQL - produção)
   spring.datasource.url=jdbc:postgresql://seu-host:5432/seu-banco
   spring.datasource.username=seu-usuario
   spring.datasource.password=sua-senha
   ```

3. **Executar**
   ```bash
   cd estagio
   mvn clean install
   mvn spring-boot:run
   
   # Para produção com PostgreSQL
   mvn spring-boot:run -Dspring-boot.run.profiles=prod
   ```

4. **API estará disponível em**: `http://localhost:8080`

### Frontend (Next.js)

1. **Pré-requisitos**
   - Node.js 18+
   - npm ou yarn

2. **Instalação**
   ```bash
   cd frontend
   npm install
   ```

3. **Executar**
   ```bash
   npm run dev
   ```

4. **Frontend estará disponível em**: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
estagio/
├── backend/
│   ├── src/main/java/br/mack/estagio/
│   │   ├── config/          # Configurações (Security, CORS)
│   │   ├── controllers/     # Endpoints REST
│   │   ├── entities/        # Modelos de dados
│   │   ├── repositories/    # Acesso ao banco
│   │   └── dto/            # Objetos de transferência
│   └── src/main/resources/
│       ├── application.properties
│       └── application-prod.properties
│
└── frontend/
    ├── app/
    │   ├── page.tsx          # Login
    │   ├── layout.tsx        # Layout principal
    │   ├── globals.css       # Estilos globais
    │   ├── cadastro/         # Cadastro
    │   ├── dashboard/        # Dashboard
    │   └── ranking/          # Ranking
    ├── package.json
    └── next.config.js
```

## 🔑 Endpoints Principais

### Autenticação
- `POST /auth/login` - Login de usuários

### Estudantes
- `GET /estudantes` - Listar todos
- `POST /estudantes` - Criar novo
- `PUT /estudantes/{id}` - Atualizar
- `DELETE /estudantes/{id}` - Remover
- `GET /estudantes/ranking` - Ranking por pontos
- `POST /estudantes/{id}/pontos` - Adicionar pontos

### Empresas
- `GET /empresas` - Listar todas
- `POST /empresas` - Criar nova
- `PUT /empresas/{id}` - Atualizar
- `DELETE /empresas/{id}` - Remover

### Vagas
- `GET /vagas-estagio` - Listar todas
- `GET /vagas-estagio/abertas` - Listar abertas
- `POST /vagas-estagio` - Criar nova
- `PUT /vagas-estagio/{id}` - Atualizar
- `PUT /vagas-estagio/{id}/encerrar` - Encerrar vaga
- `DELETE /vagas-estagio/{id}` - Remover

### Inscrições
- `GET /inscricoes` - Listar todas
- `POST /inscricoes` - Criar nova
- `DELETE /inscricoes/{id}` - Cancelar

### Dashboards
- `GET /dashboard/estudante/{id}` - Dashboard do estudante
- `GET /dashboard/empresa/{id}` - Dashboard da empresa
- `GET /dashboard/admin` - Dashboard administrativo

### Áreas de Interesse
- `GET /areas-interesse` - Listar todas
- `POST /areas-interesse` - Criar nova (admin)
- `PUT /areas-interesse/{id}` - Atualizar (admin)
- `DELETE /areas-interesse/{id}` - Remover (admin)

## 🎨 Fluxo de Uso

1. **Primeiro Acesso**
   - Cadastro de usuário (estudante, empresa ou admin)
   - Senhas são automaticamente criptografadas

2. **Login**
   - Escolher tipo de usuário
   - Inserir email e senha
   - Redirecionamento automático para dashboard

3. **Estudante**
   - Ver vagas recomendadas
   - Inscrever-se em vagas (+5 pontos)
   - Ver ranking de pontos
   - Ganhar badges automáticas

4. **Empresa**
   - Criar vagas de estágio
   - Ver inscrições recebidas
   - Encerrar vagas

5. **Administrador**
   - Ver estatísticas gerais
   - Gerenciar áreas de interesse
   - Acompanhar métricas do portal

## 🔒 Segurança

- Senhas criptografadas com BCrypt
- CORS configurado para localhost:3000
- Validações no backend e frontend
- Controle de unicidade (CPF, CNPJ, email)

## 📝 Dependências Principais

### Backend
- Spring Boot 3.5.7
- Spring Data JPA
- Spring Security
- PostgreSQL Driver
- H2 Database
- Lombok
- Validation

### Frontend
- Next.js 14
- React 18
- Axios
- TypeScript

## 🐛 Troubleshooting

### Erro de CORS
Verifique se o frontend está rodando em `http://localhost:3000`

### Erro de conexão com banco
- Para H2: os dados ficam em `./data/usersdb.mv.db`
- Para PostgreSQL: verifique as credenciais em `application-prod.properties`

### Erro "Área não encontrada"
Cadastre áreas de interesse antes de criar vagas ou estudantes

## 📚 Melhorias Futuras

- [ ] Upload de currículo (PDF)
- [ ] Chat entre empresa e candidato
- [ ] Sistema de avaliações
- [ ] Notificações por email
- [ ] Filtros avançados de busca
- [ ] Modo escuro/claro

## 👥 Autores

Projeto desenvolvido para a disciplina de Linguagem de Programação 2

## 📄 Licença

Este projeto é acadêmico e está sob supervisão do professor responsável.