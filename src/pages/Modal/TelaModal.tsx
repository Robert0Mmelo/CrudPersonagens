import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import ICards from '../../Interfaces/ICards';
import axios from 'axios';
interface Props {
  fechar: () => void
  dadosCard: ICards | undefined
  buscarDados: () => void
}

const TelaModal = ({ fechar, dadosCard, buscarDados }: Props) => {

  const [nome, setNome] = useState("")
  const [texto, setTexto] = useState("")
  const [imagem, setImagem] = useState("")
  const [linkBotao, setLinkBotao] = useState("")

  console.log(dadosCard);

  useEffect(() => {
    if (dadosCard) {
      setNome(dadosCard.nome)
      setImagem(dadosCard.imagem)
      setTexto(dadosCard.texto)
      setLinkBotao(dadosCard.linkBotao)
    }
  }, [dadosCard])

  function atualizarDados() {
    axios.put(`http://localhost:3001/cards/${dadosCard?.id}`,{nome: nome, texto: texto, imagem: imagem, linkBotao: linkBotao})
      .then(
        () => {
          buscarDados(),
        fechar()
        }
      )
  }



  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Editar Personagem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Nome do personagem</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome..."
            className="form-control-lg shadow-sm border rounded-3"
            style={{ width: '100%', padding: '10px' }}
            value={nome}
            onChange={evento => setNome(evento.target.value)}
          />
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite uma descrição..."
            className="form-control-lg shadow-sm border rounded-3"
            style={{ width: '100%', padding: '10px' }}
            value={texto}
            onChange={evento => setTexto(evento.target.value)}
          />
          <Form.Label>Link da imagem</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o link da imagem..."
            className="form-control-lg shadow-sm border rounded-3"
            style={{ width: '100%', padding: '10px' }}
            value={imagem}
            onChange={evento => setImagem(evento.target.value)}
          />
          <Form.Label>Artigo do personagem</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o link do artigo do personagem..."
            className="form-control-lg shadow-sm border rounded-3"
            style={{ width: '100%', padding: '10px' }}
            value={linkBotao}
            onChange={evento => setLinkBotao(evento.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={fechar}>
          Fechar
        </Button>
        <Button variant="primary" onClick={() => atualizarDados()}>
          Salvar alterações
        </Button>
      </Modal.Footer>
    </>
  );
};

export default TelaModal;
