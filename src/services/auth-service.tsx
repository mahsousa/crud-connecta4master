export interface Usuario {
  id: number;
  usuario: string;
}

export const isAuthenticated = (): boolean => {
  const isAuthenticatedString = localStorage.getItem('isAuthenticated');
  return isAuthenticatedString === 'true';
};

class AuthService {

  public async login(usuario: string, senha: string): Promise<Usuario | null> {// TODO Substituir por método que cadastra categoria junto com item vindo da api
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin`;
      const jsonData = {
        usuario: usuario,
        senha: senha
      };

      const response = await fetch(
        apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      
      if (!response.ok) {
        throw new Error("Usuário e/ou senha inválido");
      }

      const data = await response.json();

      return data as Usuario;
    } catch (error) {
      console.error("Aconteceu um erro inesperado ao tentar autenticar usuário:", error);
      return null;
    }
  }

}

export default AuthService;