export type SearchParams = { [key: string]: string | string[] | undefined };

export async function setInSearchParams(
  currentSearchParams: Promise<SearchParams>,
  overrides: SearchParams,
): Promise<SearchParams> {
  return {
    ...(await currentSearchParams),
    ...overrides,
  };
}

export function searchParamsAsString(searchParams: SearchParams): string {
  return Object.entries(searchParams)
    .reduce<string[]>((acc, [k, v]) => {
      if (!v) return acc;

      return [...acc, ...(Array.isArray(v) ? v : [v]).map((vi) => `${k}=${vi}`)];
    }, [])
    .join('&');
}

export async function updateQueryString(
  currentSearchParams: Promise<SearchParams>,
  overrides: SearchParams,
): Promise<string> {
  return searchParamsAsString(await setInSearchParams(currentSearchParams, overrides));
}
