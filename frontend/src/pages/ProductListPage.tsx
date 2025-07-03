import React, { useContext, useEffect, useReducer } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Product } from "../types/Product";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../hooks/productHooks";
import { Store } from "../Store";

export default function ProductListPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = Number(sp.get("page") || 1);

  // const { data, isLoading, error, refetch } = useGetAdminProdcutsQuery(page);
  const { data, isLoading, error, refetch } = useGetProductsQuery();
  console.log("data nuevo", data);

  const { mutateAsync: createProduct, isLoading: loadingCreate } =
    useCreateProductMutation();

  const createHandler = async () => {
    if (window.confirm("Are you sure to create?")) {
      try {
        const data = await createProduct();
        refetch();
        toast.success("Product created successfully");
        navigate(`/product/${data.product.id}`);
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    }
  };
  const { mutateAsync: deleteProduct, isLoading: loadingDelete } =
    useDeleteProductMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        deleteProduct(id);
        refetch();
        toast.success("Product deleted successfully");
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    }
  };

  const {
    state: { lm },
  } = useContext(Store);
  return (
    <div>
      <Row>
        <Col>
          <h1>{lm === "en" ? "Productos" : "Products"}</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              {lm === "en" ? "Nuevo Producto" : "New Product"}
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{lm === "en" ? "Nombre" : "Name"}</th>
                <th>{lm === "en" ? "Precio" : "Price"}</th>
                <th>{lm === "en" ? "Categoría" : "Category"}</th>
                <th>{lm === "en" ? "Descripción" : "Description"}</th>
                <th>{lm === "en" ? "Accciones" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {data!.map((product:Product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{lm==="en"?product.name.split("-")[0]:product.name.split("-")[1]}</td>
                  <td>{product.price}</td>
                  <td>{product.category_id}</td>
                  <td>{product.description}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      // onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {lm === "en" ? "Editar" : "Edit"}
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteHandler(product.description)}
                    >
                      {lm === "en" ? "Eliminar" : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
