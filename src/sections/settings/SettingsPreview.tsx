import { useState } from 'react'
import data from '@/../product/sections/settings/data.json'
import { Settings } from './components/Settings'
import type {
  SettingsCategory,
  SettingsState,
  BaseCurrency,
  ThemeOption,
  LanguageCode,
  NostrSignerMode,
  MintConfig,
  RelayConfig,
  SettingsProps,
} from '@/../product/sections/settings/types'

export function SettingsPreview() {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>(
    data.activeCategory as SettingsCategory
  )
  const [settings, setSettings] = useState<SettingsState>(
    data.settings as unknown as SettingsState
  )

  const props: SettingsProps = {
    activeCategory,
    settings,
    onCategoryToggle: (category) => {
      console.log('Category toggled:', category)
      setActiveCategory(category)
    },
    onBaseCurrencyChange: (currency) => {
      console.log('Base currency changed:', currency)
      setSettings((prev) => ({
        ...prev,
        general: { ...prev.general, baseCurrency: currency },
      }))
    },
    onLanguageChange: (language) => {
      console.log('Language changed:', language)
      setSettings((prev) => ({
        ...prev,
        general: { ...prev.general, language },
      }))
    },
    onThemeChange: (theme) => {
      console.log('Theme changed:', theme)
      setSettings((prev) => ({
        ...prev,
        general: { ...prev.general, theme },
      }))
    },
    onAddMint: (url) => {
      console.log('Add mint:', url)
      setSettings((prev) => ({
        ...prev,
        cashu: {
          ...prev.cashu,
          mints: [
            ...prev.cashu.mints,
            {
              url,
              isDefault: false,
              connectionStatus: 'connected' as const,
              addedDate: new Date().toISOString(),
            },
          ],
        },
      }))
    },
    onRemoveMint: (url) => {
      console.log('Remove mint:', url)
      setSettings((prev) => ({
        ...prev,
        cashu: {
          ...prev.cashu,
          mints: prev.cashu.mints.filter((m) => m.url !== url),
        },
      }))
    },
    onViewSeedPhrase: () => {
      console.log('Seed phrase viewed')
    },
    onSignerModeChange: (mode) => {
      console.log('Signer mode changed:', mode)
      setSettings((prev) => ({
        ...prev,
        nostr: {
          ...prev.nostr,
          signerMode: mode,
          profile: mode === 'none' ? null : prev.nostr.profile,
          profileFetchStatus: mode === 'none' ? 'idle' : prev.nostr.profileFetchStatus,
        },
      }))
    },
    onNsecSubmit: (nsec) => {
      console.log('nsec submitted:', nsec.slice(0, 10) + '...')
    },
    onAddRelay: (url) => {
      console.log('Add relay:', url)
      setSettings((prev) => ({
        ...prev,
        nostr: {
          ...prev.nostr,
          relays: [
            ...prev.nostr.relays,
            { url, connectionStatus: 'connected' as const },
          ],
        },
      }))
    },
    onRemoveRelay: (url) => {
      console.log('Remove relay:', url)
      setSettings((prev) => ({
        ...prev,
        nostr: {
          ...prev.nostr,
          relays: prev.nostr.relays.filter((r) => r.url !== url),
        },
      }))
    },
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <Settings {...props} />
    </div>
  )
}

export default SettingsPreview
