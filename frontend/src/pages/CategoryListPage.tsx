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
import { Category } from "../types/Category";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../hooks/categoryHooks";
import { Store } from "../Store";

export default function categoryListPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  // const { data, isLoading, error, refetch } = useGetAdminProdcutsQuery(page);
  const { data, isLoading, error, refetch } = useGetCategoriesQuery();

  const { mutateAsync: deletecategory, isLoading: loadingDelete } =
    useDeleteCategoryMutation();

  useEffect(() => {
    refetch();
  }, [loadingDelete, refetch]);

  const deleteHandler = async (id: string) => {
    if (window.confirm("Al emliminar una categoria, se eliminaran todos los productos de esta categoria. ¿Estás seguro de eliminar esta categoria?")) {
      try {
        deletecategory(id);
        refetch();
        toast.success("category deleted successfully");
        navigate("/categories");
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
          <h1>{lm === "en" ? "Administrar categorías" : "Manage categorys"}</h1>
        </Col>
        <Col className="col text-end">
          <div>
            {/* <Button type="button" onClick={createHandler}> */}
            <Link to="/createcategory">
              <Button type="button">
                {lm === "en" ? "Nueva categoria" : "New category"}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

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
                <th>{lm === "en" ? "Accciones" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((category: Category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>
                      {lm === "en"
                        ? category.name.split("-")[0]
                        : category.name.split("-")[1]}
                    </td>
                    <td>
                      <Link to={`/editcategory/${category.id}`}>
                        <Button
                          type="button"
                          variant="light"
                          // onClick={() => navigate(`/category/${category.id}`)}
                        >
                          {lm === "en" ? "Editar" : "Edit"}
                        </Button>
                      </Link>
                      &nbsp;
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => deleteHandler(String(category.id))}
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
