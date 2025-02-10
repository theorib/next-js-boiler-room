import { type PropsWithChildren } from 'react'
import PageHeaderComponent from '@/components/test-components/PageHeaderComponent'
import { SidebarInset } from '@/components/ui/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getCookie } from 'cookies-next/server'
import { cookies } from 'next/headers'

import { MainSidebarComponent } from '@/components/test-components/MainSidebarComponent'
export default async function MainLayout({ children }: PropsWithChildren) {
  const defaultOpen = (await getCookie('sidebar:state', { cookies })) === 'true'

  return (
    <>
      <SidebarProvider
        defaultOpen={defaultOpen}
        // className="flex min-h-screen w-full grow flex-col items-center justify-center"
        className="flex w-full grow"
      >
        <MainSidebarComponent />
        <SidebarInset>
          <PageHeaderComponent />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
