"use client"
import React from 'react'
// import { SessionProvider } from 'next-auth/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ReduxProvider from '@/redux/redux-provider';

function Providers({ children, session }) {
  return (
    <AntdRegistry>
      <AppRouterCacheProvider>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </AppRouterCacheProvider>
    </AntdRegistry>
  )
}

export default Providers