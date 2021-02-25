import React, {useState, useEffect} from 'react' 
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

function Activities() {
    const [activitiesList, setActivitiesList] = useState(null)
    useEffect(() => {
        fetch('https://tracker-rb.web.app/activities')
        .then(res => res.json())
        .then(data => setActivitiesList(data))
        .catch(err => alert('error'))
    },[])
    if(!activitiesList) {
        return (
            <Spinner animation="border" role="status">
       <span className="sr-only">Loading...</span>
      </Spinner>
        )
    }
    return (
    <ListGroup className='activities-titles' >
    {activitiesList.map(activity => (
    <ListGroup.Item variant="info" key={activity.id} >
      {activity.name}
      <br/>
      <br/>
    <Button  variant="success" size="md">
      Start
    </Button>{' '}
    <Button variant="danger" size="md">
      Stop
    </Button>
    <Button variant="info" size="md">
      Reset
    </Button>

    </ListGroup.Item>))}
  </ListGroup>
    )

}

export default Activities 