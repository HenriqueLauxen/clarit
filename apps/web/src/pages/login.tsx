import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <Card className="w-full  max-w-sm ring-border">
        <CardHeader>
          <CardTitle>Clarit</CardTitle>
          <CardDescription>Faça login no Clarit</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="user">Usuário</Label>
              <Input id="user" name="user" type="user" autoComplete="off" required></Input>
            </div>
            
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" autoComplete="off" required></Input>
            </div>

            <Button type="submit">Login</Button>

          </form>
        </CardContent>
      </Card>
    </main>
  )
}