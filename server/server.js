import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://luojiedeMac-Mini.local/local');

const articleSchema = {
  articleTitle:String,
  articleContent:String
};

const Article = mongoose.model('Article', articleSchema, 'articles');

const app = express();
app.server = http.createServer(app);

app.use(cors());

app.use(bodyParser.json({extended: false}));
app.use(express.static('dist'));

app.get('/', (request, response) =>
  Article.find((error, articles) => {
    const articleTags = articles.map((article) =>
      `<h2>${article.articleTitle}</h2>${article.articleContent}`
    ).join('<br/>');

    response.send(`<h1>Publishing App Initial Application!</h1>${articleTags}`);
  })
);

app.server.listen(process.env.PORT || 3000);
console.log(`Stated on port ${app.server.address().port}`);

export default app;