import { Router, Request, Response} from "express"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { sign } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()


const prisma = new PrismaClient()


const router = Router()

// 新規ユーザー登録API
router.post('/register', async (req: Request, res: Response) => {
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
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body

    // findMany　検索する時に使用 返り値が配列になる
    // whereでどのカラムか
    // findUnique 一意の値が返り値となる
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        return res.status(401).json({ error: 'email or passwordが違います。' })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ error: 'パスワードが' })
    }

    // tokenにする値,　シークレットキー
    const token = sign({ id: user.id }, process.env.SECRET_KEY!, {
        expiresIn: '1d'
    })

    return res.json({ token })
})

export default router