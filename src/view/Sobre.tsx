import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { ProjectGrid } from "../components/ProjectGrid";
import { skills } from "../lib/portfolio";
import { Button } from "../components/ui/Button";
import objectImage from '../assets/fotojvs.png';
import { Trans, useTranslation } from "react-i18next";

export function Sobre() {

    const { t } = useTranslation();

    return (
        <div className="enter">
            <section className="intro">
                <div>
                    <div className="eyebrow">
                        {t('Olá, eu sou João Vitor')}
                    </div>
                    <h1>{t('Desenvolvedor.')}<br />{t('Movido por ideias.')}<br /><em>{t('Criado para construir.')}</em></h1>
                    <p className="intro-description">{t('Exploro possibilidades, conecto tecnologia e criatividade e transformo conceitos em soluções reais.')}</p>
                    <div className="intro-actions">
                        <Button asChild variant="portfolio" size="lg">
                            <Link to="/projetos">{t('Explorar projetos')} <ArrowUpRight /></Link>
                        </Button>
                        <Button asChild variant="editorial" size="lg">
                            <Link to="/contato">{t('Vamos conversar')} <ArrowRight /></Link>
                        </Button>
                    </div>
                </div>
                <div className="object-wrap">
                    <img className="object-image" src={objectImage} width={1024} height={1024} alt="Asterisco laranja esculpido ao lado de uma esfera cromada" />
                    <div className="object-caption">
                        <span>{t('CRIATIVIDADE + LÓGICA')}</span><span>{t('{ ideias → realidade }')}</span>
                    </div>
                </div>
            </section>
            <section className="about-section">
                <div>
                    <div className="section-heading">
                        <h2><span className="section-number">01 /</span>{t('Além do código')}</h2>
                    </div>
                    <div className="eyebrow">
                        {t('Um pouco sobre mim')}
                    </div>
                </div>
                <div>
                    <p className="about-copy">
                        <Trans
                            i18nKey="Sou <strong>Engenheiro de Software</strong>, formado em Análise e Desenvolvimento de Sistemas e atualmente estudante de Engenharia de Software. Tenho interesse especial no desenvolvimento de <strong>aplicações mobile</strong>, utilizando tecnologias como <strong>Kotlin e React Native</strong>. Gosto de aprender novas tecnologias, resolver problemas e transformar ideias em soluções práticas por meio da programação. Estou sempre buscando evoluir minhas habilidades e desenvolver projetos que gerem valor para as pessoas."
                            t={t}
                        >
                            Sou <strong>Engenheiro de Software</strong>, formado em Análise e Desenvolvimento de Sistemas e atualmente estudante de Engenharia de Software. Tenho interesse especial no desenvolvimento de <strong>aplicações mobile</strong>, utilizando tecnologias como <strong>Kotlin e React Native</strong>. Gosto de aprender novas tecnologias, resolver problemas e transformar ideias em soluções práticas por meio da programação. Estou sempre buscando evoluir minhas habilidades e desenvolver projetos que gerem valor para as pessoas.
                        </Trans>
                    </p>
                    <div className="skills">
                        {skills.map(s => <span key={s} className="skill">{s}</span>)}
                    </div>
                </div>
            </section>
            <section className="projects-section">
                <div className="section-heading">
                    <h2><span className="section-number">02 /</span>{t('Projetos selecionados')}</h2>
                    <Link to="/projetos">{t('Ver todos os projetos')} <ArrowUpRight size={15} /></Link>
                </div>
                <ProjectGrid />
            </section>
        </div>
    );
}