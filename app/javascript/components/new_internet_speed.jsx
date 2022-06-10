import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NewInternetSpeed() {
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="text-4xl text-gray-600 font-semibold">Log internet speed</h2>
        </div>
      </div>

      <div className="md:ml-2 w-96">
        <label className="block mb-2 text-sm font-bold text-gray-700" for="placeName">
          Place Name
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="placeName"
          type="text"
          placeholder="Place Name"
        />
      </div>
      <div className="md:ml-2 mt-2 w-96">
        <label className="block mb-2 text-sm font-bold text-gray-700" for="city">
          City
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="city"
          type="text"
          placeholder="City"
        />
      </div>
      <div className="md:ml-2 mt-4 w-96 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
        >
          Start speed test
        </button>
      </div>
    </div>
  )
}
