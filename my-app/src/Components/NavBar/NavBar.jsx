import Logo from "../../Assets/Logo Removed (2).png";
import { useCustomCursor } from "../Cursor/Cusror";
import { Link } from "react-router-dom";
import ButtonElement from "../Button/ButtonElement";
import AuthContext from "../../Context/AuthContext";
import "./NavBar.css";
import { Avatar, Dropdown, Space } from "antd";
import { User2Icon } from "lucide-react";
import { useContext } from "react";

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();

  const items = [
    {
      key: "1",
      label: "ELement 3",
    },
    {
      key: "2",
      label: "Element 1",
    },
    {
      key: "3",
      label: "Element 1",
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  return (
    <div className="NavBar">
      <div className="container">
        <div className="Header">
          <ul className="Links">
            <li>
              <Link
                to="/"
                className="btn"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="btn"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="btn"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                Blog
              </Link>
            </li>
          </ul>
          <div className="logo">
            <img src={Logo} alt="" />
          </div>

          <div className="Btn-Profile-section">
            {!isLoggedIn ? (
              <Link className="btn" to="/logIn">
                <ButtonElement text={"Join"}></ButtonElement>
              </Link>
            ) : (
              <Dropdown menu={{ items }}>
                <Space>
                  <div className="UserLogo">
                    <Avatar size={"large"} icon={<User2Icon />} />
                  </div>
                </Space>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
