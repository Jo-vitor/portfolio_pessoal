import { ArrowUpRight } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router';

export function PortfolioShell() {
    return <div className="site-shell">
        <header className="site-header">
            <Link to="/" className="brand" aria-label="João Vitor, início"><span className="brand-mark">{'</>'}</span> jv.soares<span className="text-primary">.</span></Link>
            <nav className="site-nav" aria-label="Navegação principal">
                <NavLink to="/" className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                }>Sobre mim</NavLink>
                <NavLink to="/projetos" className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                }>Projetos</NavLink>
                <NavLink to="/experiencias" className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                }>Experiências</NavLink>
                <NavLink to="/contato" className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                }>Contato</NavLink>
            </nav>
            <div className="availability"><span className="status-dot" />Vamos criar algo juntos</div>
        </header>

        <Outlet />

        <footer className="footer">
            <span>© 2026 João Vitor Soares</span>
            <div className="footer-links">
                <Link to="/projetos">Projetos <ArrowUpRight className="inline size-3" /></Link>
                <Link to="/contato">Vamos conversar <ArrowUpRight className="inline size-3" /></Link>
            </div>
        </footer>
    </div>;
}