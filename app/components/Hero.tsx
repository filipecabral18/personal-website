'use client'

import { useEffect, useRef, useState } from 'react'
import { FiArrowDown } from 'react-icons/fi'

const roles = [
  'Software Engineer',
  'Full Stack Developer',
  'Backend Specialist',
  'Systems Architect',
]

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1))
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pause)
          }
        } else {
          setText(current.slice(0, text.length - 1))
          if (text.length - 1 === 0) {
            setIsDeleting(false)
            setWordIdx((i) => (i + 1) % words.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    )
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIdx, words, speed, pause])

  return text
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const role = useTypewriter(roles)

  // Particle system with mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          p.vx += (dx / dist) * force * 0.3
          p.vy += (dy / dist) * force * 0.3
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060c1a]">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-transparent" style={{ zIndex: 2 }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060c1a] to-transparent" style={{ zIndex: 2 }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-blue-300">Disponível para oportunidades</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
          Carlos{' '}
          <span className="gradient-text">Filipe</span>
          <br />
          <span className="text-slate-300">Cabral</span>
        </h1>

        <div className="h-10 flex items-center justify-center mb-6">
          <span className="font-mono text-lg md:text-xl text-blue-400">
            {role}
            <span className="animate-pulse text-blue-300">_</span>
          </span>
        </div>

        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Construindo sistemas robustos do backend ao frontend.
          Apaixonado por arquitetura de software e aprendizado contínuo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projetos"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm rounded border border-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Ver projetos
          </a>
          <a
            href="#contato"
            className="px-8 py-3 bg-transparent hover:bg-blue-500/10 text-slate-300 hover:text-white font-mono text-sm rounded border border-slate-600 hover:border-blue-500 transition-all duration-200"
          >
            Entre em contato
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-500 hover:text-blue-400 transition-colors animate-bounce"
        aria-label="Rolar para baixo"
      >
        <FiArrowDown size={20} />
      </a>
    </section>
  )
}
