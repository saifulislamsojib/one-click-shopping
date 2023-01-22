import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./AddProduct.css";

const AddProduct = ({ products, setProducts }) => {
  const { register, handleSubmit, errors } = useForm();

  const [imageURL, setImageURL] = useState("");

  const [showImageError, setImageError] = useState(false);

  const [isProductAdded, setIsProductAdded] = useState(false);

  const onSubmit = (data) => {
    setIsProductAdded(false);
    if (imageURL) {
      const product = { ...data, imageURL };
      fetch("https://one-click-shopping-server.vercel.app/addProduct", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.inserted) {
            const newProduct = { ...product, _id: result._id };
            const newProducts = [...products, newProduct];
            setProducts(newProducts);
            setIsProductAdded(true);
          }
        });
    } else {
      setImageError(true);
    }
  };

  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set("key", process.env.REACT_APP_IMAGE_KEY);
    imageData.append("image", e.target.files[0]);

    fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imageData,
    })
      .then((res) => res.json())
      .then((result) => setImageURL(result.data.display_url));
    setImageError(false);
  };

  return (
    <>
      <h1 className="mb-4 text-center">Add Product</h1>
      <Form
        className="add-product-form bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row className="mb-3">
          <Col className="mb-3" md={6}>
            <Form.Label>Product name</Form.Label>
            <Form.Control
              name="name"
              ref={register({ required: true })}
              placeholder="Product name"
            />
            {errors.name && (
              <span className="text-danger">Name is required</span>
            )}
          </Col>
          <Col className="mb-3" md={6}>
            <Form.Label>Product weight</Form.Label>
            <Form.Control
              name="weight"
              ref={register({ required: true })}
              placeholder="Product weight"
            />
            {errors.weight && (
              <span className="text-danger">Weight is required</span>
            )}
          </Col>
          <Col className="mb-3" md={6}>
            <Form.Label>Product price</Form.Label>
            <Form.Control
              name="price"
              ref={register({ required: true })}
              placeholder="Product price"
            />
            {errors.price && (
              <span className="text-danger">price is required</span>
            )}
          </Col>
          <Col className="mb-3" md={6}>
            <Form.Label className="d-block">Upload Photo</Form.Label>
            <Form.Label
              className="btn btn-outline-success px-4"
              htmlFor="imageUpload"
            >
              <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Photo
            </Form.Label>
            {showImageError && (
              <span className="text-danger">image is required</span>
            )}
            <Form.File
              onChange={handleImageUpload}
              id="imageUpload"
              className="d-none"
            />
          </Col>
        </Row>
        <Button
          disabled={imageURL === ""}
          type="submit"
          variant="success"
          className="d-block ml-auto"
        >
          Save
        </Button>
        {isProductAdded && (
          <h3 className="text-center text-success my-3">
            Product Added Successfully
          </h3>
        )}
      </Form>
    </>
  );
};

export default AddProduct;
