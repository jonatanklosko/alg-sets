import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red'

const useStyles = makeStyles({
  root: {
    padding: 16,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: 500,
  },
  icon: {
    verticalAlign: 'middle',
    color: red[700],
  },
});

const Signature = () => {
  const classes = useStyles();

  return (
    <Typography>
      Made with <Icon className={classes.icon}>favorite</Icon>
      <span> by </span>
      <a href="https://ko-fi.com/jonatanklosko" target="_blank" rel="noopener noreferrer" className={classes.link}>
        Jonatan Kłosko
      </a>
    </Typography>
  );
};

export default Signature;
