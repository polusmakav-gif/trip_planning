import { fmt, pluralNights, HOTEL_LABELS } from '../utils/calculator'

const TYPE_STYLE = {
  city:    'bg-blue-50 text-blue-600',
  beach:   'bg-cyan-50 text-cyan-700',
  active:  'bg-green-50 text-green-700',
  culture: 'bg-purple-50 text-purple-700',
}

function DestCard({ dest, currency, nights }) {
  const { name, country, emoji, typeLabel, type, total, flight, hotel, food, activities } = dest
  const tagCls = TYPE_STYLE[type] || 'bg-gray-100 text-gray-600'

  return (
    <div className="bg-white rounded-xl shadow-card p-4 flex flex-col gap-3
                    hover:shadow-md transition-shadow cursor-default">
      {/* Шапка */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl shrink-0">{emoji}</span>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 leading-tight truncate">{name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{country}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${tagCls}`}>
          {typeLabel}
        </span>
      </div>

      {/* Итого */}
      <div>
        <p className="text-xl font-bold text-tutu-blue leading-none">{fmt(total, currency)}</p>
        <p className="text-xs text-gray-400 mt-0.5">{pluralNights(nights)}</p>
      </div>

      {/* Разбивка */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-2 border-t border-gray-100">
        {[
          { icon: '✈️', label: 'Перелёт', val: flight },
          { icon: '🏨', label: 'Отель',   val: hotel  },
          { icon: '🍽️', label: 'Питание', val: food   },
          { icon: '🎭', label: 'Досуг',   val: activities },
        ].map(({ icon, label, val }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="text-sm">{icon}</span>
            <div>
              <p className="text-xs text-gray-400 leading-none">{label}</p>
              <p className="text-xs font-medium text-gray-700">{fmt(val, currency)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DestinationCards({ results, currency, nights, budget, adults, children, hotelStars }) {
  const passLabel = [
    adults > 0 && `${adults} взр.`,
    children > 0 && `${children} реб.`,
  ].filter(Boolean).join(', ')

  return (
    <div>
      {/* Заголовок */}
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Подборка направлений</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {pluralNights(nights)} · {passLabel} · {'★'.repeat(hotelStars)} {HOTEL_LABELS[hotelStars]}
            {budget ? ` · бюджет ${fmt(budget, currency)}` : ''}
          </p>
        </div>
        <span className="text-sm font-medium text-tutu-blue shrink-0 ml-2">
          {results.length} {results.length === 1 ? 'вариант' : results.length < 5 ? 'варианта' : 'вариантов'}
        </span>
      </div>

      {/* Карточки */}
      {results.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
          <p className="text-2xl mb-2">😔</p>
          <p className="text-sm font-medium text-gray-700">Ни одно направление не вписывается в бюджет</p>
          <p className="text-xs text-gray-400 mt-1">Попробуйте увеличить бюджет или уменьшить ночи</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {results.map(dest => (
            <DestCard key={dest.id} dest={dest} currency={currency} nights={nights} />
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-4 px-2">
        Расчёт приблизительный. Цены зависят от дат, наличия билетов и сезона.
      </p>
    </div>
  )
}
