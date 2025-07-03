import {useState} from "react";

export default function UploadForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [hasResonator, setHasResonator] = useState(false);
    const [instrumentType, setInstrumentType] = useState("");

    //fetch this from backend
    const instrumentTypes = ["Guitar", "Bass", "Ukulele"]


    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", file);
        formData.append("hasResonator", hasResonator)
        formData.append("instrumentType", instrumentType);

        const response = await fetch("/api/image/upload", {
            method: "POST",
            body: formData,
        })
        if (response.status === 200) {
            console.log("All good")
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
            <input type={"radio"} id={"hasResonator"} onChange={(e) => setHasResonator(e.target.checked)}/>
            <label htmlFor={"instrumentType"}>Instrument Type: </label>

            <select id={"instrumentType"} onChange={(e) => setInstrumentType(e.target.value)}>
                <option value={""}>Select Instrument Type</option>
                {instrumentTypes.map(item => <option value={item}>{item}</option>)}
            </select>

            <button type={"submit"}>Submit</button>
        </form>
    )
}