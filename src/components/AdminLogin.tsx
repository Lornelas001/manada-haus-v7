import { Lock, LogOut, X } from 'lucide-react';
import { useState } from 'react';

const ADMIN_PASSWORD = 'Lucy&Armando1606';

interface AdminLoginProps {
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function AdminLogin({ isAdmin, onLogin, onLogout }: AdminLoginProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
      handleClose();
    } else {
      setError(true);
    }
  };

  if (isAdmin) {
    return (
      <button
        onClick={onLogout}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border bg-transparent text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
      >
        <LogOut className="h-3.5 w-3.5" />
        Salir de admin
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground transition-colors"
        title="Acceso admin"
      >
        <Lock className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="bg-card rounded-xl p-6 w-full max-w-sm relative shadow-xl">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="font-display text-lg font-semibold mb-5 pr-8">
              Acceso administrador
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                autoFocus
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full px-3.5 py-2.5 rounded-lg border bg-background text-foreground text-sm outline-none transition-colors ${
                  error ? 'border-destructive' : 'border-border focus:border-black'
                }`}
              />
              {error && (
                <p className="text-sm text-destructive -mt-2">
                  Contraseña incorrecta
                </p>
              )}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-black text-white font-medium hover:bg-black/90 transition-colors"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
