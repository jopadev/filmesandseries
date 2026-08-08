import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListaCatalogo from '../pages/ListaCatalogo';
import CriarCatalogo from '../pages/CriarCatalogo';
import EditarCatalogo from '../pages/EditarCatalogo';
import FormCatalogo from '../pages/FormCatalogo';

// Configuração de rotas da aplicação
const router = createBrowserRouter([
  {
    path: "/",
    element: <ListaCatalogo />, // Tela que lista todos os filmes/séries
  },
  {
    path: "/novo",
    element: <FormCatalogo />, // Modo Inclusão
  },
  {
    path: "/editar/:id",
    element: <FormCatalogo />, // Modo Edição (captura o ID da URL)
  }
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
