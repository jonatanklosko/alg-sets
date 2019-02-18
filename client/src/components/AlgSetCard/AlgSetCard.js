import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';

import StarButton from '../StarButton/StarButton';

const AlgSetCard = ({ algSet, currentUserId }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/alg-sets/${algSet.id}`}>
        <CardHeader
          avatar={
            <Avatar src={algSet.owner.avatar.thumbUrl} />
          }
          title={algSet.name}
          subheader={
            <Grid container direction="column">
              <Grid item>Created by {algSet.owner.name}</Grid>
              <Grid item>Algs: {algSet.algs.length}</Grid>
            </Grid>
          }
          action={
            <StarButton algSet={algSet} currentUserId={currentUserId} disabled={true} />
          }
        />
      </CardActionArea>
    </Card>
  );
}

export default AlgSetCard;
