import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function Activities() {
  const [activitiesList, setActivitiesList] = useState(null);
  const [startTime, setStartTime] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [name, setName] = useState(null);

  useEffect(() => {
    fetch("https://tracker-rb.web.app/activities")
      .then((res) => res.json())
      .then((data) => setActivitiesList(data))
      .catch((err) => alert("error"));
  }, []);

  function startActivity(activityId) {
    console.log(activityId);
    setStartTime(Date.now());
    setSelectedActivity(activityId);
  }
  useEffect(() => {
    console.log(startTime, selectedActivity);
  }, [startTime, selectedActivity]);

  function endActivity() {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 60000;
    console.log(duration);
    fetch(`https://tracker-rb.web.app/activities/${selectedActivity}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startTime, endTime, duration }),
    })
      .then((res) => res.json())
      .then((data) => {
        setActivitiesList(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("error updating item:", err);
      });
  }

  function postActivity() {
    fetch("https://tracker-rb.web.app/activities", {
      method: "POST",
      body: JSON.stringify({ name, userId: 1 }),
      headers: { "Content-type": "application/json" },
    })
    .then((res) => res.json())
      .then((data) => {
        setActivitiesList(data);
        setName('')
      })
      .catch((err) => console.log("ERROR", err));
  }

  function deleteActivity(activityId) {
    fetch(`https://tracker-rb.web.app/activities/${activityId}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((data) => {
      setActivitiesList(data)
    })
    .catch((err) => {
      console.log("error deleting activity:", err);
    });
  }

  if (!activitiesList) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  return (
    <>
      <div className="activities-titles">
        <InputGroup style={{ paddingBottom: "0vh" }}>
          <FormControl
            placeholder="Add New Activity"
            aria-label="Add New Activity"
            aria-describedby="basic-addon2"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <InputGroup.Append>
            <Button variant="secondary" onClick={postActivity}>
              Submit
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <ListGroup>
          {activitiesList.map((activity) => (
            <ListGroup.Item variant="info" key={activity.id}>
              <h2>{activity.name}</h2>
              <Button
                variant="success"
                size="md"
                onClick={() => startActivity(activity.id)}
              >
                Start
              </Button>{" "}
              <Button variant="danger" size="md" onClick={() => endActivity()}>
                Stop
              </Button>
              <br />
              <Button variant="danger" size="sm" id="delete-button" onClick={() => deleteActivity(activity.id)}>
                Delete
              </Button>
              <p>
                Total Time Spent: {Math.round(activity.totalDuration)} minutes
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default Activities;
