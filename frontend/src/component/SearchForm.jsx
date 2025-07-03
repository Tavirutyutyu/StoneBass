import InstrumentSelectorDropdown from "./InstrumentSelectorDropdown.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SearchForm() {
    const navigate = useNavigate();
    const [instrumentType, setInstrumentType] = useState("")

    function handleInstrumentType(newType) {
        setInstrumentType(newType);
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (instrumentType !== "") {
            navigate(`/instruments?instrumentType=${instrumentType}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <InstrumentSelectorDropdown instrumentType={instrumentType} handleInstrumentType={handleInstrumentType}/>
            <button type="submit">Search</button>
        </form>
    )
}