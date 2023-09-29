import './globals.css'
import type { Metadata } from 'next'
import { EB_Garamond } from 'next/font/google'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Header } from '../components/Header/Header'
import { LayoutContext } from '../contexts/LayoutContext'

const eb_garamond = EB_Garamond({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Harry Potter - Mischief Managed App',
  description: 'An application for real potterheads',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={eb_garamond.className}>
        <LayoutContext>
          <Header />
          <div className='flex flex-wrap sm:flex-nowrap'>
            <Sidebar /> 
            {children}
          </div>
        </LayoutContext>   
      </body>
    </html>
  )
}
