import MainPage from "./Components/MainPage/MainPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={  <MainPage/>} />
       </Routes>
    
    </div>
  );
}

export default App;
