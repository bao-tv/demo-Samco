export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname

export const formatNumber = (number: number) => number.toLocaleString(undefined, { maximumFractionDigits: 2 });