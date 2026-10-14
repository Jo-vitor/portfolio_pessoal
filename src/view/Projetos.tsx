import { useState } from "react";
import { ProjectGrid } from "../components/ProjectGrid";
import { Button } from "../components/ui/Button";
import { useTranslation } from "react-i18next";
import GITHUB_CONFIG from '../config/githubConfig';

export function Projetos() {
    const [filter, setFilter] = useState('Todos');
    const [languages, setLanguages] = useState<string[]>([]);

    const { t } = useTranslation();

    return (
        <div className="enter">
            <div className="page-intro">
                <span className="eyebrow">01 / {t('Ideias em prática')}</span>
                <h1>{t('Feito de ideias.')}<br/><span className="text-primary">{t('Construído com código.')}</span></h1>
                <p>{t('Os meus projetos em destaque. Uma seleção de projetos que demonstram como aplico engenharia e design para resolver problemas complexos.')}</p>
            </div>
            <div className="page-body">
                <div className="filter-list" aria-label="Filtrar projetos">
                    {languages.map(f => 
                        <Button key={f} variant={filter === f ? 'portfolio' : 'editorial'} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                            {t(f)} 
                        </Button>)}
                </div>
                <ProjectGrid sl={setLanguages} filter={filter} username={GITHUB_CONFIG.USERNAME}/>
            </div>
        </div>
    );
}