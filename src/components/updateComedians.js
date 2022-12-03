import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

export function UpdateComedians({ show }) {
  const [allComedians, setAllComedians] = useState(null);
  const [selectedComedians, setSelectedComedians] = useState([
    ...show.performers,
  ]);
  const navigate = useNavigate();

  // let unassignedComedians = [];
  //fetch all comedians.
  // split comedians into assigned and unassigned.
  // add checked into each comedians.
  // add update button :
  // if assigned still same, no update, else updateOne.
  // then go back to showsList Page.
  useEffect(() => {
    fetch("http://localhost:3001/comedians/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAllComedians(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function displayData() {
    //split date to assigned and unassigned
    let assignedComedians = [...show.performers];
    let unassigned_Comedians = allComedians.filter((comedian) => {
      return assignedComedians.every((assigned_comedian) => {
        return assigned_comedian._id !== comedian._id;
      });
    });
    // console.log("assignedComedians: ", assignedComedians);
    // console.log("unassigned_Comedians: ", unassigned_Comedians);
    const assigned_result = assignedComedians.map((comedian) => {
      const { _id, name } = comedian;
      return (
        <div key={_id}>
          name: {name}
          <Checkbox
            defaultChecked={true}
            onChange={(event) => {
              return handleChange(event, comedian);
            }}
            inputProps={{ "aria-label": "checkbox for performers" }}
          />
          <hr></hr>
        </div>
      );
    });

    const unassigned_result = unassigned_Comedians.map((comedian) => {
      const { _id: id, name } = comedian;
      return (
        <div key={id}>
          name: {name}
          <Checkbox
            defaultChecked={false}
            onChange={(event) => {
              return handleChange(event, comedian);
            }}
            inputProps={{ "aria-label": "checkbox for performers" }}
          />
          <hr></hr>
        </div>
      );
    });

    return (
      <>
        <h3>Assigned:</h3>
        {assigned_result}
        <h3>Unassigned:</h3>
        {unassigned_result}
      </>
    );
  }
  const handleChange = (event, comedian) => {
    //check if exist "comedian" exist in selectedComedians.
    let exist = selectedComedians.some((comedianObj) => {
      return comedianObj._id === comedian._id;
    });
    console.log("selectedComedians: ", selectedComedians);
    console.log("exist: ", exist);
    if (event.target.checked) {
      // if "checked"
      console.log("add");
      if (!exist) {
        //if "comedian" does not exist, add "comedian" into selectedComedians
        setSelectedComedians([...selectedComedians, comedian]);
        console.log("update-SelectedComedians: ", [
          ...selectedComedians,
          comedian,
        ]);
      }
    } else {
      // if "unchecked"
      console.log("remove");
      if (exist) {
        //if "comedian" exist, remove "comedian" from selectedComedians
        let newSelectedComedians = selectedComedians.filter((comedianObj) => {
          return comedianObj._id !== comedian._id;
        });
        setSelectedComedians([...newSelectedComedians]);
        console.log("newSelectedComedians: ", newSelectedComedians);
      }
    }
  };

  function handleClick() {
    console.log("final: ", selectedComedians);
    const performersIds = selectedComedians.map((comedian) => {
      return comedian._id;
    });
    console.log("performersIds: ", performersIds);
    console.log("showIds: ", show._id);
    console.log("url: ", `http://localhost:3001/shows/${show._id}`);
    // get array of ids from performers.

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ performers: performersIds }),
    };

    fetch(`http://localhost:3001/shows/${show._id}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      UpdateComedians
      <h1>Comedians</h1>
      <h3>All:</h3> {allComedians ? displayData() : "Loading.."}
      {/* <Checkbox
        defaultChecked={true}
        onChange={handleChange}
        inputProps={{ "aria-label": "checkbox for performers" }}
      /> */}
      <Button
        variant="contained"
        size="small"
        onClick={handleClick}
        // () => {
        // navigate("/");
        // console.log("final: ", selectedComedians);
        // alert(title);}
      >
        Update Performers
      </Button>
    </>
  );
}
