import { BrowserRouter, Routes, Route } from "react-router-dom"

//elements
import Header from "./components/header";
import Foorter from "./components/footer";

//user elements
import RautesUserChat from "./components/user/rautesUserChat";

import HomePage from "./pages/homePage";
import ProductDetailsPage from "./pages/productDetailsPage";
import ProductListPage from "./pages/productListPage";
import RegisterPage from "./pages/registerPage";
import CartPage from "./pages/cartPage";
import LoginPage from "./pages/loginPage";

//user
import ProtectedRoutesComponent from "./components/protectedRoutesComponent";
import UserProfilePage from "./pages/user/userProfilePage";
import UserOrderPage from "./pages/user/userOrderPage";
import UserOrderDetailsPage from "./pages/user/userOrderDetailsPage";
import UserCartDetailsPage from "./pages/user/userCartDetailsPage";
import ViewOfProduct from "./pages/viewOfProduct";
import EditProduct from "./pages/user/editProduct";

//admin
import AdminChatPage from "./pages/admin/adminChatPage";
import AdminCreateProdutPage from "./pages/admin/adminCreateProdutPage";
import AdminEditProductPage from "./pages/admin/adminEditProductPage";
import AdminEditUserPage from "./pages/admin/adminEditUserPage";
import AdminOrderDetails from "./pages/admin/adminOrderDetails";
import AdminOrderPage from "./pages/admin/adminOrderPage";
import AdminProductsPage from "./pages/admin/adminProductsPage";
import AdminStatsPage from "./pages/admin/adminStatsPage";
import AdminUserPage from "./pages/admin/adminUserPage";

import TopScroll from "./components/tools/topScroll";

function App() {
  return (
    <BrowserRouter>
      <TopScroll />
      <Header />
      <Routes>
        <Route element={<RautesUserChat />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/lista-porduktow" element={<ProductListPage />} />
          <Route path="/lista-porduktow/:pageNumParam" element={<ProductListPage />} />
          <Route path="/lista-porduktow/kategoria/:categoryName" element={<ProductListPage />} />
          <Route path="/lista-porduktow/kategoria/:categoryName/:pageNumParam" element={<ProductListPage />} />
          <Route path="/lista-porduktow/szukaj/:searchQuery" element={<ProductListPage />} />
          <Route path="/lista-porduktow/szukaj/:searchQuery/:pageNumParam" element={<ProductListPage />} />
          <Route path="/lista-porduktow/kategoria/:categoryName/szukaj/:searchQuery" element={<ProductListPage />} />
          <Route path="/lista-porduktow/kategoria/:categoryName/szukaj/:searchQuery/:pageNumParam" element={<ProductListPage />} />
          <Route path="/szczegoly-poduktow/:id" element={<ProductDetailsPage />} />
          <Route path="" element={<ViewOfProduct />} />
          <Route path="/modyfikuj-produkt" element={<EditProduct />} />
          <Route path="/rejestracja" element={<RegisterPage />} />
          <Route path="/koszyk" element={<CartPage />} />
          <Route path="/logowanie" element={<LoginPage />} />
        </Route>
        <Route path="*" element="Podana strona nie istnieje... 404" />

        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/moje-konto" element={<UserProfilePage />} />
          <Route path="/moje-konto/moje-zamowienia" element={<UserOrderPage />} />
          <Route path="/moje-konto/moje-zamowienia/szczegoly-zamowienia/:id" element={<UserOrderDetailsPage />} />
          <Route path="/moje-konto/szczogoly-koszyka" element={<UserCartDetailsPage />} />
        </Route>

        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin" element={<AdminUserPage />} />
          <Route path="/admin-statystyki" element={<AdminStatsPage />} />
          <Route path="/admin-produkty" element={<AdminProductsPage />} />
          <Route path="/admin-zamowienia" element={<AdminOrderPage />} />
          <Route path="/admin/zamowienia-szczegoly/:id" element={<AdminOrderDetails />} />
          <Route path="/admin-konto-urzytkownika-edytuj/:id" element={<AdminEditUserPage />} />
          <Route path="/admin-konto-urzytkownika" element={<AdminUserPage />} />
          <Route path="/admin-edycja-produktu/:id" element={<AdminEditProductPage />} />
          <Route path="/admin-utworz-produkt" element={<AdminCreateProdutPage />} />
          <Route path="/admin-chat" element={<AdminChatPage />} />
        </Route>
      </Routes>
      <Foorter />
    </BrowserRouter>
  );
}

export default App;
