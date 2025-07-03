import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import { ApiError } from "../types/ApiError";
import { useGetCategoriesQuery } from "../hooks/categoryHooks";
import { useCreateProductMutation } from "../hooks/productHooks";
import { Product } from "../types/Product";
import { Category } from "../types/Category";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category_id, setCategory_id] = useState(1);
  const [description, setDescription] = useState("");

  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const { mutateAsync: createProduct, isLoading: loadingCreate } =
    useCreateProductMutation();


    const submitHandler = async () => {
    if (window.confirm("Agregar el nuevo producto?")) {
      try {
        createHandler();
        toast.success("Product created successfully");
        navigate("/products");
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    }
  };

    const createHandler = async () => {
    const product:Product = {
      name,
      price,
      category_id,
      description,
    };
    await createProduct(product);
    }
    


  return (
    <Container className="small-container">
      <Helmet>
        <title>Nuevo producto </title>
      </Helmet>
      <h1>Nuevo Producto </h1>

      <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </Form.Group>

            <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              value={category_id}
              onChange={(e) => setCategory_id(Number(e.target.value))}
              required
              disabled={isLoading}
            >
              <option value="">Seleccione una categoría</option>
              {categories &&
              categories.map((cat:Category) => (
                <option key={cat.id} value={cat.id}>
                {cat.name}
                </option>
              ))}
              
            </Form.Select>
            {error as ApiError && (
              <div className="text-danger">{String(getError(error as ApiError))}</div>
            )}
            </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">
              Agregar producto
            </Button>
          </div>
        </Form>
    </Container>
  );
}
