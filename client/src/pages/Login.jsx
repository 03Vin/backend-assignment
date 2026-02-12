import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="px-8 py-8 mt-4 text-left glass-card w-96">
                <h3 className="text-2xl font-bold text-center text-white mb-6">Login</h3>
                {error && <p className="text-red-300 text-sm mt-2 text-center bg-red-900/40 p-2 rounded">{error}</p>}
                <form onSubmit={onSubmit}>
                    <div className="mt-4">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-2 mt-2 glass-input rounded-md text-white placeholder-indigo-200 outline-none"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-2 mt-2 glass-input rounded-md text-white placeholder-indigo-200 outline-none"
                            />
                        </div>
                        <button type="submit" className="w-full px-6 py-2 mt-6 glass-btn rounded-lg font-semibold">Login</button>
                        <div className="mt-4 text-center">
                            <Link to="/register" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Don't have an account? Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
