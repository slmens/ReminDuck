/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import NavBar from "../NavBarComponents/Navbar";
import Card from "../ReusableComponents/CallReminderCard";

export default function Home({ data, fetchUserData, fetchDataAndSetToday }) {
  let name = " ";
  useEffect(() => {
    name = localStorage.getItem("name");
    const id = localStorage.getItem("id");
    if (name === null || name == " ") {
      fetchUserData();
    }

    // sesion storage kullan eğer session storageda varsa çekme de bu sayede gereksiz api calların önüne geçersin
    // Her home'a geldiğinde çekme bunu da eğer yeni bir reminder eklenirse localstorage'a bir şey eklersin mesela true yaparsın,
    //home'a dönüldüğünde o true ise çeker ve çektiği zaman onu false yapar
    // edit fonksiyonları

    // Reminder create edildikten sonra localstorageda updated değişkenini true yap
    // home'a geldiğinde updated false değil ise yani bu null boş gibi durumları da kapsıyor o zaman api call yapsın ve ayrıca session storage boşsa da api call yapsın
    // app'de ise bu dataları çektikten sonra bunların data kısımlarını sessionstorage'a yazsın ve updated'ı false'a çeksin ki home'a gelince sürekli gereksiz api call yapmasın

    // home'u re render etme fikirleri:
    // homeda bir değişken tutarız useEffect home a gelen data ile session storage'daki datayı karşılaştırır farklıysa o değişkeni set'ler ve re render olur.
    if (id !== " " && id !== null) {
      fetchDataAndSetToday();
    }
  }, []);

  return (
    <div className="h-screen min-h-screen bg-black">
      <NavBar />
      <div className="flex flex-col items-center bg-black pb-12">
        <h1 className="text-white text-center font-sans font-bold text-3xl">
          Hello {name}, <br /> That&apos;s All For Today&apos;s Calls. <br />{" "}
          Have a Great One!
        </h1>
        <div className="grid grid-cols-2 gap-14 mt-14">
          {data.map((callReminder) => {
            return (
              <Card
                key={callReminder.id}
                id={callReminder.id}
                header={callReminder.whoToCall}
                desc={callReminder.description}
                dateTime={callReminder.callReminderTime}
                days={callReminder.callReminderDays}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
