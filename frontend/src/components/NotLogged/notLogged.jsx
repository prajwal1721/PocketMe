import { useHistory } from 'react-router-dom';
import './notLogged.scss'
export const NotLogged = ({ toggleView }) => {
    const history = useHistory();
    return (
        <div className='notlogged' >
            <div className='header'>Not logged in !!</div>
            <div className='buttons-container'>
                <button onClick={() => {
                    history.push('/login')
                    toggleView(false)
                }
                }>Signin</button>
                <button onClick={() => {
                    history.push('/signup')
                    toggleView(false)
                }
                }>Signup</button>
            </div>
        </div>
    )
}