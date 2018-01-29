import { push } from 'react-router-redux';

const pushLogin = () => push('/login');
const pushDashboard = () => push('/dashboard');

export { pushLogin, pushDashboard };