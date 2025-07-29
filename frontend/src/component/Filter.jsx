import {useEffect, useState} from "react";
import "/src/style/filter.css"

async function getInstrumentTypes() {
    const response = await fetch("/api/instrumentType/all");
    if (response.status === 200) {
        return await response.json();
    } else {
        console.log("Error fetching instrument types...");
    }
}

export default function Filter({onFilterChange, selectedFilter}) {
    const [isOpen, setIsOpen] = useState(false);
    const [instrumentTypes, setInstrumentTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState(selectedFilter ?? []);

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
        <div className={"filter-container"}>
            <div className={"filter-dropdown"}>
                <h1 className={"filter-title"} onClick={() => setIsOpen(prev => !prev)}>Filter</h1>
                {selectedFilters.length > 0 && selectedFilters.map((filterItem) => <p className={"chosen-filter"}>{filterItem}</p>)}
            </div>
            {isOpen && (
                <ul className={"filter-list"}>
                    {instrumentTypes.map((type, index) => (
                        <li className={"filter-list-item"} key={index} onClick={() => toggleFilter(type.name)}>
                            {type.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
