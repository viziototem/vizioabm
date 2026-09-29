import React, { useState, useEffect, useRef } from 'react';
import { User, Conversation, Message, Store } from '../../types';
import { dataStore } from '../../services/store';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Phone, 
  MessageCircle, 
  CheckCheck,
  Check
} from 'lucide-react';

interface ChatInterfaceProps {
  conversationId: string;
  currentUser: User;
  onBack: () => void;
  onViewStore?: (storeId: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversationId,
  currentUser,
  onBack,
  onViewStore,
}) => {
  const [conversation, setConversation] = useState<Conversation | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const conv = dataStore.getConversationById(conversationId);
      setConversation(conv);
      if (conv) {
        setMessages(dataStore.getMessages(conv.id));
      }
    };
    update();
    return dataStore.subscribe(update);
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="py-16 text-center text-xs text-slate-500">
        Conversa não encontrada.
      </div>
    );
  }

  const otherParticipantId = conversation.participantIds.find((id) => id !== currentUser.id) || '';
  const otherName = conversation.participantNames[otherParticipantId] || conversation.title;
  const otherAvatar = conversation.participantAvatars[otherParticipantId] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    dataStore.sendMessage(
      conversation.id,
      currentUser.id,
      currentUser.name,
      currentUser.role,
      otherParticipantId,
      inputMessage.trim()
    );

    const sentText = inputMessage.trim();
    setInputMessage('');

    // If resident messaging merchant, simulate merchant replying
    if (conversation.type === 'resident_merchant') {
      setTimeout(() => {
        dataStore.sendMessage(
          conversation.id,
          otherParticipantId,
          otherName,
          'merchant',
          currentUser.id,
          `Olá ${currentUser.name.split(' ')[0]}! Agradecemos o contato. Nosso atendimento está disponível agora e já estamos separando as informações sobre "${sentText.slice(0, 25)}..."!`
        );
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-170px)] sm:h-[calc(100vh-150px)] max-h-[720px] bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Chat Top Bar */}
      <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <img
            src={otherAvatar}
            alt={otherName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/40"
            referrerPolicy="no-referrer"
          />

          <div>
            <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
              {otherName}
            </h3>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Online no App ABM
            </span>
          </div>
        </div>

        {conversation.storeId && onViewStore && (
          <button
            onClick={() => onViewStore(conversation.storeId!)}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-colors"
          >
            Ver Loja
          </button>
        )}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
        {messages.map((m) => {
          const isMe = m.senderId === currentUser.id;

          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-emerald-600 text-white rounded-tr-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-tl-xs'
                }`}
              >
                {!isMe && (
                  <span className="text-[10px] font-bold text-emerald-600 block mb-0.5">
                    {m.senderName}
                  </span>
                )}
                <p>{m.message}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${isMe ? 'text-emerald-200' : 'text-slate-400'}`}>
                  <span>{new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-emerald-200" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bar */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 py-2.5 px-3 bg-slate-100 dark:bg-slate-700/60 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-all shadow-xs active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
