import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ListPage from "./pages/ListPage";
import EditPage from "./pages/EditPage";
import ShowPage from "./pages/ShowPage";
import AdminPage from "./pages/AdminPage";

const routes = [
    {
      path : '/',
      component : HomePage,
    },
    {
      path : '/blogs',
      component : ListPage,
    },
    {
      path : '/admin',
      component : AdminPage,
    },
    {
      path : '/blogs/create',
      component : CreatePage,
    },
    {
      path : '/blogs/:id/edit',
      component : EditPage,
    },
    // 순서 제일 마지막에 두기(아니면 중간에 가로챈다.)
    {
      path : '/blogs/:id',
      component : ShowPage,
    },
  ];

export default routes;