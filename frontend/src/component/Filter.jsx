import {useEffect, useState} from "react";
import "/src/style/filter.css"

async function getResonatorInstruments() {
    const response = await fetch("/api/instrumentType/resonator");
    if (response.status === 200) {
        return await response.json();
    } else {
        console.log("Error fetching instrument types...");
    }
}

async function getTraditionalInstruments() {
    const response = await fetch("/api/instrumentType/traditional");
    if (response.status === 200) {
        return await response.json();
    } else {
        console.log("Error fetching instrument types...");
    }
}

export default function Filter({onFilterChange, selectedFilter}) {
    const [isOpen, setIsOpen] = useState(false);
    const [resonatorTypes, setResonatorTypes] = useState([]);
    const [traditionalTypes, setTraditionalTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState(selectedFilter ?? []);

    useEffect(() => {
        getResonatorInstruments().then((response) => {
            setResonatorTypes(response);
        })
        getTraditionalInstruments().then((response) => {
            setTraditionalTypes(response);
            setIsLoading(false);
        })
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
                {selectedFilters.length > 0 && selectedFilters.map((filterItem) => (
                    <p className={"chosen-filter"} onClick={() => toggleFilter(filterItem)}>
                        {filterItem} X
                    </p>
                ))}
            </div>
            {isOpen && (
                <ul className={"filter-list"}>
                    <div>
                        <label className="filter-category">Traditional</label>
                        {traditionalTypes?.map((item, index) => (
                            <li className={"filter-list-item"} key={index} onClick={() => toggleFilter(item.name)}>
                                {item.name}
                            </li>
                        ))}
                        <label className="filter-category">Resonator</label>
                        {resonatorTypes?.map((item, index) => (
                            <li className={"filter-list-item"} key={index} onClick={() => toggleFilter(item.name)}>
                                {item.name}
                            </li>
                        ))}
                    </div>
                </ul>
            )}
        </div>
    );
}
