import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import PostComponent from "../component/PostComponent.jsx";
import Filter from "../component/Filter.jsx";
import "/src/style/galleryPage.css";

async function fetchInstruments(filters = {}) {
    const query = new URLSearchParams();
    if (filters.instrumentType?.length) {
        filters.instrumentType.forEach(type => query.append("instrumentType", type));
    }
    const response = await fetch(`/api/instrument/filter?${query.toString()}`);
    if (response.status === 200) {
        return await response.json();
    } else {
        console.error("Error fetching instruments");
    }
}

export default function GalleryPage({isAdminPage = false}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const instrumentType = searchParams.getAll("instrumentType");

        setSelectedFilters(instrumentType);

        const filters = {};
        if (instrumentType.length > 0) {
            filters.instrumentType = instrumentType;
        }

        fetchInstruments(filters).then((res) => {
            if (res !== undefined) {
                setPosts(res);
                setLoading(false);
            }
        });
    }, [location.search]);

    function onFilterChange(filters) {
        setSelectedFilters(filters);

        const query = new URLSearchParams();
        if (filters.length > 0) {
            filters.forEach(type => query.append("instrumentType", type));
        }
        navigate({search: query.toString()});
    }

    function handleEdit(e, post) {
        e.preventDefault();
        navigate("/edit", {
            state: {
                title: post.title,
                description: post.description,
                files: post.images,
                instrumentType: post.instrumentType,
                youtubeLink: post.youtubeLink,
                isEditing: true
            }
        });
    }

    function handleUpload(e) {
        e.preventDefault();
        navigate("/upload");
    }

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Filter onFilterChange={onFilterChange} selectedFilter={selectedFilters}/>
            <div className="galleryPage">
                {isAdminPage && <button onClick={handleUpload}>Upload Instrument</button>}
                <div className="item-list">
                    {posts.map((post, index) => (
                        <div className="item" key={index}>
                            <PostComponent post={post} isListItem={true}/>
                            {isAdminPage && (
                                <button
                                    className="edit-button"
                                    type="button"
                                    onClick={(e) => handleEdit(e, post)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
