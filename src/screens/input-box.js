import "./common.css"

export default function InputBox({ value, onChange, label, validation, id, placeholder, subLabel }) {

    return (
        <div className="form-input-group">
            <label htmlFor={id}>{label}</label>
            {subLabel ?
                <a className="sub-label"
                    href="https://economictimes.indiatimes.com/wealth/ifsc-bank-code"
                    target="_blank"
                    rel="noreferrer"
                >
                    {subLabel}
                </a> : null
            }
            <input value={value} id={id} onChange={onChange} placeholder={placeholder} />
            {validation ? <span className="validation">{validation}</span> : null}
        </div>
    )

}