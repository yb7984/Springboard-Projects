import { useState } from "react";

const useFlip = (front, back , defaultValue) => {
    const [isFacingUp, setIsUp] = useState(defaultValue);
    const flipCard = () => {
        setIsUp(isFacingUp => !isFacingUp);
    };

    return [isFacingUp , isFacingUp ? front : back, flipCard];
}
export default useFlip;