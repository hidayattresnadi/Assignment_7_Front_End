import TableBooks from '../components/modules/tableBooks'
import Form from '../components/modules/bookForm'

function HomePage({columns, books, onEdit, onDelete, addBook, updateBook, editingBook, categories, isFormOpen, setIsFormOpen}) {
  return (
    <>
      <TableBooks columns={columns} books={books} onEdit={onEdit} onDelete={onDelete} />
      <Form addBook={addBook} updateBook={updateBook} editingBook={editingBook} categories={categories} isFormOpen={isFormOpen} setIsFormOpen ={setIsFormOpen} />
    </>
  )
}

export default HomePage;
