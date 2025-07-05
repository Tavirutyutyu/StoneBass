import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function PostComponent({post, showControls = false}) {
    const imageSrcString = "data:image/png;base64,";
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])
    const [currentImage, setCurrentImage] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        setId(post.id)
        setTitle(post.title)
        setDescription(post.description)
        setImages(post.images)
        setCurrentImage(imageSrcString + post.images[currentImageIndex])
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
        if (!showControls) {
            navigate(`/instrument/${id}`)
        }
    }

    return (
        <div id='post' key={title} onClick={handleClick}>
            <h1 id={"title"}>{title}</h1>
            <img id={"postImage"} src={currentImage} alt={"No Image Found"}></img>
            <p id={"postDescription"}>{description}</p>
            {showControls && (
                <div id='controls'>
                    <button onClick={previousImage}>Previous</button>
                    <button onClick={nextImage}>Next</button>
                </div>
            )}
        </div>
    )
}