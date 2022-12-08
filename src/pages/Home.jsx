import React from "react";
import classes from "../css/styles.module.css";
import Login from "./Login";
import Singup from "./Singup";
import peopleImg from "../assets/imgs/people_talking.jpg";
import CardHome from "../components/UI/CardHome";
import { GiArchiveRegister } from "react-icons/gi";

const Home = () => {
  return (
    <div className={classes["home"]}>
      <header className={classes["home__header"]}>
        <div>
          <span>icon</span>
          <h1>PermutaGov</h1>
        </div>
        <div>
          <p>Contact Us</p>
          <p>About</p>
        </div>
      </header>
      <main className={classes["home__content"]}>
        <section className={classes["home__content--cta"]}>
          <div>
            <h1>Sua Permuta Fácil</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et vero
              expedita similique commodi alias voluptates quo optio provident,
              sit necessitatibus.
            </p>
            <div className={classes["home__content--cta__btn"]}>
              <button>Login</button>
              <button>Singup</button>
            </div>
          </div>
          <img src={peopleImg} alt="people illustration"></img>
        </section>
        <section className={classes["home__content--cards"]}>
          <CardHome
            icon={<GiArchiveRegister />}
            title={"Registre-se"}
            text={
              "Faça seu registro com seus dados no nosso banco de permutas."
            }
          />
          <CardHome
            icon={<GiArchiveRegister />}
            title={"Manifeste-se"}
            text={
              "Inclua suas opções e inteções de permuta para que outros possam vizualizar."
            }
          />
          <CardHome
            icon={<GiArchiveRegister />}
            title={"Aguarde"}
            text={
              "Aguarde a manifestação de outros servidores federais e o sistema enviará notificação para sua conta de e-mail cadastrada."
            }
          />
          <CardHome
            icon={<GiArchiveRegister />}
            title={"Permuta!"}
            text={
              "Agora é só seguir com as orientações do seu ógão para seguir com a sua permuta."
            }
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
