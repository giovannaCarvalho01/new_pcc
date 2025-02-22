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
                            Este site foi desenvolvido para facilitar a análise dos dados do Exame Nacional de Desempenho de Estudantes (Enade). Ele permite aos usuários visualizar dashboards interativos, realizar o download de dados em formatos Comma-separated values (csv) e Excel (xlsx), e efetuar análises estatísticas para verificar dependências entre variáveis selecionadas e as notas do Enade.
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
                        <ul className={styles.ul_doc}>
                            <li className={styles.li_doc}>Visualização de dashboards com métricas relacionadas ao Enade.</li>
                            <li className={styles.li_doc}>Download de dados filtrados em formatos csv e xlsx.</li>
                            <li className={styles.li_doc}>Realização de análises estatísticas para verificar dependências entre notas do Enade e variáveis selecionadas.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.subtitle}>Avisos Importantes</h2>
                        <p>
                            Ressalta-se que a nova estrutura dos Microdados do Enade permite ao pesquisador realizar estudos em relação ao perfil dos cursos e seus resultados, sendo possível agrupar os diferentes arquivos pelo código de curso (<code>CO_CURSO</code>).
                        </p>
                        <p>
                            <strong>No entanto,</strong> não é possível agrupar as informações no nível de estudante, considerando que cada arquivo está ordenado por variáveis distintas. Por exemplo, mesmo reordenando por código de curso todos os arquivos, 
                            os dados da primeira linha de um dos arquivos não se referem ao mesmo indivíduo dos dados da primeira linha de outro arquivo. De acordo com Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (Inep) [Brasil 2022],
                            essa característica atende a Lei Geral de Proteção de Dados Pessoais (LGPD) - Lei n.º 13.709 de 14 de Agosto de 2018.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.subtitle}>Créditos</h2>
                        <p className={styles.paragraph}>
                            Esse sistema é de autorida de Giovanna Alves Vital de Carvalho, bacharelanda em Sistemas de Informação da Unidade Acadêmica de Serra Talhada (UAST) da Universidade Federal Rural de Pernambuco (UFRPE),
                            sob a orientação do Prof. Richarlyson Alves D'Emery (UAST - UFRPE), como resultado do Trabalho de Conclusão de Curso.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
