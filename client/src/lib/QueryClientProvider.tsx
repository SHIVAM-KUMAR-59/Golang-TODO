'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TransportProvider } from '@connectrpc/connect-query'
import { createConnectTransport } from '@connectrpc/connect-web'
import { API_BASE_URL } from '@/config/config'

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  const transport = createConnectTransport({
    baseUrl: API_BASE_URL,
    interceptors: [
      (next) => (request) => {
        return next(request)
      },
    ],
  })

  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TransportProvider>
  )
}
