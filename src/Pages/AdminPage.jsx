import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AdminCard from '../Components/AdminCard';
import { host } from '../Utils/constant';


export default function AdminPage() {
    const [allOrders, setallOrders] = useState([]);

    useEffect(() => {
        getAllOrders();
        document.title="Admin Dashboard"
    }, []);

    async function getAllOrders() {
        const response = await fetch(`${host}/orders/getallorders`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        setallOrders(json);
    }

    return (
        <Components>
            <h2>ADMIN DASHBOARD</h2>
            {
                allOrders.map((value, index) => {
                    return <AdminCard key={index} img={value.image} owner={value.owner} name={value.name} quantity={value.quatity} updatedPrice={value.updatedPrice} id={value._id} getAllOrders={getAllOrders} />
                })
            }
            {
                allOrders.length===0?<img src="https://cdn-icons-png.flaticon.com/512/2722/2722167.png" alt=""  />:""
            }
        </Components>
    )
}
const Components = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;