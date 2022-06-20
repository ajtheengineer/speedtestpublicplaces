import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function renderPlacesPage(body, onSearchTextChange) {
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="text-4xl text-gray-600 font-semibold">Places</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block w"
              type="text"
              name=""
              id=""
              placeholder="search..."
              onChange={onSearchTextChange}
              />
          </div>
          <div className="lg:ml-40 ml-10 space-x-8">
            <Link to="/new-internet-speed">
              <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Log</button>
            </Link>
          </div>
        </div>
      </div>
      {body}
    </div>
  )
}

export default function PlacesList() {
  // State as: A minimum set of parameters that fully represents
  // what you want to render on the screen.
  // showLoading: Boolean
  // loadedPlaces: [] => gets filled
  const [loading, setLoading] = useState(true)
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  useEffect(() => {
    // Hit the server and get the places list.
    const apiEndpoint = `/api/places?search_term=${searchTerm}&sort_column=${sortColumn}&sort_order=${sortOrder}`
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLoadedPlaces(data["places"])
        setLoading(false)
      });
  }, [searchTerm, sortColumn, sortOrder])

  const onSearchTextChange = (e) =>  {
    setLoading(true);
    setSearchTerm(e.target.value);
  }

  const handleHeaderClick = (clickedSortColumn) => {
    // If I was already sorted by name, and I click name again, then I toggle the sortOrder (asc <=> desc)
    if (clickedSortColumn == sortColumn) {
      // Toggle the sort Order and you're done
      setSortOrder(sortOrder == "asc" ? "desc" : "asc")
    } else {
      setSortColumn(clickedSortColumn)
      setSortOrder("asc")
    }
  }

  const loadingSection = (<div>Loading...</div>)
  const tableHeaderClass = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
  const dataSection = (
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  className={`${tableHeaderClass} cursor-pointer`}
                  onClick={(clickedSortColumn) => handleHeaderClick("name")}
                  >
                    {sortColumn == "name" && sortOrder == "asc" && ("Name ↓")}
                    {sortColumn == "name" && sortOrder == "desc" && ("Name ↑")}
                    {sortColumn != "name" && ("Name")}
                  
                </th>
                <th
                  className={`${tableHeaderClass} cursor-pointer`}
                  onClick={(clickedSortColumn) => handleHeaderClick("city")}
                  >
                    {sortColumn == "city" && sortOrder == "asc" && ("City ↓")}
                    {sortColumn == "city" && sortOrder == "desc" && ("City ↑")}
                    {sortColumn != "city" && ("City")}
                </th>
                <th className={tableHeaderClass}>Recent Upload Speed</th>
                <th className={tableHeaderClass}>Recent Upload Speed Units</th>
                <th className={tableHeaderClass}>Number of measurements</th> 
              </tr>
            </thead>
            <tbody>
              {loadedPlaces.map((place, index) => {
                return (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">{place.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{place.city}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {place.most_recent_download_speed}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {place.most_recent_download_units}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {place.number_of_measurements}
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return renderPlacesPage(loadingSection, onSearchTextChange)
  } else {
    return renderPlacesPage(dataSection, onSearchTextChange)
  }
}
