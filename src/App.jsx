import { Routes, Route } from "react-router";
import PostFeed from "./PostFeed";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostFeed />} />
    </Routes>
  )
}

export default App;