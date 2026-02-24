export const avatarOptions = [
  { id: 'avatar-1', label: 'Orbit', gradient: 'from-cyan-400 to-blue-600', initials: 'OR' },
  { id: 'avatar-2', label: 'Nova', gradient: 'from-fuchsia-500 to-rose-500', initials: 'NV' },
  { id: 'avatar-3', label: 'Leaf', gradient: 'from-emerald-400 to-teal-600', initials: 'LF' },
  { id: 'avatar-4', label: 'Sun', gradient: 'from-amber-400 to-orange-600', initials: 'SN' },
  { id: 'avatar-5', label: 'Cloud', gradient: 'from-slate-400 to-slate-600', initials: 'CL' },
  { id: 'avatar-6', label: 'Wave', gradient: 'from-indigo-400 to-violet-600', initials: 'WV' }
]

export const defaultProfile = user => ({
  name: user?.name || 'Usuario',
  email: user?.email || 'usuario@email.com',
  avatarId: 'avatar-1'
})

export const defaultPreferences = {
  theme: 'system'
}

export const defaultSecurity = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

export const defaultNotifications = {
  spendingLimitAlerts: true,
  goalsAchieved: true,
  upcomingPayments: true,
  weeklySummary: false
}
