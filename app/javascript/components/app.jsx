import React from "react"
import ReactDOM from "react-dom/client"

// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import PlacesList from "./places_list"
import NewInternetSpeed from "./new_internet_speed"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-internet-speed" element={<NewInternetSpeed />} />
        <Route path="*" element={<PlacesList />} />
      </Routes>
    </BrowserRouter>
  );
}

// Set up some code that would render react into the DOM
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

