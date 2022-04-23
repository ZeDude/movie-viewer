import React from 'react';
import { Grid } from 'semantic-ui-react';
import { COLUMNS_PER_PAGE } from '../controllers/CyMovieController';

import CyMovieCard from './CyMovieCard';

const CyMovieRow = ({ movieRowData }) => {
  return (
    <Grid>
      <Grid.Row columns={COLUMNS_PER_PAGE} stretched>
        {Array.isArray(movieRowData) &&
          movieRowData[0].map((movieData) => {
            return (
              <CyMovieCard
                key={`card${movieData.id}`}
                id={movieData.id}
                imageSrc={movieData.image}
                title={movieData.title}
                description={movieData.description}
              />
            );
          })}
      </Grid.Row>
    </Grid>
  );
};

export default CyMovieRow;
