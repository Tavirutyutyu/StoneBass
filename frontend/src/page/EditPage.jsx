import UploadForm from "../component/UploadForm.jsx";
import {useLocation} from "react-router-dom";

export default function EditPage() {
    const location = useLocation();
    const {
        title = "",
        description = "",
        files = [],
        hasResonator = false,
        instrumentType = "",
        youtubeLink = "",
    } = location.state || {};

    return (
        <UploadForm
            oldTitle={title}
            oldDescription={description}
            oldInstrumentType={instrumentType}
            oldFiles={files}
            oldHasResonator={hasResonator}
            oldYoutubeLink={youtubeLink}
        />
    )
}