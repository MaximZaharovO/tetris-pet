import { useState } from "react";
import useGlobalAction from "./useGlobalAction";

export default function useKeysAction(downRef, upRef, leftRef, rightRef) {
    const [leftPressed, setLeftPressed] = useState(false)
    const [rightPressed, setRightPressed] = useState(false)
    const [upPressed, setUpPressed] = useState(false)
    const [downPressed, setDownPressed] = useState(false)

    const [mouseControlsUsed, setMouseControlUsed] = useState(false)

    const states = [leftPressed, rightPressed, upPressed, downPressed]

    function onKey(e, pressed) {
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
    }

    function OnTouchEND() {
        if (mouseControlsUsed) {
            setMouseControlUsed(false)

            setDownPressed(false)
            setUpPressed(false)
            setLeftPressed(false)
            setRightPressed(false)
        }
    }

    function OnTouchDOWN(e) {
        e.preventDefault()

        setMouseControlUsed(true)
        setDownPressed(true)
    }

    function OnTouchROTATE(e) {
        e.preventDefault()

        setMouseControlUsed(true)
        setUpPressed(true)
    }

    function OnTouchLEFT(e) {
        e.preventDefault()

        setMouseControlUsed(true)
        setLeftPressed(true)
    }

    function OnTouchRIGHT(e) {
        e.preventDefault()
        
        setMouseControlUsed(true)
        setRightPressed(true)
    }


    useGlobalAction("touchend", (e) => OnTouchEND(e), states)

    useGlobalAction("touchstart", (e) => OnTouchDOWN(e), states, downRef)
    useGlobalAction("touchstart", (e) => OnTouchROTATE(e), states, upRef)
    useGlobalAction("touchstart", (e) => OnTouchLEFT(e), states, leftRef)
    useGlobalAction("touchstart", (e) => OnTouchRIGHT(e), states, rightRef)

    useGlobalAction("keydown", (e) => onKey(e, true), states)
    useGlobalAction("keyup", (e) => onKey(e, false), states)

    return states
}