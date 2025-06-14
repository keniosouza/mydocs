"use client"

import { useLoginForm, LoginFormData } from "./login.validate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export function Login() {
  const router = useRouter()

  const form = useLoginForm({
    username: "",
    password: "",
  })

  async function onSubmit(values: LoginFormData) {
    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false, // controlamos manualmente o redirecionamento
    })

    console.log(res)

    if (res?.ok) {
      toast.success("Login realizado com sucesso!")
      router.push("/dashboard")
    } else {
      toast("Erro ao autenticar", {
        description: "Usuário ou senha incorretos",
        action: {
          label: "Tentar novamente",
          onClick: () => location.reload(),
        },
      })
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col items-center">
                Boas vindas
              </CardTitle>
              <span className="text-xs text-center">
                Faça seu login com e-mail e senha
              </span>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">E-mail:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o e-mail de acesso"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Senha:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite a senha de acesso"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Efetuar autenticação
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
