'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>🎓</div>
        <h1 className={styles.headerTitle}>
          Portal de Estágios
        </h1>
        <p className={styles.headerSubtitle}>
          Conectando estudantes e empresas para oportunidades de estágio
        </p>
      </header>

      <main className={styles.main}>
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutTitle}>Sobre o Portal</h2>
          <p className={styles.aboutText}>
            Bem-vindo ao Portal de Estágios da Universidade Presbiteriana Mackenzie.
            Aqui você pode encontrar oportunidades de estágio, gerenciar inscrições e muito mais.
          </p>
        </section>

        <section className={styles.howItWorksSection}>
          <h2 className={styles.howItWorksTitle}>Como Funciona</h2>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🎓</div>
              <h3 className={styles.cardTitle}>Para Estudantes</h3>
              <p className={styles.cardText}>Cadastre-se, explore vagas disponíveis e candidate-se às oportunidades que mais se adequam ao seu perfil.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🏢</div>
              <h3 className={styles.cardTitle}>Para Empresas</h3>
              <p className={styles.cardText}>Publique vagas de estágio, receba inscrições e encontre os melhores talentos para sua equipe.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>⚙️</div>
              <h3 className={styles.cardTitle}>Para Administradores</h3>
              <p className={styles.cardText}>Gerencie usuários, vagas e inscrições para manter o portal funcionando perfeitamente.</p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Comece Agora</h2>
          <div className={styles.ctaButtons}>
            <Link href="/login" className={styles.ctaButtonPrimary}>Login</Link>
            <Link href="/register" className={styles.ctaButtonSecondary}>Cadastrar-se</Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>&copy; 2025 Universidade Presbiteriana Mackenzie. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
