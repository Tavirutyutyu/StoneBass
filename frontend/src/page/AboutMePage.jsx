import aboutMe from "/src/assets/aboutMe.json"
import "/src/style/aboutMePage.css"

export default function AboutMePage() {

    const {
        description,
        profilePicture,
        playingOn1,
        playingOn1Description,
        playingOn2,
        playingOn2Description,
        playingOn3,
        playingOn3Description,
        playingOn4,
        playingOn4Description,
    } = aboutMe;

    return (
        <div className="aboutMePage">
            <div className="aboutMe">
                <img src={profilePicture} alt="profile picture"/>
                <div className="aboutMeText">
                    <h1>LOREM IPSUM IS SIMPLY</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className="imagesAboutMe">
                <div>
                    <p>{playingOn1Description}</p>
                    <img src={playingOn1} alt="Playing On Stonebass"/>
                </div>
                <div>
                    <p>{playingOn2Description}</p>
                    <img src={playingOn2} alt="Playing On Stonebass"/>
                </div>
                <div>
                    <p>{playingOn3Description}</p>
                    <img src={playingOn3} alt="Playing On Stonebass"/>
                </div>
                <div>
                    <p>{playingOn4Description}</p>
                    <img src={playingOn4} alt="Playing On Stonebass"/>
                </div>
            </div>
        </div>
    )
}