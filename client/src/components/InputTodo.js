import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class Input extends Component {

  state = {
    action:"",
    infourl:""
  }

  addTodo = () => {
    const task = {action: this.state.action, infourl: this.state.infourl}

    if(task.action && task.action.length > 0){
      axios.post('/api/todos', task)
        .then(res => {
          if(res.data){
            this.props.getTodos();
            this.setState({
              action: '', 
              infourl: ''
            });
          }
        })
        .catch(err => console.log(err))
    }else {
      console.log('input field required')
    }
  }

  handleChangeAction = (e) => {
    this.setState({
      action: e.target.value,
    })
  }

  handleChangeInfourl = (e) => {
    this.setState({
      infourl: e.target.value,
    })
  }

  render() {
    return (
      <Form onSubmit={e => {e.preventDefault();}}>
        <Form.Group as={Row} controlid="todoaction">
            <Col >
                <Form.Control value={this.state.action} controlid="action" autoFocus={true} type="text" placeholder="Enter new todo" onChange={this.handleChangeAction} />
            </Col>
            <Col >
                <Form.Control value={this.state.infourl} controlid="infourl" type="url" placeholder="Enter url for more information" onChange={this.handleChangeInfourl} />
            </Col>
        </Form.Group>
        <Button type="submit" className ="text-left" variant="primary" onClick={this.addTodo}>Add todo</Button>
      </Form>
    )
  }
}

export default Input

