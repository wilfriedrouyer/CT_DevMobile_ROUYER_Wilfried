const API_KEY = "f60dc1588d1b92e483f83fa137b9f5ab";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getFilms(searchTerm = "", page = 2) {
  try {
    const myHeaders = new Headers({ "user-key": API_KEY });
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getRestaurants ${error.message}`);
    throw error;
  }
}

export async function getFilmByName(name = "Batman") {
    try {
      const myHeaders = new Headers({ "user-key": API_KEY });
      const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${name}`;
      console.log(url);
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getFilmByName ${error.message}`);
      throw error;
    }
  }
  
  export async function getFilmById(id) {
    try {
      const myHeaders = new Headers({ "user-key": API_KEY });
      const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getFilmById ${error.message}`);
      throw error;
    }
  }

  export async function getCasting(id) {
    try {
      const myHeaders = new Headers({ "user-key": API_KEY });
      const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getFilmByExternalId ${error.message}`);
      throw error;
    }
  }

