import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function FilterBookList() {
    const { genre } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emptyGenreError, setEmptyGenreError] = useState(false);

    useEffect(() => {
        // Проверяем, есть ли в location.state флаг emptyGenre
        if (location.state?.emptyGenre) {
            setEmptyGenreError(true);
            setLoading(false);
            return;
        }

        if (!genre || genre === 'undefined') {
            setLoading(false);
            return;
        }

        const fetchBooks = async () => {
            setLoading(true);
            setEmptyGenreError(false);
            try {
                const response = await fetch(`/tasks/filter/${genre}`);
                if (!response.ok) {
                    throw new Error('Книги с таким жанром не найдены');
                }
                const data = await response.json();
                setBooks(data);
                if (data.length === 0) {
                    throw new Error('Книги с таким жанром не найдены');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [genre, location.state]);

    const renderContent = () => {
        if (emptyGenreError) {
            return (
                <div className="text-center p-4">
                    <p>Заполните поле с жанром</p>
                </div>
            );
        }

        if (!genre || genre === 'undefined') {
            return null;
        }

        if (loading) {
            return <div className="text-center p-4">Загрузка...</div>;
        }

        if (error) {
            return (
                <div className="text-center p-4">
                    <p>{error.message}</p>
                </div>
            );
        }

        return (
            <ul className="list-group list-group-flush">
                {books.map(book => (
                    <li key={book._id} className="list-group-item">
                        {book.name}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="card-hover-shadow-2x mb-3 card">
            <div className="card-header-tab card-header">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i className="fa fa-book"></i>&nbsp;
                    {emptyGenreError ? 'Ошибка фильтрации' : (genre ? `Книги в жанре ${genre}` : 'Фильтр по жанру')}
                </div>
            </div>
            <div className="widget-content">
                <div className="widget-content-wrapper">
                    {renderContent()}
                </div>
            </div>
            <div className="d-block text-right card-footer">
                <NavLink to="/" className="btn btn-primary">
                    Back to list
                </NavLink>
            </div>
        </div>
    );
}

export default FilterBookList;