export function Experiencias() {
    return (
        <div className="enter">
            <div className="page-intro">
                <span className="eyebrow">02 / Em constante evolução</span>
                <h1>Cada desafio,<br/><span className="text-primary">um novo aprendizado.</span></h1>
                <p>Aqui compartilho as áreas em que atuo, as competências que construí e as vivências reais que moldaram minha carreira.</p>
            </div>
            <div className="page-body">
                {
                    [{ 
                        title: 'Desenvolvimento mobile', 
                        subtitle: 'Interfaces & experiências digitais',
                        description: 'Desenvolvimento de aplicativos fluidos e escaláveis. Transformo ideias em experiências digitais nativas e híbridas de alto desempenho, sempre com foco na acessibilidade e no usuário.', 
                        skills: ['React Native', 'TypeScript', 'Kotlin', 'Jetpack Compose', 'Firebase'] },
                    { 
                        title: 'Desenvolvimento full stack', 
                        subtitle: 'Da interface à aplicação',
                        description: 'Desenvolvimento de soluções ponta a ponta. Arquitetura de APIs robustas, modelagem de banco de dados e integração de sistemas para resolver problemas reais com segurança e eficiência.', 
                        skills: ['Java', 'Spring Boot','React', 'TypeScript', 'PostgreSQL', 'REST APIs'] },
                    { 
                        title: 'Arquitetura & Boas Práticas', 
                        subtitle: 'Fundamentos para software escalável',
                        description: 'Aplicação de padrões de projeto e testes automatizados para garantir código limpo, manutenção facilitada e alta performance em todo o ciclo de desenvolvimento.', 
                        skills: ['Git', 'UI/UX', 'Testes', 'Performance', 'Design systems', 'Clean Architecture'] },
                    ].map((e,i) => 
                        <article className="experience-row" key={e.title}>
                            <div>
                                <span className="period">0{i+1} / ÁREA DE ATUAÇÃO</span>
                                <p className="mt-3">{e.subtitle}</p>
                            </div>
                            <div>
                                <h2>{e.title}</h2>
                                <p>{e.description}</p>
                                <div className="skills">
                                    {e.skills.map(s => <span key={s} className="skill">{s}</span>)}
                                </div>
                            </div>
                        </article>)
                }
            </div>
        </div>
    );
}