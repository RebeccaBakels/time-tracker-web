import React, {useContext} from 'react'
import Activities from './Activities'
import {UserContext} from '../App'
import { Container, Row, Col } from 'react-bootstrap'

function Welcome() {
    const { user } = useContext(UserContext)

    const greeting = (!user)
    ? 'Guest'
    : user.displayName || 'User!'

    return(
        <>
    <Container fluid>
    <Row>
        <Col >
        <h1>Hello {greeting}!</h1>
        </Col>
    </Row>
    </Container>
        <Activities/>
        </>
        
    )
}

export default Welcome 