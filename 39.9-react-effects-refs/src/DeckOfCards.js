import { useState, useEffect, useRef } from 'react';
import DeckHelper from './DeckHelper';
import Card from './Card';
import './DeckOfCards.css';


const DeckOfCards = ({ deckCount = 1, cardsPerDraw = 1 }) => {
    const [deck, setDeck] = useState({
        deckCount: deckCount,
        deckId: '',
        remaining: 0,
        cards: []
    });

    const [timerOn, setTimerOn] = useState(false);
    const [error, setError] = useState('');

    const timerId = useRef(null);

    // initial the deck
    const initDeck = async () => {
        setTimerOn(false);
        setError('');
        try {
            setDeck(await DeckHelper.shuffle(deckCount));
        } catch (error) {
            setError('Error:fail to shuffle the deck!')
        }
    };

    //runs when page load
    useEffect(() => {
        initDeck();
    }, [deckCount]);


    //runs when toggle timer
    useEffect(() => {
        if (timerOn === true && timerId.current === null) {
            //turn on the timer
            timerId.current = setInterval(async () => {
                await drawCards();
            }, 1000);
        }

        return () => {
            //clear the timer
            clearInterval(timerId.current);
            timerId.current = null;
        }
    }, [timerOn, deckCount])

    //draw a card from the deck
    const drawCards = async () => {
        if (deck.remaining === 0) {
            setTimerOn(false);

            setError('Error: no cards remaining!');
            return;
        }

        setError('');

        try {
            const drawResult = await DeckHelper.drawCards(deck, cardsPerDraw);

            setDeck(deck => ({
                ...deck,
                remaining: drawResult.remaining,
                cards: [...deck.cards, ...drawResult.cards]
            }));
        } catch (error) {
            setError('Error: fail to draw a card!');
        }
    };

    const startDrawing = () => {
        setTimerOn(!timerOn);
    }


    return (<div className="DeckOfCards">
        <div className="DeckOfCards-control">
            {deck.remaining === 0 ? (<>
                <button onClick={async () => { await initDeck(); }}>Reshuffle</button>
            </>) : (<>
                <button onClick={async () => { await drawCards(); }}>
                    GIVE ME A CARD!
                    </button>
                <button onClick={startDrawing}>
                    {timerOn ? 'Stop Auto Drawing' : 'Start Auto Drawing'}
                </button>
            </>)}
        </div>
        <div className="DeckOfCards-remaining">
            <span className="DeckOfCards-remaining-number">
                {deck.remaining}
            </span>
            cards left
        </div>
        {error ? (<div className="DeckOfCards-error">{error}</div>) : ''}
        <div className="DeckOfCards-cards">
            {deck.cards.map((card, idx) => {
                return (<Card key={idx} className={`Card-${idx % 6}`} image={card.image} code={card.code} />)
            })}
        </div>
    </div>)
}

export default DeckOfCards;