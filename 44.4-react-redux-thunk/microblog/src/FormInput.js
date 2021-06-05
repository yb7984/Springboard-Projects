
/**
 * Input Form Item Component
 * @param {*} props contains {
 * name field name, use for name and id for the input
 * value value of the input
 * handleChange function for handling value change
 * title Label text for the input
 * placeholder placeholder text for the input
 * type: default value text, can be email, number, date , password , color
 * text: help information for this field
 * minLength: minium length required
 * required: default value is false
 * readOnly: default value is false 
 * } 
 * @returns 
 */
const FormInput = ({
    name,
    value,
    handleChange,
    title,
    placeholder,
    type = "text",
    text = "",
    minLength = 0,
    errorMsg = "",
    required = false,
    readOnly = false,
    rows = 4
}) => {

    let fieldHtml = "";
    if (type === "textarea") {
        fieldHtml = (
            <textarea className="form-control"
                id={name}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                required={required ? "required" : ""}
                readOnly={readOnly ? "readonly" : ""}
                minLength={minLength}
                value={value}
                rows={rows}
            >
            </textarea>
        );
    } else {
        fieldHtml = (
            <input className="form-control"
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                minLength={minLength}
                required={required ? "required" : ""}
                readOnly={readOnly ? "readonly" : ""}
            />
        );
    }

    return (
        <div className="mb-3">
            <label htmlFor="username" className="form-label">{title}</label>
            {fieldHtml}
            <div className="form-text">{text}</div>
            <span className="text-danger">{errorMsg}</span>
        </div>
    );
}

export default FormInput;