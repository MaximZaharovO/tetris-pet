import { useState } from "react";
import useGlobalAction from "./useGlobalAction";

export default function useKeysAction() {
    const [leftPressed, setLeftPressed] = useState(false)
    const [rightPressed, setRightPressed] = useState(false)
    const [upPressed, setUpPressed] = useState(false)
    const [downPressed, setDownPressed] = useState(false)

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

    useGlobalAction("keydown", (e) => onKey(e, true), states)
    useGlobalAction("keyup", (e) => onKey(e, false), states)

    return states
}