import { backendGet } from '@/lib/backend';

export type Money = {
  amountMinor: number;
  currency: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: Money;
};

export type MenuCategory = {
  id: string;
  slug: string;
  name: string;
  items: MenuItem[];
};

export type MenuResponse = {
  defaultCurrency: string;
  categories: MenuCategory[];
};

const emptyMenu: MenuResponse = {
  defaultCurrency: 'LKR',
  categories: []
};

export function getMenu(): Promise<MenuResponse> {
  return backendGet('/api/v1/catalog/menu', emptyMenu);
}

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: 0
  }).format(money.amountMinor / 100);
}