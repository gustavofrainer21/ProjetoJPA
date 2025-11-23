'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin-usuarios.module.css';

interface Usuario {
  id: number;
  username: string;
  role: string;
}

export default function AdminUsuariosPage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!userStr || !token) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== 'admin' && user.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    fetchUsuarios(token);
  }, [router]);

  const fetchUsuarios = async (token: string) => {
    try {
      const res = await fetch('/api/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erro ao buscar usuários');
      const data = await res.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Remover este usuário? Esta ação é irreversível.')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erro ao deletar usuário');
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      setError('Falha ao remover usuário');
    }
  };

  if (loading) return <div className={styles.container}><p>Carregando usuários...</p></div>;

  return (
    <div className={styles.container}>
      <h1>Gerenciar Usuários</h1>
      {error && <div className={styles.error}>{error}</div>}

      {usuarios.length === 0 ? (
        <div className={styles.empty}>Nenhum usuário encontrado</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.rowHeader}>
            <div>Nome de usuário</div>
            <div>Role</div>
            <div>Ações</div>
          </div>
          {usuarios.map((u) => (
            <div key={u.id} className={styles.row}>
              <div>{u.username}</div>
              <div>{u.role}</div>
              <div>
                <button className={styles.deleteBtn} onClick={() => handleDelete(u.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
