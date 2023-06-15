import express, { Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const app: Application = express()
const prisma = new PrismaClient()

// localのport番号設定
const PORT = 5000

// json形式でdataが送られてくることを明記
app.use(express.json())

// API作成
// app.get("/", (req: Request, res: Response) => {
//     res.send("<h1>Hello</h1>")
// })

// 新規ユーザー登録API
app.post('/api/auth/register', async (req: Request, res: Response) => {
    const { username, email, password }: { username: string; email: string; password: string } = req.body
    const hash = bcrypt.hashSync(password, 10) // hash value, salt rounds
    // prisma.userのuserはDBのtable名を小文字にしたもの
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hash
        }
    })

    return res.json({ user })
})

// ユーザーログインAPI
app.post('/api/auth/login', async (req: Request, res: Response) => {
    const { email, password } = req.body

    // findMany　検索する時に使用 返り値が配列になる
    // whereでどのカラムか
    // findUnique 一意の値が返り値となる
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        return res.status(401).json({ error: "email or passwordが違います。"})
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({error: "パスワードが"})
    }
})

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))
