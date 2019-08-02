import React, {Component} from 'react';
import { logout, getTasks, getUser, deleteTask } from '../api';
import { withRouter } from "react-router-dom";
import routes from '../routes';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';
import Button from '../components/Button';

class MainPage extends Component {
  state = {
    user: null,
    tasks: [],
    addTask: null
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const user = getUser();
    const tasks = await getTasks();
    this.setState({ user, tasks });
  }

  handleLogout = async () => {
    const { history } = this.props;
    await logout();
    history.push(routes.login);
  }

  handleAddTask = () => {
    this.setState({ addTask: {} });
  }

  addTask = task => {
    this.setState({
      tasks: [...this.state.tasks, task], 
      addTask: null
    });
  }

  cancelAddTask = () => {
    this.setState({ addTask: null });
  }

  handleEditTask = id => {
    const index = this.state.tasks.findIndex(x => x._id === id);
    const tasks = [...this.state.tasks];
    tasks[index] = { ...tasks[index], edit: true };
    this.setState({ tasks });
  }

  editTask = task => {
    const index = this.state.tasks.findIndex(x => x._id === task._id);
    const tasks = [...this.state.tasks];
    tasks[index] = task;
    this.setState({ tasks });
  }

  cancelEditTask = id => {
    const index = this.state.tasks.findIndex(x => x._id === id);
    const tasks = [...this.state.tasks];
    tasks[index] = { ...tasks[index], edit: false };
    this.setState({ tasks });
  }

  handleDeleteTask = async id => {
    await deleteTask(id);
    this.setState({
      tasks: this.state.tasks.filter(x => x._id !== id)
    });
  }

  render () {
    const { user, tasks, addTask } = this.state;
    return (
      <div className="main-page container">
        <h4>Main page</h4>
        <p>
            ID: <b>{user && user._id}</b> <br/>
            Username: <b>{user && user.username}</b>
        </p>
        <div className="row">
          <div className="col">
            <p>Total tasks: <b>{tasks.length}</b></p>
          </div>
          <div className="col-auto">
            <Button
              text="Add task"
              variant="primary"
              onClick={this.handleAddTask}
            />
          </div>
        </div>

        {addTask && (
          <>
            <h5>Add task</h5>
            <TaskForm task={addTask} saveTask={this.addTask} cancel={this.cancelAddTask} />
          </>
        )}

        {tasks.map(task => {
          if (task.edit) {
            return <TaskForm key={-1} task={task} saveTask={this.editTask} cancel={this.cancelEditTask} />
          }
          return <Task key={task._id} task={task} handleEdit={this.handleEditTask} handleDelete={this.handleDeleteTask} />
        })}
        
        <Button
          onClick={this.handleLogout}
          variant="primary"
          text="Logout"
        />
      </div>
    );
  }
}

export default withRouter(MainPage);
