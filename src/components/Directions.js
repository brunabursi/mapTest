import React from 'react'
import MapViewDirections from 'react-native-maps-directions'

const Directions = ({ destination, origin, onReady }) => {
  return (
    <MapViewDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      mode="DRIVING"
      timePrecision="now"
      apikey="AIzaSyAts8oN0ApQZQljA_0dAC0VML_5JQhWGwo"
      strokeColor="hotpink"
      strokeWidth={3}
    />
  )
}

export default Directions
