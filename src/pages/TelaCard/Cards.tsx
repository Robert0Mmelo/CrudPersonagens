import axios from 'axios'
import '../../App.css'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import ICards from '../../Interfaces/ICards'
import { useNavigate } from 'react-router-dom'
import TelaModal from '../Modal/TelaModal'

function Cards() {

  const [cards,setCards] = useState<ICards[]>([])
  const [abrirModal,setAbrirModal] = useState(false)
  const [dadosCard,setDadosCard] = useState<ICards>()
  const navigate = useNavigate(); 

  function BuscarDados() {
    axios.get("http://localhost:3001/cards")
    .then(function (resposta) {
      setCards(resposta.data)
    })
  }

  function Deletar(id: any) {
    axios.delete(`http://localhost:3001/cards/${id}`)
    .then(() => {
      BuscarDados()
    })
  }

  function RedirecionamentoCadastro() {
    navigate("/cadastro")
  }

  function aparecerModal () {
    setAbrirModal(true)
  }

  
  function fecharModal () {
    setAbrirModal(false)
  }

  function Editar (id:string,nome:string,imagem:string,texto:string,linkBotao:string) {
    const cardParaAtualizar : ICards = {
      id : id,
      nome: nome,
      imagem: imagem,
      texto: texto,
      linkBotao: linkBotao
    }
    setDadosCard(cardParaAtualizar)
    aparecerModal()
  }

  useEffect(() => {
    BuscarDados()
  },[])

  return (
    <>
    <Row className='custom-row'>
    {cards.map ((card, index) => (
      <Col key={index}>
      <Card style={{ width: '18rem' }}>
        <Card.Img 
          variant="top" 
          src={card.imagem} 
          style={{ 
            height: '200px', 
            objectFit: 'cover', 
            borderRadius: '50%'
          }} 
        />
        <Card.Body>
          <Card.Title>{card.nome}</Card.Title>
          <Card.Text>{card.texto}</Card.Text>
          <div className='botoes'>
          <Button variant="primary" onClick={(event) => {event.preventDefault(); window.open(card.linkBotao, "_blank");}}>Ver mais</Button>
          <Button className='btn-danger' onClick={() => Deletar(card.id)}>Deletar</Button>
          </div>
          <Button onClick={() => Editar(card.id,card.nome,card.imagem,card.texto,card.linkBotao)}>Editar</Button>
        </Card.Body>
      </Card>
    </Col>
    ))}
    <Button onClick={RedirecionamentoCadastro} className='btn-primary'>Cadastre um novo personagem</Button>
   </Row>

    <Modal show={abrirModal} onHide={fecharModal}><TelaModal dadosCard={dadosCard} fechar={fecharModal} buscarDados={BuscarDados}/></Modal>
    </>
  )
}

export default Cards