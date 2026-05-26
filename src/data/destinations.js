// costFactor  — множитель стоимости проживания/еды/транспорта относительно базы (Москва = 1.0)
// flightFactor — множитель стоимости перелёта относительно базовой ставки
export const DESTINATIONS = [
  // ── Россия ───────────────────────────────────────────────────────────────
  { id: 'moscow',   name: 'Москва',           country: 'Россия',         emoji: '🏛️', type: 'city',    typeLabel: 'Город',   domestic: true,  costFactor: 1.1,  flightFactor: 0.25 },
  { id: 'spb',      name: 'Санкт-Петербург',  country: 'Россия',         emoji: '⚓',  type: 'city',    typeLabel: 'Город',   domestic: true,  costFactor: 1.0,  flightFactor: 0.40 },
  { id: 'sochi',    name: 'Сочи',             country: 'Россия',         emoji: '🏖️', type: 'beach',   typeLabel: 'Пляж',    domestic: true,  costFactor: 1.0,  flightFactor: 0.50 },
  { id: 'kazan',    name: 'Казань',           country: 'Россия',         emoji: '🕌',  type: 'city',    typeLabel: 'Город',   domestic: true,  costFactor: 0.80, flightFactor: 0.40 },
  { id: 'ekb',      name: 'Екатеринбург',     country: 'Россия',         emoji: '🌲',  type: 'city',    typeLabel: 'Город',   domestic: true,  costFactor: 0.80, flightFactor: 0.50 },
  { id: 'anapa',    name: 'Анапа',            country: 'Россия',         emoji: '🌊',  type: 'beach',   typeLabel: 'Пляж',    domestic: true,  costFactor: 0.75, flightFactor: 0.45 },
  { id: 'altai',    name: 'Горный Алтай',     country: 'Россия',         emoji: '🏔️', type: 'active',  typeLabel: 'Активный',domestic: true,  costFactor: 0.70, flightFactor: 0.55 },
  { id: 'baikal',   name: 'Байкал',           country: 'Россия',         emoji: '💧',  type: 'active',  typeLabel: 'Активный',domestic: true,  costFactor: 0.75, flightFactor: 0.65 },

  // ── СНГ / ближнее зарубежье (дёшево) ─────────────────────────────────
  { id: 'tbilisi',  name: 'Тбилиси',          country: 'Грузия',         emoji: '🍷',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 0.75, flightFactor: 0.40 },
  { id: 'batumi',   name: 'Батуми',           country: 'Грузия',         emoji: '🌴',  type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 0.80, flightFactor: 0.40 },
  { id: 'yerevan',  name: 'Ереван',           country: 'Армения',        emoji: '🏔️', type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 0.70, flightFactor: 0.40 },
  { id: 'baku',     name: 'Баку',             country: 'Азербайджан',    emoji: '🕌',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 0.85, flightFactor: 0.45 },
  { id: 'almaty',   name: 'Алматы',           country: 'Казахстан',      emoji: '🏔️', type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 0.85, flightFactor: 0.45 },
  { id: 'tashkent', name: 'Ташкент',          country: 'Узбекистан',     emoji: '🕌',  type: 'culture', typeLabel: 'Культура', domestic: false, costFactor: 0.60, flightFactor: 0.50 },
  { id: 'samarkand',name: 'Самарканд',        country: 'Узбекистан',     emoji: '🕍',  type: 'culture', typeLabel: 'Культура', domestic: false, costFactor: 0.55, flightFactor: 0.50 },
  { id: 'minsk',    name: 'Минск',            country: 'Беларусь',       emoji: '🌾',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 0.70, flightFactor: 0.35 },

  // ── Турция, Египет ────────────────────────────────────────────────────
  { id: 'istanbul', name: 'Стамбул',          country: 'Турция',         emoji: '🕌',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 1.00, flightFactor: 0.75 },
  { id: 'antalya',  name: 'Анталья',          country: 'Турция',         emoji: '🏖️', type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 1.10, flightFactor: 0.75 },
  { id: 'bodrum',   name: 'Бодрум',           country: 'Турция',         emoji: '⛵',  type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 1.20, flightFactor: 0.80 },
  { id: 'hurghada', name: 'Хургада',          country: 'Египет',         emoji: '🐠',  type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 0.85, flightFactor: 0.80 },
  { id: 'sharm',    name: 'Шарм-эль-Шейх',   country: 'Египет',         emoji: '🐡',  type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 0.90, flightFactor: 0.80 },

  // ── Балканы / Восточная Европа ────────────────────────────────────────
  { id: 'belgrade', name: 'Белград',          country: 'Сербия',         emoji: '🎸',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 0.85, flightFactor: 0.90 },
  { id: 'budva',    name: 'Будва',            country: 'Черногория',     emoji: '⛵',  type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 1.10, flightFactor: 0.95 },
  { id: 'prague',   name: 'Прага',            country: 'Чехия',          emoji: '🏰',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 1.20, flightFactor: 0.95 },
  { id: 'budapest', name: 'Будапешт',         country: 'Венгрия',        emoji: '🏛️', type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 1.10, flightFactor: 0.95 },
  { id: 'warsaw',   name: 'Варшава',          country: 'Польша',         emoji: '🏙️', type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 1.00, flightFactor: 0.90 },
  { id: 'riga',     name: 'Рига',             country: 'Латвия',         emoji: '🏛️', type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 1.00, flightFactor: 0.85 },
  { id: 'dubrovnik',name: 'Дубровник',        country: 'Хорватия',       emoji: '🏰',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 1.50, flightFactor: 1.10 },
  { id: 'athens',   name: 'Афины',            country: 'Греция',         emoji: '🏛️', type: 'culture', typeLabel: 'Культура', domestic: false, costFactor: 1.30, flightFactor: 1.00 },
  { id: 'santorini',name: 'Санторини',        country: 'Греция',         emoji: '🌅',  type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 2.00, flightFactor: 1.10 },

  // ── Западная Европа ───────────────────────────────────────────────────
  { id: 'berlin',   name: 'Берлин',           country: 'Германия',       emoji: '🎨',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 1.70, flightFactor: 1.00 },
  { id: 'barcelona',name: 'Барселона',        country: 'Испания',        emoji: '🌞',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 1.90, flightFactor: 1.10 },
  { id: 'rome',     name: 'Рим',              country: 'Италия',         emoji: '🏛️', type: 'culture', typeLabel: 'Культура', domestic: false, costFactor: 1.90, flightFactor: 1.10 },
  { id: 'paris',    name: 'Париж',            country: 'Франция',        emoji: '🗼',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 2.30, flightFactor: 1.10 },
  { id: 'london',   name: 'Лондон',           country: 'Великобритания', emoji: '🎡',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 2.80, flightFactor: 1.00 },
  { id: 'amsterdam',name: 'Амстердам',        country: 'Нидерланды',     emoji: '🌷',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 2.20, flightFactor: 1.00 },
  { id: 'vienna',   name: 'Вена',             country: 'Австрия',        emoji: '🎶',  type: 'culture', typeLabel: 'Культура', domestic: false, costFactor: 2.00, flightFactor: 1.00 },

  // ── Ближний Восток / Африка ───────────────────────────────────────────
  { id: 'dubai',    name: 'Дубай',            country: 'ОАЭ',            emoji: '🌆',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 2.20, flightFactor: 0.95 },
  { id: 'telaviv',  name: 'Тель-Авив',        country: 'Израиль',        emoji: '🌊',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 2.00, flightFactor: 0.85 },
  { id: 'marrakesh',name: 'Марракеш',         country: 'Марокко',        emoji: '🏜️', type: 'culture', typeLabel: 'Культура', domestic: false, costFactor: 1.00, flightFactor: 1.10 },
  { id: 'zanzibar', name: 'Занзибар',         country: 'Танзания',       emoji: '🌴',  type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 1.20, flightFactor: 1.80 },

  // ── Азия ─────────────────────────────────────────────────────────────
  { id: 'bangkok',  name: 'Бангкок',          country: 'Таиланд',        emoji: '🛺',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 0.85, flightFactor: 1.50 },
  { id: 'phuket',   name: 'Пхукет',           country: 'Таиланд',        emoji: '🏝️', type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 1.00, flightFactor: 1.55 },
  { id: 'bali',     name: 'Бали',             country: 'Индонезия',      emoji: '🌺',  type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 0.90, flightFactor: 1.70 },
  { id: 'tokyo',    name: 'Токио',            country: 'Япония',         emoji: '🗾',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 2.30, flightFactor: 1.90 },
  { id: 'singapore',name: 'Сингапур',         country: 'Сингапур',       emoji: '🦁',  type: 'city',    typeLabel: 'Город',   domestic: false, costFactor: 2.50, flightFactor: 1.80 },
  { id: 'maldives', name: 'Мальдивы',         country: 'Мальдивы',       emoji: '🐚',  type: 'beach',   typeLabel: 'Пляж',    domestic: false, costFactor: 3.50, flightFactor: 1.80 },
]
