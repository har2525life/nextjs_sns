import express, { Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const app: Application = express()
const prisma = new PrismaClient()

// localのport番号設定
const PORT = 5000

// API作成
// app.get("/", (req: Request, res: Response) => {
//     res.send("<h1>Hello</h1>")
// })

// 新規ユーザー登録API
app.post('/api/auth/register', async (req: Request, res: Response) => {
    const { username, email, password }: { username: string; email: string; password: string } = req.body

    // prisma.userのuserはDBのtable名を小文字にしたもの
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password
        }
    })

    return res.json({ user })
})

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))
