import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Sender from "./pages/senderPage"
import Receiver from "./pages/receiverPage"

function App() {

  function Home() {
    return (
      <div>
        <h1>Home Page</h1>
        <nav>
          <Link to={'/sender'} target="_blank">sender page</Link>
          <br></br>
          <Link to={'/receiver'} target="_blank">receiver page</Link>
        </nav>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sender" element={<Sender />}></Route>
        <Route path="/receiver" element={<Receiver />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
