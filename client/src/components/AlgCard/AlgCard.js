import React, { Fragment, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const AlgCard = ({ alg }) => {
  const [menuPosition, setMenuPosition] = useState(null);
  return (
    <Fragment>
      <Card>
        <CardActionArea onClick={event => setMenuPosition({ left: event.clientX, top: event.clientY })}>
          <CardMedia
            component="img"
            image={`http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&bg=t&pzl=3&alg=${alg}&sch=wrgyob&r=y34x-34`}
            height={150}
          />
          <CardContent>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              {alg}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorPosition={menuPosition}
        anchorReference="anchorPosition"
        transformOrigin={{ vertical: 25, horizontal: 'center' }}
      >
        <CopyToClipboard text={alg}>
          <MenuItem onClick={() => setMenuPosition(null)}>Copy</MenuItem>
        </CopyToClipboard>
        <MenuItem onClick={() => setMenuPosition(null)}>Edit</MenuItem>
        <MenuItem onClick={() => setMenuPosition(null)}>Delete</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default AlgCard;
