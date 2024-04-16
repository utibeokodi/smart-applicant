import React, { useState } from 'react';
import { Box, Container, Label, Button, Input, Heading, Spinner, Text, Select } from 'theme-ui';
import { styles } from '../styles/base-form.style.js';
import InputMask from 'react-input-mask';
import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import Cards from 'react-credit-cards';
//import 'react-credit-cards/es/styles-compiled.css';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from 'react-icons/fa';

countries.registerLocale(english);

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const countriesList = Object.entries(countries.getNames('en')).map(([code, name]) => name);

  const fields = [
    {
      id: 'card-number',
      name: 'card-number',
      type: 'text',
      value: cardNumber,
      placeholder: "Enter Card Number",
      onChange: e => setCardNumber(e.target.value),
      label: 'Card Number',
      required: true,
      minLength: 13,
      maxLength: 30,
      mask: "9999 9999 9999 9999 9999"
    },
    {
      id: 'card-name',
      name: 'card-name',
      type: 'text',
      value: cardName,
      placeholder: "Enter Name on Card",
      onChange: e => setCardName(e.target.value),
      label: 'Card Name',
      required: true,
      minLength: undefined,
      maxLength: undefined
    },
    {
      id: 'expiry-date',
      name: 'expiry-date',
      type: 'text',
      value: expiryDate,
      placeholder: "MM/YY",
      onChange: e => setExpiryDate(e.target.value),
      label: 'Expiry Date',
      required: true,
      minLength: undefined,
      maxLength: undefined,
      mask: "99/99"
    },
    {
      id: 'cvv',
      name: 'cvv',
      type: 'password',
      value: cvv,
      placeholder: "CVV",
      onChange: e => setCvv(e.target.value),
      label: 'CVV',
      required: true,
      minLength: 3,
      maxLength: 4
    },
    {
      id: 'country',
      name: 'country',
      type: 'text',
      value: country,
      onChange: e => setCountry(e.target.value),
      label: 'Country',
      required: true,
      options: countriesList,
    }
  ];

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setError("There was an error adding the payment method, please try again later");
    }, 3000);
  };

  return (
    <Container sx={
      {
        marginLeft: '250px',
        width: 'calc(100% - 250px)',
        height: '100vh',
        '@media screen and (max-width: 991px)': {
            width: '100%',
            marginLeft: 0,
            paddingTop: 3, 
            marginTop: '60px'
          },
    }}>
        
    <Box sx={{
       display: ['block', 'block', 'block', 'flex'],
       justifyContent: 'center', 
       alignItems: 'center',
       flexWrap: 'wrap',
       marginLeft: [0, 0, 0, 0, 0, 6],
       '@media screen and (max-width: 991px)': {
        flexDirection: 'column'
    }
        }}>
      <Box sx={{
          position: 'relative',
          maxWidth: ['100%', '100%', '100%', '50%'],
          '@media screen and (max-width: 313px)': {
            display: 'none'
          },
          '@media screen and (min-width: 991px)': {
            paddingTop: 3
          }
        }} 
      >
        <Cards
          cvc={cvv}
          expiry={expiryDate}
          name={cardName}
          number={cardNumber}
          preview={true}
        />
      </Box>

      <Box as='form' onSubmit={handleSubmit} sx={styles.form}>
        <Box sx={styles.heading}>
          <Heading>Add Payment method</Heading>
        </Box>
  
        {fields.map((field, index) => (
          <Box key={index} mb={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor={field.id}>{field.label}:</Label>
              {field.id === 'card-number' && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                <FaCcVisa size={30} color="#1a1f71" />
                <FaCcMastercard size={30} color="#eb001b" />
                <FaCcAmex size={30} color="#0077b5" />
                <FaCcDiscover size={30} color="#ff5f00" />
              </Box>
              
              )}
            </Box>
  
            {field.id === 'country' ? (
              <Select
                id={field.id}
                name={field.name}
                required={field.required}
                value={field.value}
                onChange={field.onChange}
                sx={styles.input}
              >
                {field.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            ) : field.mask ? (
              <InputMask
                mask={field.mask}
                value={field.value}
                onChange={field.onChange}
                maskChar={null}
              >
                {(inputProps) => <Input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  minLength={field.minLength}
                  maxLength={field.maxLength}
                  sx={styles.input}
                  {...inputProps}
                />}
              </InputMask>
            ) : (
              <Input
                id={field.id}
                name={field.name}
                type={field.type}
                required={field.required}
                value={field.value}
                placeholder={field.placeholder}
                onChange={field.onChange}
                minLength={field.minLength}
                maxLength={field.maxLength}
                sx={styles.input}
              />
            )}
          </Box>
          ))}
  
        <Button sx={styles.button}>
        {isLoading ? <Spinner /> : "Add"} 
        </Button>
        {error && <Text sx={{ color: 'red' }}>{error}</Text>}
      </Box>
    </Box>
  </Container>
  );
  
}

export default PaymentForm;