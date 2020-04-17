import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const styles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '1280px',
    width: '100%',
    margin: '0 auto',
  },
  buttonSucess: {
    padding: '10px 30px',
    fontWeight: 'bold',
    maxWidth: '440px',
    margin: '10px auto',
    backgroundColor: green[600],
    color: '#fff',
    '&:hover': {
      backgroundColor: green[900],
    },
  },
  table: {
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  backdrop: {
    zIndex: 5,
    color: '#fff',
  },
}));

export default styles;
