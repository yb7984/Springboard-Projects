import React, { useState } from "react";
import "./EightBall.css";

const EightBall = ({
    answers = [
        { msg: "It is certain.", color: "green" },
        { msg: "It is decidedly so.", color: "green" },
        { msg: "Without a doubt.", color: "green" },
        { msg: "Yes - definitely.", color: "green" },
        { msg: "You may rely on it.", color: "green" },
        { msg: "As I see it, yes.", color: "green" },
        { msg: "Most likely.", color: "green" },
        { msg: "Outlook good.", color: "green" },
        { msg: "Yes.", color: "green" },
        { msg: "Signs point to yes.", color: "goldenrod" },
        { msg: "Reply hazy, try again.", color: "goldenrod" },
        { msg: "Ask again later.", color: "goldenrod" },
        { msg: "Better not tell you now.", color: "goldenrod" },
        { msg: "Cannot predict now.", color: "goldenrod" },
        { msg: "Concentrate and ask again.", color: "goldenrod" },
        { msg: "Don't count on it.", color: "red" },
        { msg: "My reply is no.", color: "red" },
        { msg: "My sources say no.", color: "red" },
        { msg: "Outlook not so good.", color: "red" },
        { msg: "Very doubtful.", color: "red" },
    ]
}) => {

    const getRandom = () => (Math.floor(Math.random() * answers.length));

    const reset = () => {
        setCount({});
        setColor("black");
        setMsg("Think of a Question");
    }

    const change = () => {
        const answer = answers[getRandom()];
        setMsg(answer.msg);
        setColor(answer.color);

        if (count[answer.color] !== undefined){
            count[answer.color] += 1;
        } else{
            count[answer.color] = 1;
        }

        setCount(count);
    }

    const [msg, setMsg] = useState("Think of a Question");
    const [color, setColor] = useState("black");
    const [count, setCount] = useState({});

    return (<div className="EightBall">
        <div className="EightBall-ball"
            style={{ "background-color": color }}
            onClick={change}>
            <div className="EightBall-msg" > {msg} </div>
        </div>
        <ul className="EightBall-counter">
            {Object.entries(count).map( item => <li style={{color:item[0]}}>{item[0]} : {item[1]}</li>)}
        </ul>
        <button onClick={reset}>Restart</button>
    </div>)
}

export default EightBall;