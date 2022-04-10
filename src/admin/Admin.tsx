import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User } from "./User";

export function AdminMenu() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const logOut = () => {
        // call the api for logout and redirect to signout page
        navigate("/");
    }

    useEffect(() => {
        axios
            .get<User[]>(
                // use mock server   
                "admin/users",
            )
            .then((res) => {
                console.log(res);
                setUsers(res.data as any);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    return (
        <div className="container">

            <div className="row">
                <nav className="navbar navbar-dark bg-primary">
                    <a className="navbar-brand" href="#"
                        onClick={() => {
                            logOut();
                        }}
                    >Signout</a>
                </nav>

            </div>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                (user: User) =>
                                    <tr>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.username}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}