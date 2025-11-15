"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './register.module.css';

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = ({ id, label, type, value, onChange, required = false }: InputProps) => (
    <div className={styles.inputGroup}>
        <label htmlFor={id} className={styles.inputLabel}>
            {label}
        </label>
        <div className={styles.inputWrapper}>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className={styles.inputField}
                placeholder={`Digite seu ${label.toLowerCase()}`}
            />
        </div>
    </div>
);

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        role: 'estudante'
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.senha !== formData.confirmarSenha) {
            setError('As senhas não coincidem.');
            setLoading(false);
            return;
        }

        try {
            // TODO: Implementar chamada para API de registro
            console.log('Dados do registro:', formData);

            // Simulação de registro bem-sucedido
            setTimeout(() => {
                router.push('/login?message=Conta criada com sucesso! Faça login.');
            }, 1000);
        } catch (err) {
            setError('Falha ao criar conta. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        Criar conta
                    </h1>
                    <p className={styles.subtitle}>Portal de Estágios Mackenzie</p>
                </header>

                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="role" className={styles.inputLabel}>
                            Tipo de Usuário
                        </label>
                        <div className={styles.selectWrapper}>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={styles.selectField}
                            >
                                <option value="estudante">🎓 Estudante</option>
                                <option value="empresa">🏢 Empresa</option>
                            </select>
                            <div className={styles.selectIcon}>▼</div>
                        </div>
                    </div>

                    <Input id="nome" label="Nome Completo" type="text" value={formData.nome} onChange={handleChange} required />
                    <Input id="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
                    <Input id="senha" label="Senha" type="password" value={formData.senha} onChange={handleChange} required />
                    <Input id="confirmarSenha" label="Confirmar Senha" type="password" value={formData.confirmarSenha} onChange={handleChange} required />

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`${styles.button} ${styles.buttonPrimary}`}
                    >
                        {loading ? (
                            <>
                                <span className={styles.buttonText}>Criar Conta</span>
                                <div className={styles.spinner}></div>
                            </>
                        ) : (
                            'Criar Conta'
                        )}
                    </button>
                </form>

                <div className={styles.footer}>
                    <Link href="/login" className={styles.footerLink}>
                        Já tem conta? Entrar
                    </Link>
                </div>
            </div>
        </div>
    );
}
