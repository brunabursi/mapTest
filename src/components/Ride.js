import React from 'react'
import MapboxNavigation from '@homee/react-native-mapbox-navigation'
import { View } from 'react-native'

const Ride = ({ destination, origin }) => {
  let rideDestination = Object.values(destination).slice(0, 2)
  let rideOrigin = Object.values(origin).slice(0, 2)
  console.log('ta chamando esse troço')
  return (
    <View style={{
      container: {
        flex: 1,
      },
    }}>
      <MapboxNavigation
        destination={rideDestination}
        origin={rideOrigin}
        shouldSimulateRoute={true}
        onLocationChange={(event) => {
          const { latitude, longitude } = event.nativeEvent;
        }}
        onRouteProgressChange={(event) => {
          const {
            distanceTraveled,
            durationRemaining,
            fractionTraveled,
            distanceRemaining,
          } = event.nativeEvent;
        }}
        onError={(event) => {
          const { message } = event.nativeEvent;
        }}
        onCancelNavigation={() => {
          // User tapped the "X" cancel button in the nav UI
          // or canceled via the OS system tray on android.
          // Do whatever you need to here.
        }}
        onArrive={() => {
          // Called when you arrive at the destination.
        }}
      />
    </View>
  )
}

export default Ride
