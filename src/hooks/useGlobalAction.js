import { useCallback, useEffect } from "react";

export default function useGlobalAction(eventName, callback, states) {
    const handleGlobalKeyDown = useCallback(callback, states); // Add dependencies if handleGlobalKeyDown uses state/props

    useEffect(() => {
        document.addEventListener(eventName, handleGlobalKeyDown);
        return () => {
            document.removeEventListener(eventName, handleGlobalKeyDown);
        };
    }, [handleGlobalKeyDown]);
}