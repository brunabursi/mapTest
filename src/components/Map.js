import React, { useEffect, useState, useRef, Fragment } from 'react'
import { StyleSheet, View, PermissionsAndroid, Image, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import Geocoder from "react-native-geocoding"
import Search from './Search'
import Directions from './Directions'
import Ride from './Ride'
import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "../styles/mapStyle"
import backImage from "../assets/back_arrow.png";

Geocoder.init('AIzaSyAts8oN0ApQZQljA_0dAC0VML_5JQhWGwo', { language: 'pt' })

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 40.741895,
    longitude: -73.989308,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  })
  const [destination, setDestination] = useState(null)
  const [location, setLocation] = useState(null)
  const [duration, setDuration] = useState(null)
  const [onRide, setOnRide] = useState(null)
  const mapViewRef = useRef(null)

  // Pede permissão e define local atual do usuário 
  useEffect(async () => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (granted) {
      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords
          setRegion({ ...region, latitude, longitude })

          const response = await Geocoder.from({ latitude, longitude })
          const address = response.results[0].formatted_address
          setLocation(address.substring(0, address.indexOf(',')))
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      )
    } else {
      console.log('permição negada')
    }
  }, [])

  // useEffect(() => {
  //   if (mapViewRef.current && destination) {
  //     mapViewRef.current.animateCamera(
  //       {
  //         center: {
  //           latitude: destination.latitude,
  //           longitude: destination.longitude
  //         },
  //         zoom: 15
  //       },
  //       5000
  //     );
  //   }
  // }, [mapViewRef, destination]);

  // Set location como o nome da rua e destination como lat, long e title quando o usuário clica em uma opção da lista
  const handleLocationSelected = (data, { geometry }) => {
    const { location: { lat: latitude, lng: longitude } } = geometry
    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text
    })
  }
  // Traça a rota entre as duas localidades
  const onReady = result => {
    setDuration(Math.floor(result.duration))
    // func que faz o mapa dar zoom out quando encontra a rota e por algum motivo não funciona com o setState junto TODO
    mapViewRef.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 10),
        bottom: (height / 10),
        left: (width / 10),
        top: (height / 10),
      },
      animated: true
    })
  }

  // Quando o usuário faz a ação de voltar, apaga o destination
  const handleBack = () => {
    setDestination(null)
  }
  return (
    <View style={styles.container}>
      {!onRide && (
        <MapView
          style={{ flex: 1 }}
          region={region}
          onRegionChangeComplete={region => {
            console.log(region)
            // setRegion(region)
          }}
          showsUserLocation
          loadingEnabled
          ref={mapViewRef}
        >
          <Marker
            coordinate={region}
            anchor={{ x: 0, y: 0 }}
          />
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={onReady}
              />
              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
              >
              </Marker>
              <Marker
                coordinate={region}
                anchor={{ x: 0, y: 0 }}
              >
                {/* <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox> */}
              </Marker>
            </Fragment>
          )}
        </MapView>
      )}
      {destination ? (
        <Fragment>
          <Back onPress={handleBack}>
            <Image source={backImage} />
          </Back>
        </Fragment>
      ) : (
        <Search onLocationSelected={handleLocationSelected} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map
