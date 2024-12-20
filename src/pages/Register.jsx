import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-passaro.svg";
import InputMask from "react-input-mask";
import "../assets/global.css";

export function Register() {
  const navigate = useNavigate();

  // Função para validar CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto;

    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    // Segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  const handleFormCadastroSubmit = async (event) => {
    event.preventDefault();
    const nome = event.target.nome.value.trim();
    const email = event.target.email.value.trim();
    const senha = event.target.senha.value.trim();
    const endereco = event.target.endereco.value.trim();
    const cpf = event.target.cpf.value.trim();

    // Validação do CPF antes de enviar o formulário
    if (!validarCPF(cpf)) {
      alert("CPF inválido! Por favor, insira um CPF válido.");
      return;
    }

    // Validação do Nome Completo
    if (!nome.includes(" ") || nome.split(" ").length < 2) {
      alert("Por favor, insira seu nome completo (nome e sobrenome).");
      return;
    }

    try {
      const response = await fetch(
        "https://apibase2-0bttgosp.b4a.run/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            senha,
            endereco,
            cpf,
          }),
        }
      );
      if (response.status != 201) {
        throw new Error();
      }
      alert("Cadastro efetuado com sucesso");

      // Redirecionar o usuário para a rota HOME
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Usuário ou Senha Inválidos");
    }
  };
  return (
    <main className="d-flex flex-column align-items-center">
      <img src={logo} alt="" width="140" class="my-3 mt-5" />
      <h1 className="mb-4 color-teal weight-font">Registre-se</h1>
      <form onSubmit={handleFormCadastroSubmit}>
        <div className="mb-3">
          <label for="" class="form-label color-teal">
            Nome Completo:
          </label>
          <input
            name="nome"
            type="text"
            className="form-control border-pixels"
            required
          />
        </div>

        <div className="mb-3">
          <label for="" class="form-label color-teal ">
            Email:
          </label>
          <input
            name="email"
            type="email"
            className="form-control border-pixels"
            required
          />
        </div>

        <div className="mb-3">
          <label for="" class="form-label color-teal">
            Senha:
          </label>
          <input
            name="senha"
            type="password"
            className="form-control border-pixels"
            required
          />
        </div>

        <div className="mb-3 ">
          <label for="" class="form-label color-teal">
            Endereço:
          </label>
          <input
            name="endereco"
            type="text"
            className="form-control border-pixels"
            required
          />
        </div>

        <div className="mb-3">
          <label for="" class="form-label color-teal">
            CPF:
          </label>

          <InputMask
            mask="999.999.999-99"
            name="cpf"
            className="form-control border-pixels input-placeholder"
            placeholder="000.000.000-00"
            required
          />
        </div>

        <button type="submit" class="btn custom-teal mb-4 mt-1 onclick-button">
          Acessar
        </button>
      </form>

      <Link to="/login" class="back-teal onclick-link">
        Voltar para login
      </Link>
    </main>
  );
}
