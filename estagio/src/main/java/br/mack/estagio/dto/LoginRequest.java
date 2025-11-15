package br.mack.estagio.dto;

// DTO para requisição de login.
public class LoginRequest {
    private String email;
    private String senha;
    private String role;

    public LoginRequest() {}

    public LoginRequest(String email, String senha, String role) {
        this.email = email;
        this.senha = senha;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
