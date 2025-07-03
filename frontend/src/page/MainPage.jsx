import {useEffect, useState} from 'react'
import '../mainPage.css'
import PostComponent from "../component/PostComponent.jsx";
import SearchForm from "../component/SearchForm.jsx";

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

export default function MainPage() {
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

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <SearchForm/>
            {posts?.map((post) => <PostComponent post={post}/>)}
        </>
    )
}