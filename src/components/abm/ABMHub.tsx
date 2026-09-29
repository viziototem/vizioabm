import React, { useState, useEffect } from 'react';
import { User, ABMNews, ABMDocument, Message, Conversation } from '../../types';
import { dataStore } from '../../services/store';
import { 
  Building2, 
  MessageSquare, 
  FileText, 
  Info, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  Clock, 
  Download, 
  AlertCircle, 
  ChevronRight,
  Shield,
  Phone,
  Mail,
  Calendar,
  Check
} from 'lucide-react';

interface ABMHubProps {
  currentUser: User;
  initialNewsId?: string;
  initialConversationId?: string;
}

export const ABMHub: React.FC<ABMHubProps> = ({
  currentUser,
  initialNewsId,
  initialConversationId,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'comunicados' | 'atendimento' | 'documentos' | 'sobre'>(
    initialConversationId ? 'atendimento' : 'comunicados'
  );

  const [newsList, setNewsList] = useState<ABMNews[]>([]);
  const [documents, setDocuments] = useState<ABMDocument[]>([]);
  const [selectedNews, setSelectedNews] = useState<ABMNews | null>(null);

  // Chat with ABM state
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setNewsList(dataStore.getNews());
      setDocuments(dataStore.getDocuments());

      // Find or create resident-abm conversation for current user
      const convs = dataStore.getConversations(currentUser.id);
      let abmConv = convs.find(c => c.type === 'resident_abm');
      
      if (!abmConv && currentUser.role === 'resident') {
        const abmManager = dataStore.getUsers().find(u => u.role === 'abm_manager') || {
          id: 'user_abm_manager',
          name: 'Patrícia Mendes (Atendimento ABM)',
          role: 'abm_manager' as const,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
        };
        abmConv = dataStore.createConversation(
          'resident_abm',
          currentUser,
          abmManager,
          'Olá, atendimento ABM! Como posso ajudar você hoje?'
        );
      } else if (!abmConv && (currentUser.role === 'master_admin' || currentUser.role === 'abm_manager')) {
        // Admin viewing first abm conversation
        abmConv = dataStore.getConversations().find(c => c.type === 'resident_abm');
      }

      if (abmConv) {
        setActiveConversation(abmConv);
        setMessages(dataStore.getMessages(abmConv.id));
      }

      if (initialNewsId) {
        const found = dataStore.getNews().find(n => n.id === initialNewsId);
        if (found) {
          setSelectedNews(found);
          setActiveSubTab('comunicados');
        }
      }
    };

    update();
    return dataStore.subscribe(update);
  }, [currentUser.id, initialNewsId, initialConversationId]);

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const text = (customText || chatInput).trim();
    if (!text || !activeConversation) return;

    const receiverId = activeConversation.participantIds.find(id => id !== currentUser.id) || 'user_abm_manager';

    dataStore.sendMessage(
      activeConversation.id,
      currentUser.id,
      currentUser.name,
      currentUser.role,
      receiverId,
      text
    );

    setChatInput('');

    // If resident sent message, simulate prompt and helpful ABM reply
    if (currentUser.role === 'resident') {
      setTimeout(() => {
        dataStore.sendMessage(
          activeConversation.id,
          'user_abm_manager',
          'Patrícia Mendes (Atendimento ABM)',
          'abm_manager',
          currentUser.id,
          `Recebemos sua mensagem sobre "${text.slice(0, 30)}...". Seu protocolo #2025-${Math.floor(100 + Math.random() * 900)} está registrado e nossa equipe já está verificando com a administração predial!`
        );
      }, 1000);
    }
  };

  const handleMockDownload = (docTitle: string) => {
    setDownloadSuccess(docTitle);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const quickQuestions = [
    'Segunda via de taxa condominial / boleto',
    'Como reservar churrasqueira ou salão de festas?',
    'Cadastrar novo veículo ou tag de portaria',
    'Reportar lâmpada apagada ou reparo na calçada',
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Top Banner Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-sm flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              Associação de Moradores
            </span>
            <span className="text-xs text-emerald-300">· Barra da Tijuca</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            Portal Oficial da ABM
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">
            Transparência, comunicados, atendimento direto e serviços para valorizar a nossa comunidade.
          </p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 border border-white/20">
          <Building2 className="w-8 h-8 text-emerald-200" />
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto no-scrollbar">
        <button
          onClick={() => { setActiveSubTab('comunicados'); setSelectedNews(null); }}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'comunicados'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-emerald-600" />
          <span>Comunicados ({newsList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('atendimento')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'atendimento'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>Fale com a ABM</span>
        </button>

        <button
          onClick={() => setActiveSubTab('documentos')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'documentos'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Download className="w-3.5 h-3.5 text-emerald-600" />
          <span>Documentos & Atas ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sobre')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'sobre'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Info className="w-3.5 h-3.5 text-emerald-600" />
          <span>Quem Somos</span>
        </button>
      </div>

      {/* SubTab 1: Comunicados & Notícias */}
      {activeSubTab === 'comunicados' && (
        <div className="space-y-3">
          {selectedNews ? (
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-4 animate-in fade-in duration-200">
              <button
                onClick={() => setSelectedNews(null)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                ← Voltar para lista de comunicados
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedNews.category}
                  </span>
                  <span className="text-xs text-slate-400">· {selectedNews.date}</span>
                  {selectedNews.urgent && (
                    <span className="text-[11px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded">
                      Prioritário
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {selectedNews.title}
                </h2>
                <div className="text-xs text-slate-500">
                  Publicado por: <span className="font-semibold text-slate-700">{selectedNews.author}</span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed border-t border-b border-slate-100 dark:border-slate-700/60 py-4">
                {selectedNews.content}
              </div>

              {selectedNews.attachments && selectedNews.attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Documentos e Anexos Oficiais
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedNews.attachments.map((att, i) => (
                      <div
                        key={i}
                        onClick={() => handleMockDownload(att.name)}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-800 truncate">{att.name}</p>
                            <span className="text-[10px] text-slate-400">{att.size}</span>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-slate-400 hover:text-emerald-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2.5">
              {newsList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedNews(item)}
                  className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 hover:border-emerald-200 hover:shadow-xs transition-all cursor-pointer flex items-start gap-3.5 group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.urgent
                      ? 'bg-rose-50 text-rose-600 border border-rose-100'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}>
                    {item.urgent ? <AlertCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      {item.urgent && (
                        <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded ml-auto">
                          Urgente
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SubTab 2: Fale com a ABM (Chat Atendimento) */}
      {activeSubTab === 'atendimento' && (
        <div className="flex flex-col h-[560px] bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
                  alt="Patrícia Mendes"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/40"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white leading-tight">
                  Atendimento ABM · Patrícia Mendes
                </h3>
                <p className="text-[10px] text-emerald-300 font-medium">
                  Atendimento Oficial ao Morador · Protocolo Ativo
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Online
              </span>
            </div>
          </div>

          {/* Quick FAQ Suggestion Bar */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] text-slate-400 font-bold shrink-0">Dúvidas rápidas:</span>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(undefined, q)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-medium hover:bg-emerald-50 hover:text-emerald-700 whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
            {messages.map((m) => {
              const isMe = m.senderId === currentUser.id;

              return (
                <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-emerald-600 text-white rounded-tr-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/60 rounded-tl-xs'
                    }`}
                  >
                    {!isMe && (
                      <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 block mb-1">
                        {m.senderName}
                      </span>
                    )}
                    <p>{m.message}</p>
                    <span
                      className={`text-[9px] mt-1 block ${
                        isMe ? 'text-emerald-200 text-right' : 'text-slate-400'
                      }`}
                    >
                      {new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleMockDownload('Foto ou Comprovante')}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Anexar foto ou documento"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Digite sua mensagem para a administração..."
              className="flex-1 py-2.5 px-3 bg-slate-100 dark:bg-slate-700/60 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
            />

            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-all shadow-xs active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* SubTab 3: Documentos & Atas */}
      {activeSubTab === 'documentos' && (
        <div className="space-y-3">
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100 text-xs flex items-center justify-between">
            <span>Central de transparência: baixe regulamentos, atas de assembleias e estatuto social da ABM.</span>
            {downloadSuccess && (
              <span className="font-bold flex items-center gap-1 text-emerald-700">
                <Check className="w-3.5 h-3.5" /> Download iniciado!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs flex flex-col justify-between hover:border-slate-200 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {doc.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {doc.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {doc.fileType} · {doc.size}
                  </span>

                  <button
                    onClick={() => handleMockDownload(doc.title)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition-all active:scale-95 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 4: Quem Somos & Contatos */}
      {activeSubTab === 'sobre' && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Associação de Moradores da Barra da Tijuca (ABM)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Fundada para integrar, proteger e valorizar a comunidade dos condomínios associados da Barra da Tijuca. A ABM atua na segurança perimetral, transporte exclusivo dos moradores (ônibus executivo e balsas ecológicas), preservação das áreas verdes, manutenção do bosque e defesa contínua da qualidade de vida comunitária.
            </p>
          </div>

          {/* Diretoria Executiva */}
          <div className="p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Diretoria Executiva (Gestão 2024–2026)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40">
                <span className="font-bold text-slate-800 block">Carlos Silveira</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Presidente Executivo</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40">
                <span className="font-bold text-slate-800 block">Dra. Heloísa Brandão</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Diretora Jurídica</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40">
                <span className="font-bold text-slate-800 block">Eng. Renato Albuquerque</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Diretor de Obras & Segurança</span>
              </div>
            </div>
          </div>

          {/* Contatos da Sede */}
          <div className="p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Sede Administrativa & Atendimento
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50">
                <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Av. Prefeito Dulcídio Cardoso, 2500 - Barra da Tijuca, RJ</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Segunda a Sexta: 08h00 às 18h00 | Sábado: 08h00 às 12h00</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>(21) 3432-8000 / Central 24h: 0800 722 0022</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>contato@abm.org.br / ouvidoria@abm.org.br</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
