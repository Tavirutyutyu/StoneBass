import {useEffect, useState} from "react";

async function getInstrumentTypes() {
    const response = await fetch("/api/instrumentType/all");
    if (response.status === 200) {
        return await response.json();
    } else {
        console.log("Error fetching instrument types...");
    }
}

export default function Filter({onFilterChange}) {
    const [isOpen, setIsOpen] = useState(false);
    const [instrumentTypes, setInstrumentTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        getInstrumentTypes().then((response) => {
            setInstrumentTypes(response);
            setIsLoading(false);
        });
    }, []);

    function toggleFilter(filterItem) {
        let updatedFilters;
        if (!selectedFilters.includes(filterItem)) {
            updatedFilters = [...selectedFilters, filterItem];
        } else {
            updatedFilters = selectedFilters.filter(item => item !== filterItem);
        }
        setSelectedFilters(updatedFilters);
        onFilterChange(updatedFilters);
    }

    if (isLoading) return <div>Loading filters...</div>;

    return (
        <div>
            <h1 onClick={() => setIsOpen(prev => !prev)}>Filter</h1>
            {selectedFilters.length > 0 && selectedFilters.map((filterItem) => <p>{filterItem}</p>)}
            {isOpen && (
                <ul>
                    {instrumentTypes.map((type, index) => (
                        <li key={index} onClick={() => toggleFilter(type.name)}>
                            {type.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
