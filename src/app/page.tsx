import { Container } from "@/components/(app)/(common)/layout/container";
import SiteTopHeader from "@/components/(app)/(common)/navbars/top-navbar";
import { ModeToggle } from "@/components/(app)/(common)/theme/mode-toggle";

const HomeScreen = () => {
  return (
    <Container>
      <SiteTopHeader />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium molestiae reprehenderit
        facere voluptate culpa dolorum, veritatis neque exercitationem inventore quo quod mollitia
        sapiente eum saepe. Quis corporis quam blanditiis? Facilis. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Laudantium molestiae reprehenderit facere voluptate culpa
        dolorum, veritatis neque exercitationem inventore quo quod mollitia sapiente eum saepe. Quis
        corporis quam blanditiis? Facilis.
      </p>
      <hr />
      <ModeToggle />
    </Container>
  );
};

export default HomeScreen;
