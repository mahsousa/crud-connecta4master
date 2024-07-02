import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import ListCategorias from "@/components/ListCategorias";
import Navegation from "@/components/Navegation";
import Search from "@/components/Search";
import CategoriaService, { Categoria } from "@/services/category-service";

export default function ListarCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const categoriaService = new CategoriaService();

  useEffect(() => {
    const fetchData = async () => {
      const result = await categoriaService.search(searchText);
      setCategorias(result);
    };

    fetchData();
  }, [searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="mb-10 text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Consultar Categorias da Loja
        </h2>
        <Search onClickSearch={setSearchText} />
        <ListCategorias listCategory={categorias} />
        <Navegation />
      </div>
    </BaseLayout>
  );
}
