package br.mack.estagio.repositories;

import br.mack.estagio.entities.Empresa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByCnpj(String cnpj);
    Optional<Empresa> findByEmail(String email);
    List<Empresa> findByAreasAtuacao_NomeContaining(String area);
    long count();
}
