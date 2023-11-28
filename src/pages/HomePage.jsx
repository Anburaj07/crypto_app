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
  useDisclosure
} from "@chakra-ui/react";
import styled from "styled-components";
import TableRow from "../components/TableRow";
import CoinModal from "../components/CoinModel";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR`;
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

  return (
    <DIV>
      <h1>Filter here...</h1>

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
      <CoinModal isOpen={isOpen} onClose={onClose} coinDetails={selectedCoin} />
    </DIV>
  );
};

export default HomePage;

const DIV = styled.div`
  table {
    width: 80%;
    margin: auto;
  }
  tr:hover{
    cursor: pointer;
  }
`;
