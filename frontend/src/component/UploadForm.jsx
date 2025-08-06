import {useState} from "react";
import {useNavigate} from "react-router-dom";
import InstrumentSelectorDropdown from "./InstrumentSelectorDropdown.jsx";

function prepareUploadData(title, description, files, instrumentType, youtubeLink) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("instrumentType", instrumentType);
    formData.append("youtubeLink", youtubeLink);
    files.forEach(file => formData.append("files", file));
    return formData;
}

function prepareEditData(newTitle, oldTitle, description, newFiles, existingBase64s, instrumentType, youtubeLink) {
    const formData = new FormData();
    formData.append("newTitle", newTitle);
    formData.append("oldTitle", oldTitle);
    formData.append("description", description);
    formData.append("instrumentType", instrumentType);
    formData.append("youtubeLink", youtubeLink);
    newFiles.forEach(file => formData.append("files", file));
    existingBase64s.forEach((base64, index) => formData.append("files", base64ToFile(base64, `existing_${index}`)));
    return formData;
}

function base64ToFile(base64String, filename) {
    const cleanBase64 = base64String.includes(',') ? base64String.split(',')[1] : base64String;
    const byteString = atob(cleanBase64);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }
    return new File([byteArray], filename, { type: 'image/png' });
}


async function smartAuthFetch(url, method, body) {
    const token = localStorage.getItem("token");
    return await fetch(url, {
        method,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body
    });
}

export default function UploadForm({
                                       oldTitle,
                                       oldDescription,
                                       oldFiles,
                                       oldInstrumentType,
                                       oldYoutubeLink,
                                       isEditing = false
                                   }) {

    const navigate = useNavigate()
    const [title, setTitle] = useState(oldTitle ?? "");
    const [description, setDescription] = useState(oldDescription ?? "");
    const [existingImages, setExistingImages] = useState(oldFiles ?? []);
    const [files, setFiles] = useState([]);
    const [instrumentType, setInstrumentType] = useState(oldInstrumentType ?? "");
    const [youtubeLink, setYoutubeLink] = useState(oldYoutubeLink ?? "");


    async function handleSubmit(e) {
        e.preventDefault();
        let formData;
        if (isEditing) {
            formData = prepareEditData(title, oldTitle, description, files, existingImages, instrumentType, getYoutubeLink(youtubeLink));
        } else {
            formData = prepareUploadData(title, description, files, instrumentType, getYoutubeLink(youtubeLink));
        }
        const response = await smartAuthFetch(`/api/instrument/${isEditing ? "edit" : "upload"}`, isEditing ? "PATCH" : "POST", formData);
        if (response.status === 200) {
            console.log("All good")
            navigate("/admin")
        } else {
            console.log("Something went wrong")
        }
    }

    function handleInstrumentType(newType) {
        setInstrumentType(newType);
    }

    function getYoutubeLink(link) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = link.match(regex);
        if (match) {
            return match[1];
        }
    }

    function removeExistingImage(indexToRemove) {
        setExistingImages(images => images.filter((_, i) => i !== indexToRemove));
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

            {isEditing &&
                <div>
                    {existingImages.map((base64, index) => (
                        <div key={index}>
                            <img src={`data:image/png;base64,${base64}`} alt="Instrument"/>
                            <button type="button" onClick={() => removeExistingImage(index)}>Remove</button>
                        </div>
                    ))}
                </div>
            }

            <input
                type="file"
                id="fileUploadInput"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
            />

            <label htmlFor={"instrumentType"}>Instrument Type: </label>

            <InstrumentSelectorDropdown instrumentType={instrumentType} handleInstrumentType={handleInstrumentType}/>

            <label htmlFor={"youtubeLink"}>Youtube link: </label>
            <input type={"text"} id={"youtubeLink"} value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)}/>

            <button type={"submit"}>Submit</button>
        </form>
    )
}