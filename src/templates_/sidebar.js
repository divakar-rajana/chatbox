import React from 'react';
import Home from '../static/Home.css';
import Chats from './chats';
import Search from './Search';
import Navbar from './Navbar';
function Sidebar() {
  return (
    <div>

      <div className="container1">
        <Navbar />
        <Search />
        <Chats />
      </div>

    </div>

  );
}

export default Sidebar
