export interface Config {
  id: number;
  verticalSweeper: boolean;
  columnLocker: boolean;
  horizontalSweeper: boolean;
}

class LoginService {

  public async save(poder: string, novoValor: boolean): Promise<boolean> {
    try {
      if(poder == 'verticalSweeper')
        poder = 'vertical';
      else if(poder =='horizontalSweeper')
        poder = 'horizontal';
      else if(poder == 'columnLocker')
        poder = 'column';

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/configuracao?poder=${poder}&novoValor=${novoValor}`;

        const response = await fetch(apiUrl, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Falha ao cadastrar a config");
        }

        return true;
    } catch (error) {
        console.error("Erro ao cadastrar a config na API:", error);
        return false;
    }
  }

  public async getConfig(): Promise<Config | null> {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/configuracao`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar as configs");
      }

      const data = await response.json();
      
      if (data) {
        var config = data as Config;
        return config;
      }

      return null;
    } catch (error) {
      console.error("Erro ao buscar as configs da API:", error);
      return null;
    }
  }
}

export default LoginService;
