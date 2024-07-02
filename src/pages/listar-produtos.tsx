import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout";
import Sidebar from "@/components/Sidebar";
import ListProducts from "@/components/ListProducts";
import Navegation from "@/components/Navegation";
import Search from "@/components/Search";
import ProductService, { Item } from "@/services/product-service";

export default function ListarProdutos() {
  const [products, setProducts] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const productService = new ProductService();

  const searchProducts = async (text: string) => {
    try {
      var products = await productService.search(text);
      setProducts(products);
    } catch (error) {
      console.error("Erro ao buscar os produtos da API:", error);
    }
  };

  useEffect(() => {
    searchProducts(searchText); // Chamada inicial ao carregar o componente e sempre que 'searchText' mudar
  }, [searchText]); // Executa sempre que 'searchText' for alterado

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="mb-10 text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Consultar itens da Loja
        </h2>
        <Search onClickSearch={setSearchText} />
        <ListProducts listProducts={products} />
        <Navegation />
      </div>
    </BaseLayout>
  );
}
