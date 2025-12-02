
import React, { useState } from 'react';
import Input from './Input';
import Book from './Book';
import Button from './Button';


const initialBookState = {
    title: '',         
    author: '',        
    description: '',   
    pages: 0,          
    stock: 0,          
    imageUrl: '',      
};

const LibraryManager = () => {
    
   
    const [bookData, setBookData] = useState(initialBookState);
    const [books, setBooks] = useState([]); 
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(null); 

   
    
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        setBookData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!bookData.title.trim()) {
            tempErrors.title = "Titulli eshte i nevojshem.";
            isValid = false;
        }
        if (!bookData.author.trim()) {
            tempErrors.author = "Autori eshte i nevojshem.";
            isValid = false;
        }
        if (!bookData.description.trim()) {
            tempErrors.description = "Pershkrimi eshte i nevojshem.";
            isValid = false;
        }
        
        if (bookData.pages <= 0 || isNaN(bookData.pages)) {
            tempErrors.pages = "Numri i faqeve duhet te jete numer me i madh se 0.";
            isValid = false;
        }
        
        if (isNaN(bookData.stock) || bookData.stock < 0) { 
             tempErrors.stock = "Sasia e stokut nuk eshte valide (duhet te jete 0 ose me lart).";
             isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            if (isEditing !== null) {
                // EDIT
                setBooks(prevBooks => prevBooks.map(book => 
                    book.id === isEditing ? { ...bookData, id: isEditing } : book
                ));
                alert(`Libri "${bookData.title}" u ndryshua me sukses.`);
                setIsEditing(null); 
            } else {
               
                const newBook = {
                    ...bookData,
                    id: Date.now(),
                };
                setBooks(prevBooks => [...prevBooks, newBook]);
                alert(`Libri "${newBook.title}" u shtua ne biblioteke.`);
            }

            
            setBookData(initialBookState);
            setErrors({});
        }
    };
    
    
    const handleDeleteBook = (id) => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    };


    const handleSellBook = (id) => {
        setBooks(prevBooks => prevBooks.map(book => {
            if (book.id === id && book.stock > 0) {
                return { ...book, stock: book.stock - 1 };
            }
            return book;
        }));
    };

    // Ndrysho (Edit - Kërkesë Opsionale)
    const handleEditBook = (id) => {
        const bookToEdit = books.find(book => book.id === id);
        if (bookToEdit) {
            setBookData(bookToEdit);
            setIsEditing(id); 
            // Opsionale: Kthehet lart faqja tek forma
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            
           
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded shadow-lg bg-white">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    {isEditing ? 'Ndrysho Librin' : 'Shto Liber te Ri'}
                </h2>

                <Input label="Titulli i Librit (Emri)" name="title" value={bookData.title} onChange={handleChange} error={errors.title}/>
                <Input label="Autori" name="author" value={bookData.author} onChange={handleChange} error={errors.author}/>

                <Input label="Pershkrimi" name="description" value={bookData.description} onChange={handleChange} error={errors.description} isTextarea/>
                
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input label="Numri i faqeve" name="pages" type="number" value={bookData.pages} onChange={handleChange} error={errors.pages} min="0"/>
                    </div>
                    <div className="flex-1">
                        <Input label="Numri ne Stok" name="stock" type="number" value={bookData.stock} onChange={handleChange} error={errors.stock} min="0"/>
                    </div>
                </div>

                <Input label="Image URL (Opsionale)" name="imageUrl" type="url" value={bookData.imageUrl} onChange={handleChange} error={errors.imageUrl}/>
                
                <Button type="submit" color="primary">
                    {isEditing ? 'Ruaj Ndryshimet' : 'Shto Librin'}
                </Button>
            </form>

            
            {books.length > 0 && (
                <div className="mt-10 p-6 border rounded shadow-lg bg-gray-50">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Lista e Librave ({books.length})</h2>

                    <ul className="space-y-4">
                        {books.map((book) => (
                            <Book 
                                key={book.id}
                                book={book}
                                onDelete={handleDeleteBook}
                                onSell={handleSellBook}
                                onEdit={handleEditBook} 
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LibraryManager;