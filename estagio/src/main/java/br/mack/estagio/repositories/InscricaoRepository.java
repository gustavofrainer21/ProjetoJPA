package br.mack.estagio.repositories;

import br.mack.estagio.entities.Estudante;
import br.mack.estagio.entities.Inscricao;
import br.mack.estagio.entities.VagaEstagio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
    List<Inscricao> findByEstudanteId(Long estudanteId);
    List<Inscricao> findByVagaId(Long vagaId);
    boolean existsByEstudanteIdAndVagaId(Long estudanteId, Long vagaId);
    Optional<Inscricao> findByEstudanteAndVaga(Estudante estudante, VagaEstagio vaga);
    List<Inscricao> findByVaga_Empresa_Id(Long empresaId);
}
