import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRandomQuote } from "../config";
import toast from "../toast";

const Auth = () => {

    const [quote, setQuote] = useState("")

    const [name, setName] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        setQuote(generateRandomQuote())
    }, [])


    const handleClick = async () => {
        try {

            const response = await axios.post('http://localhost:5000/auth', {
                name: name
            })

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data.user))
                navigate("/dashboard")
            }
        } catch (err) {
            toast(err.response.data.error, true)
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <q className="card-text"><i>{quote}</i></q>
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title text-center">Login</h5>
                    <input type="text" className="form-control" placeholder="Enter Your Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <button className="btn btn-success w-100 mt-2" onClick={handleClick}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Auth;

