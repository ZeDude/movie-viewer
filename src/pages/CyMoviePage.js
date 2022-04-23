import { useEffect, useReducer, createRef } from 'react';
import { Divider, Container, Sticky } from 'semantic-ui-react';
import {
  getNumberOfMoviePages,
  getMoviesForPage,
  getNumberOfFilteredMoviePages,
  getFilteredMoviesForPage,
  getFilterListOptions,
  filterMovies
} from '../controllers/CyMovieController';
import {
  createRangeOptionsArray,
  EMPTY_FILTER
} from '../controllers/CyMovieUtils';
import CyMovieSearchHeader from '../components/CyMovieSearchHeader';
import CyMoviePaginationGrid from '../components/CyMoviePaginationGrid';
import CyMovieGrid from '../components/CyMovieGrid';

const initialState = {
  currentPage: 0,
  totalPages: 0,
  movieData: [],
  filtered: null,
  filterOptions: { years: [], stars: [], genres: [] },
  status: 'init',
  filter: EMPTY_FILTER
};

const reducerMovieData = (state, action) => {
  let newState = null;
  switch (action.type) {
    case 'INIT_PAGE':
      newState = Object.assign({}, state, {
        currentPage: action.payload.page,
        totalPages: getNumberOfMoviePages(),
        movieData: action.payload.data,
        status: 'loaded'
      });
      return newState;
    case 'GOTO_PAGE':
      newState = Object.assign({}, state, {
        currentPage: action.payload.page,
        movieData: action.payload.data
      });
      return newState;
    case 'INIT_FILTEROPTIONS':
      newState = Object.assign({}, state, {
        filterOptions: action.payload,
        years: createRangeOptionsArray(
          action.payload.yearMin,
          action.payload.yearMax
        )
      });
      return newState;
    case 'CLEAR_FILTER':
      return Object.assign({}, state, {
        currentPage: action.payload.page,
        totalPages: getNumberOfMoviePages(),
        movieData: action.payload.data,
        filtered: null,
        filter: EMPTY_FILTER
      });
    case 'APPLY_FILTER':
      newState = Object.assign({}, state, {
        filter: action.payload.filter,
        filtered: {
          currentPage: action.payload.page,
          totalPages: getNumberOfFilteredMoviePages(),
          movieData: action.payload.data
        }
      });
      return newState;
    case 'GOTO_FILTERED_PAGE':
      newState = Object.assign({}, state, {
        filtered: {
          currentPage: action.payload.page,
          movieData: action.payload.data
        }
      });
      return newState;
    default:
      console.error('reducerMovieData, Invalid action type: ', action?.type);
      return state;
  }
};

const CyMoviePage = () => {
  const [stateMoviePage, dispatch] = useReducer(reducerMovieData, initialState);
  const contextRef = createRef();
  useEffect(() => {
    getMoviesForPage(1)
      .then((data) => {
        // debug_log console.log('fetchData data', JSON.stringify(data));
        const payload = {
          page: data.length > 0 ? 1 : 0,
          data: data
        };
        dispatch({ type: 'INIT_PAGE', payload: payload });
      })
      .catch((error) => {
        // manage error
      });
  }, []);

  useEffect(() => {
    getFilterListOptions().then((filterOptions) => {
      dispatch({ type: 'INIT_FILTEROPTIONS', payload: filterOptions });
    });
  }, [stateMoviePage.status]);

  const applyFilter = (e, newFilter) => {
    filterMovies(newFilter).then(() => {
      const filteredResult = getFilteredMoviesForPage(1);
      newFilter.status = 'active';
      const payload = {
        filter: newFilter,
        page: filteredResult.length > 0 ? 1 : 0,
        data: filteredResult
      };
      dispatch({ type: 'APPLY_FILTER', payload: payload });
    });
  };
  const resetFilter = (e) => {
    getMoviesForPage(1)
      .then((data) => {
        // debug_log console.log('fetchData data', JSON.stringify(data));
        const payload = {
          page: data.length > 0 ? 1 : 0,
          data: data
        };
        dispatch({ type: 'CLEAR_FILTER', payload: payload });
      })
      .catch((error) => {
        // manage error
      });
  };
  const handlePageChange = (e, paginationData) => {
    e.preventDefault();
    console.log('handlePageChange, e', e);
    console.log('handlePageChange, paginationData', paginationData);
    if (stateMoviePage.filtered === null) {
      getMoviesForPage(paginationData.activePage)
        .then((data) => {
          // debug_log console.log('fetchData data', JSON.stringify(data));
          const payload = {
            page: paginationData.activePage,
            data: data
          };
          dispatch({ type: 'GOTO_PAGE', payload: payload });
        })
        .catch((error) => {
          // manage error
        });
    } else {
      const filteredResult = getFilteredMoviesForPage(
        paginationData.activePage
      );
      const payload = {
        page: paginationData.activePage,
        data: filteredResult
      };
      dispatch({ type: 'GOTO_FILTERED_PAGE', payload: payload });
    }
  };

  return (
    <>
      <CyMovieSearchHeader
        stateMoviePage={stateMoviePage}
        applyFilter={applyFilter}
        resetFilter={resetFilter}
      />
      <Divider />
      <div ref={contextRef}>
        <Sticky context={contextRef}>
          <Container attached="top">
            <CyMoviePaginationGrid
              stateMoviePage={
                stateMoviePage.filtered === null
                  ? stateMoviePage
                  : stateMoviePage.filtered
              }
              handlePageChange={handlePageChange}
            />
          </Container>
        </Sticky>
        <CyMovieGrid
          attached="bottom"
          movieGridData={
            stateMoviePage.filtered === null
              ? stateMoviePage.movieData
              : stateMoviePage.filtered.movieData
          }
          currentPage={
            stateMoviePage.filtered === null
              ? stateMoviePage.currentPage
              : stateMoviePage.filtered.currentPage
          }
        />
      </div>
    </>
  );
};

export default CyMoviePage;
