import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../../components/Sidebar";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoriaService, { Categoria } from "@/services/category-service";

const DetalhesDaCategoriaPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string }; // Acessa o parâmetro 'id' da URL
  const [categoria, setCategoria] = useState<Categoria | null>(null); // Estado para armazenar os detalhes do produto
  const categoriaService = new CategoriaService();

  // Função para buscar os detalhes da categoria
  const fetchCategoria = async (categoriaId: string) => {
    try {
      var categoria = await categoriaService.getById(parseInt(categoriaId));
      if (!categoria) {
        throw new Error("Erro ao buscar a categoria");
      }
      setCategoria(categoria);
    } catch (error) {
      console.error("Erro ao buscar a categoria:", error);
    }
  };

  // Chamada da função fetchProduct quando o 'id' é alterado
  useEffect(() => {
    if (id) {
      fetchCategoria(id);
    }
  }, [id]);

  // Caso em que 'id' ainda não está disponível
  if (!categoria) {
    return <p>Carregando...</p>;
  }

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Detalhes da Categoria
        </h2>
        <div className="py-5">
          <p className="font-semibold leading-6 text-darkpurple-600">
            ID da Categoria: {categoria.id}
          </p>
          <p className="font-semibold leading-6 text-darkpurple-600">
            NOME da Categoria: {categoria.nome}
          </p>
        </div>
        <div className="py-5">
          <h3>Itens relacionados com a Categoria:</h3>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-100 w-full ">
            {categoria.itensDaLoja?.map((item) => (
              <li
                key={item.id}
                className="text-sm font-semibold leading-6 text-darkpurple-600"
              >
                <div className="flex min-w-0 gap-x-4 items-center py-5">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={item.imagem}
                    alt=""
                  />
                  <p className="text-sm font-semibold leading-6 text-darkpurple-600">
                    <span className="font-semibold text-sm text-whitebrown-300">
                      Nome do item:{" "}
                    </span>
                    <span className="text-gray-500 text-sm">{item.nome}</span>
                  </p>
                  <p className="text-sm font-semibold leading-6 text-darkpurple-600">
                    <span className="font-semibold text-sm text-whitebrown-300">
                      Tipo do Item:{" "}
                    </span>
                    <span className="text-gray-500 text-sm">{item.tipo}</span>
                  </p>
                  <p className="text-sm font-semibold leading-6 text-darkpurple-600">
                    <span className="font-semibold text-sm text-whitebrown-300">
                      Preco do Item:{" "}
                    </span>
                    <span className="text-gray-500 text-sm">{item.preco}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BaseLayout>
  );
};

export default DetalhesDaCategoriaPage;
