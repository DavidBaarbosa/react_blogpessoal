import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthContext';
import type Tema from '../../../models/Tema';
import { buscar, deletar } from '../../../services/Service';

function DeletarTema() {

const navigate = useNavigate()

const [tema, setTema] = useState<Tema>({} as Tema)

const [isLoading, setIsLoading] = useState<boolean>(false)

const { usuario, handleLogout } = useContext(AuthContext)
const token = usuario.token

const { id } = useParams<{ id: string }>()

async function buscarPorId(id: string) {
  try {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        'Authorization': token
      }
    })
  } catch (error: any) {
    if (error.toString().includes('401')) {
      handleLogout()
    }
  }
}

useEffect(() => {
  if (token === '') {
    alert('Você precisa estar logado')
    navigate('/')
  }
}, [token])

useEffect(() => {
  if (id !== undefined) {
    buscarPorId(id)
  }
}, [id])

async function deletarTema() {
  setIsLoading(true)

  try {
    await deletar(`/temas/${id}`, {
      headers: {
        'Authorization': token
      }
    })

    alert('Tema deletado com sucesso')

  } catch (error: any) {
    if (error.toString().includes('401')) {
      handleLogout()
    } else {
      alert('Erro ao deletar o tema.')
    }
  }

  setIsLoading(false)
  retornar()
}

function retornar() {
  navigate("/temas")
}


  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-5xl font-bold text-stone-800'>Deletar tema</h1>
      <p className='text-lg font-semibold'>
        Você tem certeza de que deseja apagar o tema a seguir?</p>
      <div className="border-2 rounded-xl overflow-auto w-1/3">
        <header
        className="bg-stone-900 text-white text-xl font-bold px-4 py-2">
          Tema
          </header>
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
  );
}

export default DeletarTema;