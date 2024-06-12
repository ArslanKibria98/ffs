"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { AntdRegistry } from '@ant-design/nextjs-registry';


function Providers({ children, session }) {
  return (
    <AntdRegistry>
        <AppRouterCacheProvider>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </AppRouterCacheProvider>
    </AntdRegistry>
  )
}

export default Providers