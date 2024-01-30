// CoinModal.jsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";

const CoinModal = ({ isOpen, onClose, coinDetails }) => {
  const {
    market_cap_rank,
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h,
    total_volume,
    low_24h,
    high_24h,
    total_supply,
    max_supply,
    circulating_supply,
    ath,
    last_updated,
  } = coinDetails;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Image src={image} w={"20%"} />
            <Text>{symbol}</Text>
          </Box>
          <Box>
            <Text>Market Cap Rank: {market_cap_rank}</Text>
            <Text>Current Price: {current_price}</Text>
            <Text>
              Price Change 24h: {price_change_percentage_24h.toFixed(2)}%
            </Text>
            <Text>Total Volume: {total_volume}</Text>
            <Text>Low 24h: {low_24h}</Text>
            <Text>High 24h: {high_24h}</Text>
            <Text>Total Supply: {total_supply}</Text>
            <Text>Max Supply: {max_supply}</Text>
            <Text>Circulating Supply: {circulating_supply}</Text>
            <Text>All Time High (ATH): {ath}</Text>
            <Text>Last Updated: {last_updated}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CoinModal;
