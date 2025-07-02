import {useState} from "react";

export default function UploadForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);

        await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <label id={"titleLabel"} htmlFor={"titleInput"}>Title</label>
            <input type="text" id="titleInput" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label id={"descriptionLabel"} htmlFor={"descriptionInput"}>Description</label>
            <input type="text" id="descriptionInput" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <label id={"fileUploadLabel"} htmlFor={"fileUploadInput"}></label>
            <input type={"file"} id={"fileUploadInput"} onChange={(e) => setImage(e.target.files[0])}/>
            <button type={"submit"}>Submit</button>
        </form>
    )
}