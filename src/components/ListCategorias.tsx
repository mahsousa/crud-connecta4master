import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CategoriaService, { Categoria } from "@/services/category-service";

interface ListCategoriasProps {
  listCategory: Categoria[] | null;
}

const ListCategorias: React.FC<ListCategoriasProps> = ({ listCategory }) => {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaToDelete, setCategoriaToDelete] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Atualiza o estado 'categorias' com 'listCategory' sempre que 'listCategory' muda
    if (listCategory) {
      setCategorias(listCategory);
    }
  }, [listCategory]);

  const handleEditarCategoria = (id: number) => {
    router.push(`/editar-categoria/${id}`);
  };

  const handleDeleteConfirmation = (id: number) => {
    setCategoriaToDelete(id); // Define a categoria a ser deletada
  };

  const handleCancelarDelete = () => {
    setCategoriaToDelete(null); // Limpa a categoria a ser deletada
  };

  const handleConfirmarDelete = async () => {
    if (categoriaToDelete !== null) {
      try {
        var categoriaService = new CategoriaService();
        var success = await categoriaService.delete(categoriaToDelete);
        if (!success) {
          throw new Error("Falha ao deletar a categoria");
        }
        // Remova a categoria da lista após deletar com sucesso
        setCategorias((prevCategorias) =>
          prevCategorias.filter(
            (categoria) => categoria.id !== categoriaToDelete
          )
        );
        setCategoriaToDelete(null); // Limpa a categoria a ser deletada
      } catch (error) {
        console.error("Erro ao deletar a categoria:", error);
      }
    }
  };

  const getDetailUrl = (idCategoria: number) => {
    return "/categoria/" + idCategoria;
  };

  return (
    <div className="container-fluid w-100 py-10">
      <div className="flex bg-white rounded-l-lg border-black">
        <div className="w-full">
          <ul role="list" className="divide-y divide-gray-100 w-full">
            {categorias.map((categoria) => (
              <li
                key={categoria.id}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <a href={getDetailUrl(categoria.id)}>
                      <p className="text-sm font-semibold leading-6 text-darkpurple-600">
                        {categoria.nome}
                      </p>
                    </a>
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <button
                    className="px-4 py-2 text-sm text-white bg-greenwhite-300 rounded hover:bg-blue-600"
                    onClick={() =>
                      (window.location.href = getDetailUrl(categoria.id))
                    }
                  >
                  Detalhes
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => handleEditarCategoria(categoria.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleDeleteConfirmation(categoria.id)}
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal de confirmação */}
      {categoriaToDelete !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Tem certeza que deseja excluir esta categoria?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 mr-4"
                onClick={handleConfirmarDelete}
              >
                Confirmar
              </button>
              <button
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleCancelarDelete}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCategorias;
