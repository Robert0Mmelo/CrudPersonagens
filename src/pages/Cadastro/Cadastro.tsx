import axios from "axios"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"



const Cadastro = () => {

 const [nome,setNome] = useState("")
const [texto,setTexto] = useState("")
const [imagem,setImagem] = useState("")
const [linkBotao,setLinkBotao] = useState("")
const navigate = useNavigate(); 

function submit() {
    if (nome !== "" || texto !== "" || imagem !== "" || linkBotao !== "") {
    axios.post("http://localhost:3001/cards",{nome: nome, texto: texto, imagem: imagem, linkBotao: linkBotao}).then(() => {
        alert("Personagem cadastrado com sucesso")
        navigate("/")
    })} else{
        alert("Não é possivel enviar o cadastro com campos vazios")
    }
}
    return (
            <Form className="container mt-4">
                <h1 className="mb-4 text-center">Cadastre seu personagem</h1>
                
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
                </Form.Group>
    
                <Form.Group className="mb-3">
                    <Form.Label>Descrição do personagem</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Digite a descrição..." 
                        className="form-control-lg shadow-sm border rounded-3" 
                        style={{ width: '100%', padding: '10px' }} 
                        value={texto}
                        onChange={evento => setTexto(evento.target.value)}
                    />
                </Form.Group>
    
                <Form.Group className="mb-3">
                    <Form.Label>Link da imagem do personagem</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Digite o link..." 
                        className="form-control-lg shadow-sm border rounded-3" 
                        style={{ width: '100%', padding: '10px' }}
                        value={imagem}
                        onChange={evento => setImagem(evento.target.value)} 
                    />
                </Form.Group>
    
                <Form.Group className="mb-3">
                    <Form.Label>Link para artigo do personagem</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Digite o link..." 
                        className="form-control-lg shadow-sm border rounded-3" 
                        style={{ width: '100%', padding: '10px' }} 
                        value={linkBotao}
                        onChange={evento => setLinkBotao(evento.target.value)}
                    />
                </Form.Group>
    
                <Button variant="primary" type="submit" className="w-100 mt-4 shadow-sm rounded-3" onClick={submit}>
                    Cadastrar Personagem
                </Button>
                <Button variant="primary" type="submit" className="w-100 mt-4 shadow-sm rounded-3" onClick={() => navigate("/")}>
                    Ver personagens já criados
                </Button>
            </Form>
    )
}

export default Cadastro