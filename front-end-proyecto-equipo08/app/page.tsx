import Steps from "./Components/Steps/Steps";
import CardVacante from "./Components/CardVacante/CardVacante";
import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';

export default function Home() {
  return (
    <>
      <Header/>
      <Hero />
      <CardVacante />
      <main>
        <Steps />
      </main>
    </>
  );
}