import axios from 'axios';
import { LoginCredentials, LoginResponse } from '../types/auth';

const API_URL = 'http://localhost:8080/api/auth'; // URL do seu backend

/**
 * Função para realizar o login do usuário.
 * @param credentials - O email e a senha do usuário.
 * @returns Uma promessa que resolve com os dados da resposta (token e usuário).
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        // Lança o erro para que o componente possa tratá-lo
        console.error("Erro no serviço de login:", error);
        throw error;
    }
};
