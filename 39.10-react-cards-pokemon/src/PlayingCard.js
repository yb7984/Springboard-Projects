import React from "react";
import backOfCard from "./back.png";
import useFlip from './hooks/useFlip';
import "./PlayingCard.css"

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  // const [isFacingUp, setIsFacingUp] = useState(true);
  // const flipCard = () => {
  //   setIsFacingUp(isUp => !isUp);
  // };

  const [, image, flipCard] = useFlip(front, back, true);

  return (
    <img
      src={image}
      alt="playing card"
      onClick={flipCard}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
