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
    <ListGroup >
    {activitiesList.map(activity => (
    <ListGroup.Item variant="info" key={activity.id} >
      {activity.name}
      <div>
    <Button variant="success" size="sm">
      Start
    </Button>{' '}
    <Button variant="danger" size="sm">
      Stop
    </Button>
    <Button variant="info" size="sm">
      Reset
    </Button>
  </div>
    </ListGroup.Item>))}
  </ListGroup>
    )

}

export default Activities 