import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type Tema from '../../../models/Tema';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar, deletar } from '../../../services/Service';

function DeletarTema() {

  // const [tema, setTema] = useState<Tema>({} as Tema)
  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: ''
  })

  const navigate = useNavigate()

  const {id} = useParams<{id: string}>()

  const {usuario} = useContext(AuthContext)

  // dar um get por ID no backend
  async function getTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {Authorization: usuario.token}
      })
    } catch(error) {
      alert('deu ruim')
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      getTemaPorId(id)
    }
  }, [id])

  // deletar o tema, se o usuario confirmar
  async function deletarTema() {
    try {
      await deletar(`/temas/${id}`, {
        headers: {Authorization: usuario.token}
      })
      alert('Press F for the tema')
      navigate('/temas')
    } catch (error) {
      alert('Foi não...')
    }
  }

  function retornar(){
    navigate('/temas')
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-5xl font-bold text-stone-800'>Deletar tema</h1>
      <p className='text-lg font-semibold'>Tem certeza de que deseja sumir de vez com isso?</p>
      <div className="border-2 rounded-xl overflow-auto w-1/3">
        <div className="bg-stone-900 text-white text-xl font-bold px-4 py-2">
          Titulo
        </div>
        <div className="bg-slate-200 px-4 py-6 text-lg font-semibold">{tema.descricao}</div>
        <div className="flex">
          <button
            onClick={deletarTema}
            className="flex-1 px-4 py-2 font-bold text-white bg-stone-600 hover:bg-stone-800 text-center"
          >
            Sim
          </button>
          <button onClick={retornar} className="flex-1 px-4 py-2 font-bold text-white bg-red-400 hover:bg-red-800">
            Não
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;