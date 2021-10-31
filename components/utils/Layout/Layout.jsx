import MainNavigation from '../MainNavigation/MainNavigation'
import classes from './Layout.module.css'

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
            <footer className={classes.footer}>
                <p>
                    Copyright &copy; 2021 |{' '}
                    <a
                        href="http://shubhamm.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        VeNoM
                    </a>
                </p>
            </footer>
        </div>
    )
}

export default Layout
