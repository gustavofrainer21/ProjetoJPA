package br.mack.estagio.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class VagaEstagio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Título é obrigatório")
    @Size(min = 5, max = 100, message = "Título deve ter entre 5 e 100 caracteres")
    private String titulo;

    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 10, max = 500, message = "Descrição deve ter entre 10 e 500 caracteres")
    private String descricao;

    @NotNull(message = "Área é obrigatória")
    @ManyToOne
    @JoinColumn(name = "area_id")
    private AreaInteresse area;

    @NotBlank(message = "Localização é obrigatória")
    @Size(min = 2, max = 100, message = "Localização deve ter entre 2 e 100 caracteres")
    private String localizacao;

    @NotBlank(message = "Modalidade é obrigatória")
    @Pattern(regexp = "REMOTO|PRESENCIAL|HIBRIDO", message = "Modalidade deve ser REMOTO, PRESENCIAL ou HIBRIDO")
    private String modalidade; // e.g., REMOTO, PRESENCIAL, HIBRIDO

    @Min(value = 1, message = "Carga horária deve ser pelo menos 1 hora")
    private int cargaHoraria;

    @NotBlank(message = "Requisitos são obrigatórios")
    @Size(min = 5, max = 500, message = "Requisitos devem ter entre 5 e 500 caracteres")
    private String requisitos;

    private boolean aberta = true; // Default to open

    @NotNull(message = "Empresa é obrigatória")
    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;
}
