import {
  Segment,
  Container,
  Rating,
  Statistic,
  Divider,
  Header,
  Image
} from 'semantic-ui-react';
import CyMovieCard from './CyMovieCard';

const CyMovieDetailsGrid = ({ selectedMovie }) => {
  return (
    /*
      {
        id: 'tt1877830',
        image:
          'https://imdb-api.com/images/original/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_Ratio0.6837_AL_.jpg',
        title: 'The Batman',
        description: '(2022)',
        runtimeStr: '176 min',
        genres: 'Action, Crime, Drama',
        genreList: [
          {
            key: 'Action',
            value: 'Action'
          },
          {
            key: 'Crime',
            value: 'Crime'
          },
          {
            key: 'Drama',
            value: 'Drama'
          }
        ],
        contentRating: 'PG-13',
        imDbRating: '8.3',
        imDbRatingVotes: '298194',
        metacriticRating: '72',
        plot: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        stars:
          'Matt Reeves, Robert Pattinson, Zoë Kravitz, Jeffrey Wright, Colin Farrell',
        starList: [
          {
            id: 'tt1877830',
            name: 'Matt Reeves'
          },
          {
            id: 'tt1877830',
            name: 'Robert Pattinson'
          },
          {
            id: 'tt1877830',
            name: 'Zoë Kravitz'
          },
          {
            id: 'tt1877830',
            name: 'Jeffrey Wright'
          },
          {
            id: 'tt1877830',
            name: 'Colin Farrell'
          }
        ]
      },
       <Header as='h2'>
    Account Settings
    <Header.Subheader>
      Manage your account settings and set email preferences
    </Header.Subheader>
  </Header>
      */
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
