import {useEffect, useState} from 'react'
import '../mainPage.css'
import PostComponent from "../component/PostComponent.jsx";
import SearchForm from "../component/SearchForm.jsx";
import {useNavigate} from "react-router-dom";

async function getAllPosts() {
    try {
        const response = await fetch('/api/instrument/all')
        const data = await response.json()
        if (response.status === 200) {
            return data
        }
    } catch (error) {
        console.error(error)
    }
}

export default function MainPage({isAdminPage = false}) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllPosts().then((res) => {
            if (res !== undefined) {
                setPosts(res)
                setLoading(false)
            }
        })
    }, [])

    function handleEdit(e, post){
        e.preventDefault()
        navigate("/edit", {
            state: {
                title: post.title,
                description: post.description,
                files: post.images,
                hasResonator: post.hasResonator,
                instrumentType: post.instrumentType,
                youtubeLink: post.youtubeLink
            }
        })

    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <SearchForm/>
            {posts?.map((post) => {
                return (
                    <>
                        <PostComponent post={post}/>
                        {isAdminPage && <button type={"button"} onClick={(e) => handleEdit(e, post)}>Edit</button>}
                    </>
                )
            })}
        </>
    )
}