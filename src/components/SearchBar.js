import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <input type='text' onChange={props.handleSearch} />
      <strong>Sort by:</strong>
      <label>
        <input 
          type="radio" 
          value="Alphabetically" 
          checked={props.checked === 'Alphabetically'} 
          onChange={props.handleCheck}
        />
        Alphabetically
      </label>
      <label>
        <input 
          type="radio" 
          value="Price" 
          checked={props.checked === 'Price'} 
          onChange={props.handleCheck}
        />
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange= {(e) => props.handleFilter(e.target.value)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
