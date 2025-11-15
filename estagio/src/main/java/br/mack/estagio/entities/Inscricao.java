package br.mack.estagio.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Inscricao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Estudante é obrigatório")
    @ManyToOne
    @JoinColumn(name = "estudante_id")
    private Estudante estudante;

    @NotNull(message = "Vaga é obrigatória")
    @ManyToOne
    @JoinColumn(name = "vaga_id")
    private VagaEstagio vaga;

    @NotNull(message = "Data de inscrição é obrigatória")
    private LocalDateTime dataInscricao = LocalDateTime.now();
}
