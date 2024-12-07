import { GoogleMap } from "../cmps/GoogleMap";

export function AboutUs() {
    return (
        <section style={{ marginInline: '50px' }}>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <h2>Branches:</h2>
            <GoogleMap/>
        </section>
    )
}
