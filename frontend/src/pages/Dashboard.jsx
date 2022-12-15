import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from '../toast';
import { languageChoices, fontChoices, defaultCode, question, examples } from '../config';

// editor from npm
import Editor from 'react-simple-code-editor';

import Prism from "prismjs"

// importing language speifics
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
import 'prismjs/plugins/match-braces/prism-match-braces';
import 'prismjs/prism';
import axios from 'axios';




const Dashboard = () => {

    const [name, setName] = useState("");

    const [fSize, setFSize] = useState(10);
    const [language, setLanguage] = useState("js");
    const [isLight, setIsLight] = useState(false);

    const [code, setCode] = useState("");

    const [loading, setIsLoading] = useState(false);

    const [timer , setTimer] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("user"))
        if (u) {
            setName(u.name)
        } else {
            navigate("/")
        }
        setCode(defaultCode[0])
    }, [])


    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post("http://localhost:5000/calculate", {
                code,
                language,
                name
            })
            setIsLoading(false)
            if (res.status === 200) {
                toast(res.data.message, false)
            }
        } catch (err) {
            setIsLoading(false)
            toast(err.response.data.error, true)
        }
    }

    return (
        <div className="container">

            {
                loading ? (
                    <>
                        {

                            [1, 2, 3, 4, 5, 6].map((e, index) => {
                                return <div className="row align-items-center mt-5" key={index}>
                                    <div className="col col-md-12 text-center">
                                        <div className="spinner-grow text-success" role="status" >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            })

                        }
                    </>
                ) : (
                    <>
                        <div className="row">
                            <div className="text-end">
                                <Link className='btn btn-link' to="/">Logout</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-md-4">
                                <div className="card h-100">
                                    <div className="card-header">Questions :</div>
                                    <div className="card-body">
                                        <div className='card-text'>{"Q : " + question}</div>

                                        <div className="card-text mt-2">Examples : </div>
                                        <ul className='list-group mt-3'>
                                            {examples.map((e, index) => {
                                                return <li className="list-group-item" key={index}>{e}</li>
                                            })}
                                        </ul>

                                    </div>
                                    <div className="card-footer">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-text text-danger">
                                                    <small> Note : Dont Use Inbuilt methods ,
                                                        Usage of inbuilt methods will result in disqualification
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-8">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col col-md-3">
                                                <select className='form-select' onChange={(e) => {
                                                    switch (e.target.value) {
                                                        case "java":
                                                            setCode(defaultCode[0])
                                                            break;
                                                        case "js":
                                                            setCode(defaultCode[1])
                                                            break;
                                                        case "python":
                                                            setCode(defaultCode[2])
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                    setLanguage(e.target.value)
                                                }}>
                                                    {languageChoices.map((choice, index) => {
                                                        return <option key={index} value={choice.value}>{choice.name}</option>
                                                    })}
                                                </select>
                                            </div>


                                            <div className="col col-md-5">
                                                <select onChange={(e) => { setFSize(parseInt(e.target.value)) }} className="form-select">
                                                    {fontChoices.map((f, index) => {
                                                        return <option value={f} key={index}>{f}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col col-md-4">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                                        value={isLight}
                                                        onChange={() => setIsLight(!isLight)}
                                                    />
                                                </div>
                                                <span>{isLight ? "Light" : "Dark"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {languageChoices.map((l, index) => {
                                            return (
                                                l.value === language && <Editor
                                                    key={index}
                                                    value={code}
                                                    onValueChange={code => setCode(code)}
                                                    highlight={code => Prism.highlight(code, Prism.languages[language])}
                                                    padding={10}
                                                    style={{
                                                        fontFamily: '"Fira code", "Fira Mono", monospace',
                                                        fontSize: fSize,
                                                        height: "20rem",
                                                        background: isLight ? "white" : "black"
                                                    }}
                                                />
                                            )
                                        })}

                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col col-md-2">
                                                <button className='btn btn-danger' onClick={() => {
                                                    setCode("");
                                                    switch (language) {
                                                        case "java":
                                                            setCode(defaultCode[0])
                                                            break;
                                                        case "js":
                                                            setCode(defaultCode[1])
                                                            break;
                                                        case "python":
                                                            setCode(defaultCode[2])
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                }}>Clear</button>
                                            </div>
                                            <div className="col col-md-2"></div>
                                            <div className="col col-md-2"></div>
                                            <div className="col col-md-2"></div>
                                            <div className="col col-md-2"></div>
                                            <div className="col col-md-2">
                                                <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default Dashboard