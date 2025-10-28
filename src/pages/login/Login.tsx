import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";


function Login() {

  const navigate = useNavigate();

  const {usuario, handleLogin, isLoading} = useContext(AuthContext)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin)

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
          <h2 className="text-slate-900 text-5xl">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button
            type="submit"
            className="rounded bg-stone-600 flex justify-center hover:bg-stone-900 text-white w-1/2 py-2 cursor-pointer"
          >
            {isLoading ? 
                <ClipLoader 
                    color="#fff" 
                    size={24} 
                    /> : 
                    <span>Entrar</span>
                }
          </button>
          <hr className="border-slate-800 w-full" />

          <p>Ainda não tem uma conta? <Link to='/cadastro' >Cadastre-se</Link></p>
        </form>
        <div className="hidden lg:block bg-no-repeat w-full min-h-screen bg-contain bg-right bg-[url('https://ik.imagekit.io/rdhursqzd/padrao-de-boas-vindas-em-diferentes-idiomas_23-2147869891.jpg?updatedAt=1761694330242')]"></div>
      </div>
    </>
  );
}

export default Login;