import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Product } from "../types/Product";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { useContext } from "react";
import { Store } from "../Store";
// import { Link } from "react-router-dom";

function HomePage() {
  const { state } = useContext(Store);
  const {  lm} = state;
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <div>
      <Helmet>
        <title>Pavas</title>
      </Helmet>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <>
              {console.log("El valor en data es latest",data)}
          <div className="products">
            <Row sm={6} md={4} lg={3}>
              {Array.isArray(data) && data!.map((product: Product) => (
                <Col key={product.id} sm={6} md={4} lg={3} >
                  <ProductItem product={product}></ProductItem>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </div>
  );
}
export default HomePage;
