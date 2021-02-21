import React, {useContext, useState} from 'react' 
import { useHistory } from "react-router-dom";
import { Form, Col, Button, Row } from 'react-bootstrap';
import firebase from 'firebase'
import { UserContext } from '../App'

const Login = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(UserContext)
  let history = useHistory()

  const onFinish = ({email, password}) => {
     setLoading(true)
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          setError(null)
          setUser(res.user)
          setLoading(false)
          history.push("/")
        })
        .catch(err => {
          setLoading(false)
          setError(err.message)
        })
      }
      const loginWithGoogle = () => {
        setLoading(true)
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(res => {
          setError(null)
          setUser(res.user)
          console.log(res.user)
          setLoading(false)
          history.push("/")
        })
        .catch(err => { 
          setLoading(false)
          setError(err.message)
        })
      }
        const onFinishFailed = (errorInfo) => {
          setLoading(false)
          console.log('Failed:', errorInfo)
          setError('Please input a valid email and password')
        }
      
    return (
        <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email',
              },
            ]} />
          </Col>
        </Form.Group>
      
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
            ]} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>
      
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" loading = {loading}>Login</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
          <Button ghost
          type="primary"
          loading={loading}
          onClick={() => loginWithGoogle()}
        >
        Login with Google        
        </Button>
          </Col>
        </Form.Group>
      </Form>
    )

}

export default Login