import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export function LoginSignup() {
    const navigate = useNavigate()
    const [isSignup, setIsSignUp] = useState(false)


    return (
        <div className="login-signup">
            <h1>Welcome! Please choose an option:</h1>
            <div className="btns">
                <button onClick={() => navigate('/login')}>Login</button>
                <button
                    onClick={() => {
                        setIsSignUp(true)
                        navigate('/signup')
                    }}
                >Signup</button>
            </div>
        </div>
    )
}
