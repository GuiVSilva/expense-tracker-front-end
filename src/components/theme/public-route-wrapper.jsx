import { PublicThemeReset } from './public-theme-reset'

export const PublicRouteWrapper = ({ children }) => {
  return (
    <>
      <PublicThemeReset />
      {children}
    </>
  )
}
