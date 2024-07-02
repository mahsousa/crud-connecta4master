import { Item } from "./product-service";

export interface Moeda {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  quantidade: number;
}

class CoinService {

  public async search(text: string): Promise<Moeda[]> {
    try {
      const apiUrl = text && text.length > 0
        ? `${process.env.NEXT_PUBLIC_API_URL}/moedas/search/${text}`
        : `${process.env.NEXT_PUBLIC_API_URL}/moedas`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar as moedas");
      }

      const data = await response.json();
      
      if (data) {
        var moedas = data as Moeda[];
        return moedas;
      }

      return [];
    } catch (error) {
      console.error("Erro ao buscar as moedas da API:", error);
      return [];
    }
  }

  public async getById(id : number): Promise<Moeda | null> {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/moedas/${id}`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar as moedas");
      }

      const data = await response.json();
      
      if (data) {
        var moeda = data as Moeda;
        return moeda;
      }

      return null;
    } catch (error) {
      console.error("Erro ao buscar as moedas da API:", error);
      return null;
    }
  }

  public async save(name: string, price: number, amount: number, image: File): Promise<boolean> {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/moedas`;

        // Criar um novo FormData
        const formData = new FormData();
        formData.append("nome", name);
        formData.append("preco", price.toString());
        formData.append("quantidade", amount.toString());
        formData.append("imagem", image);

        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData, // Enviar o FormData em vez de JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error("Falha ao cadastrar a moeda");
        }

        return true;
    } catch (error) {
        console.error("Erro ao cadastrar a moeda na API:", error);
        return false;
    }
  }

  public async update(id: number, name: string, amount: number, price: number, image: File | null): Promise<boolean> {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/moedas/${id}`; // Incluir o ID na URL

        // Criar um novo FormData
        const formData = new FormData();
        formData.append("nome", name);
        formData.append("preco", price.toString());
        formData.append("quantidade", amount.toString());

        if(image){
          formData.append("imagem", image);
        }

        const response = await fetch(apiUrl, {
            method: "PUT", // Usar método PUT para atualização
            body: formData, // Enviar o FormData em vez de JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error("Falha ao atualizar a moeda");
        }

        return true;
    } catch (error) {
        console.error("Erro ao atualizar a moeda na API:", error);
        return false;
    }
  } 

  public async delete(id : number): Promise<boolean> {// TODO Substituir por método que cadastra categoria junto com item vindo da api
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/moedas/${id}`;

      const response = await fetch(
        apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Falha ao apagar a categoria");
      }
      return true;
    } catch (error) {
      console.error("Erro ao apagar a categoria da API:", error);
      return false;
    }
  }
}

export default CoinService;
