import UploadForm from "../component/UploadForm.jsx";
import {useLocation} from "react-router-dom";

export default function EditPage() {
    const location = useLocation();
    const {
        title = "",
        description = "",
        files = [],
        instrumentType = "",
        youtubeLink = "",
        isEditing = true
    } = location.state || {};

    return (
        <UploadForm
            oldTitle={title}
            oldDescription={description}
            oldInstrumentType={instrumentType}
            oldFiles={files}
            oldYoutubeLink={youtubeLink}
            isEditing={isEditing}
        />
    )
}