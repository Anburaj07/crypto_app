import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box
} from "@chakra-ui/react";

import { Image, Text } from "@chakra-ui/react";

const TableRow = ({
  name,
  image,
  symbol,
  current_price,
  price_change_percentage_24h,
  market_cap,
}) => {
  return (
    <Tr>
      <Td display={"flex"}>
        <Image src={image} w={"10%"} />
        <Box>
          <Text>{name}</Text>
          <Text>{symbol}</Text>
        </Box>
      </Td>
      <Td>{current_price}</Td>
      <Td>{price_change_percentage_24h.toFixed(2)}%</Td>
      <Td>{market_cap}</Td>
    </Tr>
  );
};

export default TableRow;
