import { cookies } from 'next/headers';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PropsWithChildren } from 'react';

export default async function MainProvider({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

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
  );
}
