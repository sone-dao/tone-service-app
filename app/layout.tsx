import Helmet from '@sone-dao/tone-react-helmet'
import Sidebar from '@sone-dao/tone-react-sidebar'
//import UserController from '@sone-dao/tone-react-user-controller'
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
      </head>
      <body>
        <Helmet />
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  )
}
