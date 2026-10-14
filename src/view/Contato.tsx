import { ArrowUpRight, Copy, Check, MessageSquare, Download, Mail, MessageCircle } from 'lucide-react';
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { Button } from '../components/ui/Button';
import { useRef, useState } from 'react';
import { profiles } from '../lib/portfolio';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

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

const serviceId = import.meta.env.VITE_SERVICE_ID_EMAIL;
const templateId = import.meta.env.VITE_TEMPLATE_ID_EMAIL;
const publicKey = import.meta.env.VITE_PUBLIC_KEY_EMAIL;

export function Contato() {

    const { t } = useTranslation();

    const [sucesso, setSucesso] = useState(false);
    const [erro, setErro] = useState(false);

    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        if (!form.current) return;

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
          setErro(false)
          setSucesso(true)
        },
        (error) => {
          console.log('FAILED...', error.text);
          setSucesso(false);
          setErro(true);
        },
      );
  };


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
                <form className="contact-form" ref={form} onSubmit={sendEmail}>
                    <label>
                        {t('Seu nome')}
                        <input name="name" placeholder={t('Como você se chama?')} required autoComplete="name" />
                    </label>
                    <label>
                        {t('Seu e-mail')}
                        <input name="email" type="email" placeholder={t('voce@hotmail.com')} required autoComplete="email" />
                    </label>
                    <label>
                        {t('O que você tem em mente?')}
                        <textarea name="message" placeholder={t('Conte um pouco sobre sua ideia...')} required />
                    </label>
                    <Button variant="portfolio" size="lg" type="submit" className="justify-self-start">
                        {t('Enviar mensagem')} <ArrowUpRight />
                    </Button>
                    <div>
                        {sucesso ? 
                            <span className="sucesso">{t('Mensagem enviada')}</span>
                            :
                            <></>
                        }
                        {erro ?
                            <span className="erro">{t('Erro ao enviar')}</span>
                            :
                            <></>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}