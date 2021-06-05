import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"
import { voteDown, voteUp } from "./actionsPost";

const Votes = ({ post }) => {

    const dispatch = useDispatch();
    const handleVoteUp = () => {
        dispatch(voteUp(post));
    }

    const handleVoteDown = () => {
        dispatch(voteDown(post));
    }

    return (
        <div className="font-weight-bold">
            {post.votes} votes
            <button className="btn btn-link text-primary" onClick={handleVoteUp}>
                <FontAwesomeIcon icon={["fas", "thumbs-up"]} />
            </button>
            <button className="btn btn-link text-danger" onClick={handleVoteDown}>
                <FontAwesomeIcon icon={["fas", "thumbs-down"]} />
            </button>
        </div>
    )
}

export default Votes;