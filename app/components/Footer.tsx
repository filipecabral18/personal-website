export default function Footer() {
  return (
    <footer className="py-8 bg-[#060c1a] border-t border-blue-500/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-sm text-slate-600">
          Desenvolvido por{' '}
          <span className="text-slate-400">Carlos Filipe Cabral</span>
        </span>
        <span className="font-mono text-xs text-slate-700">
          Next.js · TypeScript · Tailwind CSS
        </span>
      </div>
    </footer>
  )
}
