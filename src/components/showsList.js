import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function ShowsList({ setShow }) {
  const [allShows, setAllShows] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //
    // fetch("http://localhost:3001/shows")
    fetch("https://zany-teal-caterpillar-tam.cyclic.app/shows")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAllShows(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //fetch data
  function displayData() {
    const result = allShows.map((performer) => {
      const { title, venue, start, duration, _id, performers } = performer;
      return (
        <div key={_id}>
          title: {title}
          <br></br>
          venue: {venue}
          <br></br>
          start: {start}
          <br></br>
          duration: {duration}
          <br></br>
          performers:
          <ul>
            {performers.map(({ name, location }) => {
              return (
                <li key={name}>{`name: ${name}, location: ${location}`}</li>
              );
            })}
          </ul>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setShow(performer);
              navigate("/comedians");
              console.log("performer: ", performer);
              // alert(title);
            }}
          >
            Manage Performers
          </Button>
          <hr></hr>
        </div>
      );
    });

    return result;
  }

  return (
    <div>
      <h1>shows</h1> {allShows ? displayData() : "Loading.."}
    </div>
  );
}
