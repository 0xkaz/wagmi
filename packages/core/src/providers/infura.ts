import { providers } from 'ethers'

import type { ChainProviderFn, FallbackProviderConfig } from '../types'

export type InfuraProviderConfig = FallbackProviderConfig & {
  /** Your Infura API key from the [Infura Dashboard](https://infura.io/login). */
  apiKey: string
}

export function infuraProvider({
  apiKey,
  priority,
  stallTimeout,
  weight,
}: InfuraProviderConfig): ChainProviderFn<
  providers.InfuraProvider,
  providers.InfuraWebSocketProvider
> {
  return function (chain) {
    if (!chain.rpcUrls.infura) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.infura}/${apiKey}`,
        },
      },
      provider: () => {
        const provider = new providers.InfuraProvider(chain.id, apiKey)
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      webSocketProvider: () =>
        new providers.InfuraWebSocketProvider(chain.id, apiKey),
    }
  }
}
