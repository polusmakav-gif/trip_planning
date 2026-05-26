import { RUSSIA_SET } from '../data/cities'
import { DESTINATIONS } from '../data/destinations'

const HOTEL = { 1: 1400, 2: 2800, 3: 5500, 4: 10000, 5: 20000 }
const FOOD  = { light: 650, mix: 1400, restaurants: 3100 }
const TRANSPORT = { public: 300, taxi: 1600, car: 3500 }
const ACTIVITIES = { city: 550, beach: 320, active: 850, culture: 700 }
const FLIGHT = { domestic: 8500, international: 32000 }

const SEASON = {
  1: 0.88, 2: 0.82, 3: 0.90, 4: 0.97,
  5: 1.12, 6: 1.22, 7: 1.38, 8: 1.32,
  9: 1.05, 10: 0.88, 11: 0.80, 12: 1.28,
}
const TO_RUB = { rub: 1, eur: 93, usd: 85 }

const round100 = (v) => Math.round(v / 100) * 100
const getRooms = (adults) => Math.max(1, Math.ceil(adults / 2))

export const HOTEL_LABELS = { 1: 'Хостел', 2: 'Эконом', 3: 'Стандарт', 4: 'Комфорт', 5: 'Люкс' }

// Одно направление (старый расчёт, для обратной совместимости)
export function calculate(params) {
  const { to, nights, adults, children, hotel, food, transport, activities, month, currency } = params
  const isIntl  = to ? !RUSSIA_SET.has(to) : false
  const days    = nights + 1
  const rooms   = getRooms(adults)
  const season  = SEASON[Number(month)]
  const rate    = TO_RUB[currency]

  const rawFlight     = FLIGHT[isIntl ? 'international' : 'domestic'] * (adults + children * 0.7)
  const rawHotel      = HOTEL[hotel] * nights * rooms * season
  const rawFood       = FOOD[food] * days * season * (adults + children * 0.6)
  const rawTransport  = TRANSPORT[transport] * days * season
  const rawActivities = ACTIVITIES[activities] * days * season * (adults + children * 0.5)

  const rawSub   = rawFlight + rawHotel + rawFood + rawTransport + rawActivities
  const rawMisc  = rawSub * 0.07
  const rawTotal = rawSub + rawMisc
  const to100    = (v) => round100(v / rate)

  return {
    flight: to100(rawFlight), hotel: to100(rawHotel),
    food: to100(rawFood), transport: to100(rawTransport),
    activities: to100(rawActivities), misc: to100(rawMisc),
    total: to100(rawTotal),
    currency, adults, children, totalPersons: adults + children,
    nights, hotelStars: hotel, isIntl,
  }
}

// Подборка по всем направлениям
export function calculateForDestinations(params) {
  const { nights, adults, children, hotel, food, transport, activities, month, currency, budget } = params

  const days   = nights + 1
  const rooms  = getRooms(adults)
  const season = SEASON[Number(month)]
  const rate   = TO_RUB[currency]
  const actKey = ACTIVITIES[activities] !== undefined ? activities : 'city'

  const results = DESTINATIONS.map(dest => {
    const baseFlightRub = (dest.domestic ? FLIGHT.domestic : FLIGHT.international) * dest.flightFactor
    const cf = dest.costFactor

    const rawFlight     = baseFlightRub * (adults + children * 0.7)
    const rawHotel      = HOTEL[hotel] * nights * rooms * season * cf
    const rawFood       = FOOD[food] * days * season * (adults + children * 0.6) * cf
    const rawTransport  = TRANSPORT[transport] * days * season * cf
    const rawActivities = ACTIVITIES[actKey] * days * season * (adults + children * 0.5) * cf

    const rawSub   = rawFlight + rawHotel + rawFood + rawTransport + rawActivities
    const rawMisc  = rawSub * 0.07
    const rawTotal = rawSub + rawMisc
    const to100    = (v) => round100(v / rate)

    return {
      ...dest,
      flight:     to100(rawFlight),
      hotel:      to100(rawHotel),
      food:       to100(rawFood),
      transport:  to100(rawTransport),
      activities: to100(rawActivities),
      misc:       to100(rawMisc),
      total:      to100(rawTotal),
    }
  })

  results.sort((a, b) => a.total - b.total)
  return budget ? results.filter(r => r.total <= budget) : results
}

export function fmt(amount, currency) {
  const n = new Intl.NumberFormat('ru-RU').format(amount)
  if (currency === 'eur') return `€${n}`
  if (currency === 'usd') return `$${n}`
  return `${n} ₽`
}

export function pluralNights(n) {
  const m = n % 10, h = n % 100
  if (m === 1 && h !== 11) return `${n} ночь`
  if ([2,3,4].includes(m) && ![12,13,14].includes(h)) return `${n} ночи`
  return `${n} ночей`
}
