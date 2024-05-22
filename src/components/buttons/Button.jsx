import React from 'react';

const Button = ({ page, handlePageChange }) => {
    return (
        <div className="flex justify-center gap-4">
            <button
                className="border rounded bg-slate-900 text-slate-100 px-2 hover:bg-white hover:text-black"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
            >
                Предыдущая страница
            </button>
            <h2>Текущая страница: {page}</h2>
            <button
                className="border rounded bg-slate-900 text-slate-100 px-2 hover:bg-white hover:text-black"
                onClick={() => handlePageChange(page + 1)}
            >
                Следующая страница
            </button>
        </div>
    );
};

export default Button;
