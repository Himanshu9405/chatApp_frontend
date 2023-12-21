// hooks
import HomePage from '../Component/HomePage';

// ----------------------------------------------------------------------


export default function AuthGuard({ children }) {
    console.log('children', children)
    const tempPermission = JSON.parse(localStorage.getItem('userInfo'));
    const isAuthenticated = tempPermission?.token;

    console.log("himanshu@example.com", isAuthenticated)

    if (!isAuthenticated) {
        return <HomePage />;
    }

    return <>{children}</>;
}
