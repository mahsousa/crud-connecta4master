import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CoinService, { Moeda } from "@/services/coin-service";

interface ListMoedasProps {
  listMoedas: Moeda[] | null;
}

const ListMoedas: React.FC<ListMoedasProps> = ({ listMoedas }) => {
  const router = useRouter();
  const [moedas, setMoedas] = useState<Moeda[]>([]);
  const [moedasToDelete, setMoedasToDelete] = useState<number | null>(null);

  const coinService = new CoinService();

  useEffect(() => {
    console.log(listMoedas);
    if (listMoedas) {
      setMoedas(listMoedas);
    }
  }, [listMoedas]);

  const handleEditMoedas = (id: number) => {
    router.push(`/editar-moedas/${id}`);
  };

  const handleDeleteConfirmMoedas = (id: number) => {
    setMoedasToDelete(id);
  };

  const handleCancelDelete = () => {
    setMoedasToDelete(null);
  };

  const handleConfirmarDelete = async () => {
    if (moedasToDelete !== null) {
      try {
        const isSuccess = coinService.delete(moedasToDelete);

        if (!isSuccess) {
          throw new Error("Falha ao deletar a moeda");
        }

        // Remova o produto da lista após deletar com sucesso
        setMoedas((prevMoedas) =>
          prevMoedas.filter((moedas) => moedas.id !== moedasToDelete)
        );
        setMoedasToDelete(null);
      } catch (error) {
        console.error("Erro ao deletar o produto:", error);
      }
    }
  };

  return (
    <div className="container-fluid w-100 py-10">
      <div className="flex bg-white rounded-l-lg border-black">
        <div className="w-full">
          <ul role="list" className="divide-y divide-gray-100 w-full">
            {moedas.map((moedas) => (
              <li
                key={moedas.id}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={moedas.imagem}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-darkpurple-600">
                      {moedas.nome}
                    </p>
                    <div className="flex gap-1">
                      <p className="mt-1 truncate text-xs leading-5">
                        <span className="font-semibold text-sm text-whitebrown-300">PREÇO:</span>{" "}
                        <span className="text-gray-500 text-sm">{moedas.preco}</span>
                      </p>
                      <p className="mt-1 truncate text-xs leading-5">
                        <span className="font-semibold text-sm text-whitebrown-300">QUANTIDADE:</span>{" "}
                        <span className="text-gray-700 text-sm">
                          {moedas.quantidade}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={() => handleEditMoedas(moedas.id)}>
                    Editar
                  </button>
                  <button className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleDeleteConfirmMoedas(moedas.id)}>
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal de confirmação */}
      {moedasToDelete !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-4">Tem certeza que deseja excluir esta moeda?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 mr-4"
                onClick={handleConfirmarDelete}
              >
                Confirmar
              </button>
              <button
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListMoedas;