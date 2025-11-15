// Controller para autenticação de usuários.
// Suporta login para estudantes, empresas e administradores com verificação de senha criptografada.
package br.mack.estagio.controllers;

import br.mack.estagio.dto.LoginRequest;
import br.mack.estagio.dto.LoginResponse;
import br.mack.estagio.entities.Administrador;
import br.mack.estagio.entities.Empresa;
import br.mack.estagio.entities.Estudante;
import br.mack.estagio.repositories.AdministradorRepository;
import br.mack.estagio.repositories.EmpresaRepository;
import br.mack.estagio.repositories.EstudanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private EstudanteRepository estudanteRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Endpoint de login que verifica credenciais e retorna token e informações do usuário.
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        String email = request.getEmail();
        String senha = request.getSenha();
        String role = request.getRole();

        // Verifica credenciais baseado no tipo de usuário
        switch (role.toLowerCase()) {
            case "estudante":
                Estudante estudante = estudanteRepository.findByEmail(email)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas"));
                if (!passwordEncoder.matches(senha, estudante.getSenha())) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas");
                }
                return new LoginResponse(UUID.randomUUID().toString(), role, estudante.getId(), estudante.getNome());

            case "empresa":
                Empresa empresa = empresaRepository.findByEmail(email)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas"));
                if (!passwordEncoder.matches(senha, empresa.getSenha())) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas");
                }
                return new LoginResponse(UUID.randomUUID().toString(), role, empresa.getId(), empresa.getNome());

            case "admin":
                Administrador admin = administradorRepository.findByEmail(email)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas"));
                if (!passwordEncoder.matches(senha, admin.getSenha())) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas");
                }
                return new LoginResponse(UUID.randomUUID().toString(), role, admin.getId(), admin.getNome());

            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de usuário inválido");
        }
    }
}
