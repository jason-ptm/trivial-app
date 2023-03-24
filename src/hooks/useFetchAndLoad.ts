import { AxiosCall } from '@/model'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false)
  let controller: AbortController

  const callEndpoint = async (axiosCall: AxiosCall<unknown>) => {
    if (axiosCall.controller) controller = axiosCall.controller
    setLoading(true)
    let result = {} as AxiosResponse<unknown>
    try {
      result = await axiosCall.call
    } catch (err: unknown) {
      setLoading(false)
      throw err
    }
    setLoading(false)
    return result
  }

  const cancelEndpoint = () => {
    setLoading(false)
    controller && controller.abort()
  }

  useEffect(() => {
    return () => {
      cancelEndpoint()
    }
  }, [])

  return { loading, callEndpoint }
}

export default useFetchAndLoad
