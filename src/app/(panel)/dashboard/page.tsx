// app/dashboard/page.tsx

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  // Recupera a sessão no servidor
  const session = await getServerSession(authOptions)

  // Redireciona para login se não estiver autenticado
  if (!session) {
    redirect("/")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Página Dashboard</h1>

      <div className="mb-6 space-y-1 text-sm">
        <p><strong>Usuário logado:</strong> {session.user.name}</p>
        <p><strong>ID:</strong> {session.user.id}</p>
        <p><strong>Token:</strong> {session.user.token}</p>
      </div>

      <div className="w-full h-[600px] bg-gray-200 mb-10 rounded-lg"></div>
      <div className="w-full h-[600px] bg-gray-500 mb-10 rounded-lg"></div>
      <div className="w-full h-[600px] bg-gray-200 mb-10 rounded-lg"></div>
    </div>
  )
}
