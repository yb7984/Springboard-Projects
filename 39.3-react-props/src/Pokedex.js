import React from "react";
import PokeCard from "./PokeCard";
import "./Pokedex.css";

const Pokedex = ({ items = [
    { id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
    { id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
    { id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
    { id: 12, name: 'Butterfree', type: 'flying', base_experience: 178 },
    { id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
    { id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95 },
    { id: 94, name: 'Gengar', type: 'poison', base_experience: 225 },
    { id: 133, name: 'Eevee', type: 'normal', base_experience: 65 }
], title = "Pokedex", totalExp, winner }) => {
    return <div className="Pokedex">
        <div className="Pokedex-title">
            {title}
            {totalExp !== undefined ? <div className="Pokedex-totalExp">TotalEXP:{totalExp}</div> : ""}
            {winner !== undefined ? <div className={winner ? "Pokedex-winner" : "Pokedex-loser"}>{winner ? "WINNER" : "LOSER"}</div> : ""}
        </div>
        <div className="Pokedex-Cards">
            {items.map(item => <PokeCard item={item} key={item.id} />)}
        </div>
    </div>
}

export default Pokedex;