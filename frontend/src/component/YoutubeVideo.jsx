export default function YouTubeVideo({videoId}) {
    return (
        <div className="youtube-video">
            <iframe
                className="w-full h-full rounded-2xl shadow-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}