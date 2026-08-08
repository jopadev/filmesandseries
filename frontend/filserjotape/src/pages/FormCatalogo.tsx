import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import './FormCatalogo.css';

const itemInicial = {
  titulo: "",
  tipo: "Filme",
  genero: "",
  imagemUrl: "",
  dataLancamento: "",
  duracao: "",
  jaAssistiu: false
};

export default function FormCatalogo() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [form, setForm] = useState(itemInicial);
  const [carregando, setCarregando] = useState(false);
  const [touched, setTouched] = useState({});
  const modoEdicao = Boolean(id);

  useEffect(() => {
    if (modoEdicao) {
      const carregarItem = async () => {
        try {
          setCarregando(true);
          const response = await api.get(`/catalogos/${id}`);
          const dados = response.data;
          if (dados.dataLancamento && dados.dataLancamento.includes("T")) {
            dados.dataLancamento = dados.dataLancamento.split("T")[0];
          }
          setForm(dados);
        } catch (error) {
          console.log("Erro ao buscar dados do item:" + error);
          alert("Não foi possível carregar as informações para edição.");
          navigate('/');
        } finally {
          setCarregando(false);
        }
      };
      carregarItem();
    }
  }, [id, modoEdicao, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const campoInvalido = (nomeCampo) => {
    return touched[nomeCampo] && !form[nomeCampo];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todosCampos = { titulo: true, genero: true, dataLancamento: true };
    setTouched(todosCampos);
    
    if (!form.titulo || !form.genero || !form.dataLancamento) {
      return;
    }

    // const payload = {
    //   ...form,
    //   duracao: form.duracao ? Number(form.duracao) : null
    // };

    const payload = {
      ...form,
    };

    try {
      setCarregando(true);
      if (modoEdicao) {
        await api.put(`/catalogos/${id}`, payload);
        alert("Item atualizado com sucesso!");
      } else {
        await api.post('/catalogos', payload);
        alert("Item cadastrado com sucesso!");
      }
      navigate('/');
    } catch (error) {
      console.error("Erro ao salvar o item:", error);
      alert("Ocorreu um erro ao salvar o registro.");
    } finally {
      setCarregando(false);
    }
  };

  if (carregando && modoEdicao) {
    return <div className="loading-container-dark">Carregando dados do catálogo...</div>;
  }

  return (
    <div className="form-container-dark animate-fade-in">
      <header className="form-header-dark">
        <h1>{modoEdicao ? "Editar" : "Cadastrar"} <span>Item do Catálogo</span></h1>
        <p>{modoEdicao ? "Atualize as informações do seu título favorito" : "Adicione um novo filme ou série à sua lista"}</p>
      </header>

      <div className="form-layout-wrapper-dark">
        
        <form onSubmit={handleSubmit} className="catalogo-form-dark">
          {/* TÍTULO */}
          <div className="form-group-dark">
            <label className="form-label-dark">Título *</label>
            <input
              type="text"
              name="titulo"
              className={`form-input-dark ${campoInvalido('titulo') ? 'is-invalid-dark' : ''}`}
              placeholder="Ex: Breaking Bad, Inception..."
              value={form.titulo}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {campoInvalido('titulo') && <span className="error-message-dark">O título é obrigatório.</span>}
          </div>

          {/* TIPO */}
          <div className="form-group-dark">
            <label className="form-label-dark">Tipo *</label>
            <select
              name="tipo"
              className="form-input-dark"
              value={form.tipo}
              onChange={handleChange}
            >
              <option value="Filme">Filme</option>
              <option value="Série">Série</option>
            </select>
          </div>

          {/* GÊNERO */}
          <div className="form-group-dark">
            <label className="form-label-dark">Gênero *</label>
            <input
              type="text"
              name="genero"
              className={`form-input-dark ${campoInvalido('genero') ? 'is-invalid-dark' : ''}`}
              placeholder="Ex: Drama, Ação, Sci-Fi..."
              value={form.genero}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {campoInvalido('genero') && <span className="error-message-dark">O gênero é obrigatório.</span>}
          </div>

          {/* URL DA IMAGEM */}
          <div className="form-group-dark">
            <label className="form-label-dark">URL da Imagem da Capa</label>
            <input
              type="url"
              name="imagemUrl"
              className="form-input-dark"
              placeholder="https://exemplo.com"
              value={form.imagemUrl}
              onChange={handleChange}
            />
          </div>

          {/* DATA E DURAÇÃO */}
          <div className="form-row-dark">
            <div className="form-group-dark col-dark">
              <label className="form-label-dark">Data de Lançamento *</label>
              <input
                type="date"
                name="dataLancamento"
                className={`form-input-dark ${campoInvalido('dataLancamento') ? 'is-invalid-dark' : ''}`}
                value={form.dataLancamento}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {campoInvalido('dataLancamento') && <span className="error-message-dark">Selecione uma data.</span>}
            </div>

            <div className="form-group-dark col-dark">
              <label className="form-label-dark">Duração ({form.tipo === 'Filme' ? 'minutos' : 'temporadas'})</label>
              <input
                type="text"
                name="duracao"
                className="form-input-dark"
                placeholder={form.tipo === 'Filme' ? 'Ex: 2h31m' : '5 Temporadas'}
                value={form.duracao || ""}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>

          {/* CHECKBOX */}
          <div className="form-group-dark checkbox-group-dark">
            <label className="checkbox-label-dark">
              <input
                type="checkbox"
                name="jaAssistiu"
                checked={form.jaAssistiu}
                onChange={handleChange}
              />
              <span className="checkbox-custom-text-dark">Já assisti a este título</span>
            </label>
          </div>

          {/* BOTÕES */}
          <div className="form-actions-dark">
            <button 
              type="button" 
              className="btn-cancelar-dark" 
              onClick={() => navigate('/')}
              disabled={carregando}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-salvar-dark" 
              disabled={carregando}
            >
              {carregando ? "Salvando..." : modoEdicao ? "Atualizar" : "Cadastrar"}
            </button>
          </div>
        </form>

        {/* PAINEL DE PREVISÃO AO VIVO (LIVE PREVIEW) */}
        <div className="preview-container-dark">
          <p className="preview-title-dark">Pré-visualização da Capa</p>
          <div className="live-card-dark">
            <div className="live-capa-wrapper-dark">
              {form.imagemUrl ? (
                <img 
                  src={form.imagemUrl} 
                  alt="Preview" 
                  onError={(e) => { 
                    e.target.src = 'https://placehold.co'; 
                  }} 
                />
              ) : (
                <div className="preview-placeholder-dark">
                  <span>Sem Imagem</span>
                </div>
              )}
              <span className={`live-badge-dark ${form.tipo === 'Filme' ? 'badge-filme-dark' : 'badge-serie-dark'}`}>
                {form.tipo}
              </span>
            </div>
            <div className="live-info-dark">
              <h3>{form.titulo || "Título do Filme / Série"}</h3>
              <p className="live-genero-dark">{form.genero || "Gênero do título"}</p>
              {form.jaAssistiu && <span className="assistido-tag-dark">✓ Já assistido</span>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
