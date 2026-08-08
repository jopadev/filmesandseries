import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './ListaCatalogo.css';

export default function ListaCatalogo() {
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  
  // Estados para os filtros
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  const buscarCatalogo = async () => {
    try {
      setCarregando(true);
      const response = await api.get('/catalogos');
      setItens(response.data);
    } catch (error) {
      console.error("Erro ao carregar o catálogo:", error);
      alert("Não foi possível carregar os itens do catálogo.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarCatalogo();
  }, []);

  const handleExcluir = async (id, titulo) => {
    const confirmou = window.confirm(`Tem certeza que deseja excluir "${titulo}" do catálogo?`);
    if (!confirmou) return;

    try {
      await api.delete(`/catalogos/${id}`);
      setItens(prevItens => prevItens.filter(item => item.itemCatalogoId !== id));
      alert("Item excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
      alert("Ocorreu um erro ao tentar excluir o item.");
    }
  };

  // LÓGICA DE FILTRAGEM COMBINADA (Texto + Categoria)
  const itensFiltrados = itens.filter(item => {
    const termo = termoBusca.toLowerCase();
    
    const bateTexto = 
      (item.titulo?.toLowerCase().includes(termo) || false) || 
      (item.genero?.toLowerCase().includes(termo) || false);
    
    const bateCategoria = 
      categoriaSelecionada === "Todos" || 
      item.tipo?.toLowerCase() === categoriaSelecionada.toLowerCase();

    return bateTexto && bateCategoria;
  });

  return (
    <>
      <header className="dark-header">
        <h1>Melhores <span>Filmes & Séries</span></h1>
        <p>Minha lista favorita de filmes e séries</p>
      </header>

      <section className="filtros-container">
        <div className="busca-wrapper">
          <input 
            type="text" 
            className="input-busca" 
            placeholder="Buscar por título ou gênero..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>

        <div className="radio-group">
          {["Todos", "Filme", "Série"].map((cat) => (
            <label className="radio-label" key={cat}>
              <input 
                type="radio" 
                name="categoria" 
                value={cat} 
                checked={categoriaSelecionada === cat}
                onChange={() => setCategoriaSelecionada(cat)} 
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
        <button className="btn-novo" onClick={() => navigate('/novo')}>+ Novo</button>
      </section>

      <main className={itensFiltrados.length > 0 ? "catalogo-container" : "catalogo-container-nao-encontrado"}>   
        {/* SKELETON LOADER */}
        {carregando && (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeleton-item filme-card">
              <div className="skeleton-image capa-container" />
              <div className="filme-info">
                <div className="info-topo">
                  <div className="skeleton-text short-badge" />
                  <div className="skeleton-text badge-placeholder" />
                </div>
                <div className="skeleton-title" />
                <div className="filme-footer">
                  <div className="skeleton-text date-placeholder" />
                  <div className="skeleton-text duration-placeholder" />
                </div>
              </div>
            </div>
          ))
        )}

        {/* NENHUM ITEM ENCONTRADO NOS FILTROS */}
        {!carregando && itensFiltrados.length === 0 && itens.length > 0 && (
          <p className="text-gray-500 text-center col-span-full py-10">
            Nenhum resultado encontrado para os filtros selecionados.
          </p>
        )}

        {/* BANCO TOTALMENTE VAZIO */}
        {!carregando && itens.length === 0 && (
          <p className="text-gray-500 text-center col-span-full py-10">
            Nenhum item cadastrado no catálogo ainda.
          </p>
        )}

        {/* LISTAGEM DOS CARDS FILTRADOS */}
        {!carregando && itensFiltrados.map((item) => (
          <div className="filme-card" data-tipo={item.tipo} key={item.itemCatalogoId}>
            <div className="capa-container">
              <img src={item.imagemUrl || 'https://placehold.co'} alt={item.titulo} />
              
              {/* MODIFICAÇÃO: Botão posicionado no topo da capa, isolado do hover central */}
              <button 
                className="btn-excluir-topo" 
                onClick={() => handleExcluir(item.itemCatalogoId, item.titulo)}
                title="Excluir item"
              >
                &times;
              </button>

              <div className="hover-info">
                <button className="btn-detalhes" onClick={() => navigate(`/editar/${item.itemCatalogoId}`)}>
                  Ver Agora
                </button>
              </div>
            </div>
            <div className="filme-info">
              <div className="info-topo">
                <span className="genero">{item.genero}</span>
                <span className={`badge badge-${item.tipo === "Filme" ? "filme" : "serie"}`}>{item.tipo}</span>
              </div>
              <h3>{item.titulo}</h3>
              <div className="filme-footer">
                <span className="ano">{item.dataLancamento ? item.dataLancamento.split("-")[0] : 'N/A'}</span>
                <span className="duracao">{item.duracao}</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
