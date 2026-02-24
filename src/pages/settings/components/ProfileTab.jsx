import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, User } from 'lucide-react'
import { avatarOptions } from '../utils/settingsUtils'

export const ProfileTab = ({ profile, setProfile }) => {
  const selectedAvatar =
    avatarOptions.find(avatar => avatar.id === profile.avatarId) || avatarOptions[0]

  return (
    <Card id="profile" className="border-border bg-card/80">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-secondary/20 p-3">
          <div
            className={`h-16 w-16 rounded-full bg-linear-to-br ${selectedAvatar.gradient} text-white flex items-center justify-center font-bold`}
          >
            {selectedAvatar.initials}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Avatar selecionado</p>
            <p className="text-xs text-muted-foreground">{selectedAvatar.label}</p>
          </div>
        </div>

        <div>
          <Label className="mb-2">Escolha seu avatar</Label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {avatarOptions.map(avatar => (
              <button
                key={avatar.id}
                onClick={() => setProfile({ ...profile, avatarId: avatar.id })}
                className={`h-14 rounded-xl bg-linear-to-br ${avatar.gradient} text-white text-xs font-semibold transition-transform hover:scale-[1.02] ${
                  profile.avatarId === avatar.id
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'opacity-85'
                }`}
              >
                {avatar.initials}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Nome</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="profile-name"
                className="h-12 bg-card border-border focus:border-primary pl-12"
                value={profile.name}
                onChange={event => setProfile({ ...profile, name: event.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="profile-email"
                type="email"
                className="h-12 bg-card border-border focus:border-primary pl-12"
                value={profile.email}
                onChange={event => setProfile({ ...profile, email: event.target.value })}
              />
            </div>
          </div>
        </div>

        <Button className="h-11">Salvar perfil</Button>
      </CardContent>
    </Card>
  )
}
