import React, {useState, useContext} from 'react'
import Activities from './Activities'
import {UserContext} from '../App'

function Welcome() {
    const { user } = useContext(UserContext)

    const greeting = (!user)
    ? 'Guest'
    : user.displayName || 'User!'

    return(
        <>
        <h1>Hello {greeting}!</h1>
        <h2>Your Activities:</h2>
        <Activities/>
        </>
    )
}

export default Welcome 