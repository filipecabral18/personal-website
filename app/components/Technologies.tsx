'use client'

import { useEffect, useRef } from 'react'
import {
  SiTypescript, SiPython, SiNodedotjs, SiNestjs, SiFastapi,
  SiExpress, SiReact, SiNextdotjs, SiDocker, SiTerraform,
  SiPostgresql, SiRedis, SiGrafana,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const categories = [
  {
    label: 'Linguagens',
    items: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'Python', icon: SiPython, color: '#3b82f6' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#68a063' },
      { name: 'NestJS', icon: SiNestjs, color: '#e0234e' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Express', icon: SiExpress, color: '#ebebeb' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: SiReact, color: '#61dafb' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ebebeb' },
    ],
  },
  {
    label: 'Infra & Cloud',
    items: [
      { name: 'Docker', icon: SiDocker, color: '#2496ed' },
      { name: 'Terraform', icon: SiTerraform, color: '#7b42bc' },
      { name: 'AWS', icon: FaAws, color: '#ff9900' },
      { name: 'Grafana', icon: SiGrafana, color: '#f46800' },
    ],
  },
  {
    label: 'Banco de dados',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'Redis', icon: SiRedis, color: '#dc382d' },
    ],
  },
]

export default function Technologies() {
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
      id="tecnologias"
      ref={sectionRef}
      className="relative py-28 bg-[#0a1628]"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="fade-in-section flex items-center gap-3 mb-16">
          <span className="font-mono text-blue-400 text-sm">02.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Tecnologias</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent ml-2" />
        </div>

        <div className="space-y-10">
          {categories.map((cat, catIdx) => (
            <div
              key={cat.label}
              className="fade-in-section"
              style={{ transitionDelay: `${catIdx * 80}ms` }}
            >
              <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#060c1a] border border-blue-500/10 hover:border-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                  >
                    <tech.icon
                      size={18}
                      style={{ color: tech.color }}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="font-mono text-sm text-slate-300 group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently learning */}
        <div className="fade-in-section mt-14 p-5 rounded-xl bg-blue-500/5 border border-blue-500/15">
          <p className="font-mono text-xs text-blue-400 mb-2">// atualmente explorando</p>
          <p className="text-slate-300 text-sm">
            <strong className="text-white">AI & Software Architecture</strong> — estudando
            sistemas de ML, design patterns avançados e arquiteturas distribuídas.
          </p>
        </div>
      </div>
    </section>
  )
}
