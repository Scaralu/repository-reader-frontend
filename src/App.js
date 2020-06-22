import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);
  //**repositories** points to the actual state;
  //**setRepositories** creates a completely new state and aggregate it in this const
  //**useState** sets our inicial state;
  useEffect(()=>{
    api.get('/repositories')
      .then(response => {
        setRepositories(response.data);
      })
  })


  async function handleAddRepository() {
    const async_create = await api.post('/repositories', {
      title: `GoStack with ReactJS ${Date.now()}`,
      url: `https://${Date.now()}.com`,
      techs: [
        "React",
        "React Native",
        "Node.js"
      ]
    });

    const repository = async_create.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(repositoryId) {
    const async_delete = await api.delete(`/repositories/${repositoryId}`);
  }

  return (
    <div>
      <h1>Repositories</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key = {repository.id}>{repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
