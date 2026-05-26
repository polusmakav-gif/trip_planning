// Base rates in RUB
const BASE = {
  hotel: {
    budget:   2400,   // per room per night
    standard: 5200,
    comfort:  12000,
  },
  food: {
    light:       650,   // per person per day
    mix:        1400,
    restaurants: 3100,
  },
  transport: {
    walk:   80,    // total per day (all travelers)
    public: 300,
    taxi:  1600,
  },
  activities: {
    city:   550,   // per person per day
    beach:  320,
    active: 850,
  },
  flight: {
    domestic:      8500,  // round trip per person
    international: 32000,
  },
}

const TRAVELERS = {
  solo:   { persons: 1, rooms: 1 },
  couple: { persons: 2, rooms: 1 },
  family: { persons: 4, rooms: 2 },
}

// Seasonal multiplier by month (1–12)
const SEASON = {
  1: 0.88, 2: 0.82, 3: 0.90, 4: 0.97,
  5: 1.12, 6: 1.22, 7: 1.38, 8: 1.32,
  9: 1.05, 10: 0.88, 11: 0.80, 12: 1.28,
}

const TO_RUB = { rub: 1, eur: 93, usd: 85 }

const round100 = (v) => Math.round(v / 100) * 100

export function calculate(params) {
  const { nights, travelers, hotel, food, transport, activities, destination, month, currency } = params

  const days = nights + 1
  const { persons, rooms } = TRAVELERS[travelers]
  const season = SEASON[Number(month)]
  const rate = TO_RUB[currency]

  const rawFlight     = BASE.flight[destination] * persons
  const rawHotel      = BASE.hotel[hotel] * nights * rooms * season
  const rawFood       = BASE.food[food] * days * persons * season
  const rawTransport  = BASE.transport[transport] * days * season
  const rawActivities = BASE.activities[activities] * days * persons * season

  const rawSub  = rawFlight + rawHotel + rawFood + rawTransport + rawActivities
  const rawMisc = rawSub * 0.07
  const rawTotal = rawSub + rawMisc

  const to = (v) => round100(v / rate)

  return {
    flight:     to(rawFlight),
    hotel:      to(rawHotel),
    food:       to(rawFood),
    transport:  to(rawTransport),
    activities: to(rawActivities),
    misc:       to(rawMisc),
    total:      to(rawTotal),
    currency,
    persons,
    nights,
  }
}

export function fmt(amount, currency) {
  const n = new Intl.NumberFormat('ru-RU').format(amount)
  if (currency === 'rub') return `${n} ₽`
  if (currency === 'eur') return `€${n}`
  return `$${n}`
}

export function pluralNights(n) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return `${n} ночь`
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `${n} ночи`
  return `${n} ночей`
}
