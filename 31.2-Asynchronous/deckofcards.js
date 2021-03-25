const btn = document.getElementById("btn-card");
const cards = document.getElementById("cards");

let deck_id = null;
let remaining = 52;

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (remaining === 0) {
        return;
    }
    if (deck_id === null) {
        const resp = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

        deck_id = resp.data["deck_id"];
        remaining = resp.data["remaining"];

        await showCard(deck_id);
    } else {
        await showCard(deck_id);
    }
});

async function showCard(deck_id) {
    const resp = await getCard(deck_id);
    const data = resp.data;
    remaining = data["remaining"];

    const card = data["cards"][0];
    cards.insertAdjacentHTML("beforeend", `<img id="card-${card["code"]}" src="${card["image"]}" class="card${remaining % 6}" />`)

    const cardImage = document.getElementById(`card-${card["code"]}`);
    if (remaining === 0) {
        deck_id = null;
    }

    console.log("remaining", remaining);
}


async function getCard(deck_id) {
    return await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
}

async function getOneCard() {
    const resp = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

    const resp1 = await getCard(resp.data["deck_id"]);

    const cards = resp1.data["cards"];
    if (cards.length > 0) {
        console.log(`${cards[0]["value"]} of ${cards[0]["suit"]}`);
    }
}

getOneCard();

async function getTwoCard() {
    const cards = [];
    const resp = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

    const resp1 = await getCard(resp.data["deck_id"]);
    if (resp1.data["cards"].length > 0) {
        cards.push(resp1.data["cards"][0]);
    }
    const resp2 = await getCard(resp.data["deck_id"]);
    if (resp2.data["cards"].length > 0) {
        cards.push(resp2.data["cards"][0]);
    }

    cards.forEach(card => {
        console.log(`${card["value"]} of ${card["suit"]}`);
    });
}

getTwoCard();