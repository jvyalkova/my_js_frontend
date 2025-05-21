import React from 'react';
import { connect } from 'react-redux';
import { todoDelete, todoUpdateState } from './actions';
import { useNavigate, NavLink } from 'react-router-dom';

class ToDoTask extends React.Component {
	constructor(props) {
		super(props)
		this.onStatusClick = this.onStatusClick.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}
	onStatusClick(e) {
		e.preventDefault();
				
		fetch(`tasks/${this.props.task._id}`,{
			method: 'PATCH',
			body: JSON.stringify({
				done: !this.props.task.done
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.status === 200) {
				console.log('Updated');
				this.props.dispatch(todoUpdateState(this.props.task._id));
			}
			else {
				console.log('Not updated :(');
			}
		});
	}
	onDeleteClick(e){
		e.preventDefault();
		
		fetch(`tasks/${this.props.task._id}`,{
			method: 'DELETE'
			}).then((res) => {
			if (res.status === 200) {
				console.log('Deleted');
				this.props.dispatch(todoDelete(this.props.task._id));
			}
			else {
				console.log('Not deleted :(');
			}
		});
	}
	render() {
		return (
			<li className="list-group-item">
				{this.props.task.done ? <div className="todo-indicator bg-success"></div>:<div className="todo-indicator bg-focus"></div>}
				<div className="widget-content p-0">
					<div className="widget-content-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
						<div className="widget-content-left" style={{ flex: 1 }}>
							<div className="widget-heading">{this.props.task.name}</div>
							<div className="widget-subheading">
								<div style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2em', fontStyle: 'italic' }}>
									{this.props.task.genre}
								</div>
								<div>{this.props.task.description}</div>
							</div>
						</div>
						<div className="widget-content-right" style={{ marginLeft: 'auto' }}>
							<button className="border-0 btn-transition btn btn-outline-success" onClick={this.onStatusClick}>
								<i className="fa fa-check"></i>
							</button>
							<button className="border-0 btn-transition btn btn-outline-danger" onClick={this.onDeleteClick}>
								<i className="fa fa-trash"></i>
							</button>
							<NavLink to={`/update/${this.props.task._id}`} className="btn btn-primary">Update</NavLink>
							
						</div>
					</div>
				</div>
			</li>
		)
	}
}

export default connect()(ToDoTask);
