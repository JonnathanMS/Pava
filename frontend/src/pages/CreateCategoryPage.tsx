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
import { useCreateCategoryMutation } from "../hooks/categoryHooks";
import { Category } from "../types/Category";

export default function CreateCategoryPage() {
  const navigate = useNavigate();
  // const params = useParams();

  const [name, setName] = useState("");


  const { mutateAsync: createCategory, isLoading: loadingCreate } =
    useCreateCategoryMutation();


    const submitHandler = async () => {
    if (window.confirm("Agregar la nueva categoria?")) {
      try {
        createHandler();
        toast.success("Category created successfully");
        navigate("/categories");
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    }
  };

    const createHandler = async () => {
    const category:Category = {
      name,
    };
    const data = await createCategory(category);
    }
    


  return (
    <Container className="small-container">
      <Helmet>
        <title>Nueva categoria </title>
      </Helmet>
      <h1>Nueva Categoria </h1>

      <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <Button type="submit">
              Agregar Categoria
            </Button>
          </div>
        </Form>
    </Container>
  );
}
