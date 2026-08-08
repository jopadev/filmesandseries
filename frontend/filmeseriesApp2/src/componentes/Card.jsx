import '.\Card.css';

 function Card({ titulo, linkImagem, genero, anoLancamento })
 {
    return (
        <div className="card">
                <div className="card-title">
                    <h3>{titulo}</h3>
                </div>
                <div className="card-body">
                    <img src={linkImagem} alt={titulo}/>
                </div>
                <div className="card-footer">
                    <span className="genero">
                        {genero}
                    </span>
                    <span className="ano">
                        {anoLancamento}
                    </span>
                </div>
            </div>
    );
 }

 export default Card;