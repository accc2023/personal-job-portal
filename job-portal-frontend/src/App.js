import { Search } from '@mui/icons-material';
import './App.css';
import AllPosts from './components/AllPosts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './components/Create';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import SearchResults from './components/SearchResults';
import HuntJobs from "./components/HuntJobs";

function App() {
    //const location = useLocation();
    //const queryParams = new URLSearchParams(location.search);
    //const searchQuery = queryParams.get("keyword");
  return (
  <>
   <BrowserRouter>
       <Navbar/>
   <Routes>
   <Route path='/' element={<AllPosts/>}/>

       {/*<Route path="/" element={<AllPosts />} />*/}
       {/*<Route path="/all-posts" element={<AllPosts searchQuery={searchQuery} />} />*/}
       <Route path="/search-results" element={<SearchResults />} />
       <Route path="/" element={<AllPosts />} />
       <Route path="/hunt-jobs" element={<HuntJobs />} />

       <Route path="/create" element={<Create />} />
   <Route path="/edit" element={<Edit />} />
   </Routes>
   </BrowserRouter> 
  </>
  );
}

export default App;
