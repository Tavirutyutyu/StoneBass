import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import YouTubeVideo from "./YoutubeVideo.jsx";

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

    function handleClick(){
        if (isListItem) {
            navigate(`/instrument/${id}`)
        }
    }

    return (
        <div id='post' key={title} onClick={handleClick}>
            <h1 id={"title"}>{title}</h1>
            <img id={"postImage"} src={currentImage} alt={"No Image Found"}></img>
            {!isListItem && (
                <div id='controls'>
                    <button onClick={previousImage}>Previous</button>
                    <button onClick={nextImage}>Next</button>
                    <p id={"postDescription"}>{description}</p>
                    <YouTubeVideo videoId={youtubeLink}/>
                </div>
            )}
        </div>
    )
}