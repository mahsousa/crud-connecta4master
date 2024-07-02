import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import Categoria from "@/components/FormCategoria";
import { useState } from "react";
import FormProducts from "@/components/FormProducts";
import CategoriaService from "@/services/category-service";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function createCategory() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showNewItemPopup, setShowNewItemPopup] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  const saveCategory = (categoryName: string, categoryID: string) => {
    setShowNewItemPopup(true);
    setCategoryName(categoryName);
  };

  const saveCategoryAndItem = (
    nameItem: string,
    tipo: number,
    categoryId: number,
    price: number,
    image: File | null, // Alterado para aceitar File ou null
    productID: number
  ) => {
    if (!image) {
      console.error("Imagem não escolhida");
      return;
    }
    var categoryService = new CategoriaService();
    categoryService
      .save(categoryName, nameItem, tipo, image, price)
      .then((isSuccess) => {
        if (isSuccess) {
          setShowSuccessPopup(true);
        } else {
          setShowErrorPopup(true);
        }

        setShowNewItemPopup(false);

        // Limpar popup após alguns segundos
        setTimeout(() => {
          setShowSuccessPopup(false);
          setShowErrorPopup(false);
        }, 3000); // Fechar o popup após 3 segundos
      });
  };

  const closePopup = () => {
    setShowNewItemPopup(false); // Fechar o popup ao clicar no botão X
  };

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Cadastrar Categorias da Loja
        </h2>
        <Categoria
          saveCategory={saveCategory}
          categoryID={0}
          initialCategoryName={null}
          submitButtonText="Prosseguir"
        />

        {showNewItemPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-10 relative">
              {/* Botão de fechar no canto superior direito (um pouco fora da borda) */}
              <button
                type="button"
                onClick={closePopup} // Chama a função para fechar o popup ao clicar no botão X
                className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 rounded-full bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50"
              >
                <XMarkIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              {/* Conteúdo do popup */}
              <div className="text-start">
                <h2 className="text-2xl font-bold leading-9 tracking-tight text-darkpurple-600 mb-4">
                  Cadastrar um item na Loja
                </h2>
                <FormProducts
                  saveProducts={saveCategoryAndItem}
                  productID={0}
                  initialProduct={null}
                  categorias={[]}
                  hideCategorySelect={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* Popup de sucesso */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">
              Categoria cadastrada com sucesso!
            </div>
          </div>
        )}

        {/* Popup de erro */}
        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">
              Erro ao cadastrar Categoria, Por favor, tente novamente.
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
