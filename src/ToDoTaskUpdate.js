import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        name: '',
		description: '',
		genre: ''
    });

    useEffect(() => {
        fetch(`/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                setTask(data);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            _id: task._id,
			name: task.name,
			description: task.description,
			genre: task.genre
        }
        fetch(`/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then(res => {
                if (res.ok) {
                    navigate('/', { state: { forceRefresh: true } });
					window.location.reload();
                }
            });
    };

    return (
		<div className="card-hover-shadow-2x mb-3 card">
			<div className="card-header-tab card-header">
				<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
					<i className="fa fa-book"></i>&nbsp;Update Book
				</div>
			</div>
			<div className="widget-content">
				<div className="widget-content-wrapper">
					<form onSubmit={handleSubmit}>
						<div>
							<input
								type="text"
								name="name"
								value={task.name}
								onChange={handleChange}
								required
							placeholder="Name" className="form-control"/>
						</div>
						<div>
							<input
								type="text"
								name="genre"
								value={task.genre}
								onChange={handleChange}
								required
							placeholder="Genre" className="form-control"/>
						</div>
						<div>
							<textarea
								name="description"
								value={task.description}
								onChange={handleChange}
								required
								rows="7"
								placeholder="Description" className="form-control"
								/>
						</div>
						<div>
							<button 
								style={{ 
									backgroundColor: '#343a40', 
									border: 'none', 
									color: '#ffffff', 
									borderRadius: '5px', 
									padding: '5px 10px' 
								}}
								type="submit"
							>
								Edit
							</button>
							
						</div>
						
					</form>
					<div className="d-block text-right card-footer">
						<NavLink to='/' className="btn btn-primary" >Back to list</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect()(UpdateBook);