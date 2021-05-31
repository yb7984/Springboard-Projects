import { useSelector, useDispatch } from "react-redux";
import Meme from './Meme';
import './MemeList.css';

const MemeList = () => {

    const meme = useSelector(st => st.meme);
    const dispatch = useDispatch();

    const deleteMeme = (meme) => {
        dispatch({ type: "REMOVE", memeId: meme.id });
    };

    return (
        <div className="MemeList">
            {Object.values(meme).map(item => (<Meme meme={item} deleteMeme={deleteMeme} key={item.id} />))}
        </div>
    );
}

export default MemeList;