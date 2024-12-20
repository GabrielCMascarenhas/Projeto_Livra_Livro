import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../assets/images/logo-passaro.svg";

// interceptar o submit do form
// previnir que o formulário recarregue toda a página
// definir os campos obrigatórios e suas configurações
// pegar os valores preenchidos nos inputs
// chamar a API passando o payload solicitado
// Endpoint: https://apibase2-0bttgosp.b4a.run/auth/signin
// payload: { email: "string", senha: "string"}
// Método POST
// receber e tratar o retorno da api

export function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value.trim();
    const senha = event.target.senha.value.trim();

    if (!email || !senha) {
      alert("Preencha e-mail e senha");
      return;
    }

    try {
      const response = await fetch(
        "https://apibase2-0bttgosp.b4a.run/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );
      if (response.status != 200) {
        throw new Error();
      }
      // Retorna um jsonwebtoken(JWT)
      const jsonWebToken = await response.text();

      // TO-DO
      // Armazenar o JSON WebToken em algum lugar
      console.log("Login funcionou", jsonWebToken);

      // vai ficar salvo no contexto (context) da aplicação
      login(jsonWebToken);

      // Redirecionar o usuário para a rota HOME
      navigate("/");
    } catch (error) {
      alert("Usuário ou Senha Inválidos");
    }
  };

  return (
    <main className="d-flex flex-column align-items-center">
      <img src={logo} alt="" width="140" class="my-3 mt-5" />
      <h1 className="mb-4 color-teal weight-font">Login</h1>
      <form onSubmit={handleSubmitLogin}>
        <div className="mb-3">
          <label for="" class="form-label color-teal">
            Email:
          </label>
          <input
            type="email"
            className="form-control border-pixels"
            name="email"
            required
          />
        </div>

        <div className="mb-3">
          <label for="" class="form-label color-teal">
            Senha:
          </label>
          <input
            type="password"
            className="form-control border-pixels"
            minLength={4}
            maxLength={12}
            name="senha"
            required
          />
        </div>

        <button
          type="submit"
          className="btn custom-teal mb-4 mt-1 onclick-button"
        >
          Acessar
        </button>
      </form>

      <Link to="/register" class="back-teal onclick-link">
        Crie uma conta
      </Link>
    </main>
  );
}
