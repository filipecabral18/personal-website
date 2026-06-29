'use client';

import { useEffect, useRef, useState } from 'react';
import { FiGithub, FiExternalLink, FiChevronDown } from 'react-icons/fi';

type Project = {
  name: string;
  description: string;
  /** Texto completo exibido ao expandir o card. Pode ter vários parágrafos. */
  details: string;
  /** Pontos de destaque mostrados como lista ao expandir. Opcional. */
  highlights?: string[];
  tech: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
};

// Cadastre aqui os projetos que você quer exibir no site.
// `description` aparece no card; `details` e `highlights` aparecem ao expandir.
const projects: Project[] = [
  {
    name: 'Simpa - Governo do ES',
    description:
      'Sistema de monitoramento de Parâmetros ambientais (PAs) para empresas de saneamento, com dashboard e relatórios.',
    details:
      'O Simpa é um sistema de monitoramento de Parâmetros ambientais (PAs) desenvolvido para empresas de saneamento registradas no Espírito Santo. Ele oferece dashboards interativos e relatórios detalhados, permitindo que as empresas acompanhem e analisem os dados ambientais de forma eficiente. Este projeto me proporcionou experiência em desenvolvimento full stack e integração de dados em tempo real.',
    highlights: [
      'Monitoramento em tempo real de PAs',
      'Dashboards interativos e relatórios detalhados',
      'Integração de dados em tempo real',
    ],
    tech: ['ReactJS', 'Express', 'TypeScript', 'leaflet', 'Power BI'],
    github: null,
    live: 'https://iema.es.gov.br/simpa',
    featured: true,
  },
  {
    name: 'Savour - Plataforma de Agenda de Restaurantes',
    description:
      'Plataforma de reservas e fila de espera virtual para restaurantes.',
    details:
      'O projeto resolve um problema clássico de operação de salão: distribuir a capacidade de mesas em tempo real, oferecer horários alternativos quando o pedido está lotado e gerenciar uma fila de espera digital — sem o cliente precisar ficar parado na porta segurando uma senha de papel. Trabalhei no desenvolvimento full stack, garantindo uma experiência de usuário fluida e integração eficiente com APIs externas.',
    highlights: [
      'Portal do cliente (B2C)',
      'Painel da recepção (Hostess)',
      'Integração de dados em tempo real',
    ],
    tech: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Node.js',
      'NestJS',
      'PostgreSQL',
    ],
    github: 'https://github.com/filipecabral18/savour',
    live: null,
    featured: true,
  },
  {
    name: 'Página de Captura',
    description:
      'Landing page de captura de leads com design limpo e otimizado para conversão.',
    details:
      'Landing page criada para captura de leads, com design limpo e hierarquia visual pensada para conversão. Trabalhei o layout, o call-to-action e a responsividade para que a página funcione bem em qualquer dispositivo.',
    highlights: [
      'Design orientado à conversão',
      'Call-to-action em destaque',
      'Responsiva e leve',
    ],
    tech: ['HTML', 'CSS'],
    github: 'https://github.com/filipecabral18/pagina-de-captura',
    live: null,
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (name: string) =>
    setExpanded((current) => (current === name ? null : name));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 },
    );
    sectionRef.current
      ?.querySelectorAll('.fade-in-section')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="relative py-28 bg-[#060c1a]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in-section flex items-center gap-3 mb-16">
          <span className="font-mono text-blue-400 text-sm">03.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Projetos
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent ml-2" />
        </div>

        {/* Featured projects */}
        <div className="space-y-8 mb-14">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => {
              const isOpen = expanded === project.name;
              return (
                <div
                  key={project.name}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggle(project.name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(project.name);
                    }
                  }}
                  className="fade-in-section card-glow rounded-xl bg-[#0a1628] p-6 md:p-8 cursor-pointer transition-colors hover:bg-[#0c1a30] focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/60"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                          destaque
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-sm mb-5">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 md:ml-8">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-400 hover:text-white transition-colors"
                          aria-label="Ver código no GitHub"
                        >
                          <FiGithub size={20} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-400 hover:text-blue-400 transition-colors"
                          aria-label="Ver projeto ao vivo"
                        >
                          <FiExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Detalhes expansíveis */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-6'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/5 pt-5">
                        <p className="text-slate-300 leading-relaxed text-sm">
                          {project.details}
                        </p>
                        {project.highlights &&
                          project.highlights.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {project.highlights.map((h) => (
                                <li
                                  key={h}
                                  className="flex items-start gap-2 text-slate-400 text-sm"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Indicador de expandir */}
                  <div className="mt-5 flex items-center gap-1.5 font-mono text-xs text-blue-400">
                    <span>{isOpen ? 'Ver menos' : 'Saiba mais'}</span>
                    <FiChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Other projects grid */}
        <div className="fade-in-section">
          <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-6">
            Outros projetos
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects
              .filter((p) => !p.featured)
              .map((project, i) => {
                const isOpen = expanded === project.name;
                return (
                  <div
                    key={project.name}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onClick={() => toggle(project.name)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle(project.name);
                      }
                    }}
                    className="card-glow rounded-lg bg-[#0a1628] p-5 cursor-pointer transition-colors hover:bg-[#0c1a30] focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/60"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-white font-semibold text-sm">
                        {project.name}
                      </h4>
                      <div className="flex gap-3">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-500 hover:text-white transition-colors"
                          >
                            <FiGithub size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-tag text-xs">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Detalhes expansíveis */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 mt-4'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-white/5 pt-4">
                          <p className="text-slate-400 text-xs leading-relaxed">
                            {project.details}
                          </p>
                          {project.highlights &&
                            project.highlights.length > 0 && (
                              <ul className="mt-3 space-y-1.5">
                                {project.highlights.map((h) => (
                                  <li
                                    key={h}
                                    className="flex items-start gap-2 text-slate-500 text-xs"
                                  >
                                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* Indicador de expandir */}
                    <div className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-blue-400">
                      <span>{isOpen ? 'Ver menos' : 'Saiba mais'}</span>
                      <FiChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="fade-in-section text-center mt-12">
          <a
            href="https://github.com/filipecabral18"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-slate-400 hover:text-blue-400 transition-colors group"
          >
            <FiGithub size={16} />
            <span>Ver todos os 21 repositórios no GitHub</span>
            <FiExternalLink
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
