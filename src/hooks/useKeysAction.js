import { useCallback, useState, useEffect } from "react";

export default function useKeysAction(downRef, upRef, leftRef, rightRef) {
    const [leftPressed, setLeftPressed] = useState(false)
    const [rightPressed, setRightPressed] = useState(false)
    const [upPressed, setUpPressed] = useState(false)
    const [downPressed, setDownPressed] = useState(false)

    const [mouseControlsUsed, setMouseControlUsed] = useState(false)

    const states = [leftPressed, rightPressed, upPressed, downPressed, mouseControlsUsed]

    const onKey = useCallback((e, pressed) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault()
            setLeftPressed(pressed)
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault()
            setRightPressed(pressed)
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setDownPressed(pressed)
        }

        if (e.key === "ArrowUp") {
            e.preventDefault()
            setUpPressed(pressed)
        }
    }, states)

    const OnTouchEND = useCallback(() => {
        if (mouseControlsUsed) {
            setMouseControlUsed(false)

            setDownPressed(false)
            setUpPressed(false)
            setLeftPressed(false)
            setRightPressed(false)
        }
    }, states)

    const OnTouchDOWN = useCallback((e) => {
        e.preventDefault()

        setMouseControlUsed(true)
        setDownPressed(true)
    }, [mouseControlsUsed, downPressed])

    const OnTouchROTATE = useCallback((e) => {
        e.preventDefault()

        setMouseControlUsed(true)
        setUpPressed(true)
    }, [mouseControlsUsed, upPressed])

    const OnTouchLEFT = useCallback((e) => {
        e.preventDefault()

        setMouseControlUsed(true)
        setLeftPressed(true)
    }, [mouseControlsUsed, leftPressed])

    const OnTouchRIGHT = useCallback((e) => {
        e.preventDefault()
        
        setMouseControlUsed(true)
        setRightPressed(true)
    }, [mouseControlsUsed, rightPressed])

    useEffect(() => {
        document.addEventListener("touchend", OnTouchEND);

        document.addEventListener("keydown", (e) => onKey(e, true));
        document.addEventListener("keyup", (e) => onKey(e, false));

        if (downRef?.current) {
            downRef.current.addEventListener("touchstart", OnTouchDOWN);
        }
        if (upRef?.current) {
            upRef.current.addEventListener("touchstart", OnTouchROTATE);
        }
        if (leftRef?.current) {
            leftRef.current.addEventListener("touchstart", OnTouchLEFT);
        }
        if (rightRef?.current) {
            rightRef.current.addEventListener("touchstart", OnTouchRIGHT);
        }

        return () => {
            document.removeEventListener("touchend", OnTouchEND);

            document.removeEventListener("keydown", (e) => onKey(e, true));
            document.removeEventListener("keyup", (e) => onKey(e, false));

            if (downRef?.current) {
                downRef.current.removeEventListener("touchstart", OnTouchDOWN);
            }
            if (upRef?.current) {
                upRef.current.removeEventListener("touchstart", OnTouchROTATE);
            }
            if (leftRef?.current) {
                leftRef.current.removeEventListener("touchstart", OnTouchLEFT);
            }
            if (rightRef?.current) {
                rightRef.current.removeEventListener("touchstart", OnTouchRIGHT);
            }
        };
    }, [downRef, upRef, leftRef, rightRef, 
            OnTouchDOWN, OnTouchROTATE, OnTouchLEFT, OnTouchRIGHT, OnTouchEND, onKey]);

    return states
}