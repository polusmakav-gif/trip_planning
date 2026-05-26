import { useState } from 'react'
import TripForm from './components/TripForm'
import DestinationCards from './components/DestinationCards'
import RoutePlanForm from './components/RoutePlanForm'
import TripResult from './components/TripResult'

function EmptyState() {
  return (
    <div className="hidden lg:flex relative overflow-hidden rounded-xl min-h-[520px]">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&w=900&q=80"
        alt="Путешествие"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      <div className="relative z-10 flex flex-col justify-end p-8 pb-10">
        <p className="text-3xl font-extrabold text-white leading-tight">
          Найдите поездку мечты
        </p>
        <p className="mt-2 text-base text-white/70 leading-relaxed max-w-xs">
          Подберите направление по бюджету — или узнайте, во сколько обойдётся ваше путешествие
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('explore')
  const [exploreResult, setExploreResult] = useState(null)
  const [routeResult, setRouteResult] = useState(null)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F5F8' }}>

      <header className="bg-tutu-blue-dark px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          {/* Логотип tutu */}
          <span style={{ fontStyle: 'italic', fontWeight: 900, fontSize: 22, letterSpacing: '-0.5px', lineHeight: 1 }}>
            <span style={{ color: '#ffffff' }}>tu</span>
            <span style={{ color: '#8B7FE8' }}>tu</span>
          </span>
          {/* Бейдж-тег */}
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            background: '#CCFF00', color: '#111',
            fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em',
            padding: '5px 12px 5px 18px',
            clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
          }}>
            Калькулятор поездок
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-7">

        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
            Куда летим и за сколько?
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Подберите направление по бюджету — или введите маршрут и узнайте стоимость
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
                : <EmptyState />
              }
            </>
          ) : (
            <>
              <RoutePlanForm onCalculate={setRouteResult} />
              {routeResult
                ? <TripResult result={routeResult} />
                : <EmptyState />
              }
            </>
          )}

        </div>
      </main>

    </div>
  )
}
