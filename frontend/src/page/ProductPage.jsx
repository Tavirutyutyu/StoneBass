import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PostComponent from "../component/PostComponent.jsx";

async function fetchInstrument(id){
    const response = await fetch(`/api/instrument/id/${id}`)
    if (response.status === 200) {
        return await response.json()
    } else {
        console.log("Uhh Ohh... Something went wrong...")
    }
}

export default function ProductPage() {
    const {id} = useParams();
    const [instrument, setInstrument] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(() => {
        fetchInstrument(id).then(response => {
            if (response !== null) {
                setInstrument(response)
                setLoading(false)
            } else {
                setError(true)
                setLoading(false)
            }
        })
    }, [id])

    if (loading) return (<p>Loading...</p>)
    if (error) return (<p>Error</p>)

    return (
        <div>
            <PostComponent post={instrument} isListItem={true}/>
        </div>
    )
}