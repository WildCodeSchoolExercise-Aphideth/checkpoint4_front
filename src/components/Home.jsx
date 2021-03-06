import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Home = ({ user }) => {
  const [recipesList, setRecipesList] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  const getRecipes = () => {
    Axios.get("http://localhost:8000/").then(({ data }) => {
      setRecipesList(data);
    });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const deleteRecipe = (id) => {
    Axios.delete(`http://localhost:8000/${id}`).then(({ data }) => {
      if (data.error) setError(data.error);
      else {
        setError("");
        window.location.reload();
      }
    });
  };
  console.log(isAuthenticated);
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-around p-sm">
        {recipesList.map((val, key) => {
          return (
            <Card className="mb-4" style={{ width: "20rem" }}>
              <Card.Img variant="top" src={val.image} />
              <Card.Body>
                <Card.Title>
                  <h2>{val.name}</h2>
                </Card.Title>
                <Card.Text>
                  <h4>
                    Description : <br /> {val.description}
                  </h4>
                </Card.Text>
                <Button variant="dark">More</Button>

                {isAuthenticated ? (
                  <>
                    {/* {user.role === 1 ? <Link to="/"></Link>} */}
                    <Button variant="dark" onClick={() => deleteRecipe(val.id)}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
