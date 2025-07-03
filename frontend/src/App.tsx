import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "react-bootstrap/esm/Navbar";
import Nav from "react-bootstrap/esm/Nav";
// import NavDropdown from "react-bootstrap/esm/NavDropdown";
import Container from "react-bootstrap/esm/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import Button from "react-bootstrap/esm/Button";
import { getError } from "./utils";

import { ApiError } from "./types/ApiError";
// import { useGetCategoriesQuery } from "./hooks/productHooks";
import { useGetCategoriesQuery } from "./hooks/categoryHooks";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import { ListGroup, Tooltip, OverlayTrigger } from "react-bootstrap";

function App() {
  const { state, dispatch } = useContext(Store);
  const { mode, lm, fullBox } = state;

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
    // customizing the body class for the light background color, otherwise it will be the default light color white.
    if (mode === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [mode]);
  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  // *cambio de idioma
  useEffect(() => {
    document.body.setAttribute("data-bs-language", lm);
  }, [lm]);
  const switchLanguageModeHandler = () => {
    dispatch({ type: "SWITCH_LANGUAGE_MODE" });
  };

  const categoriesHandler = () => {
    setSidebarIsOpen(!sidebarIsOpen);
    // Código para subir el scroll:
    window.scrollTo({
      // controla el scroll
      behavior: "smooth", //comportamiento
      top: 0, // arriba igual a 0 nos lleva al principio
      //left:0 // cuando existe scroll horizontal nos llevaria a la izquierda.
    });
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  // console.log("El valor de categories es:", categories);

  const renderTooltip = (message: string) => (props: any) =>
    (
      <Tooltip id="nav-tooltip" {...props}>
        {message}
      </Tooltip>
    );

  return (
    <div
      className={
        sidebarIsOpen
          ? fullBox
            ? "site-container active-cont d-flex flex-column full-box"
            : "site-container active-cont d-flex flex-column"
          : fullBox
          ? "site-container d-flex flex-column full-box"
          : "site-container d-flex flex-column"
      }
      id="Principal_container"
      style={{ marginTop: "200px" }}
    >
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar
          className="d-flex flex-column align-items-stretch p-2 pb-0 mb-3 position-fixed w-100"
          bg="dark"
          variant="dark"
          expand="lg"
          style={
            sidebarIsOpen
              ? { zIndex: 100, marginTop: "-200px", marginLeft: "-340px" }
              : { zIndex: 100, marginTop: "-200px" }
          }
          id="Navbar"
        >
          <div className="d-flex justify-content-between align-items-center">
            <LinkContainer to="/" className="header-link">
              <Navbar.Brand>
                <img
                  src="/images/pavas.png"
                  alt="Pava"
                  style={{ borderRadius: "5px", width: "40px" }}
                />
                <i className="fa fa-home" />
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Collapse>
              <Nav className="w-100 justify-content-end">
                <img
                  src="/images/pavas_stayconnected.png"
                  alt="Pavas"
                  style={{ borderRadius: "5px", width: "10rem" }}
                />

                {/* //*CODIGO DEL CAMBIO DE IDIOMA  */}
                <OverlayTrigger
                  placement="left"
                  overlay={renderTooltip(
                    lm === "en"
                      ? "Español. Change to english"
                      : "English. Cambiar a español"
                  )}
                >
                  <Link
                    to="#"
                    className="nav-link header-link"
                    onClick={switchLanguageModeHandler}
                  >
                    <i className="fa fa-language"></i>{" "}
                    {lm === "en" ? "Sp" : "En"}
                  </Link>
                </OverlayTrigger>
                {/* //*CODIGO DEL CAMBIO DE IDIOMA */}
                <OverlayTrigger
                  placement="left"
                  overlay={renderTooltip(
                    lm === "en"
                      ? "Cambiar modo claro-oscuro"
                      : "Change ligh-dark mode"
                  )}
                >
                  <Link
                    to="#"
                    className="nav-link header-link"
                    onClick={switchModeHandler}
                  >
                    <i
                      className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                    ></i>{" "}
                  </Link>
                </OverlayTrigger>
              </Nav>
            </Navbar.Collapse>
          </div>
          <div className="sub-header">
            <div className="d-flex">
              <Link
                to="#"
                className="nav-link header-link p-1"
                onClick={categoriesHandler}
              >
                <i className="fas fa-bars"></i>{" "}
                {lm === "en" ? "Categorías" : "Categories"}
              </Link>
              <Link className="nav-link header-link p-1 px-3" to={`products`}>
                {lm === "en" ? "Administrar Producto" : "Generate Product"}
              </Link>
              <Link className="nav-link header-link p-1 px-3" to={`categories`}>
                {lm === "en" ? "Administrar Categoria" : "Generate Category"}
              </Link>
              <div
                className="developer d-none d-lg-inline"
                style={{ marginLeft: "auto", color: "gray" }}
              ></div>
            </div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
      </header>
      {sidebarIsOpen && (
        <div
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}
      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column bg-dark"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column bg-dark"
        }
      >
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              {" "}
              <strong>{lm == "en" ? "Categorias" : "Categories"}</strong>
              <Button
                variant={mode}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiError)}
            </MessageBox>
          ) : (
            categories!.map((category: any) => (
              <ListGroup.Item action key={category.id}>
                <LinkContainer
                  to={{ pathname: "/search", search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category.name}</Nav.Link>
                  {/* <Nav.Link>{category}</Nav.Link> */}
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
      <main>
        <Container fluid>
          <Outlet />
        </Container>
      </main>
      <footer className="footer mt-auto py-1 bg-dark text-white">
        <div className="text-center">
          {lm === "en"
            ? "Desarrollado por Jonnathan Monroy (Desarrollador de software) "
            : " Developed by Jonnathan Monroy (Software Developer) "}
          <a
            href="https://wa.me/573022264607?text=Hola%20me%20interesa%20tu%20trabajo!"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              style={{
                backgroundColor: "#348812",
                borderRadius: "30%",
                width: "1.2rem",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
