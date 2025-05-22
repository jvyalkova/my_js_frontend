import React, { useState } from 'react';
import ToDoTask from './ToDoTask';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

const ToDoList = ({ tasks }) => {
    const [genre, setGenre] = useState('');
    const navigate = useNavigate();

    const handleFilterClick = (e) => {
        e.preventDefault();
        if (!genre.trim()) {
            navigate('/filter/undefined', { state: { emptyGenre: true } });
            return;
        }
        navigate(`/filter/${encodeURIComponent(genre)}`);
    };

    return (
        <div className="card-hover-shadow-2x mb-3 card">
            <div className="card-header-tab card-header">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i className="fa fa-book"></i>&nbsp;Book List
                </div>
            </div>
            <div className="scroll-area-sm">
                <perfect-scrollbar className="ps-show-limits">
                    <div style={{ position: "static" }} className="ps ps--active-y">
                        <div className="ps-content">
                            <ul className="list-group list-group-flush">
                                {tasks.map((task) => (
                                    <ToDoTask task={task} key={task._id} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </perfect-scrollbar>
            </div>
            <div className="d-block text-right card-footer">
                <form onSubmit={handleFilterClick} style={{ marginBottom: '0.5rem' }}>
                    <input
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="form-control"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Filter
                    </button>
                </form>
                <NavLink to='/add' className="btn btn-primary">Add Book</NavLink>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        tasks: [...state.tasks]
    };
}

export default connect(mapStateToProps)(ToDoList);