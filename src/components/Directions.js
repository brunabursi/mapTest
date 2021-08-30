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
      apikey="API_KEY"
      strokeColor="hotpink"
      strokeWidth={3}
    />
  )
}

export default Directions
