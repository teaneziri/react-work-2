
import React from 'react';
import Button from './Button'; 


const PLACEHOLDER_URL = 'https://via.placeholder.com/100x150?text=BPB+LIBËR';

const Book = ({ book, onDelete, onSell, onEdit }) => {
    
    const isOutOfStock = book.stock <= 0;
    const sellButtonText = isOutOfStock ? 'Nuk ka Stok' : 'Shit Librin';

    return (
        <li className="flex gap-4 p-4 border rounded bg-white shadow-md hover:shadow-lg transition">
            
           
            <div className="shrink-0">
                <img 
                    src={book.imageUrl || PLACEHOLDER_URL} 
                    alt={`Kopertina e librit: ${book.title}`} 
                    className="w-24 h-36 object-cover rounded" 
                />
            </div>

           
            <div className="grow">
                <h3 className="text-xl font-bold text-gray-900">{book.title}</h3>
                <p className="text-md text-gray-600 mb-1">nga {book.author}</p>
               
                <p className="text-sm text-gray-500 italic max-w-xl line-clamp-2">{book.description}</p>
                <p className="text-sm text-gray-700 mt-2">Faqe: {book.pages}</p>
                
               
                <div className="mt-2">
                    <span className="text-sm font-semibold">Stoku: </span>
                    {isOutOfStock ? (
                        <span className="text-red-600 bg-red-100 px-2 py-0.5 rounded font-bold">Nuk ka stok</span>
                    ) : (
                        <span className="text-green-600 font-bold">{book.stock} njësi</span>
                    )}
                </div>
            </div>

            {/* Veprimet */}
            <div className="flex flex-col gap-2 items-end justify-center">
                <Button color="edit" onClick={() => onEdit(book.id)}>
                    Ndrysho
                </Button>
                
                <Button 
                    color="sell" 
                    onClick={() => onSell(book.id)} 
                    disabled={isOutOfStock} 
                >
                    {sellButtonText}
                </Button>

                <Button color="delete" onClick={() => onDelete(book.id)}>
                    Fshij
                </Button>
            </div>
        </li>
    );
};

export default Book;