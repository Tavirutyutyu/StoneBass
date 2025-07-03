import {useEffect, useState} from "react";
import PostComponent from "../component/PostComponent.jsx";
import {useSearchParams} from "react-router-dom";

async function fetchInstruments(filters) {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/instrument/filter?${query}`)
    if (response.status === 200) {
        return await response.json();
    } else {
        console.log("Error fetching instruments");
    }
}

export default function InstrumentsListPage() {
    const [searchParams] = useSearchParams();

    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const instrumentType = searchParams.get("instrumentType");
        const hasResonator = searchParams.get("hasResonator");
        const filters = {};

        console.log("FULL URL:", window.location.href);
        console.log("instrumentType", instrumentType);
        console.log("hasResonator", hasResonator);

        if (instrumentType) filters.instrumentType = instrumentType;
        if (hasResonator !== null) filters.hasResonator = hasResonator;
        fetchInstruments(filters).then((response) => {
            if (response !== undefined) {
                setInstruments(response);
                setLoading(false);
            }
        });
    }, [searchParams]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {instruments?.map((instrument) => (<PostComponent post={instrument}/>))}
        </div>
    )
}