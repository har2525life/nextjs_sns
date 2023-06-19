type Login = {
    email: string
    password: string
}

type Signup = {
    username: string
    email: string
    password: string
}

type User = {
    id: string
    username: string
    email: string
    password: string
    posts: Post[]
}

type Post = {
    id: number
    content: string
    createdAt: string
    authId: string
    auth: User
}
