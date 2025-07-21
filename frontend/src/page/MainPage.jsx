import '../style/mainPage.css'
import CategoryTile from "../component/CategoryTile.jsx";


export default function MainPage() {

    return (
        <div className="mainPage">
            <div id={"tiles"}>
                <CategoryTile image={"src/assets/nyito_rezonator.jpg"} title={"StoneBass 1"} destination={"/instruments?hasResonator=true"}/>
                <CategoryTile image={"src/assets/nyito_traditional.jpg"} title={"StoneBass 2"} destination={"/instruments?hasResonator=false"}/>
            </div>
        </div>
    )
}