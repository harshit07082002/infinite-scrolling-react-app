import React from "react";
import User from "../components/User";
import Error from "../utils/Error";
import axios from "axios";
import uniqid from "uniqid";
import classes from "./HomePage.module.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../utils/Loader";

const filterData = (data) => {
  let filteredData = data.map((el) => {
    let name = el.name.title + " " + el.name.first + " " + el.name.last;
    let image = el.picture.medium;
    let id = uniqid();
    return { name, image, id };
  });
  return filteredData;
};

const HomePage = () => {
  const [error, ErrorHandler] = useState(null);
  const [userList, changeUserList] = useState([]);

  //Fetching Data In the Start
  useEffect(() => {
    async function fetchUser() {
      const data = await axios({
        method: "GET",
        url: "https://randomuser.me/api/?results=50",
      });
      const filteredData = filterData(data.data.results);
      changeUserList(filteredData);
    }
    fetchUser().catch((error) => {
      ErrorHandler(error.message);
    });
  }, []);

  //Fetch Data after reaching end of page
  const fetchMoreData = () => {
    setTimeout(async () => {
      try {
        const data = await axios({
          method: "GET",
          url: "https://randomuser.me/api/?results=50",
        });
        const filteredData = filterData(data.data.results);
        changeUserList((state) => {
          return state.concat(filteredData);
        });
      } catch (error) {
        ErrorHandler(error.message);
      }
    }, 1000);
  };
  return (
    <>
      {error && <Error error={error} />}

      {!error && (
        <InfiniteScroll
          dataLength={userList.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Loader />}
        >
          <div className={classes.container}>
            {!error &&
              userList.map((el) => {
                return <User name={el.name} id={el.id} image={el.image} />;
              })}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default HomePage;
