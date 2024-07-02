"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import AuthService from '@/services/auth-service';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const authService = new AuthService();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    authService.login(username, password).then((result) => {
      if(result == null){
        setShowError(true);
        return;
      }

      router.push('/'); // Redirecione para a página principal após o login bem-sucedido
      localStorage.setItem('isAuthenticated', 'true');
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
     router.push('/'); // Redirecione para a página principal se o usuário já estiver autenticado
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-6 text-center">Login</h2>
          {showError && <div className="mb-4 text-red-600">Credenciais inválidas. Tente novamente.</div>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required
            />
          </div>
            {isLoading && <span className="text-right">Carregando...</span>}
          <div className="flex items-center justify-between">
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
