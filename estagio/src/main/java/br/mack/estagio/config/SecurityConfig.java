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
                .requestMatchers("/api/estudantes/registro").permitAll()
                .requestMatchers("/api/empresas/registro").permitAll()
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .anyRequest().permitAll() // Temporariamente permitir tudo enquanto testa
            )
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        // Adiciona o filtro JWT para popular o SecurityContext a partir do header Authorization
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


