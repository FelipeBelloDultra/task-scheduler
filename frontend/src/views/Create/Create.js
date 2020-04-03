import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

const Create = () => {
  const history = useHistory();

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    document.title = 'Criar Tarefa';
  });

  const handleClearTask = (event) => {
    event.preventDefault();

    setType('');
    setTitle('');
    setDescription('');
  };

  const handleSubmitTask = async (event) => {
    event.preventDefault();

    await api.post('/tasks/create', {
      type,
      title,
      description
    });

    history.push('/');
  };

  return (
    <div className="container">
      <div className="container-create">
        <form onSubmit={handleSubmitTask}>
          <input
            value={type}
            onChange={(event) => setType(event.target.value)}
            placeholder="Tipo"
          />
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Titulo"
          />
          <textarea value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descrição"></textarea>
          <div className="container-create-buttons">
            <Link
              className="back-link back-btn"
              to="/"
            >
              <FiArrowLeft
                size={16}
                color="#000"
              />
              Voltar
            </Link>
            <button className="edit-btn" onClick={handleClearTask}>Limpar</button>
            <button className="create-btn" type="submit">Adicionar tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create
