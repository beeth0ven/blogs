
import {Article} from "./mongooseService";

/**
Convert an array to object.
 This method will change this:

 ```
 [
   'element0',
   'element1',
   'element2',
 ]
 ```

 to this:

 ```
 {
  '0': 'element0',
  '1': 'element1',
  '2': 'element2',
 }
 ```

*/
const objectFromArray = (elements) => elements
  .reduce((accumulator, element, index) => ({
    ...accumulator,
    [index]: element.toObject()
  }), {});

export default () => {
  return Article.find({}, (err, articles) => articles)
    .then((articles) => ({
        articles: objectFromArray(articles)
      })
    );
}