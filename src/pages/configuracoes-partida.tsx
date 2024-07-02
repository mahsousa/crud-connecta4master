import BaseLayout from "@/components/BaseLayout";
import PoderesPartida from "@/components/PoderesPartida";
import Sidebar from "@/components/Sidebar";
import CategoriaService, { Categoria } from "@/services/category-service";

export default function ConfiguracoesPartida() {
  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="mb-10 text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Configurações da Partida
        </h2>
        <PoderesPartida/>
      </div>
    </BaseLayout>
  );
}