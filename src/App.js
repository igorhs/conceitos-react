import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data)
    });
  }, []);

  async function handleAddRepository() {
    
    const repository = await api.post('/repositories', {
      title: 'Adicionei um JSON ao backend hehe',
    });

    const newRepository = repository.data;

    setRepositories([ ...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const updatedRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
