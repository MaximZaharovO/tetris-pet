import { useCallback, useEffect } from "react";

export default function useGlobalAction(eventName, callback, states, ref) {
    const handleGlobalKeyDown = useCallback(callback, states); // Add dependencies if handleGlobalKeyDown uses state/props

    useEffect(() => {
        (ref?.current ?? document).addEventListener(eventName, handleGlobalKeyDown);
        return () => {
            document.removeEventListener(eventName, handleGlobalKeyDown);
        };
    }, [handleGlobalKeyDown]);
}