import * as React from 'react'

export default function useTimer(isActive) {
  const [timeElapsed, setTimeElapsed] = React.useState(0)

  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setTimeElapsed(timeElapsed + 1)
      }, 1000)
    }
  }, [isActive, timeElapsed])

  return { timeElapsed, setTimeElapsed }
}
