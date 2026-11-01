import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MARKETPLACE_ITEMS } from '@/lib/demoData';
import StatusBadge from '@/components/ui/StatusBadge';
import BuyModal from '@/components/modals/BuyModal';
import { Search, SlidersHorizontal, Heart, ShieldCheck, Radio } from 'lucide-react';



export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [buyItem, setBuyItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [crop, setCrop] = useState('');

  const filtered = MARKETPLACE_ITEMS.filter(i => (!crop || i.crop.includes(crop)) && (
    i.id.toLowerCase().includes(search.toLowerCase()) ||
    i.crop.toLowerCase().includes(search.toLowerCase()) ||
    i.region.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Маркетплейс ЦФА</h1>
          <p className="text-sm text-slate-400 mt-1">Доступные выпуски цифровых финансовых активов</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск выпуска..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-[#2f5496]/20 focus:border-[#2f5496]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50"
          >
            <SlidersHorizontal className="w-4 h-4" /> Фильтры
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-wrap gap-2">
          <label className="text-sm">Культура <select aria-label="Культура" value={crop} onChange={e=>setCrop(e.target.value)} className="border rounded p-2 ml-2"><option value="">Все культуры</option>{['Пшеница','Ячмень','Кукуруза'].map(c=><option key={c}>{c}</option>)}</select></label>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-xs font-medium text-[#2f5496]">{item.id}</p>
                  <h3 className="text-base font-semibold text-slate-800 mt-1">{item.crop}</h3>
                </div>

              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Обеспечение</span>
                  <span className="text-slate-700 font-medium">{item.volume}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Элеватор</span>
                  <span className="text-slate-700">{item.region}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Оценка партии</span>
                  <span className="text-slate-700">{item.evalPrice}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Сумма выпуска</span>
                  <span className="text-slate-800 font-semibold">{item.issueSum}</span>
                </div>
                <div className="h-px bg-slate-100 my-1" />
                <div className="flex justify-between text-slate-500">
                  <span>Покрытие</span>
                  <span className="text-emerald-600 font-semibold">{item.coverage}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Срок</span>
                  <span className="text-slate-700">{item.term}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Доходность</span>
                  <span className="text-[#2f5496] font-bold">{item.yield} год.</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-600">{item.insurance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-600">{item.oracle}</span>
                </div>
                <StatusBadge status={item.risk} className="ml-auto" />
              </div>
            </div>

            <div className="border-t border-slate-100 p-3 flex gap-2">
              <button
                disabled={item.status !== 'Открыт'}
                onClick={() => setBuyItem(item)}
                className="flex-1 px-3 py-2 rounded-lg bg-[#2f5496] text-white text-sm font-medium hover:bg-[#244278] disabled:opacity-40 transition-colors"
              >
                Купить
              </button>
              <Link
                to={`/asset/${item.id}`}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 text-center transition-colors"
              >
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length===0 && <p role="status">Выпуски не найдены. Измените поиск или фильтр.</p>}
      {buyItem && <BuyModal item={buyItem} onClose={() => setBuyItem(null)} />}
    </div>
  );
}
