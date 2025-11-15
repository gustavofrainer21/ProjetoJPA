package br.mack.estagio.dto;

// DTO para resposta de login.
public class LoginResponse {
    private String token;
    private String role;
    private Long id;
    private String nome;

    public LoginResponse() {}

    public LoginResponse(String token, String role, Long id, String nome) {
        this.token = token;
        this.role = role;
        this.id = id;
        this.nome = nome;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
