import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import CyMovieRow from './CyMovieRow';
import { COLUMNS_PER_PAGE } from '../controllers/CyMovieController';

const CyMovieGrid = ({ movieGridData, currentPage }) => {
  let movieRows = [];
  let movieRow = [];
  movieGridData.forEach((movieData) => {
    if (movieRow.length === COLUMNS_PER_PAGE) {
      movieRows.push([movieRow]);
      movieRow = [];
    }
    movieRow.push(movieData);
  });
  if (movieRow.length > 0) {
    movieRows.push([movieRow]);
  }
  return (
    <Container className="cy-padding-top-1em">
      <Segment raised>
        {movieRows.map((movieRow, rowIndex) => (
          <CyMovieRow
            key={`page${currentPage}row${rowIndex}id${movieRow[0].id}`}
            movieRowData={movieRow}
          />
        ))}
      </Segment>
    </Container>
  );
};

export default CyMovieGrid;
