import {useEffect, useState} from "react";
import PostComponent from "../component/PostComponent.jsx";
import {useNavigate} from "react-router-dom";
import "/src/style/galleryPage.css"
import Filter from "../component/Filter.jsx";


async function getAllPosts() {
    const response = await fetch("/api/instrument/all")
    if (response.status === 200) {
        return response.json()
    } else {
        console.error("Error fetching posts");
    }
}

export default function GalleryPage({isAdminPage = false}) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllPosts().then((res) => {
            setPosts(res)
            setLoading(false)
        })
    }, []);

    function handleEdit(e, post) {
        e.preventDefault()
        navigate("/edit", {
            state: {
                title: post.title,
                description: post.description,
                files: post.images,
                hasResonator: post.hasResonator,
                instrumentType: post.instrumentType,
                youtubeLink: post.youtubeLink,
                isEditing: true
            }
        })
    }

    function onClickUpload(e) {
        e.preventDefault()
        navigate("/upload")
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="galleryPage">
            <Filter className={"search-form"}/>
            {isAdminPage && <button onClick={onClickUpload}>Upload</button>}
            <div className={"item-list"}>
                {posts?.map((post, index) => (
                    <div className={"item"}>
                        <PostComponent  post={post} isListItem={true} key={index}/>
                        {isAdminPage && <button className={"edit-button"} type={"button"} onClick={(e) => handleEdit(e, post)}>Edit</button>}
                    </div>
                ))}
            </div>
        </div>
    )
}