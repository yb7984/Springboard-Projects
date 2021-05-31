import './Meme.css';
const Meme = ({ meme, deleteMeme }) => {

    const handleDelete = () => {
        deleteMeme(meme);
    }

    return (
        <div className="Meme">
            <div className="Meme-top">{meme.top}</div>
            <div className="Meme-bottom">{meme.bottom}</div>
            <img className="Meme-img" src={meme.image} alt={meme.id} />
            <button className="Meme-btn" onClick={handleDelete}>X</button>
        </div>
    );
}

export default Meme;