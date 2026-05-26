import { useState } from 'react'
import { calculate } from '../utils/calculator'

const MONTHS = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']

function Pills({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`pill ${value === o.value ? 'pill-on' : 'pill-off'}`}
        >
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

function Divider() {
  return <hr className="border-gray-100" />
}

export default function TripForm({ onCalculate }) {
  const now = new Date()
  const [form, setForm] = useState({
    from:        '',
    destination: 'domestic',
    nights:      5,
    month:       now.getMonth() + 1,
    travelers:   'solo',
    hotel:       'standard',
    activities:  'city',
    food:        'mix',
    transport:   'public',
    currency:    'rub',
    budget:      '',
  })

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = calculate({ ...form, nights: Number(form.nights) })
    onCalculate({ ...result, budget: form.budget ? Number(form.budget) : null })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card p-6 space-y-5">
      <h2 className="text-base font-semibold text-gray-900">Параметры поездки</h2>

      {/* Маршрут */}
      <Field label="Откуда">
        <input
          type="text"
          value={form.from}
          onChange={e => set('from')(e.target.value)}
          placeholder="Ваш город"
          className="field-input"
        />
      </Field>

      <Field label="Направление">
        <Pills
          value={form.destination}
          onChange={set('destination')}
          options={[
            { value: 'domestic',      label: '🇷🇺 По России' },
            { value: 'international', label: '🌍 За рубеж'  },
          ]}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Ночей">
          <input
            type="number"
            min={1}
            max={30}
            value={form.nights}
            onChange={e => set('nights')(e.target.value)}
            className="field-input"
          />
        </Field>

        <Field label="Месяц">
          <select
            value={form.month}
            onChange={e => set('month')(Number(e.target.value))}
            className="field-input"
          >
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
        </Field>
      </div>

      <Divider />

      {/* Кто едет */}
      <Field label="Кто едет">
        <Pills
          value={form.travelers}
          onChange={set('travelers')}
          options={[
            { value: 'solo',   label: 'Один'      },
            { value: 'couple', label: 'Двое'      },
            { value: 'family', label: 'Семья 4+'  },
          ]}
        />
      </Field>

      <Divider />

      {/* Предпочтения */}
      <Field label="Отель">
        <Pills
          value={form.hotel}
          onChange={set('hotel')}
          options={[
            { value: 'budget',   label: 'Эконом'   },
            { value: 'standard', label: 'Стандарт' },
            { value: 'comfort',  label: 'Комфорт'  },
          ]}
        />
      </Field>

      <Field label="Тип поездки">
        <Pills
          value={form.activities}
          onChange={set('activities')}
          options={[
            { value: 'city',   label: 'Город'    },
            { value: 'beach',  label: 'Пляж'     },
            { value: 'active', label: 'Активный' },
          ]}
        />
      </Field>

      <Field label="Питание">
        <Pills
          value={form.food}
          onChange={set('food')}
          options={[
            { value: 'light',       label: 'Минимум'    },
            { value: 'mix',         label: 'Смешанный'  },
            { value: 'restaurants', label: 'Рестораны'  },
          ]}
        />
      </Field>

      <Field label="Транспорт на месте">
        <Pills
          value={form.transport}
          onChange={set('transport')}
          options={[
            { value: 'walk',   label: 'Пешком'     },
            { value: 'public', label: 'Транспорт'  },
            { value: 'taxi',   label: 'Такси'      },
          ]}
        />
      </Field>

      <Divider />

      {/* Бюджет */}
      <Field label="Мой бюджет" hint="(необязательно — для проверки)">
        <div className="flex gap-2">
          <select
            value={form.currency}
            onChange={e => set('currency')(e.target.value)}
            className="field-input w-auto px-2"
          >
            <option value="rub">₽</option>
            <option value="eur">€</option>
            <option value="usd">$</option>
          </select>
          <input
            type="number"
            min={0}
            value={form.budget}
            onChange={e => set('budget')(e.target.value)}
            placeholder="Введите сумму"
            className="field-input flex-1"
          />
        </div>
      </Field>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-tutu-orange hover:bg-tutu-orange-hover
                   text-white font-semibold text-sm transition-colors"
      >
        Рассчитать →
      </button>
    </form>
  )
}
