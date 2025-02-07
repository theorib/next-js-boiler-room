import { ThemeProvider } from '@/components/providers/theme-provider'
import { PropsWithChildren } from 'react'
import { getCookie } from 'cookies-next/server'
import { cookies } from 'next/headers'
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '@/components/ui/sidebar'

export default async function MainProvider({ children }: PropsWithChildren) {
  // const cookieStore = await cookies()
  // const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'
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
