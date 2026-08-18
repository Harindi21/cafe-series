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

export async function getMenu(): Promise<MenuResponse> {
  if (process.env.SKIP_BACKEND_FETCH_DURING_BUILD === 'true') {
    return emptyMenu;
  }

  const baseUrl = process.env.BACKEND_INTERNAL_URL ?? 'http://localhost:8080';
  const response = await fetch(`${baseUrl}/api/v1/catalog/menu`, {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    throw new Error(`Catalog API returned ${response.status}`);
  }

  return response.json() as Promise<MenuResponse>;
}

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: 0
  }).format(money.amountMinor / 100);
}
