'use client'

import Placeholder from '@sone-dao/sone-react-placeholder'
import { Page } from '@sone-dao/tone-react-core-ui'
import { useEffect } from 'react'

export default function HomePage() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--desktop-grid-template-areas',
      `'helmet helmet' 'sidebar content'`
    )

    document.documentElement.style.setProperty('--sidebar-display', 'flex')
    document.documentElement.style.setProperty('--helmet-display', 'flex')
  }, [])

  return (
    <Page>
      <Placeholder display="Page: Home" height="100%" color="#00A30D" />
    </Page>
  )
}
