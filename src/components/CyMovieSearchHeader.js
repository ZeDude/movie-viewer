import { useState } from 'react';
import {
  Dropdown,
  Button,
  Grid,
  Container,
  Header,
  Form
} from 'semantic-ui-react';
import { EMPTY_FILTER } from '../controllers/CyMovieUtils';

const CyMovieSearchHeader = ({ stateMoviePage, applyFilter, resetFilter }) => {
  const [titleInput, setTitleInput] = useState('');
  const [yearInput, setYearInput] = useState('');
  const [minimumImdbInput, setMinimumImdbInput] = useState('');
  const [starsArrayInput, setStarsArrayInput] = useState([]);
  const [genresArrayInput, setGenresArrayInput] = useState([]);

  const triggerApplyFilter = (e) => {
    if (
      titleInput === EMPTY_FILTER.titleInput &&
      yearInput === EMPTY_FILTER.yearInput &&
      minimumImdbInput === EMPTY_FILTER.minimumImdbInput &&
      starsArrayInput.length === 0 &&
      genresArrayInput.length === 0
    ) {
      // do nothing
    } else {
      const newFilter = Object.assign(
        {},
        {
          status: 'applying',
          titleInput: titleInput.toLowerCase().trim(),
          yearInput: yearInput,
          minimumImdbInput: minimumImdbInput,
          starsArrayInput: starsArrayInput,
          genresArrayInput: genresArrayInput
        }
      );
      applyFilter(e, newFilter);
    }
  };
  const triggerResetFilter = (e) => {
    setTitleInput('');
    setYearInput('');
    setMinimumImdbInput('');
    setStarsArrayInput([]);
    setGenresArrayInput([]);
    if (stateMoviePage.filtered !== null) {
      resetFilter(e);
    }
  };

  const onStarsArrayInputDropChange = (e, { value }) => {
    setStarsArrayInput(value);
  };

  const onGenresArrayInputDropChange = (e, { value }) => {
    setGenresArrayInput(value);
  };
  return (
    <>
      <Container className="cy-padding-top-1em">
        <Header
          as="h2"
          content="Movie Viewer"
          subheader="Enter your criteria and click the Apply button."
        />
        <Form onSubmit={(e) => applyFilter(e)}>
          <Form.Group>
            <Form.Input
              label="Search Title"
              placeholder="Search Title..."
              icon="search"
              width={6}
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
            />
            <div style={{ padding: '0 0.5em', width: '80%' }}>
              <Form.Field label="Actors" />
              {stateMoviePage?.filterOptions?.stars && (
                <Dropdown
                  placeholder="Choose multiple actors"
                  fluid
                  multiple
                  search
                  selection
                  clearable
                  options={stateMoviePage.filterOptions.stars}
                  onChange={onStarsArrayInputDropChange}
                  value={starsArrayInput}
                />
              )}
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Year"
              placeholder="Year..."
              width={4}
              control="input"
              type="number"
              min={stateMoviePage?.filterOptions?.yearMin || 0}
              max={stateMoviePage?.filterOptions?.yearMax || 0}
              value={yearInput}
              onChange={(e) => {
                setYearInput(e.target.value);
              }}
            />
            <Form.Input
              label="Minimum Imdb Rating"
              placeholder="Minimum Imdb Rating..."
              width={4}
              control="input"
              type="number"
              min={0}
              max={10}
              value={minimumImdbInput}
              onChange={(e) => {
                setMinimumImdbInput(e.target.value);
              }}
            />
            <div style={{ padding: '0 0.5em', width: '80%' }}>
              <Form.Field label="Genres" />
              {stateMoviePage?.filterOptions?.genres && (
                <Dropdown
                  placeholder="Choose multiple genres"
                  fluid
                  multiple
                  search
                  selection
                  clearable
                  options={stateMoviePage.filterOptions.genres}
                  onChange={onGenresArrayInputDropChange}
                  value={genresArrayInput}
                />
              )}
            </div>
          </Form.Group>
        </Form>
      </Container>
      <Container>
        <Grid>
          <Grid.Column textAlign="right">
            <Button.Group>
              <Button onClick={(e) => triggerResetFilter(e)}>
                Reset Filter
              </Button>
              <Button.Or />
              <Button positive onClick={(e) => triggerApplyFilter(e)}>
                Apply Filter
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};
export default CyMovieSearchHeader;
