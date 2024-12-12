import { SiteHeader } from "@/components/site-header"
import { PasswordGenerator } from "@/components/password-generator"
import { CustomToaster } from "@/components/ui/custom-toaster"
import { SiteFooter } from "@/components/site-footer"
// import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <SiteHeader />
      <main className="container py-6 lg:py-12">
        <PasswordGenerator />
      </main>
      <SiteFooter />
      <CustomToaster />
    </div>
  )
}

