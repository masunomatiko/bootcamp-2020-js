import { removeTodoAction, checkTodoAction } from '../flux/index.js';
import store from '../store.js';

class Todo {
  constructor(parent, { id, name, done }) {
    this.parent = parent;
    this.element = document.createElement("li");
    this.element.className = "todo-item";
    this.props = { id, name, done };
  }

  mountRemove() {
    const removeButton = this.element.querySelector('.todo-remove-button');
    removeButton.addEventListener('click', () => {
      store.dispatch(removeTodoAction(this.props.id));
      // console.log('clicked!! %o', this.props.id);
      // const url = 'http://localhost:3000/todo/' + this.props.id;
      // fetch(url, {method: 'DELETE'})
      //   .then(()=> console.log('removed'))
      //   .catch((err) => console.log('something wrong happened %o', err));
    });
  }

  mountCheck() {
    const checkToggle = this.element.querySelector('.todo-toggle__checkmark');
    checkToggle.addEventListener('click', () => {
      store.dispatch(checkTodoAction({id: this.props.id, name: this.props.name, done: !this.props.done}));
    });

  }

  render() {
    const { id, name, done } = this.props;
    this.element.innerHTML = `
      <label class="todo-toggle__container">
        <input
          data-todo-id="${id}"
          type="checkbox"
          class="todo-toggle"
          value="checked"
          ${done ? "checked" : ""}
        />
        <span class="todo-toggle__checkmark"></span>
      </label>
      <div class="todo-name">${name}</div>
      <div data-todo-id="${id}" class="todo-remove-button">x</div>
    `;
    this.parent.appendChild(this.element);
    this.mountRemove();
    this.mountCheck();
  }
}

export default Todo;
