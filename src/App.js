import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositores] = useState([]);
  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositores(response.data);
    });
}, []);
  async function handleAddRepository() {
    const reponse = await api.post('repositories', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Felipe Anjos'
    });
    const project = reponse.data;
    setRepositores([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositores([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
         {repositories.map(project =>  <li key={project.id}>{project.title}<button onClick={() => handleRemoveRepository(project.id)}>Remover</button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
