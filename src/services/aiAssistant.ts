import { dataStore } from './store';
import { Store, Product, Service } from '../types';

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  stores?: Store[];
  products?: Product[];
  services?: Service[];
  suggestedActions?: { label: string; query: string }[];
  timestamp: string;
}

export function processAssistantQuery(query: string): AssistantMessage {
  const cleanQuery = query.toLowerCase().trim();
  const stores = dataStore.getStores();
  const products = dataStore.getProducts();
  const services = dataStore.getServices();
  const news = dataStore.getNews();

  // Intent keyword mappings
  const keywords = {
    pizza_food: ['pizza', 'lanche', 'comida', 'jantar', 'almoço', 'comer', 'pão', 'forneria', 'fermentação', 'hambúrguer', 'restaurante', 'massa', 'gastronomia', 'delivery'],
    dentist_health: ['dentista', 'dente', 'odontologia', 'odonto', 'clareamento', 'ortodontia', 'limpeza dental', 'saúde', 'médico', 'clínica', 'consulta'],
    ac_electrician: ['ar condicionado', 'ar-condicionado', 'split', 'ar', 'climatização', 'encanador', 'eletricista', 'manutenção', 'reparo', 'conserto', 'instalação', 'vazamento', 'fiação', 'serviço'],
    pet: ['pet', 'cachorro', 'cão', 'gato', 'banho e tosa', 'tosa', 'veterinário', 'ração', 'taxi dog', 'animal'],
    beauty: ['manicure', 'cabelo', 'salão', 'unha', 'estética', 'massagem', 'spa', 'beleza', 'sobrancelha', 'visagismo'],
    market: ['mercado', 'hortifruti', 'orgânico', 'fruta', 'verdura', 'legume', 'feira', 'queijo', 'compras'],
    abm_admin: ['abm', 'assembleia', 'síndico', 'boleto', 'salão', 'reserva', 'portaria', 'cancela', 'reconhecimento facial', 'administração', 'contato abm'],
  };

  // Match entities
  let matchedStores: Store[] = [];
  let matchedProducts: Product[] = [];
  let matchedServices: Service[] = [];
  let responseText = '';
  let suggestedActions: { label: string; query: string }[] = [];

  // Check specific intent
  if (keywords.pizza_food.some(k => cleanQuery.includes(k))) {
    matchedStores = stores.filter(s => s.category === 'Alimentação' || s.name.toLowerCase().includes('forneria'));
    matchedProducts = products.filter(p => p.category?.toLowerCase().includes('pizza') || p.name.toLowerCase().includes('pizza') || p.name.toLowerCase().includes('pão'));
    responseText = 'Encontrei a Forneria & Empório Barra! Eles produzem pizzas artesanais de fermentação natural de 48h no forno a lenha e pães rústicos de sourdough. Moradores da ABM contam com 20% OFF no primeiro pedido!';
    suggestedActions = [
      { label: '🍕 Ver Cardápio Forneria', query: 'Ver cardápio da Forneria' },
      { label: '💬 Pedir no WhatsApp', query: 'Pedir pizza pelo WhatsApp' },
    ];
  } else if (keywords.ac_electrician.some(k => cleanQuery.includes(k))) {
    matchedStores = stores.filter(s => s.category === 'Serviços' || s.name.toLowerCase().includes('barra prime'));
    matchedServices = services.filter(s => s.name.toLowerCase().includes('ar') || s.name.toLowerCase().includes('split') || s.name.toLowerCase().includes('limpeza'));
    responseText = 'Para serviços residenciais, recomendo a Barra Prime Climatização & Elétrica 24h. Eles realizam higienização bactericida profunda, consertos de ar split e elétrica residencial com atendimento rápido na ABM.';
    suggestedActions = [
      { label: '❄️ Higienização de Ar', query: 'Quero higienizar ar condicionado' },
      { label: '⚡ Plantão Elétrico 24h', query: 'Preciso de eletricista 24 horas' },
    ];
  } else if (keywords.dentist_health.some(k => cleanQuery.includes(k))) {
    matchedStores = stores.filter(s => s.category === 'Saúde' || s.name.toLowerCase().includes('camila'));
    matchedServices = services.filter(s => s.name.toLowerCase().includes('clareamento') || s.name.toLowerCase().includes('limpeza') || s.name.toLowerCase().includes('profilaxia'));
    responseText = 'Temos a Dra. Camila Nogueira Odontologia Integrada, localizada no Centro Médico da ABM (Sala 204). Ela realiza clareamento a laser, ortodontia estética e profilaxia preventiva com desconto para associados.';
    suggestedActions = [
      { label: '🦷 Clareamento a Laser', query: 'Como funciona o clareamento?' },
      { label: '📅 Agendar Consulta', query: 'Agendar consulta com a Dra Camila' },
    ];
  } else if (keywords.pet.some(k => cleanQuery.includes(k))) {
    matchedStores = stores.filter(s => s.category === 'Pet');
    matchedServices = services.filter(s => s.name.toLowerCase().includes('banho') || s.name.toLowerCase().includes('pet'));
    matchedProducts = products.filter(p => p.name.toLowerCase().includes('pet') || p.name.toLowerCase().includes('shampoo'));
    responseText = 'Para o seu companheiro pet, temos o Pet Care Tropical & Banho! O grande diferencial é o Taxi Dog climatizado que busca e entrega o pet com total segurança na portaria do seu condomínio.';
    suggestedActions = [
      { label: '🐶 Agendar Banho & Tosa', query: 'Agendar banho com Taxi Dog' },
      { label: '📍 Onde fica o Pet Shop?', query: 'Onde fica o Pet Care?' },
    ];
  } else if (keywords.beauty.some(k => cleanQuery.includes(k))) {
    matchedStores = stores.filter(s => s.category === 'Beleza');
    matchedServices = services.filter(s => s.name.toLowerCase().includes('massagem') || s.name.toLowerCase().includes('cabelo'));
    responseText = 'O Studio Bella Vista Salão & Spa oferece manicure, visagismo, massagens relaxantes com óleos essenciais e tratamentos capilares completos, pertinho da ABM no Shopping Barra Point.';
    suggestedActions = [
      { label: '💆 Massagem Relaxante', query: 'Ver massagem relaxante' },
      { label: '💅 Agendar Manicure', query: 'Agendar horário no Studio Bella Vista' },
    ];
  } else if (keywords.market.some(k => cleanQuery.includes(k))) {
    matchedStores = stores.filter(s => s.category === 'Mercados');
    matchedProducts = products.filter(p => p.category?.toLowerCase().includes('orgânica') || p.name.toLowerCase().includes('cesta'));
    responseText = 'O Green Market Hortifruti & Orgânicos fica ao lado da sede da ABM. Eles recebem hortaliças frescas todos os dias e entregam cestas orgânicas semanais selecionadas direto no seu apartamento.';
    suggestedActions = [
      { label: '🥦 Ver Cesta Orgânica', query: 'Ver cesta orgânica da semana' },
      { label: '🛵 Horário de Entrega', query: 'Qual o horário do hortifruti?' },
    ];
  } else if (keywords.abm_admin.some(k => cleanQuery.includes(k))) {
    const latestNotice = news[0];
    responseText = `Sobre a administração da ABM: você pode falar diretamente com a secretaria na aba "ABM" > "Fale com a ABM". A próxima Assembleia Geral de Moradores está convocada para 12/04. O atendimento presencial na sede ocorre de Seg a Sex das 08h às 18h.`;
    suggestedActions = [
      { label: '🏛️ Ir para aba ABM', query: 'Ver comunicados e documentos' },
      { label: '💬 Abrir Atendimento ABM', query: 'Falar com Patrícia do atendimento' },
    ];
  } else {
    // General search across all store names, descriptions, categories
    const matching = stores.filter(s =>
      s.name.toLowerCase().includes(cleanQuery) ||
      s.category.toLowerCase().includes(cleanQuery) ||
      s.description.toLowerCase().includes(cleanQuery)
    );

    if (matching.length > 0) {
      matchedStores = matching;
      responseText = `Localizei ${matching.length} parceiro(s) na ABM relacionados a "${query}". Veja as opções abaixo para entrar em contato diretamente via WhatsApp ou conferir o perfil completo!`;
    } else {
      // Fallback
      matchedStores = stores.slice(0, 3);
      responseText = `Não encontrei nenhum parceiro específico para "${query}" no momento, mas aqui estão algumas das lojas e prestadores mais recomendados pelos moradores da ABM:`;
      suggestedActions = [
        { label: '🍕 Pizzarias & Lanches', query: 'Quero comer pizza' },
        { label: '🛠️ Ar Condicionado e Reparos', query: 'Conserto de ar condicionado' },
        { label: '🐾 Pet Shop e Banho', query: 'Banho e tosa para cachorro' },
        { label: '🦷 Clínicas de Saúde', query: 'Dentista na ABM' },
      ];
    }
  }

  return {
    id: `asst_${Date.now()}`,
    sender: 'assistant',
    text: responseText,
    stores: matchedStores.length > 0 ? matchedStores : undefined,
    products: matchedProducts.length > 0 ? matchedProducts : undefined,
    services: matchedServices.length > 0 ? matchedServices : undefined,
    suggestedActions: suggestedActions.length > 0 ? suggestedActions : undefined,
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  };
}
