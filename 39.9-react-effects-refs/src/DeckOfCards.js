import { useState, useEffect, useRef } from 'react';
import DeckHelper from './DeckHelper';
import Card from './Card';
import './DeckOfCards.css';


const DeckOfCards = ({ count = 1 }) => {
    const [currentDeck, setCurrentDeck] = useState({
        deckCount: count,
        deckId: '',
        remaining: 0,
        cards: []
    });

    const [timerOn, setTimerOn] = useState(false);
    const [error, setError] = useState('');

    const timerId = useRef();

    // initial the deck
    const initDeck = async () => {
        stopDrawing();
        setError('');
        try {
            setCurrentDeck(await DeckHelper.shuffle(count));
        } catch (error) {
            setError('Error:fail to shuffle the deck!')
        }
    };

    useEffect(() => {
        initDeck();

        return () => {
            stopDrawing();
        }
    }, [count]);

    //clear timer
    const stopDrawing = () => {
        clearInterval(timerId.current);
        setTimerOn(false);
        timerId.current = undefined;
    }

    //draw a card from the deck
    const drawCards = async (cardCount = 1) => {
        if (currentDeck.remaining === 0) {
            if (timerOn) {
                stopDrawing();
            }

            setError('Error: no cards remaining!');
            return;
        }

        setError('');
        
        try {
            const drawResult = await DeckHelper.drawCards(currentDeck, cardCount);

            setCurrentDeck(deck => ({
                ...deck,
                remaining: drawResult.remaining,
                cards: [...deck.cards, ...drawResult.cards]
            }));
        } catch (error) {
            setError('Error: fail to draw a card!');
        }
    };

    const startDrawing = () => {
        if (timerOn === false) {
            // if not started yet, start the clock
            timerId.current = setInterval(async () => {
                await drawCards();
            }, 1000);
            setTimerOn(true);
        } else {
            // already started, stop the clock
            stopDrawing();
        }
    }


    return (<div className="DeckOfCards">
        <div className="DeckOfCards-control">
            {currentDeck.remaining === 0 ? (<>
                <button onClick={async () => { await initDeck(); }}>Reshuffle</button>
            </>) : (<>
                <button onClick={async () => { await drawCards(); }}>
                    GIVE ME A CARD!
                    </button>
                <button onClick={startDrawing}>
                    {timerOn ? 'Stop Drawing' : 'Start Drawing'}
                </button>
            </>)}
        </div>
        <div className="DeckOfCards-remaining"><span className="DeckOfCards-remaining-number">{currentDeck.remaining}</span> cards left</div>
        {error ? <div className="DeckOfCards-error">{error}</div> : ''}
        <div className="DeckOfCards-cards">
            {currentDeck.cards.map((card, idx) => {
                return (<Card key={idx} className={`Card-${idx % 6}`} image={card.image} code={card.code} />)
            })}
        </div>
    </div>)
}

export default DeckOfCards;