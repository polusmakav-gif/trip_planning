import { useState } from 'react'
import TripForm from './components/TripForm'
import TripResult from './components/TripResult'

export default function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F5F8' }}>

      {/* Header */}
      <header style={{ backgroundColor: '#0055B8' }} className="px-4 py-3.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <span className="text-white font-bold text-lg tracking-tight">туту.ру</span>
          <span className="text-blue-300 text-sm">/ калькулятор поездки</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-7">

        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Рассчитайте стоимость поездки</h1>
          <p className="text-sm text-gray-500 mt-1">
            Укажите параметры — получите примерный бюджет с разбивкой по категориям
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

          {/* Форма */}
          <TripForm onCalculate={setResult} />

          {/* Результаты */}
          {result ? (
            <TripResult result={result} />
          ) : (
            <div className="hidden lg:flex flex-col items-center justify-center
                            min-h-[400px] rounded-xl border-2 border-dashed border-gray-200 text-center p-8">
              <div className="text-5xl mb-3 opacity-40">✈️</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Заполните параметры<br />и нажмите «Рассчитать»
              </p>
            </div>
          )}

        </div>
      </main>

    </div>
  )
}
