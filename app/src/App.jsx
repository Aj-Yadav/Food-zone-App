import { useState , useEffect } from "react"
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

 export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData,setFilteredData] = useState(null);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  // const fetchFoodData = async () => {
  //     const response = await fetch(BASE_URL);
  //     const json = await response.json();
  //     console.log(json);
  // }
  // fetchFoodData();
 

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setLoading(false);
        // console.log(json);
        setData(json);
        setFilteredData(json);
      } catch (error) {
        // console.log(error);
        setError("Unable to fetch Data");
      }
    }
    fetchFoodData();
  },[])
  // console.log(data);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue === "" ){
      setFilteredData(null);
    }

    const filter = data?.filter((food) => 
    food.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredData(filter);
  }


  const filteredFood = (type) => {
    if(type === "all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    
    const filter = data?.filter((food) => 
    food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  }

  const filterBtn = [
    {
      name:"All",
      type:"all"
    },
    {
      name:"Breakfast",
      type:"breakfast"
    },
    {
      name:"Lunch",
      type:"lunch"
    },
    {
      name:"Dinner",
      type:"dinner"
    }

  ]


  if (error) return <div> {error} </div>
  if (loading) return <div> {loading}</div>


  return (
    <Container>
      <TopContainer>
        <div className="logo">
        <img src="../../Foody Zone.svg" alt=""/>
        </div>
        <div className="search">
        <input onChange={searchFood} placeholder="search Food"  />
        </div>
       
       
      </TopContainer> 

      <FilterContainer>
        {
          filterBtn.map((value) => 
        <Button key={value.name} onClick={() => filteredFood(value.type)} >{value.name}</Button>

          )
        }
        {/* <Button onClick={() => filteredFood('breakfast')} >Break FAst</Button>
        <Button onClick={() => filteredFood('lunch')} > Lunch </Button>
        <Button onClick={() => filteredFood('dinner')} > Dinner </Button> */}
      </FilterContainer>

     <SearchResult data={filteredData} />

      </Container>
  );
}
export default App;
      
const Container = styled.div`
      max-width: 1200;
      margin:0 auto;
      `;

  const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0 < width <600px){
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 15px;
    
  `;
  
  export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
  