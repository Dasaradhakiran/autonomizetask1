import {Component} from "react"
import {v4 as uuidv4} from "uuid"

import TodoItem from "../TodoItem"

import "./index.css"

const initialTodoList = [
    {
        id: 1,
        todoName: "Write code",
        updateCount: 0,
        updateTodo: false,
        quantity: 0
    },
    {
        id: 2,
        todoName: "Read Blog",
        updateCount: 0,
        updateTodo: false,
        quantity: 0
    }
]

class AppPage extends Component {
    state = {userTodo: "", todoList: initialTodoList, todoLength: 0, todoCount: 0}

    changeTodo = (event) => {
        this.setState({userTodo: event.target.value})
    }

    addTodo = () => {
        const {userTodo, todoCount,todoLength} = this.state
        const newTextTodo = userTodo.slice(0,todoLength)
        if (userTodo !== "") {
            const newTodo = {
                id: uuidv4(),
                todoName: newTextTodo,
                updateCount: 0,
                updateTodo: false,
                quantity: todoCount
            }

            this.setState(prevState => ({todoList: [...prevState.todoList, newTodo], userTodo : "", todoCount: 0, todoLength: 0}))
        }
    }

    changeUpdateActive = (todoId) => {
        const {todoList} = this.state 
        const updateList = todoList.map(eachTodo => {
            if (eachTodo.id === todoId) {
                return {
                    id: eachTodo.id,
                    todoName: eachTodo.todoName,
                    updateCount: eachTodo.updateCount,
                    updateTodo: true,
                    quantity: eachTodo.quantity
                }
            } else {
                return eachTodo
            }
        })
        this.setState({todoList: updateList})
    }

    changeUpdateStatus = (todoId,name) => {
        const {todoList} = this.state 
        const updateList = todoList.map(eachTodo => {
            let updateQuantity
            if (eachTodo.id === todoId) {
                if (name !== eachTodo.todoName) {
                    let count = 0
                    for (let eachTodo of todoList) {
                        if (eachTodo.todoName === name) {
                            count += 1 
                        }
                    }
                    updateQuantity = count
                } else {
                    updateQuantity = eachTodo.quantity
                }
                return {
                    id: eachTodo.id,
                    todoName: name,
                    updateCount: eachTodo.updateCount + 1,
                    updateTodo: false,
                    quantity: updateQuantity
                }
            } else {
                return eachTodo
            }
        })
        this.setState({todoList: updateList})
    }

    deleteTodo = (todoId) => {
        const {todoList} = this.state
        const updateList = todoList.filter(eachTodo => (eachTodo.id !== todoId))
        this.setState({todoList: updateList})
    }
    
    onBlurInput = () => {
        const {todoList, userTodo} = this.state

        let count = 0 
        for (let eachTodo of todoList) {
            if (eachTodo.todoName === userTodo) {
                count += 1 
            }
        }
        let newText
        if (count > 0) {
            newText = userTodo + " " + count
        } else {
            newText = userTodo
        }
        this.setState({userTodo: newText, todoLength: userTodo.length , todoCount: count})
    }

    render() {
        const {userTodo, todoList} = this.state

        return(
            <div className="app-main-cont">
                <h1 className="app-main-text">Day Goals!</h1>
                <div className="app-input-cont">
                    <input className="app-input-elem" type="text" onBlur={this.onBlurInput} onChange={this.changeTodo} value={userTodo} placeholder="Add a todo" />
                    <button className="app-btn-elem" type="button" onClick={this.addTodo} >Add Todo</button>
                </div>
                <ul className="app-ul-cont">
                    {todoList.map(eachTodo => (
                        <TodoItem 
                            key={eachTodo.id} 
                            changeUpdateActive={this.changeUpdateActive} 
                            todoDetails={eachTodo} 
                            changeUpdateStatus={this.changeUpdateStatus} 
                            deleteTodo={this.deleteTodo}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default AppPage