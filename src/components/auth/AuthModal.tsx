import React, { useState } from 'react';
import { dataStore, SEED_USERS } from '../../services/store';
import { User } from '../../types';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldAlert, 
  Check, 
  AlertCircle, 
  Building2, 
  Lock, 
  Mail, 
  Phone, 
  User as UserIcon,
  MapPin
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Register fields for resident
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regUnit, setRegUnit] = useState('');
  const [regPassword, setRegPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const users = dataStore.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (found) {
      dataStore.setCurrentUser(found);
      onSuccess(found);
      onClose();
    } else {
      setErrorMessage('E-mail não localizado no cadastro. Verifique os dados ou utilize o acesso rápido abaixo.');
    }
  };

  const handleRegisterResident = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName || !regEmail || !regUnit || !regPassword) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return;
    }

    const newUser = dataStore.addUser({
      name: regName,
      email: regEmail,
      phone: regPhone || '(21) 99876-0000',
      unit: regUnit,
      role: 'resident',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    });

    dataStore.setCurrentUser(newUser);
    onSuccess(newUser);
    onClose();
  };

  const handleQuickDemo = (user: User) => {
    dataStore.setCurrentUser(user);
    onSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md shadow-emerald-600/20">
            A
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            ABM em Todo Lugar
          </h2>
          <p className="text-xs text-slate-500">
            Plataforma Comunitária Oficial da Associação de Moradores
          </p>
        </div>

        {/* Tab switch: Entrar / Cadastro Morador */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-700/60 rounded-xl">
          <button
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Fazer Login
          </button>
          <button
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Cadastro de Morador
          </button>
        </div>

        {errorMessage && (
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">E-mail Cadastrado</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: mariana.costa@email.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs transition-all active:scale-95"
            >
              Acessar Conta
            </button>

            {/* Quick Demo Access */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                Ou acesse instantaneamente como:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemo(SEED_USERS[4])}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 text-left transition-colors"
                >
                  <span className="font-bold block text-slate-800 dark:text-white">Mariana Costa</span>
                  <span className="text-[10px] text-emerald-700">Moradora (Ed. Atlântico)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo(SEED_USERS[2])}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-50 text-left transition-colors"
                >
                  <span className="font-bold block text-slate-800 dark:text-white">Chef Lucas</span>
                  <span className="text-[10px] text-amber-700">Lojista (Forneria Barra)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo(SEED_USERS[0])}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 text-left transition-colors"
                >
                  <span className="font-bold block text-slate-800 dark:text-white">Carlos Silveira</span>
                  <span className="text-[10px] text-indigo-700">Admin Principal ABM</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo(SEED_USERS[1])}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-teal-50 text-left transition-colors"
                >
                  <span className="font-bold block text-slate-800 dark:text-white">Patrícia Mendes</span>
                  <span className="text-[10px] text-teal-700">Gestora / Atendimento</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterResident} className="space-y-2.5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Nome Completo</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Ex: Mariana Costa da Silva"
                required
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">E-mail</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Condomínio & Unidade Habitacional</label>
              <input
                type="text"
                value={regUnit}
                onChange={(e) => setRegUnit(e.target.value)}
                placeholder="Ex: Edifício Atlântico · Apto 402"
                required
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Telefone / WhatsApp</label>
              <input
                type="text"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="(21) 99999-8888"
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Senha de Acesso</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs transition-all active:scale-95 mt-2"
            >
              Concluir Cadastro de Morador
            </button>

            {/* Merchant restriction callout as required in spec */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] leading-relaxed flex items-start gap-2 mt-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Atenção Lojistas:</strong> A conta do lojista não pode ser criada pelo auto-registro. Ela deve ser solicitada e criada exclusivamente pela administração da ABM.
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
