import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const { username, email, password, confirmPassword } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register({ username, email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="px-8 py-8 mt-4 text-left glass-card w-96">
                <h3 className="text-2xl font-bold text-center text-white mb-6">Create Account</h3>
                {error && <p className="text-red-300 text-sm mt-2 text-center bg-red-900/40 p-2 rounded">{error}</p>}
                <form onSubmit={onSubmit}>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="username">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-2 mt-1 glass-input rounded-md text-white placeholder-indigo-200 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-2 mt-1 glass-input rounded-md text-white placeholder-indigo-200 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-2 mt-1 glass-input rounded-md text-white placeholder-indigo-200 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-2 mt-1 glass-input rounded-md text-white placeholder-indigo-200 outline-none"
                            />
                        </div>
                        <button type="submit" className="w-full px-6 py-2 mt-6 glass-btn rounded-lg font-semibold">Register</button>
                        <div className="mt-4 text-center">
                            <Link to="/" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Already have an account? Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
