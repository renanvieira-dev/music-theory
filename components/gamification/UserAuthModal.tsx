// components/gamification/UserAuthModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useStudyProgress } from '@/store/useStudyProgress';
import { supabase } from '@/lib/supabase';
import {
  Trophy,
  LogOut,
  RotateCcw,
  Sparkles,
  Lock,
  CheckCircle2,
  AlertTriangle,
  X,
  Mail,
  Loader2,
} from 'lucide-react';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({ isOpen, onClose }) => {
  const { user, achievements, logout, resetAllProgress, completedLessons, syncWithSupabase } =
    useStudyProgress();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Monitora a sessão do Supabase ao abrir
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        syncWithSupabase(data.user.id);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await syncWithSupabase(session.user.id);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [syncWithSupabase]);

  if (!isOpen) return null;

  // Login com Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}` : undefined,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao iniciar login com Google.');
      setIsLoading(false);
    }
  };

  // Cadastro ou Login por E-mail
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const emailTrimmed = inputEmail.trim().toLowerCase();

    try {
      if (authMode === 'signup') {
        // Validação: checar se o e-mail já existe antes de registrar
        const { data: emailExists, error: rpcError } = await supabase.rpc('check_email_exists', {
          check_email: emailTrimmed,
        });

        if (rpcError) {
          console.warn('Erro ao verificar e-mail duplicado via RPC:', rpcError);
        }

        if (emailExists) {
          setErrorMessage('Este e-mail já está cadastrado. Por favor, acesse a aba "Entrar" para fazer login.');
          setIsLoading(false);
          return;
        }

        // Criar usuário no Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email: emailTrimmed,
          password: inputPassword,
          options: {
            data: {
              full_name: inputName.trim(),
            },
          },
        });

        if (error) {
          // Bloqueio extra da API caso o trigger do banco retorne violação única
          if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('unique')) {
            setErrorMessage('Este e-mail já está em uso. Não é permitido cadastrar duas vezes.');
          } else {
            setErrorMessage(error.message);
          }
          setIsLoading(false);
          return;
        }

        if (data.user) {
          await syncWithSupabase(data.user.id);
          onClose();
        }
      } else {
        // Login tradicional
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailTrimmed,
          password: inputPassword,
        });

        if (error) {
          setErrorMessage('E-mail ou senha incorretos.');
          setIsLoading(false);
          return;
        }

        if (data.user) {
          await syncWithSupabase(data.user.id);
          onClose();
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ocorreu um erro ao processar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlockedAt !== null).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!user ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-white">
                {authMode === 'signup' ? 'Criar Conta de Aluno' : 'Acessar Sua Conta'}
              </h2>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Guarde suas conquistas, pontuação de XP e estude sincronizado em qualquer dispositivo.
              </p>
            </div>

            {/* Alternador Entrar / Cadastrar */}
            <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                  authMode === 'signup'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Cadastrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                  authMode === 'login'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Entrar
              </button>
            </div>

            {/* Login com Gmail / Google */}
            <div className="max-w-sm mx-auto">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                type="button"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center gap-2.5 transition shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continuar com o Google (Gmail)</span>
              </button>
            </div>

            <div className="flex items-center gap-3 max-w-sm mx-auto text-xs text-neutral-500 font-mono">
              <div className="flex-1 h-px bg-neutral-800" />
              <span>OU COM E-MAIL</span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>

            {/* Mensagem de Erro / Alerta de Cadastro Duplicado */}
            {errorMessage && (
              <div className="max-w-sm mx-auto p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Formulário de E-mail / Senha */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5 max-w-sm mx-auto">
              {authMode === 'signup' && (
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Seu Nome:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Renan"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  Seu E-mail:
                </label>
                <input
                  type="email"
                  required
                  placeholder="exemplo@gmail.com"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  Senha:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-neutral-950 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : authMode === 'signup' ? (
                  'Criar Conta'
                ) : (
                  'Entrar na Plataforma'
                )}
              </button>
            </form>
          </div>
        ) : (
          /* PAINEL DO ALUNO LOGADO */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-amber-500 to-amber-300 text-neutral-950 flex items-center justify-center font-black text-xl shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {user.name}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {user.levelTitle}
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">{user.email}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 text-neutral-400 hover:text-rose-400 transition"
                title="Sair da Conta"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">XP Total</span>
                <span className="text-lg font-black text-amber-400 font-mono">{user.xp} pts</span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Lições Concluídas</span>
                <span className="text-lg font-black text-sky-400 font-mono">{completedLessons.length}</span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Conquistas</span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  {unlockedCount}/{achievements.length}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400">Progresso dos Troféus (Achievements)</span>
                <span className="text-amber-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                <div
                  className="h-full bg-linear-to-r from-amber-500 to-amber-300 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Suas Conquistas
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {achievements.map((ach) => {
                  const isUnlocked = ach.unlockedAt !== null;

                  return (
                    <div
                      key={ach.id}
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 transition ${
                        isUnlocked
                          ? 'bg-neutral-950/80 border-amber-500/40 text-neutral-200 shadow-sm'
                          : 'bg-neutral-950/30 border-neutral-800/80 text-neutral-500 opacity-60'
                      }`}
                    >
                      <div className="text-2xl shrink-0 mt-0.5">{ach.icon}</div>
                      <div className="text-xs space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <strong className={isUnlocked ? 'text-white' : 'text-neutral-400'}>
                            {ach.title}
                          </strong>
                          {isUnlocked ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Lock className="w-3 h-3 text-neutral-600" />
                          )}
                        </div>
                        <p className="text-[11px] leading-tight text-neutral-400 line-clamp-2">
                          {ach.description}
                        </p>
                        <span className="text-[10px] font-mono text-amber-500 block pt-1">
                          +{ach.xpReward} XP
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              {!showConfirmReset ? (
                <button
                  onClick={() => setShowConfirmReset(true)}
                  className="w-full py-2.5 rounded-xl border border-rose-900/40 text-rose-400/80 hover:text-rose-300 hover:bg-rose-950/30 hover:border-rose-800 text-xs font-mono transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Resetar Todo o Progresso do Curso
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 space-y-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-rose-300 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    Zerar todo o progresso na nuvem?
                  </div>
                  <p className="text-[11px] text-neutral-300">
                    Suas lições feitas, pontos de XP e troféus serão resetados para o início.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={async () => {
                        await resetAllProgress();
                        setShowConfirmReset(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition"
                    >
                      Sim, Zerar
                    </button>
                    <button
                      onClick={() => setShowConfirmReset(false)}
                      className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};