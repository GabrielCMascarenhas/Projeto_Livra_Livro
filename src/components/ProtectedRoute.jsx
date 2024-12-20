import { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function ProtectedRoute({ children }) {
  // acessar o estado que está salvo na context api e pedir se o usuário está logado,
  // se não, retorna um redirecionamento para a tela de login
  // se sim, retorna o componente children
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
