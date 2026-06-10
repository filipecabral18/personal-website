'use client'

import { useEffect, useRef } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    name: 'Churrascometro',
    description:
      'Calculadora de churrasco que estima a quantidade de carne, bebidas e insumos para festas com base no número de convidados.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/filipecabral18/churrascometro',
    live: null,
    featured: true,
  },
  {
    name: 'Currency Converter',
    description:
      'Conversor de moedas em tempo real construído com React, consumindo APIs externas de câmbio para conversões precisas.',
    tech: ['React', 'JavaScript', 'API'],
    github: 'https://github.com/filipecabral18/Currency-converter',
    live: null,
    featured: true,
  },
  {
    name: 'Página de Cadastro',
    description:
      'Interface de cadastro de usuários com validações de formulário, design responsivo e foco em usabilidade.',
    tech: ['CSS', 'HTML', 'JavaScript'],
    github: 'https://github.com/filipecabral18/pagina-de-cadastro',
    live: null,
    featured: false,
  },
  {
    name: 'Página de Captura',
    description:
      'Landing page de captura de leads com design limpo e otimizado para conversão.',
    tech: ['HTML', 'CSS'],
    github: 'https://github.com/filipecabral18/pagina-de-captura',
    live: null,
    featured: false,
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 },
    )
    sectionRef.current?.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="relative py-28 bg-[#060c1a]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in-section flex items-center gap-3 mb-16">
          <span className="font-mono text-blue-400 text-sm">03.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Projetos</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent ml-2" />
        </div>

        {/* Featured projects */}
        <div className="space-y-8 mb-14">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <div
                key={project.name}
                className="fade-in-section card-glow rounded-xl bg-[#0a1628] p-6 md:p-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                        destaque
                      </span>
                      <h3 className="text-lg font-bold text-white">{project.name}</h3>
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
                        className="text-slate-400 hover:text-blue-400 transition-colors"
                        aria-label="Ver projeto ao vivo"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Other projects grid */}
        <div className="fade-in-section">
          <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-6">
            Outros projetos
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects
              .filter((p) => !p.featured)
              .map((project, i) => (
                <div
                  key={project.name}
                  className="card-glow rounded-lg bg-[#0a1628] p-5"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-semibold text-sm">{project.name}</h4>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
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
                </div>
              ))}
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
            <FiExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
