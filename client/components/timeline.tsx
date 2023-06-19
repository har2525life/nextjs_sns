'use client'

import { useForm } from 'react-hook-form'
import Post from './post'
import apiClient from '@/api/apiClient'
import { useEffect, useState } from 'react'

type PostText = { postText: string }

function Timeline() {
    const { register, handleSubmit, reset } = useForm<PostText>()
    const [latestPosts, setLatestPosts] = useState<Post[]>([])

    const submitPost = async (event: PostText) => {
        const { postText } = event
        try {
            const newPost = await apiClient.post('/posts/post', {
                content: postText
            })
            setLatestPosts((prevPosts) => [newPost.data, ...prevPosts])
            reset()
        } catch (error) {
            alert('ログインしてください')
        }
    }

    useEffect(() => {
        console.log('useEffect')
        async function fetchPosts() {
            try {
                const response = await apiClient.get('/posts/get_latest_posts')
                setLatestPosts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto py-4">
                <div className="bg-white shadow-md rounded p-4 mb-4">
                    <form onSubmit={handleSubmit(submitPost)}>
                        <textarea
                            {...register('postText', { required: true })}
                            placeholder="what's on your mind?"
                            className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus-blue-400"
                        ></textarea>
                        <button className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded">
                            投稿
                        </button>
                    </form>
                </div>
                {latestPosts.map((post: Post) => (
                    <Post key={post.id} post={post} />
                ))}
            </main>
        </div>
    )
}

export default Timeline
