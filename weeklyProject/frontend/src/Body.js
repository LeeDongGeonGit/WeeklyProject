import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/main";
import WriteRecipe from "./components/WriteRecipe";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import RecipeDetail from "./components/RecipeDetail";
const Body = ()=>{
    return(<>
        <Header/>
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/write" element={<WriteRecipe/>}/>
                <Route path="/detail/:id" element={<RecipeDetail/>}/>
            </Routes>
        </Router>
        </>
    )
}
export default Body;