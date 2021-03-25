const btn = document.getElementById("btn-card");
const cards = document.getElementById("cards");

let deck_id = null;
let remaining = 52;

btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (remaining === 0) {
        return;
    }
    if (deck_id === null) {
        axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then(resp => {
                deck_id = resp.data["deck_id"];
                remaining = resp.data["remaining"];

                showCard(deck_id);
            });
    } else {
        showCard(deck_id);
    }
});

function showCard(deck_id) {
    getCard(deck_id)
        .then(resp => {
            const data = resp.data;
            remaining = data["remaining"];

            const card = data["cards"][0];
            cards.insertAdjacentHTML("beforeend", `<img id="card-${card["code"]}" src="${card["image"]}" class="card${remaining % 6}" />`)

            const cardImage = document.getElementById(`card-${card["code"]}`);
            if (remaining === 0) {
                deck_id = null;
            }

            console.log("remaining", remaining);
        });
}


function getCard(deck_id) {
    return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
}

function getOneCard() {
    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(resp => {
            getCard(resp.data["deck_id"]).then(resp => {
                const cards = resp.data["cards"];
                if (cards.length > 0) {
                    console.log(`${cards[0]["value"]} of ${cards[0]["suit"]}`);
                }
            });
        });
}

// getOneCard();

function getTwoCard() {
    const cards = [];
    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(resp => {
            getCard(resp.data["deck_id"])
                .then(resp => {
                    if (resp.data["cards"].length > 0) {
                        cards.push(resp.data["cards"][0]);
                    }
                    return getCard(resp.data["deck_id"]);
                })
                .then(resp => {
                    if (resp.data["cards"].length > 0) {
                        cards.push(resp.data["cards"][0]);
                    }

                    cards.forEach(card => {
                        console.log(`${card["value"]} of ${card["suit"]}`);
                    });
                });
        });
}

// getTwoCard();