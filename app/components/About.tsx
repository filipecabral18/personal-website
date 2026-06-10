'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 },
    )
    const els = sectionRef.current?.querySelectorAll('.fade-in-section')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative py-28 bg-[#060c1a]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="fade-in-section flex items-center gap-3 mb-16">
          <span className="font-mono text-blue-400 text-sm">01.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Sobre mim</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent ml-2" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="fade-in-section space-y-5">
            <p className="text-slate-300 leading-relaxed text-base">
              Olá! Sou <strong className="text-white">Carlos Filipe</strong>, um Software Engineer
              baseado em Aracaju, Brasil. Trabalho com desenvolvimento full stack, com foco especial
              em arquitetura backend e sistemas escaláveis.
            </p>
            <p className="text-slate-400 leading-relaxed text-base">
              Atualmente atuo na área de tecnologia em Water Services, onde desenvolvo e mantenho
              soluções de software que impactam diretamente o negócio. Tenho interesse profundo em
              design de sistemas, boas práticas de engenharia e aprendizado em IA.
            </p>
            <p className="text-slate-400 leading-relaxed text-base">
              Quando não estou programando, estou estudando arquitetura de software ou explorando
              novas tecnologias para evoluir como engenheiro.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '21', label: 'Repositórios' },
                { value: '5+', label: 'Tecnologias' },
                { value: '100%', label: 'Dedicação' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded-lg bg-blue-500/5 border border-blue-500/10"
                >
                  <div className="font-mono text-2xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="fade-in-section flex justify-center md:justify-end">
            <div className="relative group">
              {/* Decorative frame */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-500/40 via-blue-600/20 to-transparent blur-sm group-hover:blur-md transition-all duration-500" />
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-xl overflow-hidden border border-blue-500/20">
                <Image
                  src="/profile.jpg"
                  alt="Carlos Filipe Cabral"
                  fill
                  className="object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060c1a]/60 via-transparent to-transparent" />
              </div>
              {/* Corner accent */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-blue-500/40 rounded-br-xl" />
              <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-blue-500/20 rounded-tl-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
