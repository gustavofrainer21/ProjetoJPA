'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './vaga.module.css';

interface Avaliacao {
    id: number;
    nota: number;
    comentario: string;
    estudante: { nome: string };
    dataAvaliacao: string;
}

interface Vaga {
    id: number;
    titulo: string;
    descricao: string;
    localizacao: string;
    modalidade: string;
    cargaHoraria: number;
    requisitos: string;
    empresa: { id: number; nome: string };
    aberta: boolean;
}

export default function VagaDetalhePage() {
    const params = useParams();
    const vagaId = params.id as string;
    const router = useRouter();

    const [vaga, setVaga] = useState<Vaga | null>(null);
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
    const [media, setMedia] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState('');
    const [avaliando, setAvaliando] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchVagaEAvaliacoes = async () => {
            try {
                const userObj = JSON.parse(user);
                
                // Buscar vaga (seria ideal ter endpoint específico)
                const response = await fetch(`http://localhost:8080/api/vagas-estagio/${vagaId}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const vagaData = await response.json();
                setVaga(vagaData);

                // Buscar avaliações e estatísticas
                const statsResponse = await fetch(`http://localhost:8080/api/avaliacoes/vaga/${vagaId}/estatisticas`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const statsData = await statsResponse.json();
                setAvaliacoes(statsData.avaliacoes);
                setMedia(statsData.mediaNotas || 0);
            } catch (err) {
                setError('Erro ao carregar vaga');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVagaEAvaliacoes();
    }, [vagaId, router]);

    const handleAvaliacao = async (e: React.FormEvent) => {
        e.preventDefault();
        setAvaliando(true);

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const response = await fetch('http://localhost:8080/api/avaliacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    estudante: { id: user.id },
                    vaga: { id: parseInt(vagaId) },
                    nota,
                    comentario
                })
            });

            if (response.ok) {
                setNota(5);
                setComentario('');
                // Recarregar avaliações
                const statsResponse = await fetch(`http://localhost:8080/api/avaliacoes/vaga/${vagaId}/estatisticas`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const statsData = await statsResponse.json();
                setAvaliacoes(statsData.avaliacoes);
                setMedia(statsData.mediaNotas || 0);
            } else {
                alert('Erro ao enviar avaliação');
            }
        } catch (err) {
            alert('Erro ao enviar avaliação');
            console.error(err);
        } finally {
            setAvaliando(false);
        }
    };

    if (loading) return <div className={styles.container}><p>Carregando...</p></div>;
    if (error || !vaga) return <div className={styles.container}><p className={styles.error}>{error || 'Vaga não encontrada'}</p></div>;

    return (
        <div className={styles.container}>
            <Link href="/vagas" className={styles.backBtn}>← Voltar para Vagas</Link>

            <div className={styles.vagaDetalhes}>
                <h1 className={styles.titulo}>{vaga.titulo}</h1>
                <div className={styles.empresa}>
                    <strong>Empresa:</strong> {vaga.empresa.nome}
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <strong>📍 Local:</strong> {vaga.localizacao}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>🏢 Modalidade:</strong> {vaga.modalidade}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>⏰ Carga Horária:</strong> {vaga.cargaHoraria}h/semana
                    </div>
                    <div className={styles.infoItem}>
                        <strong>📋 Requisitos:</strong> {vaga.requisitos}
                    </div>
                </div>

                <div className={styles.descricaoBox}>
                    <h3>Descrição</h3>
                    <p>{vaga.descricao}</p>
                </div>
            </div>

            <div className={styles.avaliacoesContainer}>
                <div className={styles.avaliacoesTitulo}>
                    <h2>Avaliações de Ex-Estagiários</h2>
                    <div className={styles.mediaBox}>
                        <div className={styles.nota}>{media.toFixed(1)}</div>
                        <div className={styles.stars}>
                            {'⭐'.repeat(Math.round(media))}
                        </div>
                        <small>{avaliacoes.length} avaliações</small>
                    </div>
                </div>

                <form onSubmit={handleAvaliacao} className={styles.avaliacaoForm}>
                    <h3>Deixe sua avaliação</h3>
                    
                    <div className={styles.inputGroup}>
                        <label>Nota (1-5 estrelas)</label>
                        <div className={styles.notaInput}>
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    className={`${styles.estrela} ${nota >= n ? styles.ativo : ''}`}
                                    onClick={() => setNota(n)}
                                >
                                    ⭐
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="comentario">Comentário (opcional)</label>
                        <textarea
                            id="comentario"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Compartilhe sua experiência..."
                            maxLength={500}
                            rows={4}
                            className={styles.textarea}
                        />
                        <small>{comentario.length}/500</small>
                    </div>

                    <button type="submit" disabled={avaliando} className={styles.submitBtn}>
                        {avaliando ? 'Enviando...' : 'Enviar Avaliação'}
                    </button>
                </form>

                <div className={styles.avaliacoesList}>
                    {avaliacoes.length === 0 ? (
                        <p className={styles.noAvaliacoes}>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
                    ) : (
                        avaliacoes.map((av) => (
                            <div key={av.id} className={styles.avaliacaoItem}>
                                <div className={styles.avaliacaoHeader}>
                                    <strong>{av.estudante.nome}</strong>
                                    <div className={styles.nota_estrelas}>
                                        {'⭐'.repeat(av.nota)}
                                        <span className={styles.notaNumero}>({av.nota}/5)</span>
                                    </div>
                                </div>
                                <p className={styles.comentario_text}>{av.comentario}</p>
                                <small className={styles.data}>
                                    {new Date(av.dataAvaliacao).toLocaleDateString('pt-BR')}
                                </small>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
