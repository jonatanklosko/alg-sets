const express = require('express');
const fetch = require('node-fetch');

const WCA_OAUTH_CLIENT_ID = 'example-application-id';
const WCA_OAUTH_SECRET = 'example-secret';
const WCA_ORIGIN = 'https://staging.worldcubeassociation.org';
const WCA_OAUTH_REDIRECT_URI  = 'http://localhost:4000/oauth/callback';

const userJsonToUser = userJson => ({
  wcaUserId: userJson['id'],
  wcaId: userJson['wca_id'],
  name: userJson['name'],
  avatar: {
    url: userJson['avatar']['url'],
    thumbUrl: userJson['avatar']['thumb_url'],
  },
});

const router = express.Router();

router.get('/sign-in', (req, res) => {
  const params = new URLSearchParams({
    client_id: WCA_OAUTH_CLIENT_ID,
    redirect_uri: WCA_OAUTH_REDIRECT_URI,
    response_type: 'code',
    scope: 'public',
  });
  res.redirect(`${WCA_ORIGIN}/oauth/authorize?${params.toString()}`);
});

router.get('/callback', (req, res, next) => {
  const params = new URLSearchParams({
    client_id: WCA_OAUTH_CLIENT_ID,
    client_secret: WCA_OAUTH_SECRET,
    redirect_uri: WCA_OAUTH_REDIRECT_URI,
    code: req.query.code,
    grant_type: 'authorization_code',
  });
  fetch(`${WCA_ORIGIN}/oauth/token?${params.toString()}`, { method: 'POST' })
    .then(response => response.json())
    .then(json =>
      fetch(`${WCA_ORIGIN}/api/v0/me`, {
        headers: { Authorization: `Bearer ${json['access_token']}` }
      })
    )
    .then(response => response.json())
    .then(json => userJsonToUser(json.me))
    .then(user => {
      console.log(user)
      /* TODO: Save user, store the actual db id. */
      res.cookie('userId', user.wcaUserId, {
        httpOnly: true,
        // secure: true,
        sameSite: 'strict',
        signed: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.redirect('/');
    })
    .catch(next);
});

router.get('/sign-out', (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
});

module.exports = router;
