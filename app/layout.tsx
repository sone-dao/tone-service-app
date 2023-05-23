import Helmet from '@sone-dao/tone-react-helmet'
import Sidebar from '@sone-dao/tone-react-sidebar'
import UserController from '@sone-dao/tone-react-user-controller'
import Script from 'next/script'
import React from 'react'
import './global.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://kit.fontawesome.com/db877d7948.js"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <UserController>
          <Helmet />
          <Sidebar />
          <main>{children}</main>
        </UserController>
      </body>
    </html>
  )
}
