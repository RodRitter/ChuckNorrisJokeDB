import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers/";
import { COLORS, API } from "../../config/variables";
import { updateCategories } from "../../redux/actions";
import Header from "../../components/Header";
import Container from "../../components/Container";

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchTooltip = styled.h4`
  position: absolute;
  margin: 0;
  padding: 0 20px;
  bottom: -25px;
  height: 20px;
  line-height: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${COLORS.primary};
  color: #fff;
  font-weight: 300;
  font-size: 12px;
  opacity: 0.8;
  border-radius: 2px;

  > span {
    font-weight: 500;
  }
`;

const SearchInput = styled.input.attrs(
  ({ onFocus, onBlur, value, onKeyUp }) => ({
    type: "text",
    placeholder: "Search for a joke by keyword",
    onFocus: onFocus,
    onBlur: onBlur,
    value: value,
    onKeyUp: onKeyUp,
  })
)`
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin: 40px auto;
  display: block;
  border: 1px solid gray;
  font-size: 18px;
  border-radius: 5px;
  border: 2px solid ${COLORS.secondary};
  transition: all linear 0.1s;

  &::placeholder {
    color: ${COLORS.secondary};
  }

  &:focus {
    border-color: ${COLORS.primary};
  }
`;

const Divider = styled.h2`
  font-size: 20px;
  color: ${COLORS.secondary};
  text-align: center;
  margin: 0;
  font-weight: 400;
`;

const CategoryHeading = styled.h3`
  font-size: 18px;
  color: ${COLORS.primary};
  text-align: center;
`;

const loadingAnimation = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 700px;
  margin: 5px auto;
  gap: 10px;

  > a {
    text-align: center;
    text-decoration: none;
    padding: 15px;
    background: ${COLORS.primary};
    color: #fff;
    border-radius: 5px;
    transition: all linear 0.1s;

    &:hover {
      color: #fff;
      background: ${COLORS.tertiary};
    }
  }

  > div {
    border-radius: 5px;
    height: 48px;
    color: transparent;
    background: linear-gradient(
        90deg,
        rgba(49, 35, 92, 1) 0%,
        rgba(95, 77, 148, 1) 50%,
        rgba(49, 35, 92, 1) 100%
      )
      0% 0% / 400%;
    animation: ${loadingAnimation} 5s ease infinite;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SearchResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin: 0 0 20px 0;

  > div {
    background: ${COLORS.primary};
    padding: 15px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 5px;
    color: #fff;
    font-style: italic;
    min-height: 80px;
  }

  > span {
    min-height: 100px;
    border-radius: 5px;
    background: linear-gradient(
        90deg,
        rgba(49, 35, 92, 1) 0%,
        rgba(95, 77, 148, 1) 50%,
        rgba(49, 35, 92, 1) 100%
      )
      0% 0% / 400%;
    animation: ${loadingAnimation} 5s ease infinite;
  }
`;

const Home: React.FC = () => {
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingJokes, setLoadingJokes] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  const fetchCategories = () => {
    if (!loadingCategories) {
      setLoadingCategories(true);
      axios
        .get(API.categories)
        .then((results) => {
          dispatch(updateCategories(results.data));
        })
        .catch(console.error)
        .finally(() => setLoadingCategories(false));
    }
  };

  const fetchJokes = () => {
    if (!loadingJokes) {
      setLoadingJokes(true);
      axios
        .get(API.search, { params: { query: searchText } })
        .then((results) => {
          results.data.result.splice(16); // Limit results since no pagination available at present
          setSearchResults(results.data.result);
        })
        .catch(console.error)
        .finally(() => setLoadingJokes(false));
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  const onSearchKeyUp = (event: React.KeyboardEvent) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      if (searchText !== "") {
        fetchJokes();
      } else {
        setSearchResults([]);
      }
    } else if (event.code === "Escape") {
      setSearchResults([]);
      setSearchText("");
    }
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
  };

  return (
    <div>
      <Header />
      <Container>
        <SearchWrapper>
          <SearchInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={onSearchChange}
            onKeyUp={onSearchKeyUp}
            value={searchText}
          />
          {isFocused ? (
            <SearchTooltip>
              Press <span>Enter</span> to search or <span>Escape</span> to clear
              results
            </SearchTooltip>
          ) : null}
        </SearchWrapper>

        {loadingJokes ? (
          <SearchResultsGrid>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </SearchResultsGrid>
        ) : null}

        {searchResults.length > 0 && !loadingJokes ? (
          <SearchResultsGrid>
            {searchResults.map((joke: Object & { value: string }, index) => (
              <div key={index}>{joke.value}</div>
            ))}
          </SearchResultsGrid>
        ) : null}
        <Divider>or</Divider>
        <CategoryHeading>Pick a random joke from a category</CategoryHeading>
        {!loadingCategories ? (
          <CategoryGrid>
            {categories.map((category, index) => (
              <Link to={`/category/${category}`} key={index}>
                {category}
              </Link>
            ))}
          </CategoryGrid>
        ) : (
          <CategoryGrid>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </CategoryGrid>
        )}
      </Container>
    </div>
  );
};

export default Home;
