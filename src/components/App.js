import React, { useReducer, useEffect } from "react";

import Movie from "./Movie";
import spinner from "../assets/ajax-loader.gif";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";
import '../App.css';


const MOVIE_API_URL = 
"https://jsonmock.hackerrank.com/api/movies/search/"; 

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      console.log('i am apple11', jsonResponse.data.data);

      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.data
      });
    });

  }, []);


  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });
    console.log('search value', searchValue);
    axios(
      `https://jsonmock.hackerrank.com/api/movies/search/?Title=${searchValue}`
      ).then(
      jsonResponse => {
        console.log('serach console data ', jsonResponse.data);
        console.log('serach console data.data ', jsonResponse.data.data);
        console.log('bool', jsonResponse.data.Response);
        if (jsonResponse.data.data != null) {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.data
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
    // refreshPage();
  };

  const { movies, errorMessage, loading } = state;
  console.log('movies at state' ,movies);

  const retrievedMovies = 
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      <Movie movie={movies} />
      );

    
    return (
    <div className="App">
      <div className="m-container">
        <Search search={search} />
        <div className="movieContainer">
          <div className="movies">{retrievedMovies}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
