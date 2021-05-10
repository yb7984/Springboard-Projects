import "./Box.css";

const Box = ({ color, width, height, id, handlDelete }) => {
    return (
        <div className="Box">
            <div className="Box-box" data-testid={id} style={{ backgroundColor: color, width: `${width}px`, height: `${height}px` }}></div>
            <button className="Box-btn" data-testid={`del-${id}`} onClick={() => { handlDelete(id) }}>X</button>
        </div >)
}


export default Box;