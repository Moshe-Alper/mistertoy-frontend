import logo from '../assets/img/logo.jpg'

export function HomePage() {
    return (
        <section className="home-page">
            <h2 className="heading">Welcome to Mister-Toy</h2>
            <img src={logo} />
        </section >
    )
}