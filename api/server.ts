import express, { Application } from 'express'
import authRoute from "./routes/auth"

const app: Application = express()

// localのport番号設定
const PORT = 5000

// json形式でdataが送られてくることを明記
app.use(express.json())

app.use("/api/auth", authRoute)

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))
