import { Categoria } from "./category-service";

export interface Item {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  tipo: string;
  categoria: Categoria;
}

class ProductService {

  public async search(text: string): Promise<Item[]> {
    try {
      const apiUrl = text && text.length > 0
        ? `${process.env.NEXT_PUBLIC_API_URL}/loja/itens/search/${text}`
        : `${process.env.NEXT_PUBLIC_API_URL}/loja/itens`;

        console.log(process.env.NODE_ENV, process.env.TZ);
      console.log(apiUrl)
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar os itens");
      }

      const data = await response.json();
      
      if (data) {
        var items = data as Item[];
        return items;
      }

      return [];
    } catch (error) {
      console.error("Erro ao buscar os itens da API:", error);
      return [];
    }
  }

  public converterTipo(tipoString : string) : number {
    switch(tipoString){
      case "AVATAR":
        return 0;
      case "TABULEIRO":
          return 1;
      case "FINALIZACAO":
        return 2;
      case "FICHA":
          return 3;
      default:
          return -1;
    }
  }

  public async getById(id : number): Promise<Item | null> {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/loja/itens/${id}`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar as categorias");
      }

      const data = await response.json();
      
      if (data) {
        var item = data as Item;
        return item;
      }

      return null;
    } catch (error) {
      console.error("Erro ao buscar as categorias da API:", error);
      return null;
    }
  }

  public async save(name: string, type: number, price: number, categoryId: number, image: File): Promise<boolean> {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/loja/itens`;

        // Criar um novo FormData
        const formData = new FormData();
        formData.append("nome", name);
        formData.append("tipo", type.toString());
        formData.append("preco", price.toString());
        formData.append("categoria", categoryId.toString());
        formData.append("imagem", image);

        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData, // Enviar o FormData em vez de JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error("Falha ao cadastrar o item");
        }

        return true;
    } catch (error) {
        console.error("Erro ao cadastrar o item na API:", error);
        return false;
    }
  }

  public async update(id: number, name: string, type: number, price: number, categoryId: number, image: File | null): Promise<boolean> {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/loja/itens/${id}`; // Incluir o ID na URL

        // Criar um novo FormData
        const formData = new FormData();
        formData.append("nome", name);
        formData.append("tipo", type.toString());
        formData.append("preco", price.toString());
        formData.append("categoria", categoryId.toString());
        
        console.log(name, type, price, categoryId, image);

        if(image){
          formData.append("imagem", image);
        }

        const response = await fetch(apiUrl, {
            method: "PUT", // Usar método PUT para atualização
            body: formData, // Enviar o FormData em vez de JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error("Falha ao atualizar o item");
        }

        return true;
    } catch (error) {
        console.error("Erro ao atualizar o item na API:", error);
        return false;
    }
  } 

  public async delete(id : number): Promise<boolean> {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/loja/itens/${id}`;

      const response = await fetch(
        apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Falha ao apagar o item");
      }
      return true;
    } catch (error) {
      console.error("Erro ao apagar o item da API:", error);
      return false;
    }
  }
}

export default ProductService;
