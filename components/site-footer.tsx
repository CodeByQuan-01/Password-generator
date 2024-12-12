import { Code } from 'lucide-react'

export function SiteFooter() {
  return (
    <div className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
      <p>Created by <span className="font-semibold">codebyquan</span></p>
      <Code className="inline-block text-blue-600 dark:text-blue-400 animate-bounce mt-2" />
    </div>
  )
}

