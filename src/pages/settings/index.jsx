import { useAuth } from '@/contexts/AuthContext'
import { NotificationsTab } from './components/NotificationsTab'
import { PreferencesTab } from './components/PreferencesTab'
import { ProfileTab } from './components/ProfileTab'
import { SecurityTab } from './components/SecurityTab'
import { SettingsHeader } from './components/SettingsHeader'
import { useSettings } from './hooks/useSettings'

export const SettingsPage = () => {
  const { user } = useAuth()

  const {
    profile,
    setProfile,
    preferences,
    setPreferences,
    security,
    setSecurity,
    notifications,
    setNotifications
  } = useSettings(user)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <SettingsHeader />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ProfileTab profile={profile} setProfile={setProfile} />
        <PreferencesTab
          preferences={preferences}
          setPreferences={setPreferences}
        />
      </div>

      <SecurityTab security={security} setSecurity={setSecurity} />

      <NotificationsTab
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </div>
  )
}
