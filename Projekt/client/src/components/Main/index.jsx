import styles from "./styles.module.css";
import axios from "axios";
import { SelectComponent } from "../SelectComponent";
import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
const Main = () => {
  const [golds, setGolds] = useState("");
  const [wars, setWars] = useState("");
  const [oils, setOils] = useState("");
  const [selectedConflict, setSelectedConflict] = useState("");
  const [selectedConflictOil, setSelectedConflictOil] = useState("");
  const [filteredGoldData, setFilteredGoldData] = useState("");
  const [filteredOilData, setFilteredOilData] = useState("");
  const [chartData, setChartData] = useState("");
  useEffect(() => {
    async function getGoldData() {
      const goldurl = "http://localhost:8080/api/gold";
      const response = await fetch(goldurl);
      const res = await response.json();
      setGolds(res);
    }
    async function getWarsData() {
      const warsurl = "http://localhost:8080/api/wars";
      const response = await fetch(warsurl);
      const res = await response.json();
      setWars(res);
    }
    async function getOilsData() {
      const oilurl = "http://localhost:8080/api/oil"
    }
    getGoldData();
    getWarsData();
  }, []);
  useEffect(() => {
    if (golds !== "" && golds?.data?.length > 1) {
      let test = golds.data.filter(
        (gold) =>
          (Number(gold.date.slice(6, 10)) >= selectedConflict.start && Number(gold.date.slice(6, 10)) <= selectedConflict.end) ||
          selectedConflict.end === 2023 ||
          Number(gold.date.slice(6, 10)) <= selectedConflict.end
      );
      setFilteredGoldData(test);
      let test2 = test.map((elem) => {
        return {
          name: elem.date.slice(6, 10),
          value: elem.price,
        };
      });
      setChartData(test2);
    }
  }, [selectedConflict]);
  useEffect(() => {
    if (golds !== "" && golds?.data?.length > 1) {
      let test = golds.data.filter(
        (gold) =>
          (Number(gold.date.slice(6, 10)) >= selectedConflict.start &&
            Number(gold.date.slice(6, 10)) <= selectedConflict.end) ||
          selectedConflict.end === 2023 ||
          Number(gold.date.slice(6, 10)) <= selectedConflict.end
      );
      setFilteredGoldData(test);
      let test2 = test.map((elem) => {
        return {
          name: elem.date.slice(6, 10),
          value: elem.price,
        };
      });
      setChartData(test2);
    }
  }, [selectedConflict]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/users/${localStorage.getItem("id")}`;
    axios.delete(url);
    window.location = "/login";
  };
  const handleDownloadGoldData = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/gold/`;
    await fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "gold.json");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };
  const handleDownloadWarsData = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/wars/`;
    await fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "wars.json");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };
  console.log(filteredGoldData);
  console.log(wars);
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Zewstawienie cen złota z konfliktami</h1>
        <button className={styles.white_btn} onClick={handleDeleteUser}>
          Delete User
        </button>
        <button className={styles.white_btn} onClick={handleDownloadWarsData}>
          Download wars.json
        </button>
        <button className={styles.white_btn} onClick={handleDownloadGoldData}>
          Download gold.json
        </button>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="chartContainer">
        {!filteredGoldData.length ? (
          <h2>Brak danych dla cen złota w czasie trwania tego konflitku</h2>
        ) : (
          <LineChart
            width={window.innerWidth - 20}
            height={500}
            data={chartData}
          >
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey={"name"} />
            <YAxis dataKey="value" />
          </LineChart>
        )}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        {wars !== "" && wars.data.length > 1 && (
          <SelectComponent
            wars={wars}
            selectedConflict={selectedConflict}
            setSelectedConflict={setSelectedConflict}
          />
        )}
      </div>
      <div className="chartContainer">
        {!filteredOilData.length ? (
          <h2>
            Brak danych dla cen ropy naftowej w czasie trwania tego konflitku
          </h2>
        ) : (
          <LineChart
            width={window.innerWidth - 20}
            height={500}
            data={chartData}
          >
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey={"name"} />
            <YAxis dataKey="value" />
          </LineChart>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        {wars !== "" && wars.data.length > 1 && (
          <SelectComponent
            wars={wars}
            selectedConflict={selectedConflictOil}
            setSelectedConflict={setSelectedConflictOil}
          />
        )}
      </div>
    </div>
  );
};
export default Main;
