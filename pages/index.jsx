import Menu from "../components/Menu";
import styles from "../styles/Documentation.module.css"; // Importe o CSS Module

export default function Documentation() {
    return (
        <div>
            <div className='header'>
                <Menu />
            </div>
            <div className={styles.center}>
                <div className={styles.maxWidth}>
                    <h1 className={styles.title}>Documentação do Sistema de Dashboards do Enade</h1>

                    <section className={styles.section}>
                        <p>
                            Este site foi desenvolvido para facilitar a análise dos dados do Enade (Exame Nacional de Desempenho dos Estudantes). Ele permite aos usuários visualizar dashboards interativos, realizar o download de dados em formatos csv e xlsx, e efetuar análises estatísticas para verificar dependências entre variáveis selecionadas e as notas do Enade.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.subtitle}>Dados Considerados</h2>
                        <p>
                            Todas as análises e visualizações realizadas neste site utilizam exclusivamente os estudantes cuja presença foi marcada como <strong>555</strong>, ou seja, "Presente com resultado válido".
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.subtitle}>Funcionalidades Principais</h2>
                        <p>Este sistema oferece as seguintes funcionalidades principais:</p>
                        <ul>
                            <li>Visualização de dashboards com métricas relacionadas ao Enade.</li>
                            <li>Download de dados filtrados em formatos CSV e XLSX.</li>
                            <li>Realização de análises estatísticas para verificar dependências entre notas do Enade e variáveis selecionadas.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.subtitle}>Avisos Importantes</h2>
                        <p>
                            Ressalta-se que a nova estrutura dos Microdados do Enade permite ao pesquisador realizar estudos em relação ao perfil dos cursos e seus resultados, sendo possível agrupar os diferentes arquivos pelo código de curso (<code>CO_CURSO</code>).
                        </p>
                        <p>
                            <strong>No entanto,</strong> não é possível agrupar as informações no nível de estudante, considerando que cada arquivo está ordenado por variáveis distintas. Por exemplo, mesmo reordenando por código de curso todos os arquivos, os dados da primeira linha de um dos arquivos não se referem ao mesmo indivíduo dos dados da primeira linha de outro arquivo.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.subtitle}>Trabalho de Conclusão de Curso</h2>
                        <p className={styles.paragraph}>
                            Este trabalho foi realizado por mim, Giovanna Carvalho, sob a orientação do Prof. Richarlyson D'Emery, durante o semestre 2024.2, na Universidade Federal Rural de Pernambuco. Ele representa uma conclusão prática dos conhecimentos adquiridos ao longo do curso, com o objetivo de facilitar a análise dos dados do Enade.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
