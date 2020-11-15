/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  // Grid,
  Paper,
  TextField,
  InputAdornment,
  // Link,
} from '@material-ui/core';
import Moment from 'react-moment';
// === component
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { API_URL } from '../../utils/constante';

import Avatar from './Avatar';
// === fake picture
// import picture from '../../image/exemple.jpg';
// === icon

// === method
import getAllPosts from '../../utils/getAllPosts';

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
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0.5em',
    },
  },
  headerPost: {
    display: 'flex',
    alignItems: 'center',
  },
  author: {
    fontFamily: 'Poppins, sans serif',
    fontWeight: '500',
    fontSize: '16px',
    color: 'black',
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
  commentAuthor: {
    fontFamily: 'Popins, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    // color: 'black',
    paddingRight: '1em',
    '&:hover': {
      cursor: 'pointer',
    },
    color: '#2F80ED',
  },
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
  unlink: {
    color: 'black',
  },
  link: {
    '&:hover': {
      cursor: 'pointer',
    },
    color: '#2F80ED',
  },
}));

// let i = 0;

const Posts = () => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const {
    register,
    // handleSubmit,
    // errors
  } = useForm();
  const classes = useStyles();
  const { posts } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.auth);
  const userId = JSON.parse(localStorage.getItem('userId'));
  // const [inputValue, setInputValue] = useState('');
  //! method pour voir profil page of others users
  const handleProfilPage = (id) => {
    console.log('profil');
    if (userId !== id) {
      history.push(`/dashboard/${id}`);
    }
  };

  //! traitement des impressions
  //! traitement des likes
  const handleLike = (postId) => {
    // console.log('postId', postId);
    axios
      .post(`${API_URL}/userlikespost`, {
        app_users_id: userId,
        post_id: postId,
      })
      .then((res) => {
        console.log(res);
        getAllPosts();
      })
      .catch((err) => console.trace(err));
  };
  //! traitement des retweet
  const handleRetweet = (postId) => {
    // console.log('postId', postId);
    axios
      .post(`${API_URL}/userretweetedpost`, {
        app_users_id: userId,
        post_id: postId,
      })
      .then((res) => {
        console.log(res);
        getAllPosts();
      })
      .catch((err) => console.trace(err));
  };
  //! traitement des saved
  const handleSave = (postId) => {
    // console.log('postId', postId);
    axios
      .post(`${API_URL}/usersavedpost`, {
        app_users_id: userId,
        post_id: postId,
      })
      .then((res) => {
        console.log(res);
        getAllPosts();
      })
      .catch((err) => console.trace(err));
  };

  //! == === === === === === traitement de l'input commentaire
  //! je crée mon usestate pour récuperer les valeurs
  const [state, setState] = React.useState();
  // const [inputValue, setInputValue] = React.useState(useStateObject);
  //!
  const handleChange = (evt) => {
    const { value } = evt.target;
    console.log('value', value);
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  console.log('state', state);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const tableKeyInpuId = Object.keys(state);
    const myKeyObject = tableKeyInpuId[tableKeyInpuId.length - 1];
    //! on cherche le content

    const content = state[`${myKeyObject}`];
    // console.log('content', content);
    const postId = myKeyObject.substring(7);
    //! on a le post id tout le temps
    // console.log('postId', postId);
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
  //! === POST MAP

  let postsJSX;
  if (posts) {
    postsJSX = posts.map((p) => {
      // console.log('hello post');
      //! === COLOR LIKE
      let colorLike = '';
      p.likes.forEach((l) => {
        if (l.app_users_id === userId) colorLike = '#EB5757';
      });
      //! === COLOR SAVE
      let colorSave = '';
      p.saved.forEach((s) => {
        if (s.app_users_id === userId) colorSave = '#2D9CDB';
      });
      //! === COLOR RETWEET
      let colorRetweet = '';
      p.retweets.forEach((r) => {
        if (r.app_users_id === userId) colorRetweet = '#27AE60';
      });
      // const [inputValue, setInputValue] = useState({
      //   [p.id]: [p.id],
      // });
      //! === PICTURES
      let pictureJSX;
      if (p.picture) {
        pictureJSX = <img className={classes.picture} src={`${API_URL}/img/${p.picture}`} alt="post" />;
      }
      //! === COMMENTAIRES

      const commentsJSX = p.comments.map((c) => (
        <div key={c.id + 100000} className={classes.containerComment}>
          <Avatar pictureSrc={c.author.picture_road} />
          <div className={classes.nameDateComment}>
            <div>
              <span
                onClick={() => handleProfilPage(c.author.id)}
                className={(c.author.id === userId) ? classes.unlink : classes.link}
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
      ));
      let linkProfilUsers = classes.link;
      if (p.author.id === userId) linkProfilUsers = classes.unlink;
      return (
      // <Grid key={p.id + 120} item xs={9}>
        <Paper key={p.id + 120} className={classes.paper}>
          {/* ----- AUTHOR & PICTURE ----- */}
          <header className={classes.headerPost}>
            <Avatar pictureSrc={p.author.picture_road} />
            <div>
              <div className={classes.author}>
                <div
                  className={linkProfilUsers}
                  // href="#"
                  onClick={() => handleProfilPage(p.author.id)}
                >
                  {p.author.firstname}
                  {' '}
                  {p.author.lastname}
                </div>
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
                {p.comments.length}
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
                {p.retweets.length}
                )
              </div>
              <div
                onClick={() => handleLike(p.id)}
                className={classes.impression}
                style={{ color: colorLike }}
              >
                <FavoriteBorderIcon style={{ marginRight: '0.5em', color: colorLike }} />
                <span className={classes.displayNoneDownXS}>
                  Like
                </span>
                (
                {p.likes.length}
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
                {p.saved.length}
                )
              </div>
            </div>
          </main>
          {/* ----- INPUT FOR COMMENTS ----- */}
          <main className={classes.containerInputComments}>
            <Avatar pictureSrc={userData.picture_road} />
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <TextField
              onChange={handleChange}
              className={classes.inputComment}
              variant="outlined"
              placeholder="Tweet your reply"
                  // error={!!errors.{`comment${p.id}`}}
              name={`postId-${p.id}`}
              id={`postId-${p.id}`}
                // value={state.[`postId-${p.id}`]}
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
            <input type="submit" style={{ display: 'none' }} />
            {/* <button type="submit">submit</button> */}
            {/* </form> */}
          </main>
          {/* ----- COMMENTS ----- */}
          <main className={classes.containerComments}>
            {/* <Avatar pictureSrc={p.comments.author.picture_road} />
              Hello */}
            {commentsJSX}
          </main>
        </Paper>
      // </Grid>
      );
    });
  }
  return (
    <>
      <form
        style={{
          marginTop: '0.5em',
          // width: '100%',
          // padding: '12px',
        }}
        onSubmit={handleCommentSubmit}
      >
        {postsJSX}
      </form>
    </>
  );
};

export default Posts;
