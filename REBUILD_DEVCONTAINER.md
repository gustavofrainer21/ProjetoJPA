# Reconstruir o Devcontainer

Se você está usando GitHub Codespaces ou VS Code com devcontainers:

## Passo 1: Abrir Command Palette
- Pressione `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (Mac)
- Digite: `Dev Containers: Rebuild Container`
- Pressione Enter

## Passo 2: Aguarde a reconstrução
- O container será reconstruído com **Java 17** + Node 18
- Isso leva ~2-3 minutos
- Os arquivos do projeto serão preservados

## Passo 3: Após rebuild, rode o backend
```bash
cd /workspaces/ProjetoJPA/estagio
mvn -DskipTests=true spring-boot:run
```

## Verificar Java 17 está ativo
```bash
java -version
# Resultado esperado: openjdk version "17.x.x" ou superior
```

---

## Alternativa: Se preferir não usar devcontainer

Se você tem Java 17+ localmente, pode rodar tudo na sua máquina (fora do container):

1. **Clonar/atualizar repositório**
```bash
git clone https://github.com/gustavofrainer21/ProjetoJPA.git
cd ProjetoJPA/estagio
```

2. **Rodar backend**
```bash
mvn -DskipTests=true spring-boot:run
```

3. **Em outro terminal, rodar frontend**
```bash
cd ProjetoJPA/estagio/frontend
npm install
npm run dev
```

4. **Abrir navegador**
```
http://localhost:3000
```

---

## Se ainda tiver dúvidas

- Backend rodando em: `http://localhost:8080/api`
- Frontend rodando em: `http://localhost:3000` (ou `3001`, `3002` se houver conflito)
- Mock server (teste temporário) em: `http://localhost:8080` (só endpoint de registro)

Qualquer erro, verifique:
- Portas: `lsof -i :8080` e `lsof -i :3000`
- Logs: `npm run dev` mostra erros no terminal
