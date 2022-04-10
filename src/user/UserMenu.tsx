import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AddRemoveButton } from "./AddRemoveButton";
import { Item } from "./Item";


export function UserMenu() {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([])
    const [totalBill, setTotalBill] = useState(0);
    const navigate = useNavigate();

    const logOut = () => {
        // call the api for logout and redirect to signout page
        navigate("/");
    }

    const getTotalBill = () => {
        axios
            .get<any>(
                // use mock server - same dummy value will be called  
                "users/bill",
            )
            .then((res) => {
                console.log(res);
                setTotalBill(res.data.value as any);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        axios
            .get<Item[]>(
                // use mock server   
                "users/items",
            )
            .then((res) => {
                console.log(res);
                setItems(res.data as any);
                setSelectedItems(
                    res.data.map(
                        item => {
                            return {
                                id: item.id,
                                quantity: 0
                            }
                        }
                    ) as any
                );
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
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">price</th>
                            <th scope="col">quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(
                                (item: Item, index) =>
                                    <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td><AddRemoveButton counter={0} getCounter={
                                            (counter: number) => {
                                                (selectedItems[index] as any).quantity = counter;
                                                console.log(selectedItems);
                                            }
                                        } ></AddRemoveButton></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="row">
                {/* <div className="col-6">
                    <button className="btn btn-primary btn-md">
                        reset
                    </button>
                </div> */}
                <div className="col-6" onClick={e => {
                    e.preventDefault();
                    getTotalBill();
                }}>
                    <button className="btn btn-primary btn-md mr-5 pd-5">
                        Get bill
                    </button>
                    <span className="ml-5 pl-5">
                        Total bill is Rs. {totalBill}
                    </span>
                </div>
            </div>
        </div>
    )
}