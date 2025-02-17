import { type PropsWithChildren } from 'react'
import PageHeaderComponent from '@/components/test-components/PageHeaderComponent'
import { SidebarInset } from '@/components/ui/sidebar'
import { MainSidebarComponent } from '@/components/test-components/MainSidebarComponent'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainSidebarComponent />
      <SidebarInset>
        <PageHeaderComponent />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </>
  )
}
