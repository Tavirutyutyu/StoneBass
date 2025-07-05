import {useState} from "react";
import {useNavigate} from "react-router-dom";
import InstrumentSelectorDropdown from "./InstrumentSelectorDropdown.jsx";

function prepareRequestData(title, description, files, hasResonator, instrumentType, youtubeLink) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hasResonator", hasResonator);
    formData.append("instrumentType", instrumentType);
    formData.append("youtubeLink", youtubeLink);
    for (const file of files) {
        formData.append("files", file);
    }
    return formData;
}
async function smartFetch(url, method, body){
    return await fetch(url, {
        method,
        body
    });
}


export default function UploadForm({
                                       oldTitle,
                                       oldDescription,
                                       oldFiles,
                                       oldHasResonator,
                                       oldInstrumentType,
                                       oldYoutubeLink,
                                       isEditing = false
                                   }) {

    const navigate = useNavigate()
    const [title, setTitle] = useState(oldTitle ?? "");
    const [description, setDescription] = useState(oldDescription ?? "");
    const [files, setFiles] = useState(oldFiles ?? []);
    const [hasResonator, setHasResonator] = useState(oldHasResonator ?? false);
    const [instrumentType, setInstrumentType] = useState(oldInstrumentType ?? "");
    const [youtubeLink, setYoutubeLink] = useState(oldYoutubeLink ?? "");


    async function handleSubmit(e) {
        e.preventDefault();
        const formData = prepareRequestData(title, description, files, hasResonator, instrumentType, youtubeLink);
        const response = await smartFetch("/api/instrument/upload", isEditing? "PATCH" : "POST", formData);
        if (response.status === 200) {
            console.log("All good")
            navigate("/")
        } else {
            console.log("Something went wrong")
        }
    }

    function handleInstrumentType(newType) {
        setInstrumentType(newType);
    }

    function getYoutubeLink(e) {
        const link = e.target.value;
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = link.match(regex);
        if (match) {
            setYoutubeLink(match[1]);
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

            <label htmlFor={"youtubeLink"}>Youtube link: </label>
            <input type={"text"} id={"youtubeLink"} onChange={getYoutubeLink}/>

            <button type={"submit"}>Submit</button>
        </form>
    )
}