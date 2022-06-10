import React from 'react'
import ReactDOM from 'react-dom'

PlacesList.defaultProps = {
  name: 'David'
}

const PlacesList = props => (
  React.createElement('div', null, `Hello ${props.name}`)
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(PlacesList, {name: 'Rails 7'}, null),
    document.getElementById('places-list-container'),
  )
})