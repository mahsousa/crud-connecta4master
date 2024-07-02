import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";

interface FormCategoryProps {
  categoryID: number;
  saveCategory: (categoryName: string, categoryID: string) => void;
  initialCategoryName: string | null;
  submitButtonText: string;
}

const FormCategory: React.FC<FormCategoryProps> = ({ saveCategory, categoryID, initialCategoryName, submitButtonText }) => {
  const [categoria, setCategoria] = useState(initialCategoryName ?? "");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [clearInput, setClearInput] = useState(false);

  useEffect(() => {
    // Limpar o campo de entrada após o envio bem-sucedido do formulário
    if (clearInput && formRef.current) {
      formRef.current.reset(); // Limpa o formulário
      setCategoria(""); // Limpa o estado da categoria
      setClearInput(false); // Reseta o estado de limpeza
    }
  }, [clearInput]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!categoria) {
      setShowErrorPopup(true);
      return;
    }

    saveCategory(categoria, categoryID.toString());
    setClearInput(true); // Define como true para limpar o campo após o envio
  };

  const handleCategoriaChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (clearInput) {
      setCategoria(""); // Limpa o campo se clearInput for verdadeiro
      setClearInput(false); // Reseta o estado de limpeza
    } else {
      setCategoria(event.target.value);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <form ref={formRef} className="mt-10 space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-gray-900">
            Nome Da Categoria
          </label>
          <div className="mt-2">
            <input
              id="categoria"
              name="categoria"
              type="text"
              autoComplete="off"
              value={clearInput ? "" : categoria}
              onChange={handleCategoriaChange}
              required
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-input"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full justify-center rounded-md bg-greenwhite-300 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm"
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default FormCategory;
