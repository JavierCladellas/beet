import ClientsGrid from "./ClientsGrid";
import HomeSection from "./HomeSection";
import ProductCard from "./ProductCard";

const Home = (props) => {
    return (
        <div>
            <HomeSection 
                title="Regalar es el lenguaje universal que nos une."
                body_text={
                    `Diseñamos regalos que hablan por ti, cuando las palabras no son suficientes.Transformamos tu intención en regalos bien pensados, emotivos y llenos de significado.`
                }
                image="images/topeca.jpg"
                image_alt="Topeca Coffee"
                button_text="QUIERO, PORFA!"
                button_link="/personalize"
                section_classes="image-left light-gray"
                button_classes="light-pink"
            />

            
            <HomeSection
                title="Ready. Set. Gift."
                body_text={
                    `No time? No problem. Si necesitas hacer un regalo de forma express, sin complicarte y quedar bien con alguien, este es un shortcut para explorar nuestros Ready-to-Go.`
                }
                button_text="SHOP"
                button_classes="light-pink"
                button_link="/shop"
                section_classes="full-width"
                children={
                    <div className="product-cards-grid">
                        <ProductCard
                            name="Product Name"
                            description="Breve descripción que inspire al cliente"
                            image="images/product1.jpg"
                        />
                        <ProductCard
                            name="Product Name"
                            description="Breve descripción que despierte curiosidad"
                            image="images/product2.jpg"
                        />
                        <ProductCard
                            name="Product Name"
                            description="Breve descripción que de ideas por ocasión"
                            image="images/product3.jpg"
                        />
                    </div>
                }
            />
            <HomeSection
                title="Corporate Gifting, a otro nivel."
                body_text={
                    `Regalos empresariales que te colocan en el Top of Mind y te ayudan a crear conexiones más auténticas y duraderas con tus clientes, proveedores y colaboradores. 
                    Cada proyecto está hecho a tu medida.`
                }
                image="images/yeti.jpg"
                image_alt="Yeti Cooler"
                section_classes="image-right light-gray"
                button_text="COTIZA"
                button_classes="pink"
                button_link="/corporate-gifting"
            />
            <HomeSection
                title="Our Clients"
                body_text=""
                children={
                    <ClientsGrid />
                }
                section_classes="full-width"
            />

            <HomeSection
                title="Hay regalos que no se dan, se viven."
                body_text={
                    `Planificación y ejecución de Boutique Events, donde cada detalle cuenta y tus ideas se transforman en momentos que se sienten, se viven y se recuerdan.`
                }
                section_classes="full-width"
                button_text="LET'S PLAN IT"
                button_classes="pink"
                button_link="/events"
                background_image="images/topeca.jpg"
            />
        </div>
    )
}

export default Home;