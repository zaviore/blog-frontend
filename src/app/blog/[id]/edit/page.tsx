import { redirect } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

export default function Page({ params }: PageProps) {
  redirect(`/admin/blog/${params.id}/edit`)
}
