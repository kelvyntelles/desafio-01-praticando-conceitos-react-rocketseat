import { Trash } from 'phosphor-react'
import './Card.scss'

interface Props {
    titulo: string;
    feito: boolean
    deletar: () => void
    marcarTarefa: () => void
}

export function Card({titulo, marcarTarefa, deletar, feito}: Props) {
    return (
        <div className='card'>
            <button className={feito ? 'doneTrue' : 'doneFalse'} onClick={marcarTarefa}></button>
            {titulo}
            <button className='deletar' onClick={deletar}>
                <Trash size={24} />
            </button>
        </div>
    )
}