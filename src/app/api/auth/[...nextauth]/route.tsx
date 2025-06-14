// src/app/api/auth/[...nextauth]/route.tsx
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8000/api/v1/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            username: credentials.username,
            password: credentials.password,
          }),
        })

        const responseBody = await res.text() // Recebe como texto para evitar erro de JSON inválido
        console.log("🔐 Resposta bruta da API:", responseBody)

        if (!res.ok) {
          console.error("❌ Erro ao autenticar:", res.status, res.statusText)
          return null
        }

        try {
          const user = JSON.parse(responseBody)
          console.log("✅ Usuário autenticado com sucesso:", user)

          return {
            id: user.id,
            name: user.username,
            token: user.access_token,
          }
        } catch (err) {
          console.error("❌ Erro ao converter resposta da API em JSON:", err)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.token = user.token
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.token = token.token
      session.user.name = token.name
      return session
    }
  },
  pages: {
    signIn: "/", // Redireciona para esta rota caso o usuário não esteja autenticado
  }
}

// Exporta os handlers GET e POST para o Next.js
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
