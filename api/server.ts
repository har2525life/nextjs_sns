import express, { Application, Request, Response } from "express"

const app: Application = express()

// localのport番号設定
const PORT = 5000

// API作成
app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Hello</h1>")
})

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))