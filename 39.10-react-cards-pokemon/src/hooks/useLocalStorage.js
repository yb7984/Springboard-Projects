import { useEffect, useState } from "react";

const useLocalStorage = (key, initValue = []) => {

    if (key && localStorage.getItem(key)) {
        initValue = JSON.parse(localStorage.getItem(key));
    }

    const [state, setState] = useState(initValue);

    useEffect(() => {
        if (key) {
            localStorage.setItem(key, JSON.stringify(state));
        }
    }, [state, setState])


    return [state, setState];
}

export default useLocalStorage;