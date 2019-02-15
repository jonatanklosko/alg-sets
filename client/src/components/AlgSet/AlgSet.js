import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CopyToClipboard from 'react-copy-to-clipboard';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AlgCard from '../AlgCard/AlgCard';
import AlgFormDialog from '../AlgFormDialog/AlgFormDialog';
import ImportExportDialog from '../ImportExportDialog/ImportExportDialog';
import StarButton from '../StarButton/StarButton';

const ALG_SET_QUERY = gql`
  query AlgSet($id: ID!) {
    me {
      id
    }
    algSet(id: $id) {
      id
      name
      secret
      algs
      owner {
        id
      }
      stargazers {
        id
      }
    }
  }
`;

const AlgSet = ({ match }) => (
  <Query query={ALG_SET_QUERY} variables={{ id: match.params.id }}>
    {({ error, loading, data }) => {
      if (error) return <div>Error</div>;
      if (loading) return <LinearProgress />;
      const { algSet, me } = data;
      const isOwner = me && me.id === algSet.owner.id;

      return (
        <Fragment>
          <Grid container alignItems="center" style={{ marginBottom: 8 }}>
            <Grid item>
              <Typography variant="h5">{algSet.name}</Typography>
            </Grid>
            <Grid item style={{ flexGrow: 1, marginLeft: 8 }}>
              {algSet.secret &&
                <Tooltip title="Secret" placement="right">
                  <Icon fontSize="small" color="disabled">
                    lock
                  </Icon>
                </Tooltip>
              }
            </Grid>
            <Grid item>
              {isOwner && (
                <Fragment>
                  <AlgFormDialog algSetId={algSet.id}>
                    {openDialogWith => (
                      <IconButton onClick={() => openDialogWith('')}>
                        <Icon>add</Icon>
                      </IconButton>
                    )}
                  </AlgFormDialog>
                  <ImportExportDialog algSetId={algSet.id}>
                    {openDialogWith => (
                      <IconButton onClick={() => openDialogWith(algSet.algs)}>
                        <Icon>import_export</Icon>
                      </IconButton>
                    )}
                  </ImportExportDialog>
                </Fragment>
              )}
              <CopyToClipboard text={window.location}>
                <IconButton>
                  <Icon>link</Icon>
                </IconButton>
              </CopyToClipboard>
              <StarButton algSet={algSet} currentUserId={me && me.id} />
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            {algSet.algs.map(alg => (
              <Grid item key={alg} xs={12} md={6} lg={3}>
                <AlgCard alg={alg} algSetId={algSet.id} isOwner={isOwner} />
              </Grid>
            ))}
          </Grid>
        </Fragment>
      );
    }}
  </Query>
);

export default AlgSet;
