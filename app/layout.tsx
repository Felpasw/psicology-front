import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { Link } from '@nextui-org/link'
import clsx from 'clsx'
import 'react-toastify/dist/ReactToastify.css'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

// export const viewport: Viewport = {
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: 'white' },
//     { media: '(prefers-color-scheme: dark)', color: 'black' },
//   ],
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className='relative flex flex-col h-screen overflow-y-hidden'>
            <main className='flex-grow'>{children}</main>
            <ToastContainer />
            <footer className='w-full flex items-center justify-center py-3 fixed bottom-0 text-sm'>
              <Link
                isExternal
                className=' flex items-center gap-1 text-current'
                href='https://github.com/Felpasw/psicology-front'
                title='Psicology Management'>
                <span className='text-default-600'>Psicology Management</span>
                <p className='text-primary'>- felpasw</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
