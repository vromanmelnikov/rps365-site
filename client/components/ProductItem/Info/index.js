import { useState } from "react";
import styles from "./info.module.scss";
import Feedbacks from "./Feedbacks";

export default function Info({properties}) {
  const [sectionID, setSectionID] = useState("section_1");

  function changeSection(ID) {
    setSectionID(ID);
  }

  return (
    <div className={`${styles.info}`}>
      <div className={`join`}>
        <button
          onClick={() => changeSection("section_1")}
          className={`${styles.btn} btn join-item`}
        >
          Характеристики
        </button>
        {/* <button
          onClick={() => changeSection("section_2")}
          className={`btn join-item`}
        >
          Отзывы
        </button> */}
      </div>
      {sectionID === "section_1" && 
      <div className={`${styles.attrs}`}>
        {
          properties.map((item, index) => {
            return(
              <div className={`${styles.attr}`} key={index}>
                <span className={`${styles.key}`}>{item.name}: </span>
                <div className={`${styles.line}`}></div>
                <span className={`${styles.value}`}>{item.value}</span>
              </div>
            )
          })
        }
      </div>
      }
      {sectionID === "section_2" && (
        <Feedbacks />
      )}
    </div>
  );
}
