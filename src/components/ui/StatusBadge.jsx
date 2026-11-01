import React from 'react';

const STATUS_COLORS = {
  'В норме': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Наблюдение': 'bg-amber-50 text-amber-700 border-amber-200',
  'Критический': 'bg-red-50 text-red-700 border-red-200',
  'Готова к выпуску': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Требуется страховка': 'bg-amber-50 text-amber-700 border-amber-200',
  'На хранении': 'bg-slate-50 text-slate-600 border-slate-200',
  'В обеспечении': 'bg-blue-50 text-blue-700 border-blue-200',
  'Открыт': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Подготовка': 'bg-amber-50 text-amber-700 border-amber-200',
  'Исполнена': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Подтверждена': 'bg-blue-50 text-blue-700 border-blue-200',
  'Завершена': 'bg-slate-50 text-slate-600 border-slate-200',
  'Проверен': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Активен': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Актуален': 'bg-blue-50 text-blue-700 border-blue-200',
  'На проверке': 'bg-amber-50 text-amber-700 border-amber-200',
  'низкий': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'умеренный': 'bg-amber-50 text-amber-700 border-amber-200',
  'высокий': 'bg-red-50 text-red-700 border-red-200',
  'подключено': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'ожидается': 'bg-amber-50 text-amber-700 border-amber-200',
  'данные актуальны': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'обновление ожидается': 'bg-amber-50 text-amber-700 border-amber-200',
  'активно': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'в норме': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'стабильный': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'норма': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'хорошее': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'подтверждено': 'bg-blue-50 text-blue-700 border-blue-200',
  'не выявлена': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'не выявлен': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'выполнено': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'требуется': 'bg-amber-50 text-amber-700 border-amber-200',
  'ожидает подтверждения': 'bg-amber-50 text-amber-700 border-amber-200',
};

const DEFAULT = 'bg-slate-50 text-slate-600 border-slate-200';

export default function StatusBadge({ status, className = '' }) {
  const colors = STATUS_COLORS[status] || DEFAULT;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors} ${className}`}>
      {status}
    </span>
  );
}
