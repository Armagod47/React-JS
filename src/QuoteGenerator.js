import React, { useState, useEffect } from "react";
import styles from "./QuoteGenerator.module.css";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
const QuoteGenerator = () => {
  const apiURL = "https://type.fit/api/quotes";
  const [quoteArray, setQuoteArray] = useState([]);
  const [quoteDisplay, setQuoteDisplay] =
    useState(`You can be a king or a street sweeper
but everybody dance's  with the Gream Reaper`);
  const [quoteAuthor, setQuoteAuthor] = useState("Mr. Boro");
  const [lengthCheck, setLengthCheck] = useState(false);
  const FetchQuotes = async () => {
    try {
      const response = await fetch(apiURL);
      const responseData = await response.json();
      setQuoteArray(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const RandomQuote = () => {
    let index = Math.floor(Math.random() * quoteArray.length);
    setQuoteDisplay(quoteArray[index].text);
    setQuoteAuthor(quoteArray[index].author);
    if (quoteArray[index].text.length > 120) {
      setLengthCheck(true);
    } else {
      setLengthCheck(false);
    }
    if (quoteArray[index].author == null) {
      setQuoteAuthor("Unknown");
    }
  };
  useEffect(() => {
    FetchQuotes();
  }, [apiURL]);
  return (
    // <div className={styles.container}>
    <div
      className={`${styles.container} ${lengthCheck ? styles.containerx : ""}`}
    >
      <div className={styles.quotedisplay}>
        <h2 className={styles.quote}>
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className={styles.quoteLeft}
          ></FontAwesomeIcon>
          {quoteDisplay}
        </h2>
        <p className={styles.author}>
          <FontAwesomeIcon
            icon={faMinus}
            className={styles.minus}
          ></FontAwesomeIcon>
          {quoteAuthor}
        </p>
      </div>
      <button className={styles.btn} onClick={RandomQuote}>
        Quote
      </button>
    </div>
  );
};

export default QuoteGenerator;
