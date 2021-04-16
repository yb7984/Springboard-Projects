const Person = ({ name, age , hobbies }) => {
    return <p>
        {name.length <= 8 ? name : name.substring(0, 6)}
        <h3>{age >= 18 ? "Please go vote!" : "You must be 18"}</h3>
        <ul>
            {hobbies.map((hobby) => <li>{hobby}</li>)}
        </ul>
    </p>
};