import { Route, Routes} from 'react-router-dom';
import HomePage from "./components/HomePage";
import ViewListing from "./components/ViewListing.jsx";
import CreateListing from "./components/CreateListing.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/vehicle/:id" element={<ViewListing />}/>
            <Route path="/ViewListig" element={<ViewListing />}/>
            <Route path="/CreateListing" element={<CreateListing />}/>
            <Route path="/UpdateListing/:id" element={<CreateListing />}/>
        </Routes>
    )
}

export default App
