import { getNumberOfPages, createOptionsFromArray } from './CyMovieUtils';

export const MOVIES_PER_PAGE = 20;
export const COLUMNS_PER_PAGE = 4;
export const ROWS_PER_PAGE = 5;

const url =
  'https://cyabra-assignment-api.herokuapp.com/api/all-movies?key=jedimindtrick&count=250';

const movieCache = {
  movies: null,
  filterOptionData: {
    genres: null,
    stars: null,
    yearMin: null,
    yearMax: null
  },
  filteredMovies: [],
  lastUpdated: null
};

const fetchMovies = async () => {
  if (movieCache.movies === null) {
    try {
      const response = await fetch(url);
      const movies = await response.json();
      movieCache.movies = movies.results;
      movieCache.lastUpdated = new Date();
      return movieCache.movies;
    } catch (error) {
      console.error('fetchMovies, Problem fetching movies', error);
      return [];
    }
  } else {
    return movieCache.movies;
  }
};

// set movieCache.filteredMovies and return getFilteredMoviesForPage(1);
export const filterMovies = async (filterData) => {
  const allMovies = await fetchMovies();
  movieCache.filteredMovies = allMovies.filter((movie) => {
    return (
      // imDbRating
      (!filterData.titleInput ||
        movie.title.toLowerCase().indexOf(filterData.titleInput) > -1) &&
      (filterData.yearInput === '' ||
        movie.description.indexOf(filterData.yearInput) > -1) &&
      (filterData.yearInput === '' ||
        Number(movie.imDbRating) >= filterData.minimumImdbInput) &&
      (filterData.starsArrayInput.length === 0 ||
        filterData.starsArrayInput.some(
          (star) => movie.stars.indexOf(star) > -1
        )) &&
      (filterData.genresArrayInput.length === 0 ||
        filterData.genresArrayInput.some(
          (genre) => movie.genres.indexOf(genre) > -1
        ))
    );
  });
  // return getFilteredMoviesForPage(1);
};

export const getFilterListOptions = async () => {
  const allMovies = await fetchMovies();
  if (movieCache.filterOptionData.genres === null) {
    const genresSet = new Set();
    const starsSet = new Set();
    let yearMin = 0;
    let yearMax = 0;
    allMovies.forEach((movie) => {
      movie.genreList.forEach((genre) => {
        genresSet.add(genre.value);
      });
      movie.starList.forEach((star) => {
        starsSet.add(star.name);
      });
      const year = Number(movie.description.replace(/\D/g, ''));
      if (yearMin === 0) {
        yearMin = year;
        yearMax = year;
      } else {
        if (year < yearMin) {
          yearMin = year;
        }
        if (year > yearMax) {
          yearMax = year;
        }
      }
    });
    movieCache.filterOptionData.genres = createOptionsFromArray(
      Array.from(genresSet).sort()
    );
    movieCache.filterOptionData.stars = createOptionsFromArray(
      Array.from(starsSet).sort()
    );
    movieCache.filterOptionData.yearMin = yearMin;
    movieCache.filterOptionData.yearMax = yearMax;
  }
  return Object.assign({}, movieCache.filterOptionData);
};

export const getMoviesForPage = async (pageNumber) => {
  const requestedPage = pageNumber === 0 ? 0 : pageNumber - 1;
  const allMovies = await fetchMovies();
  return allMovies.slice(
    requestedPage * MOVIES_PER_PAGE,
    (requestedPage + 1) * MOVIES_PER_PAGE
  );
};

export const getNumberOfMoviePages = () => {
  return getNumberOfPages(movieCache.movies, MOVIES_PER_PAGE);
};

// below methods => movieCache.filteredMovies must be ready

export const getMovieById = (id) => {
  const movieFound = movieCache.movies.find((movie) => {
    return movie.id === id;
  });
  return movieFound;
};

export const getFilteredMoviesForPage = (pageNumber) => {
  const requestedPage = pageNumber === 0 ? 0 : pageNumber - 1;
  return movieCache.filteredMovies.slice(
    requestedPage * MOVIES_PER_PAGE,
    (requestedPage + 1) * MOVIES_PER_PAGE
  );
};

export const getNumberOfFilteredMoviePages = () => {
  return getNumberOfPages(movieCache.filteredMovies, MOVIES_PER_PAGE);
};
