// Navigate.jsx
import { useNavigate } from 'react-router-dom';

const Navigate = (Component) => {
    return (props) => {
        const navigate = useNavigate();

        const hostelClick = () => navigate('/hostel');
        const home = () => navigate('/');
        const neha = () => navigate('/neha');
        const gallery = () => navigate('/gallery');
        const blog = () => navigate('/blog');
        const store = () => navigate('/store');
        const about = () => navigate('/about');
        const contact = () => navigate('/contact');
        const location = () => navigate('/location');
        const login = () => navigate('/login/student');
        const register = () => navigate('/register/student');
        const form =()=> navigate('/form');
        const book =()=> navigate('/book');
        const register_owner =()=> navigate('/register/owner');
        const form_staff =()=> navigate('/form/staff');
        
        // Pass hostelId to navigate to the specific hostel's detail page
        const hostel_details = (hostelId) => navigate(`/hostel_details/${hostelId}`);

        return (
            <Component
                {...props}
                hostelClick={hostelClick}
                home={home}
                neha={neha}
                gallery={gallery}
                blog={blog}
                store={store}
                about={about}
                contact={contact}
                location={location}
                hostel_details={hostel_details}
                login={login}
                register={register}
                form={form}
                book={book}
                register_owner={register_owner}
                form_staff={form_staff}
            />
        );
    };
};

export default Navigate;
