import '../style/mainPage.css'
import SearchForm from "../component/SearchForm.jsx";
import CategoryTile from "../component/CategoryTile.jsx";


export default function MainPage() {

    return (
        <div className="mainPage">
            <SearchForm/>
            <div id={"tiles"}>
                <CategoryTile image={"src/assets/stonebass.jpg"} title={"StoneBass 1"} destination={"/instruments?hasResonator=true"}/>
                <CategoryTile image={"src/assets/stonebass.jpg"} title={"StoneBass 2"} destination={"/instruments?hasResonator=false"}/>
            </div>
        </div>
    )
}