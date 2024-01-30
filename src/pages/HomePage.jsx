import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Image,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import styled from "styled-components";
import CoinModal from "../components/CoinModel";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    setLoading(true);
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&per_page=${coinsPerPage}&page=${currentPage}`;
    axios
      .get(`${url}`)
      .then((res) => {
        console.log("res:", res.data);
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowClick = (coinDetails) => {
    setSelectedCoin(coinDetails);
    onOpen();
  };

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(data.length / coinsPerPage);

  return (
    <DIV>
      <div>
        <h1 onChange={(e) => e.target.value}>Filter here...</h1>
      </div>

      <Table>
        <Thead>
          <Th>Coin</Th>
          <Th>Price</Th>
          <Th>24h Change</Th>
          <Th>Market Cap</Th>
        </Thead>
        <Tbody>
          {data.map((el) => (
            <Tr key={el.id} onClick={() => handleRowClick(el)}>
              <Td display={"flex"}>
                <Image src={el.image} w={"10%"} />
                <Box>
                  <Text>{el.name}</Text>
                  <Text>{el.symbol}</Text>
                </Box>
              </Td>
              <Td>{el.current_price}</Td>
              <Td>{el.price_change_percentage_24h.toFixed(2)}%</Td>
              <Td>{el.market_cap}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedCoin && (
        <CoinModal
          isOpen={isOpen}
          onClose={onClose}
          coinDetails={selectedCoin}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handlePaginationChange}
      />
    </DIV>
  );
};

export default HomePage;

const DIV = styled.div`
  table {
    width: 80%;
    margin: auto;
  }
  tr:hover {
    cursor: pointer;
  }
`;
