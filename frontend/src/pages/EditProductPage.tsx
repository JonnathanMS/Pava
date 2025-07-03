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
import { useUpdateProductMutation, useGetProductDetailsQuery } from "../hooks/productHooks";

export default function EditProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category_id, setCategory_id] = useState(1);
  const [description, setDescription] = useState("");

  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const {
    data: product,
    isLoading: isLoadingProduct,
    error: errorProduct,
  } = useGetProductDetailsQuery(productId!);



  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory_id(product.category_id);
    }
  }, [product]);

      const { mutateAsync: updateProduct, isLoading: loadingUpdate } =
    useUpdateProductMutation();

    const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await updateProduct({
        id: Number(productId!),
        name,
        price,
        category_id,
        description,
      });
      toast.success("Product updated successfully");
      navigate("/products");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };


  return (
    <Container className="small-container">
      <Helmet>
        <title>Editar producto </title>
        {/* <title>Edit Product {productId}</title> */}
      </Helmet>
      <h1>Editar Producto </h1>

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
              categories.map((cat: { id: number; name: string }) => (
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
              Editar producto
            </Button>
          </div>
        </Form>
    </Container>
  );
}
