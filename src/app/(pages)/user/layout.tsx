
import React, { useState } from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <p>helllo this is from layout</p>{children}</div>
  )
}

export default Layout