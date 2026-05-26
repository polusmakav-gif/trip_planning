import { useState } from 'react'
import TripForm from './components/TripForm'
import DestinationCards from './components/DestinationCards'
import RoutePlanForm from './components/RoutePlanForm'
import TripResult from './components/TripResult'

function EmptyState({ icon, text }) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center
                    min-h-[400px] rounded-xl border-2 border-dashed border-gray-200 text-center p-8">
      <div className="text-5xl mb-3 opacity-40">{icon}</div>
      <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('explore')
  const [exploreResult, setExploreResult] = useState(null)
  const [routeResult, setRouteResult] = useState(null)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F5F8' }}>

      <header className="bg-tutu-blue-dark px-4 py-3.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <span className="text-white font-bold text-lg tracking-tight">туту.ру</span>
          <span className="text-purple-300 text-sm">/ калькулятор поездки</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-7">

        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-900">Рассчитайте стоимость поездки</h1>
          <p className="text-sm text-gray-500 mt-1">
            Укажите параметры — получите подборку направлений с разбивкой по бюджету
          </p>
        </div>

        {/* Переключатель вкладок */}
        <div className="flex gap-1 mb-5 bg-white rounded-xl p-1 shadow-card w-fit">
          {[
            { id: 'explore', label: 'Подборка направлений' },
            { id: 'route',   label: 'Конкретный маршрут'  },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === id
                  ? 'bg-tutu-blue text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5 items-start">

          {tab === 'explore' ? (
            <>
              <TripForm onCalculate={setExploreResult} />
              {exploreResult
                ? <DestinationCards
                    results={exploreResult.results}
                    currency={exploreResult.currency}
                    nights={exploreResult.nights}
                    budget={exploreResult.budget}
                    adults={exploreResult.adults}
                    children={exploreResult.children}
                    hotelStars={exploreResult.hotelStars}
                  />
                : <EmptyState icon="✈️" text={'Заполните параметры\nи нажмите «Рассчитать»'} />
              }
            </>
          ) : (
            <>
              <RoutePlanForm onCalculate={setRouteResult} />
              {routeResult
                ? <TripResult result={routeResult} />
                : <EmptyState icon="🗺️" text={'Укажите направление\nи нажмите «Рассчитать»'} />
              }
            </>
          )}

        </div>
      </main>

    </div>
  )
}
