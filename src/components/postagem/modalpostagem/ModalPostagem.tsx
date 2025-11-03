import Popup from 'reactjs-popup';
import FormPostagem from '../formpostagem/FormPostagem';
import 'reactjs-popup/dist/index.css'

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
            Nova postagem
          </button>
        }
        modal
        contentStyle={{
          borderRadius: '1rem',
          paddingBottom: '2rem',
        }}
      >
        <FormPostagem />
      </Popup>
    </>
  );
}

export default ModalPostagem;