import Card from "react-bootstrap/esm/Card";
import { useContext } from "react";
import { Store } from "../Store";
import { Product } from "../types/Product";

function ProductItem({ product }: { product: Product }) {
  const { state } = useContext(Store);
  const { lm } = state;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <Card
        border="success"
        style={{
          width: 350,
          minHeight: 250,
          minWidth: 250,
          maxWidth: '100%',
          height: 'fit-content',
        }}
      >
        <Card.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <div>
            <Card.Title className="text-success-emphasis">
              {lm === "en"
                ? product.name.split("-")[0]
                : product.name.split("-")[1]}
            </Card.Title>
            <Card.Text>
              {lm === "en"
                ? "Categoria: " + product?.category?.name
                : "Category: "}
            </Card.Text>
            <Card.Text>
              {lm === "en"
                ? product.description.split("-")[0]
                : product.description.split("-")[1]}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
export default ProductItem;
