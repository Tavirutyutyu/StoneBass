import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

async function getInstrumentTypes() {
    const response = await fetch("/api/instrumentType/all")
    if (response.status === 200) {
        return await response.json()
    } else {
        console.log("Error fetching instrument types...")
    }
}

async function upload(title, description, file, hasResonator, instrumentType) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("hasResonator", hasResonator);
    formData.append("instrumentType", instrumentType);

    const response = await fetch("/api/instrument/upload", {
        method: "POST",
        body: formData,
    })
    return response.status === 200
}

export default function UploadForm() {
    const navigate = useNavigate()

    const [instrumentTypes, setInstrumentTypes] = useState([])

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [hasResonator, setHasResonator] = useState(false);
    const [instrumentType, setInstrumentType] = useState("");

    useEffect(() => {
        getInstrumentTypes().then((response) => {
            if (response !== undefined) {
                setInstrumentTypes(response);
            }
        })
    }, [])


    async function handleSubmit(e) {
        e.preventDefault();
        const response = await upload(title, description, file, hasResonator, instrumentType);
        if (response) {
            console.log("All good")
            navigate("/")
        } else {
            console.log("Something went wrong")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id={"titleLabel"} htmlFor={"titleInput"}>Title: </label>
            <input type="text" id="titleInput" placeholder="Title" value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <label id={"descriptionLabel"} htmlFor={"descriptionInput"}>Description: </label>
            <input type="text" id="descriptionInput" placeholder="Description" value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
            <label id={"fileUploadLabel"} htmlFor={"fileUploadInput"}></label>
            <input type={"file"} id={"fileUploadInput"} onChange={(e) => setFile(e.target.files[0])}/>
            <label htmlFor={"hasResonatorLabel"}>Has resonator: </label>
            <input type={"checkbox"} id={"hasResonator"} checked={hasResonator}
                   onChange={(e) => setHasResonator(e.target.checked)}/>

            <label htmlFor={"instrumentType"}>Instrument Type: </label>

            <select id="instrumentType" value={instrumentType} required
                    onChange={(e) => setInstrumentType(e.target.value)}>
                <option value="" disabled>Select Instrument Type</option>
                {instrumentTypes.map(item => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                ))}
            </select>

            <button type={"submit"}>Submit</button>
        </form>
    )
}