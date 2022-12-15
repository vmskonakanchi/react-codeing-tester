

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from '../toast'

const Results = () => {

    const [results, setResults] = useState([])

    const navigate = useNavigate();

    const getResults = async () => {
        try {
            const response = await axios.get('http://localhost:5000/results')
            setResults(response.data)
        } catch (err) {
            toast(err.response.data.error, true)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/')
        }
        getResults()
    }, [])

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col col-md-12">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Language Choosen</th>
                                <th scope="col">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.name}</td>
                                    <td>{result.language}</td>
                                    <td className={result.result ? "text-danger" : "text-success"}>{result.result}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Results