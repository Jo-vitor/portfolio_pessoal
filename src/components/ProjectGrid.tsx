import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import useGitHub, { visibleRepos } from '../hook/useGitHub';
import GITHUB_CONFIG from '../config/githubConfig';
import { fetchRepos } from '../service/githubService';

type PortfolioGridProps = { 
    sobre?: boolean, 
    sl?: (language: any) => void, 
    filter?: string, 
    username: string 
};

export function ProjectGrid({ sobre = false, sl, filter = 'Todos', username }: PortfolioGridProps) {

    const { t } = useTranslation();

    const { status, data } = useGitHub(fetchRepos, username);
    const [limit, setLimit] = useState(sobre ? 3 : GITHUB_CONFIG.REPOS_PER_PAGE);

    const repos = useMemo(() => visibleRepos(data ?? []), [data]);
    useMemo(
        () => {
            const l = ['Todos', ...new Set((repos.map((r) => r.language).filter(Boolean)).sort())];
            sl?.([...l])
        },
        [repos]
    );

    if (status === "loading") return <div className="gh-card gh-skeleton gh-skeleton-block" />;
    if (status === "error") return null;

    const filtered = repos
        .filter((repo) => filter == 'Todos' ? repo : repo.language == filter)
    const shown = filtered.slice(0, limit);

    return <>
        <div className="project-grid">
            {shown.map(repo => <article className="project-card" key={repo.id}>
                <div className="project-meta">
                    <div>
                        <span className="eyebrow mb-3">{t('Projeto')} / {repo.id}</span>
                        <h3>{repo.name}</h3>
                        <p>{repo.description ?? ''}</p>
                        <div className="skills">
                            <span className="skill">{repo.language ?? ''}</span>
                        </div>
                    </div>
                    <Button variant="ghost" asChild>
                        <a href={repo.html_url} target="_blank">
                            <ArrowUpRight />
                        </a>
                    </Button>
                </div>
            </article>)
            }
        </div>
        {!sobre ? limit < filtered.length && (
            <div className='flex justify-center mt-5'>
                <Button  onClick={() => setLimit((n) => n + GITHUB_CONFIG.REPOS_PER_PAGE)}>
                    Ver mais ({filtered.length - limit})
                </Button>
            </div>
        ): <></>}
    </>;
}