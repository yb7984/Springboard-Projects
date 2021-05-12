import React from "react";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import useAxios from "./hooks/useAxios";
import { v4 as uuid } from "uuid";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, addCard, clearCards] = useAxios(
    'https://deckofcardsapi.com/api/deck/new/draw/' , 
    'playingCards');
  const formatCard = (data) => {
    return {
      id: uuid(),
      image: data.cards[0].image
    }
  }

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => { addCard(formatCard); }}>Add a playing card!</button>
        <button onClick={() => { clearCards(); }}>Clear All cards!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div >
  );
}

CardTable.defaultProps = {};

export default CardTable;
