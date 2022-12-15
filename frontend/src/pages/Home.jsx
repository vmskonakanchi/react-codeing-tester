import Auth from "../components/Auth"


export const Home = () => {
    return (
        <div className="container">
            <div className='row mt-2'>
                <div className='col col-md-7'>
                    <img className="card-img-top" src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg?w=2000" alt='Developer' />
                </div>
                <div className='col col-md-5 mt-5'>
                    <Auth />
                </div>
            </div>
        </div>
    )
}
