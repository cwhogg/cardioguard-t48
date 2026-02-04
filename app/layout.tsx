import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'Advanced Cardiovascular Biomarkers Testing — CardioGuard',
  description: 'Get advanced cardiovascular biomarkers including ApoB and Lp(a) testing without doctor orders. Professional heart disease prevention for health-conscious individuals.',
  keywords: 'cardiovascular biomarkers, ApoB test, lipoprotein a test, heart disease prevention, advanced lipid panel, cardiac risk assessment',
  authors: [{ name: 'CardioGuard' }],
  creator: 'CardioGuard',
  publisher: 'CardioGuard',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  alternates: {
    canonical: 'https://cardioguard.com'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cardioguard.com',
    siteName: 'CardioGuard',
    title: 'Advanced Cardiovascular Biomarkers Testing — CardioGuard',
    description: 'Get advanced cardiovascular biomarkers including ApoB and Lp(a) testing without doctor orders. Professional heart disease prevention for health-conscious individuals.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Cardiovascular Biomarkers Testing — CardioGuard',
    description: 'Get advanced cardiovascular biomarkers including ApoB and Lp(a) testing without doctor orders. Professional heart disease prevention for health-conscious individuals.'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-textPrimary antialiased">
        {children}
      </body>
    </html>
  )
}