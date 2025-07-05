import {useState} from "react";
import {useNavigate} from "react-router-dom";
import InstrumentSelectorDropdown from "./InstrumentSelectorDropdown.jsx";


async function upload(title, description, files, hasResonator, instrumentType) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hasResonator", hasResonator);
    formData.append("instrumentType", instrumentType);
    for (const file of files) {
        formData.append("files", file);
    }
    const response = await fetch("/api/instrument/upload", {
        method: "POST",
        body: formData,
    })
    return response.status === 200
}

export default function UploadForm() {
    const navigate = useNavigate()


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [hasResonator, setHasResonator] = useState(false);
    const [instrumentType, setInstrumentType] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();
        const response = await upload(title, description, files, hasResonator, instrumentType);
        if (response) {
            console.log("All good")
            navigate("/")
        } else {
            console.log("Something went wrong")
        }
    }

    function handleInstrumentType(newType) {
        setInstrumentType(newType);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id={"titleLabel"} htmlFor={"titleInput"}>Title: </label>
            <input type="text" id="titleInput" placeholder="Title" value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <label id={"descriptionLabel"} htmlFor={"descriptionInput"}>Description: </label>
            <input type="text" id="descriptionInput" placeholder="Description" value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
            <label htmlFor="fileUploadInput">Upload Images: </label>
            <input
                type="file"
                id="fileUploadInput"
                multiple
                onChange={(e) => setFiles(e.target.files)}
            />
            <label htmlFor={"hasResonatorLabel"}>Has resonator: </label>
            <input type={"checkbox"} id={"hasResonator"} checked={hasResonator}
                   onChange={(e) => setHasResonator(e.target.checked)}/>

            <label htmlFor={"instrumentType"}>Instrument Type: </label>

            <InstrumentSelectorDropdown instrumentType={instrumentType} handleInstrumentType={handleInstrumentType}/>

            <button type={"submit"}>Submit</button>
        </form>
    )
}