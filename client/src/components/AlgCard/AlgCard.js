import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CopyToClipboard from 'react-copy-to-clipboard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import AlgImage from '../AlgImage/AlgImage';
import { algAnimationUrl } from '../../logic/utils';

const REMOVE_ALG_FROM_ALG_SET_MUTATION = gql`
  mutation RemoveAlgFromAlgSet($id: ID!, $alg: String!) {
    removeAlgFromAlgSet(id: $id, alg: $alg) {
      id
      algs
    }
  }
`;

const AlgCard = ({ alg, algSetId, isOwner, cubeImageOptions }) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const closeMenu = () => setMenuPosition(null);
  return (
    <Fragment>
      <Card style={{ height: '100%' }}>
        <CardActionArea
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          onClick={event => setMenuPosition({ left: event.clientX, top: event.clientY })}
        >
          <AlgImage alg={alg} options={cubeImageOptions} style={{ margin: 'auto', display: 'block' }} />
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              {alg}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Menu
        open={!!menuPosition}
        onClose={closeMenu}
        anchorPosition={menuPosition}
        anchorReference="anchorPosition"
        transformOrigin={{ vertical: 25, horizontal: 'center' }}
      >
        <CopyToClipboard text={alg}>
          <MenuItem onClick={closeMenu}>Copy</MenuItem>
        </CopyToClipboard>
        <MenuItem
          component="a"
          target="_blank"
          href={algAnimationUrl(alg)}
          onClick={closeMenu}
        >
          Animation
        </MenuItem>
        {isOwner && (
          <Mutation
            mutation={REMOVE_ALG_FROM_ALG_SET_MUTATION}
            variables={{ id: algSetId, alg }}
          >
            {(removeAlgFromAlgSet, { error, loading }) => (
              <ConfirmDialog message="Are you sure you want to delete this alg?" onClose={closeMenu}>
                {confirm => (
                  <MenuItem onClick={confirm(removeAlgFromAlgSet)} disabled={loading}>
                    Delete
                  </MenuItem>
                )}
              </ConfirmDialog>
            )}
          </Mutation>
        )}
      </Menu>
    </Fragment>
  );
};

export default AlgCard;
