import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Box,
  Button,
  Input,
  CircularProgress,
  Backdrop
} from '@material-ui/core';

import styles from './styles.js';
import api from '../../services/api';
import SnackBarCustom from '../../components/SnackBarCustom';

const Create = () => {
  const history = useHistory();
  const classes = styles();

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    tipo: 'success',
  });

  useEffect(() => {
    document.title = 'Criar Tarefa';
  });

  const handleClearTask = (event) => {
    setOpen(true);
    event.preventDefault();

    setType('');
    setTitle('');
    setDescription('');
    setOpen(false);
  };

  const handleSubmitTask = async (event) => {
    try {
      setOpen(true);
      event.preventDefault();

      await api.post('/tasks/create', {
        type,
        title,
        description
      });

      setOpen(false);
      history.push('/');
    } catch (error) {
      setSnack({
        open: true,
        message: 'Erro ao criar tarefa!',
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
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
          <Input
            className={classes.input}
            placeholder="Titulo"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            className={classes.textarea}
            placeholder="Descrição"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
          <Button className={classes.buttonSucess} onClick={handleSubmitTask}>Salvar tarefa</Button>
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

export default Create
