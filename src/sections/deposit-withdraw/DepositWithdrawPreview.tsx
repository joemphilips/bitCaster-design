import { useState } from 'react'
import data from '@/../product/sections/deposit-withdraw/data.json'
import type {
  DepositWithdrawMode,
  DepositWithdrawView,
  MethodType,
} from '@/../product/sections/deposit-withdraw/types'
import { DepositWithdraw } from './components/DepositWithdraw'

export default function DepositWithdrawPreview() {
  const [mode, setMode] = useState<DepositWithdrawMode>(
    data.mode as DepositWithdrawMode
  )
  const [currentView, setCurrentView] = useState<DepositWithdrawView>(
    data.currentView as DepositWithdrawView
  )
  const [selectedMintId, setSelectedMintId] = useState(data.selectedMintId)
  const [amountSats, setAmountSats] = useState(data.amountSats)
  const [showFiatPrimary, setShowFiatPrimary] = useState(data.showFiatPrimary)
  const [lightningInput, setLightningInput] = useState(data.lightningInput)

  // Simple fiat conversion (demo rate: 1 sat ≈ $0.00066)
  const fiatAmount = (amountSats * 0.00066).toFixed(2)

  const handleSelectMethod = (method: MethodType) => {
    if (mode === 'deposit') {
      setCurrentView(
        method === 'ecash' ? 'deposit-ecash' : 'deposit-lightning'
      )
    } else {
      setCurrentView(method === 'ecash' ? 'send-ecash' : 'pay-lightning')
    }
  }

  const handleNumpadPress = (key: string) => {
    if (key === 'backspace') {
      setAmountSats((prev) => Math.floor(prev / 10))
    } else {
      setAmountSats((prev) => {
        const next = prev * 10 + parseInt(key)
        return next > 21_000_000_00 ? prev : next // cap at 21M sats
      })
    }
  }

  const handleBack = () => {
    setCurrentView('chooser')
    setAmountSats(0)
  }

  const handleClose = () => {
    setCurrentView('chooser')
    setAmountSats(0)
    setLightningInput('')
  }

  // Mode toggle buttons for the demo
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      {/* Demo controls */}
      <div className="mb-8 flex gap-3">
        <button
          onClick={() => {
            setMode('deposit')
            setCurrentView('chooser')
            setAmountSats(0)
          }}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            mode === 'deposit'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Open Deposit
        </button>
        <button
          onClick={() => {
            setMode('withdraw')
            setCurrentView('chooser')
            setAmountSats(0)
          }}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            mode === 'withdraw'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Open Withdraw
        </button>
      </div>

      <DepositWithdraw
        mode={mode}
        currentView={currentView}
        mints={data.mints}
        selectedMintId={selectedMintId}
        amountSats={amountSats}
        amountFiat={fiatAmount}
        fiatSymbol={data.fiatSymbol}
        showFiatPrimary={showFiatPrimary}
        lightningInput={lightningInput}
        onSelectMethod={handleSelectMethod}
        onNumpadPress={handleNumpadPress}
        onMintChange={setSelectedMintId}
        onToggleCurrency={() => setShowFiatPrimary((p) => !p)}
        onCreateInvoice={() => console.log('Create invoice for', amountSats, 'sats')}
        onSendEcash={() => console.log('Send ecash:', amountSats, 'sats')}
        onPaste={() => console.log('Paste')}
        onScan={() => console.log('Scan')}
        onRequest={() => console.log('Request')}
        onScanQR={() => console.log('Scan QR')}
        onLightningInputChange={setLightningInput}
        onBack={handleBack}
        onClose={handleClose}
        onToggleFullscreen={() => console.log('Toggle fullscreen')}
      />
    </div>
  )
}
