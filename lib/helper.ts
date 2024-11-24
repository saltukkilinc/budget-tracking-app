export const formatMoney = (
  amount: number,
  locale: string = "tr-TR",
  currency: string = "TRY"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};


