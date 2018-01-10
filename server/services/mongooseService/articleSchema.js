import {Schema} from 'mongoose';
import {DEFAULT_ARTICLE_PIC_URL} from "../../../src/internal/Constant";

const defaultDraftJSObject = {
  'blocks': [],
  'entityMap': {}
};

const articleSchema = new Schema(
  {
    articleTitle: {
      type: String,
      required: true,
      default: 'default article title'
    },
    articleSubTitle: {
      type: String,
      required: true,
      default: 'default content'
    },
    articleContent: {
      type: String,
      required: true,
      default: 'default content'
    },
    articleContentJSON: {
      type: Object,
      required: true,
      default: defaultDraftJSObject
    },
    articlePicUrl: {
      type: String,
      default: DEFAULT_ARTICLE_PIC_URL
    }
  },
  {
    minimize: false
  }
);

export default articleSchema;