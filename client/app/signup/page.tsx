'use client'
import apiClient from '@/api/apiClient'
import Head from 'next/head'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

function SignupPage() {
    console.log('SignupPage')
    const { register, reset, handleSubmit } = useForm<Signup>()
    const router = useRouter()
    const onSubmit = async (event: Signup) => {
        // console.log('onSubmit')
        const { username, email, password } = event

        try {
            await apiClient.post("/auth/register", {
                username,
                email,
                password
            })
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{ height: '88vh' }} className="flex flex-col justify-center sm:px-6 lg:px-8">
            <Head>
                <title>新規作成</title>
            </Head>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">アカウントを作成</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                お名前
                            </label>
                            <input
                                {...register('username', { required: true })}
                                id="name"
                                type="text"
                                autoComplete="name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                メールアドレス
                            </label>
                            <input
                                {...register('email', { required: true })}
                                id="email"
                                type="email"
                                autoComplete="email"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                パスワード
                            </label>
                            <input
                                {...register('password', { required: true })}
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                新規登録
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
