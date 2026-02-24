import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Moon, Monitor, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'

const themeCards = [
  {
    id: 'light',
    label: 'Claro',
    icon: Sun,
    preview: 'bg-linear-to-br from-zinc-100 to-zinc-300 border-zinc-300'
  },
  {
    id: 'dark',
    label: 'Escuro',
    icon: Moon,
    preview: 'bg-linear-to-br from-zinc-800 to-zinc-950 border-zinc-700'
  },
  {
    id: 'system',
    label: 'Sistema',
    icon: Monitor,
    preview: 'bg-linear-to-br from-sky-300 via-zinc-200 to-zinc-900 border-zinc-500'
  }
]

export const PreferencesTab = ({ preferences, setPreferences }) => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (theme && preferences.theme !== theme) {
      setPreferences(prev => ({ ...prev, theme }))
    }
  }, [theme, preferences.theme, setPreferences])

  const handleThemeChange = nextTheme => {
    setTheme(nextTheme)
    setPreferences({ ...preferences, theme: nextTheme })
  }

  return (
    <Card id="preferences" className="border-border bg-card/80">
      <CardHeader>
        <CardTitle>Preferencias</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Tema da interface</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {themeCards.map(theme => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  preferences.theme === theme.id
                    ? 'border-primary ring-1 ring-primary/50 bg-primary/5'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <div className={`h-14 rounded-lg border ${theme.preview}`} />
                <div className="mt-2 flex items-center gap-2">
                  <theme.icon className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">{theme.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Button className="h-11" variant="outline">
          Tema aplicado em tempo real
        </Button>
      </CardContent>
    </Card>
  )
}
