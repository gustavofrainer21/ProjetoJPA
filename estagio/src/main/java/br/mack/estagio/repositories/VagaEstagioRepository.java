package br.mack.estagio.repositories;

import br.mack.estagio.entities.AreaInteresse;
import br.mack.estagio.entities.Empresa;
import br.mack.estagio.entities.VagaEstagio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VagaEstagioRepository extends JpaRepository<VagaEstagio, Long> {
    List<VagaEstagio> findByArea(AreaInteresse area);
    List<VagaEstagio> findByAbertaTrue();
    List<VagaEstagio> findByAbertaFalse();
    List<VagaEstagio> findByEmpresa(Empresa empresa);
    List<VagaEstagio> findByEmpresa_Id(Long empresaId);
    List<VagaEstagio> findByAreaInAndAbertaTrue(List<AreaInteresse> areas);
    List<VagaEstagio> findByAreaInAndAbertaTrueOrderByIdDesc(List<AreaInteresse> areas);
    long countByAbertaTrue();
    long countByAbertaFalse();
    @Query("SELECT a.nome, COUNT(v) FROM VagaEstagio v JOIN v.area a GROUP BY a.id, a.nome")
    List<Object[]> countVagasByArea();
}
