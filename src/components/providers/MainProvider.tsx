import { ThemeProvider } from '@/components/providers/theme-provider'
import { getCookie } from 'cookies-next/server'
import { cookies } from 'next/headers'
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '@/components/ui/sidebar'
import { type PropsWithChildren } from 'react'

export default async function MainProvider({ children }: PropsWithChildren) {
  const defaultOpen =
    (await getCookie(SIDEBAR_COOKIE_NAME, { cookies })) === 'true'

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider
          defaultOpen={defaultOpen}
          className="flex min-h-screen grow flex-col items-center justify-center"
        >
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}
