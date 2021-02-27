import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function Activities() {
  const [activitiesList, setActivitiesList] = useState(null);
  const [startTime, setStartTime] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");

  useEffect(() => {
    fetch("https://tracker-rb.web.app/activities")
      .then((res) => res.json())
      .then((data) => setActivitiesList(data))
      .catch((err) => alert("error"));
  }, []);

  function startActivity(activityId) {
    console.log(activityId)
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
        console.log(data)
      })
      .catch((err) => {
        console.log("error updating item:", err);
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
    <ListGroup className="activities-titles">
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
          <p>Total Time Spent: {Math.round(activity.totalDuration)} minutes</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Activities;
