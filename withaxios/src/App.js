import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {

  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("https://northwind.vercel.app/api/products")
      setCards(response.data);
      setLoading(false);
    }

    loadPosts();
  }, [])

  return (<>
    <div className='inputsearch'>
      <h3> Searching  </h3>
      <input type={"text"} placeholder="Search time" className='searchitem' onChange={(e) => setSearchName(e.target.value)} />
      <button className='filterbtn' onClick={() => { setCards([...cards].sort((a, b) => (a.unitPrice > b.unitPrice) ? 1 : ((b.unitPrice > a.unitPrice) ? -1 : 0))) }}>Sort Price</button>
    </div>
    <div className="App">

      {loading ? (<h4> Loading .. </h4>) : (

        (cards.filter((value) => {
          if (searchName === "") {
            return value
          } else if (value.name.toLowerCase().includes(searchName.toLowerCase())) {
            return value
          }

        })

          .map(item => <p className='info' key={item.id}> {item.name} {item.unitPrice} </p>))

      )}
    </div>
  </>
  );
}

export default App;
