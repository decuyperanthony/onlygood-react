/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import {
  useSelector,
  // useDispatch
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Moment from 'react-moment';
// === component
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { API_URL } from '../../utils/constante';

import Avatar from '../Explore/Avatar';
// === fake picture
// import picture from '../../image/exemple.jpg';
import getAllPosts from '../../utils/getAllPosts';
import getPostByUserId from '../../utils/getPostByUserId';
// import { setWhichTweet } from '../../store/action/post';

// === style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: '1em',
  },
  paper: {
    padding: theme.spacing(1),
    // padding: '1em',
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  headerPost: {
    display: 'flex',
    alignItems: 'center',
  },
  authorPostUnlink: {
    fontFamily: 'Popins, sans-serif',
    fontWeight: '500',
    fontSize: '16px',
    color: 'black',
    paddingRight: '1em',
  },
  authorPostLink: {
    fontFamily: 'Popins, sans-serif',
    fontWeight: '500',
    fontSize: '16px',
    color: '#2D9CDB',
    paddingRight: '1em',
  },
  authorCommentLink: {
    fontFamily: 'Popins, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    color: '#2D9CDB',
    paddingRight: '1em',
  },
  authorCommentUnlink: {
    fontFamily: 'Popins, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    color: 'black',
    paddingRight: '1em',
  },
  date: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    fontSize: '12px',
    color: '#BDBDBD',
  },
  textContent: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '400',
    fontSize: '16px',
    color: '#4F4F4F',
    // marginLeft: '1em',
  },
  picture: {
    width: '100%',
  },
  containerImpression: {
    display: 'flex',
    listStyleType: 'none',
    justifyContent: 'space-between',
    borderBottom: '1px solid #F2F2F2',
    borderTop: '1px solid #F2F2F2',
    padding: '0.5em 2em',
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    color: '#4F4F4F',
  },
  impression: {
    display: 'flex',
    padding: '0.2em 1em',
    margin: '-0.2em -1em',
    '&:hover': {
      backgroundColor: '#F2F2F2',
      cursor: 'pointer',
    },
  },
  containerInputComments: {
    display: 'flex',
    borderBottom: '1px solid #F2F2F2',
  },
  inputComment: {
    marginTop: '1em',
    marginLeft: '0.5em',
    width: '100%',
    '&div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& input': {
      padding: '0 10px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
    },
  },
  inputAdornment: {
    color: '##BDBDBD',
    '&:hover': {
      backgroundColor: '#F2F2F2',
      cursor: 'pointer',
    },
  },
  containerComments: {

    marginTop: '1em',
  },
  containerComment: {
    display: 'flex',
    marginBottom: '0.5em',
  },
  nameDateComment: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    display: 'flex',
    padding: '0 0.5em',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  // commentAuthor: {
  //   fontFamily: 'Popins, sans-serif',
  //   fontWeight: '500',
  //   fontSize: '14px',
  //   color: 'black',
  //   paddingRight: '1em',
  // },
  commentDate: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    fontSize: '12px',
    color: '#BDBDBD',
  },
  comment: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '400',
    fontSize: '16px',
    color: '#4F4F4F',
  },
  displayNoneDownXS: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  // unlink: {
  //   color: 'black',
  // },
  // link: {
  //   '&:hover': {
  //     cursor: 'pointer',
  //   },
  //   color: '#2F80ED',
  // },
}));

const PostProfile = () => {
  const history = useHistory();
  const {
    register,
    // handleSubmit,
    // errors,
  } = useForm();
  // console.log('errors', errors);
  const classes = useStyles();
  // const dispatch = useDispatch();
  // === redux
  const { user } = useSelector((state) => state.user);
  //   const [postProfileChoice, setPostProfileChoice] = useState(user.posts);
  const { userData } = useSelector((state) => state.auth);
  const userId = JSON.parse(localStorage.getItem('userId'));

  const { filteredProfilePosts } = useSelector((state) => state.post);
  // === variable du map pour les posts
  let postsJSX;
  // === variable contenant les objets des posts choisis
  //   let postProfileChoice;
  //! == === === === === === traitement de l'input commentaire
  //! je crée mon usestate pour récuperer les valeurs
  const [state, setState] = React.useState();
  // const [inputValue, setInputValue] = React.useState(useStateObject);
  //!

  if (user.id === userId) {
    //! traitement des impressions
    //! traitement des likes
    const handleLike = (postId) => {
      console.log('postId', postId);
      axios
        .post(`${API_URL}/userlikespost`, {
          app_users_id: userId,
          post_id: postId,
        })
        .then((res) => {
          console.log(res);
          // dispatch(setWhichTweet('likedpostuser'));
          getPostByUserId(userId);
          // getAllPosts();
        })
        .catch((err) => console.trace(err));
    };
    //! traitement des retweet
    const handleRetweet = (postId) => {
      console.log('postId', postId);
      axios
        .post(`${API_URL}/userretweetedpost`, {
          app_users_id: userId,
          post_id: postId,
        })
        .then((res) => {
          console.log(res);
          //   dispatch(setWhichTweet('likedpostuser'));
          // getAllPosts();
          getPostByUserId(userId);
        })
        .catch((err) => console.trace(err));
    };
    //! traitement des saved
    const handleSave = (postId) => {
      console.log('postId', postId);
      axios
        .post(`${API_URL}/usersavedpost`, {
          app_users_id: userId,
          post_id: postId,
        })
        .then((res) => {
          console.log(res);
          // getAllPosts();
          getPostByUserId(userId);
        })
        .catch((err) => console.trace(err));
    };
    //! == traitement de l'input commentaire
    const handleChange = (evt) => {
      const { value } = evt.target;
      console.log('value', value);
      setState({
        ...state,
        [evt.target.name]: value,
      });
    };
    // console.log('state', state);
    const handleProfilPage = (id) => {
      console.log('profil');
      if (userId !== id) {
        history.push(`/dashboard/${id}`);
      }
    };

    if (filteredProfilePosts) {
      postsJSX = filteredProfilePosts.map((p) => {
        // console.log('hello post');
        //! === COLOR LIKE
        let colorLike = '';
        let colorSave = '';
        let colorRetweet = '';
        if (p.likes) {
          p.likes.forEach((l) => {
            // console.log('l', l);
            if (l.app_users_id === userId) colorLike = '#EB5757';
          });
          //! === COLOR SAVE
        }

        if (p.saved) {
          p.saved.forEach((s) => {
            // console.log('s', s);
            if (s.app_users_id === userId) colorSave = '#2D9CDB';
          });
        }

        //! === COLOR RETWEET
        if (p.retweets) {
          p.retweets.forEach((r) => {
            // console.log('r', r);
            if (r.app_users_id === userId) colorRetweet = '#27AE60';
          });
        }

        // const [inputValue, setInputValue] = useState({
        //   [p.id]: [p.id],
        // });
        //! === PICTURES
        let pictureJSX;
        if (p.picture) {
          pictureJSX = <img className={classes.picture} src={`${API_URL}/img/${p.picture}`} alt="post" />;
        }
        //! === COMMENTAIRES
        let commentsJSX;
        if (p.comments) {
          commentsJSX = p.comments.map((c) => {
            console.log(('hello'));
            let classAuthorComment;
            if (c.author) {
              (c.author.id === userId)
                ? (classAuthorComment = classes.authorCommentUnlink)
                : (classAuthorComment = classes.authorCommentLink);
            }
            return (
              <div key={c.id + 100000} className={classes.containerComment}>
                <Avatar pictureSrc={c.author.picture_road} />
                <div className={classes.nameDateComment}>
                  <div>
                    <span
                      onClick={() => handleProfilPage(c.author.id)}
                      className={classAuthorComment}
                    >
                      {c.author.firstname}
                      {' '}
                      {c.author.lastname}
                    </span>
                    <span className={classes.commentDate}>
                      <Moment fromNow>{c.created_at}</Moment>
                    </span>
                  </div>
                  <div className={classes.comment}>
                    {c.content}
                  </div>
                </div>
              </div>
            );
          });
        }
        let classAuthorPost;
        if (p.author) {
          (p.author.id === userId)
            ? (classAuthorPost = classes.authorPostUnlink)
            : (classAuthorPost = classes.authorPostLink);
        }

        return (
          <Grid key={p.id + 120} item xs={9} style={{ maxWidth: '100%', marginBottom: '0.5em' }}>
            <Paper className={classes.paper}>
              {/* ----- AUTHOR & PICTURE ----- */}
              <header className={classes.headerPost}>
                {p.author ? (<Avatar pictureSrc={p.author.picture_road} />) : null}
                {/* <Avatar pictureSrc={p.author.picture_road} /> */}
                <div>
                  <div
                    onClick={() => handleProfilPage(p.author.id)}
                    // className={(p.author.id === userId) ? classes.unlink : classes.link}
                    className={classAuthorPost}
                  >
                    {p.author ? p.author.firstname : null}
                    {' '}
                    {p.author ? p.author.lastname : null}
                    {/* {p.author.lastname} */}
                  </div>
                  <span className={classes.date}>
                    <Moment fromNow>{p.created_at}</Moment>
                  </span>
                </div>
              </header>
              {/* ----- CONTENT & PICTURE ----- */}
              <main style={{ marginBottom: '1em' }}>
                <p className={classes.textContent}>{p.content}</p>
                {pictureJSX}
              </main>
              {/* ----- IMPRESSIONS ----- */}
              <main>
                <div className={classes.containerImpression}>
                  <div className={classes.impression}>
                    <ChatBubbleOutlineIcon style={{ marginRight: '0.5em' }} />

                    <span className={classes.displayNoneDownXS}>
                      Comment
                    </span>
                    (
                    {p.comment ? p.comments.length : 0}
                    )
                  </div>
                  <div
                    className={classes.impression}
                    onClick={() => handleRetweet(p.id)}
                    style={{ color: colorRetweet }}
                  >
                    <RepeatIcon style={{ marginRight: '0.5em', color: colorRetweet }} />
                    <span className={classes.displayNoneDownXS}>
                      Retweet
                    </span>
                    (
                    {p.retweets ? p.retweets.length : 0}
                    {/* {p.post_retweeted_by.length} */}
                    )
                  </div>
                  <div
                    onClick={() => handleLike(p.id)}
                    className={classes.impression}
                    style={{ color: colorLike }}
                  >
                    <FavoriteBorderIcon style={{ marginRight: '0.5em', color: colorLike }} />
                    <span className={classes.displayNoneDownXS}>
                      Likes
                    </span>
                    (
                    {p.likes ? p.likes.length : 0}
                    {/* {p.post_liked_by.length} */}
                    )
                  </div>
                  <div
                    onClick={() => handleSave(p.id)}
                    className={classes.impression}
                    style={{ color: colorSave }}
                  >
                    <TurnedInNotIcon style={{ marginRight: '0.5em', color: colorSave }} />
                    <span className={classes.displayNoneDownXS}>
                      Save
                    </span>
                    (
                    {p.saved ? p.saved.length : 0}
                    {/* {p.post_saved_by.length} */}
                    )
                  </div>
                </div>
              </main>
              {/* ----- INPUT FOR COMMENTS ----- */}
              <main className={classes.containerInputComments}>
                <Avatar pictureSrc={userData.picture_road} />

                <TextField
                  onChange={handleChange}
                  className={classes.inputComment}
                  variant="outlined"
                  placeholder="Tweet your reply"
                        // error={!!errors.{`comment${p.id}`}}
                  name={`postId-${p.id}`}
                  id={`postId-${p.id}`}
                  type="text"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <CropOriginalIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  inputRef={
                          register({
                            required: 'Comment can not be empty',
                            // pattern: {
                            //   value: /^\S+@\S+$/i,
                            //   message: 'Wrong format',
                            // },
                          })
                        }
                />
                {/* <button type="submit">submit</button> */}

              </main>
              {/* ----- COMMENTS ----- */}
              <main className={classes.containerComments}>
                {/* <Avatar pictureSrc={p.comments.author.picture_road} />
                    Hello */}
                {commentsJSX}
              </main>
            </Paper>
          </Grid>
        );
      });
    }
  }
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const tableKeyInpuId = Object.keys(state);
    const myKeyObject = tableKeyInpuId[tableKeyInpuId.length - 1];
    //! on cherche le content

    const content = state[`${myKeyObject}`];
    console.log('content', content);
    const postId = myKeyObject.substring(7);
    //! on a le post id tout le temps
    console.log('postId', postId);
    //! on ajoute le commentaire en base
    axios
      .post(`${API_URL}/usercommentspost`, {
        content,
        app_users_id: userId,
        post_id: postId,
      }, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('res', res);
        getAllPosts();
        const myInput = document.getElementById(`postId-${postId}`);
        console.log('myInput', myInput);
        myInput.value = '';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form
        style={{ width: '100%' }}
        onSubmit={handleCommentSubmit}
      >
        {postsJSX}
      </form>
    </>
  );
};

export default PostProfile;
