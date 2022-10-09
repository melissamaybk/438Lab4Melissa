import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName]= useState("");
  const [review, setReview]= useState("");
  const [movieReviewList, setMovieList]=useState([]);
  const [searchMovie, setSearchMovie] = useState([])
  const [searchMovieName, setSearchMovieName] = useState("")

  const [newReview, setNewReview]= useState("");

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data.sort((firstMovie, secondMovie) => firstMovie.movieName.localeCompare(secondMovie.movieName)));
    });
  }, []);

  function SearchMovie() { 
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setSearchMovie(response.data.filter(movie => movie.movieName == searchMovieName))
    })
  }


  
const updateReview = (movie) => {
  Axios.put("http://localhost:3001/api/update", {
    movieName: movie,
    movieReview: newReview,
  });
  setNewReview("")
  document.location.reload()
};

const deleteReview = (movie) => {
  Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  document.location.reload()
};

  const submitReview=()=>{

    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

      setMovieList([
        ...movieReviewList,
        { movieName: movieName, movieReview: review },
      ]);

   document.location.reload()

 };

  return (
    <div className="App">
      <h1> CRUD APPLICATION </h1>


    <div className="form">

    <div className="search">
      <label>Search Movie Name:</label>
      <input type="text" onChange={(event) => setSearchMovieName(event.target.value)}></input>
      <button onClick={SearchMovie}>Search</button>
      <h2>Review: {searchMovie[0]?.movieReview}</h2>
    </div>

    
    <div className="add">

      <label>Movie Name:</label>
      <input type="text" name="movieName" onChange={(e)=>{
        setMovieName(e.target.value)
      }}/>

      <label>Review:</label>
      <input type="text" name="Review" onChange={(e)=>{
        setReview(e.target.value)
      }}/>

      <button onClick={submitReview}> Submit </button>
    </div>
    
    <label>Movie Reviews</label>
    
    {movieReviewList.map((val)=>{
      return (
        <div>
          
          <div className="card">
            <h1> {val.movieName} </h1>
            <p> {val.movieReview} </p>

            <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
            <input type="text" id="updateInput" onChange={(e) => {setNewReview(e.target.value)}}/>
            <button onClick={()=> {updateReview(val.movieName)}}>Update</button>
          </div>
        </div>
      );
    })}
  </div>
</div>

);
}



export default App;
