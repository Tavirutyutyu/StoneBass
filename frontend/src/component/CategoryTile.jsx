import {useNavigate} from "react-router-dom";

export default function CategoryTile({image, title, destination}) {
    const navigate = useNavigate();

    function handleClick(){
        navigate(destination);
    }

    return (
        <div onClick={handleClick}>
            <img className="image" src={image} alt="Image" />
            <h1 className="title">{title}</h1>
        </div>
    )
}