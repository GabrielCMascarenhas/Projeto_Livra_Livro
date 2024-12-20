// 1 - criar uma rota protegida no react router dom
// 1.1 - criar um contexto ContextAPI (novo)
// 1.2 - Integrar este contexto com o react router dom
// 1.3 - Criar uma rota protegida
// 2 - Inserir o mapa na página
// 2.1 - API key do google maps
// 2.2 - Ao clicar no mapa cadastrar novos markers com descrição*
// 2.3 - Exibir markers já cadastrados no banco de dados
// 2.3.1 - Criar uma janelinha modal com o campo de descrição
// 3 - Criar um header da página de mapa
// 3.1 - Criar o botão de logout

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
