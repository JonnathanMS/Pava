import Card from "react-bootstrap/esm/Card";

import { useContext } from "react";
import { Store } from "../Store";
import { Product } from "../types/Product";

function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store);
  const {
    lm,
  } = state;

  return (
<Card border="success" style={{ margin: '20px 20px', height: 'fit-content', minHeight: '90%'}}>

      <Card.Body
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
            <Card.Title className="text-success-emphasis">{lm==="en"?product.name.split("-")[0]:product.name.split("-")[1]}</Card.Title>
          
          <Card.Text>{lm==="en"?"Categoria: "+product.category.name:"Category: "}</Card.Text>
          <Card.Text>{lm==="en"?product.description.split("-")[0]:product.description.split("-")[1]}</Card.Text>
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProductItem;
