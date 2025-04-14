import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cards from "./pages/TelaCard/Cards"
import Cadastro from "./pages/Cadastro/Cadastro"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Cards/>}/>
    <Route path="/cadastro" element={<Cadastro/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App