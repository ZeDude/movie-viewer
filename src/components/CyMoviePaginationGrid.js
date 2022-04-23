import { Grid, Icon, Pagination, Label } from 'semantic-ui-react';

const CyMoviePaginationGrid = ({ stateMoviePage, handlePageChange }) => {
  return (
    <Grid columns={3}>
      <Grid.Column textAlign="right">
        <Label size="huge">Page</Label>
      </Grid.Column>
      <Grid.Column>
        <Pagination
          onPageChange={(e, data) => handlePageChange(e, data)}
          activePage={stateMoviePage.currentPage}
          ellipsisItem={{
            content: <Icon name="ellipsis horizontal" />,
            icon: true
          }}
          firstItem={{
            content: <Icon name="angle double left" />,
            icon: true,
            disabled: stateMoviePage.currentPage < 2
          }}
          lastItem={{
            content: <Icon name="angle double right" />,
            icon: true,
            disabled: stateMoviePage.currentPage >= stateMoviePage.totalPages
          }}
          prevItem={{
            content: <Icon name="angle left" />,
            icon: true,
            disabled: stateMoviePage.currentPage < 2
          }}
          nextItem={{
            content: <Icon name="angle right" />,
            icon: true,
            disabled: stateMoviePage.currentPage >= stateMoviePage.totalPages
          }}
          totalPages={stateMoviePage.totalPages}
        />
      </Grid.Column>
    </Grid>
  );
};

export default CyMoviePaginationGrid;
