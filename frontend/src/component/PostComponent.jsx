import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import YouTubeVideo from "./YoutubeVideo.jsx";
import "/src/style/postComponent.css"

export default function PostComponent({post, isListItem = false}) {
    const imageSrcString = "data:image/png;base64,";
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])
    const [currentImage, setCurrentImage] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [youtubeLink, setYoutubeLink] = useState("")

    useEffect(() => {
        setId(post.id)
        setTitle(post.title)
        setDescription(post.description)
        setImages(post.images)
        setCurrentImage(imageSrcString + post.images[currentImageIndex])
        setYoutubeLink(post.youtubeLink)
    }, [post, currentImageIndex, images])


    function previousImage() {
        const previousImageIndex = currentImageIndex - 1 > -1 ? currentImageIndex - 1 : images.length - 1;
        console.log(`Current Image Index: ${currentImageIndex}\tPrevious: ${previousImageIndex}`)
        setCurrentImageIndex(previousImageIndex);
    }

    function nextImage() {
        const nextImageIndex = currentImageIndex + 1 < images.length ? currentImageIndex + 1 : 0;
        console.log(`Current Image Index: ${currentImageIndex}\tNext: ${nextImageIndex}`)
        setCurrentImageIndex(nextImageIndex);
    }

    function handleClick() {
        if (isListItem) {
            navigate(`/instrument/${id}`)
        }
    }

    return (
        <div id='post' className={isListItem ? "post--list" : "post--full"} key={title} onClick={handleClick}>
            {!isListItem && <h1 id={"title"}>{title}</h1>}

            {!isListItem ? (
                <div className="main-content">
                    <img id={"postImage"} src={currentImage} alt={"No Image Found"}/>
                    <p id={"postDescription"}>{description}</p>
                </div>
            ) : (
                <img id={"postImage"} src={currentImage} alt={"No Image Found"}/>
            )}

            {!isListItem && (
                <>
                    <div id="image-carousel">
                        <button onClick={previousImage} className="carousel-button">←</button>
                        <div className="thumbnail-row">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={imageSrcString + img}
                                    className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                    alt={"images"}
                                />
                            ))}
                        </div>
                        <button onClick={nextImage} className="carousel-button">→</button>
                    </div>

                    <div id='video'>
                        <YouTubeVideo videoId={youtubeLink}/>
                    </div>
                </>
            )}
        </div>
    )
}