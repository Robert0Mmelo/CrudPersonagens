import axios from 'axios'
import '../../App.css'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import ICards from '../../Interfaces/ICards'
import { useNavigate } from 'react-router-dom'
import TelaModal from '../Modal/TelaModal'
import ModalDeletar from '../Modal/TelaModalDeletar'
import TelaModalDeletar from '../Modal/TelaModalDeletar'

function Cards() {

  const [cards,setCards] = useState<ICards[]>([])
  const [abrirModalEditar,setAbrirModalEditar] = useState(false)
  const [abrirModalDeletar,setAbrirModalDeletar] = useState(false)
  const [dadosCard,setDadosCard] = useState<ICards>()
  const navigate = useNavigate(); 

  function BuscarDados() {
    axios.get("http://localhost:3001/cards")
    .then(function (resposta) {
      setCards(resposta.data)
    })
  }

  function ConfirmarDeletar(id: any) {
    axios.delete(`http://localhost:3001/cards/${id}`)
    .then(() => {
      BuscarDados()
    })
  }


  function RedirecionamentoCadastro() {
    navigate("/cadastro")
  }

  function aparecerModalEditar () {
    setAbrirModalEditar(true)
  }

  function aparecerModalDeletar () {
    setAbrirModalDeletar(true)
  }

  
  function fecharModalEditar () {
    setAbrirModalEditar(false)
  }

  function fecharModalDeletar () {
    setAbrirModalDeletar(false)
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
    aparecerModalEditar()
  }

  

  useEffect(() => {
    BuscarDados()
  },[])

  return (
    <>
    <Row className='custom-row '>
    {cards.map ((card) => (
      <Col key={card.id} className="mb-4">
      <Card style={{ width: '18rem'}}>
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
          <Button  onClick={(event) => {event.preventDefault(); window.open(card.linkBotao, "_blank");}}>Ver mais</Button>
          <Button className='btn-danger' onClick={ () => {setDadosCard(card), aparecerModalDeletar()}}>Deletar</Button>
          </div>
          <Button variant="secondary" onClick={() => Editar(card.id,card.nome,card.imagem,card.texto,card.linkBotao)}>Editar</Button>
        </Card.Body>
      </Card>
    </Col>
    ))}
    <Button onClick={RedirecionamentoCadastro} className='btn-primary'>Cadastre um novo personagem</Button>
   </Row>

    <Modal show={abrirModalEditar} onHide={fecharModalEditar}><TelaModal dadosCard={dadosCard} fechar={fecharModalEditar} buscarDados={BuscarDados}/></Modal>
    <Modal show={abrirModalDeletar} onHide={fecharModalDeletar}><TelaModalDeletar dadosCard={dadosCard} fechar={fecharModalDeletar} funcaoDeletar={() =>ConfirmarDeletar(dadosCard?.id)}/></Modal>
    </>
  )
}

export default Cards