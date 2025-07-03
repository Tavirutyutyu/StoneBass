import {useEffect, useState} from "react";

async function getInstrumentTypes() {
    const response = await fetch("/api/instrumentType/all")
    if (response.status === 200) {
        return await response.json()
    } else {
        console.log("Error fetching instrument types...")
    }
}

export default function InstrumentSelectorDropdown({instrumentType, handleInstrumentType}) {
    const [instrumentTypes, setInstrumentTypes] = useState([])

    useEffect(() => {
        getInstrumentTypes().then((response) => {
            if (response !== undefined) {
                setInstrumentTypes(response);
            }
        })
    }, [])

    function handleChange(event) {
        handleInstrumentType(event.target.value);
    }

    return (
        <select id="instrumentType" value={instrumentType} required onChange={handleChange}>
            <option value="" disabled>Select Instrument Type</option>
            {instrumentTypes?.map(item => (
                <option value={item.id} key={item.id}>{item.name}</option>
            ))}
        </select>
    )
}