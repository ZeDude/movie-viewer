import {
  Segment,
  Container,
  Rating,
  Statistic,
  Divider,
  Header,
  Image
} from 'semantic-ui-react';

const CyMovieDetailsGrid = ({ selectedMovie }) => {
  return (
    <Container className="cy-padding-top-1em">
      <Segment raised>
        <div className="ui very padded text">
          <Header as="h1">{selectedMovie.title}</Header>
          <Image
            src={selectedMovie.image}
            alt={selectedMovie.title}
            wrapped
            ui={true}
          />
          <Header as="h2">YEAR: &nbsp;&nbsp;{selectedMovie.description}</Header>
          <Header as="h2">
            Plot:
            <Header.Subheader>{selectedMovie.plot}</Header.Subheader>
          </Header>
          <Header as="h3">
            Duration:
            <Header.Subheader>{selectedMovie.runtimeStr}</Header.Subheader>
          </Header>
          <Header as="h3" color="blue">
            Genres:
            <Header.Subheader>{selectedMovie.genres}</Header.Subheader>
          </Header>
          <Header as="h3" color="blue">
            Actors:
            <Header.Subheader>{selectedMovie.stars}</Header.Subheader>
          </Header>
          <Header as="h3" color="red">
            Content Rating: &nbsp;&nbsp;{selectedMovie.contentRating}
          </Header>
          <Divider />
          <div>
            <Statistic.Group size="mini">
              <Statistic>
                <Statistic.Value>
                  {selectedMovie.imDbRating} / 10
                </Statistic.Value>
                <Statistic.Label>IMDB Rating</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {selectedMovie.imDbRatingVotes}
                </Statistic.Value>
                <Statistic.Label>Votes</Statistic.Label>
              </Statistic>
            </Statistic.Group>
            {/* <div>
              <input
                type="range"
                min={0}
                max={10}
                value={selectedMovie.imDbRating}
              />
            </div> */}
            <Rating rating={selectedMovie.imDbRating} maxRating={10} />
          </div>
          <Divider />
          <Header as="h3" color="blue">
            Critics:
            <Header.Subheader>
              {selectedMovie.metacriticRating} / 100
            </Header.Subheader>
          </Header>
        </div>
      </Segment>
    </Container>
  );
};

export default CyMovieDetailsGrid;
