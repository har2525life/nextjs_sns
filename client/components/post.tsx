type Props = {
    post: Post
}

function Post({post}: Props) {
    return (
        <div className="bg-white shadow-md rounded p-4 mb-4">
            <div className="md-4">
                <div className="flex items-center mb-2">
                    <img src="" alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
                    <div>
                        <h2 className="font-semibold text-md">{post.auth?.username}</h2>
                        <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <p className="text-gray-700">{post.content}</p>
            </div>
        </div>
    )
}

export default Post
