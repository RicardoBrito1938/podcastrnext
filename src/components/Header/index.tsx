import styles from './styles.module.scss'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

export const Header = () => {
    const currentDate = format(new Date(), 'EEEEEE, d MMM', {
        locale: ptBR
    })


    return (
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="logo"/>

            <p>O melhor para você, sempre</p>

            <span>{currentDate}</span>
        </header>
    )
}
