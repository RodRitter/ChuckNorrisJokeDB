import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { COLORS, API } from "../../config/variables";

import Header from "../../components/Header";
import Container from "../../components/Container";

const HomeLink = styled.div`
  > a {
    font-size: 14px;
    border: 2px solid ${COLORS.secondary};
    color: ${COLORS.secondary};
    padding: 10px 10px;
    border-radius: 50px;
    text-decoration: none;
    display: inline-block;
    margin: 15px 0 0 0;
    transition: all linear 0.1s;

    &:hover {
      border-color: ${COLORS.primary};
      color: ${COLORS.primary};
    }
  }
`;

const Heading = styled.h1`
  color: ${COLORS.secondary};
  font-size: 20px;
  font-weight: 400;

  > span {
    color: ${COLORS.primary};
    font-weight: 600;
    text-transform: capitalize;
  }
`;

const JokeText = styled.div`
  text-align: center;
  padding: 30px;
  max-width: 500px;
  font-size: 20px;
  margin: 0 auto;
  font-style: italic;
  cursor: pointer;
  color: ${COLORS.primary};
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 30px;
  max-width: 500px;
  font-size: 20px;
  margin: 0 auto;
  font-weight: 600;
  color: ${COLORS.primary};
`;

const InfoText = styled.p`
  color: ${COLORS.secondary};
  text-align: center;
  font-size: 14px;
`;

const JokeDetail: React.FC = () => {
  interface URLParams {
    id: string;
  }
  const { id } = useParams<URLParams>();
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState("");

  const fetchJoke = () => {
    if (!loading) {
      setLoading(true);
      axios
        .get(API.random, { params: { category: id } })
        .then((results) => {
          setJoke(results.data.value);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <HomeLink>
          <Link to="">Go Back Home</Link>
        </HomeLink>
        <Heading>
          Category / <span>{id}</span>
        </Heading>

        {!loading ? (
          <JokeText onClick={fetchJoke}>{joke}</JokeText>
        ) : (
          <LoadingText>Fetching joke...</LoadingText>
        )}

        <InfoText>Click on the joke to get a new one</InfoText>
      </Container>
    </div>
  );
};

export default JokeDetail;
