import { makeStyles } from '@material-ui/styles';
import { green, yellow, grey } from '@material-ui/core/colors';

const styles = makeStyles({
  container: {
    maxWidth: '1280px',
    width: '100%',
    margin: '50px auto',
  },
  buttonSucess: {
    padding: '10px 30px',
    fontWeight: 'bold',
    maxWidth: '440px',
    margin: '10px auto',
    backgroundColor: green[600],
    color: '#fff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: green[900],
    },
  },
  buttonWarning: {
    padding: '10px 30px',
    fontWeight: 'bold',
    maxWidth: '440px',
    margin: '10px auto',
    backgroundColor: yellow[800],
    color: '#fff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: yellow[900],
    },
  },
  buttonWhite: {
    padding: '10px 30px',
    fontWeight: 'bold',
    maxWidth: '440px',
    margin: '10px auto',
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: grey[200],
    },
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  formInput: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  formButtons: {
    display: 'flex',
  },
  input: {
    width: '100%',
    height: 'auto',
    color: '#333',
    padding: '5px 24px',
    marginBottom: '10px',
    background: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  textarea: {
    width: '100%',
    minHeight: '140px',
    resize: 'vertical',
    height: '60px',
    color: '#333',
    padding: '16px 24px',
    lineHeight: '24px',
    background: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  backdrop: {
    zIndex: 5,
    color: '#fff',
  },
});

export default styles;
