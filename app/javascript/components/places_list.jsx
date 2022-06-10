import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function PlacesList() {
  // State as: A minimum set of parameters that fully represents
  // what you want to render on the screen.
  // showLoading: Boolean
  // loadedPlaces: [] => gets filled
  const [loading, setLoading] = useState(true);
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    // Hit the server and get the places list.
    const apiEndpoint = "/api/places"
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLoadedPlaces(data["places"])
        setLoading(false)
      });
  }, [])

  const loadingSection = (<div>Loading...</div>)
  console.log(loadedPlaces);
  const dataSection = loadedPlaces.map((place, index) =>
    <div key={index}>
      <table>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Recent Upload Speed</th>
          <th>Recent Upload Speed Units</th>
          <th>Number of measurements</th> 
        </tr>
        <tr>
          <td>{place.name}</td>
          <td>{place.city}</td>
          <td>{place.most_recent_download_speed}</td>
          <td>{place.most_recent_download_units}</td>
          <td>{place.number_of_measurements}</td>
        </tr>
      </table>
    </div>
  )

  if (loading) {
    return loadingSection
  } else {
    return dataSection
  }
}

// Add some javascript to replace the div where = "places-list-container"
// with content rendered above.
const placesList = ReactDOM.createRoot(document.getElementById("places-list-container"));
placesList.render(<PlacesList />);
