"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('isAuthenticated', 'false');
    router.push('/login'); // Redirecione para a página de login após logout
  }, [router]);

  return (
    <div>
      Saindo...
    </div>
  );
};

export default LogoutPage;
