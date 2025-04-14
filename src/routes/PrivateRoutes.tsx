import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'


type poros={
    children?:ReactNode
}
export default function privateRoutes({children} :poros) {
    const token=localStorage.getItem('user')
    console.log(token)
        if(token !==null){
            return children
            }
           return <Navigate to="/login" replace={true} />
           
           
            }