import { useState, useRef, useEffect } from 'react'
import { calculateRoute } from '../utils/calculator'
import { ALL_CITIES } from '../data/cities'

const MONTHS = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']

function CityInput({ value, onChange, placeholder, required }) {
  const [query, setQuery] = useState(value || '')
  const [hits, setHits] = useState([])
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const handleChange = (e) => {
    const q = e.target.value
    setQuery(q); onChange(q)
    if (q.length < 1) { setHits([]); setOpen(false); return }
    const low = q.toLowerCase()
    const starts = ALL_CITIES.filter(c => c.toLowerCase().startsWith(low))
    const rest   = ALL_CITIES.filter(c => !c.toLowerCase().startsWith(low) && c.toLowerCase().includes(low))
    const r = [...starts, ...rest].slice(0, 8)
    setHits(r); setOpen(r.length > 0)
  }

  const pick = (city) => { setQuery(city); onChange(city); setOpen(false) }

  return (
    <div ref={ref} className="relative">
      <input type="text" value={query} onChange={handleChange}
        placeholder={placeholder} autoComplete="off" required={required}
        className="field-input" />
      {open && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200
                       rounded-lg shadow-lg overflow-hidden max-h-52 overflow-y-auto">
          {hits.map((city, i) => (
            <li key={i}>
              <button type="button" onMouseDown={() => pick(city)}
                className="w-full text-left px-3 py-2 text-sm text-gray-800
                           hover:bg-tutu-blue-light border-b border-gray-50 last:border-0">
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Counter({ label, sub, value, onChange, min = 0 }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <div className="text-sm font-medium text-gray-800">{label}</div>
        {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center
                     text-gray-600 hover:border-tutu-blue hover:text-tutu-blue
                     disabled:opacity-25 disabled:cursor-not-allowed transition-colors text-xl font-light leading-none">
          −
        </button>
        <span className="w-5 text-center text-sm font-semibold text-gray-900">{value}</span>
        <button type="button" onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center
                     text-gray-600 hover:border-tutu-blue hover:text-tutu-blue transition-colors text-xl font-light leading-none">
          +
        </button>
      </div>
    </div>
  )
}

function Pills({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`pill ${value === o.value ? 'pill-on' : 'pill-off'}`}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5 mb-1.5">
        <span className="text-sm font-medium text-gray-800">{label}</span>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function Divider() { return <hr className="border-gray-100" /> }

export default function RoutePlanForm({ onCalculate }) {
  const now = new Date()
  const [form, setForm] = useState({
    from:       '',
    to:         '',
    nights:     5,
    month:      now.getMonth() + 1,
    adults:     1,
    children:   0,
    hotel:      3,
    activities: 'city',
    food:       'cafe',
    transport:  'public',
    currency:   'rub',
  })

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const submit = (e) => {
    e.preventDefault()
    const result = calculateRoute({ ...form, nights: Number(form.nights), budget: null })
    onCalculate(result)
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow-card p-6 space-y-5">
      <h2 className="text-base font-semibold text-gray-900">Параметры поездки</h2>

      {/* Маршрут */}
      <Field label="Откуда" hint="(необязательно)">
        <CityInput value={form.from} onChange={set('from')} placeholder="Ваш город" />
      </Field>

      <Field label="Куда">
        <CityInput value={form.to} onChange={set('to')} placeholder="Направление" required />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Ночей">
          <input type="number" min={1} max={30} value={form.nights}
            onChange={e => set('nights')(e.target.value)} className="field-input" />
        </Field>
        <Field label="Месяц">
          <select value={form.month} onChange={e => set('month')(Number(e.target.value))}
            className="field-input">
            {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
        </Field>
      </div>

      <Divider />

      {/* Пассажиры */}
      <div>
        <div className="text-sm font-medium text-gray-800 mb-0.5">Пассажиры</div>
        <div className="border border-gray-200 rounded-lg px-4 divide-y divide-gray-100">
          <Counter label="Взрослые" sub="от 18 лет" value={form.adults} onChange={set('adults')} min={1} />
          <Counter label="Дети"     sub="до 17 лет"  value={form.children} onChange={set('children')} min={0} />
        </div>
      </div>

      <Divider />

      {/* Предпочтения */}
      <Field label="Отель">
        <div className="flex gap-2">
          {[1,2,3,4,5].map(s => (
            <button key={s} type="button" onClick={() => set('hotel')(s)}
              title={['Хостел','Эконом','Стандарт','Комфорт','Люкс'][s-1]}
              className={`pill text-sm tracking-tighter ${form.hotel === s ? 'pill-on' : 'pill-off'}`}>
              {'★'.repeat(s)}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Тип отдыха">
        <Pills value={form.activities} onChange={set('activities')} options={[
          { value: 'city',    label: 'Город'    },
          { value: 'beach',   label: 'Пляж'     },
          { value: 'active',  label: 'Активный' },
          { value: 'culture', label: 'Культура' },
        ]} />
      </Field>

      <Field label="Питание">
        <Pills value={form.food} onChange={set('food')} options={[
          { value: 'self',        label: 'Готовлю сам' },
          { value: 'cafe',        label: 'В кафе'       },
          { value: 'hotel_board', label: 'В отеле'      },
        ]} />
      </Field>

      <Field label="Транспорт на месте">
        <Pills value={form.transport} onChange={set('transport')} options={[
          { value: 'public', label: 'Общественный' },
          { value: 'taxi',   label: 'Такси'        },
          { value: 'car',    label: 'Аренда авто'  },
        ]} />
      </Field>

      <button type="submit"
        className="w-full py-3 rounded-lg bg-tutu-orange hover:bg-tutu-orange-hover
                   text-white font-semibold text-sm transition-colors">
        Рассчитать →
      </button>
    </form>
  )
}
