// Controller para gerenciar operações relacionadas a Empresas.
// Fornece endpoints para CRUD de empresas, incluindo validações de unicidade de CNPJ e email,
// criptografia de senha.
package br.mack.estagio.controllers;

import br.mack.estagio.entities.Empresa;
import br.mack.estagio.repositories.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Retorna uma lista de todas as empresas cadastradas.
    @GetMapping
    public List<Empresa> getAll() {
        return empresaRepository.findAll();
    }

    // Cria uma nova empresa. Valida unicidade de CNPJ e email, criptografa a senha.
    @PostMapping
    public Empresa create(@RequestBody Empresa empresa) {
        // Validação de unicidade: CNPJ
        if (empresaRepository.findByCnpj(empresa.getCnpj()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CNPJ já cadastrado.");
        }
        // Validação de unicidade: Email
        if (empresaRepository.findByEmail(empresa.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado.");
        }
        empresa.setSenha(passwordEncoder.encode(empresa.getSenha()));
        return empresaRepository.save(empresa);
    }

    // Atualiza uma empresa existente. Valida unicidade de CNPJ e email, criptografa a senha se fornecida.
    @PutMapping("/{id}")
    public Empresa update(@PathVariable Long id, @RequestBody Empresa empresa) {
        empresa.setId(id);
        Empresa existing = empresaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada."));
        if (!existing.getCnpj().equals(empresa.getCnpj()) && empresaRepository.findByCnpj(empresa.getCnpj()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CNPJ já cadastrado.");
        }
        if (!existing.getEmail().equals(empresa.getEmail()) && empresaRepository.findByEmail(empresa.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado.");
        }
        // Criptografar senha se fornecida
        if (empresa.getSenha() != null && !empresa.getSenha().isEmpty()) {
            empresa.setSenha(passwordEncoder.encode(empresa.getSenha()));
        } else {
            empresa.setSenha(existing.getSenha());
        }
        return empresaRepository.save(empresa);
    }

    // Deleta uma empresa pelo ID.
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        empresaRepository.deleteById(id);
    }
}
