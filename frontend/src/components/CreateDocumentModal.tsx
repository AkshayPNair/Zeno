import React, { useState } from 'react';
import { X, FileText, Layout, Kanban, Check } from 'lucide-react';

interface CreateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDocumentModal: React.FC<CreateDocumentModalProps> = ({ isOpen, onClose }) => {
  const [docName, setDocName] = useState('');
  const [selectedType, setSelectedType] = useState<'editor' | null>('editor');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-card rounded-xl shadow-2xl border border-border scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Create Document</h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Choose a document type and give it a name to get started
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full p-2 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          
          {/* Document Name Input */}
          <div className="space-y-3">
            <label htmlFor="docName" className="text-sm font-semibold text-foreground">
              Document Name
            </label>
            <input
              id="docName"
              type="text"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="Untitled Document"
              className="w-full px-4 py-3.5 rounded-lg bg-secondary/50 border border-input text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
              autoFocus
            />
          </div>

          {/* Document Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Document Type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Option 1: Editor (Active) */}
              <div
                onClick={() => setSelectedType('editor')}
                className={`relative group p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col items-center text-center gap-3
                  ${selectedType === 'editor' 
                    ? 'border-primary bg-primary/5 ring-1 ring-primary' // Reduced thickness here (removed shadow, used ring-1)
                    : 'border-border bg-card hover:border-primary/40 hover:bg-secondary/30'
                  }`}
              >
                {/* Custom Solid Checkmark Badge */}
                {selectedType === 'editor' && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center shadow-sm animate-in zoom-in duration-200">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}

                <div className={`p-3.5 rounded-lg transition-colors ${selectedType === 'editor' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground group-hover:text-foreground'}`}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold transition-colors ${selectedType === 'editor' ? 'text-primary' : 'text-foreground'}`}>Document Editor</h3>
                  <p className="text-xs text-muted-foreground mt-1">Rich text document</p>
                </div>
              </div>

              {/* Option 2: Whiteboard (Disabled) */}
              <div className="relative p-4 rounded-xl border border-border bg-secondary/20 flex flex-col items-center text-center gap-3 opacity-60 cursor-not-allowed select-none">
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-secondary border border-border text-muted-foreground px-2 py-0.5 rounded-md">Soon</span>
                <div className="p-3.5 rounded-lg bg-secondary text-muted-foreground">
                  <Layout size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Whiteboard</h3>
                  <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                </div>
              </div>

              {/* Option 3: Kanban (Disabled) */}
              <div className="relative p-4 rounded-xl border border-border bg-secondary/20 flex flex-col items-center text-center gap-3 opacity-60 cursor-not-allowed select-none">
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-secondary border border-border text-muted-foreground px-2 py-0.5 rounded-md">Soon</span>
                <div className="p-3.5 rounded-lg bg-secondary text-muted-foreground">
                  <Kanban size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Kanban Board</h3>
                  <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 pt-2 bg-transparent">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!docName.trim()}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Create Document
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateDocumentModal;