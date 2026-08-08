 import  "./src/App.css";
   
export default function Layout(){
    return (
<>
    <header class="dark-header">
        <h1>Dark<span>Cinema</span></h1>
        <p>Explore o lado sombrio da sétima arte</p>
    </header>


    <section class="filtros-container">
        <div class="busca-wrapper">
            <input type="text" class="input-busca" placeholder="Buscar por título ou gênero..."/>
        </div>

        <div class="radio-group">
            <label class="radio-label">
                <input type="radio" name="categoria" value="todos" checked/>
                <span>Todos</span>
            </label>
            <label class="radio-label">
                <input type="radio" name="categoria" value="filmes"/>
                <span>Filmes</span>
            </label>
            <label class="radio-label">
                <input type="radio" name="categoria" value="series"/>
                <span>Séries</span>
            </label>
        </div>

        <button class="btn-novo">+ Novo</button>
    </section>


    <main class="catalogo-container">

        <div class="filme-card" data-tipo="filme">
            <div class="capa-container">
                <img src="https://unsplash.com" alt="Blade Runner"/>
                <div class="hover-info">
                    <button class="btn-detalhes">Ver Agora</button>
                </div>
            </div>
            <div class="filme-info">
                <h3>Blade Runner</h3>
                <span class="genero">Cyberpunk / Sci-Fi</span>
            </div>
        </div>

  
        <div class="filme-card" data-tipo="serie">
            <div class="capa-container">
                <img src="https://unsplash.com" alt="O Labirinto"/>
                <div class="hover-info">
                    <button class="btn-detalhes">Ver Agora</button>
                </div>
            </div>
            <div class="filme-info">
                <h3>O Labirinto</h3>
                <span class="genero">Série • Mistério</span>
            </div>
        </div>

        <div class="filme-card" data-tipo="filme">
            <div class="capa-container">
                <img src="https://unsplash.com" alt="Noite Eterna"/>
                <div class="hover-info">
                    <button class="btn-detalhes">Ver Agora</button>
                </div>
            </div>
            <div class="filme-info">
                <h3>Noite Eterna</h3>
                <span class="genero">Terror / Sobrenatural</span>
            </div>
        </div>


        <div class="filme-card" data-tipo="serie">
            <div class="capa-container">
                <img src="https://unsplash.com" alt="Subterrâneo"/>
                <div class="hover-info">
                    <button class="btn-detalhes">Ver Agora</button>
                </div>
            </div>
            <div class="filme-info">
                <h3>Subterrâneo</h3>
                <span class="genero">Série • Distopia</span>
            </div>
        </div>
    </main>
    </>
    );
    }