import { Plane, Building2, UtensilsCrossed, Sparkles } from 'lucide-react'
import { fmt, pluralNights, HOTEL_LABELS } from '../utils/calculator'
import { PHOTOS } from '../data/photos'

const TYPE_STYLE = {
  city:    'bg-blue-50 text-blue-600',
  beach:   'bg-cyan-50 text-cyan-700',
  active:  'bg-green-50 text-green-700',
  culture: 'bg-purple-50 text-purple-700',
}

function DestCard({ dest, currency, nights }) {
  const { id, name, country, typeLabel, type, total, flight, hotel, food, activities } = dest
  const tagCls = TYPE_STYLE[type] || 'bg-gray-100 text-gray-600'
  const photo = PHOTOS[id]

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden flex flex-col
                    hover:shadow-md transition-shadow cursor-default">
      {/* Фото */}
      <div className="relative h-28 bg-gray-100 shrink-0">
        {photo && (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-2 left-3">
          <p className="font-semibold text-white text-sm leading-tight drop-shadow">{name}</p>
          <p className="text-xs text-white/70 mt-0.5">{country}</p>
        </div>
        <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full ${tagCls}`}>
          {typeLabel}
        </span>
      </div>

      {/* Контент */}
      <div className="p-4 flex flex-col gap-3">
        {/* Итого */}
        <div>
          <p className="text-xl font-bold text-tutu-blue leading-none">{fmt(total, currency)}</p>
          <p className="text-xs text-gray-400 mt-0.5">{pluralNights(nights)}</p>
        </div>

        {/* Разбивка */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-2 border-t border-gray-100">
          {[
            { icon: Plane,           label: 'Перелёт', val: flight     },
            { icon: Building2,       label: 'Отель',   val: hotel      },
            { icon: UtensilsCrossed, label: 'Питание', val: food       },
            { icon: Sparkles,        label: 'Досуг',   val: activities },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={13} className="text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400 leading-none">{label}</p>
                <p className="text-xs font-medium text-gray-700 mt-0.5">{fmt(val, currency)}</p>
              </div>
            </div>
          ))}
        </div>
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
