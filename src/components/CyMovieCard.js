import React from 'react';
import { Card, Grid, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
*/

const CyMovieCard = ({ id, imageSrc, title, description }) => {
  return (
    <Grid.Column>
      <Card>
        <Image src={imageSrc} alt={title} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui buttons">
            <Button basic color="blue">
              <Link to={`movieDetails/${id}`} className="btn btn-primary">
                Movie Details
              </Link>
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default CyMovieCard;
