import React from 'react';
var sanitizeUrl = require('@braintree/sanitize-url').sanitizeUrl;

const ListTodo = ({ todos, deleteTodo }) => {

  return (
    <div >
    <hr />
    <h2>Things to do</h2>
    <table className="table">
        <thead className="thead-dark">
            <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">Todo</th>
                <th scope="col">More information</th>
                <th scope="col">Remove from list</th>
            </tr>
        </thead>
        <tbody>
        {
            todos &&
            todos.length > 0 ?
                (
                todos.map(todo => {
                    return (
                        <tr key={todo._id}>
                            {/* <th scope="row">{todo._id}</th> */}
                            <td>
                                {todo.action}
                            </td>
                            <td>
                           {/* only show url when infourl provided */}
                                 {!todo.infourl ? "/" :  <a  href={todo.infourl}>More information</a>}

                                 {/* a bit more secure: */}
                                 {/*!todo.infourl ? "/" :  <a  href={sanitizeUrl(todo.infourl)}>More information</a>*/} 

                                 {/* most secure, see https://mathiasbynens.github.io/rel-noopener/ */}
                                 {/* {!todo.infourl ? "/" :  <a  href={sanitizeUrl(todo.infourl)} rel="noopener noreferrer">More information</a>} */}

                            </td>
                            <td className="list-group-item-danger" style={{cursor:'pointer'}} key={todo._id} onClick={() => deleteTodo(todo._id)}>
                                Delete
                            </td>
                        </tr>
                    )
                })
                )
                :
                (
                <tr className="list-group-item-success">
                    {/* <th scope="row"></th> */}
                    <td >
                        No todo's left                       
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                )
        }
        </tbody>
      </table>
    </div>

  )
}

export default ListTodo
