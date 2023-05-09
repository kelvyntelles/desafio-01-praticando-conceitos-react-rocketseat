import './index.css'
import './App.scss'

import { FormEvent, useState } from 'react'

import logo from './assets/logo.svg'
import { Card } from './components/Card'

export function App() {
  const [tarefas, setTarefas] = useState([
    {id: 1, titulo: 'teste 1', feito: false}
  ])

  const [idGenerator, setIdGenerator] = useState(4)

  const [tituloTarefa, setTituloTarefa] = useState('')

  const [tarefasConcluidas, setTarefasConcluidas] = useState(0)

  function deletarTarefa(idTarefa: number) {
    let novaListaTarefas = tarefas.filter(tarefas => tarefas.id !== idTarefa)
    setTarefas(novaListaTarefas)
  }

  function handleCriarNovaTarefa(event: FormEvent) {
    event.preventDefault()

    setTarefas([...tarefas, {id: idGenerator, titulo: tituloTarefa, feito: false}])
    setTituloTarefa('')
    setIdGenerator(idGenerator + 1)
  }

  function handleMarcarTarefa(id: number) {
    const marcarTarefa = tarefas.map((tarefa) => {
      if(tarefa.id === id){
        if(tarefa.feito === false) {
          let novoValor = tarefasConcluidas + 1
          setTarefasConcluidas(novoValor)
          return {...tarefa, feito: !tarefa.feito}
        } else {
          let novoValor = tarefasConcluidas - 1
          setTarefasConcluidas(novoValor)
          return {...tarefa, feito: !tarefa.feito}
        }
      } 

      return tarefa;
    })

    setTarefas(marcarTarefa);
  }

  return (
    <>
      <header>
        <img src={logo} alt="logotipo do todo" />
        <a className='azulClaro'>to</a><a className='azulEscuro'>do</a>
      </header>
      <div className='areaAddTarefa'>
        <form onSubmit={handleCriarNovaTarefa}>
          <input 
            placeholder='Adicione uma nova tarefa' 
            value={tituloTarefa}
            onChange={(e) => setTituloTarefa(e.target.value)}
            required
          />
          <button>Criar</button>
        </form>
      </div>
      <div className='conteudo'>
        <div className='dashboard'>
          <h5 className='criadas'>Tarefas criadas <a>{tarefas.length}</a></h5>
          <h5 className='concluidas'>
            Concluídas 
            {
              tarefas.length < 1 ?
              <a>0</a> 
              : 
              <a>{tarefasConcluidas} de {tarefas.length}</a>
            } 
          </h5>
        </div>
        
        {tarefas.length == 0 ?
          <div className='zeroTarefas'>
            <strong>Você ainda não tem tarefas cadastradas</strong> 
            <br />
            Crie tarefas e organize seus itens a fazer
          </div>
          :
          <div></div>
        }
        {tarefas.map(tarefa => {
          return (
            <Card 
              key={tarefa.id} 
              titulo={tarefa.titulo} 
              feito={tarefa.feito}
              marcarTarefa={() => handleMarcarTarefa(tarefa.id)}
              deletar={() => deletarTarefa(tarefa.id)} 
            />
          )
        })}
      </div>
    </>
  )
}
