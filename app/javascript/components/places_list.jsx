import React from "react";
import ReactDOM from "react-dom/client";

class PlacesList extends React.Component {
  render() {
    return (
      <div> Places list rendered in react!</div>
    )
  }
}

// Add some javascript to replace the div where = "places-list-container"
// with content rendered above.
const placesList = ReactDOM.createRoot(document.getElementById("places-list-container"));
placesList.render(<PlacesList />);
