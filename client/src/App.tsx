import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Sender from "./pages/senderPage"
import Receiver from "./pages/receiverPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Link to={'/sender'}>home page</Link>}></Route>
        <Route path="/sender" element={<Sender />}></Route>
        <Route path="/receiver" element={<Receiver />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
