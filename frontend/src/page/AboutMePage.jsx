import aboutMe from "/src/assets/aboutMe.json"

export default function AboutMePage(){

    const {description, profilePicture} = aboutMe;

    return (
        <div>
            <img src={profilePicture} alt="profile picture"/>
            <p>{description}</p>
        </div>
    )
}