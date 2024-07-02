import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import FormMoedas from "@/components/FormMoedas";
import { useState } from "react";
import CoinService from "@/services/coin-service";

export default function About() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const coinService = new CoinService();

  const saveMoedas = ( 
    name: string,
    price: number,
    qtdMoedas: number,
    imagem: File | null,
    moedasID: number) => {
      if(!imagem){
        console.error("Imagem da moeda não foi escolhida");
        return;
      }

      coinService.save(name, price, qtdMoedas, imagem).then((isSuccess) => {
        if(!isSuccess){
          throw new Error("Erro ao cadastrar moeda");
        }
        setShowSuccessPopup(true);
        // Limpar popup após alguns segundos
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000); // Fechar o popup após 3 segundos
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

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Cadastrar Moedas na Loja
        </h2>
        <FormMoedas saveMoedas={saveMoedas} moedasID={0} initialCoin={null} />

        {/* Popup de sucesso */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Moedas cadastradas com sucesso!</div>
          </div>
        )}

        {/* Popup de erro */}
        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Erro ao cadastrar Moedas, Por favor, tente novamente.</div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
