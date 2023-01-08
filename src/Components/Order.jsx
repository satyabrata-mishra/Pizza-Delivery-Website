import React from 'react'
import styled from 'styled-components'
import { SiStatuspal } from 'react-icons/si';


export default function Order({image,name,updatedPrice,quatity,orderStatus,orderPlaced}) {
  return (
    <Components>
      {orderPlaced && <div className="cart">
        <img src={image} alt="" />
        <div className="details">
          <p className='pizza'>{name}</p>
          <p className='status'><SiStatuspal /> Order Status : {orderStatus}</p>
        </div>
        <div className="details">
          <p>Quantity: {quatity}</p>
          <p className='price'>Total Price:{updatedPrice}/-</p>
        </div>
      </div>}
    </Components>
  )
}
const Components = styled.div`
    .cart{
    display: flex;
    align-items: center;
    height: 6rem;
    width: 85vw;
    margin: 1rem 5rem;
    box-shadow: 0px 0px 10px gray;
    border-radius: 20px;
    img{
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        margin: 0 1.2rem;
    }
    .details{
        margin-right: 10rem;
        p{
            font-weight: 500;
        }
        .status{
          color: green;
          font-size: 0.8rem;
          font-weight: 500;
          svg{
            font-size: 1.3rem;
            animation: colorChangeAnimation 2s linear infinite ;
          }
        }
    }
}
@keyframes colorChangeAnimation {
  0%{
    color: #0ff00f;
  }
  100%{
    color: red;
  }
}
`;