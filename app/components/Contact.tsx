'use client'

import { useEffect, useRef } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi'

const contacts = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'filipecabral.dev@gmail.com',
    href: 'mailto:filipecabral.dev@gmail.com',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'filipecabral18',
    href: 'https://github.com/filipecabral18',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'carloscabraldev',
    href: 'https://www.linkedin.com/in/carloscabraldev/',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15 },
    )
    sectionRef.current?.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative py-28 bg-[#0a1628]"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="fade-in-section flex items-center gap-3 mb-16 justify-center">
          <span className="font-mono text-blue-400 text-sm">04.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Contato</h2>
          <div className="w-24 h-px bg-gradient-to-r from-blue-500/40 to-transparent ml-2" />
        </div>

        <div className="fade-in-section mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vamos conversar?
          </h3>
          <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto">
            Estou aberto a novas oportunidades, projetos interessantes ou apenas uma boa
            conversa sobre tecnologia. Me mande uma mensagem!
          </p>
        </div>

        {/* Contact cards */}
        <div className="fade-in-section grid sm:grid-cols-3 gap-4 mb-10">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group card-glow flex flex-col items-center gap-3 p-5 rounded-xl bg-[#060c1a]"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <c.icon size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">{c.label}</p>
                <p className="text-sm text-slate-300 group-hover:text-white transition-colors font-mono">
                  {c.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="fade-in-section">
          <a
            href="mailto:filipecabral.dev@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm rounded border border-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 group"
          >
            Enviar mensagem
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
