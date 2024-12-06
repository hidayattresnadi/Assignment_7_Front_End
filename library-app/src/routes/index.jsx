import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/homepage";
import Layout from "../components/templates/layout";
import BookFormPage from "../components/pages/bookFormPage";
import BooksPageSearch from "../components/pages/booksPageSearch";
import MembersPage from "../components/pages/membersPage";
import MemberFormPage from "../components/pages/memberFormPage";
import BookDetailPage from "../components/pages/bookDetailPage";
import MemberDetailPage from "../components/pages/memberDetailPage";
import BorrowFormPage from "../components/pages/borrowBookFormPage";
import BooksPage from "../components/pages/booksPage";
import PrivateRoute from "../components/templates/PrivateRoutes";
import LoginFormPage from "../components/pages/LoginPage";
import ProfilePage from "../components/pages/profilePage";
import UnauthorizedPage from "../components/modules/unauthorized";
import UploadFilePage from "../components/pages/UploadFilePage";
import RequestBookFormPage from "../components/pages/requestBookFormPage";
import BooksRequestListsPage from "../components/pages/bookRequestListsPage";
import RequestBookDetailPage from "../components/pages/reviewBookRequestFormDetail";
// import BooksInfiniteScrollPage from "../components/pages/pagesBookInfiniteScroll";

// Initial data and functions for book management
const columnsTableBooks = ["Title", "Author", "Category", "ISBN", "Language", "Detail"];
const columnsTableBooksCrud = ["Title", "Author", "Category", "ISBN", "Language", "Edit", "Delete", "Detail"];
const columnsTableMembers = ["Id", "Full Name", "Position", "Privilege", "Edit", "Delete", "Detail"];

const AppRouter = () => {
    const [books, setBooks] = useState();
    const [members, setMembers] = useState([]);
    const [categories, setCategories] = useState();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [editingMember, setEditingMember] = useState(null);
    const [errors, setErrors] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout
                setEditingBook={setEditingBook}
                setEditingMember={setEditingMember}
                setErrors={setErrors}
            />,
            children: [
                {
                    path: "/",
                    element: (
                        <HomePage
                            books={books}
                            setBooks={setBooks}
                            members={members}
                            setMembers={setMembers}
                        />
                    )
                },
                {
                    // {/* Route Khusus Librarian */}
                    element: <PrivateRoute allowedRoles={['Library Manager', 'Librarian', 'Library User']} />,
                    children: [
                        {
                            path: "/members/:id",
                            element: (
                                <MemberDetailPage
                                    editingMember={editingMember}
                                    setEditingMember={setEditingMember}
                                />
                            ),
                        },
                        {
                            path: "/profile",
                            element: (
                                <ProfilePage/>
                            ),
                        },
                        {
                            path: "/bookRequest",
                            element: (
                                <RequestBookFormPage
                                setErrors={setErrors}
                                errors={errors}/>
                            )
                        },
                        {
                            path: "/books/search",
                            element: (
                                <BooksPageSearch
                                    columns={columnsTableBooks}
                                />
                            )
                        },
                        {
                            path: "/books",
                            element: (
                                <BooksPage
                                    books={books}
                                    setBooks={setBooks}
                                    columns={columnsTableBooksCrud}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            )
                        },
                        {
                            path: "/books/add",
                            element: (
                                <BookFormPage
                                    setErrors={setErrors}
                                    setBooks={setBooks}
                                    categories={categories}
                                    setCategories={setCategories}
                                    isFormOpen={isFormOpen}
                                    setIsFormOpen={setIsFormOpen}
                                    errors={errors}
                                />
                            ),
                        },
                        {
                            path: "/books/edit/:id",
                            element: (
                                <BookFormPage
                                    setEditingBook={setEditingBook}
                                    setErrors={setErrors}
                                    setBooks={setBooks}
                                    setCategories={setCategories}
                                    editingBook={editingBook}
                                    categories={categories}
                                    isFormOpen={isFormOpen}
                                    setIsFormOpen={setIsFormOpen}
                                    errors={errors}
                                />
                            ),
                        },
                        {
                            path: "/books/:id",
                            element: (
                                <BookDetailPage
                                    editingBook={editingBook}
                                    setEditingBook={setEditingBook}
                                />
                            ),
                        },
                        
                        {
                            path: "/borrow",
                            element: (
                                <BorrowFormPage
                                    members={members}
                                    setMembers={setMembers}
                                    books={books}
                                    setBooks={setBooks}
                                    setErrors={setErrors}
                                />
                            ),
                        },
                        {
                            path: "/return",
                            element: (
                                <BorrowFormPage
                                    members={members}
                                    setMembers={setMembers}
                                    books={books}
                                    setBooks={setBooks}
                                    setErrors={setErrors}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            ),
                        },
                    ]
                },
                {
                    // {/* Route Khusus Library Manager */}
                    element: <PrivateRoute allowedRoles={['Library Manager']} />,
                    children: [
                        {
                            path: "/members",
                            element: (
                                <MembersPage
                                    members={members}
                                    setMembers={setMembers}
                                    columns={columnsTableMembers}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            )
                        },
                        {
                            path: "/members/add",
                            element: (
                                <MemberFormPage
                                    setErrors={setErrors}
                                    editingMember={editingMember}
                                    isFormOpen={isFormOpen}
                                    setIsFormOpen={setIsFormOpen}
                                    errors={errors}
                                />
                            ),
                        },
                        {
                            path: "/members/edit/:id",
                            element: (
                                <MemberFormPage
                                    setEditingMember={setEditingMember}
                                    editingMember={editingMember}
                                    isFormOpen={isFormOpen}
                                    setIsFormOpen={setIsFormOpen}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            ),
                        },
                    ]
                }
                ,
                {
                    path: "/login",
                    element: (
                        <LoginFormPage
                            errors={errors}
                            setErrors={setErrors}
                        />
                    )
                },
                {
                    path: "/uploadFiles",
                    element: (
                        <UploadFilePage/>
                    )
                },
                {
                    path: "/bookRequests",
                    element: (
                        <BooksRequestListsPage/>
                    )
                },
                {
                    path: "/bookRequest/detail/:id",
                    element: (
                        <RequestBookDetailPage/>
                    )
                },
            ]
        },
        {
            path: "/unauthorized",
            element: (
                <UnauthorizedPage
                refresh={refresh}
                />
            )
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;
