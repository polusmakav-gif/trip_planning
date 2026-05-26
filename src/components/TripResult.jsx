import { fmt, pluralNights } from '../utils/calculator'

const CATEGORIES = [
  { key: 'flight',     label: 'Перелёт / транспорт', icon: '✈️' },
  { key: 'hotel',      label: 'Проживание',           icon: '🏨' },
  { key: 'food',       label: 'Питание',              icon: '🍽️' },
  { key: 'transport',  label: 'Транспорт на месте',   icon: '🚌' },
  { key: 'activities', label: 'Развлечения',          icon: '🎭' },
  { key: 'misc',       label: 'Прочие расходы',       icon: '🧾' },
]

function Bar({ pct }) {
  return (
    <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-tutu-blue rounded-full"
        style={{ width: `${pct}%`, transition: 'width 0.4s ease' }}
      />
    </div>
  )
}

export default function TripResult({ result }) {
  const { total, currency, persons, nights, budget } = result

  const budgetNum = budget ? Number(budget) : null
  const budgetFits = budgetNum ? budgetNum >= total : null
  const perPerson = persons > 1 ? Math.round(total / persons / 100) * 100 : null

  return (
    <div className="space-y-4">

      {/* Итого */}
      <div className="rounded-xl p-6 text-white" style={{ backgroundColor: '#0055B8' }}>
        <p className="text-sm text-blue-200 mb-1">Примерная стоимость</p>
        <p className="text-3xl font-bold tracking-tight">{fmt(total, currency)}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5 text-sm text-blue-200">
          <span>{pluralNights(nights)}</span>
          {persons > 1 && <span>{persons} чел.</span>}
          {perPerson && <span>≈ {fmt(perPerson, currency)} / чел.</span>}
        </div>

        {budgetFits !== null && (
          <div className={`mt-4 px-3 py-2 rounded-lg text-sm font-medium ${
            budgetFits
              ? 'bg-green-500/20 text-green-100'
              : 'bg-red-500/20 text-red-100'
          }`}>
            {budgetFits
              ? `✓ Укладывается в бюджет ${fmt(budgetNum, currency)}`
              : `✗ Превышает бюджет на ${fmt(total - budgetNum, currency)}`
            }
          </div>
        )}
      </div>

      {/* Разбивка */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <p className="text-sm font-semibold text-gray-700 mb-4">Разбивка по статьям</p>

        <div className="space-y-4">
          {CATEGORIES.map(cat => {
            const amount = result[cat.key]
            const pct = Math.round((amount / total) * 100)
            return (
              <div key={cat.key}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    <span className="mr-1.5">{cat.icon}</span>{cat.label}
                  </span>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-sm font-medium text-gray-900">{fmt(amount, currency)}</span>
                    <span className="text-xs text-gray-400 ml-1">{pct}%</span>
                  </div>
                </div>
                <Bar pct={pct} />
              </div>
            )
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between">
          <span className="text-sm font-semibold text-gray-900">Итого</span>
          <span className="text-sm font-semibold text-gray-900">{fmt(total, currency)}</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center px-2">
        Расчёт приблизительный. Реальные цены зависят от дат, конкретного направления и наличия билетов.
      </p>
    </div>
  )
}
