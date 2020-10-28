import React, {useEffect, useState} from "react"; 
import Recipe from './Recipe'; 
import './App.css';

const App = () => {

  const APP_ID = "9f62cfd1"; 
  const API_KEY = "2681e2c07fb0f7c7f0fb6eb84d2c8ecc"; 

  const [recepies, setRecipes] = useState([]); 
  const [search, setSearch] = useState(''); 
  const [query, setQuery] = useState('banana'); 

    
  useEffect(() => {
    getRecipes();  
    
  }, [query]); 

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`)
    const data = await response.json(); 
    
    setRecipes(data.hits); 
  }; 

  const updateSearch = e => {
    setSearch(e.target.value); 

    //console.log(search); 
  };

  const getSearch = e => {
    e.preventDefault(); 
    setQuery(search); 
    setSearch('');
    
  };

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="searh-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>

        
      </form>
      {recepies.map(recipe => (
          <Recipe 
            key={recipe.recipe.calories}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image = {recipe.recipe.image}
          />
       ))};
    </div>
  );
};

export default App;
