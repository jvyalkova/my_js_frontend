import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function FilterBookList() {
	const { genre } = useParams(); 
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/tasks/filter/${genre}`); 
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genre]);

  if (loading) {
    return <p>Загрузка...</p>;
  }
  if (error) {
    return <p>Ошибка: {error.message}</p>;
  }
  return (
		<div className="card-hover-shadow-2x mb-3 card">
			<div className="card-header-tab card-header">
				<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
					<i className="fa fa-book"></i>&nbsp;Книги в жанре {genre}
				</div>
			</div>
			<div className="widget-content">
				<div className="widget-content-wrapper">
					<ul className="list-group list-group-flush"> 
						{books.map(book => (
						<li key={book._id} className="list-group-item">
						{book.name}
						</li>
						))}
					</ul>
				</div>
			</div>
			<div className="d-block text-right card-footer" >
				<NavLink to='/' className="btn btn-primary"> Back to list </NavLink>
			</div>
		</div>
  );
}

export default FilterBookList;