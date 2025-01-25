import styles from '../styles/MainAnalise.module.css'; // Importa o módulo CSS
import dynamic from 'next/dynamic';

// Carrega os componentes apenas no cliente
const BoxPlotChart = dynamic(() => import('../components/BoxPlotChart'), { ssr: false });
const ChiSquareTable = dynamic(() => import('../components/ChiSquareTable'), { ssr: false });
const BarChart = dynamic(() => import('../components/BarChart'), { ssr: false });

export default function MainAnalise() {
    const data = [7, 8, 9, 10, 12, 20, 3]; // Dados para o Boxplot
    const observed = [10, 20, 30]; // Exemplo de valores observados
    const expected = [12, 18, 30]; // Exemplo de valores esperados

    return(
      <div className={styles.main}>
        <div className={styles.superior}>
            {/* Gráfico de Barras */}
            <div className={styles.section}>
                {/* <h2>Gráfico de Barras: Observado vs Esperado</h2> */}
                <BarChart observed={observed} expected={expected} />
            </div>

            {/* Gráfico de Boxplot */}
            <div className={styles.section}>
                {/* <h2>Gráfico de Boxplot</h2> */}
                <BoxPlotChart data={data} />
            </div>
        </div>
        <div className={styles.inferior}>
            {/* Tabela com os resultados do Qui-Quadrado */}
            <div className={styles.section}>
                <h2>Resultados do Teste Qui-Quadrado</h2>
                <ChiSquareTable observed={observed} expected={expected} />
            </div>
        </div>
      </div>
    );
}