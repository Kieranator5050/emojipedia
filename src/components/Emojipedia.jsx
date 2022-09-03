import React, {useState, useEffect} from "react";
import apiKey from "../apiKey";
import Entry from "./Entry";

function Emojipedia() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch(`https://emoji-api.com/emojis?access_key=${apiKey}`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <dl className="dictionary">
            {items.map((emoji, index) => {
                return (
                    <Entry
                    key={index}
                    emoji={emoji.character}
                    name={emoji.unicodeName}
                    />
                );
            })}
        </dl>
      );
    }
  }

 export default Emojipedia;