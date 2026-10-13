import { ArrowUpRight, Copy, Check, MessageSquare, Download, Mail, MessageCircle } from 'lucide-react';
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { Button } from '../components/ui/Button';
import { useState, type FormEvent } from 'react';
import { profiles } from '../lib/portfolio';
import { useTranslation } from 'react-i18next';

const profileIcons = {
    mail: Mail,
    whatsapp: MessageCircle,
    linkedin: LuLinkedin,
    github: LuGithub,
} as const;

type ProfileIconName = keyof typeof profileIcons;

const typedProfiles = profiles as Array<{
    name: string;
    value: string;
    href: string;
    icon: ProfileIconName;
}>;

export function Contato() {

    const { t } = useTranslation();

    const [message, setMessage] = useState('');
    const [copied, setCopied] = useState(false);
    function prepare(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setMessage(`Olá, João Vitor!\n\nMeu nome é ${data.get('name')}.\nE-mail: ${data.get('email')}\n\n${data.get('message')}`);
        setCopied(false);
    }
    async function copy() { try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setCopied(false); } }

    return (
        <div className="enter">
            <div className="page-intro">
                <span className="eyebrow">03 / {t('O próximo passo')}</span>
                <h1>{t('Boas ideias começam')}<br /><span className="text-primary">{t('com uma conversa.')}</span></h1>
                <p dangerouslySetInnerHTML={{ __html: t('Um projeto em mente, uma oportunidade ou só um olá?<br />Será um prazer conhecer sua ideia.') }}></p>
            </div>
            <div className="page-body contact-layout">
                <div>
                    <MessageSquare className="text-primary mb-5" size={32} />
                    <h2 className="text-xl mb-4">{t('Vamos criar algo juntos.')}</h2>
                    <p className="contact-note">{t('Tem um projeto em mente, precisa de um parceiro técnico ou quer discutir uma nova oportunidade? Entre em contacto através dos canais abaixo ou envie-me uma mensagem direta.')}</p>
                    <div className="cv-profiles">
                        <div>
                            <span className="eyebrow mb-4">{t('Currículo')}</span>
                            <Button asChild variant="portfolio">
                                <a href="/JoaoVitorSoares.pdf" download>{t('Baixar currículo em PDF')} <Download /></a>
                            </Button>
                        </div>
                        <div>
                            <span className="eyebrow">{t('Perfis profissionais')}</span>
                            <ul className="profile-list">{typedProfiles.map(p => {
                                const Icon = profileIcons[p.icon];
                                return <li key={p.name}>
                                    <a className="profile-link" href={p.href} {...(p.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                        <Icon className="text-primary shrink-0" size={17} />
                                        <span className="profile-text">
                                            <span>{p.name}</span>
                                            <span className="profile-value">{p.value}</span>
                                        </span>
                                        <ArrowUpRight className="ml-auto text-muted-foreground shrink-0" size={15} />
                                    </a>
                                </li>;
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
                <form className="contact-form" onSubmit={prepare}>
                    <label>
                        {t('Seu nome')}
                        <input name="name" placeholder={t('Como você se chama?')} required autoComplete="name" />
                    </label>
                    <label>
                        {t('Seu e-mail')}
                        <input name="email" type="email" placeholder={t('voce@exemplo.com')} required autoComplete="email" />
                    </label>
                    <label>
                        {t('O que você tem em mente?')}
                        <textarea name="message" placeholder={t('Conte um pouco sobre sua ideia...')} required />
                    </label>
                    <Button variant="portfolio" size="lg" type="submit" className="justify-self-start">
                        {t('Preparar mensagem')} <ArrowUpRight />
                    </Button>
                    {message &&
                        <div role="status">
                            <p className="text-sm text-muted-foreground mb-3">{t('Mensagem pronta — ainda não foi enviada.')}</p>
                            <textarea aria-label={t('Mensagem preparada')} value={message} readOnly />
                            <Button type="button" variant="editorial" className="mt-3" onClick={copy}>
                                {copied ? <Check /> : <Copy />}
                                {copied ? t('Mensagem copiada') : t('Copiar mensagem')}
                            </Button>
                        </div>}
                </form>
            </div>
        </div>
    );
}