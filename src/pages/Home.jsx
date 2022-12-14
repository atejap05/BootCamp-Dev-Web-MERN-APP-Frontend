import React, {useState} from "react";
import classes from "../css/styles.module.css";
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import peopleImg from "../assets/imgs/people_talking.jpg";
import CardHome from "../components/UI/CardHome";
import {GiArchiveRegister} from "react-icons/gi";
import {GrShareOption} from "react-icons/gr";
import {AiOutlineFieldTime, AiOutlineFileDone} from "react-icons/ai";
import Header from "../components/Layout/Header";
import {message, Space} from "antd";

const Home = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [showSignUp, setShowSignUp] = useState(false)

  return (
    <div className={classes["home"]}>
      {contextHolder}
      <Header />
      <main className={classes["home__content"]}>
        <section className={classes["home__content--cta"]}>
          <div>
            <h1>Sua Permuta Fácil</h1>
            <p>
              Podemos te ajudar a localizar outros servidores públicos federais
              que estejam interessados em realizar permuta, para você chegar à
              localidade que tanto deseja. Se já não é cadastrado no nosso banco
              de permutas, registre-se abaixo.
            </p>
            <div className={classes["home__content--cta__btn"]}>
              <Space size={'large'}>
                <Login setShowSignUp={setShowSignUp}/>
                <SignUp messageApi={messageApi} showSignUp={showSignUp}/>
              </Space>
            </div>
          </div>
          <img src={peopleImg} alt="people illustration"/>
        </section>
        <section className={classes["home__content--cards"]}>
          <CardHome
            icon={<GiArchiveRegister />}
            title={"Registre-se"}
            text={
              "Faça o registro com seus dados no nosso banco de permutas."
            }
          />
          <CardHome
            icon={<GrShareOption />}
            title={"Manifeste-se"}
            text={
              "Inclua suas opções e intenções de permuta para que outros possam visualizar."
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
              "Agora é só seguir as orientações do seu órgão para efetivar a permuta."
            }
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
