import '../style/mainPage.css'
import CategoryTile from "../component/CategoryTile.jsx";


export default function MainPage() {

    return (
        <div className="mainPage">
            <div id={"tiles"}>
                <CategoryTile image={"src/assets/images/nyito_rezonator.jpg"} title={"Resonator Instrument"} destination={"/resonator"}/>
                <CategoryTile image={"src/assets/images/nyito_traditional.jpg"} title={"Traditional Instrument"} destination={"/traditional"}/>
            </div>
        </div>
    )
}