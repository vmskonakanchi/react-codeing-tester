import express from "express"
import client from "./redis.js"
import cors from "cors"
import { spawn } from "child_process"
import { mkdirSync, existsSync, writeFileSync } from "fs"
import path from "path"

// user model for the 
class User {
    constructor(name, result, language) {
        this.name = name
        this.result = result
        this.language = language
    }

}
// server config
const port = 5000
const app = express()
app.use(express.json())
app.use(cors())


const finalAnswer = "1"

const createFile = (name, code, language) => {
    if (!existsSync("./codes/" + name)) {
        mkdirSync("./codes/" + name)
    }
    if (language.toLowerCase() === "python") {
        writeFileSync("./codes/" + name + "/code.py", code)
    } else if (language.toLowerCase() === "java") {
        writeFileSync("./codes/" + name + "/code.java", code)
    } else if (language.toLowerCase() === "js") {
        writeFileSync("./codes/" + name + "/code.js", code)
    }
}

const execute = (code, inputLanguage, name) => {
    createFile(name, code, inputLanguage.toLowerCase())
    switch (inputLanguage.toLowerCase()) {
        case "js":
            const js = spawn("node", ["./codes/" + name + "/code.js"])
            js.stdout.on("data", (data) => {
                return data.toString() === finalAnswer
            })
            js.stderr.on("data", (data) => {
                return false
            })
            break;
        case "python":
            const py = spawn("python", ["./codes/" + name + "/code.py"])
            py.stdout.on("data", (data) => {
                if (data.toString() === "True") {
                    return data.toString() === finalAnswer
                } else {
                    return false
                }
            })
            py.stderr.on("data", (data) => {
                return false
            })
            break;
        case "java":
            const java = spawn("java", ["./codes/" + name + "/code.java"])
            java.stdout.on("data", (data) => {
                data.toString() === finalAnswer
            })
            java.stderr.on("data", (data) => {
                return false
            })
            break;
        default:
            break;
    }
}


app.get("/results", async (req, res) => {
    try {
        const allUsers = JSON.parse(await client.get("users"))
        if (allUsers) {
            return res.status(200).send(allUsers)
        } else {
            return res.status(200).send([])
        }
    } catch (err) {
        return res.status(500).send({ "error": err.message })
    }
})

app.post("/calculate", async (req, res) => {
    try {
        const { name, code, language } = req.body;
        const users = JSON.parse(await client.get("users"))

        if (users) {
            const currentUser = users.find((u) => u.name === name)
            if (currentUser) {
                currentUser.language = language
                const result = execute(code, language, name)
                if (result) {
                    currentUser.result = "pass"
                } else {
                    currentUser.result = "fail"
                }
                users[users.indexOf(currentUser)] = currentUser
                await client.set("users", JSON.stringify(users))
                return res.status(200).send({ "message": "Test Completed" })
            } else {
                return res.status(400).send({ "error": "Please Register Before Test" })
            }
        }
    } catch (err) {
        return res.status(500).send({ "error": err.message })
    }
})


app.post("/auth", async (req, res) => {
    try {
        const allUsers = JSON.parse(await client.get("users")) || []
        const { name } = req.body
        const currentUser = allUsers.find((u) => u.name === name)
        if (currentUser) {
            return res.status(200).send({ "created": false, "message": "User Found", "user": currentUser })
        } else {
            const newUser = new User(name, "pending", "none")
            allUsers.push(newUser)
            await client.set("users", JSON.stringify(allUsers))
            return res.status(200).send({ "created": true, "message": "User Created", "user": newUser })
        }
    } catch (err) {
        return res.status(500).send({ "error": err.message })
    }
})

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})
