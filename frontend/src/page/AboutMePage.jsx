import "/src/style/aboutMePage.css"
import { useEffect, useState } from "react"

async function getAboutMeJson() {
    const response = await fetch("/api/aboutMe/get")
    if (response.status === 200) {
        return await response.json()
    }
    console.error("Error getting AboutMe json")
    return null
}


function getBase64ImageUrl(base64String) {
    console.log(base64String)
    if (!base64String) return ""
    return "data:image/jpeg;base64," + base64String.trim()
}

export default function AboutMePage() {
    const [aboutMeData, setAboutMeData] = useState(null)

    useEffect(() => {
        getAboutMeJson().then(data => {
            console.log(data)
            if (data) setAboutMeData(data)
        })
    }, [])

    if (!aboutMeData) return <div>Loading...</div>

    return (
        <div className="aboutMePage">
            <div className="aboutMe">
                <img src={getBase64ImageUrl(aboutMeData.profilePictureBase64)} alt="profile picture" />
                <div className="aboutMeText">
                    <h1>{aboutMeData.title}</h1>
                    <p>{aboutMeData.description}</p>
                </div>
            </div>
            <div className="imagesAboutMe">
                {[1, 2, 3, 4].map(i => (
                    <div key={i}>
                        <p>{aboutMeData[`playingOn${i}Description`]}</p>
                        <img src={getBase64ImageUrl(aboutMeData[`playingOn${i}Base64`])} alt={`Playing On ${i}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}
