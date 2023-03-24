export const getLocalStorage = (key: string): string => {
  const item = localStorage.getItem(key)
  if (item) return item
  return ''
}

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}
