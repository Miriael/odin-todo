import './style.css'
const ProjectFactory = (title, todos) => {
  const getTitle = () => {return title};
  const setTitle = (newTitle) => title = newTitle;
  const addNewTodo = (newTodo) => todos.push(newTodo);
  const getTodos = () => {return todos};
  const removeTodo = (target) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].getTodoTitle() == target) {
        delete todos[i]
        todos = todos.filter(element => {
          return element !== undefined;
        });
      }
    }
  } 
  return { getTitle, setTitle, addNewTodo, removeTodo, getTodos }
}

const ToDoFactory = (title, dueDate) => {
  const getTodoTitle = () => {return title};
  const setTitle = (newTitle) => title = newTitle;
  const getDueDate = () => {return dueDate};
  const setDueDate = (newDueDate) => dueDate = newDueDate;
  return { getTodoTitle, setTitle, getDueDate, setDueDate }
}

let loadedprojects = {}

testproject = ProjectFactory("Project", [ToDoFactory("Todo 1", "Today")]);
//console.log(testproject.getTodos()[0].getTodoTitle())
testproject.getTodos()[0].setTitle('banana')
//console.log(testproject.getTodos()[0].getTodoTitle())

function JSONify (project) {
  let projectTitle = project.getTitle()
  let projectTodos = []
  if (project.getTodos().length != 0) {
    for (let i = 0; i < project.getTodos().length; i++) {
      let Todo = {"title":project.getTodos()[i].getTodoTitle(), "date":project.getTodos()[i].getDueDate()}
      projectTodos.push(Todo)
    }
  }
  let JSONified = {"title":projectTitle, "todos":projectTodos}
  localStorage.setItem('Project', JSON.stringify(JSONified))
}

JSONify(testproject)
//console.log(localStorage.getItem('Project'))
testproject.setTitle("ass")
testproject.removeTodo("banana")
JSONify(testproject)
//console.log(localStorage.getItem('Project'))

/* 
for (every key:value pair in localstorage object):
  create project(key)
  for every object in values:
    create todo from the values of the key
    add todo to project
  add project to loadedprojects
*/

function retrieveJSONData() {
  loadedprojects = {}
    for(let key of Object.keys(localStorage)) {
      let a = JSON.parse(localStorage[key])
      console.log(a)
      console.log(a['todos'])
      loadedprojects[key] = ProjectFactory(key, [ToDoFactory(a['title'], a['todos'])])
      console.log(loadedprojects['Project'].getTodos()[0].getTodoTitle())
    }
}

retrieveJSONData()

//TODO: Function that revives the JSONified object and gives it back all the methods




/* What needs to happen
-When the webpage is opened the existing project objects containing multiple todo objects each are retrieved from local storage and
displayed, with the ability to edit the existing ones or create a new project or add a todo to an existing project
>Either have an empty default project with a default todo existing OR have the application start with nothing, latter preffered?


-How to handle saving\loading
>Need to be working on the project directly rather than displayed values of it same with todos

-When any changes are made they are immediately saved to localstorage and all the displayed elements get updated according to the
current contents of localstorage









*/