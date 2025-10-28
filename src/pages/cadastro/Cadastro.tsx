import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import { CircleLoader } from 'react-spinners';

function Cadastro() {
  // lógica do cadastro vem depois da function e antes do return

  // colocando na constante uma função do ReactRouterDom que faz a navegação do usuário para algum lugar, sem precisar clicar em algum link
  const navigate = useNavigate();

  // criação do estado que vai gerenciar se o loading do botão aparece ou não
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // criação do estado que ira armazenar o valor do campo "confirmar senha"
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  // criação do estado que irá gerenciar os dados que o usuário vai digitar no formulário
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  // efeito automático que irá direcionar o usuário para a tela de login quando o ID for diferente de zero, ou seja, quando conseguir cadastrar no backend e ele devolver um json com ID preenchido pro front, esse UseEffect fica olhando modificações no estado do Usuario para conseguir direcionar a navegação
  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  // criação da função que navega realmente a pessoa para a tela de login
  function retornar() {
    navigate('/login');
  }

  // função responsavel por "entender" quando um campo do formulário é modificado, e preencher isso no estado do Usuario em tempo real
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      // ...usuario => mantem o que já tinha no estado
      ...usuario,
      // pega o campo que está sendo usado, e preenche com o valor digitado na tela
      [e.target.name]: e.target.value,
    });
  }

  // função que vai entender quando o usuário preenche o campo de atualizar senha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  // função que realmente envia o cadastro para o backend
  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    // prevenir que o envio do formulário gere uma atualização de página
    e.preventDefault();

    // if para validar as informações básicas da senha, se alguma dessas validações for falsa, nem envia para o backend.. já da direto o alerta, e apaga os campos de senha e confirmar senha
    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      // mudar o estado do loader, pra fazer o botão ficar com o loading aparecendo
      setIsLoading(true);

      // tenta enviar a requisição para o backend
      try {
        // utiliza o axios, criado lá no arquivo service, para enviar uma requisição para o backend, de cadastro de usuário
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);
        // se cadastrar, da um alerta de cadastro com sucesso
        alert('Usuário cadastrado, bem-vindo!');
      } catch (error) {
        // se der qlquer erro na tentativa de cadastro acima, exibe esse alerta de Erro no servidor
        alert('Erro ao cadastar o usuário, tente novamente!');
        console.log(error);
      }
    } else {
      // esse aqui é o ELSE da validação de senha, lá da linha 60
      alert('Senha incorreta!');
      setUsuario({ ...usuario, senha: '' });
      setConfirmarSenha('');
    }

    // dando certo ou não o cadastro, tira o loader do botão de cadastrar, e volta ele pro normal (o usuário só vai ver isso acontecer, se der erro, pq se o cadastro der certo, ele vai direto pra tela de login)
    setIsLoading(false);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="hidden lg:block bg-no-repeat bg-contain bg-left min-h-screen w-full bg-[url('https://ik.imagekit.io/rdhursqzd/padrao-de-boas-vindas-em-diferentes-idiomas_23-2147869891.jpg?updatedAt=1761694330242')]"></div>

        <form
          className="flex justify-center items-center flex-col w-2/3 gap-3"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-5xl text-slate-900">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome completo"
              className="border-2 border-slate-700 rounded p-2"
              // cada um dos inputs precisam receber um campo "value", para que o react possa entender o que está sendo digitado nele, e esse value está vinculado com alguma variavel, nesse caso, com o campo nome do estado Usuario, criado la em cima no useState
              value={usuario.nome}
              // quando ouverem modificações no campo (onChange), tratar isso como um evento, e atualizar o estado de Usuario
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              name="usuario"
              id="usuario"
              placeholder="Seu melhor e-mail"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              name="foto"
              id="foto"
              placeholder="URL da foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha (minimo 8 caracteres)"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              type="reset"
              className="rounded text-white bg-red-600 hover:bg-red-800 w-1/2 py-2"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded text-white bg-stone-600 hover:bg-stone-800 w-1/2 py-2 flex justify-center" 
            >
              {/* renderização condicional aqui, dependendo do estado do isLoading, o conteudo do botão é um loader (estado em true), ou o texto "cadastrar" (estado em false) */}
              {isLoading ? (
                <CircleLoader
                  color='#FFFFFF'
                  size={24}

                />
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;