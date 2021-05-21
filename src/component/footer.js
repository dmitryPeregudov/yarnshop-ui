import {Component} from "react";

class Footer extends Component{
    render() {
        return (
            <footer id={'footer'} className="center">
                <div className="marg">
                    <img src="img/icon.png" alt="Социальные сети" useMap="#map"/>
                    <map name="map">
                        <area shape="rect" coords="0,0, 50,40" href="https://www.facebook.com" alt="Facebook"
                              target="_blank"/>
                        <area shape="rect" coords="50,0, 100,40" href="mailto:ktimohina2000.com"
                              alt="Google" target="_blank"/>
                        <area shape="rect" coords="100,0, 150,40" href="https://www.pinterest.com"
                              alt="Pinterest" target="_blank"/>
                        <area shape="rect" coords="150,0, 200,40"
                              href="https://twitter.com/login?lang=ru" alt="Twitter"
                              target="_blank"/>
                    </map>
                </div>
            </footer>
        )
    }
}export default Footer;