import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiBookmark, FiTrash2, FiEdit3 } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

const Principal = () => {
  const history = useHistory();

  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await api.get('/tasks/list');

    setTasks(response.data);
  };

  useEffect(() => {
    document.title = 'Lista de Tarefas';
    getTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/delete/${id}`);

      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      alert('Erro ao deletar caso!!!');
    };
  };

  return (
    <div className="container">
      <div className="container-principal-button">
        <button onClick={() => history.push('/create')}>
          <FiBookmark
            size={17}
          />
            Adicionar Tarefa
          </button>
      </div>
      <div
        className="container-cards"
      >
        {tasks.map((task, i) => (
          <div className="card" key={i}>
            <p>
              <b>Tipo: </b>{task.type}
            </p>
            <p>
              <b>Título: </b>{task.title}
            </p>
            <p>
              <b>Descrição: </b>{task.description}
            </p>
            <button
              type="button"
              onClick={() => handleDeleteTask(task.id)}
            >
              <FiTrash2
                size={20}
                color="#a8a8b3" />
            </button>

            <button
              type="button"
              onClick={() => history.push(`/edit/${task.id}`)}
            >
              <FiEdit3 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Principal;
