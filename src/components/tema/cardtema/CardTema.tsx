import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
  tema: Tema
}

function CardTema({tema}: CardTemaProps) {  
  return (
    <div className="border-2 rounded-xl overflow-auto">
      <header className="bg-stone-900 text-white text-xl font-bold px-4 py-2">
        Tema
      </header>
      <p className="bg-slate-200 px-4 py-6 text-lg font-semibold">{tema.descricao}</p>
      
      <div className="flex">
        <Link to={`/editartema/${tema.id}`} 
            className="flex-1 px-4 py-2 font-bold text-white bg-stone-600 hover:bg-stone-800 text-center">
          <button>Editar</button>
        </Link>

        <Link to={`/deletartema/${tema.id}`} 
        className="flex-1 px-4 py-2 font-bold text-white bg-red-400 hover:bg-red-800 text-center">
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardTema;