import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

const Edit = (props) => {
  const history = useHistory();
  const [value, setValue] = useState({});

  const getTask = async (id) => {
    const response = await api.get(`/tasks/list/${id}`);

    setValue(response.data[0]);
  };

  useEffect(() => {
    const id = props.match.params.id;
    document.title = 'Editar Tarefa';
    getTask(id);

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

  const handlePutTask = async (event) => {
    event.preventDefault();
    const id = props.match.params.id;

    await api.put(`/tasks/update/${id}`, {
      type: value.type,
      title: value.title,
      description: value.description
    });

    history.push('/');
  };

  return (
    <div className="container">
      <div className="container-edit">
        <form onSubmit={handlePutTask}>

          <input
            placeholder="Tipo"
            value={value.type || ''}
            onChange={(event) => setValue({
              ...value,
              type: event.target.value
            })}
          />
          <input
            placeholder="Título"
            value={value.title || ''}
            onChange={(event) => setValue({
              ...value,
              title: event.target.value
            })
            } />
          <textarea
            placeholder="Descrição"
            value={value.description || ''}
            onChange={(event) => setValue({
              ...value,
              description: event.target.value
            })} ></textarea>

          <div className="container-edit-buttons">
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
            <button className="create-btn" onClick={handleClearTask}>Limpar</button>
            <button className="edit-btn" type="submit">Alterar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
