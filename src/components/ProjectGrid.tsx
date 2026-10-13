import { useState } from 'react';
import { ArrowUpRight, Check, Lamp, Armchair, Coffee, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/Dialog';
import { projects } from '../lib/portfolio';
import { useTranslation } from 'react-i18next';

export function ProjectGrid({ filter = 'Todos' }: { filter?: string }) {

    const { t } = useTranslation();

    const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);

    return <>
        <div className="project-grid">
            {projects.filter(p => filter === 'Todos' || p.category === filter).map(p => <article className="project-card" key={p.id}>
                <div className={`project-preview ${p.preview === 'dashboard' ? 'green' : p.preview === 'tasks' ? 'blue' : ''}`}>
                    <div className="mini-window" aria-hidden="true">
                        <div className="mini-nav">
                            <strong>{p.name.toLowerCase()}{p.preview === 'shop' ? '®' : '.'}</strong><span>{p.preview === 'shop' ? t('Coleção   Objetos   Sobre') : t('Visão geral   /   Meu espaço')}</span>
                        </div>
                        {p.preview === 'shop' ?
                            <>
                                <div className="mini-title" dangerouslySetInnerHTML={{ __html: t('Objetos para<br/>viver melhor.') }}></div>
                                <div className="mini-shop">
                                    <div className="mini-item">
                                        <Lamp />
                                    </div>
                                    <div className="mini-item">
                                        <Armchair />
                                    </div>
                                    <div className="mini-item">
                                        <Coffee />
                                    </div>
                                </div>
                            </>
                            :
                            p.preview === 'dashboard' ?
                                <>
                                    <div className="mini-title">
                                        {t('Tudo em equilíbrio.')}
                                    </div>
                                    <div className="mini-dashboard">
                                        {Array.from({ length: 7 }, (_, i) => <div className="mini-bar" key={i} />)}
                                    </div>
                                </>
                                :
                                <>
                                    <div className="mini-title">
                                        {t('Espaço para suas ideias.')}
                                    </div>
                                    
                                    {['Planejar a próxima entrega', 'Criar novas possibilidades', 'Colocar o projeto no mundo'].map(task =>
                                        <div className="mini-task" key={task}><Check size={10} />{t(task)}</div>
                                    )}
                                </>
                        }
                    </div>
                </div>
                <div className="project-meta">
                    <div>
                        <h3>{p.name}<span className="text-muted-foreground font-sans text-xs"> / {t(p.type)}</span></h3>
                        <p>{p.tech}</p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label={`${t('Ver projeto')} ${p.name}`} onClick={() => setSelected(p)}>
                        <ArrowUpRight />
                    </Button>
                </div>
            </article>)
            }
        </div>
        <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
            <DialogContent>
                {selected &&
                    <>
                        <span className="eyebrow">{t('Projeto conceitual')} / {selected.id}</span>
                        <DialogTitle className="font-mono text-2xl">
                            {selected.name}
                        </DialogTitle>
                        <DialogDescription className="leading-7">
                            {t(selected.description)}
                        </DialogDescription>
                        <div className="skills">
                            {selected.tech.split(' · ').map(techItem => <span key={techItem} className="skill">{techItem}</span>)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {t('Estudo demonstrativo para este portfólio. Sem repositório ou versão pública vinculados.')}
                        </p>
                    </>
                }
            </DialogContent>
        </Dialog>
    </>;
}