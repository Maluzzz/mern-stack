import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import jwt_decode from "jwt-decode";
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import  {onlyText, getFirstImage} from '../../util/parserUrls'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
function PostListItem({ post, onDelete }) {
  const classes = useStyles();
  const token = JSON.parse(localStorage.getItem('user'))
  var decoded = ''
  if(token !== null){
   decoded = jwt_decode(token)}
  return (
    <Card className="w-100 my-4">
      <CardContent>
      <CardMedia
          className={classes.media}
          image={getFirstImage(post.content)}
          title={post.title}
        />
        <Typography gutterBottom variant="h5" component="h2">
          <Link to={`/posts/${post.cuid}/${post.slug}`} >
            {post.title}
          </Link>
          
        </Typography>
        <Typography component="p" className="mt-3">
       { onlyText(post.content).substr(0, 200) + '...'}
        </Typography>
        <Typography color="textSecondary" component="p" className="mt-3 font-italic">
          From {post.name}
        </Typography>
      </CardContent>
      <CardActions>
        {decoded.name === post.name ? (<Button size="small" color="secondary" onClick={onDelete}>
          Delete post
        </Button>):''}
      </CardActions>
    </Card>
  );
}


PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
