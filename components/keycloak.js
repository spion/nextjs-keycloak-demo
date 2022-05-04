import Keycloak from 'keycloak-js'
import React from 'react'

export const TokenContext = React.createContext(null)

let kc, initialization

if (typeof window !== 'undefined') {
  const tokens = localStorage.getItem('tokens')

  kc = new Keycloak({
    url: 'http://localhost:8081/',
    realm: 'demo',
    clientId: 'next-app',
  })

  initialization = kc.init({
    onLoad: 'login-required',
    checkLoginIframe: true,
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    ...(tokens ? JSON.parse(tokens) : {}),
  })
}

export default function Authenticated({ children }) {
  let [authState, setAuthState] = React.useState({ state: 'unauthenticated' })

  React.useEffect(() => {
    initialization.then(authenticated => {
      if (authenticated) {
        localStorage.setItem(
          'tokens',
          JSON.stringify({
            refreshToken: kc.refreshToken,
            token: kc.token,
          })
        )
        setAuthState({ state: 'authenticated', info: kc.tokenParsed, token: kc.token })
      }
    })
  }, [])

  return authState.state === 'authenticated' ? (
    <TokenContext.Provider value={authState}>{children}</TokenContext.Provider>
  ) : (
    <p>Sorry you are not allowed</p>
  )
}
