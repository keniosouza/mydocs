import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface UseLoginFormProps {
  username: string;
  password: string;
}

// Valida os campos
const loginSchema = z.object({
  username: z.string().min(1, { message: "O e-mail é obrigatório" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
})

// Passa a dipagem e validação dos campos
export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm({ username, password }: UseLoginFormProps) {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: username,
      password: password
    }
  })
}