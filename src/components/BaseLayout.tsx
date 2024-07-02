"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Alteração aqui
import { isAuthenticated } from "@/services/auth-service";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function BaseLayout({ children }: Props) {
  const router = useRouter(); // Usando useRouter para acessar o roteador
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      if (!authenticated) {
        router.push("/login"); // Redireciona para a página de login se o usuário não estiver autenticado
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
      {isLoggedIn && <div className="layout">{children}</div>}
      {!isLoggedIn && (
        <span>
          <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-t-4 border-gray-400 rounded-full animate-spin"></div>
          </div>
        </span>
      )}
    </div>
  );
}
