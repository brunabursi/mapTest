import React from 'react'
import MapViewDirections from 'react-native-maps-directions'

// Como pintar o caminho sem usar essa lib que faz uma chamada no google? TODO

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
