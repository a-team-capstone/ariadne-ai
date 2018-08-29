# ariadne.ai

[ariadne.ai](https://ariadne-ai.herokuapp.com)

Application that uses artificial intelligence to transform mazes you create by hand into interactive, playable games.

## Team Members

- Ali Ebner
- Sasha Havia
- Isabel Hirama
- Shelby Smitherman

### Tech Stack

Progressive Web App

Front End:
React, Redux, Pixi.js

Back End:
Express/Node, Sequelize/PostgreSQL, Google Cloud Vision (Optical Character Recognition API), Amazon Web Services (S3)

### To Start

touch secrets.js (in root directory of the project) && attach the following secret env variables:

process.env.GOOGLE_CLIENT_ID = 'CLIENT_ID_HERE'
process.env.GOOGLE_CLIENT_SECRET = 'CLIENT_SECRET_HERE'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'

process.env.AWS_ACCESS_KEY_ID = 'ACCESS_KEY_ID_HERE'
process.env.AWS_SECRET_ACCESS_KEY = 'SECRET_ACCESS_KEY_HERE'
process.env.IMAGE_S3_BUCKET = 'your-bucket-name'

process.env.GOOGLE_API_KEY = 'API_KEY_HERE'

```javascript
npm install
cd client && npm install
cd .. && npm start
```

### Testing

```javascript
npm run test
```
