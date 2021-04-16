const Tweet = ({ username, name, date, message }) => {
    return <div>
        <div>{name}({username}) posted on:  {date}</div>
        <div>{message}</div>
    </div>
};