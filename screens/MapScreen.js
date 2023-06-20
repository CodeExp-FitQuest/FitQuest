import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.005;

export default function AnimatedMarkers() {
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const coordinateRef = useRef(
    new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  );

  useEffect(() => {
    let isMounted = true;
    let prevLatLng = null; // Add this line

    const updateLocation = (newLatLng) => {
      if (isMounted) {
        coordinateRef.current.timing(newLatLng).start();
        setLocation(newLatLng);
        setRouteCoordinates((prevCoordinates) => [...prevCoordinates, newLatLng]);

        if (prevLatLng) {
          const distance = calculateDistance(
            prevLatLng.latitude,
            prevLatLng.longitude,
            newLatLng.latitude,
            newLatLng.longitude
          );
          setDistanceTravelled((prevDistance) => prevDistance + distance);
        }

        prevLatLng = newLatLng; // Update the previous location
      }
    };

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission not granted");
        return;
      }

      const watchLocation = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          updateLocation({ latitude, longitude });
        }
      );

      return () => {
        isMounted = false;
        watchLocation.remove();
      };
    })();
  }, []);

  const getMapRegion = () => ({
    latitude: location?.latitude || LATITUDE,
    longitude: location?.longitude || LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          showsUserLocation
          followsUserLocation
          loadingEnabled
          region={getMapRegion()}
        >
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={5}
            strokeColor="#00BFFF"
          />
          <Marker.Animated
            coordinate={coordinateRef.current}
            title="Your Location"
          />
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.bubble, styles.button]}>
          <Text style={styles.bottomBarContent}>
            {parseFloat(distanceTravelled).toFixed(2)} km
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  bottomBarContent: {
    fontSize: 16,
    color: "#000",
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
