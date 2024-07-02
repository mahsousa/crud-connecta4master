import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../../components/Sidebar";
import FormProducts from "@/components/FormProducts";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductService, { Item } from "@/services/product-service";
import CategoriaService, { Categoria } from "@/services/category-service";

const EditarProductsPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string }; // Acessa o parâmetro 'id' da URL
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const [product, setProduct] = useState<Item | null>(null); // Estado para armazenar os detalhes do produto

  const productService = new ProductService();

  //Lista de categorias que sera preenchida
  const [categorias, setCategorias] = useState<Categoria[]>();

  const categoriaService = new CategoriaService();

  //Busca as categorias da API e preenche o select de categorias da tela
  useEffect(() => {
    if (categorias) return;

    const fetchData = async () => {
      const result = await categoriaService.search("");
      setCategorias(result);
    };

    fetchData();
  }, [categorias]);
  
  // Função para buscar os detalhes do produto
  const fetchProduct = async (productId: string) => {
    try {
      const produto = await productService.getById(parseInt(productId));
      setProduct(produto);
    } catch (error) {
      console.error('Erro ao buscar o produto:', error);
    }
  };

  // Chamada da função fetchProduct quando o 'id' é alterado
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const saveProducts = (
    nameItem: string,
    tipo: number,
    categoryId: number,
    price: number,
    image: File | null,
    productID: number
  ) => {
    productService
      .update(productID, nameItem, tipo, price, categoryId, image)
      .then((isSuccess) => {
        if (isSuccess) {
          setShowSuccessPopup(true);
          // Limpar popup após alguns segundos
          setTimeout(() => {
            setShowSuccessPopup(false);
          }, 3000); // Fechar o popup após 3 segundos
        } else {
          throw new Error("Falha ao cadastrar o item");
        }
      })
      .catch((error) => {
        console.error("Erro ao realizar o POST:", error);
        // Mostrar popup de erro
        setShowErrorPopup(true);

        // Limpar popup após alguns segundos
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 3000); // Fechar o popup após 3 segundos
      });
  };

  // Caso em que 'id' ainda não está disponível
  if (!product) {
    return <p>Carregando...</p>;
  }

  // Caso em que 'categorias' ainda não está disponível
  if (!categorias) {
    return <p>Carregando...</p>;
  }

  return (
    <BaseLayout>
        <Sidebar />
        <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Editar Item da Loja
        </h2>
        <FormProducts saveProducts={saveProducts} productID={parseInt(id)} initialProduct={product} categorias={categorias ?? []} hideCategorySelect={false} />

        {/* Popup de sucesso */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Item editado com sucesso!</div>
          </div>
        )}

        {/* Popup de erro */}
        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Erro ao editar item. Por favor, tente novamente.</div>
          </div>
        )}
        </div>
    </BaseLayout>
  );
}

export default EditarProductsPage;