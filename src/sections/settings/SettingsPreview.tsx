import { useState } from 'react'
import data from '@/../product/sections/settings/data.json'
import { Settings } from './components/Settings'
import type {
  BaseCurrency,
  ThemeOption,
  MintConfig,
  SettingsProps,
} from '@/../product/sections/settings/types'

export function SettingsPreview() {
  const [baseCurrency, setBaseCurrency] = useState<BaseCurrency>(
    data.baseCurrency as BaseCurrency
  )
  const [theme, setTheme] = useState<ThemeOption>(data.theme as ThemeOption)
  const [mints, setMints] = useState<MintConfig[]>(
    data.mints as MintConfig[]
  )

  const props: SettingsProps = {
    baseCurrency,
    theme,
    mints,
    appVersion: data.appVersion,
    onBaseCurrencyChange: (currency) => {
      console.log('Base currency changed:', currency)
      setBaseCurrency(currency)
    },
    onThemeChange: (t) => {
      console.log('Theme changed:', t)
      setTheme(t)
    },
    onAddMint: (url) => {
      console.log('Add mint:', url)
      setMints((prev) => [
        ...prev,
        {
          url,
          isDefault: false,
          connectionStatus: 'connected',
          addedDate: new Date().toISOString(),
        },
      ])
    },
    onRemoveMint: (url) => {
      console.log('Remove mint:', url)
      setMints((prev) => prev.filter((m) => m.url !== url))
    },
    onViewSeedPhrase: () => {
      console.log('Seed phrase viewed')
    },
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <Settings {...props} />
    </div>
  )
}

export default SettingsPreview
