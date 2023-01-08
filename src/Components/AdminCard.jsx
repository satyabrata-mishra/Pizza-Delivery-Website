import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components'
import { host } from '../Utils/constant';

export default function AdminCard({ img, owner, name, quantity, updatedPrice, id, getAllOrders }) {
    const toastoption = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${host}/orders/updatestatus`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    status: document.getElementById("orderstatus").value
                })
            });
            toast.success("Successfully Updated.", toastoption);
        } catch (error) {
            toast.error(error.message, toastoption);
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${host}/orders/deletefromcart`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
            getAllOrders();
            toast.success("Successfully Deleted.", toastoption);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Components>
            <img src={img} alt="" />
            <div className="first">
                <p className='owner'>Owner : {owner}</p>
                <p className='pizzaname'>{name}</p>
                <p className='quantity'>Quantity : {quantity}</p>
                <p className='totalprice'>Total Price : {updatedPrice}</p>
            </div>
            <div className="second">
                <form>
                    <p>Update the status of the order</p>
                    <select name="status" id="orderstatus">
                        <option value="Order Received">Order Received</option>
                        <option value="In Kitchen">In Kitchen</option>
                        <option value="Sent to Delivery">Sent to Delivery</option>
                    </select>
                </form>
            </div>
            <div className="third">
                <button className='update' onClick={handleUpdate}>Update Status</button>
                <button className='delete' onClick={handleDelete}>Delete Order</button>
            </div>
            <ToastContainer />
        </Components>
    )
}
const Components = styled.div`
    height: 8rem ;
    width: 70rem;
    box-shadow: 0px 0px 10px grey;
    border-radius: 1rem;
    padding: 0 0 0 1rem;
    display: flex;
    align-items: center;
    margin: 1rem 0;
    img{
        height: 5rem;
        border-radius: 50%;
        margin: 0 1rem 0 0;
    }
    .first{
        .owner{
            font-weight: 600;
        }
        .pizzaname{
            font-weight: 600;
        }
        .quantity{
            font-weight: 600;
            font-size: 0.8rem;
        }
        .totalprice{
            font-weight: 600;
            font-size: 0.8rem;
        }
    }
    .second{
        margin: 0 4rem 4.6rem 4rem;
        p{
            font-weight: 600;
        }
        select{
            outline: none;
            border: none;
        }
    }
    .third{
        display: flex;
        flex-direction: column;
        margin: 0 5rem;
        button{
            margin: 1rem 0;
            padding: 0.5rem 1rem;
            cursor: pointer;
            outline: none;
            border: 1px solid black;
            color: white;
            font-weight: 600;
            letter-spacing: 0.1rem;
        }
        .update{
            background-color: green;
        }
        .delete{
            background-color: red;
        }
    }
`;