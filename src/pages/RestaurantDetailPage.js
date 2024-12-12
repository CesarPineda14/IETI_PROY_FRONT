import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "../styles/RestaurantDetailPage.module.css";

const RestaurantDetailPage = () => {
  const { id } = useParams(); 
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:37000/place/getPlace/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className={styles.restaurantDetailPage}>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <p><strong>Tipo de Comida:</strong> {restaurant.foodType}</p>
      <p><strong>Dirección:</strong> {restaurant.location?.address}</p>
      <p><strong>Valoración:</strong> {restaurant.value}</p>

      <h3>Productos</h3>
      <ul>
        {restaurant.products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> - ${product.price}
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetailPage;
