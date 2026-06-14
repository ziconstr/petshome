import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PetPage from "./pages/PetPage";
import CreatePetPage from "./pages/CreatePetPage";
import EditPetPage from "./pages/EditPetPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-stone-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pet/create" element={<CreatePetPage />} />
            <Route path="/pet/edit/:id" element={<EditPetPage />} />
            <Route path="/pet/:id" element={<PetPage />} />
            <Route path="/account/login" element={<LoginPage />} />
            <Route path="/account/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
