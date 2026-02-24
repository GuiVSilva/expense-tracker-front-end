import { useEffect, useState } from 'react'
import {
  defaultNotifications,
  defaultPreferences,
  defaultProfile,
  defaultSecurity
} from '../utils/settingsUtils'

export const useSettings = user => {
  const [profile, setProfile] = useState(defaultProfile(user))
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [security, setSecurity] = useState(defaultSecurity)
  const [notifications, setNotifications] = useState(defaultNotifications)

  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      name: user?.name || prev.name,
      email: user?.email || prev.email
    }))
  }, [user?.name, user?.email])

  return {
    profile,
    setProfile,
    preferences,
    setPreferences,
    security,
    setSecurity,
    notifications,
    setNotifications
  }
}
