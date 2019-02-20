import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import phone from './phone.png';
import tablet from './tablet.png';
import laptop from './laptop.png';
import background from './background.jpg';

import Signature from '../Signature/Signature';

const useStyles = makeStyles(theme => ({
  boxWithBackground: {
    height: 'calc(100vh - 56px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
    },
    width: 'calc(100% + 2 * 24px)',
    margin: '-24px -24px 0 -24px',
    background: `
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.9)
      ),
      url(${background})
    `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  boxWithBackgroundText: {
    textAlign: 'center',
    color: 'rgb(255, 255, 255, 0.9)',
    marginBottom: 24,
  },
  deviceImage: {
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 250,
    }
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item className={classes.boxWithBackground}>
         <Typography variant="h4" className={classes.boxWithBackgroundText}>
           Keep your algs in one place
           <span role="img" aria-label="tada"> 🎉</span>
         </Typography>
      </Grid>
      <Grid item style={{ marginTop: 24 }}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          Bring everywhere
          <span role="img" aria-label="rocket"> 🚀</span>
        </Typography>
      </Grid>
      <Grid item>
        <Grid container justify="center">
          <Grid item md={4}>
            <img src={phone} alt="Phone" className={classes.deviceImage} />
          </Grid>
          <Grid item md={4}>
            <img src={tablet} alt="Tablet" className={classes.deviceImage} />
          </Grid>
          <Grid item md={4}>
            <img src={laptop} alt="Laptop" className={classes.deviceImage} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ margin: '48px 0' }}>
        <Grid container spacing={16} justify="center">
          <Grid item>
            <Button
              href="/oauth/sign-in"
              size="large"
              color="primary"
              variant="outlined"
            >
              Get started
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/explore"
              size="large"
              color="primary"
              variant="outlined"
            >
              Explore
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Signature />
      </Grid>
    </Grid>
  );
};

export default Home;
