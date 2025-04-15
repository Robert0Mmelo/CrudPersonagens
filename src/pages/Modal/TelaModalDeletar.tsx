import { Button, Modal } from 'react-bootstrap'
import ICards from '../../Interfaces/ICards';

interface props {
 
        fechar: () => void;
        funcaoDeletar: () => void;
        dadosCard: ICards | undefined
}

const TelaModalDeletar = ({fechar,funcaoDeletar,dadosCard} : props) => {
    return (
       <>
          <Modal.Header closeButton>
            <Modal.Title>Deletar {dadosCard ? `"${dadosCard.nome}"` : 'Item'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tem certeza que deseja deletar {dadosCard ? `"${dadosCard.nome}"` : 'este item'}? Essa ação não poderá ser desfeita.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={fechar}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => {funcaoDeletar(),fechar()}}>
              Deletar
            </Button>
          </Modal.Footer>
          </>
      );
}

export default TelaModalDeletar