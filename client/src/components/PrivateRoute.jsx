import { useSelector } from 'react-redux';
// outlet is used to get child ele whichc is dasboard in this case ref app.jsx
import { Outlet, Navigate } from 'react-router-dom';
// navigate is a standalone function that can be used outside functional components, whereas useNavigate is a hook that can only be used inside functional components.

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to='/signin' />;
}