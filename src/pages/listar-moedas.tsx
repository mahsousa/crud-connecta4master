import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import ListMoedas from "@/components/ListMoedas";
import Navegation from "@/components/Navegation";
import Search from "@/components/Search";
import React, { useState, useEffect } from "react";
import CoinService, { Moeda } from "@/services/coin-service";

export default function ListarMoedas() {
  const [moedas, setMoedas] = useState<Moeda[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const coinService = new CoinService();

  const searchMoedas = async (text: string) => {
    try {
      var response = await coinService.search(text);
      setMoedas(response);
    } catch (error) {
      console.error("Erro ao buscar as moedas da API:", error);
    }
  };

  useEffect(() => {
    searchMoedas(searchText); // Chamada inicial ao carregar o componente e sempre que 'searchText' mudar
  }, [searchText]); // Executa sempre que 'searchText' for alterado

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="mb-10 text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Consultar Moedas da Loja
        </h2>
        <Search onClickSearch={setSearchText} />
        <ListMoedas listMoedas={moedas}/>
        <Navegation />
      </div>
    </BaseLayout>
  );
}
