import React, { useState, useEffect, useRef } from 'react';
import { processAssistantQuery, AssistantMessage } from '../../services/aiAssistant';
import { Store, Product, Service } from '../../types';
import { dataStore } from '../../services/store';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  MessageCircle, 
  ChevronRight, 
  Star, 
  Search, 
  MapPin, 
  Compass,
  RotateCcw
} from 'lucide-react';

interface SearchAndAIAssistantProps {
  initialQuery?: string;
  onSelectStore: (storeId: string) => void;
}

export const SearchAndAIAssistant: React.FC<SearchAndAIAssistantProps> = ({
  initialQuery = '',
  onSelectStore,
}) => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'asst_welcome',
      sender: 'assistant',
      text: 'Olá! Sou o ABM Assistente. 🤝 Estou aqui para ajudar você a encontrar lojas, produtos, serviços e informações dos parceiros credenciados na nossa associação. O que você precisa hoje?',
      suggestedActions: [
        { label: '🍕 Onde comer pizza boa?', query: 'Onde encontro pizza artesanal?' },
        { label: '❄️ Conserto de ar condicionado', query: 'Preciso de manutenção de ar condicionado' },
        { label: '🐾 Banho e tosa com Taxi Dog', query: 'Pet shop com banho e tosa' },
        { label: '🦷 Clareamento dental na ABM', query: 'Dentista e clareamento dental' },
      ],
      timestamp: 'Agora',
    },
  ]);

  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If initialQuery passed from home
  useEffect(() => {
    if (initialQuery && initialQuery !== 'O que tem de bom na ABM?') {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    const userMsg: AssistantMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate smart thinking settlement (~350ms)
    setTimeout(() => {
      const response = processAssistantQuery(text);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 400);
  };

  const handleWhatsApp = (store: Store) => {
    dataStore.recordAdClick(store.id);
    const msg = encodeURIComponent(`Olá ${store.name}! Fui indicado pelo ABM Assistente e gostaria de mais informações.`);
    window.open(`https://wa.me/${store.whatsapp}?text=${msg}`, '_blank');
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `asst_welcome_${Date.now()}`,
        sender: 'assistant',
        text: 'Conversa reiniciada! Como posso ajudar você a encontrar o que precisa na ABM hoje?',
        suggestedActions: [
          { label: '🍕 Pizzas e Massas', query: 'Quero pedir uma pizza artesanal' },
          { label: '🛠️ Eletricista ou Encanador', query: 'Preciso de reparos residenciais' },
          { label: '🥦 Cesta de Orgânicos', query: 'Onde comprar verduras orgânicas?' },
          { label: '🏛️ Como falar com a ABM?', query: 'Como falar com a administração da ABM?' },
        ],
        timestamp: 'Agora',
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] sm:h-[calc(100vh-160px)] max-h-[750px] bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-sm overflow-hidden">
      {/* Assistant Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs shadow-xs">
            <Bot className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-extrabold text-sm tracking-tight">ABM Assistente</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </div>
            <p className="text-[11px] text-emerald-100 font-medium">
              Busca Inteligente & Conexão Local
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1"
          title="Reiniciar conversa"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Reiniciar</span>
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[88%] sm:max-w-[78%] space-y-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
                {/* Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/60 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[9px] mt-1.5 block ${isUser ? 'text-emerald-200 text-right' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {/* Structured Stores Results Cards */}
                {msg.stores && msg.stores.length > 0 && (
                  <div className="space-y-2 pt-1 w-full">
                    {msg.stores.map((store) => (
                      <div
                        key={store.id}
                        className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs flex flex-col gap-2.5 hover:border-emerald-300 transition-all"
                      >
                        <div className="flex items-start gap-2.5">
                          <img
                            src={store.logo}
                            alt={store.name}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                                {store.category}
                              </span>
                              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span>{store.rating.toFixed(1)}</span>
                              </div>
                            </div>
                            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                              {store.name}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">{store.condoZone || store.address}</span>
                            </div>
                          </div>
                        </div>

                        {/* Store Action Buttons */}
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => onSelectStore(store.id)}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                          >
                            <span>Ver Loja</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleWhatsApp(store)}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Follow-up / Suggested Action Chips */}
                {msg.suggestedActions && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(action.query)}
                        className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold hover:bg-emerald-50 transition-colors shadow-2xs active:scale-95 text-left"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ex: Preciso de um eletricista ou onde comer pizza..."
            className="w-full pl-3.5 pr-3 py-2.5 bg-slate-100 dark:bg-slate-700/60 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-all shadow-xs active:scale-95"
          title="Enviar"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
