import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash, Plus } from 'lucide-react';

const Dashboard = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_URL = 'http://localhost:5000/api/notes';

    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigate('/');
            return;
        }

        const fetchNotes = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                };
                const response = await axios.get(API_URL, config);
                setNotes(response.data);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) {
                    logout();
                }
            }
        };

        fetchNotes();
    }, [user, navigate, logout]);

    const addNote = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const response = await axios.post(API_URL, { title, content }, config);
            setNotes([...notes, response.data]);
            setTitle('');
            setContent('');
        } catch (err) {
            setError('Failed to add note');
        }
    };

    const deleteNote = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            await axios.delete(`${API_URL}/${id}`, config);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (err) {
            console.error(err);
            setError('Failed to delete note');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <nav className="glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-white">Notes Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-4 text-gray-300">Welcome, {user && user.username}</span>
                            <button onClick={logout} className="px-4 py-2 text-sm text-red-200 border border-red-300/30 rounded hover:bg-red-500/20 transition-all">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {error && <div className="bg-red-900/40 border border-red-400/30 text-red-200 px-4 py-3 rounded mb-4 backdrop-blur-md">{error}</div>}

                {/* Note Form */}
                <div className="glass-card p-6 mb-6">
                    <h2 className="text-lg font-medium mb-4 text-white">Add New Note</h2>
                    <form onSubmit={addNote} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-2 glass-input rounded-md text-white placeholder-gray-400 outline-none"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows="3"
                                className="w-full px-4 py-2 glass-input rounded-md text-white placeholder-gray-400 outline-none"
                            ></textarea>
                        </div>
                        <button type="submit" className="glass-btn px-6 py-2 rounded-lg flex items-center">
                            <Plus size={16} className="mr-2" />
                            Add Note
                        </button>
                    </form>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <div key={note._id} className="glass-card p-6 relative hover:-translate-y-1 transition-transform duration-300">
                            <button
                                onClick={() => deleteNote(note._id)}
                                className="absolute top-4 right-4 text-indigo-300 hover:text-red-400 transition-colors"
                            >
                                <Trash size={18} />
                            </button>
                            <h3 className="text-xl font-semibold mb-2 pr-8 text-white">{note.title}</h3>
                            <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
                            <div className="mt-4 text-xs text-indigo-400">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                    {notes.length === 0 && (
                        <div className="col-span-full text-center text-gray-400 py-10 glass-card">
                            No notes yet. Add one above!
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
