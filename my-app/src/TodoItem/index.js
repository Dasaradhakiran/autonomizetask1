import { Component } from "react"
import { TiPencil } from "react-icons/ti"
import { ImCross } from "react-icons/im"
import "./index.css"

class TodoItem extends Component {
    state = {updateName: this.props.todoDetails.todoName}

    changeUpdate = (event) => {
        this.setState({updateName: event.target.value})
    }

    render() {
        const {updateName} = this.state
        const {todoDetails, changeUpdateActive, changeUpdateStatus, deleteTodo} = this.props 
        const {id, todoName, updateCount, updateTodo, quantity} = todoDetails

        let updateTodoQuantity 
        if (quantity > 0) {
            updateTodoQuantity = todoName + " " + quantity
        } else {
            updateTodoQuantity = todoName
        }

        const clickUpdateActive = () => {
            changeUpdateActive(id)
        }
        const clickUpdateStatus = () => {
            changeUpdateStatus(id,updateName)
        }
        const clickDeleteTodo = () => {
            deleteTodo(id)
        }

        return(
            <li className="todo-item-li-elem">{
                updateTodo ? (
                    <>
                        <input className="todo-update-input-elem" type="text" value={updateName} onChange={this.changeUpdate} />
                        <button className="todo-update-btn" type="button" onClick={clickUpdateStatus}>Update</button>
                    </>
                ) : (
                    <>
                        <p className="todo-name">{updateTodoQuantity} (Updated {updateCount} Times)</p>
                        <div>
                            <button type="button" className="todo-item-btn todo-item-update-icon" onClick={clickUpdateActive}><TiPencil /></button>
                            <button type="button" className="todo-item-btn todo-item-delete-icon" onClick={clickDeleteTodo}><ImCross /></button>
                        </div>
                    </>
                )
            }</li>
        )
    }

}

export default TodoItem