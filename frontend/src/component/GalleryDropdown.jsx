import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


async function getInstrumentTypes() {
    const response = await fetch("/api/instrumentType/all")
    if (response.status === 200) {
        return await response.json()
    } else {
        console.log("Error fetching instrument types...")
    }
}


export default function GalleryDropdown() {
    const [open, setOpen] = useState(false);
    const [instrumentTypes, setInstrumentTypes] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getInstrumentTypes().then((response) => {
            if (response !== undefined) {
                setInstrumentTypes(response);
            }
        })
    }, [])

    return (
        <div className="relative inline-flex">
            <button
                onClick={() => navigate('/gallery')}
                className="px-4 py-2 bg-gray-800 text-white rounded-l-md hover:bg-gray-700"
            >
                Gallery
            </button>
            <button
                onClick={() => setOpen(prev => !prev)}
                className="px-2 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700"
            >
                ▼
            </button>

            {open && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white border shadow-md z-10">
                    {instrumentTypes?.map(cat => (
                        <div
                            key={cat.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => navigate(`/instruments?instrumentType=${cat.name}`)}
                        >
                            {cat.name[0].toUpperCase() + cat.name.slice(1)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
