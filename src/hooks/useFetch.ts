import React, { useEffect, useState } from "react"

function useFetch<T>(service: () => Promise<T>) {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    setLoading(true)
    service()
      .then((data) => {
        setData(data)
        setLoading(false)
        setError(null)
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
      })
  }, [service])

  return {
    isLoading,
    data,
    error,
    setData,
    setLoading,
    setError,
  }
}

export default useFetch
