import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";  
import "leaflet/dist/leaflet.css";
import styles from "../styles/HomePage.module.css";



const StarRating = ({ rating }) => {
    const parseRating = (ratingStr) => {
        console.log(rating)
      if (!ratingStr) return 0;
      const match = ratingStr.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };
  
    const numericRating = parseRating(rating);
    
    return (
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`${styles.star} ${star <= numericRating ? styles.starFilled : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  const Markers = ({ places }) => {
    return (
      <>
        {places.map((place) =>
          place.location?.lat && place.location?.lon ? (
            <Marker
              key={place.id}
              position={[place.location.lat, place.location.lon]}
              icon={
                new L.Icon({
                  iconUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                })
              }
            >
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.location.address}
                <br />
                <em>{place.description}</em>
                <br />
                <StarRating rating={place.value} />
                <br />
                <Link to={`/restaurant/${place.id}`}>Ver Detalles</Link>
              </Popup>
            </Marker>
          ) : null
        )}
      </>
    );
  };
  
  const HomePage = () => {
    const [places, setPlaces] = useState([]);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      axios
        .get("http://localhost:37000/place", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPlaces(response.data);
        })
        .catch((error) => {
          console.error("Error fetching places:", error);
        });
    }, []);
  
    return (
      <div className={styles.homePage}>
        <h2 className={styles.pageHeader}>Restaurantes Cercanos</h2>
  
        <MapContainer
          className={styles.mapContainer}
          center={[4.782849884402007, -74.04261453329269]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Markers places={places} />
        </MapContainer>
  
        <div className={styles.restaurantList}>
          <h3 className={styles.pageHeader}>Lista de Restaurantes</h3>
          {places.map((place) => (
            <div key={place.id} className={styles.restaurantItem}>
              <div className={styles.restaurantDetails}>
                <div className={styles.restaurantName}>{place.name}</div>
                <div className={styles.restaurantDescription}>{place.description}</div>
                <div className={styles.restaurantAddress}>{place.location?.address}</div>
                <StarRating rating={place.value} />
                <Link to={`/restaurant/${place.id}`}>Ver Detalles</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HomePage;