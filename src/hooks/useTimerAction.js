import { useState, useEffect } from "react"

function useTimerAction(mils, callback, settings, stop) {
    const [count, setCount] = useState(0)

    const [timers, setTimers] = useState(settings.map((setting, id) => {
        return {
            ...setting, 
            id,
            pause: !!setting.pause,
            localCount: 0
        }
    }))

    const editTimer = (id, callback) => {
        setTimers(prev => 
            {
                return prev.map(x => {
                    if (x.id === id) {
                        callback(x)
                    }
                    return x
                })
            }
        )
    }

    useEffect(() => {
        if (stop) return;

        let args = null

        for (let timer of timers) {
            if (!timer.pause) {
                if ((timer.localCount > 0 || timer.launchImmediately) && timer.localCount % timer.launchOnCount === 0) {
                    args = timer.editArgs(args)
                }
            }
        }

        if (args !== null) {
            callback(args)
        }

        const timer = setTimeout(() => {
            setTimers(prev => prev.map(x => {
                if (!x.pause) {
                    x.localCount++;
                }
                else if (x.localCount > 0) {
                    x.localCount = 0
                }
                
                return x;
            }))
        }, mils)
        return () => clearTimeout(timer)
   }, [count, timers])

   return timers.map(x => {
    const setPause = (pause) => {
        editTimer(x.id, (x) => x.pause = pause)
    }
    return setPause
   })
}

export default useTimerAction