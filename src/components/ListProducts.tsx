import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductService, { Item } from "@/services/product-service";
import Swal from 'sweetalert2'

interface ListProductsProps {
  listProducts: Item[] | null;
}

const ListProducts: React.FC<ListProductsProps> = ({ listProducts }) => {
  const router = useRouter();
  const [products, setProducts] = useState<Item[]>([]);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const productService = new ProductService();

  useEffect(() => {
    console.log(listProducts);
    if (listProducts) {
      setProducts(listProducts);
    }
  }, [listProducts]);

  const handleEditProduct = (id: number) => {
    router.push(`/editar-produto/${id}`);
  };

  const handleDeleteConfirm = (id: number) => {
    setProductToDelete(id);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  const handleConfirmarDelete = async () => {
    if (productToDelete !== null) {
      try {
        const isSuccess = await productService.delete(productToDelete);

        if (!isSuccess) {
          throw new Error("Falha ao deletar o produto");
        }

        // Remova o produto da lista após deletar com sucesso
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productToDelete)
        );
        setProductToDelete(null);
      } catch (error) {
        console.error("Erro ao deletar o produto:", error);
        Swal.fire({
          title: 'Ops!',
          text: 'Este produto já foi comprado, portanto não podemos apagá-lo!',
          icon: 'error',
          confirmButtonText: 'OK',
        }).then(() => {
          setProductToDelete(null);
        });
      }
    }
  };

  return (
    <div className="container-fluid w-100 py-10">
      <div className="flex bg-white rounded-l-lg border-black">
        <div className="w-full">
          <ul role="list" className="divide-y divide-gray-100 w-full">
            {products.map((product) => (
              <li key={product.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={product.imagem}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-darkpurple-600">
                      {product.nome}
                    </p>
                    <div className="flex gap-1">
                      <p className="mt-1 truncate text-xs leading-5">
                        <span className="font-semibold text-sm text-whitebrown-300">TIPO:</span>{" "}
                        <span className="text-gray-500 text-sm">{product.tipo}</span>
                      </p>
                      <p className="mt-1 truncate text-xs leading-5">
                        <span className="font-semibold text-sm text-whitebrown-300">CATEGORIA:</span>{" "}
                        <span className="text-gray-700 text-sm">{product.categoria?.nome}</span>
                      </p>
                      <p className="mt-1 truncate text-xs leading-5">
                        <span className="font-semibold text-sm text-whitebrown-300">PREÇO:</span>{" "}
                        <span className="text-gray-500 text-sm">{product.preco}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleDeleteConfirm(product.id)}
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
      {productToDelete !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-4">Tem certeza que deseja excluir este produto?</p>
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
};

export default ListProducts;
