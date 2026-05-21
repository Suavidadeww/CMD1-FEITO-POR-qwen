import { useState, useEffect, useCallback } from 'react';
import { 
  Comanda, 
  Cliente, 
  Produto, 
  CategoriaProduto, 
  FormaPagamento, 
  ItemComanda,
  ResumoGestao
} from '../types';

// --- DADOS INICIAIS / SIMULADOS ---
const PRODUTOS_INICIAIS: Produto[] = [
  // Narguilés
  { id: '1', nome: 'Narguilé Tradicional', categoria: 'narguile', preco: 45.00, custo: 15.00, estoque: 20, estoqueMinimo: 5, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1542838686-37da4a9fd1b3?auto=format&fit=crop&w=300&q=80' },
  { id: '2', nome: 'Narguilé Frutas Vermelhas', categoria: 'narguile', preco: 50.00, custo: 18.00, estoque: 15, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=300&q=80' },
  { id: '3', nome: 'Narguilé Menta Lemon', categoria: 'narguile', preco: 50.00, custo: 18.00, estoque: 12, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80' },
  { id: '4', nome: 'Narguilé Love 66', categoria: 'narguile', preco: 55.00, custo: 20.00, estoque: 8, estoqueMinimo: 5, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1542838686-37da4a9fd1b3?auto=format&fit=crop&w=300&q=80' },
  { id: '5', nome: 'Narguilé Blueberry', categoria: 'narguile', preco: 50.00, custo: 18.00, estoque: 0, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=300&q=80' },
  { id: '6', nome: 'Narguilé Capuccino', categoria: 'narguile', preco: 48.00, custo: 17.00, estoque: 10, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80' },
  { id: '7', nome: 'Narguilé Hawaiian Breeze', categoria: 'narguile', preco: 52.00, custo: 19.00, estoque: 5, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1542838686-37da4a9fd1b3?auto=format&fit=crop&w=300&q=80' },
  { id: '8', nome: 'Narguilé Customizado', categoria: 'narguile', preco: 60.00, custo: 22.00, estoque: 30, estoqueMinimo: 5, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=300&q=80' },
  
  // Bebidas Alcoólicas
  { id: '9', nome: 'Cerveja Artesanal IPA', categoria: 'alcoolicas', preco: 18.00, custo: 8.00, estoque: 48, estoqueMinimo: 12, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1608270586620-248524c67e95?auto=format&fit=crop&w=300&q=80' },
  { id: '10', nome: 'Cerveja Pilsen Long Neck', categoria: 'alcoolicas', preco: 12.00, custo: 5.00, estoque: 100, estoqueMinimo: 24, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1618183180996-5c66d43958f7?auto=format&fit=crop&w=300&q=80' },
  { id: '11', nome: 'Caipirinha de Limão', categoria: 'alcoolicas', preco: 22.00, custo: 9.00, estoque: 20, estoqueMinimo: 5, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' },
  { id: '12', nome: 'Caipirinha de Morango', categoria: 'alcoolicas', preco: 24.00, custo: 10.00, estoque: 15, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=300&q=80' },
  { id: '13', nome: 'Gin Tônica', categoria: 'alcoolicas', preco: 28.00, custo: 12.00, estoque: 25, estoqueMinimo: 8, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80' },
  { id: '14', nome: 'Whisky on the rocks', categoria: 'alcoolicas', preco: 35.00, custo: 18.00, estoque: 12, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1527281400683-1cf3a3c69910?auto=format&fit=crop&w=300&q=80' },
  { id: '15', nome: 'Vodka Redbull', categoria: 'alcoolicas', preco: 25.00, custo: 11.00, estoque: 30, estoqueMinimo: 10, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1575023782549-62ca0d244b37?auto=format&fit=crop&w=300&q=80' },
  { id: '16', nome: 'Mojito', categoria: 'alcoolicas', preco: 26.00, custo: 11.00, estoque: 18, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' },
  { id: '17', nome: 'Margarita', categoria: 'alcoolicas', preco: 26.00, custo: 11.00, estoque: 15, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=300&q=80' },
  { id: '18', nome: 'Espumante Taça', categoria: 'alcoolicas', preco: 30.00, custo: 15.00, estoque: 24, estoqueMinimo: 6, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?auto=format&fit=crop&w=300&q=80' },
  { id: '19', nome: 'Vinho Tinto Taça', categoria: 'alcoolicas', preco: 22.00, custo: 10.00, estoque: 36, estoqueMinimo: 12, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80' },
  { id: '20', nome: 'Batida de Coco', categoria: 'alcoolicas', preco: 20.00, custo: 8.00, estoque: 20, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' },
  { id: '21', nome: 'Shot de Tequila', categoria: 'alcoolicas', preco: 15.00, custo: 7.00, estoque: 40, estoqueMinimo: 10, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80' },

  // Não Alcoólicas
  { id: '22', nome: 'Refrigerante Lata', categoria: 'nao-alcoolicas', preco: 8.00, custo: 3.50, estoque: 100, estoqueMinimo: 24, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80' },
  { id: '23', nome: 'Suco Natural Laranja', categoria: 'nao-alcoolicas', preco: 12.00, custo: 5.00, estoque: 30, estoqueMinimo: 10, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=300&q=80' },
  { id: '24', nome: 'Suco Natural Morango', categoria: 'nao-alcoolicas', preco: 14.00, custo: 6.00, estoque: 25, estoqueMinimo: 10, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=300&q=80' },
  { id: '25', nome: 'Água com Gás', categoria: 'nao-alcoolicas', preco: 6.00, custo: 2.00, estoque: 80, estoqueMinimo: 20, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=300&q=80' },
  { id: '26', nome: 'Água sem Gás', categoria: 'nao-alcoolicas', preco: 5.00, custo: 1.50, estoque: 100, estoqueMinimo: 24, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=300&q=80' },
  { id: '27', nome: 'Energético', categoria: 'nao-alcoolicas', preco: 15.00, custo: 7.00, estoque: 48, estoqueMinimo: 12, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1575023782549-62ca0d244b37?auto=format&fit=crop&w=300&q=80' },
  { id: '28', nome: 'Chá Gelado', categoria: 'nao-alcoolicas', preco: 10.00, custo: 4.00, estoque: 30, estoqueMinimo: 10, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80' },
  { id: '29', nome: 'Limonada Suíça', categoria: 'nao-alcoolicas', preco: 12.00, custo: 5.00, estoque: 20, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' },

  // Quentes
  { id: '30', nome: 'Café Expresso', categoria: 'quentes', preco: 6.00, custo: 2.00, estoque: 100, estoqueMinimo: 50, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80' },
  { id: '31', nome: 'Cappuccino', categoria: 'quentes', preco: 12.00, custo: 5.00, estoque: 80, estoqueMinimo: 30, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80' },
  { id: '32', nome: 'Latte Macchiato', categoria: 'quentes', preco: 14.00, custo: 6.00, estoque: 70, estoqueMinimo: 30, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1570968992193-96ab71c64357?auto=format&fit=crop&w=300&q=80' },
  { id: '33', nome: 'Chocolate Quente', categoria: 'quentes', preco: 15.00, custo: 7.00, estoque: 50, estoqueMinimo: 20, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=300&q=80' },
  { id: '34', nome: 'Chá de Camomila', categoria: 'quentes', preco: 8.00, custo: 3.00, estoque: 60, estoqueMinimo: 20, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=300&q=80' },
  { id: '35', nome: 'Chá Preto', categoria: 'quentes', preco: 8.00, custo: 3.00, estoque: 60, estoqueMinimo: 20, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=300&q=80' },

  // Petiscos
  { id: '36', nome: 'Batata Frita com Cheddar', categoria: 'petiscos', preco: 28.00, custo: 12.00, estoque: 40, estoqueMinimo: 10, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1573080496987-a199f8cd75ec?auto=format&fit=crop&w=300&q=80' },
  { id: '37', nome: 'Nuggets (10 un)', categoria: 'petiscos', preco: 22.00, custo: 10.00, estoque: 30, estoqueMinimo: 10, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1562967963-ed7b537f20a8?auto=format&fit=crop&w=300&q=80' },
  { id: '38', nome: 'Anel de Cebola', categoria: 'petiscos', preco: 24.00, custo: 11.00, estoque: 25, estoqueMinimo: 8, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=300&q=80' },
  { id: '39', nome: 'Isca de Frango', categoria: 'petiscos', preco: 26.00, custo: 12.00, estoque: 30, estoqueMinimo: 10, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1562967963-ed7b537f20a8?auto=format&fit=crop&w=300&q=80' },
  { id: '40', nome: 'Tábua de Frios', categoria: 'petiscos', preco: 45.00, custo: 22.00, estoque: 15, estoqueMinimo: 5, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1529312266912-b33cf6227e24?auto=format&fit=crop&w=300&q=80' },
  { id: '41', nome: 'Amendoim', categoria: 'petiscos', preco: 12.00, custo: 5.00, estoque: 50, estoqueMinimo: 15, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?auto=format&fit=crop&w=300&q=80' },
  { id: '42', nome: 'Azeitonas', categoria: 'petiscos', preco: 10.00, custo: 4.00, estoque: 40, estoqueMinimo: 12, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?auto=format&fit=crop&w=300&q=80' },

  // Sinuca
  { id: '43', nome: 'Hora de Sinuca', categoria: 'sinuca', preco: 20.00, custo: 2.00, estoque: 999, estoqueMinimo: 10, ativo: true, destaque: true, imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80' },
  { id: '44', nome: 'Partida Avulsa', categoria: 'sinuca', preco: 15.00, custo: 1.00, estoque: 999, estoqueMinimo: 10, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80' },
  { id: '45', nome: 'Torneio (Inscrição)', categoria: 'sinuca', preco: 50.00, custo: 5.00, estoque: 50, estoqueMinimo: 5, ativo: true, destaque: false, imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80' },
];

const CLIENTES_INICIAIS: Cliente[] = [
  { id: '1', nome: 'João Silva', cpf: '123.456.789-00', whatsapp: '11999999999', totalVisitas: 5, totalGasto: 450.00 },
  { id: '2', nome: 'Maria Oliveira', cpf: '987.654.321-00', whatsapp: '11988888888', totalVisitas: 12, totalGasto: 1200.50 },
  { id: '3', nome: 'Carlos Souza', cpf: '456.789.123-00', whatsapp: '11977777777', totalVisitas: 2, totalGasto: 120.00 },
  { id: '4', nome: 'Ana Pereira', cpf: '321.654.987-00', whatsapp: '11966666666', totalVisitas: 8, totalGasto: 890.00 },
  { id: '5', nome: 'Roberto Santos', cpf: '159.753.486-00', whatsapp: '11955555555', totalVisitas: 1, totalGasto: 65.00 },
];

// --- HOOK PRINCIPAL ---
export function useApp() {
  // Estados Principais
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [historicoGestao, setHistoricoGestao] = useState<Record<string, ResumoGestao>>({});
  
  // Estados de UI
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [senhaDesbloqueada, setSenhaDesbloqueada] = useState<Record<string, boolean>>({
    clientes: false,
    cardapio: false,
    gestao: false,
  });
  const [totalDiaOculto, setTotalDiaOculto] = useState(true);
  const [tempoRestanteTotal, setTempoRestanteTotal] = useState<number>(0);

  // Carregar dados iniciais (Simulação de Banco de Dados)
  useEffect(() => {
    const carregarDados = () => {
      const savedProdutos = localStorage.getItem('hm_produtos');
      const savedClientes = localStorage.getItem('hm_clientes');
      const savedComandas = localStorage.getItem('hm_comandas');
      const savedHistorico = localStorage.getItem('hm_historico');
      const savedTema = localStorage.getItem('hm_tema');

      if (savedProdutos) setProdutos(JSON.parse(savedProdutos));
      else {
        setProdutos(PRODUTOS_INICIAIS);
        localStorage.setItem('hm_produtos', JSON.stringify(PRODUTOS_INICIAIS));
      }

      if (savedClientes) setClientes(JSON.parse(savedClientes));
      else {
        setClientes(CLIENTES_INICIAIS);
        localStorage.setItem('hm_clientes', JSON.stringify(CLIENTES_INICIAIS));
      }

      if (savedComandas) setComandas(JSON.parse(savedComandas));
      
      if (savedHistorico) setHistoricoGestao(JSON.parse(savedHistorico));

      if (savedTema) setTemaEscuro(savedTema === 'dark');
    };

    carregarDados();
  }, []);

  // Persistência Automática
  useEffect(() => {
    if (produtos.length > 0) localStorage.setItem('hm_produtos', JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    if (clientes.length > 0) localStorage.setItem('hm_clientes', JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem('hm_comandas', JSON.stringify(comandas));
    atualizarGestaoDiaria(); // Atualiza gestão sempre que comandas mudam
  }, [comandas]);

  useEffect(() => {
    localStorage.setItem('hm_historico', JSON.stringify(historicoGestao));
  }, [historicoGestao]);

  useEffect(() => {
    localStorage.setItem('hm_tema', temaEscuro ? 'dark' : 'light');
    if (temaEscuro) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [temaEscuro]);

  // Timer para ocultar o total novamente
  useEffect(() => {
    let timer: number;
    if (tempoRestanteTotal > 0) {
      timer = window.setTimeout(() => {
        setTempoRestanteTotal(prev => prev - 1);
      }, 1000);
    } else if (tempoRestanteTotal === 0 && !totalDiaOculto) {
      setTotalDiaOculto(true);
    }
    return () => clearTimeout(timer);
  }, [tempoRestanteTotal, totalDiaOculto]);

  // --- LÓGICA DE GESTÃO DIÁRIA ---
  const getChaveDia = (data: Date = new Date()) => {
    return data.toISOString().split('T')[0];
  };

  const atualizarGestaoDiaria = useCallback(() => {
    const hoje = getChaveDia();
    const comandasFechadasHoje = comandas.filter(c => c.status === 'fechada' && c.dataFechamento?.startsWith(hoje));
    
    let receitaTotal = 0;
    let lucroTotal = 0;
    let itensVendidos = 0;
    const contagemPagamentos: Record<string, number> = {};

    comandasFechadasHoje.forEach(comanda => {
      receitaTotal += comanda.total;
      
      // Calcular lucro baseado nos itens
      comanda.itens.forEach(item => {
        const produto = produtos.find(p => p.id === item.produtoId);
        if (produto) {
          const lucroItem = (produto.preco - produto.custo) * item.quantidade;
          lucroTotal += lucroItem;
          itensVendidos += item.quantidade;
        }
      });

      if (comanda.formaPagamento) {
        contagemPagamentos[comanda.formaPagamento] = (contagemPagamentos[comanda.formaPagamento] || 0) + 1;
      }
    });

    const ticketMedio = comandasFechadasHoje.length > 0 ? receitaTotal / comandasFechadasHoje.length : 0;

    setHistoricoGestao(prev => ({
      ...prev,
      [hoje]: {
        data: hoje,
        receita: receitaTotal,
        lucro: lucroTotal,
        comandasFechadas: comandasFechadasHoje.length,
        ticketMedio,
        itensVendidos,
        formasPagamento: contagemPagamentos,
        margemMedia: receitaTotal > 0 ? (lucroTotal / receitaTotal) * 100 : 0
      }
    }));
  }, [comandas, produtos]);

  // --- AÇÕES DE COMANDA ---
  const criarComanda = (clienteId?: string, nomeCliente?: string) => {
    const novaComanda: Comanda = {
      id: Date.now().toString(),
      clienteId,
      nomeCliente: nomeCliente || 'Consumidor Final',
      status: 'aberta',
      itens: [],
      total: 0,
      desconto: 0,
      dataAbertura: new Date().toISOString(),
    };
    setComandas(prev => [...prev, novaComanda]);
    return novaComanda;
  };

  const adicionarItem = (comandaId: string, produtoId: string, quantidade: number = 1, obs?: string) => {
    setComandas(prev => prev.map(comanda => {
      if (comanda.id !== comandaId) return comanda;

      const produto = produtos.find(p => p.id === produtoId);
      if (!produto) return comanda;

      // Verificar estoque
      const itemExistente = comanda.itens.find(i => i.produtoId === produtoId);
      const qtdTotalNecessaria = (itemExistente ? itemExistente.quantidade : 0) + quantidade;

      if (qtdTotalNecessaria > produto.estoque) {
        alert(`Estoque insuficiente para ${produto.nome}! Disponível: ${produto.estoque}`);
        return comanda;
      }

      // Atualizar estoque do produto
      atualizarEstoque(produtoId, -quantidade);

      const novosItens = [...comanda.itens];
      const index = novosItens.findIndex(i => i.produtoId === produtoId);

      if (index >= 0) {
        novosItens[index].quantidade += quantidade;
        if (obs) novosItens[index].observacao = obs;
      } else {
        novosItens.push({
          produtoId,
          nome: produto.nome,
          preco: produto.preco,
          quantidade,
          observacao: obs
        });
      }

      const novoTotal = novosItens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
      
      return {
        ...comanda,
        itens: novosItens,
        total: novoTotal * (1 - (comanda.desconto / 100))
      };
    }));
  };

  const removerItem = (comandaId: string, produtoId: string, quantidadeRemover: number = 1) => {
    setComandas(prev => prev.map(comanda => {
      if (comanda.id !== comandaId) return comanda;

      const itemIndex = comanda.itens.findIndex(i => i.produtoId === produtoId);
      if (itemIndex === -1) return comanda;

      const item = comanda.itens[itemIndex];
      const novaQtd = item.quantidade - quantidadeRemover;

      // Devolver ao estoque
      atualizarEstoque(produtoId, quantidadeRemover);

      let novosItens = [...comanda.itens];
      if (novaQtd <= 0) {
        novosItens.splice(itemIndex, 1);
      } else {
        novosItens[itemIndex] = { ...item, quantidade: novaQtd };
      }

      const novoTotal = novosItens.reduce((acc, i) => acc + (i.preco * i.quantidade), 0);

      return {
        ...comanda,
        itens: novosItens,
        total: novoTotal * (1 - (comanda.desconto / 100))
      };
    }));
  };

  const fecharComanda = (comandaId: string, formaPagamento: FormaPagamento) => {
    setComandas(prev => prev.map(comanda => {
      if (comanda.id !== comandaId) return comanda;
      
      // Atualizar histórico do cliente se existir
      if (comanda.clienteId) {
        setClientes(clientesPrev => clientesPrev.map(c => {
          if (c.id === comanda.clienteId) {
            return {
              ...c,
              totalVisitas: c.totalVisitas + 1,
              totalGasto: c.totalGasto + comanda.total
            };
          }
          return c;
        }));
      }

      return {
        ...comanda,
        status: 'fechada',
        formaPagamento,
        dataFechamento: new Date().toISOString()
      };
    }));
    
    // Tocar som de sucesso (simulado)
    console.log("Comanda fechada com sucesso!");
  };

  const atualizarEstoque = (produtoId: string, delta: number) => {
    setProdutos(prev => prev.map(p => {
      if (p.id === produtoId) {
        return { ...p, estoque: Math.max(0, p.estoque + delta) };
      }
      return p;
    }));
  };

  // --- AÇÕES DE PRODUTOS ---
  const salvarProduto = (produto: Produto) => {
    setProdutos(prev => {
      const exists = prev.find(p => p.id === produto.id);
      if (exists) {
        return prev.map(p => p.id === produto.id ? produto : p);
      }
      return [...prev, produto];
    });
  };

  const excluirProduto = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(prev => prev.filter(p => p.id !== id));
    }
  };

  // --- AÇÕES DE CLIENTES ---
  const salvarCliente = (cliente: Cliente) => {
    setClientes(prev => {
      const exists = prev.find(c => c.id === cliente.id);
      if (exists) {
        return prev.map(c => c.id === cliente.id ? cliente : c);
      }
      return [...prev, cliente];
    });
  };

  const excluirCliente = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente? O histórico de visitas será mantido nas comandas, mas o perfil será removido.')) {
      setClientes(prev => prev.filter(c => c.id !== id));
    }
  };

  // --- CONTROLE DE SENHA E TEMA ---
  const verificarSenha = (area: string, senha: string) => {
    if (senha === 'suasenha') {
      setSenhaDesbloqueada(prev => ({ ...prev, [area]: true }));
      return true;
    }
    alert('Senha incorreta!');
    return false;
  };

  const revelarTotalDia = (senha: string) => {
    if (senha === 'suasenha') {
      setTotalDiaOculto(false);
      setTempoRestanteTotal(8); // 8 segundos visível
    } else {
      alert('Senha incorreta!');
    }
  };

  const toggleTema = () => setTemaEscuro(!temaEscuro);

  // --- CÁLCULOS DE RESUMO ---
  const totalComandasAbertas = comandas.filter(c => c.status === 'aberta').length;
  
  const calcularTotalDia = () => {
    const hoje = getChaveDia();
    const comandasFechadasHoje = comandas.filter(c => c.status === 'fechada' && c.dataFechamento?.startsWith(hoje));
    return comandasFechadasHoje.reduce((acc, c) => acc + c.total, 0);
  };

  const totalItensVendidosHoje = (() => {
    const hoje = getChaveDia();
    const comandasFechadasHoje = comandas.filter(c => c.status === 'fechada' && c.dataFechamento?.startsWith(hoje));
    let total = 0;
    comandasFechadasHoje.forEach(c => c.itens.forEach(i => total += i.quantidade));
    return total;
  })();

  return {
    // Dados
    produtos,
    clientes,
    comandas,
    historicoGestao,
    
    // Stats
    totalComandasAbertas,
    totalDia: calcularTotalDia(),
    totalItensVendidosHoje,
    
    // Estado UI
    temaEscuro,
    senhaDesbloqueada,
    totalDiaOculto,
    tempoRestanteTotal,

    // Ações
    toggleTema,
    verificarSenha,
    revelarTotalDia,
    
    // Comandas
    criarComanda,
    adicionarItem,
    removerItem,
    fecharComanda,
    
    // Produtos
    salvarProduto,
    excluirProduto,
    
    // Clientes
    salvarCliente,
    excluirCliente,
  };
}
