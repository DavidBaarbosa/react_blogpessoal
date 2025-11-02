import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthContext';
import type Tema from '../../../models/Tema';
import { buscar } from '../../../services/Service';
import CardTema from '../cardtema/CardTema';

function ListaTemas() {

  const navigate = useNavigate();
    
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [temas, setTemas] = useState<Tema[]>([])
  
  // desestruturação de objeto
  const {usuario, handleLogout} = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    // voltar o usuario pra tela de login
    if (token === '') {
      alert('Você precisa estar logado!')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    buscarTemas()
  }, [temas.length])

  async function buscarTemas() {
    try {
      setIsLoading(true)
      // essa linha aqui ta fazendo tal coisa
      await buscar('/temas', setTemas, {
        headers: {Authorization: token}
      })
    } catch (error: any) {
      if(error.toString().includes('401')) {
        alert('Sessão expirada')
        handleLogout()
      }
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }
 
  return (
    <>
    <h2 className='text-center font-bold text-3xl'>Lista de temas</h2>
    {isLoading && (
      <div className='flex justify-center my-8'>
        <SyncLoader 
            color='#131515'
            size={32} 
            />
            </div>
    )}

    {(!isLoading && temas.length === 0) && (
      <span className='text-3xl text-center my-8'>
        Nenhum tema encontrado!
        </span>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 container mx-auto">
      {temas.map(tema => (
        <CardTema key={tema.id} tema={tema} />
      ))}
    </div>
    </>
  );
}

export default ListaTemas;