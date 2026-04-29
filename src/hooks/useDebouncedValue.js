import { useEffect, useState } from 'react'

export function useDebouncedValue(value, delay = 250) {
  const [debouncedValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => { window.clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}
