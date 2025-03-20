export type SearchParams = { [key: string]: string | string[] | undefined };

export async function getSingleStringFromSearchParams(
  searchparams: Promise<SearchParams>,
  key: string,
): Promise<string | undefined> {
  const params = await searchparams;
  const value = params[key];
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  return value[0] || undefined;
}
