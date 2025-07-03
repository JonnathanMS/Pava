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
import { useUpdateCategoryMutation, useGetCategoryDetailsQuery } from "../hooks/categoryHooks";

export default function EditCategoryPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: categoryId } = params;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category_id, setCategory_id] = useState(1);
  const [description, setDescription] = useState("");

  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const {
    data: category,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useGetCategoryDetailsQuery(categoryId!);



  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

      const { mutateAsync: updateCategory, isLoading: loadingUpdate } =
    useUpdateCategoryMutation();

    const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await updateCategory({
        id: Number(categoryId!),
        name,
      });
      toast.success("category updated successfully");
      navigate("/categories");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };


  return (
    <Container className="small-container">
      <Helmet>
        <title>Editar categoria </title>
        {/* <title>Edit category {categoryId}</title> */}
      </Helmet>
      <h1>Editar categoria </h1>

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
              Editar categoria
            </Button>
          </div>
        </Form>
    </Container>
  );
}
