import { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../../components/Sidebar";
import FormMoedas from "@/components/FormMoedas";
import { useRouter } from "next/router";
import CoinService, { Moeda } from "@/services/coin-service";

const EditarMoedasPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string }; // Acessa o parâmetro 'id' da URL
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const [moedas, setMoedas] = useState<Moeda | null>(null); // Estado para armazenar os detalhes da moeda

  const coinService = new CoinService();
  
  // Função para buscar os detalhes da moeda pelo ID
  const fetchMoedas = async (moedasId: string) => {
    try {
      const coin = await coinService.getById(parseInt(moedasId));
      setMoedas(coin); // Armazena os detalhes da moeda no estado
    } catch (error) {
      console.error('Erro ao buscar a moeda:', error);
    }
  };

  // Chamada da função fetchMoedas quando o 'id' é alterado
  useEffect(() => {
    if (id) {
      fetchMoedas(id);
    }
  }, [id]);

  const editMoeda = (
    name: string,
    price: number,
    qtdMoedas: number,
    imagem: File | null,
    moedasID: number
  ) => {
    coinService.update(moedasID, name, qtdMoedas, price, imagem).then((isSuccess) => {
      if(!isSuccess){
        throw new Error("Não conseguimos atualizar a moeda");
      }

      // Mostrar popup de erro
      setShowSuccessPopup(true);

      // Limpar popup após alguns segundos
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000); // Fechar o popup após 3 segundos
    })
    .catch((error) => {
      console.error('Erro ao realizar a atualização da moeda:', error);

      // Mostrar popup de erro
      setShowErrorPopup(true);

      // Limpar popup após alguns segundos
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000); // Fechar o popup após 3 segundos
    });
  };

  
  // Caso em que 'id' ainda não está disponível
  if (!moedas) {
    return <p>Carregando...</p>;
  }

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Editar Moedas na Loja
        </h2>
        {/* Passa os detalhes da moeda como prop initialCoin para o componente FormMoedas */}
        <FormMoedas saveMoedas={editMoeda} moedasID={parseInt(id)} initialCoin={moedas} />
        
        {/* Popup de sucesso */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Moedas editada com sucesso!</div>
          </div>
        )}

        {/* Popup de erro */}
        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Erro ao editar Moedas. Por favor, tente novamente.</div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default EditarMoedasPage;
