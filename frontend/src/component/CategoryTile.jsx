import {useNavigate} from "react-router-dom";
import "/src/style/categoryTile.css"

export default function CategoryTile({image, title, destination}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(destination);
    }

    return (
        <div className={"tile"} onClick={handleClick}>
            <div className="image-wrapper">
                <img className="image" src={image} alt="Image" />
                <div className="title">{title}</div>
            </div>
        </div>
    )
}