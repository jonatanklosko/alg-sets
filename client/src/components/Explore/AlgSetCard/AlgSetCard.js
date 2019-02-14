import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const AlgSetCard = ({ algSet }) => (
  <Card>
    <CardActionArea component={Link} to={`/alg-sets/${algSet.id}`}>
      <CardHeader
        avatar={
          <Avatar src={algSet.createdBy.avatar.thumbUrl} />
        }
        title={algSet.name}
        subheader={
          <Grid container direction="column">
            <Grid item>Created by {algSet.createdBy.name}</Grid>
            <Grid item>Algs: {algSet.algs.length}</Grid>
          </Grid>
        }
      />
    </CardActionArea>
    <CardActions>
      <IconButton>
        <Badge badgeContent={3} color="primary">
          <Icon>star</Icon>
        </Badge>
      </IconButton>
    </CardActions>
  </Card>
);

export default AlgSetCard;
