import {useEffect, useState} from "react";
import "/src/style/editAboutMeForm.css"

async function getAboutMeJson() {
    const response = await fetch("/api/aboutMe/get")
    if (response.status === 200) {
        return await response.json()
    }
    console.error("Error getting AboutMe json")
    return null
}

export default function EditAboutMeForm() {
    const imagePreString = "data:image/png;base64,"

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [playingOn1Description, setPlayingOn1Description] = useState("")
    const [playingOn1, setPlayingOn1] = useState(null)
    const [playingOn2Description, setPlayingOn2Description] = useState("")
    const [playingOn2, setPlayingOn2] = useState(null)
    const [playingOn3Description, setPlayingOn3Description] = useState("")
    const [playingOn3, setPlayingOn3] = useState(null)
    const [playingOn4Description, setPlayingOn4Description] = useState("")
    const [playingOn4, setPlayingOn4] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAboutMeJson().then(response => {
            setTitle(response.title)
            setDescription(response.description)
            setProfilePic(imagePreString + response.profilePictureBase64)
            setPlayingOn1Description(response.playingOn1Description)
            setPlayingOn1(imagePreString + response.playingOn1Base64)
            setPlayingOn2Description(response.playingOn2Description)
            setPlayingOn2(imagePreString + response.playingOn2Base64)
            setPlayingOn3Description(response.playingOn3Description)
            setPlayingOn3(imagePreString + response.playingOn3Base64)
            setPlayingOn4Description(response.playingOn4Description)
            setPlayingOn4(imagePreString + response.playingOn4Base64)

            setIsLoading(false)
        })
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

    }

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="editAboutMePage">
            <div className="editAboutMe">
                <img src={profilePic} alt="profile" />
                <button type="button">Edit</button>
                <div className="editAboutMeText">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
            <div className="editImagesAboutMe">
                {[
                    [playingOn1Description, setPlayingOn1Description, playingOn1],
                    [playingOn2Description, setPlayingOn2Description, playingOn2],
                    [playingOn3Description, setPlayingOn3Description, playingOn3],
                    [playingOn4Description, setPlayingOn4Description, playingOn4]
                ].map(([desc, setDesc, img], idx) => (
                    <div key={idx}>
                        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        <img src={img} alt={`playingOn${idx+1}`} />
                        <button type="button">Edit</button>
                    </div>
                ))}
            </div>
            <button type={"button"} onClick={handleSubmit}>Submit</button>
        </div>
    )
}