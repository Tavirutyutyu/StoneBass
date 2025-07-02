import {useEffect, useState} from 'react'
import './App.css'
import PostComponent from "./component/PostComponent.js";

async function getAllPosts() {
    try {
        const response = await fetch('/api/image/all')
        const data = await response.json()
        if (response.status === 200) {
            return data
        }
    } catch (error) {
        console.error(error)
    }
}

export default function App() {
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
            {posts?.map((post) => <PostComponent post={post}/>)}
        </>
    )
}