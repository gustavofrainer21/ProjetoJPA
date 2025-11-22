'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './meu-perfil-empresa.module.css';

interface Empresa {
    id: number;
    nome: string;
    email: string;
    telefone?: string;
    cnpj: string;
    endereco: string;
    descricao?: string;
}

export default function MeuPerfilEmpresaPage() {
    const router = useRouter();
    const [empresa, setEmpresa] = useState<Empresa | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        descricao: ''
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
            return;
        }

        const userObj = JSON.parse(user);
        if (userObj.role !== 'empresa') {
            router.push('/dashboard');
            return;
        }

        const fetchEmpresa = async () => {
            try {
                const token = localStorage.getItem('token');

                // Buscar dados da empresa
                const response = await fetch(`/api/empresas/${userObj.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Erro ao carregar perfil');
                }

                const data = await response.json();
                setEmpresa(data);
                setFormData({
                    nome: data.nome,
                    telefone: data.telefone || '',
                    endereco: data.endereco || '',
                    descricao: data.descricao || ''
                });
            } catch (err) {
                setError('Erro ao carregar seu perfil');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmpresa();
    }, [router]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        if (!formData.nome.trim()) {
            alert('Nome é obrigatório');
            return;
        }

        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            const response = await fetch(`/api/empresas/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome: formData.nome,
                    telefone: formData.telefone,
                    endereco: formData.endereco,
                    descricao: formData.descricao
                })
            });

            if (response.ok) {
                const updatedEmpresa = await response.json();
                setEmpresa(updatedEmpresa);
                setEditing(false);
                alert('Perfil atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar perfil');
            }
        } catch (err) {
            alert('Erro ao salvar perfil');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <p>Carregando perfil...</p>
            </div>
        );
    }

    if (error || !empresa) {
        return (
            <div className={styles.container}>
                <p className={styles.error}>{error || 'Erro ao carregar perfil'}</p>
                <Link href="/dashboard" className={styles.backBtn}>← Voltar</Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link href="/dashboard" className={styles.backBtn}>← Voltar</Link>

            <div className={styles.perfilCard}>
                <div className={styles.header}>
                    <h1>Perfil da Empresa</h1>
                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className={styles.editBtn}
                        >
                            ✏️ Editar
                        </button>
                    )}
                </div>

                {editing ? (
                    <div className={styles.formContainer}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">Razão Social *</label>
                            <input
                                id="nome"
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email (não editável)</label>
                            <input
                                id="email"
                                type="email"
                                value={empresa.email}
                                disabled
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="cnpj">CNPJ (não editável)</label>
                            <input
                                id="cnpj"
                                type="text"
                                value={empresa.cnpj}
                                disabled
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="telefone">Telefone</label>
                            <input
                                id="telefone"
                                type="tel"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleInputChange}
                                placeholder="(XX) XXXXX-XXXX"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="endereco">Endereço</label>
                            <input
                                id="endereco"
                                type="text"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleInputChange}
                                placeholder="Ex: Rua..., Cidade, Estado"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="descricao">Descrição da Empresa</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleInputChange}
                                placeholder="Descreva sobre sua empresa..."
                                className={styles.textarea}
                                rows={4}
                            />
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className={styles.saveBtn}
                            >
                                {saving ? 'Salvando...' : '✅ Salvar Alterações'}
                            </button>
                            <button
                                onClick={() => setEditing(false)}
                                className={styles.cancelBtn}
                            >
                                ❌ Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.viewContainer}>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Razão Social:</span>
                            <span className={styles.value}>{empresa.nome}</span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.label}>Email:</span>
                            <span className={styles.value}>{empresa.email}</span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.label}>CNPJ:</span>
                            <span className={styles.value}>{empresa.cnpj}</span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.label}>Telefone:</span>
                            <span className={styles.value}>{empresa.telefone || 'Não informado'}</span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.label}>Endereço:</span>
                            <span className={styles.value}>{empresa.endereco || 'Não informado'}</span>
                        </div>

                        {empresa.descricao && (
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Descrição:</span>
                                <span className={styles.value}>{empresa.descricao}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
