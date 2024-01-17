/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Card from "../ReusableComponents/CallReminderCard";
import NavBar from "../NavBarComponents/Navbar";

export default function Home({ data, setCallReminders }) {
  {
    /* 
const [callReminders, setCallReminders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8080/callReminder")
        .then((response) => setCallReminders(response.data))
        .catch((error) => console.log({ error }));
    };

    fetchData();

    return () => {
      // Any cleanup code you want to run when the component unmounts
    };
  }, []);


  const currentTime = new Date();

    // data array'ini dönerek her bir hatırlatıcının saatini kontrol et
    filteredReminders.forEach((callReminder) => {
      // Hatırlatıcının saatini ve günlerini al
      const reminderTime = new Date(callReminder.callReminderTime);
      const reminderDays = callReminder.callReminderDays;

      // Eğer günler uyuşuyorsa ve saatler uyuşuyorsa
      if (
        reminderDays.includes(
          currentTime.toLocaleDateString("en-US", { weekday: "long" })
        ) &&
        reminderTime.getHours() === currentTime.getHours() &&
        reminderTime.getMinutes() === currentTime.getMinutes()
      ) {
        // İşlem yapmak istediğiniz kodu burada ekleyin
        console.log(currentTime);
        console.log(`Match found for reminder ID ${callReminder.id}`);
        comparedCards.current = comparedCards.current.map((prevReminders) =>
          prevReminders.filter((reminder) => reminder.id !== callReminder.id)
        );
      }
    });

    home un useEffecti


    eğer create sayfasında home a geldiğimizde home'u güncelleme için createden setState yapmak yerine home'dan useEffectle yapılabiliyorsa öyle yap



    const fetchData = async () => {
    await axios
      .get(`http://localhost:8080/callReminder/${id}`)
      .then((response) =>
        setValues({
          id: `${response.data.id}`,
          whoToCall: `${response.data.whoToCall}`,
          description: `${response.data.description}`,
          callReminderDays: response.data.callReminderDays,
          callReminderTime: `${response.data.callReminderTime}`,
        })
      )
      .catch((error) => console.log({ error }));
  };
*/
  }

  useEffect(() => {
    setCallReminders([]);
  }, [data]);

  return (
    <div className="h-screen min-h-full bg-black">
      <NavBar />
      <div className="flex flex-col items-center bg-black pb-12">
        <h1 className="text-white text-center font-sans font-bold text-3xl">
          Hello Name, <br /> That&apos;s All For Today&apos;s Calls. <br /> Have
          a Great One!
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
