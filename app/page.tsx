import WelcomeBlock from "./blocks/welcome-block";
import WeAreBlock from "./blocks/we-are-block";
import LocationsBlock from "./blocks/locations-block";
import ContactBlock from './blocks/contact-block';
import InstagramBlock from './blocks/instagram-block';
import RecipeBlock from "./blocks/recipe-block";
import MenuBlock from "./blocks/menu-block";
import SidesBlock from "./blocks/sides-block";

export default function Home() {
  return (
    <>
		<WelcomeBlock />
		<MenuBlock />
		{/* <DishesBlock/> */}
		<SidesBlock />
		<WeAreBlock />
		<RecipeBlock />
		<InstagramBlock />
		<LocationsBlock />
		<ContactBlock />
	</>
  );
}
