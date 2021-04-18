import React from "react";
import "./PokeCard.css";

const PokeCard = ({ item }) => {
    return <div className="PokeCard">
        <div className="PokeCard-name">{item.name}</div>
        <div><img className="PokeCard-img"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
            alt={item.name} /></div>
        <div className="PokeCard-detail">Type:{item.type}</div>
        <div className="PokeCard-detail">EXP:{item.base_experience}</div>
    </div>
}

export default PokeCard;