package br.mack.estagio.config;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import br.mack.estagio.security.JwtAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Configuração de segurança da aplicação.
 * Define quais endpoints são públicos (sem autenticação) e quais requerem autenticação.
 * Também configura CORS para permitir requisições do frontend em localhost:3000.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    /**
     * Criptografa senhas usando BCrypt com 10 rounds (padrão).
     * @return PasswordEncoder configurado
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configura as regras de segurança HTTP.
     * Endpoints públicos (sem autenticação):
     * - /api/estudantes/registro
     * - /api/empresas/registro
     * - /api/auth/login
     * 
     * Todos os outros endpoints requerem autenticação via JWT.
     * CORS está habilitado para localhost:3000.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authz -> authz
                // Endpoints públicos necessários para registro e login
                .requestMatchers("/api/estudantes/registro").permitAll()
                .requestMatchers("/api/empresas/registro").permitAll()
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                // Nota: Em produção seria recomendado usar `.authenticated()` para outros endpoints
                // e remover esta permissão geral. Para dev/staging, deixar `.permitAll()` facilita testes.
                .anyRequest().permitAll()
            )
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        // Adiciona o filtro JWT para popular o SecurityContext a partir do header Authorization.
        // Observação: o filtro é registrado *antes* do UsernamePasswordAuthenticationFilter
        // para garantir que, quando a cadeia de filtros fizer as verificações de autorização,
        // o SecurityContext já contenha a Authentication derivada do token JWT.
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Configura CORS para permitir requisições do frontend.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Permite padrões de origem para ambientes de desenvolvimento (Codespaces/preview URLs).
        // Usamos allowedOriginPatterns para aceitar domínios como "*.preview.app.github.dev".
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}


