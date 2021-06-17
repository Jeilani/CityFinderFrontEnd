import React from "react"
import "../CSS/LoginPage.css"

const Login = ({setWhichPage}) => {
    const [loginForm, setLoginForm] = React.useState(true)

    const renderLoginForm = () => {
        if (loginForm){
            return (
                <form>
                <h1>Login</h1>
                <input
                type="text"
                placeholder="Username"
                >
                </input>
                <input
                type="password"
                placeholder="Password"
                >
                </input>
                <button
                type="submit"
                onClick={(e)=>{e.preventDefault(); setWhichPage("")}}
                >
                    Login
                </button>
            </form>
            )
        } else {
            return (
                <form>
                <h1>Sign Up</h1>
                <input
                type="text"
                placeholder="Location">

                </input>
                <input
                type="text"
                placeholder="Username"
                >
                </input>
                <input
                type="text"
                placeholder="Email"
                ></input>
                <input
                type="password"
                placeholder="Password"
                >
                </input>
                <button
                type="submit"
                onClick={(e)=>{e.preventDefault(); setWhichPage("")}}
                >
                    Login
                </button>
            </form>
            )
        }
    }

    return (
        <div className="loginPage">
                <div className="mainLoginContent">
                    <p className="citySearchTitle">City Connect</p>
                    <h3>Create an account or login to chat with people who are looking to move in your area/apartment building and visa versa</h3>
                    <h3>City Connect will let you interact with anyone across the country so you can learn about the place or area you want to move to</h3>
                </div>
                <div className="sideLoginContent">
                    <div className="loginToggle">
                        <p onClick = {()=>setLoginForm(!loginForm)} className={`loginOption ${loginForm ? 'active': ''}`}>Login</p>
                        <p onClick={()=>setLoginForm(!loginForm)}className={`loginOption ${loginForm ? '': 'active'}`}>Sign Up</p>
                    </div>
                {renderLoginForm()}
                </div>
        </div>
    )
}

export default Login