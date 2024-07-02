import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Categoria } from "@/services/category-service";
import ProductService, { Item } from "@/services/product-service";

interface FormProductsProps {
  saveProducts: (
    nameItem: string,
    tipo: number,
    categoryId: number,
    price: number,
    image: File | null, // Alterado para aceitar File ou null
    productID: number
  ) => void;
  productID: number;
  initialProduct: Item | null;
  categorias: Categoria[];
  hideCategorySelect: boolean;
}

const FormProducts: React.FC<FormProductsProps> = ({
  saveProducts,
  productID,
  initialProduct,
  categorias,
  hideCategorySelect
}) => {
  const productService = new ProductService();
  const [nameItem, setNameItem] = useState(initialProduct ? initialProduct.nome : "");
  const [tipo, setTipo] = useState<number>(initialProduct ? productService.converterTipo(initialProduct.tipo) : 0); // Definido como número
  const [category, setCategory] = useState<number | "">(initialProduct ? initialProduct.categoria.id : ""); // Definido como number ou string vazia
  const [price, setPrice] = useState<number | "">(initialProduct ? initialProduct.preco : ""); // Definido como number ou string vazia
  const [imagePreview, setImagePreview] = useState<string | null>(initialProduct ? initialProduct.imagem : null); // Alterado para aceitar apenas string ou null
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref para o input de arquivo

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // Converter explicitamente para string
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpar o valor do input de arquivo
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("nameItem", nameItem, "Tipo", tipo, "Price", price);
    // Verificar se todos os campos necessários estão preenchidos
    if (!nameItem || !price) {
      return;
    }

    if(tipo < 0){
      return;
    }

    // Verificar categoria SOMENTE se o usuário NÃO escondeu o select de categorias
    if (!category && !hideCategorySelect) {
      return;
    }
    // Obter o arquivo de imagem do input (se houver)
    const imageFile = fileInputRef.current?.files?.[0] || null;

    // Chama a função saveProducts com os valores do formulário
    saveProducts(nameItem, tipo, category as number, price as number, imageFile, productID);

    // Limpar os campos após o envio bem-sucedido
    setNameItem("");
    setTipo(0);
    setCategory("");
    setPrice("");
    setImagePreview(null);

    // Limpar o formulário
    event.currentTarget.reset();
  };

  return (
    <div className="w-full max-w-lg">
      <form className="mt-5 space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="select" className="block text-sm font-medium leading-6 text-gray-900">
            Selecione o tipo
          </label>
          <div className="mt-2">
            <select
              id="select"
              name="select"
              autoComplete="select"
              required
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus-ring-2 focus-ring-inset focus-ring-indigo-600 sm-text-sm sm-leading-6 form-select"
              value={tipo}
              onChange={(e) => setTipo(parseFloat(e.target.value))}
            >
              <option value="">Selecione uma opção</option>
              <option value="0">Avatar</option>
              <option value="1">Tabuleiro</option>
              {/* <option value="2">Finalização</option> */}
              <option value="3">Ficha</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
            Nome do Item
          </label>
          <div className="mt-2">
            <input
              id="text"
              name="text"
              type="text"
              autoComplete="text"
              required
              value={nameItem}
              onChange={(e) => setNameItem(e.target.value)}
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus-ring-2 focus-ring-inset focus-ring-indigo-600 sm-text-sm sm-leading-6 form-input"
            />
          </div>
        </div>

      {/*Mostrar a select de categoria na tela somente quando a propriedade hideCategorySelect for false*/}
      {!hideCategorySelect &&
        <div>
          <label htmlFor="select-categoria" className="block text-sm font-medium leading-6 text-gray-900">
            Categoria
          </label>
          <div className="mt-2">
            <select
              id="select-categoria"
              name="select-categoria"
              autoComplete="select-categoria"
              required
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus-ring-2 focus-ring-inset focus-ring-indigo-600 sm-text-sm sm-leading-6 form-select"
              value={category}
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = value !== "" ? parseInt(value, 10) : ""; // Convertendo para número ou mantendo uma string vazia
                setCategory(numericValue);
              }}
            >
              <option value="">Selecione uma Categoria</option>
              {categorias && categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        }

        <div>
          <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
            Preço
          </label>
          <div className="mt-2">
            <input
              id="number"
              name="number"
              type="number"
              autoComplete="number"
              required
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus-ring-2 focus-ring-inset focus-ring-indigo-600 sm-text-sm sm-leading-6 form-input"
            />
          </div>
        </div>
        
        <div className="flex justify-around">
          <div className="gap-x-3">
            <div className="mt-2 gap-x-3">
              <PhotoIcon className="h-15 w-15 text-gray-300" aria-hidden="true" />
              <input
                ref={fileInputRef}
                id="photo"
                name="photo"
                type="file"
                onChange={handleFileChange}
                className="sr-only"
              />
              <label
                htmlFor="photo"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50 cursor-pointer"
              >
                Imagem
              </label>
            </div>
          </div>

          {/* Exibir a prévia da imagem e botão de remoção */}
          <div className="flex items-center mt-2 relative">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview da imagem"
                className="h-40 w-40 rounded-md mr-2"
              />
            )}
            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-0 right-0 rounded-full bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50"
              >
                <XMarkIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Botão de envio do formulário */}
        <div>
          <button
            type="submit"
            className="w-full justify-center rounded-md bg-greenwhite-300 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProducts;
