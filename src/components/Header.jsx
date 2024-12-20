import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import logo from "../assets/images/logo-passaro.svg";

export function Header() {
  const { logout } = useContext(UserContext);
  return (
    <header
      className="navbar body b-bottom border-body d-flex p-2"
      data-bs-theme="dark"
    >
      <img src={logo} alt="" width="80" class="my-1 mt-1" />
      <button
        className="btn custom-teal onclick-button"
        onClick={() => logout()}
      >
        Sair
      </button>
    </header>
  );
}
