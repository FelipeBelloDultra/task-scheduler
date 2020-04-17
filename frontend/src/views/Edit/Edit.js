import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Box,
  Button,
  Input,
  CircularProgress,
  Backdrop
} from '@material-ui/core';

import styles from './styles';
import api from '../../services/api';
import SnackBarCustom from '../../components/SnackBarCustom';

const Edit = (props) => {
  const history = useHistory();
  const classes = styles();
  const [value, setValue] = useState({});
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    tipo: 'success',
  });

  const getTask = async (id) => {
    const response = await api.get(`/tasks/list/${id}`);

    setValue(response.data[0]);
  };

  useEffect(() => {
    setOpen(true);
    const id = props.match.params.id;
    document.title = 'Editar Tarefa';
    getTask(id);
    setOpen(false);
  }, [props.match.params.id]);

  const handleClearTask = (event) => {
    event.preventDefault();

    setValue({
      ...value,
      type: '',
      title: '',
      description: '',
    });
  };

  const handlePutTask = async () => {
    try {
      setOpen(true);
      const id = props.match.params.id;

      await api.put(`/tasks/update/${id}`, {
        type: value.type,
        title: value.title,
        description: value.description
      });

      setOpen(false);
      history.push('/');
    } catch (error) {
      setSnack({
        open: true,
        message: 'Erro ao editar tarefa!',
        tipo: 'error',
      });
      setOpen(false);
    }
  };

  return (
    <Box className={classes.container}>
      <Box component="div" className={classes.form}>
        <Box className={classes.formInput}>
          <Input
            className={classes.input}
            placeholder="Tipo"
            value={value.type || ''}
            onChange={(event) => setValue({
              ...value,
              type: event.target.value
            })}
          />
          <Input
            className={classes.input}
            placeholder="Titulo"
            value={value.title || ''}
            onChange={(event) => setValue({
              ...value,
              title: event.target.value
            })}
          />
          <Input
            className={classes.textarea}
            placeholder="Descrição"
            value={value.description || ''}
            onChange={(event) => setValue({
              ...value,
              description: event.target.value
            })}
          />
        </Box>
        <Box component="div" className={classes.formButtons}>
          <Button className={classes.buttonWhite} onClick={() => { history.push('/home') }}>
            <FiArrowLeft
              size={16}
              color="#000"
            />
            Voltar
          </Button>
          <Button className={classes.buttonWarning} onClick={handleClearTask}>Limpar</Button>
          <Button className={classes.buttonSucess} onClick={handlePutTask}>ALterar tarefa</Button>
        </Box>
      </Box>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackBarCustom
        handleClose={() => { setSnack({ ...snack, open: false }) }}
        open={snack.open}
        variant={snack.tipo}
        message={snack.message}
      />
    </Box>
  );
};

export default Edit;
