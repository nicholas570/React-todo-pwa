import { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './logo.svg';

import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todoItem, setTodoItem] = useState('');

  const fetchItems = async () => {
    try {
      setLoading(true);
      const result = await axios.get('http://localhost:8080/items');
      setItems(result.data);
    } catch (err) {
      console.log(err.stack);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post('http://localhost:8080/items', {
        todoItem,
      });
      setItems(result.data);
    } catch (err) {
      console.log(err.stack);
    } finally {
      setLoading(false);
      setTodoItem('');
    }
  };

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      const result = await axios.delete(`http://localhost:8080/items/${id}`);
      setItems(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='App'>
      <nav className='navbar navbar-light bg-light'>
        <span className='navbar navbar-brand mb-0 h1'>
          <img src={logo} className='App-logo' alt='logo' />
        </span>
      </nav>

      <div className='px-3 py-2'>
        <form className='form-inline my-3' onSubmit={addItem}>
          <div className='form-group mb-2 p-0 pr-3 col-8 col-sm-10'>
            <input
              className='form-control col-12'
              placeholder='What do you need to do'
              value={todoItem}
              onChange={(e) => setTodoItem(e.target.value)}
            />
          </div>
          <button className='btn btn-primary mb-2 col-4 col-sm-2' type='submit'>
            Add
          </button>
        </form>

        {loading && <p>Loading...</p>}

        {!loading && items.length === 0 && (
          <div className='alert alert-secondary'>All done :)</div>
        )}

        {!loading && items && (
          <table className='table table-stripped'>
            <tbody>
              {items.map((item, i) => {
                return (
                  <tr key={item.id} className='row'>
                    <td className='col-1'>{i + 1}</td>
                    <td className='col-10'>{item.item}</td>
                    <td className='col-1'>
                      <button
                        type='button'
                        className='close'
                        aria-label='Close'
                        onClick={() => deleteItem(item.id)}>
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
