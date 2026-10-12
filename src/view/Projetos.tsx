import { useState } from "react";
import { ProjectGrid } from "../components/ProjectGrid";
import { Button } from "../components/ui/Button";

export function Projetos() {
    const [filter, setFilter] = useState('Todos');
    return (
        <div className="enter">
            <div className="page-intro">
                <span className="eyebrow">01 / Ideias em prática</span>
                <h1>Feito de ideias.<br/><span className="text-primary">Construído com código.</span></h1>
                <p>Uma seleção de projetos conceituais que exploram design, desenvolvimento e novas possibilidades.</p>
            </div>
            <div className="page-body">
                <div className="filter-list" aria-label="Filtrar projetos">
                    {['Todos', 'Web', 'App'].map(f => 
                        <Button key={f} variant={filter === f ? 'portfolio' : 'editorial'} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                            {f} 
                            <span className="opacity-60"> {f === 'Todos' ? '03' : f === 'Web' ? '02' : '01'}</span>
                        </Button>)}
                </div>
                <ProjectGrid filter={filter}/>
            </div>
        </div>
    );
}