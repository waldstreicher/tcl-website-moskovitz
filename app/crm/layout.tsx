import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investor CRM | Crystal Shape',
}

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
