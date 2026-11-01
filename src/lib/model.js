export const TOKEN_PRICE = 1000;
export function purchase(portfolio, item, amount) {
  const value = Number(amount);
  if (!Number.isSafeInteger(value) || value < 100000 || value % TOKEN_PRICE !== 0) throw Error('Введите сумму от 100 000 ₽, кратную 1 000 ₽.');
  if (!item || item.status !== 'Открыт') throw Error('Выпуск пока недоступен для покупки.');
  const limit = Math.round(Number(item.issueSum.replace(' млн ₽','').replace(',','.'))*1000000);
  const owned = portfolio.find(p=>p.id===item.id)?.amount || 0;
  if (owned + value > limit) throw Error('Сумма превышает доступный объём выпуска.');
  const next = portfolio.filter(p=>p.id!==item.id);
  return [...next,{id:item.id,amount:owned+value,tokens:(owned+value)/TOKEN_PRICE}];
}
export function validateIssue(form) {
  if (!Number.isSafeInteger(Number(form.amount)) || Number(form.amount)<100000 || Number(form.amount)>12000000) return 'Сумма выпуска: от 100 000 до 12 000 000 ₽.';
  if (!Number.isInteger(Number(form.days)) || Number(form.days)<1 || Number(form.days)>365) return 'Срок: от 1 до 365 дней.';
  if (!Number.isFinite(Number(form.rate)) || Number(form.rate)<=0 || Number(form.rate)>30) return 'Доходность: больше 0 и не выше 30%.';
  return '';
}
