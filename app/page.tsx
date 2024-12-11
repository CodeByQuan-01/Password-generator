import { SiteHeader } from "@/components/site-header"
import { PasswordGenerator } from "@/components/password-generator"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <SiteHeader />
        <main className="container py-12 lg:py-24">
          <PasswordGenerator />
        </main>
      </div>
    </ThemeProvider>
  )
}

