// pages/analise.js
import dynamic from 'next/dynamic';

// Carrega os componentes apenas no cliente
const BoxPlotChart = dynamic(() => import('../components/BoxPlotChart'), { ssr: false });
const ChiSquareTable = dynamic(() => import('../components/ChiSquareTable'), { ssr: false });

export default function Analise() {
  const data = [7, 8, 9, 10, 12, 20, 3]; // Dados para o Boxplot
  const observed = [10, 20, 30]; // Exemplo de valores observados
  const expected = [12, 18, 30]; // Exemplo de valores esperados

  return (
    <div>
      <h1>Gráfico de Boxplot com Qui-Quadrado</h1>
      
      {/* Exibição do gráfico */}
      <BoxPlotChart data={data} />
      
      {/* Exibição da Tabela com os resultados do Qui-Quadrado */}
      <ChiSquareTable observed={observed} expected={expected} />
    </div>
  );
}
