import "./Card.css";

const Card = ({image, code , className}) => {
    return (<img src={image} className={`Card ${className}`}  alt={code}/>)
}

export default Card;