import React from "react";
import Pokedex from "./Pokedex";
import "./Pokegame.css";

const Pokegame = ({ items = [
    { id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
    { id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
    { id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
    { id: 12, name: 'Butterfree', type: 'flying', base_experience: 178 },
    { id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
    { id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95 },
    { id: 94, name: 'Gengar', type: 'poison', base_experience: 225 },
    { id: 133, name: 'Eevee', type: 'normal', base_experience: 65 }
] }) => {
    const list1 = [];
    const list2 = [];
    while (list1.length < Math.floor(items.length / 2)) {
        const randItem = items[Math.floor(Math.random() * items.length)];
        if (!list1.includes(randItem)) {
            list1.push(randItem);
        }
    }

    items.forEach(item => {
        if (!list1.includes(item) && list2.length < list1.length) {
            list2.push(item);
        }
    })

    const total1 = totalExp(list1);
    const total2 = totalExp(list2);

    return <div className="Pokegame">
        <Pokedex items={list1} title="Pokedex1" totalExp={total1} winner={total1 > total2} />
        <Pokedex items={list2} title="Pokedex2" totalExp={total2} winner={total1 < total2} />
    </div>
}

const totalExp = (list) => {
    let total = 0;

    list.forEach(item => {
        total += item.base_experience;
    });

    return total;
}

export default Pokegame;