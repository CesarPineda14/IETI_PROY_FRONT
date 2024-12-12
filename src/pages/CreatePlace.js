import React, { useState } from 'react';
import axios from 'axios';
import "../styles/CreatePlace.css";

const CreatePlace = () => {
    const [place, setPlace] = useState({
        name: '',
        description: '',
        password: '',
        foodType: '',
        value: '',
        location: { id: '', lat: '', lon: '', address: '' },
        rating: { id: '', review: '', place: '' },
        products: []
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlace(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNestedChange = (e, nestedField) => {
        const { name, value } = e.target;
        setPlace(prevState => ({
            ...prevState,
            [nestedField]: {
                ...prevState[nestedField],
                [name]: value
            }
        }));
    };

    const handleProductChange = (e, index) => {
        const { name, value } = e.target;
        const updatedProducts = [...place.products];
        updatedProducts[index] = { ...updatedProducts[index], [name]: value };
        setPlace(prevState => ({
            ...prevState,
            products: updatedProducts
        }));
    };

    const addProduct = () => {
        setPlace(prevState => ({
            ...prevState,
            products: [...prevState.products, { id: '', name: '', description: '', category: '', tags: '', price: '', imageUrl: '' }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const placeToSubmit = convertEmptyToNull({...place}); 
        try {
            const token = localStorage.getItem("token");
            await axios.post('http://localhost:37000/place', placeToSubmit, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Place created successfully!');
            resetForm();
        } catch (error) {
            console.error("Error creating place:", error);
            setMessage('Error creating place!');
        }
    };

    const convertEmptyToNull = (obj) => {
        for (const key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                obj[key] = convertEmptyToNull(obj[key]); 
            } else if (obj[key] === '') {
                obj[key] = null; 
            }
        }
        return obj;
    };

    const resetForm = () => {
        setPlace({
            name: '',
            description: '',
            password: '',
            foodType: '',
            value: '',
            location: { id: '', lat: '', lon: '', address: '' },
            rating: { id: '', review: '', place: '' },
            products: []
        });
    };

    return (
        <div className="create-place-container">
            <h2>Create New Place</h2>
            <form className="create-place-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={place.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" name="description" value={place.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={place.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Food Type:</label>
                    <input type="text" name="foodType" value={place.foodType} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Value:</label>
                    <input type="text" name="value" value={place.value} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <h4>Location:</h4>
                    <label>ID:</label>
                    <input type="text" name="id" value={place.location.id} onChange={(e) => handleNestedChange(e, 'location')} />
                    <label>Latitude:</label>
                    <input type="number" name="lat" value={place.location.lat} onChange={(e) => handleNestedChange(e, 'location')} required />
                    <label>Longitude:</label>
                    <input type="number" name="lon" value={place.location.lon} onChange={(e) => handleNestedChange(e, 'location')} required />
                    <label>Address:</label>
                    <input type="text" name="address" value={place.location.address} onChange={(e) => handleNestedChange(e, 'location')} />
                </div>
                <div className="form-group">
                    <h4>Rating:</h4>
                    <label>ID:</label>
                    <input type="text" name="id" value={place.rating.id} onChange={(e) => handleNestedChange(e, 'rating')} />
                    <label>Review:</label>
                    <input type="text" name="review" value={place.rating.review} onChange={(e) => handleNestedChange(e, 'rating')} />
                    <label>Place:</label>
                    <input type="text" name="place" value={place.rating.place} onChange={(e) => handleNestedChange(e, 'rating')} />
                </div>
                <div className="form-group">
                    <h4>Products:</h4>
                    <button type="button" onClick={addProduct}>Add Product</button>
                    {place.products.map((product, index) => (
                        <div key={index} className="product-group">
                            <label>Product Name:</label>
                            <input type="text" name="name" value={product.name} onChange={(e) => handleProductChange(e, index)} />
                            <label>Description:</label>
                            <input type="text" name="description" value={product.description} onChange={(e) => handleProductChange(e, index)} />
                            <label>Category:</label>
                            <input type="text" name="category" value={product.category} onChange={(e) => handleProductChange(e, index)} />
                            <label>Tags:</label>
                            <input type="text" name="tags" value={product.tags} onChange={(e) => handleProductChange(e, index)} />
                            <label>Price:</label>
                            <input type="number" name="price" value={product.price} onChange={(e) => handleProductChange(e, index)} />
                            <label>Image URL:</label>
                            <input type="text" name="imageUrl" value={product.imageUrl} onChange={(e) => handleProductChange(e, index)} />
                        </div>
                    ))}
                </div>
                <button className="submit-button" type="submit">Create Place</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default CreatePlace;
