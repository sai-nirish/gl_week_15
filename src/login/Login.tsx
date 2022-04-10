import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export function Login() {

    let [name, setName] = useState("");
    let [pwd, setPwd] = useState("");
    let [isAdmin, setIsAdmin] = useState(false);
    let [isUser, setIsUser] = useState(true);
    let navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(name);
        console.log(pwd);
        axios
            .get(
                // dummy uri -- allows all values in local   
                "users/login",
            )
            .then(res => {
                console.log(res);
                if (isAdmin) {
                    navigate("/admin");
                } else if (isUser) {
                    navigate("/user");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <div className="form-group">
                    <label>User name</label>
                    <input type="name" className="form-control" placeholder="Enter username"
                        onChange={e => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                        onChange={e => {
                            setPwd(e.target.value);
                        }} />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isAdmin}
                        onChange={e => {
                            setIsAdmin(e.target.checked);
                            setIsUser(false);
                        }}
                    />
                    <label className="form-check-label" >
                        Log in as Admin
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={isUser}
                        onChange={e => {
                            setIsUser(e.target.checked);
                            setIsAdmin(false);
                        }} />
                    <label className="form-check-label" >
                        Log in as User
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>
            </form>
        </div>

    );
}