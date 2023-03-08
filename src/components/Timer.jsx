import React from 'react'

export default function Timer ({ stopFlag, time, setTime, setPoints }) {
  React.useEffect(() => {
    let interval
    if (!stopFlag) {
      setPoints(prevPoints => ({
        ...prevPoints,
        time: Math.trunc(time)
      }))
      interval = setInterval(() => setTime(
        time => time - 0.01
      ), 10)
    }
    return () => clearInterval(interval)
  }, [time])

  return Math.trunc(time)
}
