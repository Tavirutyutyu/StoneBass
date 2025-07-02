export default function PostComponent ({post}) {
    const postTitle = post.title
    const postDescription = post.description
    const postImage = post.imageBase64
    const imgSrc = `data:image/png;base64,${postImage}`;

    return (
        <div id='post' key={postTitle}>
            <h1 id={"title"}>{postTitle}</h1>
            <img id={"postImage"} src={imgSrc} alt={"No Image Found"}></img>
            <p id={"postDescription"}>{postDescription}</p>
        </div>
    )
}