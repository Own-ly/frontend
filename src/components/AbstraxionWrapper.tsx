'use client'

import { AbstraxionProvider } from '@burnt-labs/abstraxion'
import { ReactNode } from 'react'

export default function AbstraxionWrapper({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AbstraxionProvider
      config={{
        contracts: [{
          address: 'xion135kmcrpk6gzt5t5ljj5p9wdem38rn2ad8rshgfzjwml2uycfkwvqu67403',
          amounts: []
        }]
      }}
    >
      {children}
    </AbstraxionProvider>
  )
}
