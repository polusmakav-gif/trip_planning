import { useState, useEffect } from 'react'
import { Plane, Building2, UtensilsCrossed, Sparkles, Waves, Mountain, Landmark } from 'lucide-react'
import { fmt, pluralNights, HOTEL_LABELS } from '../utils/calculator'
import { WIKI_TITLES } from '../data/photos'

const TYPE_BADGE = {
  city:    { color: 'bg-violet-600',  Icon: Building2 },
  beach:   { color: 'bg-cyan-500',    Icon: Waves     },
  active:  { color: 'bg-green-500',   Icon: Mountain  },
  culture: { color: 'bg-pink-600',    Icon: Landmark  },
}

const TYPE_PLACEHOLDER = {
  city:    'bg-gradient-to-br from-violet-300 to-violet-500',
  beach:   'bg-gradient-to-br from-cyan-300 to-teal-500',
  active:  'bg-gradient-to-br from-green-300 to-emerald-500',
  culture: 'bg-gradient-to-br from-pink-300 to-pink-500',
}

function DestCard({ dest, currency, nights }) {
  const { id, name, country, typeLabel, type, total, flight, hotel, food, activities } = dest
  const badge = TYPE_BADGE[type] || { color: 'bg-gray-500', Icon: Plane }
  const placeholderCls = TYPE_PLACEHOLDER[type] || 'bg-gradient-to-br from-gray-300 to-gray-500'
  const { Icon: BadgeIcon } = badge

  const [imgUrl, setImgUrl] = useState(null)

  useEffect(() => {
    const title = WIKI_TITLES[id]
    if (!title) return
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then(r => r.json())
      .then(d => { if (d.thumbnail?.source) setImgUrl(d.thumbnail.source) })
      .catch(() => {})
  }, [id])

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden flex flex-col
                    hover:shadow-md transition-shadow cursor-default">
      {/* Фото */}
      <div className={`relative h-44 shrink-0 ${!imgUrl ? placeholderCls : ''}`}>
        {imgUrl && (
          <img src={imgUrl} alt={name} className="w-full h-full object-cover"
            onError={() => setImgUrl(null)} />
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full text-white ${badge.color}`}>
            <BadgeIcon size={11} strokeWidth={2.5} />
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Контент */}
      <div className="p-4 flex flex-col gap-3">
        {/* Название + страна */}
        <div>
          <p className="font-bold text-gray-900 text-[15px] leading-snug">{name}</p>
          <p className="text-sm text-gray-400 mt-0.5">{country}</p>
        </div>

        <div>
          <p className="text-xl font-bold text-tutu-blue leading-none">{fmt(total, currency)}</p>
          <p className="text-xs text-gray-400 mt-0.5">{pluralNights(nights)}</p>
        </div>

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
