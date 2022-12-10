import React from "react";
import classes from "../css/styles.module.css";
import peopleImg from "../assets/imgs/people_talking.jpg";
import CardHome from "../components/UI/CardHome";
import { GiArchiveRegister } from "react-icons/gi";
import { GrShareOption } from "react-icons/gr";
import { AiOutlineFieldTime, AiOutlineFileDone } from "react-icons/ai";
import { Button } from "antd";
import Header from "../components/Layout/Header";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={classes["home"]}>
      <Header />
      <main className={classes["home__content"]}>
        <section className={classes["home__content--cta"]}>
          <div>
            <h1>Sua Permuta Fácil</h1>
            <p>
              Podemos te ajudar a localizar outros servidores públicos federais
              que estejam interessados em realizar permuta para a localidade que
              você tanto deseja. Se já não é cadastrado no nosso banco de
              permutas, registre-se abaixo.
            </p>
            <div className={classes["home__content--cta__btn"]}>
              <Button
                type="primary"
                onClick={() => {
                  api
                    .post("/user/sign-in", {
                      email: "julianohcosta@gmail.com",
                      password: "SenhaValida85!",
                    })
                    .then(res => {
                      localStorage.setItem(
                        "loggedInUser",
                        JSON.stringify(res.data)
                      );
                      navigate("/permuta");
                    });
                }}
              >
                Login
              </Button>
              <Button>Singup</Button>
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
            icon={<GrShareOption />}
            title={"Manifeste-se"}
            text={
              "Inclua suas opções e inteções de permuta para que outros possam vizualizar."
            }
          />
          <CardHome
            icon={<AiOutlineFieldTime />}
            title={"Aguarde"}
            text={
              "Aguarde a manifestação de outros servidores federais e o sistema enviará notificação para sua conta de e-mail cadastrada."
            }
          />
          <CardHome
            icon={<AiOutlineFileDone />}
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
