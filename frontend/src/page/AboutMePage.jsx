import aboutMe from "/src/assets/aboutMe.json"

export default function AboutMePage() {

    const {description, profilePicture} = aboutMe;

    return (
        <div className="aboutMePage">
            <div className="aboutMe">
                <img src={profilePicture} alt="profile picture"/>
                <p>{description}</p>
            </div>
            <div className="imagesAboutMe">
                <img src={profilePicture} alt="profile picture"/>
                <p>Image Description</p>
                <img src={profilePicture} alt="profile picture"/>
                <p>Image Description</p>
                <img src={profilePicture} alt="profile picture"/>
                <p>Image Description</p>
                <img src={profilePicture} alt="profile picture"/>
                <p>Image Description</p>
            </div>
        </div>
    )
}