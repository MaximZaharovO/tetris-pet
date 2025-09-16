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

    function readyToLaunch(timer) {
        if (!timer.accelerateOnCount) {
            return (timer.localCount % timer.launchOnCount === 0) 
        }
        let accelerate = Math.floor(count / timer.accelerateOnCount)
        if (timer.launchOnCount - accelerate >= 1) {
            return (timer.localCount % (timer.launchOnCount - accelerate) === 0) 
        }
        return true
    }

    useEffect(() => {
        if (stop) return;

        setCount(prev => prev + 1)

        let args = null

        for (let timer of timers) {
            if (!timer.pause) {
                let canBeLaunched = (timer.localCount > 0 || timer.launchImmediately) && readyToLaunch(timer)

                if (canBeLaunched) {
                    args = timer.editArgs(args)
                }
            }
        }

        if (args !== null) {
            callback(args)
        }

        const timer = setTimeout(() => {
            setTimers(prev => prev.map(x => {
                let newObject = Object.assign({}, x)

                if (!newObject.pause) {
                    newObject.localCount++;
                }
                else if (x.localCount > 0) {
                    newObject.localCount = 0
                }
                
                return newObject;
            }))
        }, mils)
        return () => clearTimeout(timer)
   }, [timers])

   return timers.map(x => {
    const setPause = (pause) => {
        editTimer(x.id, (x) => x.pause = pause)
    }
    return setPause
   })
}

export default useTimerAction