import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Container, Header } from 'semantic-ui-react';

import { getMovieById } from '../controllers/CyMovieController';
import CyMovieDetailsGrid from '../components/CyMovieDetailsGrid';

const CyMovieDetailsPage = () => {
  const { movieId } = useParams();
  const [selectedMovie, setSelectedMovie] = useState({});
  useEffect(() => {
    const movie = getMovieById(movieId);
    if (movie) {
      setSelectedMovie(movie);
    }
  }, [movieId, selectedMovie]);

  return (
    <>
      <Container className="cy-padding-top-1em">
        {/* <Header size="medium">Movie Filter</Header> */}
        <Header
          as="h2"
          content={`Moview Viewer ${
            selectedMovie ? ' - ' + selectedMovie.title : ''
          }`}
        />
      </Container>
      <Divider />
      <CyMovieDetailsGrid selectedMovie={selectedMovie} />
    </>
  );
};
export default CyMovieDetailsPage;
