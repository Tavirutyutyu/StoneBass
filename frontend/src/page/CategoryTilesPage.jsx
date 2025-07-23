import {useEffect, useState} from "react";
import CategoryTile from "../component/CategoryTile.jsx";
import "/src/style/categoryTilePage.css"

async function getCategories(hasResonator) {
    const response = await fetch(`/api/instrumentType/${hasResonator ? "resonator" : "traditional"}`);
    if (response.status === 200) {
        return await response.json();
    } else {
        console.error(`Error fetching category: ${hasResonator ? "resonator" : "traditional"}`);
    }
}

export default function CategoryTilesPage({hasResonator}) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories(hasResonator).then(response => {
            setCategories(response);
            setLoading(false);
        })
    })

    if (loading) {
        return <p>Loading...</p>;
    }

    console.log(categories);

    return (
        <div className="category-tiles">
            {categories?.map((category) => (
                <CategoryTile image={"src/assets/images/nyito_rezonator.jpg"} title={category.name}
                              destination={`/instruments?instrumentType=${category.name}`}/>
            ))}
        </div>
    )
}