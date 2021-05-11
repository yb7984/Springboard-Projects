import axios from 'axios';

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

/**
 * DeckofCards class for access deckofcards API
 */
class DeckHelper {

    /**
     * shuffle the deck and get the deckId
     * @param {*} count 
     */
    static async shuffle(count = 1) {
        const resp = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=${count}`);

        return {
            deckId: resp.data.deck_id,
            remaining: resp.data.remaining,
            cards: []
        };
    }

    /**
     * Draw cards from deck and return the array of cards
     * @param {*} count 
     * @returns 
     */
    static async drawCards(deck, count = 1) {
        let drawCount = count;
        if (deck.remaining <= count) {
            drawCount = deck.remaining;
        }

        if (drawCount > 0) {
            const resp = await axios.get(`${BASE_URL}/${deck.deckId}/draw/?count=${drawCount}`);

            return {
                deckId: resp.data.deck_id,
                remaining: resp.data.remaining,
                cards: resp.data.cards
            };
        }

        return {
            deckId: deck.deck_id,
            remaining: deck.remaining,
            cards: []
        };
    }
}


export default DeckHelper;