import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Layout, Kanban, LogOut } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import CreateDocumentModal from '../components/CreateDocumentModal';
import { useAuth } from '../hooks/useAuth';
import { useDocuments } from '../hooks/useDocuments';
import { DocumentType } from '../types/document';

const Dashboard: React.FC = () => {
    const { logout } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { documents, loadDocuments } = useDocuments();

    useEffect(() => {
        loadDocuments();
    }, []);

    const handleLogout = async () => {
        await logout()
        navigate('/auth', { replace: true });
    };

    const getIcon = (type: string) => {
        switch (type) {
            case DocumentType.DOC: return <FileText size={20} />;
            case DocumentType.WHITEBOARD: return <Layout size={20} />;
            case DocumentType.KANBAN: return <Kanban size={20} />;
            default: return <FileText size={20} />;
        }
    };

    const getTypeLabel = (type: DocumentType) => {
        switch (type) {
          case DocumentType.DOC: return "Doc";
          case DocumentType.WHITEBOARD: return "Whiteboard";
          case DocumentType.KANBAN: return "Kanban";
        }
      };

    const getIconColor = (type: string) => {
        switch (type) {
            case 'editor':
                return 'bg-primary/10 text-primary';
            case 'whiteboard':
                return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
            case 'kanban':
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
            default:
                return 'bg-secondary text-muted-foreground';
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
            {/* Navbar */}
            <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-primary-foreground font-bold text-xl">Z</span>
                        </div>
                        <span className="text-foreground font-bold text-xl tracking-tight">Zeno</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <ThemeToggle />

                        <div className="w-8 h-8 rounded-full bg-secondary border border-input flex items-center justify-center text-sm font-medium text-foreground ml-1 cursor-default">
                            AK
                        </div>
                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">Documents</h1>
                        <p className="text-muted-foreground mt-1">Create and organize your creative projects</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Create Document</span>
                    </button>
                </div>

                {/* Document Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* 1. New Document Placeholder */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-secondary/50 transition-all group h-full min-h-[180px]"
                    >
                        <div className="p-3 rounded-full bg-secondary text-muted-foreground group-hover:text-primary transition-colors">
                            <Plus size={24} />
                        </div>
                        <span className="font-medium text-foreground">New Document</span>
                    </button>

                    {/* 2. Document Cards */}
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            onClick={() => navigate(`/editor/${doc.id}`)}
                            className="group bg-card rounded-xl border border-border p-5 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden h-full min-h-[180px] flex flex-col"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex items-start justify-between mb-auto">
                                <div className={`p-2 rounded-lg ${getIconColor(doc.type)} transition-colors`}>
                                    {getIcon(doc.type)}
                                </div>
                                <span className="text-xs text-muted-foreground font-medium">{doc.createdAt.split('T')[0]}</span>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-medium text-foreground text-lg truncate mb-1">{doc.title}</h3>
                                <p className="text-sm text-muted-foreground">{getTypeLabel(doc.type)}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </main>

            {/* Modal */}
            <CreateDocumentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Dashboard;