'use client'

import Login from '@sone-dao/tone-react-login'
import { useEffect } from 'react'

export default function LoginPage() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--desktop-grid-template-areas',
      `'content content' 'content content'`
    )

    //document.documentElement.style.setProperty('--helmet-display', 'none')
    //document.documentElement.style.setProperty('--sidebar-display', 'none')
  }, [])

  return <Login />
}
