import "../css/Header.css";
import { useAuthValue } from "../contexts/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <>
      <Nav
        sticky="top"
        className={`justify-content-end ps-2 pe-2 ${!user ? "box-shadow" : ""}`}
      >
        {" "}
        <div className="d-flex">
          {!user && (
            <>
              <Nav.Item>
                <Nav.Link eventKey="link-1">
                  <Link className="Link" to={"/Login"}>
                    Logar
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">
                  <Link className="Link" to={"/Register"}>
                    Registrar
                  </Link>
                </Nav.Link>
              </Nav.Item>
            </>
          )}
          {user && (
            <div className="d-flex  hello-user align-items-center">
              <NavDropdown
                className="Link "
                title={`Olá ${user.displayName}`}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item className="logOut-button" onClick={logout}>
                  {" "}
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          )}
        </div>
      </Nav>
    </>
  );
}

export default Header;
