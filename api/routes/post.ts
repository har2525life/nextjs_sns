import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Console } from 'console'
import { rawListeners } from 'process'
dotenv.config()

const prisma = new PrismaClient()

const router = Router()

// 新規ユーザー登録API
router.post('/post', async (req: Request, res: Response) => {
    const { content } = req.body
    console.log(content)
    if (!content) {
        return res.status(400).json({ message: '投稿内容がありません' })
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                content,
                authId: 'd9bd7643-a2e2-40ce-8335-b93208ed6b0e'
            },
            include: {
                auth: true
            }
        })

        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json('サーバーエラーです')
    }
})

// ユーザーログインAPI
router.get('/get_latest_posts', async (req: Request, res: Response) => {
    console.log('get_latest_posts')
    try {
        const response = await prisma.post.findMany({ take: 10, include: { auth: true } })
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'サーバーエラーです' })
    }
})

export default router
