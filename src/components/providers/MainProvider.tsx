import { ThemeProvider } from '@/components/providers/theme-provider'
import { getCookie } from 'cookies-next/server'
import { cookies } from 'next/headers'
import { SidebarProvider } from '@/components/ui/sidebar'
import { type PropsWithChildren } from 'react'
import { SIDEBAR_COOKIE_NAME } from '@/lib/constants'
import { TooltipProvider } from '@/components/ui/tooltip'

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
        <TooltipProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            {children}
          </SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </>
  )
}
