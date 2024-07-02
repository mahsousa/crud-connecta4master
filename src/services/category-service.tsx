import { Item } from "./product-service";

export interface Categoria {
  id: number;
  nome: string;
  itensDaLoja: Item[] | null;
}

class CategoriaService {

  public async search(text: string): Promise<Categoria[]> {
    try {
      const apiUrl = text && text.length > 0
        ? `${process.env.NEXT_PUBLIC_API_URL}/categorias/search/${text}`
        : `${process.env.NEXT_PUBLIC_API_URL}/categorias`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar as categorias");
      }

      const data = await response.json();
      
      if (data) {
        var categorias = data as Categoria[];
        return categorias;
      }

      return [];
    } catch (error) {
      console.error("Erro ao buscar as categorias da API:", error);
      return [];
    }
  }

  public async getById(id : number): Promise<Categoria | null> {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/categorias/${id}`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar as categorias");
      }

      const data = await response.json();
      
      if (data) {
        var categorias = data as Categoria;
        return categorias;
      }

      return null;
    } catch (error) {
      console.error("Erro ao buscar as categorias da API:", error);
      return null;
    }
  }

  public async save(name: string, nomeItem: string, tipoItem: number, imagemItem: File, precoItem: number): Promise<boolean> {// TODO Substituir por método que cadastra categoria junto com item vindo da api
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/categorias`;
      
        // Criar um novo FormData
        const formData = new FormData();
        formData.append("nomeCategoria", name);
        formData.append("nomeItem", nomeItem);
        formData.append("tipoItem", tipoItem.toString());
        formData.append("imagemItem", imagemItem);
        formData.append("precoItem", precoItem.toString());

      const response = await fetch(
        apiUrl, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Falha ao cadastrar as categorias");
      }
      return true;
    } catch (error) {
      console.error("Erro ao cadastrar as categorias da API:", error);
      return false;
    }
  }

  public async update(categoryId : number, name: string): Promise<boolean> {// TODO Substituir por método que cadastra categoria junto com item vindo da api
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/categorias/${categoryId}`;
      const jsonData = {
        nome: name,
      };

      const response = await fetch(
        apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      
      if (!response.ok) {
        throw new Error("Falha ao buscar as categorias");
      }
      return true;
    } catch (error) {
      console.error("Erro ao buscar as categorias da API:", error);
      return false;
    }
  }

  public async delete(id : number): Promise<boolean> {// TODO Substituir por método que cadastra categoria junto com item vindo da api
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/categorias/${id}`;

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

export default CategoriaService;
