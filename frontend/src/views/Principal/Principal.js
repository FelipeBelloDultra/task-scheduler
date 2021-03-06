import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2, FiEdit3, FiCheckCircle } from 'react-icons/fi';
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Backdrop
} from '@material-ui/core';

import styles from './styles';
import api from '../../services/api';
import SnackBarCustom from '../../components/SnackBarCustom';

const Principal = () => {
  const history = useHistory();
  const classes = styles();

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    tipo: 'success',
  });

  const getTasks = async () => {
    const response = await api.get('/tasks/list');

    setTasks(response.data);
  };

  const checkTask = async (id) => {
    try {
      setOpen(true);
      await api.put(`/tasks/check/${id}`, {
        check: true,
      });
      setTasks(tasks.filter(task => task.id !== id));
      setSnack({
        open: true,
        message: 'Tarefa terminada com sucesso!',
        tipo: 'success',
      });
      setOpen(false);
    } catch (error) {
      setOpen(false);
      setSnack({
        open: true,
        message: 'Erro ao terminar tarefa!',
        tipo: 'error',
      });
    }
  };

  useEffect(() => {
    try {
      setOpen(true);
      document.title = 'Lista de Tarefas';
      getTasks();
      setOpen(false);
    } catch (error) {
      setOpen(false);
      setSnack({
        open: true,
        message: 'Erro ao listar tarefas!',
        tipo: 'error',
      });
    }
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      setOpen(true);
      await api.delete(`/tasks/delete/${id}`);

      setTasks(tasks.filter(task => task.id !== id));
      setOpen(false);
    } catch (error) {
      setOpen(false);
      alert('Erro ao deletar caso!!!');
    };
  };

  return (
    <Box component="div" className={classes.container}>
      <Button
        className={classes.buttonSucess}
        onClick={() => history.push('/create')}
        variant="contained"
      >
        Adicionar Tarefa
      </Button>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Descrição</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length > 0 ? tasks.map((task, i) => (
            <TableRow key={i}>
              <TableCell align="left">{task.id}</TableCell>
              <TableCell align="left">{task.type}</TableCell>
              <TableCell align="left">{task.title}</TableCell>
              <TableCell align="left">{task.description}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FiTrash2
                    size={20}
                    color="#dc3545"
                  />
                </Button>
                <Button
                  onClick={() => history.push(`/edit/${task.id}`)}
                >
                  <FiEdit3
                    size={20}
                    color="#007bff"
                  />
                </Button>
                <Button
                  onClick={() => checkTask(task.id)}
                >
                  <FiCheckCircle
                    size={20}
                    color="#09BD00"
                  />
                </Button>
              </TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
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

export default Principal;
