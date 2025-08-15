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

async function updateAboutMe(newAboutMe) {
    const response = await fetch("/api/aboutMe/update", {
        method: "PUT",
        body: JSON.stringify(newAboutMe)
    })
    if (response.status === 200) {
        console.log("AboutMe updated successfully")
        return response.json()
    } else {
        console.error("Error updating AboutMe json")
    }
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
        const newAboutMeJson = {
            title,
            description,
            profilePicture: profilePic,
            playingOn1Description,
            playingOn1,
            playingOn2Description,
            playingOn2,
            playingOn3Description,
            playingOn3,
            playingOn4Description,
            playingOn4,
        }
        updateAboutMe(newAboutMeJson).then(response => {
            if (response){
                console.log("Updated AboutMe")
            }
        })
    }

    if (isLoading) return <p>Loading...</p>

    return (
        <div className={"wrapper"}>
            <div className="editAboutMePage">
                <div className="editAboutMe">
                    <img src={profilePic} alt="profile"/>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => setProfilePic(reader.result);
                                reader.readAsDataURL(file);
                            }
                        }}
                    />

                    <div className="editAboutMeText">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="editImagesAboutMe">
                    {[
                        [playingOn1Description, setPlayingOn1Description, playingOn1, setPlayingOn1],
                        [playingOn2Description, setPlayingOn2Description, playingOn2, setPlayingOn2],
                        [playingOn3Description, setPlayingOn3Description, playingOn3, setPlayingOn3],
                        [playingOn4Description, setPlayingOn4Description, playingOn4, setPlayingOn4],
                    ].map(([desc, setDesc, img, setImg], idx) => (
                        <div key={idx}>
                            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                            <img src={img} alt={`playingOn${idx + 1}`}/>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => setImg(reader.result);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button className={"submitButton"} type={"button"} onClick={handleSubmit}>Submit</button>
        </div>
    )
}