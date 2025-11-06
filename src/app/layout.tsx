import './globals.css'

export const metadata = {
  title: 'Avatar Studio 3D',
  description: 'Monte um avatar 3D personalizado diretamente no navegador.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
