import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carlos Filipe Cabral | Software Engineer',
  description:
    'Portfolio de Carlos Filipe Cabral — Software Engineer Full Stack especializado em backend, sistemas escaláveis e arquitetura de software.',
  keywords: ['Software Engineer', 'Full Stack', 'TypeScript', 'Node.js', 'NestJS', 'React', 'Next.js'],
  authors: [{ name: 'Carlos Filipe Cabral' }],
  openGraph: {
    title: 'Carlos Filipe Cabral | Software Engineer',
    description: 'Portfolio de Carlos Filipe Cabral — Software Engineer Full Stack.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
