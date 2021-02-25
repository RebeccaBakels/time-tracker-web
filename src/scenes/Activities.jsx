import React, {useState, useEffect} from 'react' 
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

function Activities() {
    const [activitiesList, setActivitiesList] = useState(null)
    //const [log, setLog] = useState([])
    //const [selectedActivity, setSelectedActivity] = useState('')

    useEffect(() => {
        fetch('https://tracker-rb.web.app/activities')
        .then(res => res.json())
        .then(data => setActivitiesList(data))
        .catch(err => alert('error'))
    },[])

    //setLog({startTime: Date.now(), endTime: null, duration: 0})

    function startActivity() {
      //put the onClick on the button
      //once clicked it logs the Date.now() in startTime
      //also needs to grab the activity.id
      //setInterval
      //do I need a fetch??
    }
    function endActivity() {
      //put onClick on Stop button
      //once clicked it logs Date.now() in endTime 
      //then startTime-endTime = duration
      //stores it in the database
      //displays totalDuration next to activity name

    }


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
    <Button  variant="success" size="md" onCLick={startActivity()} >
      Start
    </Button>{' '}
    <Button variant="danger" size="md" onClick={endActivity()}>
      Stop
    </Button>
    {/* <Button variant="info" size="md">
      Reset
    </Button> */}

    </ListGroup.Item>))}
  </ListGroup>
    )

}

export default Activities 