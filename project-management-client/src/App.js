import React from 'react';
import './App.css';

import ProjectList from './components/Projects/ProjectList/ProjectList';
import NavBar from "./components/NavBar/NavBar";
import ProjectDetail from './components/Projects/ProjectDetail/ProjectDetail';
import TaskDetail from './components/Tasks/TaskDetail';

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/projects" render={props => (
           <ProjectList {...props} />
        )} />
        <Route exact path="/projects/:id" render={props => (
           <ProjectDetail {...props} />
        )} />

        <Route exact path="/tasks/:taskId" render={props => (
           <TaskDetail {...props} />
        )} />

      </Switch>
    </div>
  );
}

export default App;
