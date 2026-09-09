export const PAYMENT_INFO = {
  titular: "Juan Carlos Lorem",
  cvu: "0000003100000000000000",
  alias: "evas.del.eden",
  prices: {
    Platinum: 15000,
    Gold: 10000,
    Silver: 6000,
  },
};

export const getPriceForCategory = (category) =>
  PAYMENT_INFO.prices[category] ?? null;