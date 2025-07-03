import {useEffect, useState} from "react";
import PostComponent from "../component/PostComponent.jsx";
import {useParams} from "react-router-dom";

async function getInstruments(instrumentType) {
    const response = await fetch(`/api/instrument/type/${instrumentType}`)
    if (response.status === 200) {
        return await response.json();
    } else {
        console.log("Uhh Ohh... Something went wrong...");
    }
}

export default function InstrumentsListPage() {
    const {instrumentType} = useParams();

    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInstruments(instrumentType).then(response => {
            if (response !== undefined) {
                setInstruments(response);
                setLoading(false);
            }
        });
    }, [instrumentType]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {instruments?.map((instrument) => (<PostComponent post={instrument} />))}
        </div>
    )
}