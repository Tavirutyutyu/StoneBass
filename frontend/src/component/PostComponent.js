export default function PostComponent ({postImage, postDescription}) {
    return (
        <div id='post'>
            <img id={"postImage"} src={postImage} alt={"No Image Found"}></img>
            <p id={"postDescription"}>{postDescription}</p>
        </div>
    )
}