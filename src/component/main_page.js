import {Component} from "react/cjs/react.production.min";
import {Image} from "react-bootstrap";

class Main_page extends Component {
    render() {
        return (<div>
                <main>
                <center> <span className="title_bg center"> Информация </span></center>

                <p className="ul_font p_line">
                    Магазин пряжи «Яринкина пряжа» предоставляет возможность купить пряжу напрямую от производителей. Мы
                    сами вяжем и хорошо разбираемся в составах пряжи. Каждую неделю предоставляем самые интересные
                    новинки
                    из Италии.
                </p>
                <ul className="ul_font">
                    <li>Большой ассортимент мериносовой пряжи. Обширная цветовая гамма. Толщина от 3000 м/100 г до 110
                        м/100г
                    </li>
                    <li>Разнообразные составы - меринос с кашемиром, твид, хлопок, лен, меринос с хлопком, меринос с
                        шелком,
                        верблюд, меринос с шелком и кашемиром и др.
                    </li>
                    <li>Скидки при оптовых заказах.</li>
                    <li>ЕЖЕНЕДЕЛЬНОЕ пополнение ассортимента.</li>
                    <li> Бесплатный размот от 50 г.</li>
                </ul>
                </main>
                <div >
                    <center>
                    <Image style={{width:'60%',height:350}} src={'img/bg.jpg'}/>
                    </center>
                </div>
            </div>
        )
    }
}

export default Main_page;