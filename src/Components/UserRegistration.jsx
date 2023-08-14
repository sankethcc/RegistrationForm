import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { EmailIcon, InfoIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const RegistrationForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [emailErrorMsg, setEmailErrorMsg] = useState("Email is required.");
  const passwordErrorMsg ="Password is required.";

  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleFullNameChange = (e) => {
    const fullNameValue = e.target.value;
    const formattedFullName = fullNameValue
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    setFullName(formattedFullName);
    setFullNameError(false);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

    if (value === "") {
      setEmailError(true);
      setEmailErrorMsg("Email is required.");
    } else if (!emailPattern.test(value)) {
      setEmailError(true);
      setEmailErrorMsg("Invalid email format.");
    } else {
      setEmailError(false);
    }

    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(false);

    if (newPassword.length === 0) {
      setPasswordStrength("weak");
    } else if (newPassword.length < 8) {
      setPasswordStrength("weak");
    } else if (newPassword.length < 12) {
      setPasswordStrength("moderate");
    } else {
      setPasswordStrength("strong");
    }
  };

  const validateForm = () => {
    const isFullNameValid = fullName.trim() !== "";
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/.test(email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    return isFullNameValid && isEmailValid && isPasswordValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      setFullNameError(fullName.trim() === "");
      setEmailError(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/.test(email));
      setPasswordError(password.trim() === "");
    } else {
      setRegistrationSuccess(true);
      logRegistrationData();
    }
  };

  const handleDismiss = () => {
    setRegistrationSuccess(false);
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const logRegistrationData = () => {
    console.log("Registration Data:");
    console.log("Full Name:", capitalizeName(fullName));
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Box p={10}>
        <HStack>Registration Form</HStack>
        <VStack spacing={4} align="center">
          <form>
            <FormControl id="fullName">
            <FormLabel>Full Name</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={InfoIcon} color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={handleFullNameChange}
                  onFocus={() => setFullNameError(false)}
                  placeholder="John"
                  isInvalid={fullNameError}
                />
              </InputGroup>
              {fullNameError && <Text color="red">Full name is required.</Text>}
            </FormControl>
            <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={EmailIcon} color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                onFocus={() => setEmailError(false)}
                placeholder="john@example.com"
                isInvalid={emailError}
              />
            </InputGroup>
            {emailError && <Text color="red">{emailErrorMsg}</Text>}
          </FormControl>
            <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setPasswordError(false)}
                placeholder="********"
                isInvalid={passwordError}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {passwordError && <Text color="red">{passwordErrorMsg}</Text>}
            {password && (
              <Text color={passwordStrength === "weak" ? "red" : passwordStrength === "moderate" ? "orange" : "green"}>
                Password Strength: {passwordStrength}
              </Text>
            )}
          </FormControl>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isDisabled={!validateForm()}
            >
              Register
            </Button>
          </form>
          {registrationSuccess && (
        <Box p={4} mt={4} bg="green.200" borderRadius="md">
          <Text>Successfully registered!</Text>
          <Button mt={2} colorScheme="green" onClick={handleDismiss}>
            Dismiss
          </Button>
        </Box>
      )}
        </VStack>
        
     
      
    </Box>
  );
};

export default RegistrationForm;
