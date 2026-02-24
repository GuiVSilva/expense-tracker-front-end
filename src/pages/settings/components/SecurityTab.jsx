import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, Lock } from 'lucide-react'

export const SecurityTab = ({ security, setSecurity }) => {
  const passwordRequirements = [
    { text: 'Minimo 8 caracteres', met: security.newPassword.length >= 8 },
    { text: 'Uma letra maiuscula', met: /[A-Z]/.test(security.newPassword) },
    { text: 'Uma letra minuscula', met: /[a-z]/.test(security.newPassword) },
    { text: 'Um numero', met: /[0-9]/.test(security.newPassword) }
  ]

  return (
    <Card className="border-border bg-card/80">
      <CardHeader>
        <CardTitle>Seguranca</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha atual</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="current-password"
                type="password"
                className="h-12 bg-card border-border focus:border-primary pl-12"
                value={security.currentPassword}
                onChange={event =>
                  setSecurity({ ...security, currentPassword: event.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova senha</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="new-password"
                type="password"
                className="h-12 bg-card border-border focus:border-primary pl-12"
                value={security.newPassword}
                onChange={event =>
                  setSecurity({ ...security, newPassword: event.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar nova senha</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="confirm-password"
                type="password"
                className="h-12 bg-card border-border focus:border-primary pl-12"
                value={security.confirmPassword}
                onChange={event =>
                  setSecurity({ ...security, confirmPassword: event.target.value })
                }
              />
            </div>
          </div>
        </div>

        {security.newPassword && (
          <div className="grid grid-cols-2 gap-2">
            {passwordRequirements.map((req, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-xs ${
                  req.met ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    req.met ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  {req.met && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                {req.text}
              </div>
            ))}
          </div>
        )}

        <Button className="h-11">Atualizar senha</Button>
      </CardContent>
    </Card>
  )
}
